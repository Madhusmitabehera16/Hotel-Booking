"use client"
import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, Star, ArrowRight } from 'lucide-react';

export default function HotelHomepage() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const hotels = [
    {
      id: 1,
      name: 'Urbanza Suites',
      location: 'Main Road 123 Street, 23 Colony',
      rating: 4.5,
      price: 399,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      bestSeller: true
    },
    {
      id: 2,
      name: 'Urbanza Suites',
      location: 'Main Road 123 Street, 23 Colony',
      rating: 4.5,
      price: 299,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
      bestSeller: false
    },
    {
      id: 3,
      name: 'Urbanza Suites',
      location: 'Main Road 123 Street, 23 Colony',
      rating: 4.5,
      price: 249,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      bestSeller: true
    },
    {
      id: 4,
      name: 'Urbanza Suites',
      location: 'Main Road 123 Street, 23 Colony',
      rating: 4.5,
      price: 199,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      bestSeller: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero Section with Search */}
      <section id="home" className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/20"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-2xl md:text-3xl text-amber-400 mb-4 italic font-serif drop-shadow-lg" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                Welcome to
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl" style={{ fontFamily: 'serif', letterSpacing: '0.02em' }}>
                LUXSTAY
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow">
              Discover the world with LuxStay. Get the best service with us.
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Hotel location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="25 June - 5 July"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Recommended Hotels */}
      <section id="hotels" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recommended Hotels
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {hotel.bestSeller && (
                    <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-gray-900">Best Seller</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">{hotel.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                      <span className="text-gray-500">/night</span>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Featured Destinations */}
      <section id="experience" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Destination
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {hotel.bestSeller && (
                    <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-gray-900">Best Seller</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">{hotel.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-4">
                    <MapPin className="w-4 h-4 text-black mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{hotel.location}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                      <span className="text-gray-500">/night</span>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Newsletter / Stay Inspired */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Inspired
            </h2>
            <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
              Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black hover:bg-gray-900 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors whitespace-nowrap">
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-black mt-6">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: About / Additional Info */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Gateway to Extraordinary Stays
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At QuickStay, we believe that where you stay is just as important as where you go. Our carefully curated collection of hotels, resorts, and unique accommodations ensures that every journey is unforgettable.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From boutique hideaways to luxury resorts, we partner with the world's finest properties to bring you exceptional experiences at every price point.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Learn More About Us
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=500&fit=crop"
                alt="Luxury hotel"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=500&fit=crop"
                alt="Hotel room"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=500&fit=crop"
                alt="Hotel lobby"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=500&fit=crop"
                alt="Resort pool"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}