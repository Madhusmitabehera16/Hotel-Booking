"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HotelHomepage() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 SEARCH HOTELS FROM BACKEND
  const searchHotels = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        city: location,
        guests,
        checkIn,
        checkOut,
      });

      const res = await fetch(
        `http://localhost:5000/api/hotels/search?${params}`
      );

      const data = await res.json();
      setHotels(data.hotels || []);
    } catch (err) {
      console.error("Hotel search failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 AUTO LOAD HOTELS ON PAGE LOAD
  useEffect(() => {
    searchHotels();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/20" />
        </div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl text-amber-400 mb-4 italic font-serif">
              Welcome to
            </p>
            <h1 className="text-7xl font-bold text-white mb-6">LUXSTAY</h1>
            <p className="text-xl text-white/90 mb-12">
              Discover luxury stays with real-time availability
            </p>

            {/* SEARCH BOX */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City"
                    className="w-full pl-10 py-3 border rounded-lg"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-10 py-3 border rounded-lg"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 py-3 border rounded-lg"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <button
                  onClick={searchHotels}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <Search />
                  Search
                </button>
              </div>
            </div>
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
