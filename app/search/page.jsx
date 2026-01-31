"use client";

import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { API } from "../lib/api";


export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState([]);
  const router = useRouter();

  const search = async () => {
    const res = await fetch(`${API}/hotels/search?location=${location}`);
    const data = await res.json();
    setHotels(data);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Find Hotels</h1>

      <div className="flex gap-3 mb-8">
        <input
          className="border p-3 flex-1 rounded-lg"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={search}
          className="bg-blue-600 text-white px-6 rounded-lg flex items-center gap-2"
        >
          <Search /> Search
        </button>
      </div>

      {hotels.map((h) => (
        <div
          key={h._id}
          onClick={() =>
            router.push(
              `/book/${h._id}?hotel=${encodeURIComponent(JSON.stringify(h))}`
            )
          }
          className="border p-4 mb-4 rounded-xl cursor-pointer hover:shadow"
        >
          <h2 className="text-2xl font-bold">{h.name}</h2>
          <p className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" /> {h.address.city}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {h.rating}
          </div>
          <p className="text-xl font-bold">₹{h.minPrice}/night</p>
        </div>
      ))}
    </div>
  );
}
