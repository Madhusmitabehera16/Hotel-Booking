"use client"
import React, { useState } from 'react';
import { Search, MapPin, Star, Wifi, Car, Waves, Coffee, Dumbbell, UtensilsCrossed, ChevronLeft, ChevronRight, X, Calendar, Users, CreditCard, Check, Download, Mail, Lock, Building } from 'lucide-react';

// Main App Component
const HotelBookingApp = () => {
  const [currentPage, setCurrentPage] = useState('search');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const hotels = [
    {
      id: 1,
      name: 'Urbanza Suites',
      location: 'Main Road 123 Street, 25 Colony',
      city: 'New York',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      rating: 4.5,
      reviews: 200,
      pricePerNight: 399,
      amenities: ['Room Service', 'Mountain View', 'Pool Access', 'WiFi', 'Parking'],
      starRating: 5,
      roomType: 'suite'
    },
    {
      id: 2,
      name: 'Grand Plaza Hotel',
      location: 'Park Avenue 456, Downtown',
      city: 'New York',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      rating: 4.8,
      reviews: 350,
      pricePerNight: 599,
      amenities: ['WiFi', 'Parking', 'Pool Access', 'Gym', 'Restaurant'],
      starRating: 5,
      roomType: 'luxury'
    },
    {
      id: 3,
      name: 'Comfort Inn Express',
      location: 'Broadway 789, Midtown',
      city: 'New York',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      rating: 4.2,
      reviews: 180,
      pricePerNight: 199,
      amenities: ['WiFi', 'Parking', 'Coffee Shop'],
      starRating: 4,
      roomType: 'double'
    }
  ];

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setCurrentPage('details');
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setCurrentPage('booking');
  };

  const handleProceedToPayment = (details) => {
    setBookingDetails(details);
    setCurrentPage('payment');
  };

  return (
    <div className="font-sans antialiased bg-gray-50 min-h-screen">
      {currentPage === 'search' && (
        <HotelsPage hotels={hotels} onHotelClick={handleHotelClick} />
      )}
      {currentPage === 'details' && selectedHotel && (
        <HotelDetailsPage 
          hotel={selectedHotel} 
          onBack={() => setCurrentPage('search')}
          onBookNow={handleBookNow}
        />
      )}
      {currentPage === 'booking' && selectedHotel && selectedRoom && (
        <BookingPage
          hotel={selectedHotel}
          room={selectedRoom}
          onBack={() => setCurrentPage('details')}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
      {currentPage === 'payment' && selectedHotel && selectedRoom && bookingDetails && (
        <PaymentPage
          hotel={selectedHotel}
          room={selectedRoom}
          bookingDetails={bookingDetails}
          onBack={() => setCurrentPage('booking')}
          onGoHome={() => setCurrentPage('search')}
        />
      )}
    </div>
  );
};

// Hotels Search Page
const HotelsPage = ({ hotels, onHotelClick }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (searchLocation.trim()) {
      setHasSearched(true);
    }
  };

  const AmenityIcon = ({ name }) => {
    const iconMap = {
      'Room Service': UtensilsCrossed,
      'Mountain View': Waves,
      'Pool Access': Waves,
      'WiFi': Wifi,
      'Parking': Car,
      'Gym': Dumbbell,
      'Restaurant': UtensilsCrossed,
      'Coffee Shop': Coffee,
    };
    const IconComponent = iconMap[name] || Star;
    return <IconComponent className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Next Stay</h1>
          <p className="text-gray-600 mb-6">
            Search hundreds of luxury and budget hotels in your desired location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter location (e.g., New York, London, Paris)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <button onClick={handleSearch} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {hasSearched ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Results for "{searchLocation || 'New York'}"</h2>
          <div className="space-y-6">
            {hotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer border border-gray-100" onClick={() => onHotelClick(hotel)}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-80 h-64 flex-shrink-0">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" onError={(e) => e.target.src = `https://placehold.co/800x600/60a5fa/ffffff?text=${encodeURIComponent(hotel.name)}`} />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                            <Building className="w-3 h-3"/> {hotel.city}
                          </p>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-3xl font-extrabold text-blue-600">${hotel.pricePerNight}</div>
                          <div className="text-sm text-gray-600">/night</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="ml-2 text-sm font-semibold text-gray-900">{hotel.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                      </div>

                      <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity, index) => (
                          <div key={index} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            <AmenityIcon name={amenity} />
                            {amenity}
                          </div>
                        ))}
                      </div>
                      <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium text-sm shadow-md">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Building className="w-20 h-20 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Search for hotels</h2>
          <p className="text-gray-600">Enter a location above to find available hotels</p>
        </div>
      )}
    </div>
  );
};

