import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import EmployeeDashboard from "./EmployeeDashboard";
import RoleDashboard from "./RoleDashboard";

export default function Workspace() {
  const [, params] = useRoute("/workspace/:role");
  const [, websiteParams] = useRoute("/workspace/:role/website-configuration");
  const [, setLocation] = useLocation();
  const { user, loading, logout } = useAuth();
  const routeRole = websiteParams?.role ?? params?.role;
  const isWebsiteConfigurationTab = websiteParams?.role === "admin";
  const isLegacySuperAdminRoute = routeRole === "super-admin";
  const requestedRole = routeRole === "admin" ? "admin" : "employee";

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("velentra-demo-authenticated");
      sessionStorage.removeItem("velentra-signin-role");
      localStorage.removeItem("velentra-demo-authenticated");
      localStorage.removeItem("velentra-signin-role");
    } catch {
      // The account API still clears its session when browser storage is restricted.
    }
    try {
      await logout();
    } catch {
      // Return to sign-in even if the preview account endpoint is unavailable.
    } finally {
      setLocation("/");
    }
  };

  useEffect(() => {
    if (!isLegacySuperAdminRoute) return;

    try {
      if (sessionStorage.getItem("velentra-signin-role") === "super-admin" || localStorage.getItem("velentra-signin-role") === "super-admin") {
        sessionStorage.setItem("velentra-signin-role", "admin");
        localStorage.setItem("velentra-signin-role", "admin");
      }
    } catch {
      // Continue with the canonical route if session storage is unavailable.
    }

    setLocation("/workspace/admin", { replace: true });
  }, [isLegacySuperAdminRoute, setLocation]);

  const [demoSession] = useState(() => {
    try {
      return sessionStorage.getItem("velentra-demo-authenticated") === "true" || localStorage.getItem("velentra-demo-authenticated") === "true";
    } catch {
      return false;
    }
  });
  const hasSession = Boolean(user) || demoSession;
  const demoUsername = useState(() => {
    if (requestedRole === "admin") return "ADMIN";
    try { return localStorage.getItem("velentra-global-employee-username") || sessionStorage.getItem("velentra-global-employee-username") || "EMP001"; } catch { return "EMP001"; }
  })[0];

  if (loading) {
    return <div className="workspace-state"><div className="button-spinner" /><span>Checking your Velentra session…</span></div>;
  }

  if (isLegacySuperAdminRoute) {
    return <div className="workspace-state"><div className="button-spinner" /><span>Opening your Admin workspace…</span></div>;
  }

  if (!hasSession) {
    return (
      <div className="workspace-state workspace-state-empty">
        <div className="workspace-state-icon"><ShieldCheck size={22} /></div>
        <p>Your Velentra session has ended.</p>
        <button className="signin-button signin-button-small" type="button" onClick={() => setLocation("/")}>
          <span>Return to sign in</span><ArrowUpRight size={17} />
        </button>
      </div>
    );
  }

  if (requestedRole === "employee") {
    return <EmployeeDashboard onBack={handleLogout} username={user?.name || user?.email || (demoSession ? demoUsername : "EMP")} initialFeature={websiteParams?.role === "employee" ? "website-editor" : "dashboard"} />;
  }

  return <RoleDashboard role="admin" onBack={handleLogout} username={user?.name || user?.email || demoUsername} initialFeature={isWebsiteConfigurationTab ? "website-editor" : "dashboard"} />;
}
