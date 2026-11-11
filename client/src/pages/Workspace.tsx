import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowLeft, ArrowUpRight, Check, Layers3, ShieldCheck, UsersRound, Workflow } from "lucide-react";
import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import EmployeeDashboard from "./EmployeeDashboard";

const workspaceDetails = {
  employee: {
    label: "Employee workspace",
    title: "Your assigned work, in view.",
    description: "Pick up content tasks, update event details, and keep the next handoff moving.",
    icon: UsersRound,
    items: ["Assigned content tasks", "Event information updates", "Publishing readiness"],
  },
  admin: {
    label: "Admin workspace",
    title: "Keep every event on track.",
    description: "Review event details, coordinate employees, and approve the work ready to move forward.",
    icon: Workflow,
    items: ["Event review queue", "Employee assignments", "Approval checkpoints"],
  },
  "super-admin": {
    label: "Super Admin workspace",
    title: "See the whole operation.",
    description: "Create events, shape team access, and keep Velentra settings aligned with the way you work.",
    icon: Layers3,
    items: ["Event creation", "Team roles and access", "Platform settings"],
  },
} as const;

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
  const detail = workspaceDetails[requestedRole];
  const Icon = detail.icon;
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

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <button type="button" className="back-link" onClick={() => setLocation("/")}><ArrowLeft size={16} /> Back to sign in</button>
        <div className="workspace-brand"><span className="workspace-brand-mark"><span /><span /><span /></span> Velentra</div>
        <span className="workspace-user">{user?.name || user?.email || (demoSession ? demoUsername : "Signed-in account")}</span>
      </header>
      <main className="workspace-card">
        <div className="workspace-card-topline"><span className="eyebrow"><span className="eyebrow-dot" /> Session verified</span><span className="workspace-status"><Check size={14} /> Access ready</span></div>
        <div className="workspace-icon"><Icon size={28} /></div>
        <span className="workspace-label">{detail.label}</span>
        <h1>{detail.title}</h1>
        <p>{detail.description}</p>
        <div className="workspace-capabilities">
          {detail.items.map(item => <span key={item}><Check size={15} /> {item}</span>)}
        </div>
        <div className="workspace-note"><ShieldCheck size={17} /><span>Your assigned permissions are determined by the role on your authenticated Velentra account.</span></div>
      </main>
    </div>
  );
}
