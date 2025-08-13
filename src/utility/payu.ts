export interface PayUInitResponse {
  actionURL: string;
  params: Record<string, string | number | boolean | null | undefined>;
}

/**
 * Creates and submits a hidden HTML form to PayU's endpoint with the provided params.
 * Works for Self Hosted Checkout where the merchant generates the hash server-side.
 */
export function createAndSubmitPayUForm(
  actionURL: string,
  params: Record<string, unknown>
): void {
  console.log("A")
  const form = document.createElement("form");
  form.method = "POST";
  form.action = actionURL;
  form.style.display = "none";

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });
  console.log("B")
  document.body.appendChild(form);
  form.submit();
}
