import test from "node:test";
import assert from "node:assert/strict";
import { hasPermission, isStaff, assertPermission } from "../src/lib/auth/rbac.ts";

test("RBAC - Super Admin has unrestricted system permissions", () => {
  assert.equal(hasPermission("SUPER_ADMIN", "manage:all"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "manage:users"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "manage:settings"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "manage:catalog"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "manage:enquiries"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "moderate:reviews"), true);
  assert.equal(hasPermission("SUPER_ADMIN", "view:audit_logs"), true);
});

test("RBAC - Manager role scope boundaries", () => {
  // Allowed
  assert.equal(hasPermission("MANAGER", "manage:catalog"), true);
  assert.equal(hasPermission("MANAGER", "manage:enquiries"), true);
  assert.equal(hasPermission("MANAGER", "view:enquiries"), true);
  assert.equal(hasPermission("MANAGER", "moderate:reviews"), true);
  assert.equal(hasPermission("MANAGER", "view:audit_logs"), true);

  // Prohibited: Manager cannot modify users or system settings
  assert.equal(hasPermission("MANAGER", "manage:users"), false);
  assert.equal(hasPermission("MANAGER", "manage:settings"), false);
});

test("RBAC - Content Editor role scope boundaries", () => {
  // Allowed
  assert.equal(hasPermission("CONTENT_EDITOR", "manage:content"), true);

  // Prohibited: Editor cannot touch CRM leads, users, catalog prices, or settings
  assert.equal(hasPermission("CONTENT_EDITOR", "manage:catalog"), false);
  assert.equal(hasPermission("CONTENT_EDITOR", "manage:enquiries"), false);
  assert.equal(hasPermission("CONTENT_EDITOR", "view:enquiries"), false);
  assert.equal(hasPermission("CONTENT_EDITOR", "manage:users"), false);
});

test("RBAC - Support Agent role scope boundaries", () => {
  // Allowed: Can view leads to assist clients
  assert.equal(hasPermission("SUPPORT_AGENT", "view:enquiries"), true);

  // Prohibited: Agent cannot mutate catalogue, alter statuses, or see audit logs
  assert.equal(hasPermission("SUPPORT_AGENT", "manage:enquiries"), false);
  assert.equal(hasPermission("SUPPORT_AGENT", "manage:catalog"), false);
  assert.equal(hasPermission("SUPPORT_AGENT", "view:audit_logs"), false);
  assert.equal(hasPermission("SUPPORT_AGENT", "manage:users"), false);
});

test("RBAC - Customer role isolation", () => {
  assert.equal(hasPermission("CUSTOMER", "customer:self"), true);
  assert.equal(hasPermission("CUSTOMER", "view:enquiries"), false);
  assert.equal(hasPermission("CUSTOMER", "manage:catalog"), false);
  assert.equal(hasPermission("CUSTOMER", "manage:all"), false);
});

test("RBAC - isStaff classification", () => {
  assert.equal(isStaff("SUPER_ADMIN"), true);
  assert.equal(isStaff("MANAGER"), true);
  assert.equal(isStaff("CONTENT_EDITOR"), true);
  assert.equal(isStaff("SUPPORT_AGENT"), true);
  assert.equal(isStaff("CUSTOMER"), false);
});

test("RBAC - assertPermission null session handling", () => {
  assert.equal(assertPermission(null, "manage:catalog"), false);
  assert.equal(
    assertPermission(
      { userId: "usr-1", name: "Test Traveler", email: "test@explorex.lk", role: "CUSTOMER" },
      "manage:catalog"
    ),
    false
  );
  assert.equal(
    assertPermission(
      { userId: "usr-2", name: "Super Admin", email: "admin@explorex.lk", role: "SUPER_ADMIN" },
      "manage:catalog"
    ),
    true
  );
});

