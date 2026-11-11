import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings2,
  ShieldCheck,
  UsersRound,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type RoleKey = "admin" | "super-admin";
type ViewKind = "dashboard" | "list" | "form" | "settings";
type RoleFeature = { id: string; label: string; description: string; kind: ViewKind; icon: LucideIcon; fields?: string[] };
type RoleSection = { label: string; items: RoleFeature[]; direct?: boolean; icon?: LucideIcon };

const feature = (id: string, label: string, description: string, icon: LucideIcon, kind: ViewKind = "list", fields?: string[]): RoleFeature => ({ id, label, description, icon, kind, fields });

const roleConfigs: Record<RoleKey, { label: string; shortLabel: string; eyebrow: string; title: string; description: string; sections: RoleSection[]; stats: { label: string; value: string; tone: "blue" | "green" | "red"; icon: LucideIcon }[] }> = {
  admin: {
    label: "Admin workspace",
    shortLabel: "Admin",
    eyebrow: "Event management",
    title: "Keep every event on track.",
    description: "Review event details, coordinate employees, and approve the work ready to move forward.",
    stats: [
      { label: "Active events", value: "4", tone: "blue", icon: Globe2 },
      { label: "Work in review", value: "12", tone: "red", icon: ClipboardCheck },
      { label: "Ready to publish", value: "7", tone: "green", icon: FileCheck2 },
      { label: "Employees assigned", value: "18", tone: "blue", icon: UsersRound },
    ],
    sections: [
      { label: "Dashboard", direct: true, items: [feature("dashboard", "Dashboard", "A live view of assigned events and work queues.", LayoutDashboard, "dashboard")] },
      { label: "Events", icon: Globe2, items: [feature("events", "Events List", "Review and open events assigned to your team.", Globe2), feature("event-details", "Event Details", "Review dates, venue, status, and public content.", FileText, "form", ["Event title", "Event dates", "Venue", "Event status"]), feature("website-preview", "Website Preview", "Open the current event website preview.", Globe2)] },
      { label: "Team workflow", icon: UsersRound, items: [feature("assignments", "Employee Assignments", "Assign content and operations work to employees.", UsersRound, "form", ["Employee", "Event", "Task", "Due date"]), feature("employee-work", "Employee Work", "Track assigned work and completion progress.", Workflow), feature("notifications", "Notifications", "Review team updates and handoff messages.", Bell)] },
      { label: "Review & publish", icon: ClipboardCheck, items: [feature("review-queue", "Review Queue", "Review updates submitted by employees.", ClipboardCheck), feature("content-approvals", "Content Approvals", "Approve or return event content changes.", FileCheck2), feature("publishing-readiness", "Publishing Readiness", "Check whether event content is ready to publish.", ShieldCheck)] },
      { label: "Settings", icon: Settings2, items: [feature("admin-settings", "Workspace Settings", "Manage admin workspace preferences.", Settings2, "settings"), feature("access-help", "Access & Help", "Review access guidance and support information.", CircleHelp)] },
    ],
  },
  "super-admin": {
    label: "Super Admin workspace",
    shortLabel: "Super Admin",
    eyebrow: "Platform operations",
    title: "See the whole operation.",
    description: "Create events, shape team access, and keep Velentra settings aligned with the way you work.",
    stats: [
      { label: "Total events", value: "18", tone: "blue", icon: Globe2 },
      { label: "Published sites", value: "11", tone: "green", icon: FileCheck2 },
      { label: "Admins", value: "6", tone: "blue", icon: ShieldCheck },
      { label: "Team members", value: "42", tone: "red", icon: UsersRound },
    ],
    sections: [
      { label: "Dashboard", direct: true, items: [feature("dashboard", "Dashboard", "A live view of platform activity and event status.", LayoutDashboard, "dashboard")] },
      { label: "Events", icon: Globe2, items: [feature("all-events", "All Events", "Create, review, and archive conference events.", Globe2), feature("create-event", "Create Event", "Create an event and assign its Admin.", Plus, "form", ["Event title", "Event dates", "Venue", "Assigned Admin"]), feature("event-templates", "Event Templates", "Manage reusable conference website templates.", FileText)] },
      { label: "Team & access", icon: UsersRound, items: [feature("team-roles", "Team Roles", "Manage Employee, Admin, and Super Admin access.", ShieldCheck, "settings"), feature("admin-assignments", "Admin Assignments", "Assign Admins to events and review ownership.", UsersRound, "form", ["Admin", "Event", "Access level", "Assignment status"]), feature("employee-directory", "Employee Directory", "Review the team and current workload.", UsersRound)] },
      { label: "Websites & publishing", icon: Globe2, items: [feature("published-sites", "Published Sites", "Review published event websites.", Globe2), feature("site-settings", "Site Settings", "Manage platform and website defaults.", Settings2, "settings"), feature("publishing-rules", "Publishing Rules", "Manage review and publishing workflow settings.", Workflow, "settings") ] },
      { label: "Operations", icon: Activity, items: [feature("activity", "Platform Activity", "Review recent changes across Velentra.", Activity), feature("audit-log", "Audit Log", "Trace role, content, and publishing changes.", FileText), feature("system-settings", "System Settings", "Manage platform-level settings.", Settings2, "settings")] },
    ],
  },
};

