import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpenText,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Search,
  Settings2,
  SlidersHorizontal,
  UsersRound,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

type FeatureKind = "dashboard" | "list" | "form" | "settings";
type Feature = { id: string; label: string; description: string; kind: FeatureKind; icon: LucideIcon; createTarget?: string };
type Section = { label: string; items: Feature[]; direct?: boolean; icon?: LucideIcon };

type Row = { title: string; status: string; meta: string; note: string };

const item = (id: string, label: string, description: string, icon: LucideIcon, kind: FeatureKind = "list", createTarget?: string): Feature => ({ id, label, description, icon, kind, createTarget });

const sections: Section[] = [
  { label: "Dashboard", direct: true, items: [item("dashboard", "Dashboard", "A live view of the event workspace and current work queues.", LayoutDashboard, "dashboard")] },
  { label: "Email Search", direct: true, items: [item("email-search", "Email Search", "Search conference registration and contact records.", Mail, "form")] },
  { label: "Unsubscribe Emails", direct: true, items: [item("unsubscribe-emails", "Unsubscribe Emails", "Review and manage email opt-out records.", Mail)] },
  { label: "Abstracts", direct: true, items: [item("abstracts", "Abstracts", "Review submitted abstracts and their editorial status.", FileText)] },
  { label: "Brochure Download", direct: true, items: [item("brochures", "Brochure Download", "Track brochure downloads and available materials.", BookOpenText)] },
  {
    label: "Speakers | Board Members",
    icon: UsersRound,
    items: [
      item("boardmembers", "All Members", "Manage the event board and member records.", UsersRound),
      item("keynotespeakers", "Keynote Speakers", "Manage keynote speaker profiles.", UsersRound),
      item("renownedspeakers", "Renowned Speakers", "Manage renowned speaker profiles.", UsersRound),
      item("speakers", "Invited Speakers", "Manage invited speaker profiles.", UsersRound),
      item("posterpresenters", "Poster Presenters", "Manage poster presenter submissions.", UsersRound),
      item("organizingcommittee", "Organizing Committee", "Review organizing committee assignments.", UsersRound),
    ],
  },
  { label: "Representatives", direct: true, items: [item("representatives", "Representatives", "Manage company and event representatives.", UsersRound)] },
  {
    label: "Registration Info",
    icon: SlidersHorizontal,
    items: [
      item("registration-dates", "Registration Dates", "Review registration date records.", CalendarDays),
      item("default-currency", "Default Currency", "Review currency records used throughout registration.", SlidersHorizontal),
      item("registration-prices", "Registration Prices", "Manage registration tiers and prices.", BarChart3),
      item("accommodation-prices", "Accommodation & Accompanying Prices", "Manage accommodation and companion pricing.", BarChart3),
      item("registrations", "Registrations", "Review successful and pending registrations.", ClipboardList),
    ],
  },
  {
    label: "Tracks",
    icon: ClipboardList,
    items: [item("tracks", "Tracks", "Manage conference tracks.", ClipboardList), item("subtracks", "Subtracks", "Manage track-level subcategories.", ClipboardList), item("prices", "Prices", "Manage conference pricing records.", BarChart3)],
  },
  {
    label: "Banner/ Media",
    icon: Image,
    items: [item("banner-images", "Banner Images", "Review and manage hero banners for the event website.", Image), item("media-partner", "Media Partner", "Manage media partner records and logos.", Image), item("exhibitors", "Exhibitors", "Manage exhibitor profiles and display details.", UsersRound)],
  },
  {
    label: "Past Conference Gallery/Review",
    icon: Image,
    items: [item("gallery", "Gallery", "Review past conference gallery items.", Image), item("reviews", "Reviews", "Manage past conference reviews.", FileText)],
  },
  {
    label: "Events",
    icon: CalendarDays,
    items: [item("events-list", "Events List", "Manage event listings and published event details.", CalendarDays), item("add-event", "Add Event", "Create an event for the assigned conference website.", CalendarDays, "form")],
  },
  {
    label: "Conference Sessions",
    icon: CalendarDays,
    items: [item("conference-sessions", "Conference Sessions", "Manage sessions, rooms, times, and speakers.", CalendarDays), item("add-session", "Add Conference Sessions", "Create a session in the conference schedule.", CalendarDays, "form")],
  },
  { label: "Buttons List", direct: true, items: [item("buttons-list", "Buttons List", "Manage uploaded CTA buttons and linked assets.", SlidersHorizontal)] },
  {
    label: "Testimonials",
    icon: FileText,
    items: [item("testimonials-list", "Testimonials List", "Review and manage written testimonials.", FileText), item("add-testimonial", "Add Testimonial", "Create a written testimonial for the website.", FileText, "form"), item("video-testimonials", "Video Testimonials List", "Review and manage video testimonials.", Video), item("add-video-testimonial", "Add Video Testimonials", "Add a video testimonial and its supporting copy.", Video, "form")],
  },
  { label: "Pages", direct: true, items: [item("pages", "Pages", "Manage the event website's reusable pages.", FileText)] },
  {
    label: "Home Tabs",
    icon: SlidersHorizontal,
    items: [item("home-tabs", "Home Tabs", "Manage content tabs displayed on the homepage.", SlidersHorizontal), item("add-home-tab", "Add New Tab", "Add a new homepage content tab.", Plus, "form")],
  },
  {
    label: "Site Settings",
    icon: Settings2,
    items: [item("header-section", "Header Section", "Edit the event website header content.", Settings2, "settings"), item("footer-section", "Footer Section", "Edit the event website footer content.", Settings2, "settings"), item("theme-settings", "Theme Settings", "Tune the event website visual theme.", Settings2, "settings"), item("conference-credits", "Conference Credits", "Manage attribution and conference credit details.", Settings2, "settings")],
  },
];

