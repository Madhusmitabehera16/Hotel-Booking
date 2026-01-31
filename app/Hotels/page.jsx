"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  ChevronLeft,
  Calendar,
  Users,
} from "lucide-react";

/* ================= API CONFIG ================= */
const API = "http://localhost:5000/api";

/* ================= MAIN APP ================= */
export default function HotelBookingApp() {
  const [page, setPage] = useState("search");
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [booking, setBooking] = useState(null);

  return (
    <>
      {page === "search" && (
        <SearchPage
          hotels={hotels}
          setHotels={setHotels}
          onSelect={(h) => {
            setSelectedHotel(h);
            setPage("details");
          }}
        />
      )}

      {page === "details" && selectedHotel && (
        <HotelDetails
          hotel={selectedHotel}
          rooms={rooms}
          setRooms={setRooms}
          onBack={() => setPage("search")}
          onBook={(room) => {
            setSelectedRoom(room);
            setPage("booking");
          }}
        />
      )}

      {page === "booking" && (
        <BookingPage
          hotel={selectedHotel}
          room={selectedRoom}
          onBack={() => setPage("details")}
          onConfirm={(b) => {
            setBooking(b);
            setPage("search");
          }}
        />
      )}
    </>
  );
}

/* ================= SEARCH PAGE ================= */
function SearchPage({ hotels, setHotels, onSelect }) {
  const [location, setLocation] = useState("");

  const search = async () => {
    const res = await fetch(
      `${API}/hotels/search?location=${location}`
    );
    const data = await res.json();
    setHotels(data);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Find Hotels</h1>

      <div className="flex gap-3 mb-8">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
          className="border p-3 flex-1 rounded-lg"
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
          onClick={() => onSelect(h)}
          className="border rounded-xl p-4 mb-4 cursor-pointer hover:shadow"
        >
          <h2 className="text-2xl font-bold">{h.name}</h2>
          <p className="text-gray-600 flex items-center gap-1">
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

/* ================= HOTEL DETAILS ================= */
function HotelDetails({ hotel, rooms, setRooms, onBack, onBook }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const checkAvailability = async () => {
    const res = await fetch(
      `${API}/rooms/availability?hotelId=${hotel._id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
    const data = await res.json();
    setRooms(data);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 mb-4">
        <ChevronLeft /> Back
      </button>

      <h1 className="text-4xl font-bold">{hotel.name}</h1>
      <p className="text-gray-600">{hotel.description}</p>

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
        <div key={room._id} className="border rounded-lg p-4 mb-4">
          <h3 className="text-xl font-bold">{room.title}</h3>
          <p>{room.description}</p>
          <p>₹{room.pricePerNight}/night</p>
          <p className="text-green-600">
            {availableRooms} rooms available
          </p>
          <button
            onClick={() => onBook(room)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= BOOKING PAGE ================= */
function BookingPage({ hotel, room, onBack, onConfirm }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const book = async () => {
    const nights =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        hotel: hotel._id,
        room: room._id,
        checkIn,
        checkOut,
        guests,
        nights,
        totalAmount: nights * room.pricePerNight,
      }),
    });

    const data = await res.json();
    onConfirm(data);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 mb-4">
        <ChevronLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>

      <input type="date" onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" onChange={(e) => setCheckOut(e.target.value)} />
      <select onChange={(e) => setGuests(e.target.value)}>
        {[1, 2, 3, 4].map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      <button
        onClick={book}
        className="bg-green-600 text-white px-6 py-3 mt-4 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
}
