"use client";

import React, { useState } from "react";
import {
  Hotel,
  User,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function HotelBookingAuth() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("guest"); // guest | owner
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ======================
     INPUT HANDLER
  ====================== */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ======================
     LOGIN / REGISTER
  ====================== */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: userType,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     GOOGLE LOGIN
  ====================== */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
          role: userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Google login failed");

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/40 to-blue-600/40" />
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-white p-12">
          <Hotel className="w-20 h-20 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Welcome to LuxStay</h2>
          <p className="text-xl opacity-90">Your journey begins here</p>
        </div>
      </div>

      {/* RIGHT AUTH */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>

          {/* USER TYPE */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setUserType("guest")}
              className={`flex-1 py-3 rounded-xl font-medium ${
                userType === "guest"
                  ? "bg-teal-600 text-white"
                  : "bg-white border"
              }`}
            >
              <User className="inline w-4 h-4 mr-2" />
              Guest
            </button>

            <button
              onClick={() => setUserType("owner")}
              className={`flex-1 py-3 rounded-xl font-medium ${
                userType === "owner"
                  ? "bg-teal-600 text-white"
                  : "bg-white border text-gray-700"
              }`}
            >
              <Building2 className="inline w-4 h-4 mr-2" />
              Owner
            </button>
          </div>

          {/* NAME (REGISTER ONLY) */}
          {!isLogin && (
            <div className="relative mb-4">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full text-black pl-12 py-3 border rounded-xl"
              />
            </div>
          )}

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full text-black pl-12 py-3 border rounded-xl"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full text-black pl-12 py-3 border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="text-black" /> : <Eye className="text-black" />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-700 underline"
            >
              {isLogin ? "Create new account" : "Already have an account?"}
            </button>
          </div>

          {/* GOOGLE LOGIN */}
          {isLogin && (
            <>
              <div className="my-6 text-center text-gray-500">
                Or continue with
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google login failed")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
