import { ArrowLeft, Check, Eye, Plus, X } from "lucide-react";
import { useState, type FormEvent, type SyntheticEvent } from "react";

const defaultSections = [
  { id: "logo", name: "Logo & Branding", summary: "Logo, favicon, brand name", status: "Published" },
  { id: "header", name: "Header", summary: "Navigation, event title, dates", status: "Published" },
  { id: "pages", name: "Pages", summary: "Home, about, program, contact pages", status: "Published" },
  { id: "hero", name: "Hero Banner", summary: "Headline, banner image, CTA", status: "Published" },
  { id: "about", name: "About Conference", summary: "Conference introduction and details", status: "Draft" },
  { id: "speakers", name: "Speakers & Committee", summary: "Speaker and committee profiles", status: "Draft" },
  { id: "testimonials", name: "Testimonials", summary: "Written testimonials and reviews", status: "Draft" },
  { id: "video-testimonials", name: "Video Testimonials", summary: "Video reviews and embeds", status: "Draft" },
  { id: "gallery", name: "Gallery & Media", summary: "Gallery images and media partners", status: "Draft" },
  { id: "footer", name: "Footer & Contact", summary: "Address, contact, social links", status: "Published" },
];

type WebsiteSection = typeof defaultSections[number];
type SectionContent = Record<string, string> & { status?: string };

type PopupField = { name: string; label: string; type?: "text" | "url" | "date"; placeholder?: string; wide?: boolean };

function popupFields(section: WebsiteSection): PopupField[] {
  switch (section.id) {
    case "logo": return [{ name: "brandName", label: "Brand name", placeholder: "Velentra" }, { name: "logoUrl", label: "Logo URL", type: "url", placeholder: "https://..." }, { name: "faviconUrl", label: "Favicon URL", type: "url", placeholder: "https://..." }, { name: "logoAlt", label: "Logo alt text", placeholder: "Company logo" }];
    case "header": return [{ name: "title", label: "Event title", placeholder: "Conference title" }, { name: "startDate", label: "Start date", type: "date" }, { name: "endDate", label: "End date", type: "date" }, { name: "venue", label: "Venue", placeholder: "Event venue" }, { name: "navigation", label: "Navigation links", placeholder: "Home, About, Program, Contact", wide: true }];
    case "pages": return [{ name: "pageTitle", label: "Page title", placeholder: "About the conference" }, { name: "slug", label: "Page URL slug", placeholder: "about-conference" }, { name: "body", label: "Page content", placeholder: "Write the page content...", wide: true }, { name: "seoTitle", label: "SEO title", placeholder: "Search result title" }, { name: "seoDescription", label: "SEO description", placeholder: "Search result description", wide: true }];
    case "hero": return [{ name: "title", label: "Hero headline", placeholder: "Join us for the conference" }, { name: "subtitle", label: "Hero subtitle", placeholder: "Supporting headline", wide: true }, { name: "imageUrl", label: "Banner image URL", type: "url", placeholder: "https://..." }, { name: "buttonLabel", label: "Button label", placeholder: "Register now" }, { name: "buttonUrl", label: "Button URL", type: "url", placeholder: "https://..." }];
    case "about": return [{ name: "title", label: "About heading", placeholder: "About the conference" }, { name: "imageUrl", label: "Feature image URL", type: "url", placeholder: "https://..." }, { name: "body", label: "About content", placeholder: "Write the conference introduction...", wide: true }];
    case "speakers": return [{ name: "title", label: "Section heading", placeholder: "Meet our speakers" }, { name: "body", label: "Section description", placeholder: "Introduce the speaker and committee area", wide: true }, { name: "imageUrl", label: "Speaker image URL", type: "url", placeholder: "https://..." }];
    case "testimonials": return [{ name: "title", label: "Testimonial heading", placeholder: "What attendees say" }, { name: "quote", label: "Testimonial quote", placeholder: "Write the testimonial quote...", wide: true }, { name: "author", label: "Author name", placeholder: "Author name" }, { name: "authorRole", label: "Author role", placeholder: "Delegate / Speaker" }, { name: "imageUrl", label: "Author photo URL", type: "url", placeholder: "https://..." }];
    case "video-testimonials": return [{ name: "title", label: "Video title", placeholder: "Why attendees return" }, { name: "videoUrl", label: "Video URL", type: "url", placeholder: "https://youtube.com/...", wide: true }, { name: "imageUrl", label: "Poster image URL", type: "url", placeholder: "https://..." }, { name: "body", label: "Video description", placeholder: "Describe this video testimonial", wide: true }];
    case "gallery": return [{ name: "title", label: "Gallery heading", placeholder: "Conference moments" }, { name: "imageUrls", label: "Image URLs", type: "url", placeholder: "https://...", wide: true }, { name: "captions", label: "Image captions", placeholder: "Caption for each image", wide: true }];
    case "footer": return [{ name: "address", label: "Address", placeholder: "Conference address", wide: true }, { name: "email", label: "Contact email", placeholder: "hello@example.com" }, { name: "phone", label: "Phone number", placeholder: "+1 000 000 0000" }, { name: "socialLinks", label: "Social links", placeholder: "Facebook, LinkedIn, Instagram", wide: true }, { name: "body", label: "Footer content", placeholder: "Footer credits and supporting text", wide: true }];
    default: return [{ name: "title", label: "Section title", placeholder: "Section title" }, { name: "body", label: "Section content", placeholder: "Write section content...", wide: true }];
  }
}

