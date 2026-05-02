"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              KANA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/rooms"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Rooms
              </Link>
              <Link
                href="/menu"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dining
              </Link>
              <Link
                href="/admin"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2" />
              +251 911 123 456
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2" />
              Addis Ababa, Ethiopia
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Rooms
            </Link>
            <Link
              href="/menu"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dining
            </Link>
            <Link
              href="/admin"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <div className="px-3 py-2 text-sm text-gray-600 border-t mt-4 pt-4">
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2" />
                +251 911 123 456
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                Addis Ababa, Ethiopia
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
