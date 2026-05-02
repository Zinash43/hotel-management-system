"use client";
import React from "react";
import { TrendingUp, Users, DollarSign, Calendar, Star } from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,230",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      change: "+5.1%",
      changeType: "positive",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "John Doe",
      room: "101",
      checkIn: "2026-05-15",
      status: "Confirmed",
    },
    {
      id: 2,
      guest: "Jane Smith",
      room: "205",
      checkIn: "2026-05-16",
      status: "Checked In",
    },
    {
      id: 3,
      guest: "Mike Johnson",
      room: "301",
      checkIn: "2026-05-17",
      status: "Pending",
    },
    {
      id: 4,
      guest: "Sarah Wilson",
      room: "102",
      checkIn: "2026-05-18",
      status: "Confirmed",
    },
  ];

  const roomTypePopularity = [
    { type: "Deluxe", bookings: 45, percentage: 35 },
    { type: "Suite", bookings: 32, percentage: 25 },
    { type: "Standard", bookings: 28, percentage: 22 },
    { type: "Presidential", bookings: 22, percentage: 18 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Type Popularity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Room Type Popularity
          </h3>
          <div className="space-y-4">
            {roomTypePopularity.map((room) => (
              <div
                key={room.type}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {room.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {room.bookings} bookings
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${room.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-10">
                    {room.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Bookings
          </h3>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{booking.guest}</p>
                  <p className="text-sm text-gray-600">
                    Room {booking.room} • {booking.checkIn}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "Checked In"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Trends
        </h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              Revenue chart will be displayed here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Integration with charting library needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
