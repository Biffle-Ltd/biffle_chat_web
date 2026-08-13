import axios from "axios";
import type { VerifyResult } from "./creatorVerificationApi";

export const VERIFY_ERROR_CODE = {
  DUPLICATE_FACE: "verification_duplicate_face",
  SESSION_ALREADY_USED: "verification_session_already_used",
  FACE_CHECK_UNAVAILABLE: "verification_face_check_unavailable",
  SESSION_EXPIRED: "verification_session_expired",
  SESSION_NOT_FOUND: "verification_session_not_found",
} as const;

export type VerifyErrorCode =
  (typeof VERIFY_ERROR_CODE)[keyof typeof VERIFY_ERROR_CODE];

export type VerifyRetryPolicy = "none" | "retry_verify" | "new_session";

export type VerifyFailureStage =
  | "duplicate_face"
  | "session_already_used"
  | "error";

export type VerifyFailureUi = {
  stage: VerifyFailureStage;
  retry: VerifyRetryPolicy;
  title: string;
  message: string;
  errorCode: string | null;
};

export class VerifyApiError extends Error {
  readonly errorCode: string | null;
  readonly httpStatus: number;

  constructor(
    message: string,
    options: { errorCode: string | null; httpStatus: number }
  ) {
    super(message);
    this.name = "VerifyApiError";
    this.errorCode = options.errorCode;
    this.httpStatus = options.httpStatus;
    Object.setPrototypeOf(this, VerifyApiError.prototype);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readErrorCode(data: unknown): string | null {
  if (!isRecord(data)) return null;
  const code = data.error_code ?? data.errorCode;
  return typeof code === "string" && code.trim() !== "" ? code.trim() : null;
}

function readErrorMessage(data: unknown, fallback: string): string {
  if (!isRecord(data)) return fallback;
  const msg = data.error_message ?? data.errorMessage ?? data.message;
  return typeof msg === "string" && msg.trim() !== "" ? msg.trim() : fallback;
}

export function mapVerifyHttpError(
  status: number,
  data: unknown
): VerifyApiError {
  const errorCode = readErrorCode(data);
  const fallback = `Verification failed (${status})`;
  return new VerifyApiError(readErrorMessage(data, fallback), {
    errorCode,
    httpStatus: status,
  });
}

export function coerceVerifyApiError(error: unknown): VerifyApiError | null {
  if (error instanceof VerifyApiError) return error;
  if (axios.isAxiosError(error) && error.response) {
    return mapVerifyHttpError(error.response.status, error.response.data);
  }
  return null;
}

export function parseVerifyResponse(
  status: number,
  data: unknown
): VerifyResult {
  if (status >= 200 && status < 300) {
    if (isRecord(data) && data.success === false) {
      throw mapVerifyHttpError(status, data);
    }
    const body = isRecord(data) ? data : null;
    const nested = body?.data;
    const payload = isRecord(nested) ? nested : body;
    if (!payload) {
      throw new Error("Invalid verify response");
    }
    return payload as unknown as VerifyResult;
  }
  throw mapVerifyHttpError(status, data);
}

function uiForKnownCode(error: VerifyApiError): VerifyFailureUi | null {
  switch (error.errorCode) {
    case VERIFY_ERROR_CODE.DUPLICATE_FACE:
      return {
        stage: "duplicate_face",
        retry: "none",
        title: "Face already registered",
        message:
          "This face is already registered to another account. If you think this is a mistake, contact support.",
        errorCode: error.errorCode,
      };
    case VERIFY_ERROR_CODE.SESSION_ALREADY_USED:
      return {
        stage: "session_already_used",
        retry: "new_session",
        title: "Session already used",
        message:
          "This verification session was already used. Start a new check to continue.",
        errorCode: error.errorCode,
      };
    case VERIFY_ERROR_CODE.FACE_CHECK_UNAVAILABLE:
      return {
        stage: "error",
        retry: "retry_verify",
        title: "Temporarily unavailable",
        message:
          "Face verification is temporarily unavailable. Please try again.",
        errorCode: error.errorCode,
      };
    case VERIFY_ERROR_CODE.SESSION_EXPIRED:
      return {
        stage: "error",
        retry: "new_session",
        title: "Session expired",
        message:
          "This verification session expired. Start a new check to continue.",
        errorCode: error.errorCode,
      };
    case VERIFY_ERROR_CODE.SESSION_NOT_FOUND:
      return {
        stage: "error",
        retry: "new_session",
        title: "Session not found",
        message:
          "We couldn't find this verification session. Start a new check to continue.",
        errorCode: error.errorCode,
      };
    default:
      return null;
  }
}

export function getVerifyFailureUi(error: unknown): VerifyFailureUi {
  const verifyError = coerceVerifyApiError(error);
  if (verifyError) {
    const known = uiForKnownCode(verifyError);
    if (known) return known;
    return {
      stage: "error",
      retry: "new_session",
      title: "Verification failed",
      message: verifyError.message || "Something went wrong",
      errorCode: verifyError.errorCode,
    };
  }

  return {
    stage: "error",
    retry: "new_session",
    title: "Verification failed",
    message: error instanceof Error ? error.message : "Something went wrong",
    errorCode: null,
  };
}

export function shouldCreateNewSession(retry: VerifyRetryPolicy): boolean {
  return retry === "new_session";
}
