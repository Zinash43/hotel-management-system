"use client";

import { ReactNode } from "react";

// Mock Stripe provider for development
interface StripeProviderProps {
  children: ReactNode;
}

export default function StripeProvider({ children }: StripeProviderProps) {
  return <>{children}</>;
}
