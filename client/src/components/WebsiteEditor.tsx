import { Check, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type SyntheticEvent } from "react";

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

type PopupField = { name: string; label: string; type?: "text" | "url" | "date" | "color"; placeholder?: string; wide?: boolean };

function basePopupFields(section: WebsiteSection): PopupField[] {
  switch (section.id) {
    case "logo": return [{ name: "brandName", label: "Brand name", placeholder: "Velentra" }, { name: "logoUrl", label: "Logo URL", type: "url", placeholder: "https://..." }, { name: "faviconUrl", label: "Favicon URL", type: "url", placeholder: "https://..." }, { name: "logoAlt", label: "Logo alt text", placeholder: "Company logo" }];
    case "header": return [{ name: "logoUrl", label: "Logo image", type: "url", placeholder: "/event-site/assets-front/images/logo.png" }, { name: "leftContent", label: "Left header content", placeholder: "Conference title and headline", wide: true }, { name: "rightContent", label: "Right header content", placeholder: "Address, phone, email", wide: true }, { name: "topText", label: "Top header text", placeholder: "Hybrid event announcement", wide: true }, { name: "topTextColor", label: "Top header text color", type: "color" }, { name: "title", label: "Event title", placeholder: "Conference title" }, { name: "startDate", label: "Start date", type: "date" }, { name: "endDate", label: "End date", type: "date" }, { name: "venue", label: "Venue", placeholder: "Event venue" }, { name: "backgroundColor", label: "Header background color", type: "color" }, { name: "bottomBarColor", label: "Bottom date bar color", type: "color" }, { name: "navigation", label: "Navigation links", placeholder: "Home, About, Program, Contact", wide: true }];
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

function popupFields(section: WebsiteSection): PopupField[] {
  return [...basePopupFields(section),
    { name: "fontFamily", label: "Font family", placeholder: "Open Sans, Arial, sans-serif" },
    { name: "fontSize", label: "Font size", placeholder: "16px" },
    { name: "fontColor", label: "Text color", type: "color" },
    { name: "fontWeight", label: "Font weight", placeholder: "400 / 600 / 700" },
    { name: "sectionBackgroundColor", label: "Background color", type: "color" },
    { name: "spacing", label: "Spacing and padding", placeholder: "16px 24px" },
  ];
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

const defaultContent: Record<string, SectionContent> = {
  header: { logoUrl: "/event-site/uploads/logo/4th-edition-of-global-conference-on-biofuels-and-bioenergy-1801.png", leftContent: "4th Edition of Global Conference on Biofuels and Bioenergy", rightContent: "Olympia Hotel, Events & Spa\nCarrer Mestre Serrano, 5, 46120 Alboraia, Valencia, Spain\nPhone: +1 (702) 988-2320\nEmail: biofuels@magnusconference.com", topText: "HYBRID EVENT: Join us in person in Valencia, Spain or attend virtually from anywhere.", topTextColor: "#9b2132", title: "Biofuels and Bioenergy", startDate: "2027-09-09", endDate: "2027-09-11", venue: "Valencia, Spain", backgroundColor: "#ae052c", bottomBarColor: "#74132c", navigation: "Home, Scientific Committee, Speakers, Program, Information, About, Contact, Register" },
};

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
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [newSectionType, setNewSectionType] = useState("Video Testimonials");
  const selected = sections.find(section => section.id === selectedId) ?? sections[0];

  useEffect(() => {
    const handleExternalSectionField = (event: Event) => {
      const detail = (event as CustomEvent<{ sectionId: string; field?: string; existingText?: string }>).detail;
      const section = sections.find(item => item.id === detail.sectionId);
      if (!section) return;
      setSelectedId(section.id);
      const fieldName = popupFields(section).find(field => field.label === detail.field)?.name ?? null;
      setFocusedField(fieldName);
      if (fieldName && detail.existingText) setContent(current => { const next: SectionContent = { ...(current[section.id] ?? {}), [fieldName]: detail.existingText as string }; return { ...current, [section.id]: next }; });
      setEditingSection(section);
    };
    window.addEventListener("velentra:edit-section-field", handleExternalSectionField);
    return () => window.removeEventListener("velentra:edit-section-field", handleExternalSectionField);
  }, [sections]);

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
    setFocusedField(null);
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

  const selectedContent = selected ? { ...(defaultContent[selected.id] ?? {}), ...(content[selected.id] ?? {}) } : {};

  const handlePreviewLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    const document = event.currentTarget.contentDocument;
    if (!document) return;
    const overlayStyle = document.createElement("style");
    overlayStyle.id = "manus-editor-overlays";
    overlayStyle.textContent = `.manus-editor-target{position:relative!important;outline:2px dashed #2f87a3!important;outline-offset:3px!important;cursor:pointer!important}.manus-inline-edit{position:absolute!important;right:8px!important;top:8px!important;z-index:99999!important;width:30px!important;height:30px!important;border:1px solid #2f87a3!important;border-radius:7px!important;background:#fff!important;color:#145d75!important;box-shadow:0 3px 10px rgba(22,61,75,.22)!important;font:700 16px/1 Arial!important;cursor:pointer!important}.manus-inline-edit:hover{background:#e9f7fb!important;transform:scale(1.05)!important}`;
    document.getElementById("manus-editor-overlays")?.remove();
    document.head.appendChild(overlayStyle);
    const addFrame = (targetElement: HTMLElement, sectionId: string, field: string) => {
      const frameElement = targetElement.tagName === "IMG" ? (targetElement.parentElement ?? targetElement) : targetElement;
      if (frameElement.dataset.manusEditorTarget) return;
      frameElement.dataset.manusEditorTarget = sectionId;
      frameElement.classList.add("manus-editor-target");
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "manus-inline-edit";
      editButton.title = `Edit ${field}`;
      editButton.setAttribute("aria-label", `Edit ${field}`);
      editButton.textContent = "✎";
      editButton.addEventListener("click", clickEvent => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        const existingText = targetElement.tagName === "IMG" ? (targetElement as HTMLImageElement).src : (targetElement as HTMLInputElement).value || targetElement.textContent?.trim() || "";
        window.parent.dispatchEvent(new CustomEvent("velentra:edit-section-field", { detail: { sectionId, field, existingText } }));
      });
      frameElement.appendChild(editButton);
    };
    const mark = (selector: string, sectionId: string, field: string) => document.querySelectorAll<HTMLElement>(selector).forEach(targetElement => addFrame(targetElement, sectionId, field));
    mark(".hybrid-text", "header", "Top header text");
    mark(".top-header .top-logo", "header", "Logo image");
    mark(".top-header h1", "header", "Left header content");
    mark(".top-header .top-add-text-1, .top-header .top-add-text-2", "header", "Right header content");
    mark(".top-header h4, .top-header .c-date", "header", "Venue");
    mark("#mainMenu", "header", "Navigation links");
    mark("#about, [id*='about'], [class*='about']", "about", "About content");
    mark("[id*='speaker'], [class*='speaker']", "speakers", "Speaker profiles");
    mark("[id*='testimonial'], [class*='testimonial']", "testimonials", "Testimonials");
    mark("[id*='gallery'], [class*='gallery']", "gallery", "Gallery images");
    mark("footer", "footer", "Footer content");
    const genericTargets = document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,a,button,span,img,input,textarea,select");
    genericTargets.forEach(targetElement => {
      if (!targetElement.textContent?.trim() && !["IMG", "INPUT", "TEXTAREA", "SELECT"].includes(targetElement.tagName)) return;
      if (targetElement.closest(".manus-inline-edit") || targetElement.classList.contains("sr-only")) return;
      const area = targetElement.closest(".top-header,.hybrid-text,#mainMenu,footer,[id*='about'],[class*='about'],[id*='speaker'],[class*='speaker'],[id*='testimonial'],[class*='testimonial'],[id*='gallery'],[class*='gallery']");
      const areaText = `${area?.className ?? ""} ${area?.id ?? ""}`.toLowerCase();
      const sectionId = area?.closest("footer") ? "footer" : areaText.includes("testimonial") ? "testimonials" : areaText.includes("speaker") ? "speakers" : areaText.includes("gallery") ? "gallery" : areaText.includes("about") ? "about" : areaText.includes("top-header") || areaText.includes("hybrid") || areaText.includes("mainmenu") ? "header" : "pages";
      const field = sectionId === "header" ? (targetElement.tagName === "IMG" ? "Logo image" : targetElement.closest("nav,#mainMenu") ? "Navigation links" : targetElement.closest(".top-add-text-1,.top-add-text-2") ? "Right header content" : targetElement.closest(".hybrid-text") ? "Top header text" : "Left header content") : sectionId === "footer" ? "Footer content" : sectionId === "speakers" ? "Speaker profiles" : sectionId === "testimonials" ? "Testimonials" : sectionId === "gallery" ? "Gallery images" : sectionId === "about" ? "About content" : "Page content";
      addFrame(targetElement, sectionId, field);
    });
    document.addEventListener("click", clickEvent => {
      const target = clickEvent.target instanceof HTMLElement ? clickEvent.target : null;
      const element = target?.closest("a,button,header,nav,footer,section,article,div") as HTMLElement | null;
      const text = `${element?.innerText ?? ""} ${target?.getAttribute("href") ?? ""}`.toLowerCase();
      const headerArea = element?.closest(".top-header, .hybrid-text, #mainMenu");
      const navigationArea = element?.closest("nav, #mainMenu");
      const sectionId = text.includes("testimonial") || text.includes("review") ? (text.includes("video") || text.includes("youtube") ? "video-testimonials" : "testimonials") : text.includes("speaker") || text.includes("committee") ? "speakers" : text.includes("contact") || element?.closest("footer") ? "footer" : text.includes("gallery") || text.includes("media") ? "gallery" : navigationArea || headerArea ? "header" : target?.tagName === "IMG" ? "logo" : text.includes("register") || text.includes("abstract") ? "hero" : "pages";
      setSelectedId(sectionId);
      onSectionSelected?.(sectionId);
    });
  };

  return <>
    <section className="website-config-full-preview"><div className="website-config-iframe-wrap"><iframe title={`${eventTitle} complete website`} src={`/event-site/index.html?event=${eventId}`} onLoad={handlePreviewLoad} /></div></section>

    {editingSection ? <div className="website-edit-modal-backdrop" role="presentation"><form className="website-edit-modal" onSubmit={saveSection}><div className="website-edit-modal-header"><div><span className="employee-eyebrow"><span /> Edit website section</span><h2>{editingSection.name}</h2><p>Update the real content fields for this section.</p></div><button type="button" className="employee-icon-action" aria-label="Close editor" onClick={() => { setEditingSection(null); setFocusedField(null); }}><X size={18} /></button></div><div className="website-edit-modal-fields">{popupFields(editingSection).map(field => <label className={field.wide ? "website-edit-modal-wide" : ""} key={field.name}><span>{field.label}</span>{field.name === "body" || field.name === "quote" || field.name === "navigation" || field.name === "imageUrls" || field.name === "captions" || field.name === "socialLinks" || field.name === "seoDescription" ? <textarea name={field.name} rows={4} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} /> : <input name={field.name} type={field.type ?? "text"} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} autoFocus={focusedField === field.name} />}</label>)}<label><span>Section status</span><select name="status" defaultValue={selectedContent.status ?? editingSection.status}><option>Draft</option><option>Published</option><option>Hidden</option></select></label></div><div className="website-edit-modal-actions"><button type="button" className="employee-secondary-button" onClick={() => { setEditingSection(null); setFocusedField(null); }}>Cancel</button><button type="submit" className="employee-primary-button"><Check size={16} /> Save section</button></div></form></div> : null}
  </>;
}
