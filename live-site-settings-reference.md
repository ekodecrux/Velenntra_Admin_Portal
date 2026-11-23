# Live Employee Site Settings reference

Source dashboard: https://inovinegroup.com/admin/coordinator/dashboard
Employee credentials were supplied by the user in the conversation and successfully opened the live Employee dashboard.

The live Employee sidebar has an expandable `Site Settings` group. When expanded, it shows exactly four indented links:
- Header Section -> https://inovinegroup.com/admin/coordinator/editHeader/244
- Footer Section -> https://inovinegroup.com/admin/coordinator/editFooter/244
- Theme Settings -> https://inovinegroup.com/admin/coordinator/editTheme/244
- Conference Credits -> https://inovinegroup.com/admin/coordinator/conferenceCredits/244

Live Header Section form observed: Top Header, Heading, Start Date, End Date, Venue, Hotel, Address, About Conference Image upload, existing/current image display, Home Page metadata (title/description/keywords), Abstract Submission metadata, Brochure metadata, Registration metadata, Organizing Committee metadata, Sessions metadata, Venue metadata, Update and Back actions.

Live Footer Section form observed: Address, For Program Enquiry, General Queries, Sponsors/Exhibitions, Phone Number, Whatsapp Number, Website Link, Conference Short Name, Conference Theme, Facebook Link, Twitter Link, Youtube Link, LinkedIn Link, Instagram Link, Blog, Update and Back actions.

The live dashboard keeps the same sidebar/header while a submenu page is open; the selected submenu is highlighted. The screenshot showed the four submenu items indented below Site Settings without their own icons.

## Biofuels event website field targets

Biofuels source page: https://velentraconferences.com/event-site/index.html?event=global

Observed selectors in the imported event page:
- Hybrid announcement: `.hybrid-text`
- Logo/title/dates: `.top-header .top-logo`, `.top-header h1`, `.top-header h4`, `.top-header .c-date`
- Hotel/address: `.top-header .top-add-text-1`
- Phone/email: `.top-header .top-add-text-2`
- Theme/header: `.top-header`, `#header`, `.c-date`, `.flash-bar`
- Main banner: `.owl-bg-img img`
- About image/content: `#about`
- Footer address/contact/social: `#footer`, `.footer-organizer-sec .org-add`, `.footer-organizer-sec .org-call`, `#footer .list-icon`, `#footer .social-facebook a`, `#footer .social-twitter a`, `#footer .social-youtube a`
