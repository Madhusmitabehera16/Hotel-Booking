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
  const [userType, setUserType] = useState("guest");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    hotelName: "",
    phone: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Login:", formData);
    } else {
      console.log("Register:", formData);
    }
  };

  // 🔐 GOOGLE LOGIN HANDLER
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: credentialResponse.credential,
          userType,
        }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE SECTION */}
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

      {/* RIGHT AUTH SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>

          {/* USER TYPE */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => setUserType("guest")}
              className={`flex-1 py-3 rounded-xl ${
                userType === "guest"
                  ? "bg-teal-600 text-white"
                  : "bg-white border"
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => setUserType("owner")}
              className={`flex-1 py-3 rounded-xl ${
                userType === "owner"
                  ? "bg-teal-600 text-white"
                  : "bg-white border"
              }`}
            >
              Hotel Owner
            </button>
          </div>

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 py-3 border rounded-xl"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 py-3 border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          {/* TOGGLE */}
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
                  onError={() => console.log("Google Login Failed")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
