"use client";
import React, { useState } from "react";
import { Utensils, Settings } from "lucide-react";
import RoomManagement from "@/components/admin/RoomManagement";
import KitchenQueue from "@/components/admin/KitchenQueue";

export default function AdminDashboard() {
    // 1. Initial state is "kitchen", which is why you see it first
    const [activeTab, setActiveTab] = useState("kitchen");

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* SIDEBAR */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
                <h2 className="text-2xl font-black mb-10 text-blue-400 uppercase">Kana Admin</h2>

                <nav className="space-y-4">
                    {/* KITCHEN BUTTON */}
                    <button
                        onClick={() => setActiveTab("kitchen")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === "kitchen" ? "bg-blue-600 font-bold" : "opacity-50 hover:opacity-100"
                            }`}
                    >
                        <Utensils size={20} />
                        <span>Kitchen Queue</span>
                    </button>

                    {/* ROOM MANAGEMENT BUTTON */}
                    <button
                        onClick={() => setActiveTab("rooms")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === "rooms" ? "bg-blue-600 font-bold" : "opacity-50 hover:opacity-100"
                            }`}
                    >
                        <Settings size={20} />
                        <span>Manage Rooms</span>
                    </button>
                </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-8">
                {/* 2. Logic to switch views */}
                {activeTab === "kitchen" && (
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Kitchen Queue</h1>
                        <KitchenQueue />
                    </div>
                )}

                {activeTab === "rooms" && (
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Room Management</h1>
                        <RoomManagement />
                    </div>
                )}
            </main>
        </div>
    );
}