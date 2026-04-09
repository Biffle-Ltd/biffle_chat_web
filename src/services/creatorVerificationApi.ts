import axios, { AxiosError, type AxiosInstance } from "axios";
import { verifApiUri } from "../utility/constants";

function getCreatorVerificationBaseURL(): string {
  const raw = import.meta.env.VITE_VERIF_API_BASE_URL;
  if (typeof raw === "string" && raw.trim() !== "") {
    return raw.trim();
  }
  return verifApiUri;
}

/** Axios instance for creator verification endpoints (base URL only). **/
export const creatorVerificationHttp: AxiosInstance = axios.create({
  baseURL: getCreatorVerificationBaseURL(),
});

export class GenderIneligibleError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "GenderIneligibleError";
    Object.setPrototypeOf(this, GenderIneligibleError.prototype);
  }
}

export class AlreadyVerifiedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AlreadyVerifiedError";
    Object.setPrototypeOf(this, AlreadyVerifiedError.prototype);
  }
}

export type SessionResult =
  | { sessionId: string; expiresAt: string }
  | { alreadyVerified: true };

export type VerifyResult = {
  passed: boolean;
  score: number;
  gender: string | null;
  genderConfidence: number;
  message: string;
};

export type StatusResult = {
  verified: boolean;
  message?: string;
  [key: string]: unknown;
};

type SessionResponseBody = {
  message?: string;
  data?: {
    alreadyVerified?: boolean;
    sessionId?: string;
    expiresAt?: string;
  };
};

function bearerHeaders(token: string) {
  return { Authorization: `Bearer ${token}` } as const;
}

/** POST — returns temporary STS-style keys for Rekognition Face Liveness streaming. */
export const REKOGNITION_STREAM_CREDENTIALS_PATH =
  "/api/v1/creator_center/verification/stream-credentials/";

/** Envelope from `POST .../stream-credentials/` (credential fields parsed in `parseCredentialRecord`). */
export type StreamCredentialsApiResponse = {
  success?: boolean;
  data?: Record<string, unknown>;
  success_message?: string | null;
  organisation_id?: string;
};

export type RekognitionStreamCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration?: Date;
  /** Present when the API includes `organisation_id` on the envelope. */
  organisationId?: string;
};

function parseCredentialRecord(raw: Record<string, unknown>): RekognitionStreamCredentials {
  const accessKeyId = String(raw.accessKeyId ?? raw.access_key_id ?? "").trim();
  const secretAccessKey = String(
    raw.secretAccessKey ?? raw.secret_access_key ?? ""
  ).trim();
  const sessionToken = String(raw.sessionToken ?? raw.session_token ?? "").trim();

  if (!accessKeyId || !secretAccessKey || !sessionToken) {
    throw new Error("Incomplete stream credentials from server");
  }

  let expiration: Date | undefined;
  const exp = raw.expiration ?? raw.expires_at ?? raw.Expiration;
  if (typeof exp === "string" && exp) {
    expiration = new Date(exp);
  } else if (typeof exp === "number") {
    expiration = new Date(exp * 1000);
  }

  return { accessKeyId, secretAccessKey, sessionToken, expiration };
}

/**
 * Temporary AWS credentials for Face Liveness (Rekognition streaming).
 * `sessionId` must match the liveness session from `createSession` / create-session API.
 */
export async function fetchRekognitionStreamCredentials(
  token: string,
  sessionId: string
): Promise<RekognitionStreamCredentials> {
  let data: unknown;
  try {
    const response = await creatorVerificationHttp.post(
      REKOGNITION_STREAM_CREDENTIALS_PATH,
      { sessionId },
      { headers: bearerHeaders(token) }
    );
    data = response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error(
        "Missing backend endpoint: /api/v1/creator_center/verification/stream-credentials/"
      );
    }
    throw error;
  }

  const body = data as StreamCredentialsApiResponse;

  if (body.success === false) {
    const msg =
      typeof body.success_message === "string" && body.success_message.trim() !== ""
        ? body.success_message
        : "Stream credentials request failed";
    throw new Error(msg);
  }

  const raw = body.data ?? (data as Record<string, unknown>);
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid stream credentials response");
  }

  const creds = parseCredentialRecord(raw as Record<string, unknown>);
  const orgId = body.organisation_id;
  if (typeof orgId === "string" && orgId.trim() !== "") {
    return { ...creds, organisationId: orgId.trim() };
  }
  return creds;
}

export function createVerificationClient(token: string) {
  const headers = bearerHeaders(token);

  return {
    async createSession(): Promise<SessionResult> {
      const { data } = await creatorVerificationHttp.post<SessionResponseBody>(
        "/api/v1/creator_center/verification/session/",
        {},
        { headers }
      );

      if (data?.data?.alreadyVerified === true) {
        return { alreadyVerified: true };
      }

      const msg = data?.message;
      if (typeof msg === "string" && msg.includes("Males cannot")) {
        throw new GenderIneligibleError(msg);
      }

      const sessionId = data?.data?.sessionId;
      const expiresAt = data?.data?.expiresAt;
      if (typeof sessionId !== "string" || typeof expiresAt !== "string") {
        throw new Error("Invalid session response: missing sessionId or expiresAt");
      }

      return { sessionId, expiresAt };
    },

    async verifySession(sessionId: string): Promise<VerifyResult> {
      const { data } = await creatorVerificationHttp.post(
        "/api/v1/creator_center/verification/verify/",
        { sessionId },
        { headers }
      );

      const body = data as { data?: VerifyResult };
      const payload = body.data ?? (data as VerifyResult);
      if (!payload || typeof payload !== "object") {
        throw new Error("Invalid verify response");
      }
      return payload as VerifyResult;
    },

    async getStatus(): Promise<StatusResult> {
      const { data } = await creatorVerificationHttp.get(
        "/api/v1/creator_center/verification/status/",
        { headers }
      );

      const body = data as { data?: StatusResult };
      const payload = body.data ?? (data as StatusResult);
      if (!payload || typeof payload !== "object") {
        throw new Error("Invalid status response");
      }
      return payload as StatusResult;
    },
  };
}
