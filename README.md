# Artists of Tomorrow

Artists of Tomorrow is a no-build static website for the AOT nonprofit, its partner school profiles, art competitions, galleries, and the Leaders of Tomorrow sister program. The site is plain HTML, CSS, and JavaScript deployed directly from the repository root.

## Local Preview

Serve the site from the repo root, binding explicitly to loopback so the working tree is not exposed to other devices on the local network:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8080`.

There is no install step, package manager, bundler, or generated build output required for normal development.

## Repository Structure

| Path | Purpose |
| --- | --- |
| `*.html` | Static site pages served directly from the repo root. |
| `css/normalize.css` | HTML5 reset. Do not modify unless intentionally updating the reset. |
| `css/style.css` | Main stylesheet for all pages, components, variables, and responsive rules. |
| `js/` | Browser scripts for shared interactions, privacy consent, analytics, maps, galleries, and page-specific rendering. |
| `images/` | Logos, portraits, artwork, social icons, and gallery assets. |
| `scripts/` | Maintenance scripts, including Latin America gallery data generation. |
| `staticwebapp.config.json` | Azure Static Web Apps routing, 404 rewrite, CSP, and cache headers. |
| `SECURITY.md` | Security threat model, trust boundaries, attack-surface notes, and criticality calibration. |
| `sitemap.xml` | Public root-level routes for search engines. |
| `.github/workflows/` | Azure Static Web Apps deployment workflow. |

## Deployment

Merging to `main` deploys through Azure Static Web Apps. The deployment workflow uses `skip_app_build: true`, so files are published as-is from the repository root.

Any new third-party script, stylesheet, frame, or connection target must be allow-listed in `staticwebapp.config.json` before it will load correctly in production.

See `SECURITY.md` for the site threat model, security review priorities, and risk severity calibration.

## Development Notes

- Keep the site no-build unless the deployment workflow and contributor docs are intentionally changed.
- Add new site styles to `css/style.css`; keep `css/normalize.css` as the reset layer.
- Preserve the shared stylesheet order: `css/normalize.css`, then `css/style.css`.
- Preserve the shared script order on standard pages: `js/main.js`, `js/privacy-notice.js`, `js/analytics-consent.js`, then `js/clarity-helper.js`.
- Header logo images should remain eager-loaded. Images below the fold should use `loading="lazy"`.
- Compress new images before committing, and rename replaced image files when cache-busting matters.
- After a feature or significant structural change, update `AGENTS.md` with any new CSS classes, HTML conventions, page structure decisions, or workflow notes.

## Cleanup Direction

The site intentionally remains static and directly deployable. Future simplification should stay low-risk: prefer shared utilities, clearer initializer functions, CSS consolidation, and documentation updates over introducing a required template or build system.
