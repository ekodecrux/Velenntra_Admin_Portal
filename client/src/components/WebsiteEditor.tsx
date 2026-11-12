import { Check, Eye, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";

const editorFields = [
  "Website title", "Hero subtitle", "Start date", "End date", "Venue", "Header logo URL", "Hero banner URL", "About copy", "Gallery image URLs", "Media partner logo URLs", "Navigation links", "Footer address", "Contact email", "SEO title", "SEO description", "Primary color", "Accent color", "Website status", "Default site title", "Default contact email", "Default publishing mode", "Default template", "Require Admin approval", "Allow employee edits after publish", "Archive behavior", "Credit title", "Credit content",
];

const defaultSections = [
  { id: "header-branding", name: "Header & Branding", summary: "Logo, title, event dates, venue, navigation", status: "Published" },
  { id: "hero-banner", name: "Hero Banner", summary: "Hero image, headline, subtitle, CTA", status: "Published" },
  { id: "about", name: "About Conference", summary: "About copy and featured image", status: "Draft" },
  { id: "sessions", name: "Scientific Sessions", summary: "Sessions, tracks, speakers, and schedule", status: "Draft" },
  { id: "speakers", name: "Speakers & Board", summary: "Speaker, committee, and representative cards", status: "Draft" },
  { id: "registration", name: "Registration & CTAs", summary: "Registration buttons and submission links", status: "Published" },
  { id: "gallery", name: "Gallery & Reviews", summary: "Gallery images, testimonials, and reviews", status: "Draft" },
  { id: "footer", name: "Footer & Contact", summary: "Address, email, phone, social links, credits", status: "Published" },
];

type WebsiteSection = typeof defaultSections[number];

type Props = {
  eventId: string;
  eventTitle: string;
  onBack: () => void;
  onSaved?: (message: string) => void;
};

function storageKey(eventId: string) {
  return `velentra-site-config-${eventId || "global"}`;
}

function sectionKey(eventId: string) {
  return `velentra-site-sections-${eventId || "global"}`;
}

function initialValues(eventId: string) {
  try {
    const stored = sessionStorage.getItem(storageKey(eventId));
    return stored ? JSON.parse(stored) as Record<string, string> : {};
  } catch {
    return {};
  }
}

function initialSections(eventId: string): WebsiteSection[] {
  try {
    const stored = sessionStorage.getItem(sectionKey(eventId));
    return stored ? JSON.parse(stored) as WebsiteSection[] : defaultSections;
  } catch {
    return defaultSections;
  }
}

function fieldType(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("date")) return "date";
  if (normalized.includes("copy") || normalized.includes("description") || normalized.includes("links")) return "textarea";
  if (normalized.includes("color")) return "color";
  if (normalized.includes("url")) return "url";
  return "text";
}

export default function WebsiteEditor({ eventId, eventTitle, onBack, onSaved }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(eventId));
  const [sections, setSections] = useState<WebsiteSection[]>(() => initialSections(eventId));
  const [selectedSection, setSelectedSection] = useState(sections[0]?.id ?? "header-branding");
  const [newSectionName, setNewSectionName] = useState("");
  const selected = sections.find(section => section.id === selectedSection) ?? sections[0];

  const save = (event: FormEvent) => {
    event.preventDefault();
    try {
      sessionStorage.setItem(storageKey(eventId), JSON.stringify(values));
      sessionStorage.setItem(sectionKey(eventId), JSON.stringify(sections));
    } catch { /* Preview storage can be unavailable. */ }
    onSaved?.(`Website content and sections saved for ${eventTitle}.`);
  };

  const addSection = () => {
    const name = newSectionName.trim();
    if (!name) return;
    const section = { id: `section-${Date.now()}`, name, summary: "New website section ready for content", status: "Draft" };
    setSections(current => [...current, section]);
    setSelectedSection(section.id);
    setNewSectionName("");
  };

  const deleteSection = (section: WebsiteSection) => {
    if (!window.confirm(`Delete the ${section.name} section from this website preview?`)) return;
    setSections(current => current.filter(item => item.id !== section.id));
    if (selectedSection === section.id) setSelectedSection(sections.find(item => item.id !== section.id)?.id ?? "");
  };

  return <>
    <div className="employee-page-heading employee-editor-heading"><div><span className="employee-eyebrow"><span /> Website Configuration</span><h1>{eventTitle}</h1><p>Configure the event website section by section. Changes are available to both Admin and Employee preview access.</p></div><button className="employee-secondary-button" type="button" onClick={onBack}><X size={16} /> Close configuration</button></div>
    <form className="website-editor-split" onSubmit={save}>
      <section className="website-editor-controls">
        <div className="website-editor-panel-heading"><div><span className="employee-eyebrow"><span /> Content controls</span><h2>Website sections</h2></div><span className="employee-draft-chip">{sections.length} sections</span></div>
        <div className="website-section-list">{sections.map(section => <div className={`website-section-row ${selectedSection === section.id ? "website-section-row-active" : ""}`} key={section.id}><button type="button" className="website-section-select" onClick={() => setSelectedSection(section.id)}><span className="website-section-icon"><Pencil size={14} /></span><span><strong>{section.name}</strong><small>{section.summary}</small></span></button><span className="website-section-status">{section.status}</span><button className="employee-icon-action employee-icon-action-danger" type="button" aria-label={`Delete ${section.name}`} title="Delete section" onClick={() => deleteSection(section)}><Trash2 size={15} /></button></div>)}</div>
        <div className="website-add-section"><input value={newSectionName} onChange={event => setNewSectionName(event.target.value)} placeholder="New section name" /><button className="employee-secondary-button" type="button" onClick={addSection}><Plus size={15} /> Add section</button></div>
        {selected ? <div className="website-selected-section"><span className="employee-eyebrow"><span /> Editing section</span><strong>{selected.name}</strong><small>{selected.summary}</small></div> : null}
        <div className="website-editor-panel-heading website-content-heading"><div><span className="employee-eyebrow"><span /> Site content</span><h2>Content, media & publishing</h2></div></div>
        <div className="employee-form-grid website-editor-fields">{editorFields.map(field => <label key={field}><span>{field}</span>{fieldType(field) === "textarea" ? <textarea name={field} rows={3} value={values[field] ?? ""} onChange={event => setValues(current => ({ ...current, [field]: event.target.value }))} placeholder={`Add ${field.toLowerCase()}`} /> : <input name={field} type={fieldType(field)} value={values[field] ?? ""} onChange={event => setValues(current => ({ ...current, [field]: event.target.value }))} placeholder={`Add ${field.toLowerCase()}`} />}</label>)}</div>
        <div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={onBack}>Cancel</button><button className="employee-primary-button" type="submit"><Check size={16} /> Save Website</button></div>
      </section>
      <section className="website-editor-preview"><div className="website-editor-preview-heading"><div><span className="employee-eyebrow"><span /> Live website</span><h2>{selected?.name ?? "Website preview"}</h2><p>Previewing {eventTitle}</p></div><span className="website-preview-badge"><Eye size={14} /> Live preview</span></div><div className="website-editor-iframe-wrap"><iframe title={`${eventTitle} website editor preview`} src={`/event-site/index.html?event=${eventId}`} /></div></section>
    </form>
  </>;
}
