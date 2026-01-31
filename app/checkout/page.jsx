"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../lib/api";


export default function CheckoutPage() {
  const router = useRouter();
  const params = useSearchParams();

  const { hotel, room, checkIn, checkOut, guests } = JSON.parse(
    decodeURIComponent(params.get("data"))
  );

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const confirmBooking = async () => {
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
        totalAmount: nights * room.pricePerNight,
      }),
    });

    const data = await res.json();
    router.push(`/confirm?booking=${data._id}`);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>

      <p>Hotel: {hotel.name}</p>
      <p>Room: {room.title}</p>
      <p>Nights: {nights}</p>
      <p className="font-bold">
        Total: ₹{nights * room.pricePerNight}
      </p>

      <button
        onClick={confirmBooking}
        className="bg-green-600 text-white px-6 py-3 mt-6 rounded"
      >
        Confirm & Pay
      </button>
    </div>
  );
}
