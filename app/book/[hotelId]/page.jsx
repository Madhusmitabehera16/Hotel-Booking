"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { API } from "../../lib/api";


export default function BookingPage() {
  const { hotelId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const hotel = JSON.parse(decodeURIComponent(searchParams.get("hotel")));

  const [rooms, setRooms] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const checkAvailability = async () => {
    const res = await fetch(
      `${API}/rooms/availability?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
    const data = await res.json();
    setRooms(data);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button onClick={() => router.back()} className="flex gap-2 mb-4">
        <ChevronLeft /> Back
      </button>

      <h1 className="text-4xl font-bold">{hotel.name}</h1>

      <div className="flex gap-4 my-6">
        <input type="date" onChange={(e) => setCheckIn(e.target.value)} />
        <input type="date" onChange={(e) => setCheckOut(e.target.value)} />
        <select onChange={(e) => setGuests(e.target.value)}>
          {[1, 2, 3, 4].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button
          onClick={checkAvailability}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Check Availability
        </button>
      </div>

      {rooms.map(({ room, availableRooms }) => (
        <div key={room._id} className="border p-4 mb-4 rounded">
          <h3 className="text-xl font-bold">{room.title}</h3>
          <p>₹{room.pricePerNight}/night</p>
          <p className="text-green-600">{availableRooms} rooms available</p>

          <button
            onClick={() =>
              router.push(
                `/checkout?data=${encodeURIComponent(
                  JSON.stringify({
                    hotel,
                    room,
                    checkIn,
                    checkOut,
                    guests,
                  })
                )}`
              )
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}
