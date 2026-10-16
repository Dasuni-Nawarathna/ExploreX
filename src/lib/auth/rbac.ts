import type { SessionPayload } from "./session";

export type Role = "SUPER_ADMIN" | "MANAGER" | "CONTENT_EDITOR" | "SUPPORT_AGENT" | "CUSTOMER";

export type Permission =
  | "manage:all"
  | "manage:users"
  | "manage:settings"
  | "manage:catalog"      // packages, hotels, vehicles, destinations
  | "manage:enquiries"    // edit status, add admin notes
  | "view:enquiries"      // read-only enquiries
  | "manage:content"      // blog, faqs, destination descriptions, images
  | "moderate:reviews"
  | "view:audit_logs"
  | "customer:self";      // access only to customer's own wishlist, enquiries, reviews

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "manage:all",
    "manage:users",
    "manage:settings",
    "manage:catalog",
    "manage:enquiries",
    "view:enquiries",
    "manage:content",
    "moderate:reviews",
    "view:audit_logs",
    "customer:self",
  ],
  MANAGER: [
    "manage:catalog",
    "manage:enquiries",
    "view:enquiries",
    "moderate:reviews",
    "view:audit_logs",
    "manage:content",
  ],
  CONTENT_EDITOR: [
    "manage:content",
  ],
  SUPPORT_AGENT: [
    "view:enquiries",
  ],
  CUSTOMER: [
    "customer:self",
  ],
};

/**
 * Checks whether a given role has permission to execute an action.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  if (role === "SUPER_ADMIN") return true;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Server-side authorization check throwing an error or returning false.
 */
export function assertPermission(session: SessionPayload | null, permission: Permission): boolean {
  if (!session) return false;
  return hasPermission(session.role, permission);
}

/**
 * Checks if the user is an internal staff member (Admin, Manager, Editor, Agent).
 */
export function isStaff(role: Role): boolean {
  return ["SUPER_ADMIN", "MANAGER", "CONTENT_EDITOR", "SUPPORT_AGENT"].includes(role);
}
