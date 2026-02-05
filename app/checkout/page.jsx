"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ HOOK IS NOW INSIDE COMPONENT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { hotel, room, checkIn, checkOut, guests } = JSON.parse(
    decodeURIComponent(params.get("data"))
  );

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const totalAmount = nights * room.pricePerNight;

  const confirmBooking = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    if (totalAmount <= 0) {
      alert("Invalid booking amount");
      return;
    }

    const orderRes = await fetch(`${API}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const order = await orderRes.json();

    if (!order.id) {
      alert("Order creation failed");
      return;
    }

    const razorpay = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "LuxStay",
      description: "Hotel Booking Payment",
      order_id: order.id,
      handler: async function () {
        const res = await fetch(`${API}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            hotel: hotel._id,
            room: room._id,
            checkIn,
            checkOut,
            guests,
            nights,
            totalAmount,
          }),
        });

        const data = await res.json();
        router.push(`/confirm?booking=${data._id}`);
      },
      theme: { color: "#2563eb" },
    });

    razorpay.open();
  };
  

  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

    {/* HEADER */}
    <div className="bg-gray-900 text-white px-10 py-8">
      <h2 className="text-3xl font-bold">Secure Checkout</h2>
      <p className="text-gray-300 mt-1">
        Complete your booking in just one step
      </p>
    </div>

    {/* CONTENT */}
    <div className="grid md:grid-cols-2 gap-10 p-10">

      {/* LEFT – BOOKING DETAILS */}
      <div className="text-gray-800">
        <h3 className="text-xl font-semibold mb-6 text-black">
          Booking Details
        </h3>

        <div className="space-y-3 text-sm">
          <p>
            <span className="font-medium text-gray-600">Hotel:</span>
            <span className="ml-2 font-semibold text-black">{hotel.name}</span>
          </p>

          <p>
            <span className="font-medium text-gray-600">Room:</span>
            <span className="ml-2 font-semibold text-black">{room.title}</span>
          </p>

          <p>
            <span className="font-medium text-gray-600">Guests:</span>
            <span className="ml-2 font-semibold text-black">{guests}</span>
          </p>

          <p>
            <span className="font-medium text-gray-600">Check-in:</span>
            <span className="ml-2 font-semibold text-black">
              {new Date(checkIn).toDateString()}
            </span>
          </p>

          <p>
            <span className="font-medium text-gray-600">Check-out:</span>
            <span className="ml-2 font-semibold text-black">
              {new Date(checkOut).toDateString()}
            </span>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-700 text-sm">
          🔒 Your payment is secured with Razorpay encryption
        </div>
      </div>

      {/* RIGHT – PRICE SUMMARY */}
      <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-black">
            Price Summary
          </h3>

          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>
                ₹{room.pricePerNight} × {nights} nights
              </span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Taxes & fees</span>
              <span>Included</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-black">
              <span>Total Payable</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <button
          onClick={confirmBooking}
          className="mt-8 bg-green-600 hover:bg-green-700 transition text-white text-lg font-semibold py-4 rounded-xl w-full"
        >
          Pay ₹{totalAmount} Securely
        </button>

        <p className="text-xs text-center text-gray-500 mt-3">
          By proceeding, you agree to LuxStay’s terms & cancellation policy
        </p>
      </div>

    </div>
  </div>
</div>
  )
}