type Props = {
  eventId: string;
  eventTitle: string;
  onBack: () => void;
  onHome?: () => void;
  onSaved?: (message: string) => void;
  onSectionSelected?: (sectionId: string) => void;
};

const sectionStorageKey = (eventId: string) => `velentra-site-sections-${eventId || "global"}`;
const contentStorageKey = (eventId: string) => `velentra-section-content-${eventId || "global"}`;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* Preview storage can be unavailable. */ }
}

export default function WebsiteEditor({ eventId, eventTitle, onBack, onHome, onSaved, onSectionSelected }: Props) {
  const [sections, setSections] = useState<WebsiteSection[]>(() => readStorage(sectionStorageKey(eventId), defaultSections));
  const [content, setContent] = useState<Record<string, SectionContent>>(() => readStorage(contentStorageKey(eventId), {}));
  const [selectedId, setSelectedId] = useState(sections[0]?.id ?? "logo");
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [newSectionType, setNewSectionType] = useState("Video Testimonials");
  const selected = sections.find(section => section.id === selectedId) ?? sections[0];

  const openEditor = (section: WebsiteSection) => {
    setSelectedId(section.id);
    setEditingSection(section);
  };

  const saveSection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingSection) return;
    const values = new FormData(event.currentTarget);
    const nextContent: SectionContent = { status: String(values.get("status") || "Draft") };
    popupFields(editingSection).forEach(field => { nextContent[field.name] = String(values.get(field.name) || ""); });
    setContent(current => ({ ...current, [editingSection.id]: nextContent }));
    setSections(current => current.map(section => section.id === editingSection.id ? { ...section, status: nextContent.status || section.status } : section));
    setEditingSection(null);
    onSaved?.(`${editingSection.name} updated for ${eventTitle}.`);
  };

  const addSection = () => {
    const id = `section-${Date.now()}`;
    const section: WebsiteSection = { id, name: newSectionType, summary: `${newSectionType} content`, status: "Draft" };
    setSections(current => [...current, section]);
    setSelectedId(id);
    setContent(current => ({ ...current, [id]: { title: newSectionType, status: "Draft" } }));
    setEditingSection(section);
  };

  const deleteSection = (section: WebsiteSection) => {
    if (!window.confirm(`Remove ${section.name} from this website?`)) return;
    setSections(current => current.filter(item => item.id !== section.id));
    if (selectedId === section.id) setSelectedId(sections.find(item => item.id !== section.id)?.id ?? "");
  };

  const selectedContent = selected ? content[selected.id] ?? {} : {};

  const handlePreviewLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const document = event.currentTarget.contentDocument;
    if (!document) return;
    document.addEventListener("click", clickEvent => {
      const target = clickEvent.target instanceof HTMLElement ? clickEvent.target : null;
      const element = target?.closest("a,button,header,nav,footer,section,article,div") as HTMLElement | null;
      const text = `${element?.innerText ?? ""} ${target?.getAttribute("href") ?? ""}`.toLowerCase();
      const sectionId = text.includes("testimonial") || text.includes("review") ? (text.includes("video") || text.includes("youtube") ? "video-testimonials" : "testimonials") : text.includes("speaker") || text.includes("committee") ? "speakers" : text.includes("contact") || element?.closest("footer") ? "footer" : text.includes("gallery") || text.includes("media") ? "gallery" : text.includes("register") || text.includes("abstract") || element?.closest("header") ? "hero" : element?.closest("nav") ? "header" : target?.tagName === "IMG" ? "logo" : "pages";
      setSelectedId(sectionId);
      setShowSectionMenu(true);
      onSectionSelected?.(sectionId);
    });
  };

  return <>
    {showSectionMenu ? <div className="website-config-workspace">
      <aside className="website-config-menu">
        <div className="website-config-menu-heading"><span className="employee-eyebrow"><span /> Website sections</span><strong>Content menu</strong><small>Click any section name to open its editor.</small></div>
        <div className="website-config-section-list">{sections.map(section => <button type="button" className={`website-config-section-row ${selectedId === section.id ? "website-config-section-row-active" : ""}`} key={section.id} onClick={() => openEditor(section)}><span className="website-config-section-select"><strong>{section.name}</strong><small>{section.summary}</small></span><em>{section.status}</em></button>)}</div>
        <div className="website-config-add"><strong>Add a website section</strong><select value={newSectionType} onChange={event => setNewSectionType(event.target.value)}><option>Video Testimonials</option><option>Testimonials</option><option>New Page</option><option>Image Gallery</option><option>Speaker Section</option><option>Custom Content</option></select><button className="employee-primary-button" type="button" onClick={addSection}><Plus size={15} /> Add section</button></div>
      </aside>
      <section className="website-config-preview">
        <div className="website-config-preview-heading"><div><span className="employee-eyebrow"><span /> Full website preview</span><h2>{selected?.name ?? "Website"}</h2><p>Click a section name on the left to modify its details.</p></div><span className="website-preview-badge"><Eye size={16} /> Live website</span></div>
        <div className="website-config-preview-actions"><span>Complete website content preview</span></div>
        <div className="website-config-iframe-wrap"><iframe title={`${eventTitle} full website preview`} src={`/event-site/index.html?event=${eventId}`} onLoad={handlePreviewLoad} /></div>
      </section>
    </div> : <section className="website-config-full-preview"><div className="website-config-iframe-wrap"><iframe title={`${eventTitle} complete website`} src={`/event-site/index.html?event=${eventId}`} onLoad={handlePreviewLoad} /></div></section>}

    {editingSection ? <div className="website-edit-modal-backdrop" role="presentation"><form className="website-edit-modal" onSubmit={saveSection}><div className="website-edit-modal-header"><div><span className="employee-eyebrow"><span /> Edit website section</span><h2>{editingSection.name}</h2><p>Update the real content fields for this section.</p></div><button type="button" className="employee-icon-action" aria-label="Close editor" onClick={() => setEditingSection(null)}><X size={18} /></button></div><div className="website-edit-modal-fields">{popupFields(editingSection).map(field => <label className={field.wide ? "website-edit-modal-wide" : ""} key={field.name}><span>{field.label}</span>{field.name === "body" || field.name === "quote" || field.name === "navigation" || field.name === "imageUrls" || field.name === "captions" || field.name === "socialLinks" || field.name === "seoDescription" ? <textarea name={field.name} rows={4} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} /> : <input name={field.name} type={field.type ?? "text"} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} />}</label>)}<label><span>Section status</span><select name="status" defaultValue={selectedContent.status ?? editingSection.status}><option>Draft</option><option>Published</option><option>Hidden</option></select></label></div><div className="website-edit-modal-actions"><button type="button" className="employee-secondary-button" onClick={() => setEditingSection(null)}>Cancel</button><button type="submit" className="employee-primary-button"><Check size={16} /> Save section</button></div></form></div> : null}
  </>;
}