export default function RoleDashboard({ role, onBack, username }: { role: RoleKey; onBack: () => void; username: string }) {
  const config = roleConfigs[role];
  const [activeId, setActiveId] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(["Events"]));
  const allFeatures = config.sections.flatMap(section => section.items);
  const active = allFeatures.find(item => item.id === activeId) ?? allFeatures[0];

  const selectFeature = (id: string) => {
    const parent = config.sections.find(section => section.items.some(item => item.id === id));
    if (parent && !parent.direct) setExpandedSections(current => new Set(current).add(parent.label));
    setActiveId(id);
    setNotice("");
    setMobileNav(false);
  };

  const toggleSection = (label: string) => setExpandedSections(current => { const next = new Set(current); if (next.has(label)) next.delete(label); else next.add(label); return next; });

  const renderDashboard = () => (
    <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {config.eyebrow}</span><h1>{config.title}</h1><p>{config.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => setNotice("Workspace data refreshed just now.")}><Activity size={16} /> Refresh data</button></div>
      <div className="employee-stats-grid">{config.stats.map(stat => <button type="button" key={stat.label} className={`employee-stat-card employee-stat-card-${stat.tone}`} onClick={() => setNotice(`${stat.label} opened for review.`)}><div className="employee-stat-icon"><stat.icon size={19} /></div><div><strong>{stat.value}</strong><span>{stat.label}</span></div><ArrowUpRight size={16} className="employee-stat-arrow" /></button>)}</div>
      <section className="employee-dashboard-section"><div className="employee-section-heading"><div><span className="employee-eyebrow"><span /> Role workflow</span><h2>{role === "admin" ? "Move work from review to publish" : "Keep platform work aligned"}</h2></div></div><div className="employee-mini-grid">{(role === "admin" ? ["Review Queue", "Employee Assignments", "Publishing Readiness", "Website Preview"] : ["All Events", "Team Roles", "Published Sites", "Audit Log"]).map(label => { const target = allFeatures.find(item => item.label === label); return <button key={label} type="button" className="employee-mini-card" onClick={() => target && selectFeature(target.id)}><Workflow size={17} /><span><strong>Open</strong><small>{label}</small></span><ChevronRight size={15} /></button>; })}</div></section>
    </>
  );

  const renderFeature = () => {
    const isForm = active.kind === "form";
    const isSettings = active.kind === "settings";
    const fields = active.fields ?? (isSettings ? ["Section title", "Supporting copy", "Display status"] : ["Search records", "Status filter"]);
    return <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Settings" : config.label}</span><h1>{active.label}</h1><p>{active.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button></div>
      {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
      {isForm || isSettings ? <div className="employee-form-card"><div className="employee-form-card-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Workspace controls" : "New workflow record"}</span><h2>{isSettings ? `Configure ${active.label.toLowerCase()}` : `Build ${active.label.toLowerCase()}`}</h2></div><span className="employee-draft-chip">{isSettings ? "Protected" : "Draft"}</span></div><div className="employee-form-grid">{fields.map(field => <label key={field}><span>{field}</span>{field.toLowerCase().includes("description") || field.toLowerCase().includes("copy") ? <textarea rows={4} placeholder={`Add ${field.toLowerCase()}`} /> : <input placeholder={`Add ${field.toLowerCase()}`} defaultValue={field.toLowerCase().includes("status") ? "Active" : undefined} />}</label>)}</div><div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}>Cancel</button><button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} ${isSettings ? "settings saved" : "saved as a draft"}.`)}><Check size={16} /> {isSettings ? "Save settings" : "Save draft"}</button></div></div> : <div className="employee-table-card"><div className="employee-toolbar"><div className="employee-search"><Activity size={16} /><input placeholder={`Search ${active.label.toLowerCase()}`} /></div><div className="employee-toolbar-actions"><button className="employee-secondary-button" type="button" onClick={() => setNotice(`${active.label} refreshed.`)}><Activity size={15} /> Refresh</button><button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} is ready for review.`)}><Plus size={16} /> Manage</button></div></div><div className="employee-table-wrap"><table><thead><tr><th>Name / title</th><th>Status</th><th>Updated</th><th>Action</th></tr></thead><tbody><tr><td><strong>{active.label} workspace</strong></td><td><span className="employee-status-pill">Ready</span></td><td>Just now</td><td><button className="employee-row-action" type="button" onClick={() => setNotice(`${active.label} selected for review.`)}>View <ArrowUpRight size={14} /></button></td></tr></tbody></table></div></div>}
    </>;
  };

  return <div className="employee-app-shell"><aside className={`employee-sidebar ${mobileNav ? "employee-sidebar-open" : ""}`}><div className="employee-sidebar-brand"><img className="employee-sidebar-logo" src="/v-logo1.webp" alt="Velentra Group" /><button type="button" className="employee-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button></div><div className="employee-sidebar-scroll">{config.sections.map(section => { const featureItem = section.items[0]; const Icon = featureItem.icon; if (section.direct) return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item ${activeId === featureItem.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(featureItem.id)}><Icon size={15} /><span>{featureItem.label}</span>{activeId === featureItem.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button></div>; const isExpanded = expandedSections.has(section.label); const groupActive = section.items.some(item => item.id === activeId); const SectionIcon = section.icon ?? Icon; return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item employee-nav-group-toggle ${groupActive ? "employee-nav-item-active" : ""}`} aria-expanded={isExpanded} onClick={() => toggleSection(section.label)}><SectionIcon size={15} /><span>{section.label}</span>{isExpanded ? <ChevronDown size={14} className="employee-nav-chevron" /> : <ChevronRight size={14} className="employee-nav-chevron" />}</button>{isExpanded ? <div className="employee-nav-submenu">{section.items.map(nested => <button type="button" key={nested.id} className={`employee-nav-item ${activeId === nested.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(nested.id)}><nested.icon size={15} /><span>{nested.label}</span>{activeId === nested.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button>)}</div> : null}</div>; })}</div><div className="employee-sidebar-footer"><button type="button" className="employee-account-button" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span><strong>{username}</strong><small>{config.shortLabel}</small></span><ChevronDown size={15} /></button>{openProfile ? <div className="employee-account-menu"><button type="button" onClick={onBack}><ArrowLeft size={14} /> Back to sign in</button><button type="button" onClick={onBack}><LogOut size={14} /> Sign out</button></div> : null}</div></aside>{mobileNav ? <button className="employee-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)} /> : null}<main className="employee-main"><header className="employee-topbar"><button className="employee-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div className="employee-breadcrumb"><span>Velentra</span><ChevronRight size={14} /><strong>{active.label}</strong></div><div className="employee-topbar-actions"><button type="button" aria-label="Help" onClick={() => setNotice("Help center is coming with the workspace documentation.")}><CircleHelp size={17} /></button><button type="button" aria-label="Notifications" onClick={() => setNotice("You have no new notifications.")}><Bell size={17} /></button><span className="employee-topbar-divider" /><button type="button" className="employee-topbar-user" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span>{username}</span><ChevronDown size={14} /></button></div></header><div className="employee-content">{activeId === "dashboard" ? renderDashboard() : renderFeature()}</div></main></div>;
}
