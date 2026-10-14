# ExploreX — Sri Lanka Travel Agency & Tour Operator Platform

<p align="center">
  <img src="public/logo.svg" alt="ExploreX Logo" width="160" />
</p>

ExploreX is a modern, mobile-first, production-ready website and management platform designed specifically for a Sri Lankan destination management agency (tagline: *"Travel Agency"*). Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Prisma / PostgreSQL**, ExploreX pairs a tropical design aesthetic with a high-conversion **WhatsApp Booking Flow** and an **RBAC Admin Dashboard**.

---

## 🌴 Key Features

### 1. Brand & Design System
- **Tropical Color Palette**: Deep teal-green primary (`#2F5D58`), warm off-white/cream background (`#F6F5F0`), sand/gold CTA accent (`#D49B44`), and WhatsApp green (`#25D366`).
- **Brand Identity**: Custom vector logo featuring a coconut palm tree within ocean wave crests, the stylized **ExploreX** wordmark, and the *"TRAVEL AGENCY"* subtitle.
- **Microclimate Weather Widgets**: Live climate conditions across Sri Lanka’s zones (Cultural Triangle, Central Highlands, Southern Coast, Wildlife Parks).
- **Internationalization & Currencies**: Currency switcher (USD, LKR, EUR, GBP) and multilingual structure (English, Sinhala, Tamil, German).

### 2. Public Pages & Interactive Tools
- **Homepage (`/`)**: Hero banner with instant destination/traveler search bar, featured packages, regional destinations, why choose us, guest testimonials, and direct WhatsApp concierge button.
- **Destinations Directory & Details (`/destinations`, `/destinations/[slug]`)**: In-depth Sri Lanka travel guides for Sigiriya, Kandy, Ella, Galle, Mirissa, Yala, Nuwara Eliya, Trincomalee, Jaffna, and Arugam Bay with weather tips, photo gallery, nearby boutique stays, and related tour packages.
- **Accommodations & Stays (`/hotels`, `/hotels/[slug]`)**: Luxury boutique villas, 5-star beach resorts, eco-lodges, and heritage bungalows with nightly pricing and 1-click WhatsApp quote generator.
- **Curated Tour Packages (`/packages`, `/packages/[slug]`)**: Day-by-day itineraries, interactive route maps, inclusions/exclusions, hotel tiers, and difficulty filters.
- **Interactive Leaflet Map (`/map`)**: OpenStreetMap-powered Sri Lanka island map with category markers, preview cards, and package route lines.
- **Custom Trip Builder (`/builder`)**: Step-by-step interactive questionnaire allowing travelers to select destinations, days, hotel tiers, vehicle category, and driver vs. national guide options, calculating an estimated quote with direct WhatsApp handoff.
- **Private Vehicle Fleet (`/vehicles`)**: Toyota Axio sedans, Toyota KDH high-roof vans, executive mini-coaches, safari jeeps, and tuk-tuks with luggage capacities and per-day/per-km rates.
- **Informational Pages**: About Us (`/about`), Contact & Offices (`/contact`), Frequently Asked Questions (`/faq`), Travel Blog (`/blog`), Terms of Service (`/terms`), Privacy Policy (`/privacy`).

### 3. WhatsApp Booking Flow (Core Engine)
- **Floating WhatsApp button** on every page and a **"Book via WhatsApp"** button on every package, hotel, vehicle, and custom trip.
- Standardized, pre-filled, editable inquiry payloads with unique reference codes (`Ref: PKG-001`, `Ref: HTL-001`).
- Customer details (name, phone, travel dates, party size, notes) collected and logged to the internal CRM with explicit consent.

### 4. Admin Dashboard (`/admin`)
- **Role-Based Access Control (RBAC)**:
  - **Super Admin**: Full platform authority, staff provisioning, system settings, audit logs.
  - **Manager**: Catalog management, pricing, vehicle fleet, CRM enquiry updates, review moderation.
  - **Content Editor**: Destination travel guides, blog articles, and photo curation.
  - **Support Agent**: Read-only CRM enquiry lead viewer for guest communications.
