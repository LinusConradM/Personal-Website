# Conrad Linus Muhirwe — Personal Portfolio

> Data Scientist · AI Engineer · Data Analyst
> A portfolio showcasing work at the intersection of machine learning, financial operations, and applied AI.

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-0072CE?style=for-the-badge&logo=netlify&logoColor=white)](https://conradlinusmuhirwe.netlify.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://www.netlify.com/)

---

## Preview

**Live site:** https://conradlinusmuhirwe.netlify.app/

The portfolio is a single-page responsive web app featuring a fixed sidebar with profile information and a tabbed main panel covering five sections:

| Section | Contents |
|---|---|
| **About Me** | Professional summary, academic journey, 8-role career timeline, core skills, interests |
| **Projects** | Featured work including the CRPD Disability Rights Dashboard (IDPP), US Food Insecurity Analytics Platform, AI-Powered Federal Financial Reporting Dashboard (Harmonia Holdings), AI Job Tracker agent, and Planit WhatsApp booking assistant |
| **Certifications** | Udemy AI Engineer Track, IBM Data Science (Coursera), CFI FMVA, CFI BIDA |
| **Resume** | Downloadable PDF (generated client-side via html2pdf.js) and online viewer |
| **Contact** | Contact form (Formspree) and direct links |

---

## Features

- **Responsive, mobile-first layout** — sidebar collapses above main content at `<900px`, further condensed below `600px`.
- **Accessible tab navigation** — ARIA roles, keyboard-navigable, visible focus states.
- **Animated scroll-driven timeline** — `requestAnimationFrame` lerp animation for the career timeline.
- **Client-side PDF resume export** — [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) renders a hidden template into a downloadable PDF.
- **AJAX contact form** — [Formspree](https://formspree.io/) integration with no page reload.
- **"Explore more" popup** — context-aware prompt that slides in near the end of each tab's content.
- **Single-file architecture** — all HTML, CSS, and JS live in `index.html` for zero-build simplicity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Markup** | HTML5 (semantic, ARIA-annotated) |
| **Styling** | CSS3 (custom, no framework), CSS custom properties, flexbox + grid, gradients |
| **Scripting** | Vanilla JavaScript (ES6+), no build step |
| **Typography** | [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) |
| **Icons** | [Font Awesome](https://fontawesome.com/) |
| **PDF Export** | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) |
| **Forms** | [Formspree](https://formspree.io/) |
| **Hosting** | [Netlify](https://www.netlify.com/) |

---

## Project Structure

```
personal_website/
├── index.html           # Main file — all HTML, inline CSS, and JS
├── images/              # Profile photo, institution logos, certification badges
├── styles.css           # Legacy (styles are inline in index.html)
├── script.js            # Legacy (scripts are inline in index.html)
├── DEPLOYMENT.md        # Netlify deployment instructions
└── README.md
```

---

## Getting Started

### Run locally

No build step required. Clone and open `index.html` in a browser:

```bash
git clone https://github.com/LinusConradM/personal_website.git
cd personal_website
open index.html          # macOS
# or: xdg-open index.html (Linux) / start index.html (Windows)
```

For live-reload during development:

```bash
npx serve .
# or: python3 -m http.server 8000
```

### Deploy

The site auto-deploys to Netlify on push to `main`. See [DEPLOYMENT.md](DEPLOYMENT.md) for manual drag-and-drop or Git-integrated deployment.

---

## Featured Projects

- **[CRPD Disability Rights Data Dashboard](https://idpp-crpd-dashboard.share.connect.posit.cloud/)** — NLP and AI-powered platform for the full UN Convention on the Rights of Persons with Disabilities reporting cycle. Built at American University's Institute on Disability and Public Policy (IDPP).
- **[US Food Insecurity Analytics Platform](https://conradlinusmuhirwe-feeding-america.share.connect.posit.cloud)** — LLM-powered analytics platform over 15 years of USDA county-level data, with SHAP explainability and Prophet/ARIMA forecasting.
- **AI-Powered Federal Financial Reporting Dashboard** — End-to-end AI automation on AWS for federal compliance reporting at Harmonia Holdings. Reduced manual processing by 80%.
- **[AI Job Tracker & Daily Digest Agent](https://github.com/LinusConradM/job_tracker)** — Autonomous agent with Claude-scored job matching across 50+ sources.
- **[Planit — AI WhatsApp Appointment Booking](https://linusconradm.github.io/planit/)** — Multilingual AI assistant for East African service businesses.

---

## Contact

- **Location:** Washington, DC
- **Email:** [linusconradm@gmail.com](mailto:linusconradm@gmail.com)
- **LinkedIn:** [Conrad Linus Muhirwe](https://linkedin.com/in/Conrad-Linus-m)
- **Portfolio:** [conradlinusmuhirwe.netlify.app](https://conradlinusmuhirwe.netlify.app/)

---

## License

Personal portfolio — all content © Conrad Linus Muhirwe. Code structure available for reference under permissive use.
