import { ArrowLeft, Check, X } from "lucide-react";
import { useEffect, useState, type FormEvent, type SyntheticEvent } from "react";

const defaultSections = [
  { id: "logo", name: "Logo & Branding", summary: "Logo, favicon, brand name", status: "Published" },
  { id: "header", name: "Header", summary: "Navigation, event title, dates", status: "Published" },
  { id: "conference-sessions", name: "Conference Sessions", summary: "Sessions, rooms, times, and speakers", status: "Published" },
  { id: "buttons-list", name: "Buttons List", summary: "Website CTA buttons and links", status: "Published" },
  { id: "announcements", name: "Announcements", summary: "Top announcements and alerts", status: "Published" },
  { id: "pages", name: "Pages", summary: "Home, about, program, contact pages", status: "Published" },
  { id: "home-tabs", name: "Home Tabs", summary: "Homepage tabs and featured content", status: "Published" },
  { id: "header-section", name: "Header Section", summary: "Top header, dates, venue, and about image", status: "Published" },
  { id: "footer-section", name: "Footer Section", summary: "Address, contact, theme, and social links", status: "Published" },
  { id: "theme-settings", name: "Theme Settings", summary: "Theme colors, conference logo, and banner", status: "Published" },
  { id: "conference-credits", name: "Conference Credits", summary: "Credit name, details, and badge", status: "Published" },
  { id: "hero", name: "Hero Banner", summary: "Headline, banner image, CTA", status: "Published" },
  { id: "about", name: "About Conference", summary: "Conference introduction and details", status: "Draft" },
  { id: "scientific-sessions", name: "Scientific Sessions", summary: "Scientific session titles and descriptions", status: "Published" },
  { id: "past-conference", name: "Past Conference", summary: "Previous conference reports and media", status: "Published" },
  { id: "media-partner", name: "Media Partner", summary: "Partner names, links, and logos", status: "Published" },
  { id: "conference-schedule", name: "Conference Schedule", summary: "Days, dates, times, and sessions", status: "Published" },
  { id: "speakers", name: "Speakers & Committee", summary: "Speaker and committee profiles", status: "Draft" },
  { id: "testimonials", name: "Testimonials", summary: "Written testimonials and reviews", status: "Draft" },
  { id: "video-testimonials", name: "Video Testimonials", summary: "Video reviews and embeds", status: "Draft" },
  { id: "gallery", name: "Gallery & Media", summary: "Gallery images and media partners", status: "Draft" },
  { id: "social-media", name: "Social Media Links", summary: "Social network links and labels", status: "Published" },
  { id: "footer", name: "Footer & Contact", summary: "Address, contact, social links", status: "Published" },
];

type WebsiteSection = typeof defaultSections[number];
type SectionContent = Record<string, string> & { status?: string };

type PopupField = { name: string; label: string; type?: "text" | "url" | "date" | "time" | "color" | "file" | "select"; options?: string[]; placeholder?: string; wide?: boolean };

