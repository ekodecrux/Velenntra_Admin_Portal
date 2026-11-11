import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import EmployeeDashboard from "./EmployeeDashboard";
import RoleDashboard from "./RoleDashboard";

export default function Workspace() {
  const [, params] = useRoute("/workspace/:role");
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const [demoSession] = useState(() => {
    try {
      return sessionStorage.getItem("velentra-demo-authenticated") === "true";
    } catch {
      return false;
    }
  });
  const requestedRole = params?.role === "admin" || params?.role === "super-admin" ? params.role : "employee";
  const hasSession = Boolean(user) || demoSession;
  const demoUsername = requestedRole === "admin" ? "ADMIN" : requestedRole === "super-admin" ? "SUPER ADMIN" : "EMP";

  if (loading) {
    return <div className="workspace-state"><div className="button-spinner" /><span>Checking your Velentra session…</span></div>;
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

  return <RoleDashboard role={requestedRole} onBack={() => setLocation("/")} username={user?.name || user?.email || demoUsername} />;
}
