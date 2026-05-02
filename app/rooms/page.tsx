"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Filter,
  Search,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Sparkles,
  Users,
  Bed,
  Bath,
  Square,
  Star,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";

type Room = {
  id: string;
  roomNumber: string;
  type: "STANDARD" | "DELUXE" | "SUITE" | "PRESIDENTIAL";
  price: number;
  status: "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTENANCE" | "BOOKED";
  description?: string;
  imageUrl?: string;
  capacity: number;
  amenities: string[];
};

const mockRooms: Room[] = [
  {
    id: "1",
    roomNumber: "101",
    type: "STANDARD",
    price: 120,
    status: "AVAILABLE",
    description: "Comfortable standard room with city view",
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800",
    capacity: 2,
    amenities: ["wifi", "tv", "ac", "minibar"],
  },
  {
    id: "2",
    roomNumber: "201",
    type: "DELUXE",
    price: 180,
    status: "AVAILABLE",
    description: "Spacious deluxe room with premium amenities",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
    capacity: 2,
    amenities: ["wifi", "tv", "ac", "minibar", "balcony", "spa"],
  },
  {
    id: "3",
    roomNumber: "301",
    type: "SUITE",
    price: 350,
    status: "OCCUPIED",
    description: "Luxurious suite with separate living area",
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
    capacity: 4,
    amenities: ["wifi", "tv", "ac", "minibar", "balcony", "kitchen", "spa"],
  },
  {
    id: "4",
    roomNumber: "401",
    type: "PRESIDENTIAL",
    price: 600,
    status: "AVAILABLE",
    description: "Presidential suite with panoramic city views",
    imageUrl:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800",
    capacity: 6,
    amenities: [
      "wifi",
      "tv",
      "ac",
      "minibar",
      "balcony",
      "kitchen",
      "spa",
      "jacuzzi",
    ],
  },
];

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  dining: Utensils,
  gym: Dumbbell,
  spa: Sparkles,
  tv: () => <span className="text-sm">📺</span>,
  ac: () => <span className="text-sm">❄️</span>,
  minibar: () => <span className="text-sm">🍾</span>,
  balcony: () => <span className="text-sm">🏠</span>,
  kitchen: () => <span className="text-sm">🍳</span>,
  jacuzzi: () => <span className="text-sm">🛁</span>,
};

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
  const [filters, setFilters] = useState({
    type: "",
    priceRange: "",
    capacity: "",
    status: "AVAILABLE",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = rooms.filter((room) => {
      if (filters.type && room.type !== filters.type) return false;
      if (filters.status && room.status !== filters.status) return false;
      if (filters.capacity && room.capacity < parseInt(filters.capacity))
        return false;

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (max && (room.price < min || room.price > max)) return false;
        if (!max && room.price < min) return false;
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          room.roomNumber.toLowerCase().includes(term) ||
          room.type.toLowerCase().includes(term) ||
          room.description?.toLowerCase().includes(term)
        );
      }

      return true;
    });

    setFilteredRooms(filtered);
  }, [rooms, filters, searchTerm]);

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "STANDARD":
        return "bg-blue-100 text-blue-800";
      case "DELUXE":
        return "bg-green-100 text-green-800";
      case "SUITE":
        return "bg-purple-100 text-purple-800";
      case "PRESIDENTIAL":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "OCCUPIED":
        return "bg-red-100 text-red-800";
      case "BOOKED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Browse our luxurious rooms and suites, each designed for comfort
              and elegance
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search rooms by type, number, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Available Rooms ({filteredRooms.length})
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="STANDARD">Standard</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="SUITE">Suite</option>
                  <option value="PRESIDENTIAL">Presidential</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    setFilters({ ...filters, priceRange: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All Prices</option>
                  <option value="0-150">$0 - $150</option>
                  <option value="151-300">$151 - $300</option>
                  <option value="301-500">$301 - $500</option>
                  <option value="501">$501+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Min Capacity
                </label>
                <select
                  value={filters.capacity}
                  onChange={(e) =>
                    setFilters({ ...filters, capacity: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Any</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="BOOKED">Booked</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const AmenityIcon = amenityIcons[room.amenities[0]] || (() => null);
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={
                      room.imageUrl ||
                      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800"
                    }
                    alt={`Room ${room.roomNumber}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoomTypeColor(room.type)}`}
                    >
                      {room.type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(room.status)}`}
                    >
                      {room.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-gray-900">
                        ${room.price}
                      </span>
                      <span className="text-sm text-gray-600">/night</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Room {room.roomNumber}
                    </h3>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {room.capacity}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{room.description}</p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.slice(0, 4).map((amenity) => {
                      const IconComponent = amenityIcons[amenity];
                      return IconComponent ? (
                        <div
                          key={amenity}
                          className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span className="capitalize">{amenity}</span>
                        </div>
                      ) : null;
                    })}
                    {room.amenities.length > 4 && (
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/booking?roomId=${room.id}`}
                      className={`flex-1 text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                        room.status === "AVAILABLE"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={(e) =>
                        room.status !== "AVAILABLE" && e.preventDefault()
                      }
                    >
                      {room.status === "AVAILABLE" ? "Book Now" : "Unavailable"}
                    </Link>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