const allFeatures = sections.flatMap(section => section.items);

const rowsByFeature: Record<string, Row[]> = {
  abstracts: [
    { title: "Abstract #1042 — Future of sustainable events", status: "In review", meta: "Updated today", note: "Awaiting editorial review" },
    { title: "Abstract #1041 — Designing for accessibility", status: "Approved", meta: "Updated yesterday", note: "Ready for website" },
  ],
  brochures: [{ title: "Velentra 2027 Conference Brochure", status: "Published", meta: "7 downloads", note: "PDF • 4.8 MB" }],
  registrations: [
    { title: "Success registrations", status: "0 records", meta: "Live queue", note: "All confirmed registrations" },
    { title: "Pending registrations", status: "0 records", meta: "Needs review", note: "Registrations awaiting payment" },
  ],
  boardmembers: [{ title: "Editorial board", status: "0 members", meta: "Active", note: "No members added yet" }],
  "events-list": [{ title: "Velentra Annual Conference 2027", status: "In progress", meta: "Oct 14–16, 2027", note: "Main conference website" }],
  "conference-sessions": [{ title: "Opening keynote", status: "Draft", meta: "Day 1 • Main hall", note: "Speaker not assigned" }],
  "testimonials-list": [{ title: "A clear, confident conference experience", status: "Draft", meta: "Written testimonial", note: "Not published" }],
  "video-testimonials": [{ title: "Why we return to Velentra", status: "Ready", meta: "02:14", note: "Video review pending" }],
  "email-search": [{ title: "Search the registration directory", status: "Ready", meta: "400 records", note: "Use the search field above" }],
  "unsubscribe-emails": [{ title: "Unsubscribe records", status: "400 records", meta: "Last sync today", note: "Export or review opt-outs" }],
};

