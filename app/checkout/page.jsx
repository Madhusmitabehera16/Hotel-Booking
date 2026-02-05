"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../lib/api";

const loadRazorpay = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();

  const { hotel, room, checkIn, checkOut, guests } = JSON.parse(
    decodeURIComponent(params.get("data"))
  );

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const totalAmount = nights * room.pricePerNight;

  const confirmBooking = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const orderRes = await fetch(`${API}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const order = await orderRes.json();

    const options = {
      key: "rzp_test_xxxxxxxxx", // 🔴 replace with your key
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
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
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

          {/* LEFT: HOTEL INFO */}
          <div>
            <h3 className="text-xl text-black font-semibold mb-4">Booking Details</h3>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Hotel:</span> {hotel.name}
              </p>
              <p>
                <span className="font-medium">Room:</span> {room.title}
              </p>
              <p>
                <span className="font-medium">Guests:</span> {guests}
              </p>
              <p>
                <span className="font-medium">Check-in:</span>{" "}
                {new Date(checkIn).toDateString()}
              </p>
              <p>
                <span className="font-medium">Check-out:</span>{" "}
                {new Date(checkOut).toDateString()}
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-700">
                🔒 Payments are secured with Razorpay encryption
              </p>
            </div>
          </div>

          {/* RIGHT: PRICE SUMMARY */}
          <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl text-black font-semibold mb-4">
                Price Summary
              </h3>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>
                    ₹{room.pricePerNight} × {nights} nights
                  </span>
                  <span>₹{totalAmount}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxes & fees</span>
                  <span>Included</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
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
  );
}
