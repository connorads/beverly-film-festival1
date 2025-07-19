# 🎮 **Beverly Hills Film Festival** Prototype

Build a **Dual-Mode Festival Website** for the **Beverly Hills Film Festival**.

Create a working prototype that supports both **Pre-Festival** and **Post-Festival** modes. This will be presented to the client, so **all pages, logic, and components must be functional and production-ready**.

IMPORTANT: Although this is only a prototype in order to assist with development, we should take a test first approach. This is fully explained in [TESTING.MD](TESTING.md) which you should read in full.

---

## 🎯 Key Requirements

### ✅ UI/UX

* Use [ShadCN UI](https://ui.shadcn.com/) for all components
* TailwindCSS styling
* Clean, responsive layout tailored to the film industry aesthetic

### ✅ Functional Prototype

* All navigation and pages must be live and clickable
* Homepage must adapt dynamically based on mode
* Film/program data and ticketing logic must function
* No broken or placeholder links

### ✅ Backend Portal (Admin)

* Secure login (mock auth OK)
* Admin can:

  * Toggle between `pre_festival` and `post_festival`
  * Edit ticket prices and availability
  * Manage venues and screens (multiple screens per venue)
  * Create and manage film blocks per day
  * Assign/sort films in blocks
  * Attach schedule and ticket metadata (date, time, venue, screen, films)
  * Update award winners and laurels
  * Upload gallery images
  * Manage sponsor logos and links
  * Approve/publish film submissions

### ✅ Submitter Portal (Filmmakers)

* Account creation and login
* Submit project details (poster, description, screener link, category)
* Submissions are stored as "unpublished" until admin approval

### ✅ Ticket Buyer Portal (Public)

* Account creation required to buy tickets
* Full checkout system for film block ticketing
* After purchase, users can:

  * Log in to view account
  * Download digital tickets (PDF or QR)
  * View film block info (date, time, venue, films)
  * Update profile/contact info

---

## 🧩 Global Logic

```js
const site_mode = 'pre_festival'; // or 'post_festival'
```

---

## 📄 Pages & Routes

### Shared (Always Visible)

* `/` – Home (dynamic based on mode)
* `/about` – Festival background, venues, mission
* `/contact` – Contact form, press info
* `/sponsors` – Partners and sponsor logos
* `/press` – Media kits and downloads
* `/policies` – Privacy, terms, accessibility
* `/admin` – Admin portal login/dashboard
* `/archives` – View previous years (2025, 2024, etc.)

Each year can be nested: `/archives/2025`, `/archives/2024`, etc.

### Pre-Festival Only (`site_mode === 'pre_festival'`)

* `/submit` – Submission details + login or FilmFreeway link
* `/tickets` – Live ticket sales (Feb–Apr) with checkout
* `/festival-program` – Teaser/placeholder
* `/panels-events` – Coming soon content
* `/volunteer` – Volunteer/media sign-up

### Post-Festival Only (`site_mode === 'post_festival'`)

* `/winners` – Award recipients, jury comments
* `/gallery` – Event photography
* `/recap` – Press coverage, stats, highlights
* `/watch` – Embedded trailers/Vimeo
* `/tickets` – Archived info + newsletter CTA

---

## 📊 Page Visibility Comparison

| Page                | Pre-Festival | Post-Festival |
| ------------------- | ------------ | ------------- |
| `/submit`           | ✅ Visible    | ❌ Hidden      |
| `/tickets`          | ✅ Active     | ✅ Archived    |
| `/festival-program` | ⏳ Teaser     | ✅ Archive     |
| `/panels-events`    | ⏳ Teaser     | ✅ Recap       |
| `/winners`          | ❌ Hidden     | ✅ Visible     |
| `/gallery`          | ❌ Hidden     | ✅ Visible     |
| `/recap`            | ❌ Hidden     | ✅ Visible     |
| `/watch`            | ❌ Hidden     | ✅ Visible     |
| `/archives`         | ✅ Visible    | ✅ Visible     |

---

## ⚙️ React Implementation Example

```tsx
{site_mode === 'pre_festival' && (
  <>
    <SubmitPage />
    <TicketsPage active />
    <FestivalProgramPage teaser />
  </>
)}

{site_mode === 'post_festival' && (
  <>
    <WinnersPage />
    <GalleryPage />
    <RecapPage />
    <TicketsPage archived />
  </>
)}
```

---

## 🛠 Admin, Submitter & Ticket Buyer Portal Routes

| Route                  | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `/admin/login`         | Admin login form                        |
| `/admin/dashboard`     | Overview + toggle site mode             |
| `/admin/films`         | Approve/publish film submissions        |
| `/admin/tickets`       | Ticket prices and checkout setup        |
| `/admin/blocks`        | Manage film blocks (date, venue, films) |
| `/admin/venues`        | Venue details and screens               |
| `/admin/winners`       | Input/update award winners              |
| `/admin/gallery`       | Upload/delete images                    |
| `/admin/sponsors`      | Manage sponsor logos and links          |
| `/admin/archives`      | Manage archived content                 |
| `/submitter/register`  | Filmmaker sign-up                       |
| `/submitter/login`     | Filmmaker login                         |
| `/submitter/dashboard` | Submit/edit projects (not live yet)     |
| `/account/register`    | Ticket buyer sign-up                    |
| `/account/login`       | Ticket buyer login                      |
| `/account/tickets`     | View/download purchased tickets         |
| `/account/profile`     | Update user profile                     |

---

## ✅ Deliverables

* Fully functional **Next.js** app
* Uses **ShadCN UI**, **TailwindCSS**
* All navigation and routes working
* Responsive layout (desktop + mobile)
* Admin panel with CMS-style tools
* Archive structure by year (e.g. `/archives/2025`)
* Filmmaker portal with unpublished draft handling
* Full checkout flow and ticketing system
* Venue + multi-screen + film block support
* Client-ready presentation
