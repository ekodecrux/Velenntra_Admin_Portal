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
  Eye,
  FileCheck2,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Settings2,
  ShieldCheck,
  Trash2,
  UsersRound,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { WorkspaceHeader, WorkspaceFooter } from "@/components/WorkspaceChrome";
import WebsiteEditor from "@/components/WebsiteEditor";

type RoleKey = "admin";
type ViewKind = "dashboard" | "list" | "form" | "settings";
type RoleFeature = { id: string; label: string; description: string; kind: ViewKind; icon: LucideIcon; fields?: string[]; hidden?: boolean };
type RoleSection = { label: string; items: RoleFeature[]; direct?: boolean; icon?: LucideIcon };
type EventRecord = { id: string; title: string; startDate: string; endDate: string; venue: string; eventStatus: string; subdomain: string; domain: string; websiteStatus: string };
type EmployeeRecord = { id: string; employeeId: string; name: string; email: string; contactNumber: string; address: string; role: string; status: string; updated: string };

export function normalizeEmployeeRole(role?: string) {
  const normalized = role?.toLowerCase().replace(/[\s-]+/g, "");
  return normalized === "admin" || normalized === "superadmin" ? "Admin" : "Employee";
}

function applyWebsiteConfig(eventId: string, frame: HTMLIFrameElement) {
  try {
    const stored = sessionStorage.getItem(`velentra-site-config-${eventId}`) ?? sessionStorage.getItem("velentra-site-config-global");
    if (!stored || !frame.contentDocument) return;
    const values = JSON.parse(stored) as Record<string, string>;
    const document = frame.contentDocument;
    if (values["Website title"]) { const heading = document.querySelector(".top-header h1"); if (heading) heading.textContent = values["Website title"]; }
    if (values["Hero subtitle"]) { const subtitle = document.querySelector(".top-header h4"); if (subtitle) subtitle.textContent = values["Hero subtitle"]; }
    if (values["Header logo URL"]) { const logo = document.querySelector<HTMLImageElement>(".top-logo"); if (logo) logo.src = values["Header logo URL"]; }
    if (values["Hero banner URL"]) { const banner = document.querySelector<HTMLImageElement>(".owl-bg-img img"); if (banner) banner.src = values["Hero banner URL"]; }
    if (values["Primary color"]) { document.querySelector<HTMLElement>(".top-header")?.style.setProperty("background-color", values["Primary color"]); document.querySelector<HTMLElement>("#header")?.style.setProperty("background-color", values["Primary color"]); }
    if (values["Accent color"]) document.querySelector<HTMLElement>(".flash-bar")?.style.setProperty("background-color", values["Accent color"]);
  } catch { /* Imported preview documents can be unavailable while the iframe is loading. */ }
}

const feature = (id: string, label: string, description: string, icon: LucideIcon, kind: ViewKind = "list", fields?: string[], hidden = false): RoleFeature => ({ id, label, description, icon, kind, fields, hidden });

