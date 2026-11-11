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
import { useEffect, useState, type FormEvent } from "react";

type RoleKey = "admin" | "super-admin";
type ViewKind = "dashboard" | "list" | "form" | "settings";
type RoleFeature = { id: string; label: string; description: string; kind: ViewKind; icon: LucideIcon; fields?: string[]; hidden?: boolean };
type RoleSection = { label: string; items: RoleFeature[]; direct?: boolean; icon?: LucideIcon };
type RoleRow = { title: string; status: string; meta: string; note: string };
type EmployeeRecord = { id: string; name: string; username: string; email: string; role: string; status: string; updated: string };

const feature = (id: string, label: string, description: string, icon: LucideIcon, kind: ViewKind = "list", fields?: string[], hidden = false): RoleFeature => ({ id, label, description, icon, kind, fields, hidden });

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
    description: "Create and manage events, add employees, control roles, assign access, and keep every Velentra setting aligned.",
    stats: [
      { label: "Total events", value: "18", tone: "blue", icon: Globe2 },
      { label: "Published sites", value: "11", tone: "green", icon: FileCheck2 },
      { label: "Admins", value: "6", tone: "blue", icon: ShieldCheck },
      { label: "Team members", value: "42", tone: "red", icon: UsersRound },
    ],
    sections: [
      { label: "Dashboard", direct: true, items: [feature("dashboard", "Dashboard", "A live view of platform activity and event status.", LayoutDashboard, "dashboard")] },
      { label: "Events", icon: Globe2, items: [feature("all-events", "All Events", "Review, modify, publish, archive, and manage every conference event.", Globe2), feature("create-event", "Create Event", "Create an event, assign its Admin, and optionally assign Employees.", Plus, "form", ["Event title", "Event dates", "Venue", "Assigned Admin", "Assigned Employees (optional)", "Event template", "Event status", "Website status"]), feature("edit-event", "Modify Event", "Update event details, ownership, status, and publishing readiness.", FileText, "form", ["Event to modify", "Event title", "Event dates", "Venue", "Assigned Admin", "Publishing status"], true), feature("event-templates", "Event Templates", "Manage reusable conference website templates.", FileText, "list", undefined, true), feature("event-status", "Event Status", "Move events between review, in progress, ready to publish, published, and archived.", Workflow, "settings", ["Event status", "Publishing status"], true)] },
      { label: "Team & access", icon: UsersRound, items: [feature("employee-directory", "Employee Directory", "Review, modify, activate, deactivate, and manage employees.", UsersRound), feature("add-employee", "Add Employee", "Create an Employee account and add them to the team.", Plus, "form", ["Employee name", "Username", "Work email", "Temporary password", "Role", "Account status"]), feature("team-roles", "Roles & Permissions", "Create and manage Employee, Admin, and Super Admin roles and permissions.", ShieldCheck, "settings", ["Role name", "Role description", "Can create events", "Can assign employees", "Can approve content", "Can publish websites", "Can manage team"]), feature("admin-assignments", "Admin Assignments", "Assign Admins to events and review ownership.", UsersRound, "form", ["Admin", "Event", "Access level", "Assignment status"]), feature("employee-event-assignments", "Employee Event Assignments", "Assign employees to events, tasks, and content workflows.", UsersRound, "form", ["Employee", "Event", "Task or responsibility", "Due date", "Assignment status"])] },
      { label: "Websites & publishing", icon: Globe2, items: [feature("published-sites", "Published Sites", "Review and manage published event websites.", Globe2), feature("manage-websites", "Manage Event Websites", "Open event websites, templates, content status, and publish controls.", Globe2), feature("site-settings", "Site Settings", "Manage platform and website defaults.", Settings2, "settings", ["Default site title", "Default contact email", "Default publishing mode", "Default template"]), feature("publishing-rules", "Publishing Rules", "Manage review and publishing workflow settings.", Workflow, "settings", ["Require Admin approval", "Require Super Admin approval", "Allow employee edits after publish", "Archive behavior"])] },
      { label: "Operations", icon: Activity, items: [feature("activity", "Platform Activity", "Review recent changes across Velentra.", Activity), feature("audit-log", "Audit Log", "Trace role, content, assignment, and publishing changes.", FileText), feature("system-settings", "System Settings", "Manage platform-level settings and access controls.", Settings2, "settings", ["Platform name", "Session timeout", "Notification defaults", "Maintenance mode"]), feature("super-notifications", "Notifications", "Review platform alerts and team activity notifications.", Bell)] },
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
  const [employeeRows, setEmployeeRows] = useState<EmployeeRecord[]>(() => {
    try {
      const stored = sessionStorage.getItem("velentra-super-admin-employees");
      return stored ? JSON.parse(stored) as EmployeeRecord[] : [{ id: "emp-preview", name: "EMP", username: "EMP", email: "employee@velentra.preview", role: "Employee", status: "Active", updated: "Preview account" }];
    } catch {
      return [{ id: "emp-preview", name: "EMP", username: "EMP", email: "employee@velentra.preview", role: "Employee", status: "Active", updated: "Preview account" }];
    }
  });
  const [eventRows, setEventRows] = useState<RoleRow[]>([{ title: "All Events workspace", status: "Ready", meta: "Just now", note: "Preview event list" }]);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeRecord | null>(null);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState("All roles");
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState("All statuses");
  useEffect(() => { try { sessionStorage.setItem("velentra-super-admin-employees", JSON.stringify(employeeRows)); } catch { /* Preview storage can be unavailable in restricted browsers. */ } }, [employeeRows]);
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

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (active.id === "add-employee") {
      const name = String(values.get("Employee name") || "New employee");
      const usernameValue = String(values.get("Username") || "Pending username");
      const email = String(values.get("Work email") || "No email provided");
      const roleValue = String(values.get("Role") || "Employee");
      const statusValue = String(values.get("Account status") || "Active");
      if (editingEmployee) {
        setEmployeeRows(current => current.map(employee => employee.id === editingEmployee.id ? { ...employee, name, username: usernameValue, email, role: roleValue, status: statusValue, updated: "Just now" } : employee));
        setEditingEmployee(null);
        setActiveId("employee-directory");
        setNotice(`${name} updated in the Employee Directory.`);
        return;
      }
      setEmployeeRows(current => [...current, { id: `employee-${Date.now()}`, name, username: usernameValue, email, role: roleValue, status: statusValue, updated: "Just now" }]);
      setActiveId("employee-directory");
      setNotice(`${name} added to the Employee Directory.`);
      return;
    }
    if (active.id === "create-event") {
      const title = String(values.get("Event title") || "New event");
      const admin = String(values.get("Assigned Admin") || "Admin pending");
      const employees = String(values.get("Assigned Employees (optional)") || "No Employees assigned");
      setEventRows(current => [...current, { title, status: String(values.get("Event status") || "Active"), meta: "Just now", note: `${admin} · ${employees}` }]);
      setActiveId("all-events");
      setNotice(`${title} created and added to All Events.`);
      return;
    }
    setNotice(`${active.label} ${active.kind === "settings" ? "settings saved" : "saved as a draft"}.`);
  };

  const editEmployee = (employee: EmployeeRecord) => { setEditingEmployee(employee); selectFeature("add-employee"); };
  const deleteEmployee = (employee: EmployeeRecord) => { setEmployeeRows(current => current.filter(item => item.id !== employee.id)); setNotice(`${employee.name} deleted from the Employee Directory.`); };
  const employeeFieldValue = (field: string) => {
    if (!editingEmployee) return undefined;
    return ({ "Employee name": editingEmployee.name, Username: editingEmployee.username, "Work email": editingEmployee.email, Role: editingEmployee.role, "Account status": editingEmployee.status } as Record<string, string>)[field];
  };

  const renderDashboard = () => (
    <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {config.eyebrow}</span><h1>{config.title}</h1><p>{config.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => setNotice("Workspace data refreshed just now.")}><Activity size={16} /> Refresh data</button></div>
      <div className="employee-stats-grid">{config.stats.map(stat => <button type="button" key={stat.label} className={`employee-stat-card employee-stat-card-${stat.tone}`} onClick={() => setNotice(`${stat.label} opened for review.`)}><div className="employee-stat-icon"><stat.icon size={19} /></div><div><strong>{stat.value}</strong><span>{stat.label}</span></div><ArrowUpRight size={16} className="employee-stat-arrow" /></button>)}</div>
      <section className="employee-dashboard-section"><div className="employee-section-heading"><div><span className="employee-eyebrow"><span /> Role workflow</span><h2>{role === "admin" ? "Move work from review to publish" : "Control people, events, and access"}</h2></div></div><div className="employee-mini-grid">{(role === "admin" ? ["Review Queue", "Employee Assignments", "Publishing Readiness", "Website Preview"] : ["Create Event", "Add Employee", "Roles & Permissions", "Employee Event Assignments"]).map(label => { const target = allFeatures.find(item => item.label === label); return <button key={label} type="button" className="employee-mini-card" onClick={() => target && selectFeature(target.id)}><Workflow size={17} /><span><strong>Open</strong><small>{label}</small></span><ChevronRight size={15} /></button>; })}</div></section>
    </>
  );

  const renderEmployeeDirectory = () => {
    const filteredEmployees = employeeRows.filter(employee => {
      const haystack = `${employee.name} ${employee.username} ${employee.email} ${employee.role} ${employee.status}`.toLowerCase();
      return haystack.includes(employeeSearch.toLowerCase()) && (employeeRoleFilter === "All roles" || employee.role === employeeRoleFilter) && (employeeStatusFilter === "All statuses" || employee.status === employeeStatusFilter);
    });
    return <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> Super Admin workspace</span><h1>Employee Directory</h1><p>Review, modify, activate, deactivate, and manage employees.</p></div><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button></div>
      {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
      <div className="employee-table-card"><div className="employee-toolbar employee-directory-toolbar"><div className="employee-search"><Activity size={16} /><input value={employeeSearch} onChange={event => setEmployeeSearch(event.target.value)} placeholder="Search employees" /></div><select value={employeeRoleFilter} onChange={event => setEmployeeRoleFilter(event.target.value)} aria-label="Filter by role"><option>All roles</option><option>Employee</option><option>Admin</option><option>Super Admin</option></select><select value={employeeStatusFilter} onChange={event => setEmployeeStatusFilter(event.target.value)} aria-label="Filter by status"><option>All statuses</option><option>Active</option><option>Inactive</option></select><div className="employee-toolbar-actions"><button className="employee-secondary-button" type="button" onClick={() => setNotice("Employee Directory refreshed.")}><Activity size={15} /> Refresh</button><button className="employee-primary-button" type="button" onClick={() => { setEditingEmployee(null); selectFeature("add-employee"); }}><Plus size={16} /> Add Employee</button></div></div><div className="employee-table-wrap"><table><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{filteredEmployees.map(employee => <tr key={employee.id}><td><strong>{employee.name}</strong></td><td>{employee.username}</td><td>{employee.email}</td><td><span className="employee-role-pill">{employee.role}</span></td><td><span className={`employee-status-pill ${employee.status === "Inactive" ? "employee-status-pill-inactive" : ""}`}>{employee.status}</span></td><td>{employee.updated}</td><td><div className="employee-row-actions"><button className="employee-row-action" type="button" onClick={() => editEmployee(employee)}>Edit</button><button className="employee-row-delete" type="button" onClick={() => deleteEmployee(employee)}>Delete</button></div></td></tr>)}</tbody></table>{filteredEmployees.length === 0 ? <div className="employee-empty">No employees match the selected filters.</div> : null}</div></div>
    </>;
  };

  const renderFeature = () => {
    if (active.id === "employee-directory") return renderEmployeeDirectory();
    const isForm = active.kind === "form";
    const isSettings = active.kind === "settings";
    const activeTitle = active.id === "add-employee" && editingEmployee ? "Edit Employee" : active.label;
    const fields = active.fields ?? (isSettings ? ["Section title", "Supporting copy", "Display status"] : ["Search records", "Status filter"]);
    return <>
      <div className="employee-page-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Settings" : config.label}</span><h1>{activeTitle}</h1><p>{editingEmployee && active.id === "add-employee" ? "Update this employee's account, role, and status." : active.description}</p></div><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button></div>
      {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
      {isForm || isSettings ? <form className="employee-form-card" onSubmit={saveForm}><div className="employee-form-card-heading"><div><span className="employee-eyebrow"><span /> {isSettings ? "Workspace controls" : editingEmployee ? "Edit employee record" : "New workflow record"}</span><h2>{isSettings ? `Configure ${active.label.toLowerCase()}` : `${editingEmployee ? "Edit" : "Build"} ${active.label.toLowerCase()}`}</h2></div><span className="employee-draft-chip">{isSettings ? "Protected" : editingEmployee ? "Edit" : "Draft"}</span></div><div className="employee-form-grid">{fields.map(field => <label key={field}><span>{field}</span><FieldControl activeId={active.id} field={field} initialValue={employeeFieldValue(field)} /></label>)}</div><div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => { setEditingEmployee(null); selectFeature("employee-directory"); }}>Cancel</button><button className="employee-primary-button" type="submit"><Check size={16} /> {isSettings ? "Save settings" : editingEmployee ? "Update Employee" : "Save Employee"}</button></div></form> : <div className="employee-table-card"><div className="employee-toolbar"><div className="employee-search"><Activity size={16} /><input placeholder={`Search ${active.label.toLowerCase()}`} /></div><div className="employee-toolbar-actions"><button className="employee-secondary-button" type="button" onClick={() => setNotice(`${active.label} refreshed.`)}><Activity size={15} /> Refresh</button>{active.id === "all-events" ? <button className="employee-primary-button" type="button" onClick={() => selectFeature("create-event")}><Plus size={16} /> Create new Event</button> : <button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} is ready for review.`)}><Plus size={16} /> Manage</button>}</div></div><div className="employee-table-wrap"><table><thead><tr><th>Name / title</th><th>Status</th><th>Updated</th><th>Notes</th><th>Action</th></tr></thead><tbody>{(active.id === "all-events" ? eventRows : [{ title: `${active.label} workspace`, status: "Ready", meta: "Just now", note: "Preview workspace" }]).map((row, index) => <tr key={`${row.title}-${index}`}><td><strong>{row.title}</strong></td><td><span className="employee-status-pill">{row.status}</span></td><td>{row.meta}</td><td>{row.note}</td><td><button className="employee-row-action" type="button" onClick={() => setNotice(`${row.title} selected for review.`)}>View <ArrowUpRight size={14} /></button></td></tr>)}</tbody></table></div></div>}
    </>;
  };

  return <div className="employee-app-shell"><aside className={`employee-sidebar ${mobileNav ? "employee-sidebar-open" : ""}`}><div className="employee-sidebar-brand"><img className="employee-sidebar-logo" src="/v-logo1.webp" alt="Velentra Group" /><button type="button" className="employee-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button></div><div className="employee-sidebar-scroll">{config.sections.map(section => { const visibleItems = section.items.filter(item => !item.hidden); if (visibleItems.length === 0) return null; const featureItem = visibleItems[0]; const Icon = featureItem.icon; if (section.direct) return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item ${activeId === featureItem.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(featureItem.id)}><Icon size={15} /><span>{featureItem.label}</span>{activeId === featureItem.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button></div>; const isExpanded = expandedSections.has(section.label); const groupActive = visibleItems.some(item => item.id === activeId); const SectionIcon = section.icon ?? Icon; return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item employee-nav-group-toggle ${groupActive ? "employee-nav-item-active" : ""}`} aria-expanded={isExpanded} onClick={() => toggleSection(section.label)}><SectionIcon size={15} /><span>{section.label}</span>{isExpanded ? <ChevronDown size={14} className="employee-nav-chevron" /> : <ChevronRight size={14} className="employee-nav-chevron" />}</button>{isExpanded ? <div className="employee-nav-submenu">{visibleItems.map(nested => <button type="button" key={nested.id} className={`employee-nav-item ${activeId === nested.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(nested.id)}><nested.icon size={15} /><span>{nested.label}</span>{activeId === nested.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button>)}</div> : null}</div>; })}</div><div className="employee-sidebar-footer"><button type="button" className="employee-account-button" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span><strong>{username}</strong><small>{config.shortLabel}</small></span><ChevronDown size={15} /></button>{openProfile ? <div className="employee-account-menu"><button type="button" onClick={onBack}><ArrowLeft size={14} /> Back to sign in</button><button type="button" onClick={onBack}><LogOut size={14} /> Sign out</button></div> : null}</div></aside>{mobileNav ? <button className="employee-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)} /> : null}<main className="employee-main"><header className="employee-topbar"><button className="employee-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div className="employee-breadcrumb"><span>Velentra</span><ChevronRight size={14} /><strong>{active.label}</strong></div><div className="employee-topbar-actions"><button type="button" aria-label="Help" onClick={() => setNotice("Help center is coming with the workspace documentation.")}><CircleHelp size={17} /></button><button type="button" aria-label="Notifications" onClick={() => setNotice("You have no new notifications.")}><Bell size={17} /></button><span className="employee-topbar-divider" /><button type="button" className="employee-topbar-user" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span>{username}</span><ChevronDown size={14} /></button></div></header><div className="employee-content">{activeId === "dashboard" ? renderDashboard() : renderFeature()}</div></main></div>;
}

function FieldControl({ activeId, field, initialValue }: { activeId: string; field: string; initialValue?: string }) {
  const normalized = field.toLowerCase();
  if (normalized.includes("date")) return <input name={field} type="date" defaultValue={initialValue} required={field === "Event dates"} />;
  if (activeId === "add-employee" && field === "Role") return <select name={field} defaultValue={initialValue ?? ""}><option value="" disabled>Select a role</option><option>Employee</option><option>Admin</option><option>Super Admin</option></select>;
  if (normalized.includes("status")) return <select name={field} defaultValue={initialValue ?? "Active"}><option>Active</option><option>Inactive</option><option>In progress</option><option>Admin review</option><option>Ready to publish</option><option>Published</option><option>Archived</option></select>;
  if (field === "Assigned Admin") return <SearchablePicker name={field} options={["Aarav Mehta", "Priya Nair", "Jordan Lee", "Maya Patel"]} placeholder="Search and select an Admin" required />;
  if (field === "Assigned Employees (optional)") return <SearchablePicker name={field} options={["EMP", "Riya Sharma", "Daniel Thomas", "Sara Joseph", "Karan Shah"]} placeholder="Search and select Employees (optional)" multiple />;
  if (normalized.includes("description") || normalized.includes("copy")) return <textarea name={field} rows={4} placeholder={`Add ${normalized}`} />;
  return <input name={field} placeholder={`Add ${normalized}`} defaultValue={initialValue} required={field === "Event title" || field === "Assigned Admin"} />;
}

function SearchablePicker({ name, options, placeholder, multiple = false, required = false }: { name: string; options: string[]; placeholder: string; multiple?: boolean; required?: boolean }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const filtered = options.filter(option => option.toLowerCase().includes(query.toLowerCase()) && !selected.includes(option));
  const choose = (option: string) => { setSelected(current => multiple ? [...current, option] : [option]); setQuery(multiple ? "" : option); if (!multiple) setOpen(false); };
  return <div className="smart-picker"><input type="hidden" name={name} value={selected.join(", ")} /> <div className="smart-picker-control">{selected.map(option => <span className="smart-chip" key={option}>{option}<button type="button" aria-label={`Remove ${option}`} onClick={() => setSelected(current => current.filter(item => item !== option))}>×</button></span>)}<input value={multiple ? query : (selected[0] ?? query)} onFocus={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setSelected(multiple ? selected : []); setOpen(true); }} placeholder={selected.length ? "" : placeholder} required={required && selected.length === 0} /></div>{open ? <div className="smart-picker-menu">{filtered.length ? filtered.map(option => <button type="button" className="smart-picker-option" key={option} onMouseDown={event => event.preventDefault()} onClick={() => choose(option)}>{option}</button>) : <span className="smart-picker-empty">No matching people</span>}</div> : null}</div>;
}
