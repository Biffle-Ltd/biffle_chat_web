import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { apiUri } from "../utility/constants";

interface PayUCallbackProps {
  onNavigate: (page: string) => void;
}

export default function PayUCallback({ onNavigate }: PayUCallbackProps) {
  const [status, setStatus] = React.useState<
    "processing" | "success" | "failed"
  >("processing");
  const [message, setMessage] = React.useState<string>(
    "Verifying your payment..."
  );

  React.useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        );
        const token = localStorage.getItem("authToken");

        // Notify backend to verify payment
        await fetch(`${apiUri}/api/v1/monetization/payu/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({...params}),
        });

        // Refresh user details to get new coin balance
        if (token) {
          const userDetailsResponse = await fetch(
            `${apiUri}/api/v1/user_center/details/get-user-details/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            const storedUserData = localStorage.getItem("userData");
            const previous = storedUserData ? JSON.parse(storedUserData) : {};
            localStorage.setItem(
              "userData",
              JSON.stringify({ ...previous, ...userDetails, token })
            );
          }
        }

        // Decide success/failure based on query param if present
        const paymentStatus = (params["status"] || "").toString().toLowerCase();
        if (paymentStatus === "success") {
          setStatus("success");
          setMessage(
            "Payment successful! Coins have been added to your account."
          );
          setTimeout(() => {
            // Force reload to re-hydrate user state from localStorage
            window.location.href = "/coins";
          }, 1500);
        } else if (
          paymentStatus === "failure" ||
          paymentStatus === "failed" ||
          paymentStatus === "error"
        ) {
          setStatus("failed");
          setMessage("Payment failed or was cancelled.");
          setTimeout(() => onNavigate("payment-summary"), 1500);
        } else {
          // If unclear, send to coins after refresh
          setStatus("success");
          setMessage("Payment processed. Redirecting...");
          setTimeout(() => {
            window.location.href = "/coins";
          }, 1200);
        }
      } catch (err) {
        console.error("Verification error", err);
        setStatus("failed");
        setMessage("Could not verify payment.");
        setTimeout(() => onNavigate("payment-summary"), 1500);
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center w-full max-w-md">
        {status === "processing" && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-700">{message}</p>
          </div>
        )}
        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <p className="text-gray-800 font-semibold mb-1">
              Payment Successful
            </p>
            <p className="text-gray-600">{message}</p>
          </div>
        )}
        {status === "failed" && (
          <div className="flex flex-col items-center">
            <XCircle className="h-12 w-12 text-red-600 mb-4" />
            <p className="text-gray-800 font-semibold mb-1">Payment Failed</p>
            <p className="text-gray-600">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
