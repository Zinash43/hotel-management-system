"use client";

import { useState } from "react";

// Mock Stripe hooks for development
const useStripe = () => ({});
const useElements = () => ({});
const PaymentElement = () => (
  <div className="p-4 border rounded-lg bg-gray-50">
    Mock Payment Element - Stripe packages not installed
  </div>
);

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      setMessage("Payment succeeded!");
      onSuccess();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {message && (
        <div className="text-center text-sm text-gray-600">{message}</div>
      )}
    </form>
  );
}