export const roleConfigs: Record<RoleKey, { label: string; shortLabel: string; eyebrow: string; title: string; description: string; sections: RoleSection[]; stats: { label: string; value: string; tone: "blue" | "green" | "red"; icon: LucideIcon }[] }> = {
  admin: {
    label: "Admin workspace",
    shortLabel: "Admin",
    eyebrow: "Platform operations",
    title: "Manage the whole operation.",
    description: "Create and manage every event, coordinate employees, control access, review content, publish websites, and manage platform settings from one Admin workspace.",
    stats: [
      { label: "Total events", value: "18", tone: "blue", icon: Globe2 },
      { label: "Active events", value: "4", tone: "blue", icon: Globe2 },
      { label: "Work in review", value: "12", tone: "red", icon: ClipboardCheck },
      { label: "Ready to publish", value: "7", tone: "green", icon: FileCheck2 },
      { label: "Employees assigned", value: "18", tone: "blue", icon: UsersRound },
      { label: "Published sites", value: "11", tone: "green", icon: FileCheck2 },
      { label: "Admins", value: "6", tone: "blue", icon: ShieldCheck },
      { label: "Team members", value: "42", tone: "red", icon: UsersRound },
    ],
    sections: [
      { label: "Dashboard", direct: true, items: [feature("dashboard", "Dashboard", "A live view of platform activity and event status.", LayoutDashboard, "dashboard")] },
      { label: "Events", direct: true, icon: Globe2, items: [
        feature("all-events", "Events", "Review, modify, preview, and manage every conference event.", Globe2),
        feature("create-event", "Create Event", "Create an event and generate the single global Employee login from its subdomain.", Plus, "form", ["Event title", "Start date", "End date", "Venue", "Event status", "Subdomain", "Domain", "Website status"]),
      ] },
      { label: "Team & access", icon: UsersRound, items: [
        feature("employee-directory", "Employee Directory", "Review, modify, activate, deactivate, and manage employees.", UsersRound),
        feature("add-employee", "Add Employee", "Create an Employee account and add them to the team.", Plus, "form", ["Employee ID", "Employee name", "Work email", "Contact number", "Address", "Temporary password", "Role", "Account status"]),
        feature("team-roles", "Roles & Permissions", "Manage Employee and Admin roles. Admin handles all event, team, review, publishing, and platform controls.", ShieldCheck, "settings", ["Role name", "Role description", "Can create events", "Can assign employees", "Can approve content", "Can publish websites", "Can manage team"]),
        feature("admin-assignments", "Admin Assignments", "Assign Admins to events and review ownership.", UsersRound, "form", ["Admin", "Event", "Access level", "Assignment status"]),
        feature("employee-event-assignments", "Employee Event Assignments", "Assign employees to events, tasks, and content workflows.", UsersRound, "form", ["Employee", "Event", "Task or responsibility", "Due date", "Assignment status"]),
      ] },
      { label: "Team workflow", icon: UsersRound, items: [
        feature("assignments", "Employee Assignments", "Assign content and operations work to employees.", UsersRound, "form", ["Employee", "Event", "Task", "Due date"]),
        feature("employee-work", "Employee Work", "Track assigned work and completion progress.", Workflow),
      ] },
      { label: "Review & publish", icon: ClipboardCheck, items: [
        feature("review-queue", "Review Queue", "Review updates submitted by employees.", ClipboardCheck),
        feature("content-approvals", "Content Approvals", "Approve or return event content changes.", FileCheck2),
        feature("publishing-readiness", "Publishing Readiness", "Check whether event content is ready to publish.", ShieldCheck),
      ] },
      { label: "Website Configuration", direct: true, icon: Pencil, items: [
        feature("website-editor", "Website Configuration", "Manage event website content, sections, images, logos, SEO, theme, defaults, and publishing controls.", Pencil, "settings", ["Website title", "Hero subtitle", "Start date", "End date", "Venue", "Header logo URL", "Hero banner URL", "About copy", "Gallery image URLs", "Media partner logo URLs", "Navigation links", "Footer address", "Contact email", "SEO title", "SEO description", "Primary color", "Accent color", "Website status", "Default site title", "Default contact email", "Default publishing mode", "Default template", "Require Admin approval", "Allow employee edits after publish", "Archive behavior", "Credit title", "Credit content"]),
        feature("published-sites", "Published Sites", "Review and manage published event websites.", Globe2),
        feature("manage-websites", "Manage Event Websites", "Open event websites, templates, content status, and publish controls.", Globe2),
        feature("publishing-rules", "Publishing Rules", "Manage the single Admin approval and publishing workflow.", Workflow, "settings", ["Require Admin approval", "Allow employee edits after publish", "Archive behavior"]),
      ] },
      { label: "Operations", icon: Activity, items: [
        feature("activity", "Platform Activity", "Review recent changes across Velentra.", Activity),
        feature("audit-log", "Audit Log", "Trace role, content, assignment, and publishing changes.", FileText),
        feature("system-settings", "System Settings", "Manage platform-level settings and access controls.", Settings2, "settings", ["Platform name", "Session timeout", "Notification defaults", "Maintenance mode"]),
        feature("notifications", "Notifications", "Review platform alerts, team updates, and handoff messages.", Bell),
      ] },
      { label: "Settings", icon: Settings2, items: [
        feature("admin-settings", "Workspace Settings", "Manage Admin workspace preferences.", Settings2, "settings"),
        feature("access-help", "Access & Help", "Review access guidance and support information.", CircleHelp),
      ] },
    ],
  },
};

