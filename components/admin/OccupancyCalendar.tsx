"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

const OccupancyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock occupancy data - in real app, this would come from API
  const getRoomStatus = (date: Date, roomNumber: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const mockData: Record<
      string,
      Record<string, "available" | "occupied" | "booked" | "cleaning">
    > = {
      "2026-05-15": {
        "101": "occupied",
        "102": "booked",
        "201": "available",
        "301": "cleaning",
      },
      "2026-05-16": {
        "101": "occupied",
        "102": "occupied",
        "201": "booked",
        "301": "available",
      },
      "2026-05-17": {
        "101": "cleaning",
        "102": "occupied",
        "201": "occupied",
        "301": "booked",
      },
      "2026-05-18": {
        "101": "available",
        "102": "cleaning",
        "201": "occupied",
        "301": "occupied",
      },
    };

    return mockData[dateStr]?.[roomNumber] || "available";
  };

  const rooms = [
    { number: "101", type: "Standard", floor: 1 },
    { number: "102", type: "Standard", floor: 1 },
    { number: "201", type: "Deluxe", floor: 2 },
    { number: "202", type: "Deluxe", floor: 2 },
    { number: "301", type: "Suite", floor: 3 },
    { number: "302", type: "Suite", floor: 3 },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cleaning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "booked":
        return "Booked";
      case "cleaning":
        return "Cleaning";
      default:
        return "Unknown";
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      if (direction === "prev") {
        return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      } else {
        return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
            <span className="text-sm text-gray-600">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-sm text-gray-600">Cleaning</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
            <div className="p-4 font-semibold text-gray-900 border-r border-gray-200">
              Room
            </div>
            {calendarDays.slice(0, 7).map((day) => (
              <div
                key={day.toISOString()}
                className="p-4 text-center font-semibold text-gray-900 border-r border-gray-200 last:border-r-0"
              >
                <div className="text-sm">{format(day, "EEE")}</div>
                <div
                  className={`text-lg ${isToday(day) ? "text-blue-600 font-bold" : ""}`}
                >
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {/* Room Rows */}
          {rooms.map((room) => (
            <div
              key={room.number}
              className="grid grid-cols-8 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="p-4 border-r border-gray-200">
                <div className="font-semibold text-gray-900">{room.number}</div>
                <div className="text-sm text-gray-600">{room.type}</div>
                <div className="text-xs text-gray-500">Floor {room.floor}</div>
              </div>
              {calendarDays.slice(0, 7).map((day) => {
                const status = getRoomStatus(day, room.number);
                return (
                  <div
                    key={day.toISOString()}
                    className={`p-2 border-r border-gray-200 last:border-r-0 flex items-center justify-center min-h-[60px] cursor-pointer hover:opacity-80 transition-opacity`}
                    title={`${room.number} - ${format(day, "MMM d")}: ${getStatusLabel(status)}`}
                  >
                    <div
                      className={`w-full h-full rounded border flex items-center justify-center text-xs font-medium ${getStatusColor(status)}`}
                    >
                      {getStatusLabel(status).charAt(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing 7 days • {rooms.length} rooms total
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Export Calendar
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Bulk Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyCalendar;
