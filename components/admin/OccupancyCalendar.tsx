"use client";
import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const rooms = ["101", "102", "201", "202", "301"];

export default function OccupancyCalendar() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 uppercase">Occupancy Calendar</h2>
                <div className="flex gap-4 text-xs font-bold">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full" /> Available</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-full" /> Booked</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-400 rounded-full" /> Cleaning</div>
                </div>
            </div>

            <div className="min-w-[600px]">
                {/* Calendar Header */}
                <div className="grid grid-cols-8 border-b pb-4">
                    <div className="text-[10px] font-black text-gray-400 uppercase">Room</div>
                    {days.map(day => (
                        <div key={day} className="text-center text-[10px] font-black text-gray-900 uppercase">{day}</div>
                    ))}
                </div>

                {/* Calendar Rows */}
                {rooms.map(room => (
                    <div key={room} className="grid grid-cols-8 border-b border-gray-50 py-4 items-center">
                        <div className="font-black text-gray-900">{room}</div>
                        {/* Mock Data for the week */}
                        <div className="px-1"><div className="h-8 bg-green-100 rounded-lg border-2 border-green-500" /></div>
                        <div className="px-1"><div className="h-8 bg-blue-600 rounded-lg shadow-md" /></div>
                        <div className="px-1"><div className="h-8 bg-blue-600 rounded-lg" /></div>
                        <div className="px-1"><div className="h-8 bg-orange-100 rounded-lg border-2 border-orange-400" /></div>
                        <div className="px-1"><div className="h-8 bg-green-100 rounded-lg border-2 border-green-500" /></div>
                        <div className="px-1"><div className="h-8 bg-green-100 rounded-lg border-2 border-green-500" /></div>
                        <div className="px-1"><div className="h-8 bg-green-100 rounded-lg border-2 border-green-500" /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}