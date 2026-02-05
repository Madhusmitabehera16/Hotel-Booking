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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSending(false);
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen w-full pt-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg
                className="w-20 h-20 text-white"
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
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your reservation has been successfully processed
          </p>

          {/* Booking ID Display */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {bookingId || "N/A"}
            </p>
          </div>

          {/* Email Section */}
          {!emailSent ? (
            <div className="mb-8">
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
            <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
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
                <p className="font-semibold text-lg">
                  Confirmation sent to {email}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/search")}
              className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all transform hover:scale-105 shadow-lg"
            >
              Back to Home
            </button>
            {/* <button
              onClick={() => router.push("/bookings")}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
            >
              View My Bookings
            </button> */}
          </div>
        </div>

        {/* Footer Message */}
        <p className="text-center text-gray-600 mt-8 text-sm">
          We've sent a confirmation to your registered email address. Have a wonderful stay! ✨
        </p>
      </div>
    </div>
  );
}