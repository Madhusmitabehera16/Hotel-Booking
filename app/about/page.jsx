"use client"
import React, { useState } from 'react';
import { Search, Menu, X, Instagram, Facebook, Twitter, Linkedin, ArrowRight, Trophy, Award, Luggage } from 'lucide-react';

// Main About Page Component
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Section 1: Hero - Welcome to LuxStay */}
      <section className="relative h-screen ">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-xl md:text-2xl text-white/90 mb-6 uppercase tracking-widest">
              WELCOME TO
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 italic" style={{ fontFamily: 'Brush Script MT, cursive' }}>
              LuxStay
            </h1>
            <p className="text-2xl md:text-3xl text-white uppercase tracking-wider mb-12">
              Experience the art of luxury living
            </p>
            <button className="bg-white text-gray-900 rounded-full border border-black px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-gray-100 transition-colors">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Classic Grandeur */}
      <section className="py-24 px-4" style={{ backgroundColor: '#6B5345' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-12">
            Classic grandeur meets<br />modern elegance
          </h2>
          <div className="flex justify-center mb-12">
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&h=600&fit=crop"
              alt="Luxury hotel interior"
              className="rounded-lg shadow-2xl w-80 h-96 object-cover"
            />
          </div>
          <p className="text-xl text-white/90 uppercase tracking-widest">
            IN THE HEART OF THE CITY
          </p>
        </div>
      </section>

      {/* Section 3: Awards & Recognition */}
      <section className="relative py-24 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg p-8 text-center text-white hover:bg-white/20 transition-all">
              <Trophy className="w-16 h-16 mx-auto mb-6 stroke-1" />
              <h3 className="text-xl font-semibold mb-2">2030 Hospitality</h3>
              <p className="text-lg">Excellence Awardee</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg p-8 text-center text-white hover:bg-white/20 transition-all">
              <Award className="w-16 h-16 mx-auto mb-6 stroke-1" />
              <h3 className="text-xl font-semibold mb-2">Travelers'</h3>
              <p className="text-lg">Choice 2030</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg p-8 text-center text-white hover:bg-white/20 transition-all">
              <Luggage className="w-16 h-16 mx-auto mb-6 stroke-1" />
              <h3 className="text-xl font-semibold mb-2">Ranked no. 2 in</h3>
              <p className="text-lg">Urban Journal's Top City Hotels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Welcome to Your Luxurious Home */}
      <section className="py-24 px-4 bg-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-12 leading-tight">
            Welcome to your luxurious home<br />away from home
          </h2>
          
          <div className="flex justify-center mb-12">
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=600&fit=crop"
              alt="Hotel lounge"
              className="rounded-lg shadow-xl w-80 h-80 object-cover border-8 border-white"
            />
          </div>

          <p className="text-lg text-stone-700 leading-relaxed max-w-3xl mx-auto">
            About the hotel. Convince your prospective clients to choose you and your offerings by highlighting the qualities that set you apart from the competition. Your audience is already on your website, so push a little bit harder to seal the deal!
          </p>
        </div>
      </section>

      {/* Section 5: LuxStay Branding */}
      <section className="relative py-32 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="relative text-center">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 italic" style={{ fontFamily: 'Brush Script MT, cursive' }}>
            LuxStay
          </h2>
          <p className="text-xl md:text-2xl text-white uppercase tracking-widest">
            Experience the art of luxury living
          </p>
        </div>
      </section>

      
    </div>
  );
}