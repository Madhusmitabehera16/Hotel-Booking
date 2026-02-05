"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../lib/api";

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔐 CHECK LOGIN
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("token"));
  };

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

  // 🔒 HANDLE BOOK CLICK
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
      <div className="bg-white shadow-sm p-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          <input
            className="border text-gray-900 px-4 py-3 rounded w-full"
            placeholder="Enter City / Hotel"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input type="date" className="border text-gray-900 px-4 py-3 rounded" />
          <input type="date" className="border text-gray-900 px-4 py-3 rounded" />
          <select className="border text-gray-900 px-4 py-3 rounded">
            <option>Rooms / People</option>
            <option>1 Room, 2 Guests</option>
          </select>
          <button onClick={search} className="bg-blue-600 text-white px-6 rounded">
            Search
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">

        {/* ================= HOTEL LIST ================= */}
        <main className="col-span-12 space-y-4">
          <p className="text-sm text-gray-900">
            {hotels.length} hotels found · Prices inclusive of taxes
          </p>

          {hotels.map((h) => (
            <div key={h._id} className="bg-white rounded-lg shadow flex overflow-hidden">
              <img
                src={h.images?.[0] || "https://via.placeholder.com/300"}
                alt={h.name}
                className="w-64 h-40 object-cover"
              />

              <div className="flex-1 p-4">
                <h3 className="text-xl font-semibold text-gray-900">{h.name}</h3>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <MapPin size={14} /> {h.address.city}
                </p>

                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{h.rating || 4.5}</span>
                </div>
              </div>

              <div className="w-48 p-4 border-l flex flex-col justify-between">
                <p className="text-2xl font-bold text-gray-900">₹{h.minPrice}</p>

                <button
                  onClick={() => handleBook(h)}
                  className="bg-blue-600 text-white py-2 rounded mt-3"
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
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">
              Please log in to continue booking your hotel.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 border rounded py-2"
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
