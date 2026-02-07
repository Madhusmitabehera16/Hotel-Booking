"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, Menu, X, ChevronDown, MoreVertical } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // 🔹 Load user initially + listen for login/logout
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("auth-change", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
    };
  }, []);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    setDropdownOpen(false);
    router.push("/login");
  };
  useEffect(() => {
  const closeMenu = () => setIsMenuOpen(false);
  window.addEventListener("resize", closeMenu);
  return () => window.removeEventListener("resize", closeMenu);
}, []);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="LuxStay"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-2xl font-bold text-gray-900">LuxStay</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-bold text-black hover:font-extrabold">Home</Link>
            <Link href="/search" className="font-bold text-black hover:font-extrabold">Hotels</Link>
            <Link href="/experiences" className="font-bold text-black hover:font-extrabold">Experiences</Link>
            <Link href="/about" className="font-bold text-black hover:font-extrabold">About</Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center space-x-4 relative">

            {/* SEARCH ICON — LINK, NOT BUTTON */}
            <Link
              href="/search"
              className="p-2 hover:bg-gray-100 rounded-full inline-flex items-center justify-center"
            >
              <Search className="w-5 h-5 text-black" />
            </Link>

            {/* AUTH */}
            {!user ? (
              <Link
                href="/login"
                className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800"
              >
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full font-semibold text-gray-900"
                >
                  {user.email}
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
         <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="p-2 rounded-full hover:bg-gray-100"
>
  {isMenuOpen ? (
    <X className="w-6 h-6 text-black" />
  ) : (
    <MoreVertical className="w-6 h-6 text-black" />
  )}
</button>

        </div>
      </div>
      {/* MOBILE MENU */}
{isMenuOpen && (
  <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white border-t shadow-lg">
    <div className="px-4 py-4 space-y-4">

      {/* NAV LINKS */}
      <Link
        href="/"
        onClick={() => setIsMenuOpen(false)}
        className="block font-bold text-black"
      >
        Home
      </Link>

      <Link
        href="/search"
        onClick={() => setIsMenuOpen(false)}
        className="block font-bold text-black"
      >
        Hotels
      </Link>

      <Link
        href="/experiences"
        onClick={() => setIsMenuOpen(false)}
        className="block font-bold text-black"
      >
        Experiences
      </Link>

      <Link
        href="/about"
        onClick={() => setIsMenuOpen(false)}
        className="block font-bold text-black"
      >
        About
      </Link>

      {/* DIVIDER */}
      <hr />

      {/* AUTH SECTION */}
      {!user ? (
        <Link
          href="/login"
          onClick={() => setIsMenuOpen(false)}
          className="block text-center px-6 py-2 bg-black text-white rounded-full font-bold"
        >
          Login
        </Link>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">{user.email}</p>

          <Link
            href="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            Profile
          </Link>

          <Link
            href="/settings"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            Settings
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </nav>
  );
}
