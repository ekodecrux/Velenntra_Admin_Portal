# Velentra Admin Portal — implementation outcomes

## Authenticated branding, header, and footer
- [x] Use the user-supplied blue-and-green Velentra logo after login in both Employee and Admin dashboards, preserving its colors and aspect ratio. Keep the existing sign-in logo unchanged.
- [x] Display one full-width white header above the sidebar/content with the logo, mobile navigation control, and accessible account menu; keep the header visible while scrolling and prevent overlap or clipped dropdowns.
- [x] Display a page footer in both authenticated workspaces, below content and at the bottom of short pages, without covering forms or records. Keep the header, sidebar, and footer usable on desktop and mobile.

## Unified Admin role
- [x] Offer only Employee and Admin at sign-in. Admin handles all former Admin and Super Admin tasks: event management and creation, event details and preview, templates and status, employee directory and account management, roles and permissions, Admin and Employee assignments, review queues and approvals, publishing readiness and rules, websites, notifications, activity, audit logs, and workspace/site/system settings.
- [x] Route Admin to one combined workspace; normalize existing `/workspace/super-admin` links to `/workspace/admin` and preserve employee records stored in the old preview session.
- [x] Remove Super Admin from role selectors and approval settings; migrate legacy employee records with the Super Admin role to Admin. Keep Employee behavior unchanged and use `ADMIN / 123456` for the single Admin demo account.

## Login surface and role-aware entry
- [x] Deliver a polished, responsive admin portal login page branded for Velentra Group Event Operations.
- [x] Provide one streamlined entry point for Employee and Admin demo sign-in, with role-specific workspace handoff paths.
- [x] Include concise platform context about event content, workflow, and publishing operations without distracting from sign-in.

## Sign-in experience
- [x] Provide labeled username and password controls with visible focus states, password visibility toggle, client-side validation, loading/disabled behavior, and clear error/help feedback.
- [x] Implement the requested demo logins with usernames `EMP001` (or `EMP`) and `ADMIN`, both using password `123456`; keep demo sessions in browser session storage only for this UI slice.
- [x] Include a forgot-password/account-access entry point with clear guidance for users who cannot access their account.

## Workspace handoff
- [x] After valid demo sign-in, route to the matching Employee or unified Admin workspace handoff shell.
- [x] Register the complete client route set in `client/public/manus-routes.json`.

