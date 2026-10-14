"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrencyCode, CurrencyConfig } from "@/types";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateAgainstUSD: 1 },
  LKR: { code: "LKR", symbol: "LKR ", name: "Sri Lankan Rupee", rateAgainstUSD: 305 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateAgainstUSD: 0.92 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateAgainstUSD: 0.78 },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  currencies: Record<CurrencyCode, CurrencyConfig>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("explorex_currency") as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("explorex_currency", code);
    }
  };

  const convertPrice = (amountInUSD: number): number => {
    const rate = CURRENCIES[currency]?.rateAgainstUSD || 1;
    return Math.round(amountInUSD * rate);
  };

  const formatPrice = (amountInUSD: number): string => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = convertPrice(amountInUSD);

    if (currency === "LKR") {
      return `LKR ${converted.toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

