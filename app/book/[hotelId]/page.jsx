"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Star } from "lucide-react";
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
  if (!checkIn || !checkOut) {
    alert("Please select check-in and check-out dates");
    return;
  }

  const res = await fetch(
    `${API}/rooms/availability?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
  );

  const data = await res.json();

  setRooms(Array.isArray(data) ? data : data.rooms || []);
};



  return (
    <div className="bg-gray-50 pt-12 min-h-screen">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 mb-4"
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>

     {/* IMAGE GALLERY */}
<div className="max-w-7xl mx-auto px-6">
  <div className="grid grid-cols-3 gap-4 rounded-xl overflow-hidden">

    {/* MAIN IMAGE */}
    <img
      src={hotel.images?.[0] || "https://via.placeholder.com/800x600"}
      alt={hotel.name}
      className="col-span-2 h-[420px] w-full object-cover rounded-l-xl"
    />

    {/* SIDE IMAGES */}
    <div className="grid grid-rows-2 gap-4 h-[420px]">
      <img
        src={hotel.images?.[1] || hotel.images?.[0] || "https://via.placeholder.com/400x300"}
        alt=""
        className="w-full h-full object-cover rounded-tr-xl"
      />
      <img
        src={hotel.images?.[2] || hotel.images?.[0] || "https://via.placeholder.com/400x300"}
        alt=""
        className="w-full h-full object-cover rounded-br-xl"
      />
    </div>

  </div>
</div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-12 gap-8">

        {/* LEFT DETAILS */}
        <div className="col-span-8">
          <h1 className="text-3xl text-black font-bold mb-2">{hotel.name}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin size={16} />
            {hotel.address?.city}
            <span className="flex items-center gap-1 ml-4">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {hotel.rating || 4.5}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {hotel.description ||
              "Experience a comfortable and relaxing stay with premium amenities, scenic views, and top-class hospitality."}
          </p>

          {/* AVAILABILITY */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-lg text-black font-semibold mb-4">
              Check Availability
            </h3>

            <div className="flex gap-4">
              <input
                type="date"
                onChange={(e) => setCheckIn(e.target.value)}
                className="border text-gray-800 px-4 py-2 rounded w-full"
              />
              <input
                type="date"
                onChange={(e) => setCheckOut(e.target.value)}
                className="border text-gray-800 px-4 py-2 rounded w-full"
              />
             <select
  value={guests}
  onChange={(e) => setGuests(Number(e.target.value))}
  className="border text-gray-800 px-4 py-2 rounded"
>
  {[1, 2, 3, 4,5].map((g) => (
    <option key={g} value={g}>
      {g} Guests
    </option>
  ))}
</select>

              <button
                onClick={checkAvailability}
                className="bg-blue-600 text-white px-6 rounded"
              >
                Check
              </button>
            </div>
          </div>

          {/* ROOMS */}
          {rooms.map(({ room, availableRooms }) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow p-6 mb-4 flex justify-between"
            >
              <div>
                <h4 className="text-lg text-gray-900 font-semibold mb-1">
                  {room.title}
                </h4>
                <p className="text-sm text-gray-900 mb-2">
                  {room.description}
                </p>
                <p className="text-sm text-green-600">
                  {availableRooms} rooms available
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl text-gray-900 font-bold mb-1">
                  ₹{room.pricePerNight}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  per night
                </p>

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
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT BOOKING CARD */}
        <div className="col-span-4">
          <div className="sticky top-24 bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500 mb-1">
              Starting from
            </p>
            <p className="text-3xl text-gray-900font-bold mb-4">
              ₹{hotel.minPrice}
            </p>

            <button
              onClick={checkAvailability}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              Check Availability
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Free cancellation available
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