function basePopupFields(section: WebsiteSection): PopupField[] {
  switch (section.id) {
    case "logo": return [{ name: "brandName", label: "Brand name", placeholder: "Velentra" }, { name: "logoUrl", label: "Logo URL", type: "url", placeholder: "https://..." }, { name: "logoUpload", label: "Upload logo from device", type: "file" }, { name: "faviconUrl", label: "Favicon URL", type: "url", placeholder: "https://..." }, { name: "logoAlt", label: "Logo alt text", placeholder: "Company logo" }];
    case "header": return [{ name: "logoUrl", label: "Logo image", type: "url", placeholder: "/event-site/assets-front/images/logo.png" }, { name: "logoUpload", label: "Upload logo from device", type: "file" }, { name: "leftContent", label: "Left header content", placeholder: "Conference title and headline", wide: true }, { name: "rightContent", label: "Right header content", placeholder: "Address, phone, email", wide: true }, { name: "topText", label: "Top header text", placeholder: "Hybrid event announcement", wide: true }, { name: "topTextColor", label: "Top header text color", type: "color" }, { name: "title", label: "Event title", placeholder: "Conference title" }, { name: "startDate", label: "Start date", type: "date" }, { name: "endDate", label: "End date", type: "date" }, { name: "venue", label: "Venue", placeholder: "Event venue" }, { name: "backgroundColor", label: "Header background color", type: "color" }, { name: "bottomBarColor", label: "Bottom date bar color", type: "color" }, { name: "navigation", label: "Navigation links", placeholder: "Home, About, Program, Contact", wide: true }];
    case "conference-sessions": return [{ name: "sessionTitle", label: "Session title", placeholder: "Keynote Session I" }, { name: "sessionDate", label: "Session date", type: "date" }, { name: "startTime", label: "Start time", type: "time" }, { name: "endTime", label: "End time", type: "time" }, { name: "room", label: "Room / venue", placeholder: "Main Hall" }, { name: "speakers", label: "Speakers", placeholder: "Speaker names", wide: true }, { name: "status", label: "Status", type: "select", options: ["Active", "Draft", "Hidden"] }];
    case "buttons-list": return [{ name: "buttonLabel", label: "Button label", placeholder: "Submit Abstract" }, { name: "buttonUrl", label: "Button URL", type: "url", placeholder: "https://..." }, { name: "buttonStyle", label: "Button style", placeholder: "Primary / outline" }, { name: "buttonColor", label: "Button color", type: "color" }, { name: "buttonStatus", label: "Status", placeholder: "Active" }];
    case "announcements": return [{ name: "announcementOne", label: "Announcement 1", placeholder: "Initial announcement", wide: true }, { name: "announcementTwo", label: "Announcement 2", placeholder: "Submission deadline announcement", wide: true }, { name: "announcementThree", label: "Announcement 3", placeholder: "Early bird announcement", wide: true }, { name: "textColor", label: "Announcement text color", type: "color" }, { name: "backgroundColor", label: "Announcement background color", type: "color" }, { name: "rotationSeconds", label: "Rotation interval (seconds)", placeholder: "5" }];
    case "pages": return [{ name: "pageTitle", label: "Page title", placeholder: "About the conference" }, { name: "slug", label: "Page URL slug", placeholder: "about-conference" }, { name: "body", label: "Page content", placeholder: "Write the page content...", wide: true }, { name: "pageImageUrl", label: "Page image URL", type: "url", placeholder: "https://..." }, { name: "pageImageUpload", label: "Upload page image", type: "file" }];
    case "home-tabs": return [{ name: "tabOneTitle", label: "Tab 1 title", placeholder: "About Conference" }, { name: "tabOneContent", label: "Tab 1 content", placeholder: "Homepage tab content", wide: true }, { name: "tabTwoTitle", label: "Tab 2 title", placeholder: "Why Attend" }, { name: "tabTwoContent", label: "Tab 2 content", placeholder: "Homepage tab content", wide: true }, { name: "tabImageUrl", label: "Tab image URL", type: "url", placeholder: "https://..." }, { name: "tabImageUpload", label: "Upload tab image", type: "file" }];
    case "header-section": return [{ name: "topHeader", label: "Top Header", placeholder: "European", wide: true }, { name: "heading", label: "Heading", placeholder: "Otolaryngology-ENT Surgery Conference", wide: true }, { name: "startDate", label: "Start Date", type: "date" }, { name: "endDate", label: "End Date", type: "date" }, { name: "venue", label: "Venue", placeholder: "Rome, Italy" }, { name: "hotel", label: "Hotel", placeholder: "Conference hotel" }, { name: "address", label: "Address", placeholder: "Conference address", wide: true }, { name: "aboutImageUpload", label: "Upload About Conference Image", type: "file" }];
    case "footer-section": return [{ name: "footerAddress", label: "Address", placeholder: "Conference address", wide: true }, { name: "email1", label: "For Program Enquiry" }, { name: "email2", label: "General Queries" }, { name: "email3", label: "Sponsors/Exhibitions" }, { name: "phone", label: "Phone Number" }, { name: "whatsapp", label: "Whatsapp Number" }, { name: "websiteUrl", label: "Website Link", type: "url" }, { name: "confShortname", label: "Conference Short Name" }, { name: "theme", label: "Conference Theme", wide: true }, { name: "facebook", label: "Facebook Link", type: "url" }, { name: "twitter", label: "Twitter Link", type: "url" }, { name: "youtube", label: "Youtube Link", type: "url" }, { name: "linkedin", label: "LinkedIn Link", type: "url" }, { name: "instagram", label: "Instagram Link", type: "url" }, { name: "blog", label: "Blog", type: "url" }];
    case "theme-settings": return [{ name: "themeColor", label: "Theme Color", type: "color" }, { name: "accentColor", label: "Accent Color", type: "color" }, { name: "conferenceLogoUpload", label: "Conference Logo", type: "file" }, { name: "conferenceLogoAlt", label: "Conference Logo Alt Text" }, { name: "conferenceLogoTitle", label: "Conference Logo Title" }, { name: "themeBannerUpload", label: "Upload Theme Banner", type: "file" }];
    case "conference-credits": return [{ name: "creditName", label: "Credit Name" }, { name: "creditDetails", label: "Details", wide: true }, { name: "creditBadgeUpload", label: "Credit Badge", type: "file" }];
    case "hero": return [{ name: "title", label: "Hero headline", placeholder: "Join us for the conference" }, { name: "subtitle", label: "Hero subtitle", placeholder: "Supporting headline", wide: true }, { name: "imageUrl", label: "Banner image URL", type: "url", placeholder: "https://..." }, { name: "bannerUpload", label: "Upload banner from device", type: "file" }, { name: "buttonLabel", label: "Button label", placeholder: "Register now" }, { name: "buttonUrl", label: "Button URL", type: "url", placeholder: "https://..." }];
    case "about": return [{ name: "title", label: "About heading", placeholder: "About the conference" }, { name: "imageUrl", label: "Feature image URL", type: "url", placeholder: "https://..." }, { name: "imageUpload", label: "Upload feature image", type: "file" }, { name: "body", label: "About content", placeholder: "Write the conference introduction...", wide: true }];
    case "scientific-sessions": return [{ name: "title", label: "Scientific sessions heading", placeholder: "Scientific Sessions" }, { name: "intro", label: "Sessions introduction", placeholder: "Describe the scientific program", wide: true }, { name: "sessionTopics", label: "Session topics", placeholder: "Bioethanol, Biodiesel, Biogas, Biorefineries", wide: true }, { name: "buttonLabel", label: "View sessions button label", placeholder: "View All Scientific Sessions" }, { name: "buttonUrl", label: "Sessions button URL", type: "url", placeholder: "/program/scientific-sessions" }];
    case "past-conference": return [{ name: "title", label: "Past conference heading", placeholder: "Past Conference Information" }, { name: "conferenceYear", label: "Conference year", placeholder: "Biofuels 2026" }, { name: "body", label: "Conference report", placeholder: "Past conference report and highlights", wide: true }, { name: "imageUrl", label: "Feature image URL", type: "url", placeholder: "https://..." }, { name: "imageUpload", label: "Upload conference image", type: "file" }, { name: "programUrl", label: "Final program URL", type: "url", placeholder: "https://..." }, { name: "galleryUrl", label: "Past gallery URL", type: "url", placeholder: "https://..." }];
    case "media-partner": return [{ name: "title", label: "Media partner heading", placeholder: "Media Partner" }, { name: "partnerName", label: "Partner name", placeholder: "Conference Alerts" }, { name: "partnerUrl", label: "Partner website URL", type: "url", placeholder: "https://..." }, { name: "partnerLogoUrl", label: "Partner logo URL", type: "url", placeholder: "https://..." }, { name: "partnerLogoUpload", label: "Upload partner logo", type: "file" }];
    case "conference-schedule": return [{ name: "title", label: "Schedule heading", placeholder: "Conference Schedule" }, { name: "dayOne", label: "Day 1 label and date", placeholder: "Day-01 — September 09, 2027" }, { name: "dayTwo", label: "Day 2 label and date", placeholder: "Day-02 — September 10, 2027" }, { name: "dayThree", label: "Day 3 label and date", placeholder: "Day-03 — September 11, 2027" }, { name: "scheduleRows", label: "Schedule rows", placeholder: "08:00-09:00 | Registration\n09:00-09:30 | Opening Ceremony", wide: true }];
    case "speakers": return [{ name: "title", label: "Section heading", placeholder: "Meet our speakers" }, { name: "body", label: "Section description", placeholder: "Introduce the speaker and committee area", wide: true }, { name: "imageUrl", label: "Speaker image URL", type: "url", placeholder: "https://..." }, { name: "imageUpload", label: "Upload speaker image", type: "file" }];
    case "testimonials": return [{ name: "name", label: "Name", placeholder: "Testimonial author name" }, { name: "imageUrl", label: "Image URL", type: "url", placeholder: "https://..." }, { name: "imageUpload", label: "Image", type: "file" }, { name: "designation", label: "Designation", placeholder: "Speaker / Delegate / Researcher" }, { name: "comment", label: "Comment", placeholder: "Write the testimonial comment...", wide: true }];
    case "video-testimonials": return [{ name: "title", label: "Video title", placeholder: "Why attendees return" }, { name: "videoUrl", label: "Video URL", type: "url", placeholder: "https://youtube.com/...", wide: true }, { name: "imageUrl", label: "Poster image URL", type: "url", placeholder: "https://..." }, { name: "imageUpload", label: "Upload poster image", type: "file" }, { name: "body", label: "Video description", placeholder: "Describe this video testimonial", wide: true }];
    case "gallery": return [{ name: "title", label: "Gallery heading", placeholder: "Conference moments" }, { name: "imageUrls", label: "Image URLs", type: "url", placeholder: "https://...", wide: true }, { name: "galleryUpload", label: "Upload gallery images", type: "file" }, { name: "captions", label: "Image captions", placeholder: "Caption for each image", wide: true }];
    case "footer": return [{ name: "address", label: "Address", placeholder: "Conference address", wide: true }, { name: "email", label: "Contact email", placeholder: "hello@example.com" }, { name: "phone", label: "Phone number", placeholder: "+1 000 000 0000" }, { name: "socialLinks", label: "Social links", placeholder: "Facebook, LinkedIn, Instagram", wide: true }, { name: "body", label: "Footer content", placeholder: "Footer credits and supporting text", wide: true }];
    case "social-media": return [{ name: "facebookUrl", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." }, { name: "twitterUrl", label: "X / Twitter URL", type: "url", placeholder: "https://x.com/..." }, { name: "youtubeUrl", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/..." }, { name: "blogUrl", label: "Blog URL", type: "url", placeholder: "https://..." }, { name: "linkLabels", label: "Link labels", placeholder: "Facebook, X, YouTube, Blog" }];
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

function scopedPopupFields(section: WebsiteSection, targetField: string | null): PopupField[] {
  if (section.id === "header" && targetField === "Logo image") return [
    { name: "logoUrl", label: "Logo image URL", type: "url", placeholder: "/event-site/uploads/logo/current-logo.png" },
    { name: "logoUpload", label: "Upload replacement logo", type: "file" },
    { name: "logoAlt", label: "Logo alt text", placeholder: "Conference logo" },
  ];
  if (section.id === "header" && targetField === "Left header content") return [
    { name: "leftContent", label: "Selected text", placeholder: "Existing header text", wide: true },
    { name: "fontFamily", label: "Font family", placeholder: "Open Sans, Arial, sans-serif" },
    { name: "fontSize", label: "Font size", placeholder: "16px" },
    { name: "fontColor", label: "Text color", type: "color" },
    { name: "fontWeight", label: "Font weight", placeholder: "400 / 600 / 700" },
    { name: "sectionBackgroundColor", label: "Background color", type: "color" },
    { name: "spacing", label: "Spacing and padding", placeholder: "16px 24px" },
  ];
  if (section.id === "header" && targetField === "Right header content") return [
    { name: "rightContent", label: "Selected text", placeholder: "Existing contact content", wide: true },
    { name: "fontFamily", label: "Font family", placeholder: "Open Sans, Arial, sans-serif" },
    { name: "fontSize", label: "Font size", placeholder: "16px" },
    { name: "fontColor", label: "Text color", type: "color" },
    { name: "fontWeight", label: "Font weight", placeholder: "400 / 600 / 700" },
    { name: "sectionBackgroundColor", label: "Background color", type: "color" },
    { name: "spacing", label: "Spacing and padding", placeholder: "16px 24px" },
  ];
  if (section.id === "header" && targetField === "Top header text") return [
    { name: "topText", label: "Selected text", placeholder: "Existing announcement", wide: true },
    { name: "fontFamily", label: "Font family", placeholder: "Open Sans, Arial, sans-serif" },
    { name: "fontSize", label: "Font size", placeholder: "16px" },
    { name: "fontColor", label: "Text color", type: "color" },
    { name: "fontWeight", label: "Font weight", placeholder: "400 / 600 / 700" },
    { name: "sectionBackgroundColor", label: "Background color", type: "color" },
    { name: "spacing", label: "Spacing and padding", placeholder: "16px 24px" },
  ];
  return popupFields(section);
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
	announcements: { announcementOne: "Initial Announcement", announcementTwo: "First Round of Abstract Submission Closes on November 16, 2026", announcementThree: "Early Bird Registration Closes on November 17, 2026", textColor: "#9b2132", backgroundColor: "#eef0f7", rotationSeconds: "5" },
	"conference-sessions": { sessionTitle: "Keynote Session I", sessionDate: "2027-09-09", startTime: "09:30", endTime: "10:30", room: "Main Hall", speakers: "Invited keynote speakers" },
	"buttons-list": { buttonLabel: "Submit Abstract", buttonUrl: "/event-site/submit-abstract", buttonStyle: "Primary", buttonColor: "#ae052c", buttonStatus: "Active" },
	logo: { brandName: "VELENTRA", logoUrl: "/event-site/uploads/logo/4th-edition-of-global-conference-on-biofuels-and-bioenergy-1801.png", logoAlt: "Biofuels and Bioenergy conference logo", faviconUrl: "/event-site/assets-front/images/favicon.png" },
	pages: { pageTitle: "Home", slug: "/", body: "4th Edition of Global Conference on Biofuels and Bioenergy — September 09-11, 2027 | Valencia, Spain", pageImageUrl: "/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg" },
	"home-tabs": { tabOneTitle: "About Conference", tabOneContent: "Join researchers and industry professionals for three days of scientific exchange.", tabTwoTitle: "Why Attend", tabTwoContent: "Discover new collaborations, keynote insights, and practical bioenergy innovations.", tabImageUrl: "/event-site/uploads/gallery/biofuels-2025-valencia-spain.jpg" },
  "header-section": { topHeader: "European", heading: "Otolaryngology-ENT Surgery Conference", startDate: "2027-09-06", endDate: "2027-09-07", venue: "Rome, Italy", hotel: "Occidental Aran Park", address: "Via Riccardo Forster, 24, 00143 Roma RM, Italy", aboutImageUrl: "/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg" },
  "footer-section": { footerAddress: "Inovine Meetings LLC <br/> Pecan Hill Drive Clinton, Mississippi, 39056 USA", email1: "ent@inovineconferences.com", email2: "ent@inovineconferences.com", email3: "ent@inovineconferences.com", phone: "+1-662-601-8380", whatsapp: "+1-662-601-8380", websiteUrl: "https://ent.inovineconferences.com/index.php", confShortname: "Autism Research-2027", theme: "Transforming Autism Care: Science, Innovation, Therapy, and Inclusive Futures", facebook: "https://www.facebook.com/inovinemeetings", twitter: "https://x.com/InovineMeetings", youtube: "https://www.youtube.com/@InovineMeetingsLLC", linkedin: "https://www.linkedin.com/in/inovine-meetings-llc-conferences-4a2626169", instagram: "https://www.instagram.com/inovineconferences/", blog: "" },
  "theme-settings": { themeColor: "#891a1a", accentColor: "#cd7e23", conferenceLogoUrl: "/event-site/assets-front/images/logo.png", conferenceLogoAlt: "ENT-2027", conferenceLogoTitle: "ENT-2027", themeBannerUrl: "/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg" },
  "conference-credits": { creditName: "CPD", creditDetails: "N/A+ Credits", creditBadgeUrl: "" },
	hero: { title: "Biofuels and Bioenergy", subtitle: "4th Edition of Global Conference on Biofuels and Bioenergy", imageUrl: "/event-site/uploads/banners/2nd-edition-of-global-conference-on-3685.jpg", buttonLabel: "Submit Abstract", buttonUrl: "/event-site/submit-abstract" },
	about: { title: "About Biofuels and Bioenergy", body: "Magnus Group brings together researchers, scientists, academics, industry professionals, and experts to exchange knowledge and present recent developments in biofuels and sustainable bioenergy.", imageUrl: "/event-site/uploads/gallery/biofuels-2025-valencia-spain.jpg" },
	"scientific-sessions": { title: "Scientific Sessions", intro: "Explore the scientific program and the latest research in biofuels and bioenergy.", sessionTopics: "Bioethanol, Biodiesel & Biogas Production Technologies\nLignocellulosic Biomass for Biofuel Production\nBiorefineries & Integrated Biomass Processing\nAI & Machine Learning Applications in Bioenergy", buttonLabel: "View All Scientific Sessions", buttonUrl: "/event-site/program/scientific-sessions" },
	"past-conference": { title: "Past Conference Information", conferenceYear: "Biofuels 2026", body: "Magnus Group successfully concluded the 3rd Edition of Global Conference on Biofuels and Bioenergy, held September 17-19, 2026, in Rome, Italy and Online as a Hybrid Event.", imageUrl: "/event-site/uploads/gallery/biofuels-2025-valencia-spain.jpg", programUrl: "/event-site/uploads/pdfs/final-program-biofuels-2026.pdf", galleryUrl: "/event-site/gallery/biofuels-2026-rome-italy" },
	"media-partner": { title: "Media Partner", partnerName: "Conference Alerts", partnerUrl: "https://www.conferencealerts.in/eventdetail/2855037", partnerLogoUrl: "/event-site/uploads/logos/conference-alerts-8149.png" },
	"conference-schedule": { title: "Conference Schedule", dayOne: "Day-01 — September 09, 2027", dayTwo: "Day-02 — September 10, 2027", dayThree: "Day-03 — September 11, 2027", scheduleRows: "08:00-09:00 | Registration\n09:00-09:30 | Opening Ceremony and Introduction\n09:30-10:30 | Keynote Session I\n10:30-11:00 | Refreshment Break\n11:00-12:30 | Keynote Session II\n13:30-15:00 | Break Out Session I" },
	speakers: { title: "Speakers and Committee", body: "Keynote speakers, session chairs, oral presenters, poster presenters, and the organizing committee for Biofuels and Bioenergy.", imageUrl: "/event-site/uploads/testimonials/kenichi-komura-2906.jpg" },
	testimonials: { name: "Biofuels conference delegates", comment: "The conference provided a dynamic platform for scientific exchange, knowledge sharing, and collaboration.", designation: "Attendees and speakers", imageUrl: "/event-site/uploads/testimonials/kenichi-komura-2906.jpg" },
	"video-testimonials": { title: "Watch Past Conference Review", videoUrl: "https://www.youtube.com/watch?v=FAGl95QLdgQ", imageUrl: "/event-site/uploads/reviews/FAGl95QLdgQ.jpg", body: "Biofuels 2025 | Conference Highlights" },
	gallery: { title: "Conference Gallery", imageUrls: "/event-site/uploads/gallery/biofuels-2025-valencia-spain.jpg, /event-site/uploads/gallery/catalysis-conference-2018-rome-italy.jpg, /event-site/uploads/gallery/catalysis-conference-2019-london-uk.jpg", captions: "Biofuels 2025 Valencia, Catalysis Conference Rome, Conference moments" },
	footer: { address: "Magnus Group LLC, 150 South Wacker Drive #2400, Chicago, IL 60606, USA", email: "biofuels@magnusconference.com", phone: "+1 (702) 988-2320", socialLinks: "Facebook, Twitter, YouTube, Wordpress Blog", body: "Copyright 2026-27 Magnus Group Conferences" },
	"social-media": { facebookUrl: "https://www.facebook.com/magnusconferences", twitterUrl: "https://x.com/magnusconference", youtubeUrl: "https://www.youtube.com/@MagnusGroupConferences", blogUrl: "https://www.magnusgroup.org/blog", linkLabels: "Facebook, X, YouTube, Wordpress Blog" },
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = sessionStorage.getItem(key) ?? localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try { const serialized = JSON.stringify(value); sessionStorage.setItem(key, serialized); localStorage.setItem(key, serialized); } catch { /* Preview storage can be unavailable. */ }
}

function colorInputValue(value: string) {
  if (value.startsWith("#")) return value;
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return match ? `#${[match[1], match[2], match[3]].map(part => Number(part).toString(16).padStart(2, "0")).join("")}` : "#ffffff";
}

function selectedContentForPreview(section: WebsiteSection | undefined, content: Record<string, SectionContent>) {
  const values = section ? { ...(defaultContent[section.id] ?? {}), ...(content[section.id] ?? {}) } : {};
  return values.logoUrl || values.imageUrl || values.pageImageUrl || values.partnerLogoUrl || values.tabImageUrl || values.imageUrls?.split(/\s*,\s*/)[0] || "";
}

export default function WebsiteEditor({ eventId, eventTitle, onBack, onHome, onSaved, onSectionSelected }: Props) {
  const [sections, setSections] = useState<WebsiteSection[]>(() => {
    const stored = readStorage<WebsiteSection[]>(sectionStorageKey(eventId), defaultSections);
    const storedById = new Map(stored.map(section => [section.id, section]));
    return [...defaultSections.map(section => ({ ...section, ...(storedById.get(section.id) ?? {}) })), ...stored.filter(section => !defaultSections.some(defaultSection => defaultSection.id === section.id))];
  });
  const [content, setContent] = useState<Record<string, SectionContent>>(() => readStorage(contentStorageKey(eventId), {}));
  const [selectedId, setSelectedId] = useState(sections[0]?.id ?? "logo");
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [newSectionType, setNewSectionType] = useState("Video Testimonials");
  const selected = sections.find(section => section.id === selectedId) ?? sections[0];
  useEffect(() => { writeStorage(sectionStorageKey(eventId), sections); }, [eventId, sections]);
  useEffect(() => { writeStorage(contentStorageKey(eventId), content); }, [eventId, content]);

  useEffect(() => {
    const handleExternalSectionSelect = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId: string }>).detail.sectionId;
      const section = sections.find(item => item.id === sectionId);
      if (!section) return;
      setSelectedId(section.id);
      setShowSectionEditor(true);
    };
    const handleExternalSectionField = (event: Event) => {
      const detail = (event as CustomEvent<{ sectionId: string; field?: string; existingText?: string; styleValues?: { fontFamily: string; fontSize: string; fontColor: string; fontWeight: string; sectionBackgroundColor: string; spacing: string } }>).detail;
      const section = sections.find(item => item.id === detail.sectionId);
      if (!section) return;
      setSelectedId(section.id);
      const fieldAliases: Record<string, string> = { "Logo image": "logoUrl", "Left header content": "leftContent", "Right header content": "rightContent", "Top header text": "topText" };
      const fieldName = fieldAliases[detail.field ?? ""] ?? scopedPopupFields(section, detail.field ?? null).find(field => field.label === detail.field)?.name ?? null;
      setEditingField(detail.field ?? null);
      setFocusedField(fieldName);
      if (fieldName || detail.styleValues) setContent(current => { const next: SectionContent = { ...(current[section.id] ?? {}) }; if (fieldName && detail.existingText) next[fieldName] = detail.existingText; if (detail.styleValues) { next.fontFamily = detail.styleValues.fontFamily; next.fontSize = detail.styleValues.fontSize; next.fontColor = colorInputValue(detail.styleValues.fontColor); next.fontWeight = detail.styleValues.fontWeight; next.sectionBackgroundColor = colorInputValue(detail.styleValues.sectionBackgroundColor); next.spacing = detail.styleValues.spacing; } return { ...current, [section.id]: next }; });
      setEditingSection(section);
    };
    window.addEventListener("velentra:select-section", handleExternalSectionSelect);
    window.addEventListener("velentra:edit-section-field", handleExternalSectionField);
    return () => { window.removeEventListener("velentra:select-section", handleExternalSectionSelect); window.removeEventListener("velentra:edit-section-field", handleExternalSectionField); };
  }, [sections]);

  const openEditor = (section: WebsiteSection) => {
    setSelectedId(section.id);
    setEditingField(null);
    setEditingSection(section);
  };

  const handleLocalUpload = (sectionId: string, fieldName: string, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const target = fieldName === "logoUpload" ? "logoUrl" : fieldName === "bannerUpload" || fieldName === "imageUpload" ? "imageUrl" : fieldName === "pageImageUpload" ? "pageImageUrl" : fieldName === "galleryUpload" ? "imageUrls" : fieldName === "partnerLogoUpload" ? "partnerLogoUrl" : fieldName === "tabImageUpload" ? "tabImageUrl" : fieldName === "aboutImageUpload" ? "aboutImageUrl" : fieldName === "conferenceLogoUpload" ? "conferenceLogoUrl" : fieldName === "themeBannerUpload" ? "themeBannerUrl" : fieldName === "creditBadgeUpload" ? "creditBadgeUrl" : fieldName;
      setContent(current => ({ ...current, [sectionId]: { ...(current[sectionId] ?? {}), [target]: String(reader.result ?? "") } }));
    };
    reader.readAsDataURL(file);
  };

  const saveSection = (event: FormEvent<HTMLFormElement>, targetSection: WebsiteSection | null = editingSection, targetField: string | null = editingField) => {
    event.preventDefault();
    if (!targetSection) return;
    const values = new FormData(event.currentTarget);
    const nextContent: SectionContent = { status: String(values.get("status") || "Draft") };
    popupFields(targetSection).forEach(field => { if (field.type !== "file") nextContent[field.name] = String(values.get(field.name) || ""); });
    if (targetField) scopedPopupFields(targetSection, targetField).forEach(field => { if (field.type !== "file") nextContent[field.name] = String(values.get(field.name) || ""); });
    setContent(current => ({ ...current, [targetSection.id]: { ...(current[targetSection.id] ?? {}), ...nextContent } }));
    setSections(current => current.map(section => section.id === targetSection.id ? { ...section, status: nextContent.status || section.status } : section));
    setEditingSection(null);
    setEditingField(null);
    setFocusedField(null);
    setShowSectionEditor(false);
    onSaved?.(`${targetSection.name} updated for ${eventTitle}.`);
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
  const mediaPreview = selectedContentForPreview(selected, content);

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
        const textClone = targetElement.cloneNode(true) as HTMLElement;
        textClone.querySelectorAll(".manus-inline-edit").forEach(button => button.remove());
        const existingText = targetElement.tagName === "IMG" ? (targetElement as HTMLImageElement).src : (targetElement as HTMLInputElement).value || textClone.textContent?.trim() || "";
        const computed = window.getComputedStyle(targetElement);
        let backgroundColor = computed.backgroundColor;
        let parent = targetElement.parentElement;
        while ((backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)") && parent) { backgroundColor = window.getComputedStyle(parent).backgroundColor; parent = parent.parentElement; }
        const styleValues = { fontFamily: computed.fontFamily, fontSize: computed.fontSize, fontColor: computed.color, fontWeight: computed.fontWeight, sectionBackgroundColor: backgroundColor, spacing: computed.padding };
        window.parent.dispatchEvent(new CustomEvent("velentra:edit-section-field", { detail: { sectionId, field, existingText, styleValues } }));
      });
      frameElement.appendChild(editButton);
    };
    const mark = (selector: string, sectionId: string, field: string) => document.querySelectorAll<HTMLElement>(selector).forEach(targetElement => addFrame(targetElement, sectionId, field));
    mark(".hybrid-text", "header", "Top header text");
    mark(".top-header .top-logo", "header", "Logo image");
    mark(".top-header h1", "header", "Left header content");
    mark(".top-header .top-add-text-1, .top-header .top-add-text-2", "header", "Right header content");
    mark(".top-header h4, .top-header .c-date", "header", "Venue");
    mark("#about, [id*='about'], [class*='about']", "about", "About content");
    mark("[id*='speaker'], [class*='speaker']", "speakers", "Speaker profiles");
    mark("[id*='testimonial'], [class*='testimonial']", "testimonials", "Testimonials");
    mark("[id*='gallery'], [class*='gallery']", "gallery", "Gallery images");
    mark("footer", "footer", "Footer content");
    const genericTargets = document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,span,img");
    genericTargets.forEach(targetElement => {
      if (!targetElement.textContent?.trim() && !["IMG", "INPUT", "TEXTAREA", "SELECT"].includes(targetElement.tagName)) return;
      if (targetElement.closest(".manus-inline-edit, a, button, input, textarea, select, nav, form, #mainMenu, [class*='social'], [id*='social'], [class*='quick'], [id*='quick'], [class*='newsletter'], [id*='newsletter']") || targetElement.classList.contains("sr-only")) return;
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
    {showSectionEditor && selected ? <section className="website-config-section-editor"><div className="website-config-settings-header"><div><h1>Page : {selected.name}</h1><p>Manage the existing content for this website section.</p></div><button type="button" className="employee-secondary-button" onClick={() => setShowSectionEditor(false)}><ArrowLeft size={16} /> Back to website preview</button></div>{mediaPreview ? <div className="website-settings-media-preview"><span>Current image</span><img src={mediaPreview} alt={`${selected.name} existing media`} /></div> : null}<form key={`${selected.id}-${mediaPreview}`} className="website-config-settings-form" onSubmit={event => saveSection(event, selected, null)}><div className="website-config-section-card-heading">Edit: {selected.name}</div><div className="website-edit-modal-fields">{popupFields(selected).map(field => <label className={field.wide ? "website-edit-modal-wide" : ""} key={field.name}><span>{field.label}</span>{field.wide || ["body", "quote", "comment", "navigation", "imageUrls", "captions", "socialLinks", "sessionTopics", "scheduleRows"].includes(field.name) ? <textarea name={field.name} rows={5} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} /> : <input name={field.name} type={field.type ?? "text"} defaultValue={field.type === "file" ? undefined : (selectedContent[field.name] ?? "")} placeholder={field.placeholder} accept={field.type === "file" ? "image/*" : undefined} onChange={event => field.type === "file" ? handleLocalUpload(selected.id, field.name, event.target.files?.[0]) : undefined} />}</label>)}<label><span>Status</span><select name="status" defaultValue={selectedContent.status ?? selected.status}><option>Draft</option><option>Active</option><option>Published</option><option>Hidden</option></select></label></div><div className="website-config-settings-actions"><button type="button" className="employee-secondary-button" onClick={() => setShowSectionEditor(false)}><ArrowLeft size={16} /> Back to website preview</button><button type="submit" className="employee-primary-button"><Check size={16} /> Save {selected.name}</button></div></form></section> : <section className="website-config-full-preview"><div className="website-config-iframe-wrap"><iframe title={`${eventTitle} complete website`} src={`/event-site/index.html?event=${eventId}`} onLoad={handlePreviewLoad} /></div></section>}

    {editingSection ? <div className="website-edit-modal-backdrop" role="presentation"><form className="website-edit-modal" onSubmit={saveSection}><div className="website-edit-modal-header"><div><span className="employee-eyebrow"><span /> Edit website element</span><h2>{editingField ?? editingSection.name}</h2><p>Update this selected element using its existing content and design controls.</p></div><button type="button" className="employee-icon-action" aria-label="Close editor" onClick={() => { setEditingSection(null); setEditingField(null); setFocusedField(null); }}><X size={18} /></button></div>{editingSection.id === "header" && editingField === "Logo image" && selectedContent.logoUrl ? <div className="website-logo-edit-preview"><span>Existing logo</span><img src={selectedContent.logoUrl} alt="Existing website logo" /></div> : null}<div className="website-edit-modal-fields">{scopedPopupFields(editingSection, editingField).map(field => <label className={field.wide ? "website-edit-modal-wide" : ""} key={field.name}><span>{field.label}</span>{field.name === "body" || field.name === "quote" || field.name === "navigation" || field.name === "imageUrls" || field.name === "captions" || field.name === "socialLinks" ? <textarea name={field.name} rows={4} defaultValue={selectedContent[field.name] ?? ""} placeholder={field.placeholder} /> : <input name={field.name} type={field.type ?? "text"} defaultValue={field.type === "file" ? undefined : (selectedContent[field.name] ?? "")} placeholder={field.placeholder} autoFocus={focusedField === field.name} accept={field.type === "file" ? "image/*" : undefined} onChange={event => field.type === "file" ? handleLocalUpload(editingSection.id, field.name, event.target.files?.[0]) : undefined} />}</label>)}<label><span>Section status</span><select name="status" defaultValue={selectedContent.status ?? editingSection.status}><option>Draft</option><option>Published</option><option>Hidden</option></select></label></div><div className="website-edit-modal-actions"><button type="button" className="employee-secondary-button" onClick={() => { setEditingSection(null); setEditingField(null); setFocusedField(null); }}>Cancel</button><button type="submit" className="employee-primary-button"><Check size={16} /> Save section</button></div></form></div> : null}
  </>;
}