## Unified Admin workspace
- [x] Give Admin users a dedicated workspace for event management, event details, website preview, employee assignments, employee work, review queue, content approvals, publishing readiness, notifications, and settings.
- [x] Give Admin users additional unified workspace controls for all events, event creation, templates, team roles, Admin assignments, employee directory, published sites, site settings, publishing rules, platform activity, audit log, and system settings.
- [x] Give Admin users controls to add and manage employees, create and manage roles and permissions, assign Admins and Employees to events, modify event details, change event status, manage event websites, and control publishing rules.
- [x] Retain the Admin Events primary destinations `All Events` and `Create Event`; place `Create new Event` as the primary action at the top of the All Events view.
- [x] In the Create Event form, show only Event title, Start date, End date, Venue, Event status, Subdomain, Domain, and Website status; do not assign the event to an Admin or Employee.
- [x] Use a role dropdown when adding an employee, searchable Admin and multi-select Employee dropdowns when creating an event, and native date-picker controls for event date fields.
- [x] Persist newly saved Employee records in the in-session Employee Directory and newly saved Event records in All Events, including the event status and global Employee login details.
- [x] After an event is created, display one global Employee login using the event subdomain as the username and `123456` as the password; allow that subdomain login from the global Employee sign-in.
- [x] Make Events a single menu entry that opens the Events list directly; keep Create Event as the page action instead of a submenu item. Show the combined subdomain.domain value in one Domain column, use a compact two-line Website Status header, and provide View Website plus Modify Website icons alongside Edit and Delete actions. Confirm deletion and prevent deletion of published events; keep website rendering as a placeholder until website content is provided.
- [x] Import the supplied `Velentra_Subdomain_Website` main-branch website template, open each event's View Website action in a new browser tab, and provide Website Editor controls for Admin and Employee logins to manage page copy, navigation, images, logos, SEO, theme colors, footer details, and publishing status.
- [x] Merge Site Settings into one Website Configuration area so the Admin and Employee navigation does not duplicate website controls; retain the required website preview, content, media, SEO, theme, defaults, publishing, header, footer, and credit controls.
- [x] Website Editor shows section-by-section controls on the left and the selected event website live on the right, with section selection, add section, delete section confirmation, content/media fields, and Save Website controls.
- [x] Website Configuration includes WordPress-style block options for text, images, galleries, CTAs, speaker grids, registration forms, and custom HTML, plus section duplicate, reorder, show/hide, delete, and a selected-section inspector for heading, body, image, button, and layout editing.
- [x] Use a single direct Website Configuration sidebar item without a Websites & publishing submenu; clicking it opens the same portal header/footer shell with the section editor on the left and the live website on the right for both Admin and Employee access.
- [x] Open Website Configuration in a dedicated `/workspace/:role/website-configuration` browser tab while preserving the authenticated portal header, footer, and role-specific session.
- [x] Keep the Website Configuration page visually simple: section names such as Logo & Branding, Header, Pages, Testimonials, Video Testimonials, Gallery, and Footer appear in a left menu; the complete website preview appears on the right; Edit opens a focused popup with content, media, links, and status fields; Add section supports additional pages, videos, testimonials, galleries, speakers, and custom content.
- [x] Make the left website menu names-only and clickable—no edit/delete icon buttons; clicking a section opens a popup with section-specific fields rather than generic dummy fields.
- [x] Open Website Configuration in full website preview mode first; keep the section menu hidden until Edit sections is selected, then allow switching back to the full preview.
- [x] Remove the extra Website Configuration title/action strip from the preview-first screen so the full website begins directly below the portal header.
- [x] Remove the remaining Full Website Preview heading, event title, live badge, and card chrome so the imported website iframe itself begins immediately.
- [x] In Website Configuration mode, replace the normal portal sidebar items with a rail showing only Website Configuration at the top and Back To Home with a left arrow below it, while the website remains on the right.
- [x] Clicking a section inside the live website preview selects the related section and displays its modification details below Back To Home in the left rail for Admin and Employee users.
- [x] Do not open the old Website Sections/Content menu or Full Website Preview header after a website click; keep the website full-width and show only the clicked section’s related modification details in the left rail.
- [x] Make every related modification detail in the left rail clickable; clicking an option opens the section popup with the appropriate fields for editing or adding content.
- [x] Header modification options include the existing logo, left and right header content, top announcement text and color, event title, start/end dates, venue, header background color, bottom date-bar color, and navigation links, with current Biofuels conference values prefilled for editing.
- [x] Map clicks on the imported site `.top-header`, announcement bar, and `#mainMenu` navigation to the Header section so Header options are not incorrectly shown as Pages.
- [x] Add Canva-style dashed edit frames and edit icons over logo, header blocks, navigation, content sections, gallery, testimonials, speakers, and footer; each icon opens a section-specific popup with content/media plus font family, font size, text color, font weight, background color, and spacing controls.
- [x] Extend inline editing to every visible website text element, link, button, form option, image, heading, paragraph, list item, and content control so each individual element has its own edit icon and opens the relevant popup.
- [x] Preload the clicked element’s existing text, image source, input value, or link value into the popup before editing, instead of opening with blank or generic dummy content.
- [x] Use element-specific popup scopes: clicking the logo opens only logo URL/upload, existing-logo preview, and alt-text controls; clicking an individual header text element opens only that text with its existing value plus font, color, weight, background, and spacing controls.
- [x] Exclude inline edit icons from captured content, preload the clicked element’s computed font/color/background/spacing values, and render color/background controls as visible color boxes matching the website style.
- [x] Make Employee Directory an end-to-end management view with search, role filters, Active/Inactive filters, full name/username/email/role/status details, Add Employee as the primary action, and row-level Edit and Delete controls.
- [x] Keep Employee Directory changes in browser session storage so added, edited, and deleted records remain visible after navigation during the Preview session.
- [x] Add Employee ID, Contact number, and Address fields to Add/Edit Employee; use Employee ID as the employee's sole username/identifier, display those details in Employee Directory, and include them in directory search.
- [x] Keep only icon-only Edit and Delete controls in each Employee Directory row with accessible labels and tooltips; remove the separate Username column and View action.
- [x] Tighten Employee ID and Name column widths so the directory does not leave excessive space between the identifier and employee name.

