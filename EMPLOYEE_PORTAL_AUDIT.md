# Employee Coordinator Portal Audit

**Source:** `https://inovinegroup.com/admin/coordinator/`

**Audit mode:** Read-only inspection in the authenticated Employee session. Every route below was fetched successfully with HTTP 200. Forms and controls were inspected, but no external form was submitted and no delete/mutation action was clicked.

## Confirmed route set

| Area | Route | Main purpose / controls found |
|---|---|---|
| Dashboard | `/dashboard` | Summary cards for abstracts, brochures, testimonials, email search, unsubscribe emails, registrations, and editorial-board categories |
| Email Search | `/email-search` | Email input; `Search Email` GET action |
| Unsubscribe Emails | `/unsubscribe-emails` | Email input; `Add Unsubscribe Email` POST; `Download Excel` |
| Abstracts | `/abstracts` | Abstract list/review page |
| Brochure Download | `/brochuredownloadlist` | Download list with delete actions |
| All Members | `/boardmembers` | Member list; `Add Member` |
| Keynote Speakers | `/keynotespeakers` | Speaker list; `Add Member` |
| Renowned Speakers | `/renownedspeakers` | Speaker list; `Add Member` |
| Invited Speakers | `/speakers` | Speaker list; `Add Member` |
| Poster Presenters | `/posterpresenters` | Presenter list; `Add Member` |
| Organizing Committee | `/organizingcommittee` | Committee list; `Add Member` |
| Representatives | `/representatives` | Representative list; `Add Representative` |
| Tracks | `/tracks` | Track list; `Add Track` |
| Subtracks | `/subtracks` | Subtrack list; `Add Subtrack` |
| Prices | `/prices` | Editable accommodation price inputs; `Submit` |
| Registration Dates | `/conferencedates` | Four conference date inputs; `Update` |
| Default Currency | `/defaultCurrency` | Currency select: USD, EUR, GBP; `Submit` |
| Registration Prices | `/regprices` | Currency tabs USD/EURO/GBP; add, edit, delete price actions |
| Accommodation Prices | `/accomprices` | Enable/disable select; editable accommodation price inputs; `Submit` |
| Registrations | `/registrations` | Registration records page |
| Banner Images | `/listBannerUpload` | Banner list; add, edit, delete |
| Media Partners | `/listMediaPartners` | Media partner list; add, edit, delete |
| Exhibitors | `/listExhibitors` | Exhibitor list; `Add Exhibitor` |
| Gallery | `/listPastConferenceGallery` | Gallery list; Default/Posted Data select; `Add Gallery` |
| Reviews | `/listPastConferenceReview` | Review list; Default/Posted Data select; `Add Post Conference Review` |
| Events List | `/listEvents` | Events list; add, edit, delete |
| Add Event | `/manageEvent` | Name, start date, end date, venue, link, status select, add/back |
| Conference Sessions | `/conferenceSession` | Session list; edit/delete |
| Add Conference Session | `/addConferenceSession` | Title, link, description, status select, submit/cancel |
| Buttons List | `/mediaFileUpload/244` | Three button-name inputs with three file uploads; submit |
| Testimonials List | `/Testimonials` | Default/Posted Data select; `Add Testimonial` |
| Add Testimonial | `/manageTestimonial` | Name, image upload, designation, comment, status select, add/back |
| Video Testimonials | `/videoTestimonials` | Default/Posted Data select; `Add Video Testimonials` |
| Add Video Testimonial | `/manageVideoTestimonials` | Name, video URL, status select, submit/cancel |
| Pages | `/pageslist` | Page list; add, edit, delete |
| Home Tabs | `/homeTabs` | Tab list; add, edit, delete |
| Add Home Tab | `/manageTab` | Title, content, add/back |
| Header Section | `/editHeader/244` | Header copy, event dates, venue, hotel, address, about image, and SEO title/description/keywords fields for home, abstracts, brochure, registration, committee, sessions, and venue pages |
| Footer Section | `/editFooter/244` | Address, three email fields, phone, WhatsApp, website, conference short name/theme, Facebook, X/Twitter, YouTube, LinkedIn, Instagram, and blog URLs |
| Theme Settings | `/editTheme/244` | Theme color, accent color, conference logo upload, logo alt/title, theme banner upload |
| Conference Credits | `/conferenceCredits/244` | Conference credits page; `Edit Conference Credits` |

## Exact field groups captured

- **Email Search:** `email` (`email`), Search Email.
- **Unsubscribe:** `email` (`email`), Add Unsubscribe Email.
- **Prices:** repeated `accomArr[]` text inputs plus hidden conference ID and Submit.
- **Conference Dates:** hidden conference/row IDs, `confdate1`, `confdate2`, `confdate3`, `confdate4`, Update.
- **Currency:** `default_currency` select with USD, EUR, GBP.
- **Accommodation Prices:** `accom_status` select with enable/disable, hidden row ID, repeated `accomArr[]` fields, Submit.
- **Add Event:** `name`, `date_start`, `date_end`, `venue`, `link`, `status` (Active/Inactive/Deleted).
- **Add Session:** `title`, `link`, `description`, `status` (Active/Inactive/Deleted).
- **Buttons:** `button_name1` + `file1`, `button_name2` + `file2`, `button_name3` + `file3`.
- **Testimonial:** `name`, `image`, `designation`, `comment`, `status` (Active/Inactive/Deleted).
- **Video Testimonial:** `name`, `video_link` (URL), `status` (Active/Inactive).
- **Home Tab:** `title`, `content`.
- **Footer:** `footer_address`, `email1`, `email2`, `email3`, `phone`, `whatsapp`, `website_url`, `conf_shortname`, `theme`, `fb_link`, `twitter_link`, `youtube_link`, `linkedin_link`, `instagram`, `blog`.
- **Theme:** `themecolor`, `accentcolor`, `conferencelogo`, `conferencelogoalttext`, `conferencelogotitle`, `themebanner`.

## Current Velentra status

Velentra now mirrors the full navigation set and provides working in-session views, list search/refresh/view feedback, context-aware add actions, editable create forms, settings controls, save-draft feedback, and responsive navigation. The audit identifies the remaining parity detail: connecting every external field group above to persisted Velentra data and role-protected server actions. No external data was changed during this audit.
