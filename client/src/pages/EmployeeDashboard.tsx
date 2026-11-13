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
  UserRound,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { WorkspaceHeader, WorkspaceFooter } from "@/components/WorkspaceChrome";
import WebsiteEditor from "@/components/WebsiteEditor";

type FeatureKind = "dashboard" | "list" | "form" | "settings";
type Feature = { id: string; label: string; description: string; kind: FeatureKind; icon: LucideIcon; createTarget?: string };
type Section = { label: string; items: Feature[]; direct?: boolean; icon?: LucideIcon };
type FieldSpec = { label: string; type?: "text" | "email" | "url" | "date" | "select" | "textarea" | "file"; options?: string[]; placeholder?: string };

type Row = { title: string; status: string; meta: string; note: string; details?: Record<string, string> };
type TestimonialRecord = { id: string; name: string; comment: string; image: string; designation: string; status: string; position: string };
const websiteConfigMenu = [
  { id: "header", label: "Header", editorId: "header" },
  { id: "conference-sessions", label: "Conference Sessions", editorId: "conference-sessions" },
  { id: "buttons-list", label: "Buttons List", editorId: "buttons-list" },
  { id: "testimonials", label: "Testimonials", editorId: "testimonials" },
  { id: "pages", label: "Pages", editorId: "pages" },
  { id: "home-tabs", label: "Home Tabs", editorId: "home-tabs" },
  { id: "site-settings", label: "Site Settings", editorId: "site-settings" },
  { id: "menu-pages", label: "Menu Pages", editorId: "pages" },
  { id: "hero", label: "Banner", editorId: "hero" },
  { id: "announcements", label: "Announcements", editorId: "announcements" },
  { id: "about", label: "About content", editorId: "about" },
  { id: "scientific-sessions", label: "Scientific sessions", editorId: "scientific-sessions" },
  { id: "past-conference", label: "Past conference", editorId: "past-conference" },
  { id: "media-partner", label: "Media partner", editorId: "media-partner" },
  { id: "conference-schedule", label: "Conference schedule", editorId: "conference-schedule" },
  { id: "video-testimonials", label: "Past conference videos", editorId: "video-testimonials" },
  { id: "gallery", label: "Photo gallery", editorId: "gallery" },
  { id: "footer", label: "Footer", editorId: "footer" },
  { id: "social-media", label: "Social media links", editorId: "social-media" },
];

const item = (id: string, label: string, description: string, icon: LucideIcon, kind: FeatureKind = "list", createTarget?: string): Feature => ({ id, label, description, icon, kind, createTarget });

const sections: Section[] = [
  { label: "Dashboard", direct: true, items: [item("dashboard", "Dashboard", "A live view of the event workspace and current work queues.", LayoutDashboard, "dashboard")] },
  { label: "Email Search", direct: true, items: [item("email-search", "Email Search", "Search conference registration and contact records.", Mail, "form")] },
  { label: "Unsubscribe Emails", direct: true, items: [item("unsubscribe-emails", "Unsubscribe Emails", "Review and manage email opt-out records.", Mail, "form")] },
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
      item("registration-dates", "Registration Dates", "Review registration date records.", CalendarDays, "form"),
      item("default-currency", "Default Currency", "Review currency records used throughout registration.", SlidersHorizontal, "form"),
      item("registration-prices", "Registration Prices", "Manage registration tiers and prices.", BarChart3),
      item("accommodation-prices", "Accommodation & Accompanying Prices", "Manage accommodation and companion pricing.", BarChart3, "form"),
      item("registrations", "Registrations", "Review successful and pending registrations.", ClipboardList),
    ],
  },
  {
    label: "Tracks",
    icon: ClipboardList,
    items: [item("tracks", "Tracks", "Manage conference tracks.", ClipboardList), item("subtracks", "Subtracks", "Manage track-level subcategories.", ClipboardList), item("prices", "Prices", "Manage conference pricing records.", BarChart3, "form")],
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
  { label: "Buttons List", direct: true, items: [item("buttons-list", "Buttons List", "Manage uploaded CTA buttons and linked assets.", SlidersHorizontal, "form")] },
  {
    label: "Testimonials",
    icon: FileText,
    items: [item("testimonials-list", "Testimonials List", "Review and manage all event testimonials.", FileText), item("add-testimonial", "Add Testimonial", "Create a written testimonial for the website.", FileText, "form"), item("add-video-testimonial", "Add Video Testimonials", "Add a video testimonial and its supporting copy.", Video, "form")],
  },
  { label: "Pages", direct: true, items: [item("pages", "Pages", "Manage the event website's reusable pages.", FileText)] },
  {
    label: "Home Tabs",
    icon: SlidersHorizontal,
    items: [item("home-tabs", "Home Tabs", "Manage content tabs displayed on the homepage.", SlidersHorizontal), item("add-home-tab", "Add New Tab", "Add a new homepage content tab.", Plus, "form")],
  },
  {
    label: "Website Configuration",
    icon: Settings2,
    direct: true,
    items: [item("website-editor", "Website Configuration", "Manage website content, sections, images, logos, and publishing controls.", Settings2, "form"), item("website-preview", "Website Preview", "Open the imported event website template.", FileText), item("header-section", "Header Section", "Edit the event website header content.", Settings2, "settings"), item("footer-section", "Footer Section", "Edit the event website footer content.", Settings2, "settings"), item("theme-settings", "Theme Settings", "Tune the event website visual theme.", Settings2, "settings"), item("conference-credits", "Conference Credits", "Manage attribution and conference credit details.", Settings2, "settings")],
  },
];