## Employee portal parity audit
- [x] Validate the provided Employee portal with `emp001 / 123456` and mirror its top-level menu order: Dashboard, Email Search, Unsubscribe Emails, Abstracts, Brochure Download, Speakers | Board Members, Representatives, Tracks, Registration Info, Banner/ Media, Past Conference Gallery/Review, Events, Conference Sessions, Buttons List, Testimonials, Pages, Home Tabs, and Site Settings.
- [x] Mirror the audited expandable submenu items, including board-member categories, Tracks/Subtracks/Prices, registration options, Events List/Add Event, Conference Sessions/Add Conference Sessions, testimonial variants, Home Tabs/Add New Tab, and Site Settings sections.
- [x] Align list destinations with Show 10/25/50/100 entries, Search, table actions, and Previous/Next pagination controls.
- [x] Align create destinations with Title, Status (Draft/Published), Description, and Save draft; align site settings with Section title, Visibility (Visible/Hidden), Content, and Update preview.
- [x] Make Employee login accept `emp001 / 123456` and retain `EMP / 123456` compatibility for the existing preview account.
- [x] Expand the dashboard with the missing Email Search summary card and richer editorial-board cards.
- [x] Expand Abstracts rows with Name, Abstract Title, Email, Country, Phone No, Category, Track Name, Address, Interested, Organization, Date, and Action columns, with horizontal scrolling for the full field set.
- [x] Add audited field groups for Unsubscribe Emails, accommodation prices, registration dates, currency, event/session creation, buttons/uploads, testimonials, video testimonials, Home Tabs, Header, Footer, Theme, and Conference Credits.
- [x] Match the original Employee Dashboard card layout: four cards across the first row (Abstracts, Brochures, Testimonials, Email Search), Unsubscribe Emails wrapping to the next row, separate action footers, and compact Dashboard heading treatment.
- [x] Verify the original Employee account `ent-2027 / 75501` and compare its authenticated dashboard/menu against Velentra without mutating external records.
- [x] Make audited list pages open their matching Add forms; make form fields editable; save new records locally, return to the originating list, prefill Edit flows, and support local Delete actions without changing the external portal.
- [x] Recreate Coordinator Email Search as a dedicated page with the blue search panel, Email Address field, Search Email action, scope text, and Search Tables pills: abstracts, clients, contact, downloadbrochure, editorialboard, email_messages, follow_up, forms_submission, registration, and registration_users.
- [x] Keep the Employee-only portal layout faithful to the original by removing Velentra-specific explanatory copy, breadcrumbs, extra Dashboard buttons, generic New record/Draft labels, and non-original dashboard section wording while preserving the original header.
- [x] Preserve the original Employee header: sidebar logo area plus right-side account dropdown with username, Settings, and Logout options; do not hide the header.
- [x] Rebuild the Employee shell from the original DOM geometry: 80px full-width header, 250px sidebar below the header, main content beginning at the sidebar edge, original active-row treatment, and original dashboard card proportions.
- [x] Preserve the Employee visual language while changing dashboard metrics, menu groups, workflow cards, and forms to match each role's responsibilities.

## Employee coordinator dashboard
- [x] Mirror the provided employee portal's option set in a Velentra Employee workspace: Dashboard, Email Search, Unsubscribe Emails, Abstracts, Brochure Download, editorial-board member categories, registration settings and records, tracks/subtracks, events, conference sessions, media, gallery/reviews, testimonials, pages, home tabs, and site settings.
- [x] Make each sidebar option open its own working in-session view; list views support search, refresh, view feedback, and context-aware actions, while create options open editable forms with save-draft feedback.
- [x] Provide dashboard summary cards for abstracts, brochures, testimonials, unsubscribe emails, success registrations, pending registrations, and editorial-board categories, matching the inspected employee portal's workflow emphasis.
- [x] Keep the employee dashboard responsive with mobile navigation, keyboard-accessible controls, role/session identity, and back/sign-out actions.
- [x] Add expandable/collapsible section headers with nested submenu items; selecting a submenu automatically opens its parent section and highlights the active destination.
- [x] Match the inspected portal menu treatment: normal-case rows, green line icons, dark navy active rows, right-side chevrons, indented submenu items, separators, and Events expanded by default.

## Product polish
- [x] Add the Velentra visual system: deep ink, warm paper, copper accent, editorial typography contrast, and lightweight operational status motifs.
- [x] Keep the experience responsive across desktop and mobile and usable by keyboard and assistive technology.
