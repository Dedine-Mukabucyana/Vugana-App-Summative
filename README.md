# VUGANA — Speak Out: GBV Reporting & Support Platform for Rwanda

Vugana ("Speak Out") is a web platform that lets GBV survivors and witnesses in Rwanda report incidents anonymously, track their report using a private code, find their nearest Isange One Stop Centre, and learn their legal rights — all without creating an account or revealing their identity.

**Live demo:** https://vugana-app.vercel.app/

**SRS document:** *(add your SRS Google Doc / PDF link here)*

---

## Project Background

Built as a capstone project by **Dedine Mukabucyana**, African Leadership University, in support of MIGEPROF and Isange One Stop Centres Rwanda.

Gender-based violence remains widespread in Rwanda, and one of the biggest barriers to reporting is fear of being identified. Vugana removes that barrier by offering a fully anonymous digital reporting channel that connects directly to Rwanda's existing Isange One Stop Centre network.

## Core Features

- 🔒 **Anonymous Reporting** — submit a GBV report with no login and no required personal info
- 🔑 **Secret Code Tracking** — every report gets a private tracking code (e.g. `VGN-482910`) to check on progress later
- 🏥 **Isange Centre Locator** — browse Isange One Stop Centres across all 30 districts of Rwanda
- ⚖️ **Rights & Guide** — plain-language explanation of Rwandan Law N°68/2018, plus a self-assessment "Is this abuse?" checklist
- 🌍 **Bilingual** — full English / Kinyarwanda toggle
- 👩🏽‍💻 **Isange Staff Portal** — authorized staff and admins can review reports by district and respond directly to a survivor's tracking code
- 🌙 Light/Dark mode, mobile-responsive layout, and a "Quick Exit" safety button

## Tech Stack

Plain HTML, CSS, and JavaScript — no framework, no build step. Data is currently stored in the browser's `localStorage` as a lightweight prototype data layer (see "Known Limitations" below).

## How to Run This Locally

No installation or dependencies required.

1. Clone or download this repository:
   ```
   git clone https://github.com/Dedine-Mukabucyana/Vugana-App-Summative.git
   ```
2. Open the project folder.
3. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

That's it — the whole app runs client-side.

## How to Deploy Your Own Copy

This project is deployed via **GitHub Pages**:

1. Push the repo to your own GitHub account.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select branch `main`, folder `/ (root)`, then **Save**.
5. GitHub will give you a live URL at `https://<your-username>.github.io/<repo-name>/`.

## Demo Accounts (Staff Portal)

| Role | Passcode |
|---|---|
| Isange Social Worker / Officer | `isange2026` |
| System Administrator | `admin2026` |

## Known Limitations (Prototype Scope)

This is a **frontend prototype built for a course capstone**, not a production system:

- Reports are stored in the browser's `localStorage`, so they are only visible on the device that submitted them — there is no shared backend database yet.
- Staff/admin login is a simple frontend passcode check, not real authentication.
- Kinyarwanda translations are a best-effort draft and should be reviewed by a native speaker before any real-world use.

A production version would need a real backend (API + database + authentication) and HTTPS-encrypted storage, as outlined in the SRS's Security and Non-Functional Requirements sections (NFR 1, NFR 2).

## Project Documents

- **SRS (Software Requirements Specification):** *(link here)*
- **Demo video:** *(link here)*

## Credits

Designed and built by Dedine Mukabucyana — African Leadership University.
