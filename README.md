# Conrad Linus Muhirwe, personal site

Portfolio for a data scientist and AI engineer: **I build AI systems that show their work.**

Live: https://conradlinusmuhirwe.netlify.app/

## Pages

| Path | Contents |
|---|---|
| `/` | Thesis, three selected projects, four more, experience, contact |
| `/work/scorecard-explorer` | Case study: LLM analyst over the World Bank Group Corporate Scorecard, with the grounding eval |
| `/work/crpd-dashboard` | Case study: RAG platform for the UN CRPD reporting cycle |
| `/work/contract-review` | Case study: durable contract review workflow with a human sign-off |

## Stack

- [Astro](https://astro.build) 7, static output, no client framework. The only scripts are the theme toggle and Google Analytics.
- Self-hosted fonts from Fontsource: Manrope (headlines and text), DM Mono (labels).
- Light and dark themes from CSS tokens in `src/styles/global.css`; follows the system setting until the visitor picks one.
- WCAG 2.2 AA: axe reports zero violations on every page in both themes at desktop and phone widths; `prefers-reduced-motion` is respected.
- Hosted on Netlify; build settings live in `netlify.toml`.

## Layout

```
src/
  layouts/Base.astro        head, meta, header, footer, theme toggle
  layouts/CaseStudy.astro   case study page template
  pages/index.astro         home page
  pages/work/*.astro        case studies
  pages/404.astro
  styles/global.css         design tokens and shared styles
public/
  images/work/              project screenshots (webp, 800 and 1600 px)
  og/                       1200x630 share images, one per page
  favicon.svg, apple-touch-icon.png, robots.txt, sitemap.xml
```

## Run locally

Needs Node 22.23 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/
```

## Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md).

## Contact

[linusconradm@gmail.com](mailto:linusconradm@gmail.com) · [LinkedIn](https://www.linkedin.com/in/Conrad-Linus-m) · [GitHub](https://github.com/LinusConradM)

All content © Conrad Linus Muhirwe.