const supplementalFeatures: Feature[] = [
  item("add-member", "Add Member", "Create a board member or speaker record.", UsersRound, "form"),
  item("add-representative", "Add Representative", "Create a representative record.", UsersRound, "form"),
  item("add-track", "Add Track", "Create a conference track.", ClipboardList, "form"),
  item("add-subtrack", "Add Subtrack", "Create a track subcategory.", ClipboardList, "form"),
  item("add-registration-price", "Add Registration Price", "Create a registration price record.", BarChart3, "form"),
  item("add-banner", "Add Banner", "Upload a banner image record.", Image, "form"),
  item("add-media-partner", "Add Media Partner", "Create a media partner record.", Image, "form"),
  item("add-exhibitor", "Add Exhibitor", "Create an exhibitor record.", UsersRound, "form"),
  item("add-gallery", "Add Gallery", "Create a gallery record.", Image, "form"),
  item("add-review", "Add Post Conference Review", "Create a post-conference review.", FileText, "form"),
  item("add-page", "Add Page", "Create a website page.", FileText, "form"),
];

const allFeatures = [...sections.flatMap(section => section.items), ...supplementalFeatures];

const createTargetByFeature: Record<string, string> = {
  boardmembers: "add-member", keynotespeakers: "add-member", renownedspeakers: "add-member", speakers: "add-member", posterpresenters: "add-member", organizingcommittee: "add-member",
  representatives: "add-representative", tracks: "add-track", subtracks: "add-subtrack", "registration-prices": "add-registration-price", "banner-images": "add-banner", "media-partner": "add-media-partner", exhibitors: "add-exhibitor", gallery: "add-gallery", reviews: "add-review", pages: "add-page",
};

const formReturnTargets: Record<string, string> = Object.fromEntries(Object.entries(createTargetByFeature).map(([listId, formId]) => [formId, listId]));

