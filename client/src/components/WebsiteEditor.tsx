import { ArrowLeft, Check, Edit3, Eye, ImagePlus, Plus, Trash2, Video, X } from "lucide-react";
import { useState, type FormEvent } from "react";

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
type SectionContent = { title?: string; body?: string; imageUrl?: string; videoUrl?: string; buttonLabel?: string; buttonUrl?: string; status?: string };

type Props = {
  eventId: string;
  eventTitle: string;
  onBack: () => void;
  onHome?: () => void;
  onSaved?: (message: string) => void;
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

export default function WebsiteEditor({ eventId, eventTitle, onBack, onHome, onSaved }: Props) {
  const [sections, setSections] = useState<WebsiteSection[]>(() => readStorage(sectionStorageKey(eventId), defaultSections));
  const [content, setContent] = useState<Record<string, SectionContent>>(() => readStorage(contentStorageKey(eventId), {}));
  const [selectedId, setSelectedId] = useState(sections[0]?.id ?? "logo");
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
    const nextContent: SectionContent = {
      title: String(values.get("title") || ""),
      body: String(values.get("body") || ""),
      imageUrl: String(values.get("imageUrl") || ""),
      videoUrl: String(values.get("videoUrl") || ""),
      buttonLabel: String(values.get("buttonLabel") || ""),
      buttonUrl: String(values.get("buttonUrl") || ""),
      status: String(values.get("status") || "Draft"),
    };
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

  return <>
    <div className="employee-page-heading employee-editor-heading">
      <div><span className="employee-eyebrow"><span /> Website Configuration</span><h1>{eventTitle}</h1><p>Edit website sections from the menu and preview the complete website on the right.</p></div>
      <div className="website-editor-heading-actions">{onHome ? <button className="employee-secondary-button" type="button" onClick={onHome}><ArrowLeft size={16} /> Go to Home</button> : null}<button className="employee-secondary-button" type="button" onClick={onBack}><X size={16} /> Back</button></div>
    </div>

    <div className="website-config-workspace">
      <aside className="website-config-menu">
        <div className="website-config-menu-heading"><span className="employee-eyebrow"><span /> Website sections</span><strong>Content menu</strong><small>Select a section to edit its details.</small></div>
        <div className="website-config-section-list">{sections.map(section => <div className={`website-config-section-row ${selectedId === section.id ? "website-config-section-row-active" : ""}`} key={section.id}><button type="button" className="website-config-section-select" onClick={() => setSelectedId(section.id)}><span><strong>{section.name}</strong><small>{section.summary}</small></span><em>{section.status}</em></button><button className="website-config-edit-button" type="button" title={`Edit ${section.name}`} aria-label={`Edit ${section.name}`} onClick={() => openEditor(section)}><Edit3 size={15} /></button><button className="website-config-delete-button" type="button" title={`Delete ${section.name}`} aria-label={`Delete ${section.name}`} onClick={() => deleteSection(section)}><Trash2 size={14} /></button></div>)}</div>
        <div className="website-config-add"><strong>Add website section</strong><select value={newSectionType} onChange={event => setNewSectionType(event.target.value)}><option>Video Testimonials</option><option>Testimonials</option><option>New Page</option><option>Image Gallery</option><option>Speaker Section</option><option>Custom Content</option></select><button className="employee-primary-button" type="button" onClick={addSection}><Plus size={15} /> Add section</button></div>
      </aside>

      <section className="website-config-preview">
        <div className="website-config-preview-heading"><div><span className="employee-eyebrow"><span /> Full website preview</span><h2>{selected?.name ?? "Website"}</h2><p>Click a section on the left, then use Edit to update its content.</p></div><span className="website-preview-badge"><Eye size={14} /> Live website</span></div>
        <div className="website-config-preview-actions"><span>Previewing the complete website</span><button className="employee-secondary-button" type="button" onClick={() => selected && openEditor(selected)}><Edit3 size={15} /> Edit {selected?.name ?? "section"}</button></div>
        <div className="website-config-iframe-wrap"><iframe title={`${eventTitle} full website preview`} src={`/event-site/index.html?event=${eventId}`} /></div>
      </section>
    </div>

    {editingSection ? <div className="website-edit-modal-backdrop" role="presentation"><form className="website-edit-modal" onSubmit={saveSection}><div className="website-edit-modal-header"><div><span className="employee-eyebrow"><span /> Edit website section</span><h2>{editingSection.name}</h2><p>Update the details shown in this website section.</p></div><button type="button" className="employee-icon-action" aria-label="Close editor" onClick={() => setEditingSection(null)}><X size={18} /></button></div><div className="website-edit-modal-fields"><label><span>Section title</span><input name="title" defaultValue={selectedContent.title ?? editingSection.name} placeholder="Add section title" autoFocus /></label><label><span>Section status</span><select name="status" defaultValue={selectedContent.status ?? editingSection.status}><option>Draft</option><option>Published</option><option>Hidden</option></select></label><label className="website-edit-modal-wide"><span>Content and description</span><textarea name="body" rows={6} defaultValue={selectedContent.body ?? ""} placeholder="Write the content for this section" /></label><label><span>Image or logo URL</span><input name="imageUrl" type="url" defaultValue={selectedContent.imageUrl ?? ""} placeholder="https://..." /></label>{editingSection.id === "video-testimonials" || editingSection.name.toLowerCase().includes("video") ? <label><span>Video URL</span><input name="videoUrl" type="url" defaultValue={selectedContent.videoUrl ?? ""} placeholder="https://youtube.com/..." /></label> : null}<label><span>Button label</span><input name="buttonLabel" defaultValue={selectedContent.buttonLabel ?? ""} placeholder="Register now" /></label><label><span>Button URL</span><input name="buttonUrl" type="url" defaultValue={selectedContent.buttonUrl ?? ""} placeholder="https://..." /></label></div><div className="website-edit-modal-actions"><button type="button" className="employee-secondary-button" onClick={() => setEditingSection(null)}>Cancel</button><button type="submit" className="employee-primary-button"><Check size={16} /> Save section</button></div></form></div> : null}
  </>;
}
