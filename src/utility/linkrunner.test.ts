import { afterEach, describe, expect, it } from "vitest";
import {
  clearLinkrunnerUser,
  identifyLinkrunnerUser,
  isLinkrunnerSignup,
  readLinkrunnerUserId,
  readSignupTraits,
  trackLinkrunnerSignup,
} from "./linkrunner";

type MemoryStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

type TestLinkrunner = {
  _q: unknown[];
  track?: (...args: unknown[]) => void;
  identify?: (userId: string) => void;
};

type TestWindow = {
  localStorage: MemoryStorage;
  lr?: TestLinkrunner;
};

function installBrowser() {
  const store = new Map<string, string>();
  const localStorage: MemoryStorage = {
    getItem: (key) => (store.has(key) ? store.get(key)! : null),
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
  };
  const view: TestWindow = { localStorage };
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: view,
  });
  return { store, view };
}

afterEach(() => {
  Reflect.deleteProperty(globalThis, "window");
});

describe("linkrunner user identity", () => {
  it("reads a stable id from the top level or a nested payload", () => {
    expect(readLinkrunnerUserId({ id: 42 })).toBe("42");
    expect(readLinkrunnerUserId({ user_id: " usr_9 " })).toBe("usr_9");
    expect(readLinkrunnerUserId({ data: { pk: "pk-1" } })).toBe("pk-1");
    expect(readLinkrunnerUserId({ id: "  " })).toBeNull();
    expect(readLinkrunnerUserId(null)).toBeNull();
  });

  it("builds signup traits without throwing on numeric phone fields", () => {
    expect(
      readSignupTraits({
        full_name: "Ada",
        email_address: "ada@biffle.ai",
        country_code: "91",
        phone_number: 9876543210,
      })
    ).toEqual({
      name: "Ada",
      email: "ada@biffle.ai",
      phone: "+919876543210",
    });
  });

  it("treats a missing user type as a signup, and an existing fan as a return visit", () => {
    expect(isLinkrunnerSignup({ is_new_user: false, user_type: "" })).toBe(true);
    expect(isLinkrunnerSignup({ is_new_user: "true", user_type: "fan" })).toBe(true);
    expect(isLinkrunnerSignup({ is_new_user: false, user_type: "fan" })).toBe(false);
  });
});

describe("linkrunner browser queue", () => {
  it("queues identify and signup before the SDK loads, and keeps an existing queue", () => {
    const { view } = installBrowser();
    view.lr = { _q: [["page"]] };

    identifyLinkrunnerUser("user-1");
    trackLinkrunnerSignup({ name: "Ada", phone: 9876543210 });

    expect(view.lr?._q).toEqual([
      ["page"],
      ["__identify", "user-1"],
      ["signup", { name: "Ada", phone: "9876543210" }],
    ]);
  });

  it("does not queue a blank id", () => {
    const { view } = installBrowser();
    identifyLinkrunnerUser("   ");
    expect(view.lr).toBeUndefined();
  });

  it("drops the stored user and any queued identity calls on logout", () => {
    const { store, view } = installBrowser();
    store.set("lr_uid", "user-1");
    identifyLinkrunnerUser("user-1");
    trackLinkrunnerSignup({ name: "Ada" });
    view.lr?._q.push(["purchase", { amount: 10 }]);

    clearLinkrunnerUser();

    expect(store.has("lr_uid")).toBe(false);
    expect(view.lr?._q).toEqual([["purchase", { amount: 10 }]]);
  });
});
