import { describe, expect, it } from "vitest";
import { normalizeEmployeeRole, roleConfigs } from "../client/src/pages/RoleDashboard";

describe("unified Admin workspace", () => {
  const features = roleConfigs.admin.sections.flatMap(section => section.items);

  it("has only one administrator configuration", () => {
    expect(Object.keys(roleConfigs)).toEqual(["admin"]);
    expect(roleConfigs.admin.shortLabel).toBe("Admin");
  });

  it("retains the combined event, team, review, publishing and platform capabilities", () => {
    const required = [
      "dashboard", "all-events", "create-event", "edit-event", "event-details",
      "website-preview", "event-templates", "event-status", "employee-directory",
      "add-employee", "team-roles", "admin-assignments", "employee-event-assignments",
      "assignments", "employee-work", "review-queue", "content-approvals",
      "publishing-readiness", "published-sites", "manage-websites", "site-settings",
      "publishing-rules", "activity", "audit-log", "system-settings", "notifications",
      "admin-settings", "access-help",
    ];
    expect(features.map(feature => feature.id)).toEqual(expect.arrayContaining(required));
    expect(new Set(features.map(feature => feature.id)).size).toBe(features.length);
    expect(features.every(feature => !feature.hidden)).toBe(true);
  });

  it("requires only a single Admin approval stage", () => {
    const publishingRules = features.find(feature => feature.id === "publishing-rules");
    expect(publishingRules?.fields).toContain("Require Admin approval");
    expect(publishingRules?.fields).not.toContain("Require Super Admin approval");
    expect(JSON.stringify(roleConfigs)).not.toContain("Super Admin");
  });

  it("maps legacy Super Admin employee records to Admin", () => {
    for (const role of ["Super Admin", "super-admin", "SUPERADMIN", "Admin", "ADMIN"]) {
      expect(normalizeEmployeeRole(role)).toBe("Admin");
    }
    expect(normalizeEmployeeRole("Employee")).toBe("Employee");
    expect(normalizeEmployeeRole()).toBe("Employee");
  });
});
