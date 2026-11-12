import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import EmployeeDashboard from "../client/src/pages/EmployeeDashboard";
import RoleDashboard from "../client/src/pages/RoleDashboard";

const noop = () => {};

describe("authenticated workspace chrome", () => {
  for (const role of ["employee", "admin"] as const) {
    it(`shows the supplied logo, exactly one header, and a page footer for ${role}`, () => {
      const page = role === "admin"
        ? createElement(RoleDashboard, { role: "admin", username: "ADMIN", onBack: noop })
        : createElement(EmployeeDashboard, { username: "EMP001", onBack: noop });
      const html = renderToStaticMarkup(page);
      expect(html.match(/<header\b/g)).toHaveLength(1);
      expect(html.match(/<footer\b/g)).toHaveLength(1);
      expect(html).toContain('class="workspace-topbar"');
      expect(html).toContain('class="workspace-footer"');
      expect(html).toContain('src="/velentra-dashboard-logo.webp"');
      expect(html).not.toContain('src="/v-logo1.webp"');
      expect(html).toContain('aria-label="Open account menu"');
      expect(html).toContain("Internal operations portal");
      expect(html.indexOf('<header')).toBeLessThan(html.indexOf('<aside'));
      expect(html.indexOf('<footer')).toBeGreaterThan(html.indexOf('<main'));
    });
  }
});
