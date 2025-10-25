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
    <div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hotel Rooms</h1>
          <p className="text-gray-600 mb-6">
            Take advantage of our limited-time offers and special packages to enhance your stay.
          </p>
          
          <div className="flex gap-2 max-w-2xl">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter location (e.g., New York, London, Paris)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button onClick={handleSearch} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {hasSearched ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4 text-gray-600">Found {hotels.length} hotels</div>
          <div className="space-y-6">
            {hotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer" onClick={() => onHotelClick(hotel)}>
                <div className="flex">
                  <div className="w-80 h-64 flex-shrink-0">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{hotel.city}</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">${hotel.pricePerNight}</div>
                        <div className="text-sm text-gray-500">/night</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{hotel.reviews}+ reviews</span>
                    </div>

                    <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{hotel.location}</span>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Search className="w-20 h-20 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Search for hotels</h2>
          <p className="text-gray-500">Enter a location above to find available hotels</p>
        </div>
      )}
    </div>
  );
};

// Hotel Details Page
const HotelDetailsPage = ({ hotel, onBack, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [hotel.image, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'];

  const roomTypes = [
    { id: 1, name: 'Deluxe Room', price: hotel.pricePerNight, beds: '1 King Bed', size: '350 sq ft', available: 5 },
    { id: 2, name: 'Executive Suite', price: hotel.pricePerNight + 150, beds: '1 King + Sofa', size: '550 sq ft', available: 3 },
    { id: 3, name: 'Presidential Suite', price: hotel.pricePerNight + 300, beds: '2 King Beds', size: '850 sq ft', available: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {hotel.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img src={images[currentImageIndex]} alt="Hotel" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4 hover:border-blue-500 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-gray-600 text-sm">{room.beds} • {room.size}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-green-600">{room.available} rooms available</span>
                      <button onClick={() => onBookNow(room)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-xl font-bold">{hotel.rating}</span>
                <span className="text-gray-600">({hotel.reviews} reviews)</span>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-1">${hotel.pricePerNight}</div>
              <div className="text-sm text-gray-500 mb-6">per night</div>

              <button onClick={() => onBookNow(roomTypes[0])} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Page
const BookingPage = ({ hotel, room, onBack, onProceedToPayment }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Please select valid check-in and check-out dates');
      return;
    }
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill in all guest information');
      return;
    }
    onProceedToPayment({ checkIn, checkOut, guests, nights, total, firstName, lastName, email, phone });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Your Selection</h2>
              <div className="flex gap-4">
                <img src={hotel.image} alt={hotel.name} className="w-32 h-32 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <div className="bg-blue-50 px-3 py-1 rounded inline-block">
                    <span className="text-sm font-medium text-blue-700">{room.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {nights > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">Total Stay: {nights} {nights === 1 ? 'night' : 'nights'}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Guest Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Price Summary</h2>
              
              {nights > 0 ? (
                <>
                  <div className="space-y-3 mb-4 pb-4 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>${room.price} × {nights} nights</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Fee</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes (12%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 mb-6">Select dates to see price</p>
              )}

              <button onClick={handleProceed} disabled={nights <= 0} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 font-semibold">
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
const PaymentPage = ({ hotel, room, bookingDetails, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId] = useState(`BK${Date.now()}`);
  const [saveInfo, setSaveInfo] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setBookingComplete(true);
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your reservation has been successfully completed</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="font-semibold">{bookingId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hotel</p>
                <p className="font-semibold">{hotel.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-in</p>
                <p className="font-semibold">{new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out</p>
                <p className="font-semibold">{new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="font-semibold">{bookingDetails.guests}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="font-semibold text-green-600">${bookingDetails.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50">
              <Mail className="w-5 h-5" />
              Email Invoice
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            A confirmation email has been sent to {bookingDetails.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-6">
          {/* Left Side - Booking Summary */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-yellow-800">TEST MODE</span>
                <Building className="w-4 h-4 text-yellow-600" />
              </div>

              <h2 className="text-xl font-bold mb-4">{hotel.name}</h2>
              <div className="text-4xl font-bold text-gray-900 mb-6">${bookingDetails.total.toFixed(2)}</div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room</span>
                  <span className="font-medium">{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{new Date(bookingDetails.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{new Date(bookingDetails.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-600">Nights</span>
                  <span className="font-medium">{bookingDetails.nights}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="col-span-3 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Contact information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue={bookingDetails.email} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Payment method</h2>
              
              <div className="space-y-3 mb-6">
                <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600" />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Card</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cashapp' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                  <input type="radio" name="payment" value="cashapp" checked={paymentMethod === 'cashapp'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600" />
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">$</div>
                  <span className="font-medium">Cash App Pay</span>
                </label>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiration</label>
                      <input type="text" placeholder="MM / YY" maxLength="7" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                      <input type="text" placeholder="123" maxLength="4" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder name</label>
                    <input type="text" placeholder="John Doe" defaultValue={`${bookingDetails.firstName} ${bookingDetails.lastName}`} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country or region</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>India</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP code</label>
                    <input type="text" placeholder="12345" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
              )}

              {/* Cash App Info */}
              {paymentMethod === 'cashapp' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">You'll be redirected to Cash App to complete your payment securely.</p>
                </div>
              )}
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Billing details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" defaultValue={`${bookingDetails.firstName} ${bookingDetails.lastName}`} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" placeholder="Street address" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3" />
                  <input type="text" placeholder="Apt, suite, etc. (optional)" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" placeholder="City" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input type="text" placeholder="State" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Info Checkbox */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <div>
                  <div className="font-medium text-gray-900">Securely save my information for 1-click checkout</div>
                  <div className="text-sm text-gray-500">Pay faster on this site and everywhere Link is accepted.</div>
                </div>
              </label>
            </div>

            {/* Pay Button */}
            <button onClick={handlePayment} disabled={processing} className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay ${bookingDetails.total.toFixed(2)}
                </>
              )}
            </button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Powered by <span className="font-semibold">stripe</span></p>
              <div className="flex justify-center gap-4 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-700">Terms</a>
                <a href="#" className="hover:text-gray-700">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingApp