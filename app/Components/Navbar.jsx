"use client";
import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center">
              <span ><img className='h-10 w-10 rounded-full' src="/logo.png" alt="logo" /></span>
            </div>
            <span className="text-2xl font-bold text-gray-900">LuxStay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-black hover:font-extrabold transition-colors font-bold">
              Home
            </Link>
            <Link href="/Hotels" className="text-black hover:font-extrabold transition-colors font-bold">
              Hotels
            </Link>
            <Link href="/experiences" className="text-black hover:font-extrabold transition-colors font-bold">
              Experiences
            </Link>
            <Link href="/about" className="text-black hover:font-extrabold transition-colors font-bold">
              About
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-black" />
            </button>
            <Link 
  href="/login" 
  className="px-6 py-2 bg-black text-black rounded-full hover:bg-gray-800 transition-colors font-bold"
>
  Login
</Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-black hover:font-extrabold transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/hotels" className="text-black hover:font-extrabold transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>
                Hotels
              </Link>
              <Link href="/experiences" className="text-black hover:font-extrabold transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>
                Experiences
              </Link>
              <Link href="/about" className="text-black hover:font-extrabold transition-colors font-bold" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <button className="px-6 py-2 bg-black text-black rounded-full hover:bg-gray-800 transition-colors font-bold w-full">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
