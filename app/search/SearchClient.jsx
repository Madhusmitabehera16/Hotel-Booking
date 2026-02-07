"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { API } from "../lib/api";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("token"));
  };

  // ⛔ LOGIC LEFT UNCHANGED (YES, DUPLICATES INCLUDED)
  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    const cityFromUrl = searchParams.get("location");
    if (cityFromUrl) {
      setLocation(cityFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (location) {
      search();
    }
  }, [location]);

  const search = async () => {
    if (!location.trim()) return;

    const res = await fetch(
      `${API}/hotels/search?location=${encodeURIComponent(location.trim())}`
    );
    const data = await res.json();
    setHotels(Array.isArray(data) ? data : []);
  };

  const handleBook = (hotel) => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }

    router.push(
      `/book/${hotel._id}?hotel=${encodeURIComponent(JSON.stringify(hotel))}`
    );
  };

  return (
    <div className="bg-gray-100 pt-20 min-h-screen">

      {/* ================= HEADER SEARCH BAR ================= */}
      <div className="bg-white shadow-sm p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            className="border px-4 text-gray-900 py-3 rounded w-full"
            placeholder="Enter City / Hotel"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="date"
            className="border text-gray-900 px-4 py-3 rounded w-full md:w-auto"
          />

          <input
            type="date"
            className="border text-gray-900 px-4 py-3 rounded w-full md:w-auto"
          />

          <select className="border text-gray-900 px-4 py-3 rounded w-full md:w-auto">
            <option>Rooms / People</option>
            <option>1 Room, 2 Guests</option>
            <option>2 Rooms, 4 Guests</option>
            <option>1 Room, 3 Guests</option>
            <option>2 Rooms, 6 Guests</option>
          </select>

          <button
            onClick={search}
            className="bg-blue-600 text-white px-6 py-3 rounded w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6">

        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="lg:col-span-3 bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-900 mb-4">Filter</h3>

          <div className="mb-6">
            <p className="text-sm  text-gray-900 font-medium mb-2">Hotel Name</p>
            <input className="border text-gray-900 px-3 py-2 w-full rounded" />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-900 font-medium mb-2">Price</p>
            <input type="range" className="w-full" />
            <p className="text-xs text-gray-900 mt-1">₹1000 - ₹10000</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Property Type</p>
            {["Hotel", "Resort", "Villa", "Guest House"].map((t) => (
              <label key={t} className="flex text-gray-900 items-center gap-2 text-sm">
                <input type="checkbox" /> {t}
              </label>
            ))}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Star Category</p>
            {[5, 4, 3].map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                {"⭐".repeat(s)}
              </label>
            ))}
          </div>
        </aside>

        {/* ================= HOTEL LIST ================= */}
        <main className="lg:col-span-9 space-y-4">
          <p className="text-sm text-gray-900">
            {hotels.length} hotels found · Prices inclusive of taxes
          </p>

          {hotels.map((h) => (
            <div
              key={h._id}
              className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={h.images?.[0] || "https://via.placeholder.com/300"}
                alt={h.name}
                className="w-full md:w-64 h-48 md:h-40 object-cover"
              />

              <div className="flex-1 p-4">
                <h3 className="text-xl text-gray-900 font-semibold">{h.name}</h3>

                <p className="text-sm flex items-center text-gray-900 gap-1">
                  <MapPin size={14} /> {h.address.city}
                </p>

                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-800">{h.rating || 4.5}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    Excellent
                  </span>
                </div>

                <p className="text-xs text-red-500 mt-2">
                  Last booked few hours ago
                </p>
              </div>

              <div className="md:w-48 p-4 border-t md:border-t-0 md:border-l flex flex-col justify-between">
                <div className="text-right">
                  <p className="text-green-600 text-sm font-medium">20% OFF</p>
                  <p className="text-2xl text-gray-900 font-bold">₹{h.minPrice}</p>
                  <p className="text-xs text-gray-900">1 Room / Night</p>
                </div>

                <button
                  onClick={() => handleBook(h)}
                  className="bg-blue-600 text-white py-2 rounded mt-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* ================= LOGIN MODAL ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center mx-4">
            <h3 className="text-xl text-gray-900 font-bold mb-2">Login Required</h3>
            <p className="text-gray-700 mb-6">
              Please log in to continue booking your hotel.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 border text-gray-900 rounded py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/login")}
                className="flex-1 bg-blue-600 text-white rounded py-2"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
