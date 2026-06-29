# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Workflow Rule

After completing any feature or significant change, update the relevant sections of this file to reflect what changed — new CSS classes, HTML conventions, page structure decisions, etc.

## Previewing the Site

No build step — the site is plain HTML/CSS/JS. Serve it locally with an explicit loopback bind so the repository working tree is not exposed to other devices on the local network:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080
```

Kill the server when done: `kill %1`

## Deployment

Merging to `main` automatically deploys to **Azure Static Web Apps** via `.github/workflows/azure-static-web-apps-kind-glacier-0be94221e.yml`. The workflow sets `skip_app_build: true` because there is no build step — files are deployed as-is from the repo root. Keep GitHub-owned workflow actions on Node 24-compatible majors (for example `actions/checkout@v5`) to avoid runner deprecation warnings.

## Editor Time Tracking

The repo root includes `.wakatime-project` with the single-line project name `Artists-of-Tomorrow`. Keep this file tracked so WakaTime can identify the project even when an editor or extension does not infer the Git repository name correctly.

## CSS Architecture

There are two CSS files loaded in order on every page:

| File | Purpose |
|------|---------|
| `css/normalize.css` | HTML5 reset only — do not modify |
| `css/style.css` | All base styles (~3,500 lines). Contains CSS custom properties, component styles, and all responsive breakpoints. ||

**CSS variables** are declared in `:root` inside `style.css`. The brand palette is:
- `--salmon` / `--salmon-bright` / `--salmon-dark` — primary coral colour
- `--purple` / `--purple-bright` / `--purple-dark` — lavender accent
- `--blue` / `--blue-bright` / `--blue-dark` — secondary blue
- `--pink`, `--yellow`, `--peach`, `--peach-light` — supporting tones
- `--font-heading`: `Playfair Display` (serif, for headings)
- `--font-body`: `Plus Jakarta Sans` (sans-serif, for body copy)

**LOT-specific variables** (scoped to `.lot-site` body class, declared in the same `:root`):
- `--lot-gold` / `--lot-gold-light` / `--lot-gold-muted` — gold accent palette
- `--lot-font-heading`: `Playfair Display` (same as AOT heading font)
- `--lot-white` — off-white for LOT text

When adding new styles, use `style.css` for all rules — there is no separate override file.

## JavaScript Architecture

All interactive behaviour lives in `js/main.js` (single `DOMContentLoaded` listener). Key responsibilities:

- **Scroll-reveal animations** — one shared `IntersectionObserver` adds `.is-visible` to `[data-animate]` elements and `.in-view` to `.fade-in` elements; stagger delay is set via `--reveal-delay` CSS custom property on `[data-animate-group]` children.
- **Header scroll effects** — adds `.scrolled` class to `<header>` on scroll.
- **Mobile navigation** — hamburger toggle (`#navToggle`) controls `nav.expanded` / `nav.collapsed` classes; submenus use `.has-submenu.open`.
- **Gallery modal** — opens a lightbox (`#galleryModal`) for journey-page artwork; keyboard and focus-trap logic included.
- **Prize card tilt** — `mousemove` 3-D CSS transform effect on `.prize-card` elements, gated to fine-pointer hover devices and skipped for reduced-motion users.
- **Horizontal scroll carousels** — `scroll-snap` based, with prev/next buttons and requestAnimationFrame-scheduled resize handling.
- **Button pointer effect** — `addButtonEffects()` uses delegated document listeners to update pointer-position CSS variables for `.cta-button` / `.secondary-button`, gated to fine-pointer hover devices and skipped for reduced-motion users.

`js/privacy-notice.js` manages the cookie-consent banner (`.cookie-consent`) and must keep the banner visible/dismissible even when `localStorage` is unavailable.
`js/clarity-helper.js` wraps Microsoft Clarity event tracking.

## Shared Header

Both AOT and LOT pages use the same `.lot-site-header` / `.lot-site-header-inner` markup. Key implementation notes:

- **`nav` is absolutely positioned** (`position: absolute; top: 100%`) — it is out of the flex row entirely so the hamburger always sits at the far right via `margin-left: auto` on `.nav-toggle`. Do not change `nav` back to a flex member.
- **Animated gold bar** — rendered via `body:not(.lot-site) .lot-site-header::after` (4px, animated gradient). LOT pages get no header bar; they use `.lot-hero::after` instead. Do not add a generic `.lot-site-header::after` rule or it will double-stack on AOT pages.
- **Mobile (≤768px)** — `.lot-back-link-text` and `.lot-brand-text` are hidden (`display: none`); only logos and the hamburger show. `.lot-site-header-inner` uses `flex-wrap: nowrap`.
- **Hamburger dimensions** — `.nav-toggle` / `.lot-nav-toggle`: 44×44px, gap 8px, bars 28×3px. X-animation offsets are `translateY(±11px)` (bar height 3px + gap 8px = 11px).

