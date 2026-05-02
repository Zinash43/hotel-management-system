"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";

// Mock data for the kitchen
const initialOrders = [
  {
    id: "101",
    room: "305",
    items: ["Special Kitfo x1", "Hibiscus Tea x2"],
    total: 1150,
    status: "pending",
    time: "12:45 PM",
  },
  {
    id: "102",
    room: "204",
    items: ["Classic Eggs Benedict x2"],
    total: 900,
    status: "preparing",
    time: "12:50 PM",
  },
];

export default function KitchenQueue() {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("hotelFoodOrders");
    if (!stored) return;

    try {
      const parsedOrders = JSON.parse(stored);
      if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
        setOrders(parsedOrders);
      }
    } catch {
      // Ignore invalid stored order data
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("hotelFoodOrders", JSON.stringify(orders));
  }, [orders]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnimatePresence>
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">
                  Room Number
                </span>
                <h2 className="text-4xl font-black text-gray-900">
                  {order.room}
                </h2>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                  order.status === "pending"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Received
                </p>
                <p className="font-bold text-gray-900">{order.time}</p>
              </div>

              {order.status === "pending" ? (
                <button
                  onClick={() => updateStatus(order.id, "preparing")}
                  className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  Start Cooking <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(order.id, "delivered")}
                  className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
                >
                  <CheckCircle size={18} /> Mark Delivered
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
