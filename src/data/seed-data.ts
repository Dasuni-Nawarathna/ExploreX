import bcrypt from "bcryptjs";

// Standard salt rounds
const PASSWORD_HASH = bcrypt.hashSync("ExploreX@2026!", 10);
const CUSTOMER_HASH = bcrypt.hashSync("Customer@2026!", 10);

export interface SeedUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "MANAGER" | "CONTENT_EDITOR" | "SUPPORT_AGENT" | "CUSTOMER";
  phone?: string | null;
  isPhoneVerified?: boolean;
  emailVerified: boolean;
  isTwoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  recoveryCodesJson: string | null;
  failedLoginAttempts: number;
  lockoutUntil: string | null;
  createdAt: string;
}

export const seedUsers: SeedUser[] = [
  {
    id: "usr-super-admin",
    email: "admin@explorex.lk",
    name: "Kasun Jayasuriya",
    passwordHash: PASSWORD_HASH,
    role: "SUPER_ADMIN",
    emailVerified: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
    recoveryCodesJson: null,
    failedLoginAttempts: 0,
    lockoutUntil: null,
    createdAt: new Date("2026-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "usr-manager",
    email: "manager@explorex.lk",
    name: "Dilshan Perera",
    passwordHash: PASSWORD_HASH,
    role: "MANAGER",
    emailVerified: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
    recoveryCodesJson: null,
    failedLoginAttempts: 0,
    lockoutUntil: null,
    createdAt: new Date("2026-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "usr-editor",
    email: "editor@explorex.lk",
    name: "Ananya Senanayake",
    passwordHash: PASSWORD_HASH,
    role: "CONTENT_EDITOR",
    emailVerified: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
    recoveryCodesJson: null,
    failedLoginAttempts: 0,
    lockoutUntil: null,
    createdAt: new Date("2026-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "usr-agent",
    email: "agent@explorex.lk",
    name: "Ruwan Wickremasinghe",
    passwordHash: PASSWORD_HASH,
    role: "SUPPORT_AGENT",
    emailVerified: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
    recoveryCodesJson: null,
    failedLoginAttempts: 0,
    lockoutUntil: null,
    createdAt: new Date("2026-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "usr-customer-1",
    email: "customer@example.com",
    name: "David Miller",
    passwordHash: CUSTOMER_HASH,
    role: "CUSTOMER",
    phone: "+94771234567",
    isPhoneVerified: true,
    emailVerified: true,
    isTwoFactorEnabled: false,
    twoFactorSecret: null,
    recoveryCodesJson: null,
    failedLoginAttempts: 0,
    lockoutUntil: null,
    createdAt: new Date("2026-02-01T00:00:00Z").toISOString(),
  }
];

export const seedAuditLogs = [
  {
    id: "aud-001",
    userId: "usr-super-admin",
    userEmail: "admin@explorex.lk",
    action: "LOGIN",
    resource: "auth",
    resourceId: "usr-super-admin",
    details: "Successful administrative login with IP verification",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    timestamp: "2026-11-04T08:30:00Z"
  },
  {
    id: "aud-002",
    userId: "usr-manager",
    userEmail: "manager@explorex.lk",
    action: "UPDATE",
    resource: "package",
    resourceId: "pkg-cultural-triangle",
    details: "Updated seasonal hotel tiers for Cultural Triangle tour",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    timestamp: "2026-11-04T10:15:00Z"
  },
  {
    id: "aud-003",
    userId: "usr-super-admin",
    userEmail: "admin@explorex.lk",
    action: "STATUS_CHANGE",
    resource: "enquiry",
    resourceId: "ENQ-1730000000-001",
    details: "Changed status from NEW to CONTACTED via WhatsApp concierge",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    timestamp: "2026-11-04T14:20:00Z"
  }
];

export const seedReviews = [
  {
    id: "rev-001",
    customerName: "Sarah & Mark Jenkins",
    customerLocation: "London, UK",
    rating: 5,
    comment: "Our 10-day private honeymoon in Sri Lanka planned by ExploreX was pure magic! From the sunrise over Sigiriya to private tea plantation villas in Nuwara Eliya and our amazing chauffeur Pradeep, everything was flawless.",
    targetType: "package",
    targetId: "pkg-cultural-triangle",
    isApproved: true,
    createdAt: "2026-10-15T09:00:00Z"
  },
  {
    id: "rev-002",
    customerName: "Dr. Johann Becker",
    customerLocation: "Munich, Germany",
    rating: 5,
    comment: "Exceptional wildlife experience. We saw leopards, sloth bears, and herds of wild elephants in Yala and Minneriya. The high-roof luxury van was comfortable and spotless. Booking via WhatsApp was effortless.",
    targetType: "general",
    isApproved: true,
    createdAt: "2026-10-22T11:30:00Z"
  },
  {
    id: "rev-003",
    customerName: "Elena Rostova",
    customerLocation: "Geneva, Switzerland",
    rating: 5,
    comment: "Jetwing Vil Uyana and Cape Weligama recommendations were exquisite. ExploreX handles every minute detail with true warmth and professionalism.",
    targetType: "hotel",
    targetId: "htl-jetwing-vil-uyana",
    isApproved: true,
    createdAt: "2026-10-29T16:45:00Z"
  }
];
