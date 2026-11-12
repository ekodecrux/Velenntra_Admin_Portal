import { useMemo, useState, type FormEvent } from "react";
import {
  Archive,
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileImage,
  FileText,
  Image,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Tag,
  Ticket,
  Users,
  UserRound,
  X,
} from "lucide-react";

type IconType = typeof LayoutDashboard;

type NavigationItem = {
  label: string;
  icon: IconType;
  section?: string;
};

type NavigationGroup = {
  label?: string;
  icon?: IconType;
  items: NavigationItem[];
};

type MetricCard = {
  title: string;
  count?: string;
  caption?: string;
  icon: IconType;
  tone: "blue" | "green" | "red";
  action: string;
};

const navigationGroups: NavigationGroup[] = [
  { items: [{ label: "Dashboard", icon: LayoutDashboard }] },
  {
    items: [
      { label: "Email Search", icon: Search },
      { label: "Unsubscribe Emails", icon: Mail },
      { label: "Abstracts", icon: FileText },
      { label: "Brochure Download", icon: Archive },
    ],
  },
  {
    label: "Speakers | Board Members",
    icon: Users,
    items: [
      { label: "All Members", icon: Users },
      { label: "Keynote Speakers", icon: Star },
      { label: "Renowned Speakers", icon: Star },
      { label: "Invited Speakers", icon: UserRound },
      { label: "Poster Presenters", icon: FileImage },
      { label: "Organizing Committee", icon: BriefcaseBusiness },
    ],
  },
  { items: [{ label: "Representatives", icon: UserRound }] },
  {
    label: "Tracks",
    icon: Tag,
    items: [
      { label: "Tracks", icon: Tag },
      { label: "Subtracks", icon: Tag },
      { label: "Prices", icon: Ticket },
    ],
  },
  {
    label: "Registration Info",
    icon: ClipboardList,
    items: [
      { label: "Registration Dates", icon: CalendarDays },
      { label: "Default Currency", icon: CircleHelp },
      { label: "Registration Prices", icon: Ticket },
      { label: "Accommodation & Accompanying Prices", icon: BriefcaseBusiness },
      { label: "Registrations", icon: ClipboardList },
    ],
  },
  {
    label: "Banner/ Media",
    icon: Image,
    items: [
      { label: "Banner Images", icon: Image },
      { label: "Media Partner", icon: BriefcaseBusiness },
      { label: "Exhibitors", icon: Users },
    ],
  },
  {
    label: "Past Conference Gallery/Review",
    icon: Image,
    items: [
      { label: "Gallery", icon: Image },
      { label: "Reviews", icon: MessageSquare },
    ],
  },
  {
    label: "Events",
    icon: CalendarDays,
    items: [
      { label: "Events List", icon: CalendarDays },
      { label: "Add Event", icon: Pencil },
    ],
  },
  {
    label: "Conference Sessions",
    icon: CalendarDays,
    items: [
      { label: "Conference Sessions", icon: CalendarDays },
      { label: "Add Conference Sessions", icon: Pencil },
    ],
  },
  { items: [{ label: "Buttons List", icon: BarChart3 }] },
  {
    label: "Testimonials",
    icon: MessageSquare,
    items: [
      { label: "Testimonials List", icon: MessageSquare },
      { label: "Add Testimonial", icon: Pencil },
      { label: "Video Testimonials List", icon: FileImage },
      { label: "Add Video Testimonials", icon: Pencil },
    ],
  },
  { label: "Pages", icon: BookOpen, items: [{ label: "Pages", icon: BookOpen }] },
  {
    label: "Home Tabs",
    icon: LayoutDashboard,
    items: [
      { label: "Home Tabs", icon: LayoutDashboard },
      { label: "Add New Tab", icon: Pencil },
    ],
  },
  {
    label: "Site Settings",
    icon: Settings,
    items: [
      { label: "Header Section", icon: Settings },
      { label: "Footer Section", icon: Settings },
      { label: "Theme Settings", icon: Settings },
      { label: "Conference Credits", icon: ShieldCheck },
    ],
  },
];

