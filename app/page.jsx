"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Search,
  Star,
  ArrowRight,
} from "lucide-react";
import { Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

export default function HotelHomepage() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  const router = useRouter();

  const handleSearchClick = () => {
    if (!location.trim()) return;

    const params = new URLSearchParams({
      location: location.trim(),
      checkIn,
      checkOut,
      guests,
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* ================= HERO SECTION ================= */}
      <section className="w-full bg-gray-50 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl shadow-xl overflow-hidden">

            <div
              className="relative h-[420px] sm:h-[520px] lg:h-[560px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop)",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  Enjoy your Dream <br /> Vacation
                </h1>
                <p className="text-white/90 text-base sm:text-lg max-w-lg">
                  Book Hotels, Flights and Stay packages at lowest price
                </p>
              </div>
            </div>

            {/* ================= SEARCH BAR ================= */}
            <div className="relative -mt-20 px-4">
              <div className="backdrop-blur-xl bg-white/80 border rounded-3xl shadow-2xl p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                  {/* LOCATION */}
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where are you going?"
                      className="w-full bg-transparent text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* CHECK IN */}
                  <div className="md:border-l md:pl-6">
                    <p className="font-semibold text-gray-800">Check in</p>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* CHECK OUT */}
                  <div className="md:border-l md:pl-6">
                    <p className="font-semibold text-gray-800">Check out</p>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* GUESTS + SEARCH */}
                  <div className="md:border-l md:pl-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Guests</p>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-transparent text-gray-600 outline-none mt-2"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSearchClick}
                      className="ml-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                      <Search size={22} />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY LUXSTAY ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT */}
            <div>
              <h2 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-4">
                Why Thousands of Travelers Choose <br />
                <span className="font-extrabold">LuxStay</span>
              </h2>

              <p className="text-gray-600 max-w-lg mb-6">
                LuxStay brings you closer to your perfect stay. Explore handpicked hotels,
                compare prices, check real-time availability, and book securely.
              </p>

              {/* SOCIAL */}
              <div className="flex gap-4 text-gray-900 mb-8">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 border rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* STATS */}
              <div className="flex text-gray-900 flex-wrap gap-8">
                {[
                  ["12k", "Happy Travelers", "😊"],
                  ["10yrs", "Experience", "🏆"],
                  ["50+", "Destinations", "📍"],
                ].map(([num, text, icon], i) => (
                  <div key={i} className="text-center w-28">
                    <div className="w-12 h-12 mx-auto bg-gray-800 text-white rounded-full flex items-center justify-center mb-2">
                      {icon}
                    </div>
                    <p className="font-bold text-xl">{num}</p>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {[
                ["🗺️", "Local Expertise"],
                ["🧾", "All in One Booking"],
                ["🎧", "24/7 Support"],
              ].map(([icon, title], i) => (
                <div key={i} className="bg-[#6b7f9c] rounded-xl p-6 text-white flex gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-white/90">
                      LuxStay ensures a seamless booking experience.
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= HOTELS ================= */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Recommended Hotels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={hotel.images?.[0]}
                  alt={hotel.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold">{hotel.name}</h3>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      {hotel.rating}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {hotel.address.city}, {hotel.address.state}
                  </p>

                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-xl font-bold">₹{hotel.minPrice}/night</span>
                    <Link href={`/hotels/${hotel._id}`}>
                      <button className="bg-gray-100 hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg">
                        Book
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 rounded-3xl p-8 sm:p-16 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Inspired</h2>
            <p className="text-gray-300 mb-6">
              Get updates on new hotels and exclusive offers
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-black"
              />
              <button className="bg-black px-6 py-4 rounded-lg flex items-center justify-center gap-2">
                Subscribe <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