## Shared Footer (AOT pages)

All AOT pages share an identical footer structure. Key conventions:

- **Quick Links** use class `footer-links` (not `footer-nav`) with a child `<ul class="quick-links-list" data-animate-group>`. Each `<li><a>` carries `data-animate` to pick up the `quickLinkGlow` stagger animation.
- **"Leaders of Tomorrow" is intentionally absent** from the Quick Links on all AOT pages. Do not re-add it.
- **Contact section** (`footer-contact` > `social-links`) lists: AOT logo email → Instagram → TikTok → GoFundMe (Support Us). TikTok goes between Instagram and GoFundMe.

## LOT Footer

The `leaders-of-tomorrow.html` footer uses `.lot-site-footer` > `.lot-footer-grid` (4-column). Key conventions:

- **Brand block** uses `images/Toastmasters_2011.png` (48×48px) — not the SVG icon. Do not revert to the inline SVG.
- **Brand text** (`.lot-footer-brand strong`) is gold (`var(--lot-gold)`), Playfair Display. The tagline (`span`) is 65% white opacity, semibold.
- **Footer links and contact links** use `var(--lot-font-heading)` (Playfair Display) at 0.92rem, 75% white opacity for a less generic appearance.

## HTML Page Conventions

Every page links stylesheets in this order and the shared JS files at the bottom of `<body>`:

```html
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/style.css">
...
<script src="js/main.js"></script>
<script src="js/privacy-notice.js"></script>
<script src="js/analytics-consent.js"></script>
<script src="js/clarity-helper.js"></script>
```

Scroll-reveal: add `data-animate` to any element that should fade+rise in on scroll; wrap siblings in a `data-animate-group` parent for automatic stagger.

Page-specific headers use `.page-header > h1`; the homepage uses `.hero` with `.hero-title-word--artists/--of/--tomorrow` spans for per-word colour styling.

`submission.html` restores the competition registration workflow. Its header and AOT footer Quick Links include “Submit Your Art,” and its primary CTA opens the Google Form (`https://forms.gle/UDm5e8ZTyvsAxjyQA`) in a new tab so students can receive the unique submission number referenced by the competition rules. Keep the parent/guardian permission notice and Privacy Policy link near the CTA because submissions may include minors' personal information and scanned artwork.

**Lazy loading:** All `<img>` tags below the fold carry `loading="lazy"`. The sole exception is the `<img>` inside `<header>` (the nav logo) which must remain eager. Do not add `loading="lazy"` to header images and do not remove it from any other `<img>` tag.

## Content Security Policy

The CSP is set globally in `staticwebapp.config.json` (not in HTML meta tags). Any new third-party scripts, styles, or frames must be explicitly allow-listed there before they will load in production.

## Security Threat Model

`SECURITY.md` documents the site threat model, trust boundaries, attack-surface notes, and criticality calibration. Update it whenever a change materially alters CSP/header policy, third-party services, donation/form destinations, privacy-sensitive content handling, gallery data rendering, CDN image handling, or deployment exposure.

## Repository Secret Safeguards

