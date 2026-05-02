"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  desc: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Special Kitfo",
    category: "Traditional",
    price: 850,
    image: "/kitfo.jpg", // Referring to your local image in the public folder
    desc: "Authentic minced beef seasoned with mitmita and niter kibbeh. Served with ayibe, gomen, and fresh injera.",
  },
  {
    id: 2,
    name: "Classic Eggs Benedict",
    category: "Breakfast",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800",
    desc: "Two poached eggs on toasted muffins with hollandaise sauce.",
  },
  {
    id: 3,
    name: "Hibiscus Tea",
    category: "Drinks",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=800",
    desc: "Refreshing chilled herbal tea with a touch of local honey.",
  },
];

export default function MenuPage() {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-10">
      <header className="bg-white px-6 py-10 text-center border-b mb-6">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
          Kana Dining
        </h1>
        <p className="text-gray-400 text-xs mt-1 font-bold tracking-widest">
          AUTHENTIC ETHIOPIAN CUISINE
        </p>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full bg-gray-200">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>

              {/* Separated Price and Button Section */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">
                    Price
                  </span>
                  <span className="text-xl font-black text-blue-600">
                    {item.price} <span className="text-xs">ETB</span>
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-gray-200"
                >
                  <Plus size={18} />
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Floating Cart (Only shows if items exist) */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-8 inset-x-4 max-w-md mx-auto z-50"
          >
            <div className="bg-blue-600 p-5 rounded-[2rem] shadow-2xl flex justify-between items-center text-white">
              <div className="flex items-center gap-4 pl-2">
                <ShoppingBag />
                <span className="font-bold">{cart.length} Items</span>
              </div>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black uppercase text-sm">
                View Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