const summaryCards: MetricCard[] = [
  { title: "Abstracts", count: "0", icon: FileText, tone: "blue", action: "View Details" },
  { title: "Brochures", count: "7", icon: FileText, tone: "blue", action: "View Details" },
  { title: "Testimonials", count: "0", icon: MessageSquare, tone: "blue", action: "View Details" },
  { title: "Email Search", icon: Search, tone: "blue", action: "Search Records" },
  { title: "Unsubscribe", count: "400", caption: "Emails", icon: Mail, tone: "blue", action: "View Records" },
];

const registrationCards: MetricCard[] = [
  { title: "Success", count: "0", caption: "registrations", icon: Pencil, tone: "green", action: "View Details" },
  { title: "Pending", count: "0", caption: "registrations", icon: Pencil, tone: "red", action: "View Details" },
];

const editorialCards: MetricCard[] = [
  { title: "Organizing Committee", count: "0", icon: Users, tone: "blue", action: "View Details" },
  { title: "Keynote Speakers", count: "0", icon: Users, tone: "blue", action: "View Details" },
  { title: "Renowned Speakers", count: "0", icon: Users, tone: "blue", action: "View Details" },
  { title: "Poster Presenters", count: "0", icon: FileImage, tone: "blue", action: "View Details" },
  { title: "Invited Speakers", count: "0", icon: Users, tone: "blue", action: "View Details" },
  { title: "Representatives", count: "0", icon: Users, tone: "blue", action: "View Details" },
];

function LogoMark() {
  return (
    <div className="brand-mark" aria-label="Inovine Conferences">
      <div className="brand-wordmark">
        <span>inovine</span>
        <i aria-hidden="true" />
      </div>
      <span className="brand-tagline">Scientific Meetings</span>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <img className="site-header__logo" src="https://inovinegroup.com/admin/assets/inovine-conferences-logo.png" alt="Inovine Conferences" />
      <div className="site-header__profile" aria-label="Employee profile">
        <UserRound size={16} fill="currentColor" strokeWidth={1.5} />
        <ChevronDown size={12} strokeWidth={2.5} />
      </div>
    </header>
  );
}

function MetricCardView({ card, onSelect }: { card: MetricCard; onSelect: (card: MetricCard) => void }) {
  const Icon = card.icon;
  return (
    <button className={`metric-card metric-card--${card.tone}`} onClick={() => onSelect(card)} type="button">
      <span className="metric-card__top">
        <Icon size={24} strokeWidth={1.75} />
        {card.count ? <strong>{card.count}</strong> : <span className="metric-card__empty" />}
      </span>
      <span className="metric-card__title">{card.title}</span>
      {card.caption && <span className="metric-card__caption">{card.caption}</span>}
      <span className="metric-card__footer">
        <span>{card.action}</span>
        <ArrowRight size={13} />
      </span>
    </button>
  );
}