const rowsByFeature: Record<string, Row[]> = {
  abstracts: [
    { title: "Dr. Maya Patel", status: "In review", meta: "10 Nov 2026", note: "View", details: { "Abstract Title": "New approaches in clinical research", Email: "maya.patel@example.com", Country: "India", "Phone No": "+91 98765 43210", Category: "Research", "Track Name": "Healthcare", Address: "Mumbai", Interested: "Yes", Organization: "Aster Labs" } },
    { title: "Dr. Arjun Rao", status: "Approved", meta: "09 Nov 2026", note: "View", details: { "Abstract Title": "Designing accessible conferences", Email: "arjun.rao@example.com", Country: "India", "Phone No": "+91 98765 11111", Category: "Accessibility", "Track Name": "Operations", Address: "Delhi", Interested: "Yes", Organization: "Velentra Group" } },
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

const listColumns: Record<string, string[]> = {
  abstracts: ["Name", "Abstract Title", "Email", "Country", "Phone No", "Category", "Track Name", "Address", "Interested", "Organization", "Date", "Action"],
  brochures: ["Name", "Email", "Brochure", "Downloaded", "Date", "Action"],
  "unsubscribe-emails": ["Email", "Date", "Action"],
  registrations: ["Name", "Email", "Registration Type", "Status", "Date", "Action"],
  boardmembers: ["Name", "Email", "Designation", "Category", "Status", "Action"],
  "events-list": ["Event Name", "Start Date", "End Date", "Venue", "Status", "Action"],
  "conference-sessions": ["Title", "Date", "Venue", "Speaker", "Status", "Action"],
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

const fieldSpecs: Record<string, FieldSpec[]> = {
  "email-search": [{ label: "Email Address", type: "email", placeholder: "name@example.com" }],
  "unsubscribe-emails": [{ label: "Email Address", type: "email", placeholder: "name@example.com" }],
  prices: ["Accommodation price 1", "Accommodation price 2", "Accommodation price 3"].map(label => ({ label })),
  "registration-dates": ["Conference date 1", "Conference date 2", "Conference date 3", "Conference date 4"].map(label => ({ label, type: "date" as const })),
  "default-currency": [{ label: "Default currency", type: "select", options: ["USD", "EUR", "GBP"] }],
  "accommodation-prices": ([{ label: "Accommodation status", type: "select" as const, options: ["Enable", "Disable"] }, { label: "Accommodation price 1" }, { label: "Accommodation price 2" }] as FieldSpec[]),
  "buttons-list": ["Button name 1", "File 1", "Button name 2", "File 2", "Button name 3", "File 3"].map(label => ({ label, type: label.startsWith("File") ? "file" as const : "text" as const })),
  "add-event": [{ label: "Name", placeholder: "Enter event name" }, { label: "Start date", type: "date" }, { label: "End date", type: "date" }, { label: "Venue" }, { label: "Link", type: "url" }, { label: "Status", type: "select", options: ["Active", "Inactive", "Deleted"] }],
  "add-session": [{ label: "Title" }, { label: "Link", type: "url" }, { label: "Description", type: "textarea" }, { label: "Status", type: "select", options: ["Active", "Inactive", "Deleted"] }],
  "add-testimonial": [{ label: "Name" }, { label: "Image", type: "file" }, { label: "Designation" }, { label: "Comment", type: "textarea" }, { label: "Status", type: "select", options: ["Active", "Inactive", "Deleted"] }],
  "add-video-testimonial": [{ label: "Name" }, { label: "Video URL", type: "url" }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-home-tab": [{ label: "Title" }, { label: "Content", type: "textarea" }],
  "header-section": ["Header copy", "Event start date", "Event end date", "Venue", "Hotel", "Address", "About image", ].map(label => ({ label, type: label.includes("date") ? "date" as const : label.includes("description") || label.includes("keywords") ? "textarea" as const : label === "About image" ? "file" as const : "text" as const })),
  "footer-section": ["Footer address", "Email 1", "Email 2", "Email 3", "Phone", "WhatsApp", "Website URL", "Conference short name", "Theme", "Facebook", "X / Twitter", "YouTube", "LinkedIn", "Instagram", "Blog"].map(label => ({ label, type: label.startsWith("Email") ? "email" as const : label.includes("URL") || label === "Facebook" || label === "X / Twitter" || label === "YouTube" || label === "LinkedIn" || label === "Instagram" || label === "Blog" ? "url" as const : "text" as const })),
  "theme-settings": [{ label: "Theme color", type: "text" }, { label: "Accent color", type: "text" }, { label: "Conference logo", type: "file" }, { label: "Logo alt text" }, { label: "Logo title" }, { label: "Theme banner", type: "file" }],
  "website-editor": ["Website title", "Hero subtitle", "Start date", "End date", "Venue", "Header logo URL", "Hero banner URL", "About copy", "Gallery image URLs", "Media partner logo URLs", "Navigation links", "Footer address", "Contact email", "Primary color", "Accent color", "Website status"].map(label => ({ label, type: label.includes("date") ? "date" as const : label.includes("copy") || label.includes("description") || label.includes("links") ? "textarea" as const : label.includes("URL") || label.includes("color") ? "url" as const : "text" as const })),
  "conference-credits": [{ label: "Credit title" }, { label: "Credit content", type: "textarea" }],
  "add-member": [{ label: "Name" }, { label: "Image", type: "file" }, { label: "Email", type: "email" }, { label: "Phone" }, { label: "Country" }, { label: "Designation" }, { label: "Status", type: "select", options: ["Active", "Inactive", "Deleted"] }],
  "add-representative": [{ label: "Name" }, { label: "Organization" }, { label: "Email", type: "email" }, { label: "Phone" }, { label: "Status", type: "select", options: ["Active", "Inactive", "Deleted"] }],
  "add-track": [{ label: "Track name" }, { label: "Description", type: "textarea" }],
  "add-subtrack": [{ label: "Subtrack name" }, { label: "Parent track" }, { label: "Description", type: "textarea" }],
  "add-registration-price": [{ label: "Price name" }, { label: "Amount" }, { label: "Currency", type: "select", options: ["USD", "EUR", "GBP"] }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-banner": [{ label: "Banner title" }, { label: "Image", type: "file" }, { label: "Alt text" }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-media-partner": [{ label: "Partner name" }, { label: "Logo", type: "file" }, { label: "Website URL", type: "url" }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-exhibitor": [{ label: "Company name" }, { label: "Contact email", type: "email" }, { label: "Booth or profile URL", type: "url" }, { label: "Description", type: "textarea" }],
  "add-gallery": [{ label: "Title" }, { label: "Image", type: "file" }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-review": [{ label: "Reviewer name" }, { label: "Review copy", type: "textarea" }, { label: "Event year" }, { label: "Status", type: "select", options: ["Active", "Inactive"] }],
  "add-page": [{ label: "Page title" }, { label: "Page slug" }, { label: "Content", type: "textarea" }],
};

const formActionLabels: Record<string, string> = { "unsubscribe-emails": "Add Unsubscribe Email", "website-editor": "Save Website", prices: "Submit", "registration-dates": "Update", "default-currency": "Submit", "accommodation-prices": "Submit", "buttons-list": "Submit", "add-event": "Add", "add-session": "Submit", "add-testimonial": "Add", "add-video-testimonial": "Submit", "add-home-tab": "Add" };
const emailSearchTables = ["abstracts", "clients", "contact", "downloadbrochure", "editorialboard", "email_messages", "follow_up", "forms_submission", "registration", "registration_users"];

const defaultRows = (feature: Feature): Row[] => [
  { title: `${feature.label} workspace`, status: "Ready", meta: "No records yet", note: "Create the first record to begin" },
];
const testimonialStorageKey = (eventId: string) => `velentra-testimonials-${eventId || "global"}`;
const testimonialPositionOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "First", "Middle", "Last"];
const defaultTestimonials: TestimonialRecord[] = [
  { id: "testimonial-kenichi", name: "Kenichi Komura", comment: "I learned a lot from the meeting. I enjoyed the Conference and visiting at Las Vegas.", image: "/event-site/uploads/testimonials/kenichi-komura-2906.jpg", designation: "Gifu University, Japan", status: "Active", position: "1" },
  { id: "testimonial-heechae", name: "Heechae Choi", comment: "Thank you for the fantastic arrangement of the past conference meeting in Singapore.", image: "/event-site/uploads/testimonials/heechae-choi-7099.jpg", designation: "University of Cologne, Germany", status: "Active", position: "2" },
  { id: "testimonial-mykyta", name: "Mykyta Tretiako", comment: "I would like to raise my compliments for organization of Congress. It was a great opportunity to meet and learn from professionals around the Globe.", image: "/event-site/uploads/testimonials/mykyta-tretiako-7544.jpg", designation: "King Abdullah University of science and technology, Saudi Arabia", status: "Active", position: "3" },
  { id: "testimonial-ili", name: "Ili Bazilah Abd Razak", comment: "The organization, speaker lineup, and engagement were excellent. The conference provided a valuable platform for knowledge exchange and collaboration.", image: "/event-site/uploads/testimonials/ili-bazilah-abd-razak-8485.jpg", designation: "Lead Researcher, FGV R&D Sdn Bhd, Malaysia", status: "Active", position: "4" },
  { id: "testimonial-dionysios", name: "Dionysios (Dion) D. Dionysiou", comment: "The conference was great and attendance was good until the last presentation. I learned some new areas from them.", image: "/event-site/uploads/testimonials/dionysios-dion-d-dionysiou-4481.jpg", designation: "University of Cincinnati, USA", status: "Active", position: "5" },
  { id: "testimonial-stanislaw", name: "Stanislaw Dzwigaj", comment: "I appreciate the conferences organized by Magnus Groups and participate in previous editions in Las Vegas, Rome, and Singapore.", image: "/event-site/uploads/testimonials/stanislaw-dzwigaj-9119.jpg", designation: "Sorbonne Universités, France", status: "Active", position: "6" },
  { id: "testimonial-mohamed", name: "Mohamed El-far", comment: "Greetings and thanks to you. You done very well and we have had excellent success.", image: "/event-site/uploads/testimonials/mohamed-el-far-8135.jpg", designation: "Mansoura University, Egypt", status: "Active", position: "7" },
  { id: "testimonial-quang", name: "Quang Nguyen Tran", comment: "Thank you for organizing the last conference in Singapore, it was a memorable event for me.", image: "/event-site/uploads/testimonials/quang-nguyen-tran-4955.png", designation: "École Nationale Supérieure de Chimie de Montpellier, France", status: "Active", position: "8" },
];

function applyWebsiteConfig(eventId: string, frame: HTMLIFrameElement) {
  try {
    const stored = sessionStorage.getItem(`velentra-site-config-${eventId}`) ?? localStorage.getItem(`velentra-site-config-${eventId}`) ?? sessionStorage.getItem("velentra-site-config-global") ?? localStorage.getItem("velentra-site-config-global");
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

function getFeature(id: string) {
  return allFeatures.find(feature => feature.id === id) ?? allFeatures[0];
}

export default function EmployeeDashboard({ onBack, username, eventId = "global", eventTitle, initialFeature = "dashboard" }: { onBack: () => void; username: string; eventId?: string; eventTitle?: string; initialFeature?: string }) {
  const [activeId, setActiveId] = useState(initialFeature);
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [savedRows, setSavedRows] = useState<Record<string, Row[]>>({});
  const [deletedRows, setDeletedRows] = useState<Record<string, string[]>>({});
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [editingContext, setEditingContext] = useState<string | null>(null);
  const [websiteSelectedSection, setWebsiteSelectedSection] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [pageSize, setPageSize] = useState("10");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => new Set(["Events"]));
  const [testimonialRows, setTestimonialRows] = useState<TestimonialRecord[]>(() => {
    try {
      const stored = localStorage.getItem(testimonialStorageKey(eventId)) ?? sessionStorage.getItem(testimonialStorageKey(eventId));
      if (!stored) return defaultTestimonials;
      const parsed = JSON.parse(stored) as TestimonialRecord[];
      if (parsed.length === 1 && parsed[0]?.id === "testimonial-default") return defaultTestimonials;
      return parsed.map((item, index) => ({ ...item, position: item.position === "Testimonials section" ? String(index + 1) : item.position || String(index + 1) }));
    } catch { return defaultTestimonials; }
  });
  const [testimonialView, setTestimonialView] = useState("Default");
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  useEffect(() => { try { const serialized = JSON.stringify(testimonialRows); localStorage.setItem(testimonialStorageKey(eventId), serialized); sessionStorage.setItem(testimonialStorageKey(eventId), serialized); } catch { /* Preview storage can be unavailable. */ } }, [eventId, testimonialRows]);
  const active = getFeature(activeId);
  const websiteSectionDetails: Record<string, { name: string; fields: string[] }> = {
    header: { name: "Header", fields: ["Logo image", "Left header content", "Right header content", "Top header text", "Top header text color", "Event title", "Start date", "End date", "Venue", "Header background color", "Bottom date bar color", "Navigation links", "Font family", "Font size", "Text color", "Font weight", "Background color", "Spacing and padding"] },
    "conference-sessions": { name: "Conference Sessions", fields: ["Session title", "Session date", "Start time", "End time", "Room / venue", "Speakers", "Status"] },
    "buttons-list": { name: "Buttons List", fields: ["Button label", "Button URL", "Button style", "Button color", "Status"] },
    "home-tabs": { name: "Home Tabs", fields: ["Tab 1 title", "Tab 1 content", "Tab 2 title", "Tab 2 content", "Tab image URL", "Upload tab image"] },
    "site-settings": { name: "Site Settings", fields: ["Site title", "Default page", "Event timezone", "Registration status", "Maintenance message"] },
    pages: { name: "Menu Pages", fields: ["Page title", "Page URL slug", "Page content", "Page image URL", "Upload page image"] },
    "menu-pages": { name: "Menu Pages", fields: ["Page title", "Page URL slug", "Page content", "Page image URL", "Upload page image"] },
    hero: { name: "Banner", fields: ["Hero headline", "Hero subtitle", "Banner image URL", "Button label", "Button URL"] },
    announcements: { name: "Announcements", fields: ["Announcement 1", "Announcement 2", "Announcement 3", "Announcement text color", "Announcement background color", "Rotation interval (seconds)"] },
    about: { name: "About content", fields: ["About heading", "Feature image URL", "About content"] },
    "scientific-sessions": { name: "Scientific sessions", fields: ["Scientific sessions heading", "Sessions introduction", "Session topics", "View sessions button label", "Sessions button URL"] },
    "past-conference": { name: "Past conference", fields: ["Past conference heading", "Conference year", "Conference report", "Feature image URL", "Final program URL", "Past gallery URL"] },
    "media-partner": { name: "Media partner", fields: ["Media partner heading", "Partner name", "Partner website URL", "Partner logo URL", "Upload partner logo"] },
    "conference-schedule": { name: "Conference schedule", fields: ["Schedule heading", "Day 1 label and date", "Day 2 label and date", "Day 3 label and date", "Schedule rows"] },
    "video-testimonials": { name: "Past conference videos", fields: ["Video title", "Video URL", "Poster image URL", "Video description"] },
    gallery: { name: "Photo gallery", fields: ["Gallery heading", "Image URLs", "Captions"] },
    testimonials: { name: "Testimonials", fields: ["Name", "Image", "Designation", "Comment", "Status"] },
    footer: { name: "Footer", fields: ["Address", "Contact email", "Phone number", "Footer content"] },
    "social-media": { name: "Social media links", fields: ["Facebook URL", "X / Twitter URL", "YouTube URL", "Blog URL", "Link labels"] },
  };

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

  const openWebsiteConfigurationTab = () => {
    selectFeature("website-editor");
  };

  const beginEdit = (row: Row) => {
    const target = createTargetByFeature[active.id];
    if (!target) {
      setNotice(`${row.title} is ready for review.`);
      return;
    }
    setEditingRow(row);
    setEditingContext(active.id);
    setFormValues({ ...(row.details ?? {}), Name: row.title, Title: row.title });
    selectFeature(target);
  };

  const deleteRow = (row: Row) => {
    setDeletedRows(current => ({ ...current, [active.id]: [...(current[active.id] ?? []), row.title] }));
    setNotice(`${row.title} was removed from this local preview.`);
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
    const target = active.createTarget ?? createTargetByFeature[active.id];
    if (target) {
      selectFeature(target);
      return;
    }
    setNotice(`${active.label} is ready for a new record.`);
  };

  const saveForm = () => {
    if (active.id === "add-testimonial") {
      const record: TestimonialRecord = { id: editingTestimonialId ?? `testimonial-${Date.now()}`, name: formValues.Name ?? "", comment: formValues.Comment ?? "", image: formValues.Image ?? "", designation: formValues.Designation ?? "", status: formValues.Status ?? "Active", position: formValues.Position ?? String(testimonialRows.length + 1) };
      setTestimonialRows(current => editingTestimonialId ? current.map(item => item.id === editingTestimonialId ? record : item) : [record, ...current]);
      setEditingTestimonialId(null);
      setFormValues({});
      setNotice(`Testimonial ${editingTestimonialId ? "updated" : "added"} for ${eventTitle || "this event"}.`);
      selectFeature("testimonials-list");
      return;
    }
    if (active.id === "website-editor") {
      try { const serialized = JSON.stringify(formValues); sessionStorage.setItem(`velentra-site-config-${eventId}`, serialized); localStorage.setItem(`velentra-site-config-${eventId}`, serialized); } catch { /* Preview storage can be unavailable. */ }
      setNotice("Website content, images, logos, and publishing settings saved for Employee and Admin access.");
      return;
    }
    if (active.id === "email-search") {
      setNotice("Email search completed in the local preview.");
      return;
    }
    const title = formValues.Name || formValues.Title || `${active.label} draft ${Date.now().toString().slice(-4)}`;
    const newRow: Row = {
      title,
      status: "Draft",
      meta: "Just now",
      note: "Created in this employee workspace",
      details: { ...formValues },
    };
    const returnTarget = editingContext ?? formReturnTargets[active.id] ?? active.id;
    setSavedRows(current => {
      const existing = current[returnTarget] ?? rowsByFeature[returnTarget] ?? [];
      const updated = editingRow ? existing.map(row => row.title === editingRow.title ? newRow : row) : [newRow, ...existing];
      return { ...current, [returnTarget]: updated };
    });
    setEditingRow(null);
    setEditingContext(null);
    setFormValues({});
    setNotice(`${active.label} ${editingRow ? "updated" : "saved"} in this local preview.`);
    selectFeature(returnTarget);
  };

  const renderDashboard = () => (
    <>
      <div className="employee-page-heading employee-dashboard-heading">
        <div><h1>Dashboard</h1></div>
      </div>
      <div className="employee-stats-grid">
        <StatCard label="Abstracts" value="0" actionLabel="View Details" icon={FileText} tone="blue" action={() => selectFeature("abstracts")} />
        <StatCard label="Brochures" value="7" actionLabel="View Details" icon={BookOpenText} tone="blue" action={() => selectFeature("brochures")} />
        <StatCard label="Testimonials" value="0" actionLabel="View Details" icon={FileText} tone="blue" action={() => selectFeature("testimonials-list")} />
        <StatCard label="Email Search" value="" actionLabel="Search Records" icon={Search} tone="blue" action={() => selectFeature("email-search")} />
        <StatCard label="Unsubscribe Emails" value="400" actionLabel="View Records" icon={Mail} tone="blue" action={() => selectFeature("unsubscribe-emails")} />
      </div>
      <section className="employee-dashboard-section">
        <div className="employee-section-heading"><div><h2>Registrations</h2></div></div>
        <div className="employee-registration-grid">
          <StatCard label="Success registrations" value="0" actionLabel="View Details" icon={Check} tone="green" action={() => selectFeature("registrations")} />
          <StatCard label="Pending registrations" value="0" actionLabel="View Details" icon={ClipboardList} tone="red" action={() => selectFeature("registrations")} />
        </div>
      </section>
      <section className="employee-dashboard-section">
        <div className="employee-section-heading"><div><h2>Editorial Board</h2></div></div>
        <div className="employee-mini-grid">
          {["Organizing Committee", "Keynote Speakers", "Renowned Speakers", "Poster Presenters", "Invited Speakers", "Representatives"].map(label => <button key={label} type="button" className="employee-mini-card" onClick={() => selectFeature(allFeatures.find(feature => feature.label === label)?.id ?? "boardmembers")}><UsersRound size={17} /><span><strong>0</strong><small>{label}</small></span><ChevronRight size={15} /></button>)}
        </div>
      </section>
    </>
  );

  const renderFeature = () => {
    if (active.id === "testimonials-list") {
      const visibleTestimonials = (testimonialView === "Posted Data" ? testimonialRows.filter(item => item.status === "Active") : testimonialRows).slice().sort((a, b) => { const rank = (value: string) => value === "First" ? -1 : value === "Middle" ? 500 : value === "Last" ? 999 : Number(value) || 0; return rank(a.position) - rank(b.position); });
      return <>
        <div className="employee-page-heading employee-feature-heading"><div><h1>Testimonials List</h1></div></div>
        {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
        <section className="employee-testimonials-card">
          <div className="employee-testimonials-toolbar"><div className="employee-testimonials-title"><FileText size={16} /> Testimonials List</div><label>Frontend view selected by: <select value={testimonialView} onChange={event => setTestimonialView(event.target.value)}><option>Default</option><option>Posted Data</option></select></label><button className="employee-primary-button" type="button" onClick={() => { setEditingTestimonialId(null); setFormValues({ Status: "Active", Position: String(testimonialRows.length + 1) }); selectFeature("add-testimonial"); }}><Plus size={15} /> Add Testimonial</button></div>
          <div className="employee-table-wrap"><table className="employee-testimonials-table"><thead><tr><th>ID</th><th>Name</th><th>Comment</th><th>Image</th><th>Designation</th><th>Status</th><th>Display position</th><th>Action</th></tr></thead><tbody>{visibleTestimonials.length ? visibleTestimonials.map((row, index) => <tr key={row.id}><td>{index + 1}</td><td><strong>{row.name}</strong></td><td>{row.comment}</td><td>{row.image ? <img className="employee-testimonial-thumb" src={row.image} alt="" /> : "—"}</td><td>{row.designation}</td><td><span className="employee-status-pill">{row.status}</span></td><td>{row.position}</td><td><div className="employee-row-actions"><button className="employee-row-action" type="button" onClick={() => { setEditingTestimonialId(row.id); setFormValues({ Name: row.name, Comment: row.comment, Image: row.image, Designation: row.designation, Status: row.status, Position: row.position }); selectFeature("add-testimonial"); }}>Edit</button><button className="employee-row-delete" type="button" onClick={() => { if (window.confirm(`Delete testimonial by ${row.name}?`)) { setTestimonialRows(current => current.filter(item => item.id !== row.id)); setNotice("Testimonial deleted from this event website."); } }}>Delete</button></div></td></tr>) : <tr><td colSpan={8}>No Testimonial found.</td></tr>}</tbody></table></div>
        </section>
      </>;
    }
    if (active.id === "add-testimonial") {
      const setValue = (field: string, value: string) => setFormValues(current => ({ ...current, [field]: value }));
      return <>
        <div className="employee-page-heading employee-feature-heading"><div><h1>{editingTestimonialId ? "Edit Testimonial" : "Add Testimonial"}</h1></div></div>
        <section className="employee-form-card employee-testimonial-form"><div className="employee-form-card-heading"><div><h2>Testimonial</h2></div></div><div className="employee-form-grid"><label><span>Name</span><input value={formValues.Name ?? ""} onChange={event => setValue("Name", event.target.value)} /></label><label><span>Image</span><input type="file" accept="image/*" onChange={event => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setValue("Image", String(reader.result ?? "")); reader.readAsDataURL(file); }} />{formValues.Image ? <img className="employee-testimonial-form-preview" src={formValues.Image} alt="Current testimonial" /> : null}</label><label><span>Designation</span><input value={formValues.Designation ?? ""} onChange={event => setValue("Designation", event.target.value)} /></label><label className="employee-form-wide"><span>Comment</span><textarea rows={7} value={formValues.Comment ?? ""} onChange={event => setValue("Comment", event.target.value)} /></label><label><span>Status</span><select value={formValues.Status ?? "Active"} onChange={event => setValue("Status", event.target.value)}><option>Active</option><option>Inactive</option></select></label><label><span>Display order / position</span><select value={formValues.Position ?? String(testimonialRows.length + 1)} onChange={event => setValue("Position", event.target.value)}>{testimonialPositionOptions.map(option => <option key={option} value={option}>{/^\d+$/.test(option) ? `Position ${option}` : option}</option>)}</select></label></div><div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => { setEditingTestimonialId(null); setFormValues({}); selectFeature("testimonials-list"); }}>Back</button><button className="employee-primary-button" type="button" onClick={saveForm}><Check size={16} /> {editingTestimonialId ? "Update" : "Add"}</button></div></section>
      </>;
    }
    if (active.id === "website-preview") return <><div className="employee-page-heading employee-feature-heading"><div><h1>Website Preview</h1><p>{eventTitle || "Imported conference website template used for event subdomains."}</p></div></div><div className="employee-website-standalone-preview"><iframe title="Imported event website preview" src={`/event-site/index.html?event=${eventId}`} onLoad={event => applyWebsiteConfig(eventId, event.currentTarget)} /></div></>;
    if (active.id === "website-editor") return <WebsiteEditor eventId={eventId} eventTitle={eventTitle || username || "Global event website"} onBack={() => selectFeature("website-preview")} onHome={() => selectFeature("dashboard")} onSectionSelected={setWebsiteSelectedSection} onSaved={message => setNotice(message)} />;
    const isForm = active.kind === "form" || activeId.startsWith("add-");
    const isSettings = active.kind === "settings";
    const activeFields = fieldSpecs[active.id] ?? (formFields[active.id] ?? settingsFields).map(label => ({ label }));
    const columns = listColumns[active.id] ?? ["Title", "Status", "Updated", "Notes", "Action"];
    const rows = rowsByFeature[active.id] ?? [];
    const rowValue = (row: Row, column: string) => row.details?.[column] ?? (column === "Name" || column === "Name / title" || column === "Event Name" || column === "Title" ? row.title : column === "Status" ? row.status : column === "Date" || column === "Updated" ? row.meta : row.note);
    return (
      <>
        <div className="employee-page-heading employee-feature-heading">
          <div><h1>{active.id === "email-search" ? "Coordinator Email Search" : active.label}</h1></div>
        </div>
        {notice ? <div className="employee-notice" role="status"><Check size={16} /> {notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div> : null}
        {active.id === "email-search" ? (
          <>
            <section className="employee-email-search-card">
              <div className="employee-email-search-heading">Search email across coordinator records</div>
              <div className="employee-email-search-body"><label><span>Email Address</span><input type="email" value={formValues["Email Address"] ?? ""} onChange={event => setFormValues(values => ({ ...values, "Email Address": event.target.value }))} placeholder="name@example.com" /></label><button className="employee-email-search-button" type="button" onClick={() => setNotice(formValues["Email Address"] ? `Searching all coordinator tables for ${formValues["Email Address"]}.` : "Enter an email address to search.")}><Search size={15} /> Search Email</button><small>Scope: All conferences and all listed tables</small></div>
            </section>
            <section className="employee-search-tables-card"><h2>Search Tables</h2><div>{emailSearchTables.map(table => <span key={table}>{table}</span>)}</div></section>
          </>
        ) : isSettings ? (
          <div className="employee-settings-grid">
            {activeFields.map(field => <label className="employee-setting-card" key={field.label}><span>{field.label}</span>{field.type === "select" ? <select defaultValue={field.options?.[0]}>{field.options?.map(option => <option key={option}>{option}</option>)}</select> : field.type === "textarea" ? <textarea rows={4} placeholder={field.placeholder ?? "Enter content"} /> : <input type={field.type ?? "text"} placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`} />}</label>)}
            <button className="employee-primary-button" type="button" onClick={() => setNotice(`${active.label} changes saved.`)}><Check size={16} /> Update preview</button>
          </div>
        ) : isForm ? (
          <div className="employee-form-card">
            <div className="employee-form-grid">{activeFields.map(field => <label key={field.label}><span>{field.label}</span>{field.type === "select" ? <select value={formValues[field.label] ?? field.options?.[0] ?? ""} onChange={event => setFormValues(values => ({ ...values, [field.label]: event.target.value }))}>{field.options?.map(option => <option key={option}>{option}</option>)}</select> : field.type === "textarea" ? <textarea rows={4} value={formValues[field.label] ?? ""} onChange={event => setFormValues(values => ({ ...values, [field.label]: event.target.value }))} placeholder={field.placeholder ?? "Enter description"} /> : <input type={field.type ?? "text"} value={formValues[field.label] ?? ""} onChange={event => setFormValues(values => ({ ...values, [field.label]: event.target.value }))} placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`} />}</label>)}</div>
            <div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={() => selectFeature(formReturnTargets[active.id] ?? "dashboard")}>Back</button><button className="employee-primary-button" type="button" onClick={saveForm}><Check size={16} /> {formActionLabels[active.id] ?? (active.id === "email-search" ? "Search Email" : "Submit")}</button></div>
          </div>
        ) : (
          <div className="employee-table-card">
            <div className="employee-table-controls"><label className="employee-length-control">Show <select value={pageSize} onChange={event => setPageSize(event.target.value)}><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label><div className="employee-search"><Search size={16} /><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search:" /></div>{createTargetByFeature[active.id] ? <button className="employee-primary-button" type="button" onClick={addRecord}><Plus size={15} /> {getFeature(createTargetByFeature[active.id]).label}</button> : null}</div>
            <div className="employee-table-wrap"><table><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.slice(0, Number(pageSize)).map((row, index) => <tr key={`${row.title}-${index}`}>{columns.map(column => <td key={column}>{column === "Action" ? <div className="employee-row-actions"><button className="employee-row-action" type="button" onClick={() => beginEdit(row)}>{["abstracts", "brochures", "unsubscribe-emails", "representatives", "registrations"].includes(active.id) ? "View" : "Edit"}</button>{createTargetByFeature[active.id] ? <button className="employee-row-delete" type="button" onClick={() => deleteRow(row)}>Delete</button> : null}</div> : column === "Status" ? <span className="employee-status-pill">{rowValue(row, column)}</span> : column === "Name" || column === "Name / title" || column === "Event Name" || column === "Title" ? <strong>{rowValue(row, column)}</strong> : rowValue(row, column)}</td>)}</tr>)}</tbody></table>{rows.length === 0 ? <div className="employee-empty">No records match your search.</div> : null}</div><div className="employee-table-footer"><span>Showing {rows.length ? 1 : 0} to {Math.min(rows.length, Number(pageSize))} of {rows.length} entries</span><div><button type="button" onClick={() => setNotice("Already on the first page.")}>Previous</button><button type="button" onClick={() => setNotice("Already on the last preview page.")}>Next</button></div></div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="employee-app-shell workspace-shell">
      <WorkspaceHeader role="employee" username={username} headerTitle={activeId === "website-editor" ? "Website Configuration" : undefined} onHome={() => selectFeature("dashboard")} onOpenNavigation={() => setMobileNav(true)} onSettings={() => selectFeature("theme-settings")} onLogout={onBack} />
      <aside className={`employee-sidebar ${mobileNav ? "employee-sidebar-open" : ""}`}>
        <button type="button" className="employee-mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={17} /></button>
        {activeId === "website-editor" ? <div className="website-config-sidebar-mode"><button type="button" onClick={() => selectFeature("dashboard")}><ArrowLeft size={15} /> Back To Home</button><div className="website-config-menu-list">{websiteConfigMenu.map(item => <button type="button" key={item.id} className={`website-config-menu-item ${websiteSelectedSection === item.id ? "website-config-menu-item-active" : ""}`} onClick={() => { setWebsiteSelectedSection(item.id); window.dispatchEvent(new CustomEvent("velentra:select-section", { detail: { sectionId: item.editorId } })); }}>{item.label}</button>)}</div>{websiteSelectedSection && websiteSectionDetails[websiteSelectedSection] ? <div className="website-config-selected-details"><span>Modify section</span><strong>{websiteSectionDetails[websiteSelectedSection].name}</strong><ul>{websiteSectionDetails[websiteSelectedSection].fields.map(field => <li key={field}><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("velentra:edit-section-field", { detail: { sectionId: websiteConfigMenu.find(item => item.id === websiteSelectedSection)?.editorId ?? websiteSelectedSection, field } }))}>{field}</button></li>)}</ul></div> : null}</div> : <div className="employee-sidebar-scroll">{sections.map(section => { const feature = section.items[0]; const Icon = feature.icon; if (section.direct) return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item ${activeId === feature.id ? "employee-nav-item-active" : ""}`} onClick={() => feature.id === "website-editor" ? openWebsiteConfigurationTab() : selectFeature(feature.id)}><Icon size={15} /><span>{feature.label}</span>{activeId === feature.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button></div>; const isExpanded = expandedSections.has(section.label); const groupActive = section.items.some(item => item.id === activeId); const SectionIcon = section.icon ?? Icon; return <div className="employee-nav-section" key={section.label}><button type="button" className={`employee-nav-item employee-nav-group-toggle ${groupActive ? "employee-nav-item-active" : ""}`} aria-expanded={isExpanded} onClick={() => toggleSection(section.label)}><SectionIcon size={15} /><span>{section.label}</span>{isExpanded ? <ChevronDown size={14} className="employee-nav-chevron" /> : <ChevronRight size={14} className="employee-nav-chevron" />}</button>{isExpanded ? <div className="employee-nav-submenu">{section.items.map(nestedFeature => { const NestedIcon = nestedFeature.icon; return <button type="button" key={nestedFeature.id} className={`employee-nav-item ${activeId === nestedFeature.id ? "employee-nav-item-active" : ""}`} onClick={() => selectFeature(nestedFeature.id)}><NestedIcon size={15} /><span>{nestedFeature.label}</span>{activeId === nestedFeature.id ? <ChevronRight size={14} className="employee-nav-chevron" /> : null}</button>; })}</div> : null}</div>; })}</div>}
      </aside>
      {mobileNav ? <button className="employee-nav-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileNav(false)} /> : null}
      <main className="employee-main">
        <div className="employee-content">{activeId === "dashboard" ? renderDashboard() : renderFeature()}</div>
        <WorkspaceFooter role="employee" />
      </main>
    </div>
  );
}

function StatCard({ label, value, actionLabel, icon: Icon, tone, action }: { label: string; value: string; actionLabel: string; icon: LucideIcon; tone: "blue" | "green" | "red"; action: () => void }) {
  return <button type="button" className={`employee-stat-card employee-stat-card-${tone}`} onClick={action}><div className="employee-stat-card-top"><div className="employee-stat-icon"><Icon size={19} /></div><div><strong>{value}</strong><span>{label}</span></div></div><div className="employee-stat-card-footer"><span>{actionLabel}</span><ArrowUpRight size={15} /></div></button>;
}