// Hotel Details Page
const HotelDetailsPage = ({ hotel, onBack, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    hotel.image, 
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', 
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'
  ];

  const roomTypes = [
    { id: 1, name: 'Deluxe Room', price: hotel.pricePerNight, beds: '1 King Bed', size: '350 sq ft', available: 5, description: 'Spacious room with a modern design and all essential amenities.' },
    { id: 2, name: 'Executive Suite', price: hotel.pricePerNight + 150, beds: '1 King + Sofa', size: '550 sq ft', available: 3, description: 'Premium suite offering a separate living area and upgraded furnishings.' },
    { id: 3, name: 'Presidential Suite', price: hotel.pricePerNight + 300, beds: '2 King Beds', size: '850 sq ft', available: 2, description: 'Our largest and most luxurious option with panoramic city views.' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const AmenityTag = ({ icon: Icon, label }) => (
    <div className="flex items-center gap-2 text-gray-700">
      <Icon className="w-5 h-5 text-blue-600" />
      <span className="text-sm">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
            <p className="text-gray-600 flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4 text-gray-500" />
              {hotel.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Images + Rooms) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={images[currentImageIndex]} 
                alt="Hotel view" 
                className="w-full h-full object-cover transition duration-300" 
                onError={(e) => e.target.src = `https://placehold.co/900x500/cbd5e1/333333?text=Room+View+${currentImageIndex+1}`} 
              />
              <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition">
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <div key={index} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-5' : 'bg-white/50'}`}></div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                <AmenityTag icon={Wifi} label="High-Speed WiFi" />
                <AmenityTag icon={Car} label="Free Parking" />
                <AmenityTag icon={Waves} label="Infinity Pool" />
                <AmenityTag icon={UtensilsCrossed} label="Fine Dining" />
                <AmenityTag icon={Dumbbell} label="24h Gym" />
                <AmenityTag icon={Coffee} label="Coffee Lounge" />
              </div>
            </div>

            {/* Available Rooms Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <div key={room.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-500 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                            <span>{room.beds}</span> <span>•</span> <span>{room.size}</span>
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-blue-600">${room.price}</div>
                        <div className="text-sm text-gray-600">per night</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-green-600">{room.available} rooms available</span>
                      <button onClick={() => onBookNow(room)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Price/Rating Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
                    <Star className="w-4 h-4 fill-blue-500 text-blue-500 mr-1" />
                    {hotel.rating}
                </div>
                <span className="text-sm text-gray-600">({hotel.reviews} reviews)</span>
              </div>
              
              <div className="text-4xl font-bold text-blue-600 mb-1">${hotel.pricePerNight}</div>
              <div className="text-sm text-gray-600 mb-6">Starting price / night</div>

              <button onClick={() => onBookNow(roomTypes[0])} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-xl shadow-blue-200/50">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Page (Alert replaced with a state-driven error banner)
const BookingPage = ({ hotel, room, onBack, onProceedToPayment }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // <-- Error state added

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const subtotal = room.price * nights;
  const tax = subtotal * 0.12;
  const serviceFee = 50;
  const total = subtotal + tax + serviceFee;

  const handleProceed = () => {
    setErrorMessage(null); // Clear previous errors

    if (!checkIn || !checkOut || nights <= 0) {
      setErrorMessage('Please select valid check-in and check-out dates.');
      return;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !lastName || !email || !phone || !emailRegex.test(email)) {
      setErrorMessage('Please fill in all guest information correctly (Name, Email, and Phone).');
      return;
    }
    
    // Check if checkout date is after checkin date
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    if (startDate >= endDate) {
        setErrorMessage('Check-out date must be after the check-in date.');
        return;
    }

    onProceedToPayment({ checkIn, checkOut, guests, nights, total, firstName, lastName, email, phone });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex justify-between items-center shadow-md" role="alert">
            <span className="block sm:inline font-medium">{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="p-1 -mr-2 rounded-full hover:bg-red-100 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Your Selection */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Selection</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full sm:w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => e.target.src = `https://placehold.co/128x128/60a5fa/ffffff?text=${encodeURIComponent(hotel.name)}`}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <div className="bg-blue-100 px-3 py-1 rounded inline-block">
                    <span className="text-sm font-medium text-blue-800">{room.name} (${room.price})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Calendar className="w-4 h-4"/> Check-in Date</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Calendar className="w-4 h-4"/> Check-out Date</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Users className="w-4 h-4"/> Number of Guests</label>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900">
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {nights > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">Total Stay: <span className="font-bold">{nights} {nights === 1 ? 'night' : 'nights'}</span></p>
                </div>
              )}
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Guest Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h2>
              
              {nights > 0 ? (
                <>
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex justify-between text-gray-700">
                      <span>${room.price.toFixed(2)} × {nights} nights</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Service Fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Taxes (12%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-2xl font-bold mb-6 text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 mb-6">Select dates to see the full price breakdown.</p>
              )}

              <button onClick={handleProceed} disabled={nights <= 0} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold transition shadow-lg shadow-blue-200/50">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Page
const PaymentPage = ({ hotel, room, bookingDetails, onBack, onGoHome }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId] = useState(`BK${Math.floor(Date.now() / 1000)}`); // Simplified ID
  const [saveInfo, setSaveInfo] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      setProcessing(false);
      setBookingComplete(true);
    }, 2500);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center border-t-8 border-green-500">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your reservation has been successfully completed and payment processed.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Booking Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><span className="text-gray-500">Booking ID:</span> <span className="font-semibold text-gray-900 block">{bookingId}</span></p>
              <p><span className="text-gray-500">Hotel:</span> <span className="font-semibold text-gray-900 block">{hotel.name}</span></p>
              <p><span className="text-gray-500">Check-in:</span> <span className="font-semibold text-gray-900 block">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span></p>
              <p><span className="text-gray-500">Check-out:</span> <span className="font-semibold text-gray-900 block">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span></p>
              <p><span className="text-gray-500">Room Type:</span> <span className="font-semibold text-gray-900 block">{room.name}</span></p>
              <p><span className="text-gray-500">Total Paid:</span> <span className="font-extrabold text-green-600 block">${bookingDetails.total.toFixed(2)}</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md" onClick={onGoHome}>
              <Download className="w-5 h-5" />
              Return Home
            </button>
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-semibold" onClick={() => console.log('Simulating email send')}>
              <Mail className="w-5 h-5" />
              Email Confirmation
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            A confirmation email has been sent to <span className="font-medium text-gray-700">{bookingDetails.email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Lock className="w-3 h-3 text-green-500" />
              Secure checkout
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky lg:top-24 border border-gray-100">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-yellow-800">TEST MODE - No actual payment will be processed.</span>
                <Building className="w-4 h-4 text-yellow-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">{hotel.name}</h2>
              <div className="text-4xl font-bold text-green-600 mb-6">${bookingDetails.total.toFixed(2)}</div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Room</span>
                  <span className="font-medium text-gray-900">{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-medium text-gray-900">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-medium text-gray-900">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium text-gray-900">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 mt-3">
                  <span className="text-gray-500">Total Nights</span>
                  <span className="font-medium text-gray-900">{bookingDetails.nights}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue={bookingDetails.email} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Credit / Debit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-4" />
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'cashapp' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}>
                  <input type="radio" name="payment" value="cashapp" checked={paymentMethod === 'cashapp'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" />
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs shadow-sm">$</div>
                  <span className="font-medium text-gray-900">Cash App Pay</span>
                </label>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration</label>
                      <input type="text" placeholder="MM / YY" maxLength="7" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input type="text" placeholder="123" maxLength="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder name</label>
                    <input type="text" placeholder="John Doe" defaultValue={`${bookingDetails.firstName} ${bookingDetails.lastName}`} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country or region</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>India</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP code</label>
                    <input type="text" placeholder="12345" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                  </div>
                </div>
              )}

              {/* Cash App Info */}
              {paymentMethod === 'cashapp' && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-medium">You will be securely redirected to Cash App to authorize the payment of ${bookingDetails.total.toFixed(2)}.</p>
                </div>
              )}
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Billing Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" defaultValue={`${bookingDetails.firstName} ${bookingDetails.lastName}`} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" placeholder="Street address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 mb-3" />
                  <input type="text" placeholder="Apt, suite, etc. (optional)" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input type="text" placeholder="State / Province" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Final Payment Button & Terms */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="save-info" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <label htmlFor="save-info" className="text-sm font-medium text-gray-700">
                  Save this information for next time
                </label>
              </div>
              
              <button 
                onClick={handlePayment} 
                disabled={processing}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 disabled:bg-gray-400 shadow-lg shadow-green-200/50"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirm & Pay ${bookingDetails.total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By confirming this booking you agree to the <span className="underline cursor-pointer hover:text-blue-600">Terms of Service</span> and <span className="underline cursor-pointer hover:text-blue-600">Cancellation Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingApp;
