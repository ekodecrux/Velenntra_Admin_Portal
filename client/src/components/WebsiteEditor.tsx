import { ArrowDown, ArrowLeft, ArrowUp, Check, Code2, Copy, Eye, EyeOff, ImagePlus, Pencil, Plus, Trash2, Type, X } from "lucide-react";
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

const blockTypes = ["Text section", "Image block", "Gallery", "Call-to-action", "Speaker grid", "Registration form", "Custom HTML"];

type WebsiteSection = typeof defaultSections[number];
type SectionContent = { heading?: string; body?: string; imageUrl?: string; buttonLabel?: string; buttonUrl?: string; layout?: string };

type Props = {
  eventId: string;
  eventTitle: string;
  onBack: () => void;
  onHome?: () => void;
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

function initialSectionContent(eventId: string): Record<string, SectionContent> {
  try {
    const stored = sessionStorage.getItem(`velentra-section-content-${eventId || "global"}`);
    return stored ? JSON.parse(stored) as Record<string, SectionContent> : {};
  } catch {
    return {};
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

export default function WebsiteEditor({ eventId, eventTitle, onBack, onHome, onSaved }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(eventId));
  const [sections, setSections] = useState<WebsiteSection[]>(() => initialSections(eventId));
  const [sectionContent, setSectionContent] = useState<Record<string, SectionContent>>(() => initialSectionContent(eventId));
  const [selectedSection, setSelectedSection] = useState(sections[0]?.id ?? "header-branding");
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionType, setNewSectionType] = useState(blockTypes[0]);
  const selected = sections.find(section => section.id === selectedSection) ?? sections[0];
  const selectedContent = selected ? (sectionContent[selected.id] ?? {}) : {};

  const save = (event: FormEvent) => {
    event.preventDefault();
    try {
      sessionStorage.setItem(storageKey(eventId), JSON.stringify(values));
      sessionStorage.setItem(sectionKey(eventId), JSON.stringify(sections));
      sessionStorage.setItem(`velentra-section-content-${eventId || "global"}`, JSON.stringify(sectionContent));
    } catch { /* Preview storage can be unavailable. */ }
    onSaved?.(`Website content and sections saved for ${eventTitle}.`);
  };

  const addSection = () => {
    const name = newSectionName.trim();
    if (!name) return;
    const section = { id: `section-${Date.now()}`, name, summary: `${newSectionType} ready for content`, status: "Draft" };
    setSections(current => [...current, section]);
    setSectionContent(current => ({ ...current, [section.id]: { heading: name, layout: newSectionType } }));
    setSelectedSection(section.id);
    setNewSectionName("");
  };

  const addBlock = (type: string) => {
    const section = { id: `section-${Date.now()}`, name: type, summary: `${type} ready for content`, status: "Draft" };
    setSections(current => [...current, section]);
    setSectionContent(current => ({ ...current, [section.id]: { heading: type, layout: type } }));
    setSelectedSection(section.id);
  };

  const duplicateSection = (section: WebsiteSection) => {
    const copySection = { ...section, id: `section-${Date.now()}`, name: `${section.name} copy`, status: "Draft" };
    setSections(current => { const index = current.findIndex(item => item.id === section.id); return [...current.slice(0, index + 1), copySection, ...current.slice(index + 1)]; });
    setSectionContent(current => ({ ...current, [copySection.id]: { ...(current[section.id] ?? {}) } }));
    setSelectedSection(copySection.id);
  };

  const moveSection = (section: WebsiteSection, direction: -1 | 1) => {
    setSections(current => {
      const index = current.findIndex(item => item.id === section.id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const toggleSectionVisibility = (section: WebsiteSection) => {
    setSections(current => current.map(item => item.id === section.id ? { ...item, status: item.status === "Hidden" ? "Draft" : "Hidden" } : item));
  };

  const updateSectionContent = (key: keyof SectionContent, value: string) => {
    if (!selected) return;
    setSectionContent(current => ({ ...current, [selected.id]: { ...(current[selected.id] ?? {}), [key]: value } }));
  };

  const deleteSection = (section: WebsiteSection) => {
    if (!window.confirm(`Delete the ${section.name} section from this website preview?`)) return;
    setSections(current => current.filter(item => item.id !== section.id));
    if (selectedSection === section.id) setSelectedSection(sections.find(item => item.id !== section.id)?.id ?? "");
  };

  return <>
    <div className="employee-page-heading employee-editor-heading"><div><span className="employee-eyebrow"><span /> Website Configuration</span><h1>{eventTitle}</h1><p>Configure the event website section by section. Changes are available to both Admin and Employee preview access.</p></div><div className="website-editor-heading-actions">{onHome ? <button className="employee-secondary-button" type="button" onClick={onHome}><ArrowLeft size={16} /> Go to Home</button> : null}<button className="employee-secondary-button" type="button" onClick={onBack}><X size={16} /> Close configuration</button></div></div>
    <form className="website-editor-split" onSubmit={save}>
      <section className="website-editor-controls">
        <div className="website-editor-panel-heading"><div><span className="employee-eyebrow"><span /> WordPress-style content controls</span><h2>Website sections</h2></div><span className="employee-draft-chip">{sections.length} sections</span></div>
        <div className="website-block-toolbar"><strong>Add block</strong>{blockTypes.map(type => <button type="button" key={type} title={`Add ${type}`} onClick={() => addBlock(type)}>{type === "Text section" ? <Type size={14} /> : type === "Image block" || type === "Gallery" ? <ImagePlus size={14} /> : type === "Custom HTML" ? <Code2 size={14} /> : <Plus size={14} />}<span>{type}</span></button>)}</div>
        <div className="website-section-list">{sections.map((section, index) => <div className={`website-section-row ${selectedSection === section.id ? "website-section-row-active" : ""} ${section.status === "Hidden" ? "website-section-row-hidden" : ""}`} key={section.id}><button type="button" className="website-section-select" onClick={() => setSelectedSection(section.id)}><span className="website-section-icon"><Pencil size={14} /></span><span><strong>{section.name}</strong><small>{section.summary}</small></span></button><span className="website-section-status">{section.status}</span><div className="website-section-actions"><button className="employee-icon-action" type="button" aria-label={`Move ${section.name} up`} title="Move up" disabled={index === 0} onClick={() => moveSection(section, -1)}><ArrowUp size={14} /></button><button className="employee-icon-action" type="button" aria-label={`Move ${section.name} down`} title="Move down" disabled={index === sections.length - 1} onClick={() => moveSection(section, 1)}><ArrowDown size={14} /></button><button className="employee-icon-action" type="button" aria-label={`Duplicate ${section.name}`} title="Duplicate section" onClick={() => duplicateSection(section)}><Copy size={14} /></button><button className="employee-icon-action" type="button" aria-label={`${section.status === "Hidden" ? "Show" : "Hide"} ${section.name}`} title={section.status === "Hidden" ? "Show section" : "Hide section"} onClick={() => toggleSectionVisibility(section)}>{section.status === "Hidden" ? <Eye size={14} /> : <EyeOff size={14} />}</button><button className="employee-icon-action employee-icon-action-danger" type="button" aria-label={`Delete ${section.name}`} title="Delete section" onClick={() => deleteSection(section)}><Trash2 size={15} /></button></div></div>)}</div>
        <div className="website-add-section"><input value={newSectionName} onChange={event => setNewSectionName(event.target.value)} placeholder="New section name" /><select value={newSectionType} onChange={event => setNewSectionType(event.target.value)} aria-label="New section type">{blockTypes.map(type => <option key={type}>{type}</option>)}</select><button className="employee-secondary-button" type="button" onClick={addSection}><Plus size={15} /> Add section</button></div>
        {selected ? <div className="website-selected-section"><span className="employee-eyebrow"><span /> Editing section</span><strong>{selected.name}</strong><small>{selected.summary}</small></div> : null}
        {selected ? <div className="website-section-inspector"><div className="website-editor-panel-heading"><div><span className="employee-eyebrow"><span /> Section inspector</span><h2>Edit {selected.name}</h2></div><span className="employee-draft-chip">{selected.status}</span></div><div className="employee-form-grid"><label><span>Section heading</span><input value={selectedContent.heading ?? ""} onChange={event => updateSectionContent("heading", event.target.value)} placeholder="Add section heading" /></label><label><span>Layout / block type</span><select value={selectedContent.layout ?? "Text section"} onChange={event => updateSectionContent("layout", event.target.value)}>{blockTypes.map(type => <option key={type}>{type}</option>)}</select></label><label className="website-inspector-wide"><span>Section content</span><textarea rows={5} value={selectedContent.body ?? ""} onChange={event => updateSectionContent("body", event.target.value)} placeholder="Write the section content, supporting copy, or custom HTML" /></label><label><span>Image URL</span><input type="url" value={selectedContent.imageUrl ?? ""} onChange={event => updateSectionContent("imageUrl", event.target.value)} placeholder="https://..." /></label><label><span>Button label</span><input value={selectedContent.buttonLabel ?? ""} onChange={event => updateSectionContent("buttonLabel", event.target.value)} placeholder="Register now" /></label><label><span>Button URL</span><input type="url" value={selectedContent.buttonUrl ?? ""} onChange={event => updateSectionContent("buttonUrl", event.target.value)} placeholder="https://..." /></label></div></div> : null}
        <div className="website-editor-panel-heading website-content-heading"><div><span className="employee-eyebrow"><span /> Site content</span><h2>Content, media & publishing</h2></div></div>
        <div className="employee-form-grid website-editor-fields">{editorFields.map(field => <label key={field}><span>{field}</span>{fieldType(field) === "textarea" ? <textarea name={field} rows={3} value={values[field] ?? ""} onChange={event => setValues(current => ({ ...current, [field]: event.target.value }))} placeholder={`Add ${field.toLowerCase()}`} /> : <input name={field} type={fieldType(field)} value={values[field] ?? ""} onChange={event => setValues(current => ({ ...current, [field]: event.target.value }))} placeholder={`Add ${field.toLowerCase()}`} />}</label>)}</div>
        <div className="employee-form-actions"><button className="employee-secondary-button" type="button" onClick={onBack}>Cancel</button><button className="employee-primary-button" type="submit"><Check size={16} /> Save Website</button></div>
      </section>
      <section className="website-editor-preview"><div className="website-editor-preview-heading"><div><span className="employee-eyebrow"><span /> Live website</span><h2>{selected?.name ?? "Website preview"}</h2><p>Previewing {eventTitle}</p></div><span className="website-preview-badge"><Eye size={14} /> Live preview</span></div><div className="website-editor-iframe-wrap"><iframe title={`${eventTitle} website editor preview`} src={`/event-site/index.html?event=${eventId}`} /></div></section>
    </form>
  </>;
}
