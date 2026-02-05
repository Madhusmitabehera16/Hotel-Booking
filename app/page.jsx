
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
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
    <div className="min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
     <section className="w-full bg-gray-50 pt-18 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[32px] overflow-visible shadow-xl">
            <div
              className="relative h-[560px] rounded-[32px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop)",
              }}
            >
              <div className="absolute inset-0 rounded-[32px] bg-black/35" />

              <div className="absolute inset-0 flex flex-col justify-center px-20">
                <h1 className="text-6xl font-bold text-white leading-tight mb-5">
                  Enjoy your Dream <br /> Vacation
                </h1>
                <p className="text-white/90 text-xl max-w-lg">
                  Book Hotels, Flights and Stay packages at lowest price
                </p>
              </div>
            </div>

            {/* ================= SEARCH BAR ================= */}
            <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[96%]">
              <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl shadow-2xl px-10 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8">

                  {/* LOCATION */}
                  <div>
                    <p className="text-base font-semibold text-gray-800">
                      Location
                    </p>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where are you going?"
                      className="w-full bg-transparent text-base text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* CHECK IN */}
                  <div className="md:border-l md:pl-8">
                    <p className="text-base font-semibold text-gray-800">
                      Check in
                    </p>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-base text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* CHECK OUT */}
                  <div className="md:border-l md:pl-8">
                    <p className="text-base font-semibold text-gray-800">
                      Check out
                    </p>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-base text-gray-600 outline-none mt-2"
                    />
                  </div>

                  {/* GUESTS + SEARCH */}
                  <div className="md:border-l md:pl-8 flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-gray-800">
                        Guests
                      </p>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-transparent text-base text-gray-600 outline-none mt-2"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSearchClick}
                      className="ml-8 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
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


<section className="w-full bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

      {/* LEFT CONTENT */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">
          Why Thousands of Travelers Choose <br />
          <span className="font-extrabold">LuxStay</span> for Their travelling journeys
        </h2>

        <p className="text-gray-600 max-w-lg mb-6">
          LuxStay brings you closer to your perfect stay. Explore handpicked hotels, compare prices, check real-time availability, and book securely in just a few clicks. Whether it’s a weekend getaway or a long vacation, LuxStay makes every journey effortless and memorable.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 text-gray-700">
          <div className="flex gap-4">
  {/* Instagram */}
  <a
    href="https://instagram.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
  >
    <Instagram className="w-4 h-4 text-gray-700" />
  </a>

  {/* Twitter / X */}
  <a
    href="https://twitter.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
  >
    <Twitter className="w-4 h-4 text-gray-700" />
  </a>

  {/* Facebook */}
  <a
    href="https://facebook.com/yourpage"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
  >
    <Facebook className="w-4 h-4 text-gray-700" />
  </a>
</div>

        </div>

        {/* STATS */}
        <div className="flex gap-12 mt-10">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-800 text-white flex items-center justify-center mb-2">
              😊
            </div>
            <p className="text-xl text-black font-bold">12k</p>
            <p className="text-sm text-gray-600">
              Happy and Satisfied Travelers
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-800 text-white flex items-center justify-center mb-2">
              🏆
            </div>
            <p className="text-xl text-black font-bold">10yrs</p>
            <p className="text-sm text-gray-600">
              Proven Travel Industry Experience
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-800 text-white flex items-center justify-center mb-2">
              📍
            </div>
            <p className="text-xl text-black font-bold">50+</p>
            <p className="text-sm text-gray-600">
              All India Destinations Covered
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FEATURES */}
      <div className="space-y-6">
        <div className="bg-[#6b7f9c] rounded-xl p-6 text-white flex gap-4 items-start">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            🗺️
          </div>
          <div>
            <h4 className="font-semibold mb-1">Local Expertise</h4>
            <p className="text-sm text-white/90">
             LuxStay is a smart hotel booking platform built for modern travelers
            </p>
          </div>
        </div>

        <div className="bg-[#6b7f9c] rounded-xl p-6 text-white flex gap-4 items-start">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            🧾
          </div>
          <div>
            <h4 className="font-semibold mb-1">All in One Booking</h4>
            <p className="text-sm text-white/90">
              From budget stays to luxury resorts, LuxStay offers secure payments, real-time availability, and a seamless booking experience—all in one place.
            </p>
          </div>
        </div>

        <div className="bg-[#6b7f9c] rounded-xl p-6 text-white flex gap-4 items-start">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            🎧
          </div>
          <div>
            <h4 className="font-semibold mb-1">24/7 Support</h4>
            <p className="text-sm text-white/90">
              We’re here anytime, anywhere. Get real help before, during, or
              after your trip.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* ================= HOTELS ================= */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Recommended Hotels
          </h2>

          {loading && (
            <p className="text-center text-gray-500">Loading hotels...</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="h-64">
                  <img
                    src={hotel.images?.[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold">{hotel.name}</h3>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      {hotel.rating}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {hotel.address.city}, {hotel.address.state}
                  </p>

                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <span className="text-3xl font-bold">
                        ₹{hotel.minPrice}
                      </span>
                      <span className="text-gray-500">/night</span>
                    </div>

                    <Link href={`/hotels/${hotel._id}`}>
                      <button className="bg-gray-100 hover:bg-gray-900 hover:text-white px-6 py-2 rounded-lg">
                        Book Now
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
          <div className="bg-gray-900 rounded-3xl p-16 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Stay Inspired</h2>
            <p className="text-gray-300 mb-8">
              Get updates on new hotels and exclusive offers
            </p>

            <div className="flex gap-4 max-w-md mx-auto">
              <input
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg"
              />
              <button className="bg-black px-8 py-4 rounded-lg flex items-center gap-2">
                Subscribe <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
