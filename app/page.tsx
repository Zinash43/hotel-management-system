"use client";
import { motion } from "framer-motion";
import { Search, Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6"
          >
            Welcome to KANA
          </motion.h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Luxury redefined in the heart of the city.
          </p>

          <div className="bg-white p-4 rounded-xl shadow-2xl flex flex-wrap items-center gap-4 text-gray-800 max-w-4xl mx-auto">
            <div className="flex-1 min-w-[150px] text-left px-4 border-r">
              <p className="text-xs uppercase font-bold text-gray-400">Check In</p>
              <p className="font-semibold">Select Date</p>
            </div>
            <div className="flex-1 min-w-[150px] text-left px-4">
              <p className="text-xs uppercase font-bold text-gray-400">Guests</p>
              <p className="font-semibold">2 Adults</p>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">
              Check Availability
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}