function Sidebar({ active, onSelect, open, onClose }: { active: string; onSelect: (label: string) => void; open: boolean; onClose: () => void }) {
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({});

  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} type="button" />}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <LogoMark />
          <button className="sidebar__close" aria-label="Close navigation" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>
        <nav className="sidebar__nav" aria-label="Coordinator navigation">
          {navigationGroups.map((group, index) => (
            <div className="nav-group" key={`${group.label ?? "items"}-${index}`}>
              {group.label && (
                <button className="nav-group__heading" type="button" onClick={() => setOpenGroups((current) => ({ ...current, [index]: !current[index] }))}>
                  {group.icon && <group.icon size={12} />}
                  <span>{group.label}</span>
                  <ChevronDown className={openGroups[index] ? "nav-group__chevron nav-group__chevron--open" : "nav-group__chevron"} size={11} />
                </button>
              )}
              {(!group.label || openGroups[index] || group.items.some((item) => active === item.label)) && group.items.map((item) => {
                const ItemIcon = item.icon;
                const selected = active === item.label;
                return (
                  <button
                    type="button"
                    className={`nav-item ${selected ? "nav-item--active" : ""}`}
                    key={item.label}
                    onClick={() => {
                      onSelect(item.label);
                      onClose();
                    }}
                  >
                    <ItemIcon size={13} strokeWidth={1.7} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

const sectionData: Record<string, { columns: string[]; rows: string[][] }> = {
  Abstracts: {
    columns: ["Name", "Abstract Title", "Email", "Country", "Phone No", "Category", "Track Name", "Address", "interested", "Oraganization", "Date", "Action"],
    rows: [["Dr. Maya Patel", "New approaches in clinical research", "maya.patel@example.com", "India", "+91 98765 43210", "Research", "Healthcare", "Mumbai", "Yes", "Aster Labs", "10 Nov 2026", "View"]],
  },
  "All Members": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["MP", "Dr. Michael Peterson", "University of Oxford", "Active", "Edit"]] },
  "Keynote Speakers": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["LS", "Dr. Laura Schmidt", "Charité Berlin", "Active", "Edit"]] },
  "Renowned Speakers": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["AR", "Prof. Antonio Rossi", "University of Milan", "Active", "Edit"]] },
  "Invited Speakers": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["NK", "Dr. Neha Kapoor", "AIIMS New Delhi", "Invited", "Edit"]] },
  "Poster Presenters": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["JT", "James Thompson", "King's College London", "Active", "Edit"]] },
  "Organizing Committee": { columns: ["Photo", "Name", "University", "Status", "Action"], rows: [["SW", "Sarah Williams", "Inovine Conferences", "Active", "Edit"]] },
  Representatives: { columns: ["Name", "Email", "Country", "Organization", "Status", "Action"], rows: [["Anita Rao", "anita.rao@example.com", "India", "Apex Events", "Active", "View"]] },
  Tracks: { columns: ["Track Name", "Description", "Subtracks", "Status", "Action"], rows: [["Healthcare Innovation", "Clinical and digital health", "4", "Active", "Edit"]] },
  Subtracks: { columns: ["Subtrack Name", "Track", "Status", "Action"], rows: [["Digital Diagnostics", "Healthcare Innovation", "Active", "Edit"]] },
  Prices: { columns: ["Category", "Currency", "Early Price", "Regular Price", "Action"], rows: [["Delegate", "USD", "$450", "$550", "Edit"]] },
  "Registration Dates": { columns: ["Registration Type", "Start Date", "End Date", "Status", "Action"], rows: [["Early Bird", "01 Jan 2026", "30 Jun 2026", "Closed", "Edit"]] },
  "Default Currency": { columns: ["Currency", "Symbol", "Status", "Action"], rows: [["US Dollar", "USD ($)", "Default", "Edit"]] },
  "Registration Prices": { columns: ["Category", "Currency", "Price", "Status", "Action"], rows: [["Delegate", "USD", "$550", "Published", "Edit"]] },
  "Accommodation & Accompanying Prices": { columns: ["Room Type", "Nights", "Price", "Currency", "Action"], rows: [["Single Room", "3", "$360", "USD", "Edit"]] },
  Registrations: { columns: ["Name", "Email", "Country", "Registration Type", "Payment", "Date", "Action"], rows: [["Priya Menon", "priya.menon@example.com", "India", "Delegate", "Success", "08 Nov 2026", "View"]] },
  "Banner Images": { columns: ["Preview", "Title", "Image", "Status", "Action"], rows: [["IMG", "Conference Hero", "hero-banner.jpg", "Published", "Edit"]] },
  "Media Partner": { columns: ["Logo", "Name", "Website", "Status", "Action"], rows: [["MP", "Global Health Media", "globalhealth.example", "Active", "Edit"]] },
  Exhibitors: { columns: ["Logo", "Company", "Contact", "Booth", "Status", "Action"], rows: [["AL", "Apex Labs", "contact@apex.example", "B-12", "Active", "Edit"]] },
  Gallery: { columns: ["Image", "Title", "Conference", "Status", "Action"], rows: [["IMG", "Opening Ceremony", "Inovine 2025", "Published", "Edit"]] },
  Reviews: { columns: ["Name", "Organization", "Review", "Status", "Action"], rows: [["Dr. Elena Garcia", "MedTech Europe", "Excellent scientific program", "Published", "Edit"]] },
  "Events List": { columns: ["Event Name", "Venue", "Start Date", "End Date", "Status", "Action"], rows: [["Welcome Reception", "Grand Ballroom", "12 Dec 2026", "12 Dec 2026", "Published", "Edit"]] },
  "Conference Sessions": { columns: ["Session Name", "Track", "Date", "Time", "Room", "Action"], rows: [["Future of Digital Health", "Healthcare", "13 Dec 2026", "09:30", "Hall A", "Edit"]] },
  "Buttons List": { columns: ["Button Text", "Link", "Placement", "Status", "Action"], rows: [["Register Now", "/registration", "Home banner", "Active", "Edit"]] },
  "Testimonials List": { columns: ["Name", "Organization", "Testimonial", "Status", "Action"], rows: [["Prof. David Lee", "UCLA Health", "A valuable meeting for collaboration.", "Published", "Edit"]] },
  "Video Testimonials List": { columns: ["Name", "Video URL", "Organization", "Status", "Action"], rows: [["Dr. Sofia Chen", "video.example/sofia", "Stanford Medicine", "Published", "Edit"]] },
  Pages: { columns: ["Page Title", "Slug", "Updated", "Status", "Action"], rows: [["About the Conference", "/about", "02 Nov 2026", "Published", "Edit"]] },
  "Home Tabs": { columns: ["Tab Title", "Order", "Content", "Status", "Action"], rows: [["Why Attend", "1", "Short content block", "Published", "Edit"]] },
};

