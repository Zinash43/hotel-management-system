"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CreditCard,
  User,
  Settings,
  LogOut,
  Eye,
  Download,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";

type Booking = {
  id: string;
  roomNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  status: "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED";
  totalAmount: number;
  createdAt: string;
};

type Payment = {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  createdAt: string;
};

const mockBookings: Booking[] = [
  {
    id: "1",
    roomNumber: "101",
    roomType: "DELUXE",
    checkInDate: "2026-05-15",
    checkOutDate: "2026-05-17",
    status: "CONFIRMED",
    totalAmount: 360,
    createdAt: "2026-05-01",
  },
  {
    id: "2",
    roomNumber: "201",
    roomType: "SUITE",
    checkInDate: "2026-06-01",
    checkOutDate: "2026-06-05",
    status: "CHECKED_IN",
    totalAmount: 1400,
    createdAt: "2026-05-20",
  },
];

const mockPayments: Payment[] = [
  {
    id: "1",
    bookingId: "1",
    amount: 360,
    method: "STRIPE",
    status: "COMPLETED",
    createdAt: "2026-05-01",
  },
  {
    id: "2",
    bookingId: "2",
    amount: 1400,
    method: "CHAPA",
    status: "COMPLETED",
    createdAt: "2026-05-20",
  },
  {
    id: "3",
    bookingId: "3",
    amount: 240,
    method: "CASH",
    status: "COMPLETED",
    createdAt: "2026-05-15",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "bookings" | "payments" | "profile"
  >("bookings");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "CHECKED_IN":
        return "bg-green-100 text-green-800";
      case "CHECKED_OUT":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle className="w-4 h-4" />;
      case "CHECKED_IN":
        return <CheckCircle className="w-4 h-4" />;
      case "CHECKED_OUT":
        return <Clock className="w-4 h-4" />;
      case "CANCELLED":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">john.doe@email.com</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === "bookings"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </button>

                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === "payments"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Payment History
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Profile Settings
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 mt-6">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "bookings" && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                      My Bookings
                    </h1>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Book New Room
                    </button>
                  </div>

                  <div className="grid gap-6">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white p-6 rounded-xl shadow-lg"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              Room {booking.roomNumber} - {booking.roomType}
                            </h3>
                            <p className="text-gray-600">
                              {booking.checkInDate} to {booking.checkOutDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(booking.status)}
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                            >
                              {booking.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-gray-900">
                            ${booking.totalAmount}
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                              Receipt
                            </button>
                            {booking.status === "CONFIRMED" && (
                              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900">
                    Payment History
                  </h1>

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Booking
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Method
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {mockPayments.map((payment) => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(
                                  payment.createdAt,
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                Booking #{payment.bookingId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${payment.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {payment.method}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(payment.status)}`}
                                >
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Download className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h1 className="text-3xl font-bold text-gray-900">
                    Profile Settings
                  </h1>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@email.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 234 567 8900"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Booking Details
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Room:</span>
                <p className="font-medium">
                  Room {selectedBooking.roomNumber} - {selectedBooking.roomType}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Check-in:</span>
                <p className="font-medium">{selectedBooking.checkInDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Check-out:</span>
                <p className="font-medium">{selectedBooking.checkOutDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}
                >
                  {selectedBooking.status.replace("_", " ")}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Total Amount:</span>
                <p className="font-bold text-lg">
                  ${selectedBooking.totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
