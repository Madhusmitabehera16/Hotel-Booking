"use client";
import { useState, useEffect } from "react";
import { MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const hotelTypes = ["Hotel", "Resort", "Villa", "Guest House"];
const starOptions = [5, 4, 3];
const defaultMaxPrice = 10000;

function normalizePropertyType(hotel) {
  return (
    hotel.propertyType || hotel.type || hotel.category || hotel.hotelType || "Hotel"
  );
}

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cityFromUrl = searchParams?.get("location");
    if (cityFromUrl) {
      setLocation(cityFromUrl);
      search(cityFromUrl);
    }
  }, [searchParams]);

  const isLoggedIn = () => Boolean(localStorage.getItem("token"));

  const search = async (searchLocation = location) => {
    const query = (searchLocation || "").trim();
    if (!query) {
      setFetchError("Please enter a city or hotel to search.");
      return;
    }

    setFetchError("");

    try {
      const res = await fetch(
        `/api/hotels/search?location=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        throw new Error(`Search failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Hotel search failed:", error);
      setHotels([]);
      setFetchError(
        "Unable to load hotels right now. Please check your network or try again later."
      );
    }
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

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const handleStarToggle = (star) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((item) => item !== star) : [...prev, star]
    );
  };

  const filteredHotels = hotels.filter((hotel) => {
    if (
      hotelName &&
      !hotel.name.toLowerCase().includes(hotelName.toLowerCase())
    ) {
      return false;
    }

    if (hotel.minPrice > maxPrice) {
      return false;
    }

    if (selectedTypes.length > 0) {
      const hotelType = normalizePropertyType(hotel);
      if (!selectedTypes.includes(hotelType)) {
        return false;
      }
    }

    if (selectedStars.length > 0) {
      const hotelRating = Math.round(hotel.rating || 0);
      if (!selectedStars.includes(hotelRating)) {
        return false;
      }
    }

    return true;
  });

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
            onClick={() => search()}
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
            <p className="text-sm text-gray-900 font-medium mb-2">Hotel Name</p>
            <input
              className="border text-gray-900 px-3 py-2 w-full rounded"
              placeholder="Filter by hotel name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-900 font-medium">Price</p>
              <span className="text-xs text-gray-600">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min={0}
              max={20000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-900 mt-1">Up to ₹{maxPrice}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 mb-2">Property Type</p>
            {hotelTypes.map((type) => (
              <label key={type} className="flex text-black items-center gap-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                />
                {type}
              </label>
            ))}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Star Category</p>
            {starOptions.map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={selectedStars.includes(s)}
                  onChange={() => handleStarToggle(s)}
                />
                {"⭐".repeat(s)}
              </label>
            ))}
          </div>
        </aside>

        {/* ================= HOTEL LIST ================= */}
        <main className="lg:col-span-9 space-y-4">
          <p className="text-sm text-gray-900">
            {filteredHotels.length} hotels found · Prices inclusive of taxes
          </p>

          {fetchError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
              {fetchError}
            </div>
          )}

          {filteredHotels.length === 0 && !fetchError && (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700">
              No hotels match the selected filters. Try changing the search or clearing filters.
            </div>
          )}

          {filteredHotels.map((h) => (
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
                  <MapPin size={14} /> {h.address?.city || "Unknown city"}
                </p>

                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-800">{h.rating || 4.5}</span>
                  <span className="text-xs text-gray-500 ml-2">Excellent</span>
                </div>

                <p className="text-xs text-red-500 mt-2">Last booked few hours ago</p>
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
