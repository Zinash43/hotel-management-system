"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { format, addDays, differenceInDays } from "date-fns";

type BookingStep = "dates" | "details" | "payment" | "confirmation";

interface BookingData {
  roomId: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guestCount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

const mockRoom = {
  id: "1",
  roomNumber: "101",
  type: "DELUXE",
  price: 180,
  description: "Spacious deluxe room with premium amenities",
  imageUrl:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
  capacity: 2,
  amenities: ["wifi", "tv", "ac", "minibar", "balcony"],
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading booking...
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}

function BookingPageContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [currentStep, setCurrentStep] = useState<BookingStep>("dates");
  const [bookingData, setBookingData] = useState<BookingData>({
    roomId: roomId || "",
    checkInDate: null,
    checkOutDate: null,
    guestCount: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: "dates", title: "Select Dates", icon: Calendar },
    { id: "details", title: "Guest Details", icon: User },
    { id: "payment", title: "Payment", icon: CreditCard },
    { id: "confirmation", title: "Confirmation", icon: CheckCircle },
  ];

  const calculateTotal = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0;
    const nights = differenceInDays(
      bookingData.checkOutDate,
      bookingData.checkInDate,
    );
    return nights * mockRoom.price;
  };

  const handleNext = () => {
    const stepOrder = ["dates", "details", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1] as BookingStep);
    }
  };

  const handlePrev = () => {
    const stepOrder = ["dates", "details", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1] as BookingStep);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCurrentStep("confirmation");
    setIsProcessing(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "dates":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Stay Dates
              </h2>
              <p className="text-gray-600">
                Choose your check-in and check-out dates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  min={format(new Date(), "yyyy-MM-dd")}
                  value={
                    bookingData.checkInDate
                      ? format(bookingData.checkInDate, "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      checkInDate: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  min={
                    bookingData.checkInDate
                      ? format(
                          addDays(bookingData.checkInDate, 1),
                          "yyyy-MM-dd",
                        )
                      : format(addDays(new Date(), 1), "yyyy-MM-dd")
                  }
                  value={
                    bookingData.checkOutDate
                      ? format(bookingData.checkOutDate, "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      checkOutDate: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests
              </label>
              <select
                value={bookingData.guestCount}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    guestCount: parseInt(e.target.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case "details":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Guest Information
              </h2>
              <p className="text-gray-600">
                Please provide your contact details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={bookingData.firstName}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={bookingData.lastName}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, lastName: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) =>
                  setBookingData({ ...bookingData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    specialRequests: e.target.value,
                  })
                }
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Any special requests or notes..."
              />
            </div>
          </motion.div>
        );

      case "payment":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Information
              </h2>
              <p className="text-gray-600">Secure payment processing</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    defaultChecked
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium">
                      Credit/Debit Card (Stripe)
                    </span>
                  </div>
                </div>
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="chapa"
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🇪🇹</span>
                    <span className="font-medium">
                      Chapa (Ethiopian Payments)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-800">Demo Mode:</span>
                <span className="text-sm font-medium text-blue-800">
                  Payment processing is simulated
                </span>
              </div>
            </div>
          </motion.div>
        );

      case "confirmation":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 mb-8">
              Your reservation has been successfully processed. A confirmation
              email has been sent to {bookingData.email}.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">
                Booking Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">
                    Room {mockRoom.roomNumber} ({mockRoom.type})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">
                    {bookingData.checkInDate
                      ? format(bookingData.checkInDate, "MMM dd, yyyy")
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">
                    {bookingData.checkOutDate
                      ? format(bookingData.checkOutDate, "MMM dd, yyyy")
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{bookingData.guestCount}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-900 font-semibold">Total:</span>
                  <span className="font-bold text-lg">${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            {currentStep !== "confirmation" && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === "dates"}
                  className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                <button
                  onClick={
                    currentStep === "payment" ? handleSubmit : handleNext
                  }
                  disabled={
                    (currentStep === "dates" &&
                      (!bookingData.checkInDate ||
                        !bookingData.checkOutDate)) ||
                    (currentStep === "details" &&
                      (!bookingData.firstName ||
                        !bookingData.lastName ||
                        !bookingData.email)) ||
                    isProcessing
                  }
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : currentStep === "payment" ? (
                    <>
                      Complete Booking
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Booking Summary
              </h3>

              {/* Room Info */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={mockRoom.imageUrl}
                  alt="Room"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Room {mockRoom.roomNumber}
                  </h4>
                  <p className="text-sm text-gray-600">{mockRoom.type}</p>
                  <p className="text-sm text-gray-600">
                    {mockRoom.capacity} guests
                  </p>
                </div>
              </div>

              {/* Dates */}
              {bookingData.checkInDate && bookingData.checkOutDate && (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">
                      {format(bookingData.checkInDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">
                      {format(bookingData.checkOutDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nights:</span>
                    <span className="font-medium">
                      {differenceInDays(
                        bookingData.checkOutDate,
                        bookingData.checkInDate,
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    ${mockRoom.price} ×{" "}
                    {bookingData.checkInDate && bookingData.checkOutDate
                      ? differenceInDays(
                          bookingData.checkOutDate,
                          bookingData.checkInDate,
                        )
                      : 0}{" "}
                    nights
                  </span>
                  <span className="font-medium">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
