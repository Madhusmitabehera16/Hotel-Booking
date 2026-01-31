"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();
  const bookingId = params.get("booking");

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Booking Confirmed 🎉
      </h1>

      <p className="text-lg">Booking ID: {bookingId}</p>

      <button
        onClick={() => router.push("/search")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}
