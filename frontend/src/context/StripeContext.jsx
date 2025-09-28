// src/context/StripeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const StripeContext = createContext();

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);
      setStripePromise(stripe);
    };

    initializeStripe();
  }, []);

  const value = {
    stripePromise,
  };

  return (
    <StripeContext.Provider value={value}>{children}</StripeContext.Provider>
  );
};
