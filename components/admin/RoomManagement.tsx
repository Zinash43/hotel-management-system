"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { createRoom, deleteRoom } from "@/lib/actions/room.actions.ts";

export default function RoomManagement() {
    // We start with an empty list and will fetch from DB later
    const [rooms, setRooms] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ number: "", type: "Standard", price: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await createRoom({
            number: formData.number,
            type: formData.type,
            price: Number(formData.price)
        });

        if (result.success) {
            // Local update so the UI feels fast
            setRooms([...rooms, result.room]);
            setIsModalOpen(false);
            setFormData({ number: "", type: "Standard", price: "" });
        } else {
            alert(result.error);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this room?")) {
            const result = await deleteRoom(id);
            if (result.success) {
                setRooms(rooms.filter(r => r.id !== id));
            }
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Room Inventory</h2>
                    <p className="text-gray-500 text-sm italic border-l-2 border-blue-600 pl-2">Connected to Neon Database</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={20} /> Add New Room
                </button>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <th className="pb-4">Room No.</th>
                        <th className="pb-4">Category</th>
                        <th className="pb-4">Price (ETB)</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {rooms.map((room) => (
                        <tr key={room.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-5 font-black text-gray-900">{room.roomNumber}</td>
                            <td className="py-5 text-gray-600 font-medium">{room.type}</td>
                            <td className="py-5 font-bold text-gray-900">{room.price.toLocaleString()}</td>
                            <td className="py-5">
                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-100 text-green-600">
                                    {room.status}
                                </span>
                            </td>
                            <td className="py-5 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(room.id)} className="p-2 text-gray-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-gray-900 uppercase">New Room</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400"><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Room Number</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 outline-none focus:border-blue-600"
                                    placeholder="e.g. 101"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Room Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 outline-none focus:border-blue-600"
                                >
                                    <option value="Standard">Standard</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Price (ETB)</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 outline-none focus:border-blue-600"
                                    placeholder="3000"
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest mt-4 flex justify-center items-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Save to Cloud"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}