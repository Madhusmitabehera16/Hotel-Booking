"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();
  const bookingId = params.get("booking");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen w-full pt-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">

      <div className="max-w-2xl w-full">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg
                className="w-14 h-14 sm:w-20 sm:h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 bg-green-400 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Your reservation has been successfully processed
          </p>

          {/* BOOKING ID */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-sm text-gray-600 mb-2">
              Booking Reference
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 break-all">
              {bookingId || "N/A"}
            </p>
          </div>

          {/* EMAIL SECTION */}
          {!emailSent ? (
            <div className="mb-6 sm:mb-8">
              <p className="text-gray-700 mb-4 font-medium">
                Get your confirmation details via email
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-black border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                />

                <button
                  onClick={handleSendEmail}
                  disabled={isSending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Confirmation"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 sm:mb-8 bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-green-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-semibold text-base sm:text-lg text-center">
                  Confirmation sent to {email}
                </p>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/search")}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* FOOTER MESSAGE */}
        <p className="text-center text-gray-600 mt-6 sm:mt-8 text-sm px-4">
          We've sent a confirmation to your registered email address.  
          Have a wonderful stay! ✨
        </p>

      </div>
    </div>
  );
}