const formFields: Record<string, string[]> = {
  "email-search": ["Email Address"],
  "add-event": ["Title", "Status", "Description"],
  "add-session": ["Title", "Status", "Description"],
  tracks: ["Track name", "Short description", "Display order"],
  subtracks: ["Subtrack name", "Parent track", "Display order"],
  "registration-prices": ["Price name", "Amount", "Currency", "Availability"],
  "accommodation-prices": ["Accommodation type", "Price", "Availability", "Notes"],
  "banner-images": ["Banner title", "Image URL", "Alt text", "Display status"],
  "media-partner": ["Partner name", "Website URL", "Logo URL", "Display status"],
  exhibitors: ["Company name", "Contact email", "Booth or profile URL", "Description"],
  reviews: ["Reviewer name", "Review copy", "Event year", "Publish status"],
  "add-testimonial": ["Title", "Status", "Description"],
  "add-video-testimonial": ["Title", "Status", "Description"],
  "add-home-tab": ["Title", "Status", "Description"],
};

const settingsFields = ["Section title", "Visibility", "Content"];

const defaultRows = (feature: Feature): Row[] => [
  { title: `${feature.label} workspace`, status: "Ready", meta: "No records yet", note: "Create the first record to begin" },
];

function getFeature(id: string) {
  return allFeatures.find(feature => feature.id === id) ?? allFeatures[0];
}

