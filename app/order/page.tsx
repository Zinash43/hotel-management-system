"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions: string;
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Traditional Ethiopian Coffee",
    description:
      "Freshly roasted Ethiopian coffee served in a traditional jebena",
    price: 45,
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400",
    available: true,
  },
  {
    id: "2",
    name: "Kitfo",
    description: "Minced beef tartare with Ethiopian butter and spices",
    price: 180,
    category: "Main Courses",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400",
    available: true,
  },
  {
    id: "3",
    name: "Doro Wat",
    description: "Spicy chicken stew with hard-boiled eggs and berbere spice",
    price: 220,
    category: "Main Courses",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=400",
    available: true,
  },
  {
    id: "4",
    name: "Injera with Tibs",
    description: "Sautéed beef strips with onions, peppers, and rosemary",
    price: 160,
    category: "Main Courses",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400",
    available: true,
  },
  {
    id: "5",
    name: "Fresh Fruit Salad",
    description: "Seasonal Ethiopian fruits with honey dressing",
    price: 85,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=400",
    available: true,
  },
  {
    id: "6",
    name: "Baklava",
    description: "Traditional honey and nut pastry",
    price: 65,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1481391145929-5bcf89bd963b?q=80&w=400",
    available: true,
  },
];

const categories = ["All", "Beverages", "Main Courses", "Desserts"];

export default function OrderPage() {
  const searchParams = useSearchParams();
  const roomNumber = searchParams.get("room") || "Unknown";

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? mockMenuItems
      : mockMenuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cart.find((item) => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { menuItem, quantity: 1, specialInstructions: "" }]);
    }
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.menuItem.id !== menuItemId));
    } else {
      setCart(
        cart.map((item) =>
          item.menuItem.id === menuItemId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const updateInstructions = (menuItemId: string, instructions: string) => {
    setCart(
      cart.map((item) =>
        item.menuItem.id === menuItemId
          ? { ...item, specialInstructions: instructions }
          : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0,
    );
  };

  const persistOrder = (orderCart: OrderItem[]) => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("hotelFoodOrders");
    const existingOrders = stored ? JSON.parse(stored) : [];

    const newOrder = {
      id: `order-${Date.now()}`,
      room: roomNumber,
      items: orderCart.map((item) => `${item.menuItem.name} x${item.quantity}`),
      total: orderCart.reduce(
        (total, item) => total + item.menuItem.price * item.quantity,
        0,
      ),
      status: "pending",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    window.localStorage.setItem(
      "hotelFoodOrders",
      JSON.stringify([newOrder, ...existingOrders]),
    );
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setOrderStatus("Placing your order...");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    persistOrder(cart);
    setOrderStatus(
      "Order placed successfully! Your food will be delivered to Room " +
        roomNumber +
        " shortly.",
    );
    setCart([]);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Room Service Menu
          </h1>
          <p className="text-xl text-gray-600">
            Order delicious food delivered to your room
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            <span className="font-semibold">Room {roomNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                        {item.price} ETB
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(item)}
                      disabled={!item.available}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        item.available
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {item.available ? "Add to Cart" : "Unavailable"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Order
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {item.menuItem.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.menuItem.price} ETB each
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.menuItem.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.menuItem.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <textarea
                          placeholder="Special instructions..."
                          value={item.specialInstructions}
                          onChange={(e) =>
                            updateInstructions(item.menuItem.id, e.target.value)
                          }
                          className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-sm"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span>{getTotalPrice()} ETB</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </motion.button>

                  {orderStatus && (
                    <p className="mt-4 text-sm text-center text-gray-600">
                      {orderStatus}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