function TablePreview({ active }: { active: string }) {
  const data = sectionData[active] ?? { columns: ["Name", "Status", "Action"], rows: [["Sample preview record", "Active", "View"]] };
  return (
    <div className="data-table-shell">
      <div className="table-controls"><label>Show <select defaultValue="10"><option>10</option><option>25</option><option>50</option><option>100</option></select> entries</label><label>Search: <input aria-label={`${active} table search`} type="search" placeholder="" /></label></div>
      <div className="data-table-scroll"><table className="data-table"><thead><tr>{data.columns.map((column) => <th key={column}>{column}<span className="sort-mark">↕</span></th>)}</tr></thead><tbody>{data.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === row.length - 1 ? <button type="button" className="row-action">{cell}</button> : cell}</td>)}</tr>)}</tbody></table></div>
      <div className="table-footer"><span>Showing 1 to {data.rows.length} of {data.rows.length} entries</span><div><button type="button">Previous</button><button type="button">Next</button></div></div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }
    setError("");
    onLogin();
  };

  return <main className="login-screen"><div className="login-card"><div className="login-tabs"><button type="button" className="login-tab login-tab--active">Employee Login</button><button type="button" className="login-tab">Administrator Login</button></div><form onSubmit={submit} className="login-form"><input aria-label="Username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} /><input aria-label="Password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />{error && <p className="login-error">{error}</p>}<button type="submit" className="login-submit">LOGIN</button></form></div></main>;
}

