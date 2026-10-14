"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "MANAGER" | "CONTENT_EDITOR" | "SUPPORT_AGENT" | "CUSTOMER";
  phone?: string;
  isPhoneVerified?: boolean;
  isTwoFactorEnabled?: boolean;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (credentials: { email: string; password: string; totpCode?: string }) => Promise<{ success?: boolean; requires2FA?: boolean; error?: string }>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<{ success?: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  sendPhoneVerificationCode: (phone: string) => Promise<{ success?: boolean; demoCode?: string; message?: string; error?: string }>;
  verifyPhoneCode: (phone: string, code: string) => Promise<{ success?: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const login = async (credentials: { email: string; password: string; totpCode?: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || "Login failed" };
      }

      if (data.requires2FA) {
        return { requires2FA: true };
      }

      setUser(data.user);
      return { success: true };
    } catch {
      return { error: "Network error during login" };
    }
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        return { error: json.error || "Registration failed" };
      }

      setUser(json.user);
      return { success: true };
    } catch {
      return { error: "Network error during registration" };
    }
  };

  const sendPhoneVerificationCode = async (phone: string) => {
    try {
      const res = await fetch("/api/auth/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || "Failed to send verification code" };
      }
      return { success: true, demoCode: data.demoCode, message: data.message };
    } catch {
      return { error: "Network error while requesting verification code" };
    }
  };

  const verifyPhoneCode = async (phone: string, code: string) => {
    try {
      const res = await fetch("/api/auth/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || "Invalid verification code" };
      }
      // Refresh session to get updated isPhoneVerified & phone
      await refreshSession();
      return { success: true };
    } catch {
      return { error: "Network error while verifying code" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshSession,
        sendPhoneVerificationCode,
        verifyPhoneCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
