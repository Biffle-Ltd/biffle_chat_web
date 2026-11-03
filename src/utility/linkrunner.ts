const LINKRUNNER_USER_STORAGE_KEY = "lr_uid";

type LinkrunnerClient = {
  _q: unknown[];
  track: (...args: unknown[]) => void;
  identify: (userId: string) => void;
};

type LinkrunnerWindow = Window & {
  lr?: LinkrunnerClient;
};

declare global {
  interface Window {
    lr?: LinkrunnerClient;
  }
}

function browserWindow(): LinkrunnerWindow | null {
  if (typeof globalThis.window === "undefined") return null;
  return globalThis.window;
}

/**
 * Official pre-init stub. Calls made before lr.js loads sit on `window.lr._q`
 * and are replayed after initialization. An existing queue is kept.
 */
function getLinkrunner(): LinkrunnerClient | null {
  const view = browserWindow();
  if (!view) return null;

  const existing = view.lr;
  if (existing && typeof existing.track === "function" && typeof existing.identify === "function") {
    return existing;
  }

  const queue = existing && Array.isArray(existing._q) ? existing._q : [];
  const client: LinkrunnerClient = existing ?? {
    _q: queue,
    track: () => undefined,
    identify: () => undefined,
  };
  client._q = queue;
  client.track = (...args: unknown[]) => {
    client._q.push(args);
  };
  client.identify = (userId: string) => {
    client._q.push(["__identify", userId]);
  };
  view.lr = client;
  return client;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asId(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && value.trim()) return value.trim();
  return null;
}

function asTrait(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function readPhone(record: Record<string, unknown>): string | undefined {
  const direct = asTrait(record.phone) ?? asTrait(record.mobile);
  if (direct) return direct;

  const number = asTrait(record.phone_number);
  if (!number) return undefined;

  const code = asTrait(record.country_code);
  if (!code || number.startsWith("+")) return number;
  const prefix = code.startsWith("+") ? code : `+${code}`;
  if (number.startsWith(prefix) || number.startsWith(code)) return number;
  return `${prefix}${number}`;
}

export function readLinkrunnerUserId(user: unknown): string | null {
  const record = asRecord(user);
  if (!record) return null;

  const sources = [
    record,
    asRecord(record.data),
    asRecord(record.user),
    asRecord(record.result),
  ].filter((source): source is Record<string, unknown> => source !== null);

  for (const source of sources) {
    const id = asId(source.id) ?? asId(source.user_id) ?? asId(source.pk);
    if (id) return id;
  }
  return null;
}

export function readSignupTraits(user: unknown): {
  name?: string;
  email?: string;
  phone?: string;
} {
  const record = asRecord(user);
  if (!record) return {};

  const name =
    asTrait(record.name) ??
    asTrait(record.full_name) ??
    [asTrait(record.first_name), asTrait(record.last_name)].filter(Boolean).join(" ");
  const email = asTrait(record.email) ?? asTrait(record.email_address);
  const phone = readPhone(record);

  return {
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { phone } : {}),
  };
}

/** Matches the login screen: a new account, or a profile that has no user type yet. */
export function isLinkrunnerSignup(user: unknown): boolean {
  const record = asRecord(user);
  if (!record) return false;
  if (record.is_new_user === true || record.is_new_user === 1 || record.is_new_user === "true") {
    return true;
  }
  const userType = record.user_type;
  return userType == null || (typeof userType === "string" && userType.trim() === "");
}

export function identifyLinkrunnerUser(userId: string | number | null | undefined): void {
  const id = asId(userId);
  if (!id) return;
  getLinkrunner()?.identify(id);
}

export function trackLinkrunnerSignup(traits: {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
}): void {
  const payload: Record<string, string> = {};
  const name = asTrait(traits.name);
  const email = asTrait(traits.email);
  const phone = asTrait(traits.phone);
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  getLinkrunner()?.track("signup", payload);
}

export function clearLinkrunnerUser(): void {
  const view = browserWindow();
  if (!view) return;

  try {
    view.localStorage.removeItem(LINKRUNNER_USER_STORAGE_KEY);
  } catch {
    // Private mode or a blocked storage access should not break logout.
  }

  const queue = view.lr?._q;
  if (!Array.isArray(queue)) return;
  view.lr!._q = queue.filter((entry) => {
    if (!Array.isArray(entry)) return true;
    return entry[0] !== "__identify" && entry[0] !== "signup";
  });
}