function SectionView({ active }: { active: string }) {
  const isSearch = active === "Email Search";
  const isAddPage = active.startsWith("Add ");
  const isSettings = ["Header Section", "Footer Section", "Theme Settings", "Conference Credits"].includes(active);
  const [searched, setSearched] = useState(false);

  return (
    <section className="section-page" aria-labelledby="section-page-title">
      <div className="section-page__bar">
        <div>
          <span className="section-kicker">COORDINATOR MODULE</span>
          <h2 id="section-page-title">{active}</h2>
        </div>
        <span className="section-page__count">Preview mode</span>
      </div>
      {isSearch ? (
        <div className="section-card section-card--search">
          <div className="section-card__title">Search email across coordinator records</div>
          <label className="email-search-field">Email Address<input aria-label="Email Address" type="email" placeholder="name@example.com" /></label>
          <p className="scope-note">Scope: All conferences and all listed tables</p>
          <button type="button" className="primary-action email-search-button" onClick={() => setSearched(true)}><Search size={13} /> Search Email</button>
          <div className="search-tables"><strong>Search Tables</strong><div>{["abstracts", "clients", "contact", "downloadbrochure", "editorialboard", "email_messages", "follow_up", "forms_submission", "registration", "registration_users"].map((table) => <span key={table}>{table}</span>)}</div></div>
          {searched && <div className="search-result-preview"><TablePreview active="Registrations" /></div>}
        </div>
      ) : isAddPage ? (
        <div className="section-card section-card--form">
          <div className="section-card__title"><Pencil size={18} /> {active}</div>
          <div className="form-grid"><label>Title<input placeholder="Enter a title" /></label><label>Status<select defaultValue="Draft"><option>Draft</option><option>Published</option></select></label><label className="form-grid__wide">Description<textarea placeholder="Enter a short description" /></label></div>
          <button type="button" className="primary-action">Save preview</button>
        </div>
      ) : isSettings ? (
        <div className="section-card section-card--form">
          <div className="section-card__title"><Settings size={18} /> {active}</div>
          <div className="form-grid"><label>Section title<input defaultValue={active} /></label><label>Visibility<select defaultValue="Visible"><option>Visible</option><option>Hidden</option></select></label><label className="form-grid__wide">Content<textarea placeholder="This is a safe, local preview of the settings editor." /></label></div>
          <button type="button" className="primary-action">Update preview</button>
        </div>
      ) : (
        <div className="section-card">
          <div className="section-card__title"><ClipboardList size={18} /> {active}</div>
          <TablePreview active={active} />
          <p className="section-card__hint">Sample preview data is shown locally to mirror the reference fields and controls. No records are sent anywhere.</p>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [selected, setSelected] = useState<MetricCard | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeContext = useMemo(() => {
    if (selected) return selected.title;
    if (active === "Dashboard") return "Dashboard overview";
    return active;
  }, [active, selected]);

  const handleNavigation = (label: string) => {
    setActive(label);
    setSelected(null);
  };

  const handleSelect = (card: MetricCard) => {
    setSelected(card);
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="dashboard-shell">
      <SiteHeader />
      <Sidebar active={active} onSelect={handleNavigation} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-main">
        <header className="mobile-topbar">
          <button className="icon-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation" type="button">
            <Menu size={20} />
          </button>
          <LogoMark />
          <div className="mobile-topbar__status">Preview</div>
        </header>

        <div className="dashboard-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">INOVINE CONFERENCES · ADMIN PANEL</p>
              <h1>{active}</h1>
            </div>
            <div className="page-heading__state">
              <span className="status-dot" />
              <span>{activeContext}</span>
            </div>
          </div>

          {selected && (
            <section className="selection-strip" aria-live="polite">
              <div>
                <span className="selection-strip__label">Preview selection</span>
                <strong>{selected.title}</strong>
              </div>
              <p>This interaction is local to the preview and does not connect to the original admin system.</p>
              <button onClick={() => setSelected(null)} type="button" aria-label="Clear selection">
                Clear <X size={14} />
              </button>
            </section>
          )}

          {active === "Dashboard" ? <>
          <section className="dashboard-section" aria-labelledby="overview-title">
            <div className="metrics-grid metrics-grid--overview">
              {summaryCards.map((card) => <MetricCardView card={card} onSelect={handleSelect} key={card.title} />)}
            </div>
          </section>

          <section className="dashboard-section" aria-labelledby="registrations-title">
            <div className="section-heading">
              <div>
                <h2 id="registrations-title">Registrations</h2>
              </div>
              <button type="button" className="text-link" onClick={() => handleNavigation("Registrations")}>Open registrations <ChevronRight size={14} /></button>
            </div>
            <div className="metrics-grid metrics-grid--registrations">
              {registrationCards.map((card) => <MetricCardView card={card} onSelect={handleSelect} key={card.title} />)}
            </div>
          </section>

          <section className="dashboard-section" aria-labelledby="editorial-title">
            <div className="section-heading">
              <div>
                <h2 id="editorial-title">Editorial Board</h2>
              </div>
              <button type="button" className="text-link" onClick={() => handleNavigation("All Members")}>View all members <ChevronRight size={14} /></button>
            </div>
            <div className="metrics-grid metrics-grid--editorial">
              {editorialCards.map((card) => <MetricCardView card={card} onSelect={handleSelect} key={card.title} />)}
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>Coordinator dashboard preview</span>
            <span>Faithful layout recreation · frontend only</span>
          </footer>
          </> : <SectionView active={active} />}
        </div>
      </main>
    </div>
  );
}