export default function RoleDashboard({ role, onBack, username, initialFeature = "dashboard" }: { role: RoleKey; onBack: () => void; username: string; initialFeature?: string }) {
  const config = roleConfigs[role];
  const [activeId, setActiveId] = useState(initialFeature);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(["Events"]));
  const [employeeRows, setEmployeeRows] = useState<EmployeeRecord[]>(() => {
    try {
      const stored = sessionStorage.getItem("velentra-admin-employees") ?? sessionStorage.getItem("velentra-super-admin-employees");
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<EmployeeRecord>[];
        return parsed.map((employee, index) => ({ id: employee.id ?? `employee-${index}`, employeeId: employee.employeeId ?? `EMP-${String(index + 1).padStart(4, "0")}`, name: employee.name ?? "Unnamed employee", email: employee.email ?? "Not provided", contactNumber: employee.contactNumber ?? "Not provided", address: employee.address ?? "Not provided", role: normalizeEmployeeRole(employee.role), status: employee.status ?? "Active", updated: employee.updated ?? "Just now" }));
      }
      return [{ id: "emp-preview", employeeId: "EMP-0001", name: "EMP", email: "employee@velentra.preview", contactNumber: "Not provided", address: "Preview account", role: "Employee", status: "Active", updated: "Preview account" }];
    } catch {
      return [{ id: "emp-preview", employeeId: "EMP-0001", name: "EMP", email: "employee@velentra.preview", contactNumber: "Not provided", address: "Preview account", role: "Employee", status: "Active", updated: "Preview account" }];
    }
  });
  const [eventRows, setEventRows] = useState<EventRecord[]>(() => {
    try {
      const stored = sessionStorage.getItem("velentra-admin-events");
      if (stored) return JSON.parse(stored) as EventRecord[];
    } catch { /* Preview storage can be unavailable. */ }
    return [{ id: "event-preview", title: "All Events workspace", startDate: "—", endDate: "—", venue: "Preview venue", eventStatus: "Draft", subdomain: "event-preview", domain: "velentra.events", websiteStatus: "On hold" }];
  });
  const [editingEmployee, setEditingEmployee] = useState<EmployeeRecord | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);
  const [websitePreviewEvent, setWebsitePreviewEvent] = useState<EventRecord | null>(null);
  const [websiteEditEvent, setWebsiteEditEvent] = useState<EventRecord | null>(null);
  const [websiteSelectedSection, setWebsiteSelectedSection] = useState<string | null>(null);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("All roles");
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState("All statuses");
  const [globalEmployeeUsername, setGlobalEmployeeUsername] = useState(() => {
    try { return localStorage.getItem("velentra-global-employee-username") ?? sessionStorage.getItem("velentra-global-employee-username") ?? ""; } catch { return ""; }
  });
  useEffect(() => { try { sessionStorage.setItem("velentra-admin-employees", JSON.stringify(employeeRows)); } catch { /* Preview storage can be unavailable in restricted browsers. */ } }, [employeeRows]);
  useEffect(() => { try { sessionStorage.setItem("velentra-admin-events", JSON.stringify(eventRows)); } catch { /* Preview storage can be unavailable. */ } }, [eventRows]);
  const allFeatures = config.sections.flatMap(section => section.items);
  const active = allFeatures.find(item => item.id === activeId) ?? allFeatures[0];
  const websiteSectionDetails: Record<string, { name: string; fields: string[] }> = {
    logo: { name: "Logo & Branding", fields: ["Brand name", "Logo URL", "Favicon URL", "Logo alt text"] },
    header: { name: "Header", fields: ["Logo image", "Left header content", "Right header content", "Top header text", "Top header text color", "Event title", "Start date", "End date", "Venue", "Header background color", "Bottom date bar color", "Navigation links"] },
    pages: { name: "Pages", fields: ["Page title", "URL slug", "Page content", "SEO title", "SEO description"] },
    hero: { name: "Hero Banner", fields: ["Headline", "Subtitle", "Banner image", "CTA label and URL"] },
    about: { name: "About Conference", fields: ["Heading", "Introduction content", "Feature image"] },
    speakers: { name: "Speakers & Committee", fields: ["Section heading", "Description", "Speaker profiles"] },
    testimonials: { name: "Testimonials", fields: ["Quote", "Author name", "Author role", "Author photo"] },
    "video-testimonials": { name: "Video Testimonials", fields: ["Video title", "Video URL", "Poster image", "Description"] },
    gallery: { name: "Gallery & Media", fields: ["Gallery heading", "Image URLs", "Captions"] },
    footer: { name: "Footer & Contact", fields: ["Address", "Email", "Phone", "Social links", "Footer content"] },
  };

  const selectFeature = (id: string) => {
    const parent = config.sections.find(section => section.items.some(item => item.id === id));
    if (parent && !parent.direct) setExpandedSections(current => new Set(current).add(parent.label));
    setActiveId(id);
    setNotice("");
    setMobileNav(false);
  };

  const openWebsiteConfigurationTab = () => {
    const tab = window.open("/workspace/admin/website-configuration", "_blank", "noopener,noreferrer");
    if (!tab) setNotice("Allow pop-ups to open Website Configuration in a new tab.");
  };

  const toggleSection = (label: string) => setExpandedSections(current => { const next = new Set(current); if (next.has(label)) next.delete(label); else next.add(label); return next; });

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (active.id === "add-employee") {
      const name = String(values.get("Employee name") || "New employee");
      const employeeId = String(values.get("Employee ID") || `EMP-${String(employeeRows.length + 1).padStart(4, "0")}`);
      const email = String(values.get("Work email") || "No email provided");
      const contactNumber = String(values.get("Contact number") || "Not provided");
      const address = String(values.get("Address") || "Not provided");
      const roleValue = normalizeEmployeeRole(String(values.get("Role") || "Employee"));
      const statusValue = String(values.get("Account status") || "Active");
      if (editingEmployee) {
        setEmployeeRows(current => current.map(employee => employee.id === editingEmployee.id ? { ...employee, employeeId, name, email, contactNumber, address, role: roleValue, status: statusValue, updated: "Just now" } : employee));
        setEditingEmployee(null);
        setActiveId("employee-directory");
        setNotice(`${name} updated in the Employee Directory.`);
        return;
      }
      setEmployeeRows(current => [...current, { id: `employee-${Date.now()}`, employeeId, name, email, contactNumber, address, role: roleValue, status: statusValue, updated: "Just now" }]);
      setActiveId("employee-directory");
      setNotice(`${name} added to the Employee Directory.`);
      return;
    }
    if (active.id === "create-event") {
      const title = String(values.get("Event title") || "New event");
      const startDate = String(values.get("Start date") || "—");
      const endDate = String(values.get("End date") || "—");
      const venue = String(values.get("Venue") || "—");
      const eventStatus = String(values.get("Event status") || "Active");
      const fallbackSubdomain = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "event";
      const subdomain = String(values.get("Subdomain") || fallbackSubdomain).toLowerCase().trim();
      const domain = String(values.get("Domain") || "velentra.events").trim();
      const websiteStatus = String(values.get("Website status") || "On hold");
      const event: EventRecord = { id: editingEvent?.id ?? `event-${Date.now()}`, title, startDate, endDate, venue, eventStatus, subdomain, domain, websiteStatus };
      try { sessionStorage.setItem("velentra-global-employee-username", subdomain); localStorage.setItem("velentra-global-employee-username", subdomain); } catch { /* Preview storage can be unavailable. */ }
      setGlobalEmployeeUsername(subdomain);
      setEventRows(current => editingEvent ? current.map(item => item.id === editingEvent.id ? event : item) : [...current, event]);
      setEditingEvent(null);
      setActiveId("all-events");
      setNotice(`${editingEvent ? title + " updated" : title + " created"} on ${domain}. Global Employee login: ${subdomain} / 123456`);
      return;
    }
    if (active.id === "website-editor") {
      const websiteValues = Object.fromEntries(Array.from(values.entries()).map(([key, value]) => [key, String(value)]));
      const eventId = websiteEditEvent?.id ?? "global";
      try { sessionStorage.setItem(`velentra-site-config-${eventId}`, JSON.stringify(websiteValues)); } catch { /* Preview storage can be unavailable. */ }
      setNotice(`Website content for ${websiteEditEvent?.title ?? "the global event template"} saved for Admin and Employee access.`);
      setActiveId("all-events");
      return;
    }
    setNotice(`${active.label} ${active.kind === "settings" ? "settings saved" : "saved as a draft"}.`);
  };

  const editEmployee = (employee: EmployeeRecord) => { setEditingEmployee(employee); selectFeature("add-employee"); };
  const deleteEmployee = (employee: EmployeeRecord) => { setEmployeeRows(current => current.filter(item => item.id !== employee.id)); setNotice(`${employee.name} deleted from the Employee Directory.`); };
  const employeeFieldValue = (field: string) => {
    if (!editingEmployee) return undefined;
    return ({ "Employee ID": editingEmployee.employeeId, "Employee name": editingEmployee.name, "Work email": editingEmployee.email, "Contact number": editingEmployee.contactNumber, Address: editingEmployee.address, Role: editingEmployee.role, "Account status": editingEmployee.status } as Record<string, string>)[field];
  };
  const editEvent = (event: EventRecord) => { setEditingEvent(event); selectFeature("create-event"); };
  const deleteEvent = (event: EventRecord) => {
    if (event.eventStatus.toLowerCase() === "published") { setNotice("Published events cannot be deleted."); return; }
    if (!window.confirm(`Delete ${event.title}? This event has not been published.`)) return;
    setEventRows(current => current.filter(item => item.id !== event.id));
    setNotice(`${event.title} deleted.`);
  };
  const eventFieldValue = (field: string) => {
    if (!editingEvent) return undefined;
    return ({ "Event title": editingEvent.title, "Start date": editingEvent.startDate, "End date": editingEvent.endDate, Venue: editingEvent.venue, "Event status": editingEvent.eventStatus, Subdomain: editingEvent.subdomain, Domain: editingEvent.domain, "Website status": editingEvent.websiteStatus } as Record<string, string>)[field];
  };
  const websiteFieldValue = (field: string) => {
    try {
      const stored = sessionStorage.getItem(`velentra-site-config-${websiteEditEvent?.id ?? "global"}`);
      return stored ? (JSON.parse(stored) as Record<string, string>)[field] : undefined;
    } catch { return undefined; }
  };

  const renderDashboard = () => (
    <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {config.eyebrow}</span><h1>{config.title}</h1><p>{config.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => setNotice("Workspace data refreshed just now.")}><Activity size={16} /> Refresh data</button></div>
      <div className="employee-stats-grid">{config.stats.map(stat => <button type="button" key={stat.label} className={`employee-stat-card employee-stat-card-${stat.tone}`} onClick={() => setNotice(`${stat.label} opened for review.`)}><div className="employee-stat-icon"><stat.icon size={19} /></div><div><strong>{stat.value}</strong><span>{stat.label}</span></div><ArrowUpRight size={16} className="employee-stat-arrow" /></button>)}</div>
      <section className="employee-dashboard-section"><div className="employee-section-heading"><div><span className="employee-eyebrow"><span /> Admin workflow</span><h2>Control people, events, access, and publishing</h2></div></div><div className="employee-mini-grid">{["All Events", "Create Event", "Add Employee", "Roles & Permissions", "Employee Event Assignments", "Review Queue", "Employee Assignments", "Publishing Readiness"].map(label => { const target = allFeatures.find(item => item.label === label); return <button key={label} type="button" className="employee-mini-card" onClick={() => target && selectFeature(target.id)}><Workflow size={17} /><span><strong>Open</strong><small>{label}</small></span><ChevronRight size={15} /></button>; })}</div></section>
    </>
  );

  const renderEmployeeDirectory = () => {
    const filteredEmployees = employeeRows.filter(employee => {
      const haystack = `${employee.employeeId} ${employee.name} ${employee.email} ${employee.contactNumber} ${employee.address} ${employee.role} ${employee.status}`.toLowerCase();
      return haystack.includes(employeeSearch.toLowerCase()) && (employeeRoleFilter === "All roles" || employee.role === employeeRoleFilter) && (employeeStatusFilter === "All statuses" || employee.status === employeeStatusFilter);
    });
    return <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> Admin workspace</span><h1>Employee Directory</h1><p>Review, modify, activate, deactivate, and manage employees.</p></div><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button></div>
      {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
      <div className="employee-table-card"><div className="employee-toolbar employee-directory-toolbar"><div className="employee-search"><Activity size={16} /><input value={employeeSearch} onChange={event => setEmployeeSearch(event.target.value)} placeholder="Search employees" /></div><select value={employeeRoleFilter} onChange={event => setEmployeeRoleFilter(event.target.value)} aria-label="Filter by role"><option>All roles</option><option>Employee</option><option>Admin</option></select><select value={employeeStatusFilter} onChange={event => setEmployeeStatusFilter(event.target.value)} aria-label="Filter by status"><option>All statuses</option><option>Active</option><option>Inactive</option></select><div className="employee-toolbar-actions"><button className="employee-secondary-button" type="button" onClick={() => setNotice("Employee Directory refreshed.")}><Activity size={15} /> Refresh</button><button className="employee-primary-button" type="button" onClick={() => { setEditingEmployee(null); selectFeature("add-employee"); }}><Plus size={16} /> Add Employee</button></div></div><div className="employee-table-wrap"><table className="employee-directory-table"><thead><tr><th>Employee ID</th><th>Name</th><th>Email</th><th>Contact</th><th>Address</th><th>Role</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{filteredEmployees.map(employee => <tr key={employee.id}><td><strong>{employee.employeeId}</strong></td><td>{employee.name}</td><td>{employee.email}</td><td>{employee.contactNumber}</td><td>{employee.address}</td><td><span className="employee-role-pill">{employee.role}</span></td><td><span className={`employee-status-pill ${employee.status === "Inactive" ? "employee-status-pill-inactive" : ""}`}>{employee.status}</span></td><td>{employee.updated}</td><td><div className="employee-row-actions"><button className="employee-icon-action" type="button" aria-label={`Edit ${employee.name}`} title="Edit" onClick={() => editEmployee(employee)}><Pencil size={16} /></button><button className="employee-icon-action employee-icon-action-danger" type="button" aria-label={`Delete ${employee.name}`} title="Delete" onClick={() => deleteEmployee(employee)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table>{filteredEmployees.length === 0 ? <div className="employee-empty">No employees match the selected filters.</div> : null}</div></div>
    </>;
  };

  const renderAllEvents = () => <>
    <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> Admin workspace</span><h1>All Events</h1><p>View every event, its website details, and its current publishing status.</p></div><button className="employee-primary-button" type="button" onClick={() => { setEditingEvent(null); selectFeature("create-event"); }}><Plus size={16} /> Create Event</button></div>
    {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
    {websitePreviewEvent ? <div className="employee-website-preview-card"><div className="employee-website-preview-heading"><span className="employee-eyebrow"><span /> Website preview</span><h2>{websitePreviewEvent.title}</h2><p>{websitePreviewEvent.subdomain}.{websitePreviewEvent.domain}</p></div><div className="employee-website-frame-wrap"><iframe title={`${websitePreviewEvent.title} website`} src={`/event-site/index.html?event=${websitePreviewEvent.id}`} onLoad={event => applyWebsiteConfig(websitePreviewEvent.id, event.currentTarget)} /></div><div className="employee-website-preview-actions"><button className="employee-secondary-button" type="button" onClick={() => { setWebsiteEditEvent(websitePreviewEvent); selectFeature("website-editor"); }}><Pencil size={15} /> Modify Website</button><button className="employee-secondary-button" type="button" onClick={() => setWebsitePreviewEvent(null)}>Close</button></div></div> : null}
    <div className="employee-table-card"><div className="employee-table-wrap employee-events-table-wrap"><table className="employee-events-table"><thead><tr><th>Event title</th><th>Start date</th><th>End date</th><th>Venue</th><th>Event status</th><th>Domain</th><th>Website<br />status</th><th>Website</th><th>Actions</th></tr></thead><tbody>{eventRows.map(event => <tr key={event.id}><td><strong>{event.title}</strong></td><td>{event.startDate}</td><td>{event.endDate}</td><td>{event.venue}</td><td><span className="employee-status-pill">{event.eventStatus}</span></td><td className="employee-event-domain">{event.subdomain}.{event.domain}</td><td>{event.websiteStatus}</td><td><div className="employee-row-actions"><a className="employee-icon-action" href={`/event-site/index.html?event=${event.id}`} target="_blank" rel="noreferrer" aria-label={`View website for ${event.title}`} title="View website"><Eye size={16} /></a><button className="employee-icon-action" type="button" aria-label={`Modify website for ${event.title}`} title="Modify website" onClick={() => { setWebsiteEditEvent(event); selectFeature("website-editor"); }}><Pencil size={16} /></button></div></td><td><div className="employee-row-actions"><button className="employee-icon-action" type="button" aria-label={`Edit ${event.title}`} title="Edit event" onClick={() => editEvent(event)}><Pencil size={16} /></button><button className="employee-icon-action employee-icon-action-danger" type="button" aria-label={`Delete ${event.title}`} title="Delete event" onClick={() => deleteEvent(event)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div></div>
  </>;

  const renderFeature = () => {
    if (active.id === "employee-directory") return renderEmployeeDirectory();
    if (active.id === "all-events") return renderAllEvents();
    if (active.id === "website-editor") return <WebsiteEditor eventId={websiteEditEvent?.id ?? "global"} eventTitle={websiteEditEvent?.title ?? "Global event website"} onBack={() => selectFeature("all-events")} onHome={() => selectFeature("dashboard")} onSectionSelected={setWebsiteSelectedSection} onSaved={message => setNotice(message)} />;
    const isForm = active.kind === "form";
    const isSettings = active.kind === "settings";
    const activeTitle = active.id === "add-employee" && editingEmployee ? "Edit Employee" : active.id === "create-event" && editingEvent ? "Edit Event" : active.label;
    const fields = active.fields ?? (isSettings ? ["Section title", "Supporting copy", "Display status"] : ["Search records", "Status filter"]);
    return <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Settings" : config.label}</span><h1>{activeTitle}</h1><p>{editingEmployee && active.id === "add-employee" ? "Update this employee's account, role, and status." : active.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button></div>
      {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
      {active.id === "all-events" && globalEmployeeUsername ? <div className="employee-credential-card"><div><span className="employee-eyebrow"><span /> Global Employee login</span><strong>{globalEmployeeUsername}</strong><small>Username is the event subdomain · Password: <b>123456</b></small></div><ShieldCheck size={22} /></div> : null}
      {isForm || isSettings ? <form className="employee-form-card" onSubmit={saveForm}><div className="employee-form-card-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Workspace controls" : editingEmployee || editingEvent ? "Edit record" : "New workflow record"}</span><h2>{isSettings ? `Configure ${active.label.toLowerCase()}` : `${editingEmployee || editingEvent ? "Edit" : "Build"} ${active.label.toLowerCase()}`}</h2></div><span className="employee-draft-chip">{isSettings ? "Protected" : editingEmployee || editingEvent ? "Edit" : "Draft"}</span></div><div className="employee-form-grid">{fields.map(field => <label key={field}><span>{field}</span><FieldControl activeId={active.id} field={field} initialValue={active.id === "create-event" ? eventFieldValue(field) : active.id === "website-editor" ? websiteFieldValue(field) : employeeFieldValue(field)} /></label>)}</div><div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => { setEditingEmployee(null); setEditingEvent(null); selectFeature(active.id === "add-employee" ? "employee-directory" : active.id === "create-event" || active.id === "website-editor" ? "all-events" : "dashboard"); }}>Cancel</button><button className="employee-primary-button" type="submit"><Check size={16} /> {isSettings ? "Save settings" : editingEmployee ? "Update Employee" : active.id === "add-employee" ? "Save Employee" : active.id === "create-event" ? (editingEvent ? "Update Event" : "Create Event") : "Save changes"}</button></div></form> : <div className="employee-table-card"><div className="employee-toolbar"><div className="employee-search"><Activity size={16} /><input placeholder={`Search ${active.label.toLowerCase()}`} /></div><div className="employee-toolbar-actions"><button className="employee-secondary-button" type="button" onClick={() => setNotice(`${active.label} refreshed.`)}><Activity size={15} /> Refresh</button><button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} is ready for review.`)}><Plus size={16} /> Manage</button></div></div><div className="employee-table-wrap"><table><thead><tr><th>Name / title</th><th>Status</th><th>Updated</th><th>Notes</th><th>Action</th></tr></thead><tbody>{[{ title: `${active.label} workspace`, status: "Ready", meta: "Just now", note: "Preview workspace" }].map((row, index) => <tr key={`${row.title}-${index}`}><td><strong>{row.title}</strong></td><td><span className="employee-status-pill">{row.status}</span></td><td>{row.meta}</td><td>{row.note}</td><td><button className="employee-row-action" type="button" onClick={() => setNotice(`${row.title} selected for review.`)}>View <ArrowUpRight size={14} /></button></td></tr>)}</tbody></table></div></div>}
    </>;
  };

  return (
    <div className="employee-app-shell workspace-shell">
      <WorkspaceHeader role="admin" username={username} onHome={() => selectFeature("dashboard")} onOpenNavigation={() => setMobileNav(true)} onSettings={() => selectFeature("admin-settings")} onLogout={onBack} />
      <aside className={`employee-sidebar ${mobileNav ? "employee-sidebar-open" : ""}`}>
        <button type="button" className="employee-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button>
        {activeId === "website-editor" ? <div className="website-config-sidebar-mode"><strong>Website Configuration</strong><button type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={15} /> Back To Home</button>{websiteSelectedSection && websiteSectionDetails[websiteSelectedSection] ? <div className="website-config-selected-details"><span>Modify section</span><strong>{websiteSectionDetails[websiteSelectedSection].name}</strong><ul>{websiteSectionDetails[websiteSelectedSection].fields.map(field => <li key={field}><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("velentra:edit-section-field", { detail: { sectionId: websiteSelectedSection, field } }))}>{field}</button></li>)}</ul></div> : null}</div> : <div className="employee-sidebar-scroll">{config.sections.map(section => { const visibleItems = section.items.filter(item => !item.hidden); if (visibleItems.length === 0) return null; const featureItem = visibleItems[0]; const Icon = featureItem.icon; if (section.direct) return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item ${activeId === featureItem.id ? "employee-nav-item-active" : ""}`} onClick={() => featureItem.id === "website-editor" ? openWebsiteConfigurationTab() : selectFeature(featureItem.id)}><Icon size={15} /><span>{featureItem.label}</span>{activeId === featureItem.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button></div>; const isExpanded = expandedSections.has(section.label); const groupActive = visibleItems.some(item => item.id === activeId); const SectionIcon = section.icon ?? Icon; return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item employee-nav-group-toggle ${groupActive ? "employee-nav-item-active" : ""}`} aria-expanded={isExpanded} onClick={() => toggleSection(section.label)}><SectionIcon size={15} /><span>{section.label}</span>{isExpanded ? <ChevronDown size={14} className="employee-nav-chevron" /> : <ChevronRight size={14} className="employee-nav-chevron" />}</button>{isExpanded ? <div className="employee-nav-submenu">{visibleItems.map(nested => <button type="button" key={nested.id} className={`employee-nav-item ${activeId === nested.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(nested.id)}><nested.icon size={15} /><span>{nested.label}</span>{activeId === nested.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button>)}</div> : null}</div>; })}</div>}
      </aside>
      {mobileNav ? <button className="employee-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)} /> : null}
      <main className="employee-main">
        <div className="employee-content">{activeId === "dashboard" ? renderDashboard() : renderFeature()}</div>
        <WorkspaceFooter role="admin" />
      </main>
    </div>
  );
}

function FieldControl({ activeId, field, initialValue }: { activeId: string; field: string; initialValue?: string }) {
  const normalized = field.toLowerCase();
  if (normalized.includes("date")) return <input name={field} type="date" defaultValue={initialValue} required />;
  if (normalized.includes("image") || normalized.includes("logo") || normalized.includes("banner") || normalized.includes("url") || normalized.includes("links")) return <input name={field} type="url" placeholder={`Add ${normalized}`} defaultValue={initialValue} />;
  if (activeId === "add-employee" && field === "Contact number") return <input name={field} type="tel" placeholder="Add contact number" defaultValue={initialValue} />;
  if (activeId === "add-employee" && field === "Address") return <textarea name={field} rows={3} placeholder="Add address" defaultValue={initialValue} />;
  if ((activeId === "add-employee" && field === "Role") || field === "Role name") return <select name={field} defaultValue={initialValue ?? ""}><option value="" disabled>Select a role</option><option>Employee</option><option>Admin</option></select>;
  if (normalized.includes("status")) return <select name={field} defaultValue={initialValue ?? "Active"}><option>Active</option><option>Inactive</option><option>In progress</option><option>Admin review</option><option>Ready to publish</option><option>Published</option><option>Archived</option></select>;
  if (field === "Assigned Admin") return <SearchablePicker name={field} options={["Aarav Mehta", "Priya Nair", "Jordan Lee", "Maya Patel"]} placeholder="Search and select an Admin" required />;
  if (field === "Assigned Employees (optional)") return <SearchablePicker name={field} options={["EMP", "Riya Sharma", "Daniel Thomas", "Sara Joseph", "Karan Shah"]} placeholder="Search and select Employees (optional)" multiple />;
  if (normalized.includes("description") || normalized.includes("copy")) return <textarea name={field} rows={4} placeholder={`Add ${normalized}`} />;
  return <input name={field} placeholder={`Add ${normalized}`} defaultValue={initialValue} required={field === "Event title" || field === "Subdomain" || field === "Domain"} />;
}

function SearchablePicker({ name, options, placeholder, multiple = false, required = false }: { name: string; options: string[]; placeholder: string; multiple?: boolean; required?: boolean }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const filtered = options.filter(option => option.toLowerCase().includes(query.toLowerCase()) && !selected.includes(option));
  const choose = (option: string) => { setSelected(current => multiple ? [...current, option] : [option]); setQuery(multiple ? "" : option); if (!multiple) setOpen(false); };
  return <div className="smart-picker"><input type="hidden" name={name} value={selected.join(", ")} /> <div className="smart-picker-control">{selected.map(option => <span className="smart-chip" key={option}>{option}<button type="button" aria-label={`Remove ${option}`} onClick={() => setSelected(current => current.filter(item => item !== option))}>×</button></span>)}<input value={multiple ? query : (selected[0] ?? query)} onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(multiple ? selected : []); setOpen(true); }} placeholder={selected.length ? "" : placeholder} required={required && selected.length === 0} /></div>{open ? <div className="smart-picker-menu">{filtered.length ? filtered.map(option => <button type="button" className="smart-picker-option" key={option} onMouseDown={event => event.preventDefault()} onClick={() => choose(option)}>{option}</button>) : <span className="smart-picker-empty">No matching people</span>}</div> : null}</div>;
}
