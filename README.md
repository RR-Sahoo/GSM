# GSM Solar Light — Website & Staff CMS

Built for **GSM Solar Light** (Mathura, Uttar Pradesh, India) using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and a file-backed JSON store (`data/gsm-store.json`).

## Quick Start

1. Copy `.env.example` to `.env` and update credentials before deployment:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies and start in development or production:
   ```bash
   npm install
   npm run build
   npm run start
   ```
3. Visit:
   - Public website: `http://localhost:3000`
   - Staff CMS: `http://localhost:3000/admin` (defaults in local dev if `.env` is unset: `admin` / `gsm-solar-admin-change-me`)

## CMS Capabilities (`/admin`)

- **Enquiries & Leads**: View leads routed by Customer Type (`Residential`, `Commercial`, `Industrial`, `Dealer`, `Business / Project Partner`), Requirement, Capacity, City, Product Name, and Source Page.
- **Products**: Add, edit, categorize (`Solar Panels`, `Solar Inverters`, `Solar Equipment & Accessories`, `Lithium-Ion Batteries`, `E-rickshaw Chargers`, `Other Power Products`), upload product photos and PDF datasheets.
- **Brands & Partnerships**: Manage **Mtek Power** and **Getsun Power** (current distributors) separately from **UTL** (previous distribution partnership).
- **Projects**: Add and categorize installation photos (`Residential`, `Commercial`, `Industrial`).
- **Settings & Client Confirmation Toggles**:
  - Update official phone, WhatsApp, email, Mathura address, Google Maps link, and GA4 Measurement ID.
  - Toggle `Show Ground-Mounted Solar` (disabled until client confirms).
  - Toggle `Show Project Installation & Execution` (disabled until client confirms).
  - Toggle `Use "Get a Free Consultation"` wording (disabled until client confirms).
  - Toggle `Publish Product Prices publicly` (disabled by default for enquiry-only pricing).

## Backup & Restore (JSON Store + Uploaded Media)

All CMS data lives in `data/gsm-store.json` (or `/tmp/gsm-solar-data/gsm-store.json` on serverless preview hosts) and uploaded files live in `public/uploads/`.

### Backup
```bash
cp data/gsm-store.json "backup-gsm-$(date +%F).json"
tar -czf "backup-uploads-$(date +%F).tar.gz" public/uploads/
```

### Restore
1. Stop the Node process.
2. Replace `data/gsm-store.json` with your backup file and extract `public/uploads/`.
3. Restart the application (`npm run start`).