`.gitignore` must keep local environment files out of version control, including `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, and `.env.production.local`, so local secrets and deployment configuration are not accidentally committed or served with the static site.

## Error Handling & Sitemap

`staticwebapp.config.json` rewrites Azure Static Web Apps 404 responses to `404.html`. Keep that file present, `noindex`, and aligned with the standard AOT header/footer conventions. Because the rewrite preserves the originally requested missing URL in the browser, `404.html` must use root-relative internal asset, image, script, and navigation URLs (for example `/css/style.css`, `/js/main.js`, and `/index.html`) so nested missing paths still load correctly. The 404 page uses `.error-page-section`, `.error-page-card`, `.error-page-kicker`, and `.error-page-actions` styles in `css/style.css`.

`sitemap.xml` lists root-level public HTML routes only (for example `/about.html`, not `/pages/about.html`) and intentionally excludes `404.html`. Update it when adding, removing, or renaming public pages.

## Caching

`staticwebapp.config.json` sets `Cache-Control` headers via the `routes` array:

| Route | Header | TTL |
|-------|--------|-----|
| `/images/*` | `public, max-age=86400` | 1 day |
| `/css/*` | `public, max-age=86400` | 1 day |
| `/js/*` | `public, max-age=86400` | 1 day |

Images are cached for 1 day because image filenames are stable and may be replaced in place when youth-program or partner-school content needs correction or removal. Use renamed/versioned filenames for assets that are safe to cache for longer periods.

## Images

Images live in `images/` with subdirectories for `compnathupur/` (event photos used in the carousels) and root-level files for portraits, winner artwork, and social icons.

- **Logo:** `images/logo.svg` — used in the header `<img>` and footer on every page.
- **Favicon:** `images/logo-favicon.png` (64×64 PNG, ~12KB) — linked via `<link rel="icon">` on every page. Do not revert this to the SVG; the SVG is 2.5MB and would be fetched separately for every browser tab.
- **Portraits:** WebP format. `mishika.webp` (not `.jpg` or `.png`).
- **Competition Galleries & Carousels:** WebP format. Images in `images/compnathupur/` and school profiles utilize WebP directly without legacy fallbacks.

**Git-ignored Latin America Images & Cloudflare CDN:**
* The `images/latin-america/` folder contains 1,000+ files and is intentionally git-ignored.
* In production, these images are hosted on a Cloudflare CDN (e.g. Cloudflare Pages or Cloudflare R2).
* All references to `images/latin-america/...` in `js/latin-america-gallery-data.js` are resolved dynamically through the `resolveImagePath` function.
* The CDN base URL is configured globally via `window.AOT_CDN_BASE_URL` in `js/main.js`. If this configuration variable is empty, it falls back to relative local paths (for local development).

**Adding new images:** compress before committing. Use macOS `sips`:

```bash
# Resize to max 1200px, JPEG quality 82 (portraits/event photos)
sips -s format jpeg -s formatOptions 82 -Z 1200 input.jpg --out output.jpg

# Resize to max 1600px, JPEG quality 85 (artwork/winner images)
sips -s format jpeg -s formatOptions 85 -Z 1600 input.jpg --out output.jpg

# Convert PNG → JPEG (for photos — do not do this for logos or graphics with transparency)
sips -s format jpeg -s formatOptions 82 input.png --out output.jpg
```

All images in `images/` are served with a 1-day browser cache so replacements and removals can propagate promptly. See the [Caching](#caching) section for implications when replacing files.

## Leaders of Tomorrow Page

`leaders-of-tomorrow.html` is a separate branded sub-site. Its `<body>` carries class `lot-site`, which scopes all LOT-specific CSS.

**Content decisions (do not revert):**
- Club Roles cards have no emoji icons — they were removed by design.
- Speech Categories shows 3 cards only: Impromptu Speaking, Prepared Speech, Table Topics. "Professional Speaking" and "Structured Debate" were removed.
- Speech grid uses `grid-template-columns: repeat(3, minmax(0, 320px)); justify-content: center` to keep 3 cards centered.
- "Get in Touch" CTA links to the Google Form (`https://forms.gle/JoZpv3fG9Fz5vV6E8`), opens in a new tab.

## School Profiles & Galleries

### Asia Partner School Profile (`nathupur-asia.html`)
- Structured with two divisions: Middle School and High School.
- Does not contain a local winner grid. All winner artwork is showcased in the shared `asia-competition-gallery.html`.
- Displays student artwork submissions using a photo carousel (37 submissions total per division).
- The dynamic subheader reads `37 student submissions.` (matching the Latin America format).
- Accessible controls and tracks have labels updated from "photo gallery" to "student artwork gallery".

### Latin America Partner School Profile (`latin-america-school.html`)
- Displays age range divisions dynamically (e.g. `Ages 8-11, 12-15`, omitting categories with 0 submissions).
- The count banner displays student submission count dynamically (e.g. `6 student submissions.`).
- Shared Latin America school metadata in `js/school-data.js` intentionally excludes school-level latitude/longitude; do not add precise coordinates there without privacy review and partner consent.

### Global Journey Map (`our-journey.html` / `js/map-init.js`)
- The map may show precise pins for the public Nathupur campus profiles only.
- Latin America partner coverage is represented by coarse country-level region markers and counts, not individual school coordinates, to avoid publishing sensitive youth-program location data.

### Latin America Competition Gallery (`latin-america-competition.html`)
- Country honorable mentions are rendered dynamically by `js/latin-america-competition.js` inside `[data-country-honorable-groups]`.
- `.latin-america-winners .honorable-section-header` intentionally overrides the global `.section-header` rhythm so the "Country Honorable Mentions" heading has clear separation from regional placement cards without doubling the gap before the first country group.
