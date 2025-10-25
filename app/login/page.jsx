"use client"
import React, { useState } from 'react';
import { Hotel, User, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function HotelBookingAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('guest');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    hotelName: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Login attempt:', { userType, email: formData.email });
      alert(`Login as ${userType}: ${formData.email}`);
    } else {
      console.log('Registration attempt:', { userType, formData });
      alert(`Registration as ${userType}: ${formData.email}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-blue-600/40"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
          <Hotel className="w-20 h-20 mb-6" />
          <h2 className="text-4xl font-bold mb-4 text-center">Welcome to LuxStay</h2>
          <p className="text-xl text-center opacity-90">Your journey begins here</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center">
              <span ><img className='h-10 w-10 rounded-full' src="/logo.png" alt="logo" /></span>
            </div>
              <span className="text-2xl font-bold text-gray-800">LuxStay</span>
            </div>
          </div>

          <div className="flex justify-end mb-6">
            <select className="text-sm text-teal-700 bg-transparent border border-teal-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Hello Travellers!
          </h1>

          <div className="mb-6">
            <div className="text-3xl font-bold mb-6">
              <span className="text-amber-500">C</span>
              <span className="text-teal-700">
                {isLogin ? 'onnect to' : 'reate new'}
              </span>
              <br />
              <span className="text-teal-700">
                {isLogin ? 'account ↗' : 'account ↓'}
              </span>
            </div>

            <div className="flex space-x-3 mb-6">
              <button
                type="button"
                onClick={() => setUserType('guest')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  userType === 'guest'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Guest</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('owner')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  userType === 'owner'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Hotel Owner</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
              />
            </div>

            {!isLogin && userType === 'owner' && (
              <>
                <div className="relative">
                  <Hotel className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="hotelName"
                    placeholder="Hotel Name"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Confirm Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-teal-700 hover:text-teal-800 font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLogin ? 'Sign In' : 'Create an account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-700 font-semibold hover:text-teal-800 underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}