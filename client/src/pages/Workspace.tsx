import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import EmployeeDashboard from "./EmployeeDashboard";
import RoleDashboard from "./RoleDashboard";

export default function Workspace() {
  const [, params] = useRoute("/workspace/:role");
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const isLegacySuperAdminRoute = params?.role === "super-admin";
  const requestedRole = params?.role === "admin" ? "admin" : "employee";

  useEffect(() => {
    if (!isLegacySuperAdminRoute) return;

    try {
      if (sessionStorage.getItem("velentra-signin-role") === "super-admin") {
        sessionStorage.setItem("velentra-signin-role", "admin");
      }
    } catch {
      // Continue with the canonical route if session storage is unavailable.
    }

    setLocation("/workspace/admin", { replace: true });
  }, [isLegacySuperAdminRoute, setLocation]);

  const [demoSession] = useState(() => {
    try {
      return sessionStorage.getItem("velentra-demo-authenticated") === "true";
    } catch {
      return false;
    }
  });
  const hasSession = Boolean(user) || demoSession;
  const demoUsername = requestedRole === "admin" ? "ADMIN" : "EMP001";

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
    return <EmployeeDashboard onBack={() => setLocation("/")} username={user?.name || user?.email || (demoSession ? demoUsername : "EMP")} />;
  }

  return <RoleDashboard role="admin" onBack={() => setLocation("/")} username={user?.name || user?.email || demoUsername} />;
}