export default function EmployeeDashboard({ onBack, username }: { onBack: () => void; username: string }) {
  const [activeId, setActiveId] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [savedRows, setSavedRows] = useState<Record<string, Row[]>>({});
  const [pageSize, setPageSize] = useState("10");
  const [openProfile, setOpenProfile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(["Events"]));
  const active = getFeature(activeId);

  const rows = useMemo(() => {
    const source = savedRows[active.id] ?? rowsByFeature[active.id] ?? defaultRows(active);
    if (!search.trim()) return source;
    return source.filter(row => `${row.title} ${row.status} ${row.meta} ${row.note}`.toLowerCase().includes(search.toLowerCase()));
  }, [active, savedRows, search]);

  const selectFeature = (id: string) => {
    const parent = sections.find(section => section.items.some(feature => feature.id === id));
    if (parent) {
      setExpandedSections(current => {
        const next = new Set(current);
        next.add(parent.label);
        return next;
      });
    }
    setActiveId(id);
    setSearch("");
    setNotice("");
    setMobileNav(false);
  };

  const toggleSection = (label: string) => {
    setExpandedSections(current => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const addRecord = () => {
    if (active.createTarget && active.createTarget !== "settings" && active.createTarget !== "form") {
      selectFeature(active.createTarget);
      return;
    }
    setNotice(`${active.label} is ready for a new record.`);
  };

  const saveForm = () => {
    if (active.id === "email-search") {
      setNotice("Email search completed in the local preview.");
      return;
    }
    const newRow: Row = {
      title: `${active.label} draft ${Date.now().toString().slice(-4)}`,
      status: "Draft",
      meta: "Just now",
      note: "Created in this employee workspace",
    };
    setSavedRows(current => ({ ...current, [active.id]: [newRow, ...(current[active.id] ?? rowsByFeature[active.id] ?? [])] }));
    setNotice(`${active.label} saved as a draft.`);
  };

  const renderDashboard = () => (
    <>
      <div className="employee-page-heading">
        <div><span className="employee-eyebrow"><span /> Overview</span><h1>Good morning, {username}.</h1><p>Here’s the current pulse of your conference workspace.</p></div>
        <button className="employee-secondary-button" type="button" onClick={() => setNotice("Dashboard data refreshed just now.")}><Activity size={16} /> Refresh data</button>
      </div>
      <div className="employee-stats-grid">
        <StatCard label="Abstracts" value="0" icon={FileText} tone="blue" action={() => selectFeature("abstracts")} />
        <StatCard label="Brochures" value="7" icon={BookOpenText} tone="blue" action={() => selectFeature("brochures")} />
        <StatCard label="Testimonials" value="0" icon={FileText} tone="blue" action={() => selectFeature("testimonials-list")} />
        <StatCard label="Unsubscribe emails" value="400" icon={Mail} tone="blue" action={() => selectFeature("unsubscribe-emails")} />
      </div>
      <section className="employee-dashboard-section">
        <div className="employee-section-heading"><div><span className="employee-eyebrow"><span /> Registrations</span><h2>Registration pipeline</h2></div><button className="employee-link-button" type="button" onClick={() => selectFeature("registrations")}>View all <ArrowUpRight size={15} /></button></div>
        <div className="employee-registration-grid">
          <StatCard label="Success registrations" value="0" icon={Check} tone="green" action={() => selectFeature("registrations")} />
          <StatCard label="Pending registrations" value="0" icon={ClipboardList} tone="red" action={() => selectFeature("registrations")} />
        </div>
      </section>
      <section className="employee-dashboard-section">
        <div className="employee-section-heading"><div><span className="employee-eyebrow"><span /> Editorial board</span><h2>People and program</h2></div><button className="employee-link-button" type="button" onClick={() => selectFeature("boardmembers")}>Manage people <ArrowUpRight size={15} /></button></div>
        <div className="employee-mini-grid">
          {["Organizing Committee", "Keynote Speakers", "Renowned Speakers", "Poster Presenters", "Invited Speakers", "Representatives"].map(label => <button key={label} type="button" className="employee-mini-card" onClick={() => selectFeature(allFeatures.find(feature => feature.label === label)?.id ?? "boardmembers")}><UsersRound size={17} /><span><strong>0</strong><small>{label}</small></span><ChevronRight size={15} /></button>)}
        </div>
      </section>
    </>
  );

  const renderFeature = () => {
    const isForm = active.kind === "form" || activeId.startsWith("add-");
    const isSettings = active.kind === "settings";
    return (
      <>
        <div className="employee-page-heading">
          <div><span className="employee-eyebrow"><span /> {active.kind === "settings" ? "Settings" : "Employee workspace"}</span><h1>{active.label}</h1><p>{active.description}</p></div>
          <button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={16} /> Dashboard</button>
        </div>
        {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
        {isSettings ? (
          <div className="employee-settings-grid">
            {settingsFields.map(field => <label className="employee-setting-card" key={field}><span>{field}</span>{field === "Visibility" ? <select defaultValue="Visible"><option>Visible</option><option>Hidden</option></select> : field === "Content" ? <textarea rows={4} placeholder="This is a safe, local preview of the settings editor." /> : <input placeholder="Enter section title" />}</label>)}
            <button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} changes saved.`)}><Check size={16} /> Update preview</button>
          </div>
        ) : isForm ? (
          <div className="employee-form-card">
            <div className="employee-form-card-heading"><div><span className="employee-eyebrow"><span /> New record</span><h2>Build this {active.label.toLowerCase()}</h2></div><span className="employee-draft-chip">Draft</span></div>
            <div className="employee-form-grid">{(formFields[active.id] ?? ["Title", "Status", "Description"]).map(field => <label key={field}><span>{field}</span>{field === "Status" ? <select defaultValue="Draft"><option>Draft</option><option>Published</option></select> : field === "Description" ? <textarea rows={4} placeholder="Enter a short description" /> : <input type={field === "Email Address" ? "email" : "text"} placeholder={field === "Email Address" ? "name@example.com" : "Enter a title"} />}</label>)}</div>
            <div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => selectFeature("dashboard")}>Cancel</button><button className="employee-primary-button" type="button" onClick={saveForm}><Check size={16} /> {active.id === "email-search" ? "Search Email" : "Save draft"}</button></div>
          </div>
        ) : (
          <div className="employee-table-card">
            <div className="employee-table-controls"><label className="employee-length-control">Show <select value={pageSize} onChange={event => setPageSize(event.target.value)}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label><div className="employee-search"><Search size={16} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search:" /></div></div>
            <div className="employee-table-wrap"><table><thead><tr><th>Name / title</th><th>Status</th><th>Updated</th><th>Notes</th><th>Action</th></tr></thead><tbody>{rows.slice(0, Number(pageSize)).map((row, index) => <tr key={`${row.title}-${index}`}><td><strong>{row.title}</strong></td><td><span className="employee-status-pill">{row.status}</span></td><td>{row.meta}</td><td>{row.note}</td><td><button className="employee-row-action" type="button" onClick={() => setNotice(`${row.title} selected for review.`)}>{["abstracts", "brochures", "unsubscribe-emails", "representatives", "registrations"].includes(active.id) ? "View" : "Edit"}</button></td></tr>)}</tbody></table>{rows.length === 0 ? <div className="employee-empty">No records match your search.</div> : null}</div><div className="employee-table-footer"><span>Showing {rows.length ? 1 : 0} to {Math.min(rows.length, Number(pageSize))} of {rows.length} entries</span><div><button type="button" onClick={() => setNotice("Already on the first page.")}>Previous</button><button type="button" onClick={() => setNotice("Already on the last preview page.")}>Next</button></div></div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="employee-app-shell">
      <aside className={`employee-sidebar ${mobileNav ? "employee-sidebar-open" : ""}`}>
        <div className="employee-sidebar-brand"><img className="employee-sidebar-logo" src="/v-logo1.webp" alt="Velentra Group" /><button type="button" className="employee-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button></div>
        <div className="employee-sidebar-scroll">{sections.map(section => { const feature = section.items[0]; const Icon = feature.icon; if (section.direct) return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item ${activeId === feature.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(feature.id)}><Icon size={15} /><span>{feature.label}</span>{activeId === feature.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button></div>; const isExpanded = expandedSections.has(section.label); const groupActive = section.items.some(item => item.id === activeId); const SectionIcon = section.icon ?? Icon; return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item employee-nav-group-toggle ${groupActive ? "employee-nav-item-active" : ""}`} aria-expanded={isExpanded} onClick={() => toggleSection(section.label)}><SectionIcon size={15} /><span>{section.label}</span>{isExpanded ? <ChevronDown size={14} className="employee-nav-chevron" /> : <ChevronRight size={14} className="employee-nav-chevron" />}</button>{isExpanded ? <div className="employee-nav-submenu">{section.items.map(nestedFeature => { const NestedIcon = nestedFeature.icon; return <button type="button" key={nestedFeature.id} className={`employee-nav-item ${activeId === nestedFeature.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(nestedFeature.id)}><NestedIcon size={15} /><span>{nestedFeature.label}</span>{activeId === nestedFeature.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button>; })}</div> : null}</div>; })}</div>
        <div className="employee-sidebar-footer"><button type="button" className="employee-account-button" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span><strong>{username}</strong><small>Employee</small></span><ChevronDown size={15} /></button>{openProfile ? <div className="employee-account-menu"><button type="button" onClick={onBack}><ArrowLeft size={14} /> Back to sign in</button><button type="button" onClick={onBack}><LogOut size={14} /> Sign out</button></div> : null}</div>
      </aside>
      {mobileNav ? <button className="employee-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)} /> : null}
      <main className="employee-main">
        <header className="employee-topbar"><button className="employee-mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div className="employee-breadcrumb"><span>Velentra</span><ChevronRight size={14} /><strong>{active.label}</strong></div><div className="employee-topbar-actions"><button type="button" aria-label="Help" onClick={() => setNotice("Help center is coming with the workspace documentation.")}><CircleHelp size={17} /></button><button type="button" aria-label="Notifications" onClick={() => setNotice("You have no new notifications.")}><Bell size={17} /></button><span className="employee-topbar-divider" /><button type="button" className="employee-topbar-user" onClick={() => setOpenProfile(value => !value)}><span className="employee-avatar">{username.slice(0, 2).toUpperCase()}</span><span>{username}</span><ChevronDown size={14} /></button></div></header>
        <div className="employee-content">{activeId === "dashboard" ? renderDashboard() : renderFeature()}</div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone, action }: { label: string; value: string; icon: LucideIcon; tone: "blue" | "green" | "red"; action: () => void }) {
  return <button type="button" className={`employee-stat-card employee-stat-card-${tone}`} onClick={action}><div className="employee-stat-icon"><Icon size={19} /></div><div><strong>{value}</strong><span>{label}</span></div><ArrowUpRight size={16} className="employee-stat-arrow" /></button>;
}
