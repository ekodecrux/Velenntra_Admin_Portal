import { useMemo, useState } from "react";
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
                <div className="nav-group__heading">
                  {group.icon && <group.icon size={12} />}
                  <span>{group.label}</span>
                  <ChevronDown size={11} />
                </div>
              )}
              {group.items.map((item) => {
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

function SectionView({ active }: { active: string }) {
  const isSearch = active === "Email Search";
  const isAddPage = active.startsWith("Add ");
  const isSettings = ["Header Section", "Footer Section", "Theme Settings", "Conference Credits"].includes(active);

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
          <div className="section-card__title"><Search size={18} /> Search Records</div>
          <div className="search-row"><input aria-label="Search records" placeholder="Search by email or keyword" /><button type="button">Search</button></div>
          <p className="section-card__hint">Search is available as a local preview interaction. No records are sent anywhere.</p>
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
          <div className="section-card__title"><ClipboardList size={18} /> {active} records</div>
          <div className="fake-table"><div className="fake-row fake-row--header"><span>NAME</span><span>STATUS</span><span>ACTION</span></div><div className="fake-row"><span>No records in preview</span><span><b className="empty-pill">0 items</b></span><span><button type="button" className="row-action">View</button></span></div></div>
          <p className="section-card__hint">This module is wired as an in-preview screen so the menu is functional. It does not connect to the original admin system.</p>
        </div>
      )}
    </section>
  );
}

export default function Home() {
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

  return (
    <div className="dashboard-shell">
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
