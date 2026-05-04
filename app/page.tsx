"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Standard Room");
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });
  const [bookingStatus, setBookingStatus] = useState("");

  const handleBookNow = (roomType: string) => {
    setSelectedRoom(roomType);
    setShowBookingForm(true);
    setBookingStatus("");
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingStatus("Sending request...");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setBookingStatus(
      "Thank you! Your booking inquiry has been sent. We will contact you shortly.",
    );
    setBookingFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: "",
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Welcome to <span className="text-blue-400">KANA</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Experience luxury redefined in the heart of Addis Ababa. Where
            Ethiopian hospitality meets modern elegance.
          </motion.p>

          {/* Booking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date
                </label>
                <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="text-gray-600">Select Date</span>
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out Date
                </label>
                <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="text-gray-600">Select Date</span>
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Guests
                </label>
                <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg">
                  <Users size={18} className="text-gray-500" />
                  <span className="text-gray-600">2 Adults</span>
                </div>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBookNow("Preferred Room")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Check Availability
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover KANA Hotel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A sanctuary of luxury and comfort in the vibrant heart of Addis
              Ababa, where traditional Ethiopian hospitality meets contemporary
              elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Luxury Experience
              </h3>
              <p className="text-gray-600">
                Indulge in our meticulously designed rooms and suites, crafted
                for ultimate comfort and sophistication.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Authentic Dining
              </h3>
              <p className="text-gray-600">
                Savor traditional Ethiopian cuisine and international flavors in
                our elegant dining spaces.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wellness & Spa
              </h3>
              <p className="text-gray-600">
                Rejuvenate your body and mind with our comprehensive wellness
                and spa treatments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Accommodations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our selection of elegantly appointed rooms and suites,
              each designed to provide the perfect blend of comfort and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800"
                  alt="Standard room"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Standard Room</h3>
                  <p className="text-sm opacity-90">Comfortable and elegant</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    2,500 ETB
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• King size bed</li>
                  <li>• City view</li>
                  <li>• Free Wi-Fi</li>
                  <li>• Room service</li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookNow("Standard Room")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Book Now
                </motion.button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
                  alt="Deluxe suite"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Deluxe Suite</h3>
                  <p className="text-sm opacity-90">Spacious and luxurious</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    4,500 ETB
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• King size bed + sofa</li>
                  <li>• Balcony with view</li>
                  <li>• Mini bar</li>
                  <li>• Jacuzzi</li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookNow("Deluxe Suite")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Book Now
                </motion.button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800"
                  alt="Executive suite"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">Executive Suite</h3>
                  <p className="text-sm opacity-90">Ultimate luxury</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    7,500 ETB
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Master bedroom + living room</li>
                  <li>• Panoramic city view</li>
                  <li>• Private butler service</li>
                  <li>• Premium amenities</li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookNow("Executive Suite")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBookingForm && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Book {selectedRoom}
                </h2>
                <p className="text-gray-600 max-w-2xl mt-3">
                  Fill out the quick booking form and our reservations team will
                  contact you soon.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Close Form
              </button>
            </div>

            <motion.form
              onSubmit={handleBookingSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={bookingFormData.name}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={bookingFormData.email}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+251 911 123 456"
                    value={bookingFormData.phone}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={bookingFormData.guests}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        guests: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {[1, 2, 3, 4].map((count) => (
                      <option key={count} value={count}>
                        {count} Guest{count > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={bookingFormData.checkIn}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        checkIn: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={bookingFormData.checkOut}
                    onChange={(e) =>
                      setBookingFormData({
                        ...bookingFormData,
                        checkOut: e.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  rows={4}
                  placeholder="Add any special requests or preferences"
                  value={bookingFormData.message}
                  onChange={(e) =>
                    setBookingFormData({
                      ...bookingFormData,
                      message: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all"
                >
                  Send Booking Request
                </motion.button>
                {bookingStatus ? (
                  <p className="text-sm text-gray-600">{bookingStatus}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    We will contact you within 1 business day.
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </section>
      )}

      {/* Amenities Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hotel Amenities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enjoy world-class facilities and services designed to make your
              stay unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center rounded-3xl overflow-hidden bg-white/10 p-4 shadow-lg">
              <div className="relative h-28 rounded-3xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400"
                  alt="Hotel Wi-Fi lounge"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Wi-Fi</h3>
              <p className="text-gray-300 text-sm">
                High-speed internet throughout the hotel
              </p>
            </div>
            <div className="text-center rounded-3xl overflow-hidden bg-white/10 p-4 shadow-lg">
              <div className="relative h-28 rounded-3xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400"
                  alt="Fine dining"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fine Dining</h3>
              <p className="text-gray-300 text-sm">
                Multiple restaurants and bars
              </p>
            </div>
            <div className="text-center rounded-3xl overflow-hidden bg-white/10 p-4 shadow-lg">
              <div className="relative h-28 rounded-3xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=400"
                  alt="Fitness center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fitness Center</h3>
              <p className="text-gray-300 text-sm">
                24/7 gym with modern equipment
              </p>
            </div>
            <div className="text-center rounded-3xl overflow-hidden bg-white/10 p-4 shadow-lg">
              <div className="relative h-28 rounded-3xl overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400"
                  alt="Valet parking"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Valet Parking</h3>
              <p className="text-gray-300 text-sm">
                Secure parking for all guests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose KANA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us Addis Ababa's premier luxury hotel
              destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Prime Location
              </h3>
              <p className="text-gray-600">
                Centrally located in Addis Ababa with easy access to business
                districts, shopping, and cultural attractions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                5-Star Service
              </h3>
              <p className="text-gray-600">
                Award-winning hospitality with personalized service that
                anticipates your every need.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Modern Amenities
              </h3>
              <p className="text-gray-600">
                State-of-the-art facilities including high-speed WiFi, fitness
                center, and business services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Culinary Excellence
              </h3>
              <p className="text-gray-600">
                Multiple dining options featuring Ethiopian and international
                cuisine prepared by master chefs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "An exceptional experience from start to finish. The staff was
                incredibly attentive, and the rooms were immaculate. The
                location in Addis Ababa is perfect for both business and leisure
                travelers."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">Business Executive</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "KANA Hotel exceeded all my expectations. The blend of Ethiopian
                hospitality with modern luxury is unparalleled. The dining
                experience was outstanding, and the spa treatments were
                rejuvenating."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">Travel Blogger</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "From the moment I arrived, I felt welcomed and valued. The
                attention to detail in every aspect of the hotel is remarkable.
                It's not just a place to stay - it's an experience to remember."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ahmed Khalid</p>
                  <p className="text-sm text-gray-600">Frequent Guest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">
                      Bole Road, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+251 911 123 456</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">reservations@kana-hotel.et</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-700">
                For bookings or help, contact our reservations team directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KANA</h3>
              <p className="text-gray-300 mb-4">
                Luxury redefined in the heart of Addis Ababa. Experience
                Ethiopian hospitality at its finest.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">F</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">I</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">T</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms"
                    className="hover:text-white transition-colors"
                  >
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu"
                    className="hover:text-white transition-colors"
                  >
                    Dining
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-white transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Room Service</li>
                <li>Concierge</li>
                <li>Laundry</li>
                <li>Business Center</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>+251 911 123 456</p>
                <p>reservations@kana-hotel.et</p>
                <p>Bole Road, Addis Ababa</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 KANA Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