- **Interactive Tour Package Editor (`/admin/packages`)**: Day-by-day itinerary creator (add/edit/delete days, activities, meals, overnight stays).
- **Hotel Catalog CRUD (`/admin/hotels`)**: Manage rates, star ratings, and amenities.
- **Destination Guide CRUD (`/admin/destinations`)**: GPS coordinates, highlights, and visiting seasons.
- **Transport Fleet CRUD (`/admin/vehicles`)**: Passenger/luggage specs and daily chauffeur rates.
- **Enquiry CRM (`/admin/enquiries`)**: Track inquiry statuses (`NEW`, `CONTACTED`, `CONFIRMED`, `CANCELLED`), staff notes, and 1-click WhatsApp chat link.
- **Review Moderation (`/admin/reviews`)**: Approve or reject customer reviews before they appear publicly.
- **Staff Accounts (`/admin/users`)**: Super Admin user management and role assignment.
- **Security Audit Logs (`/admin/audit-logs`)**: Searchable stream of all administrative actions.
- **Settings & 2FA (`/admin/settings`)**: Agency WhatsApp phone number configuration and TOTP two-factor enrollment.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20+ (v24 recommended)
- **npm**: v10+

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/explorex/explorex.git
cd explorex
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key environment variables:
```env
# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Agency WhatsApp Booking Number (Sri Lanka +94 without plus sign)
NEXT_PUBLIC_AGENCY_WHATSAPP="94771234567"

# Authentication & Sessions
JWT_SECRET="your-super-secret-jwt-signing-key-min-32-chars"

# Database (PostgreSQL / Supabase)
DATABASE_URL="postgresql://postgres:password@localhost:5432/explorex?schema=public"
```

### 3. Running in Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running Unit Tests
ExploreX includes unit tests for the WhatsApp Message Builder, RBAC matrix, and Zod validation schemas:
```bash
npm test
```

### 5. Building for Production
```bash
npm run build
npm run start
```

---

## 🔑 Demo Staff Accounts

ExploreX comes pre-seeded with sample credentials for testing the RBAC matrix (accessible from `/login` with 1-click buttons):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@explorex.lk` | `AdminPass123!` |
| **Manager** | `manager@explorex.lk` | `ManagerPass123!` |
| **Content Editor** | `editor@explorex.lk` | `EditorPass123!` |
| **Support Agent** | `agent@explorex.lk` | `AgentPass123!` |
| **Customer** | `traveler@explorex.lk` | `CustomerPass123!` |

---

## ⚙️ How to Change Branding & WhatsApp Number

### Changing the WhatsApp Booking Number
1. **From Admin Panel (Recommended)**:
   - Log in as Super Admin (`admin@explorex.lk`).
   - Navigate to `/admin/settings`.
   - Update the **Agency WhatsApp Number** field (e.g., `94771234567`) and click **Save Settings**.
   - All WhatsApp buttons across the entire website will immediately target the new number.
2. **From Environment Variables**:
   - Update `NEXT_PUBLIC_AGENCY_WHATSAPP="94XXXXXXXXX"` in `.env`.

### Changing the Logo & Branding
- **Logo SVGs**: Replace `public/logo.svg` (teal primary for light headers) and `public/logo-white.svg` (white for dark footers).
- **Favicon**: Replace `public/favicon.svg`.
- **Agency Name & Tagline**: Update via `/admin/settings` or in `src/data/settings.ts`.

---

## 🛡️ Security Architecture

ExploreX enforces bank-grade security protocols:
- **Strict Transport Security (HSTS)** & CSP headers configured in `next.config.ts`.
- **Bcrypt Password Hashing** (12 salt rounds).
- **Hardware-backed TOTP 2FA** (RFC 6238 / Google Authenticator) with one-time backup recovery codes.
- **Account Lockout**: 5 failed login attempts trigger an automatic 15-minute freeze.
- **Sliding-window rate limiting** on login, registration, and booking endpoints.
- **Sharp image sanitization**: Uploaded images are validated, sanitized, randomized, and converted to optimized WebP.
- Full details documented in [SECURITY.md](SECURITY.md).

---

## 📄 License
ExploreX is proprietary software licensed for ExploreX Travel Agency (Pvt) Ltd, Sri Lanka.
