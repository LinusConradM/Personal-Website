// ── Tab switching ──
function showTab(tabName, el) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-item').forEach(m => {
    m.classList.remove('active');
    m.setAttribute('aria-selected', 'false');
    m.tabIndex = -1;
  });
  document.getElementById(tabName).classList.add('active');
  const menuEl = el || [...document.querySelectorAll('.menu-item')].find(
    m => m.getAttribute('data-tab') === tabName
  );
  if (menuEl) {
    menuEl.classList.add('active');
    menuEl.setAttribute('aria-selected', 'true');
    menuEl.tabIndex = 0;
  }
  // Hide popup and scroll to the tab ribbon (desktop + mobile)
  const popup = document.getElementById('nav-popup');
  if (popup) {
    popup.classList.remove('visible');
    popup.inert = true;
  }
  const content = document.querySelector('.content');
  if (content) content.scrollTop = 0;
  // On mobile the window scrolls; scroll so the tab ribbon (not the sidebar) is at the top
  if (window.innerWidth <= 900) {
    const tabRibbon = document.querySelector('.menu');
    if (tabRibbon) tabRibbon.scrollIntoView({ behavior: 'instant' });
  }
  if (window.checkNavPopup) window.checkNavPopup();
  // GA4: track which tab was viewed
  if (typeof gtag === 'function') {
    gtag('event', 'tab_view', {
      tab_name: tabName
    });
  }
}

// ── Scroll-driven timeline line (lerp — trails behind scroll) ──
(function () {
  const content = document.querySelector('.content');
  const timeline = document.querySelector('.timeline');
  if (!content || !timeline) return;

  // Lower = slower / further behind scroll  (0.015 ≈ ~1.5% of gap closed per frame)
  const LERP = 0.015;

  let target = 0;   // where the line should eventually reach
  let current = 0;   // where the line actually is right now
  let rafId = null;

  // Works for both desktop (content div scrolls) and mobile (window scrolls)
  // by using viewport-relative positions from getBoundingClientRect
  function calcTarget() {
    const timelineRect = timeline.getBoundingClientRect();
    const timelineH = timeline.offsetHeight;
    const viewportH = window.innerHeight;
    const scrolledPast = viewportH - timelineRect.top;
    return Math.min(Math.max(scrolledPast / timelineH, 0), 1);
  }

  function tick() {
    current += (target - current) * LERP;
    timeline.style.setProperty('--line-height', (current * 100).toFixed(3) + '%');

    if (Math.abs(target - current) > 0.0003) {
      rafId = requestAnimationFrame(tick);
    } else {
      current = target;
      timeline.style.setProperty('--line-height', (current * 100) + '%');
      rafId = null;
    }
  }

  function onScroll() {
    target = calcTarget();
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // Listen on both the content div (desktop) and window (mobile)
  content.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initialise without animation
  target = current = calcTarget();
  timeline.style.setProperty('--line-height', (current * 100) + '%');
})();

// ── Resume PDF download via html2pdf.js ──
// Auto-populates the PDF projects section from the live page content.
// Caps project count and truncates descriptions to keep the PDF at 2 pages.
function buildPdfProjects() {
  var MAX_PROJECTS = 4;        // hard cap — keeps PDF within 2 pages
  var MAX_SUMMARY_CHARS = 200; // truncate long descriptions for compactness

  var container = document.getElementById('pdf-projects');
  if (!container) return;

  // Clear any previously generated entries
  container.innerHTML = '';

  // Read project cards from the visible Projects tab (capped at MAX_PROJECTS)
  var cards = Array.prototype.slice.call(
    document.querySelectorAll('#projects .project-card'), 0, MAX_PROJECTS
  );
  if (!cards.length) return;

  // The heading lives here, not in index.html, so it never appears without entries
  var heading = document.createElement('h2');
  heading.style.cssText = 'font-size:11.5px;font-weight:700;color:#1A237E;text-transform:uppercase;letter-spacing:1px;border-bottom:1.5px solid #C5CAE9;padding-bottom:3px;margin:0 0 7px 0;';
  heading.textContent = 'Featured Projects';
  container.appendChild(heading);

  cards.forEach(function (card, i) {
    var title = (card.querySelector('.project-banner h3') || {}).textContent || '';
    var toolsEl = card.querySelector('.project-body .tools');
    var tools = toolsEl ? toolsEl.textContent.replace(/^Tools:\s*/i, '') : '';
    var link = card.querySelector('.learn-more');
    var href = link ? link.href : '';

    // Build a short summary from the first <p> that isn't the tools line
    var paragraphs = card.querySelectorAll('.project-body > p');
    var summary = '';
    for (var j = 0; j < paragraphs.length; j++) {
      if (!paragraphs[j].classList.contains('tools')) {
        summary = paragraphs[j].textContent.trim();
        break;
      }
    }
    // Truncate to keep the PDF compact
    if (summary.length > MAX_SUMMARY_CHARS) {
      summary = summary.substring(0, MAX_SUMMARY_CHARS).replace(/\s+\S*$/, '') + '\u2026';
    }

    var entry = document.createElement('div');
    entry.style.marginBottom = (i < cards.length - 1) ? '7px' : '0';

    var headerRow = document.createElement('div');
    headerRow.style.cssText = 'display:flex;justify-content:space-between;align-items:baseline;';
    headerRow.innerHTML =
      '<span style="font-weight:700;font-size:11.5px;color:#1A237E;">' + title + '</span>' +
      (href ? '<a href="' + href + '" style="font-size:10.5px;color:#3949AB;text-decoration:underline;">&#128279; View Project</a>' : '');

    var desc = document.createElement('div');
    desc.style.cssText = 'font-size:11px;color:#455A64;line-height:1.4;margin-top:3px;';
    desc.textContent = summary;

    var techLine = document.createElement('div');
    techLine.style.cssText = 'margin-top:2px;font-size:10.5px;';
    techLine.innerHTML = '<strong style="color:#1A237E;">Tech Stack:</strong> <span style="color:#455A64;">' + tools + '</span>';

    entry.appendChild(headerRow);
    entry.appendChild(desc);
    entry.appendChild(techLine);
    container.appendChild(entry);
  });
}

// html2pdf is large, so it is only fetched the first time someone downloads the PDF
var html2pdfLoader = null;
function loadHtml2pdf() {
  if (!html2pdfLoader) {
    html2pdfLoader = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      s.onload = resolve;
      s.onerror = function () { html2pdfLoader = null; reject(); };
      document.head.appendChild(s);
    });
  }
  return html2pdfLoader;
}

function downloadResumePDF() {
  const btn = document.getElementById('btn-download-pdf');
  const status = document.getElementById('pdf-status');
  const template = document.getElementById('resume-pdf-template');

  btn.disabled = true;
  btn.innerHTML = '<i aria-hidden="true" class="fa fa-spinner fa-spin"></i> Generating PDF\u2026';
  status.style.display = 'block';
  status.textContent = 'Building your resume \u2014 this takes a few seconds\u2026';

  // Auto-populate projects from the live page
  buildPdfProjects();

  // Temporarily make visible for rendering
  template.style.display = 'block';
  template.style.position = 'fixed';
  template.style.left = '-9999px';
  template.style.top = '0';

  const element = template.querySelector('div');

  const opt = {
    margin:       [8, 0, 8, 0],
    filename:     'Conrad_Linus_Muhirwe_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: 'css' }
  };

  loadHtml2pdf().then(function () {
    return html2pdf().set(opt).from(element).save();
  }).then(function () {
    template.style.display = 'none';
    template.style.position = 'absolute';
    btn.disabled = false;
    btn.innerHTML = '<i aria-hidden="true" class="fa fa-download"></i> Download PDF';
    status.textContent = '\u2713 Your resume has been downloaded!';
    setTimeout(() => { status.style.display = 'none'; }, 4000);
  }).catch(function () {
    template.style.display = 'none';
    template.style.position = 'absolute';
    btn.disabled = false;
    btn.innerHTML = '<i aria-hidden="true" class="fa fa-download"></i> Download PDF';
    status.textContent = 'Something went wrong. Please try again.';
  });
}

// ── Contact form: AJAX submission via Formspree ──
(function () {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('cf-status');
  const submitBtn = document.getElementById('cf-submit');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Basic client-side validation
    const name = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const message = form.querySelector('#cf-message').value.trim();
    if (!name || !email || !message) {
      showStatus('error', '<i aria-hidden="true" class="fa fa-exclamation-circle"></i> Please fill in all required fields.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i aria-hidden="true" class="fa fa-spinner fa-spin"></i> Sending\u2026';
    statusEl.className = 'form-status';
    statusEl.style.display = 'none';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showStatus('success', '<i aria-hidden="true" class="fa fa-check-circle"></i> Message sent! I\'ll get back to you soon.');
        form.reset();
      } else {
        const json = await response.json().catch(() => ({}));
        const msg = (json.errors && json.errors.map(e => e.message).join(', ')) ||
          'Something went wrong. Please try again or email me directly.';
        showStatus('error', '<i aria-hidden="true" class="fa fa-exclamation-circle"></i> ' + msg);
      }
    } catch (err) {
      showStatus('error', '<i aria-hidden="true" class="fa fa-exclamation-circle"></i> Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i aria-hidden="true" class="fa fa-paper-plane"></i> Send Message';
    }
  });

  function showStatus(type, html) {
    statusEl.className = 'form-status ' + type;
    statusEl.innerHTML = html;
    statusEl.style.display = 'block';
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();

function goHome() {
  showTab('about', null);
  const content = document.querySelector('.content');
  if (content) content.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.checkNavPopup) window.checkNavPopup();
}

// ── Explore-more popup: show near the end of any tab ──
(function () {
  const content = document.querySelector('.content');
  const popup = document.getElementById('nav-popup');
  if (!content || !popup) return;

  const THRESHOLD = 180; // px from bottom considered "near end"

  function isNearBottomDesktop() {
    const remaining = content.scrollHeight - content.scrollTop - content.clientHeight;
    const fitsInViewport = content.scrollHeight <= content.clientHeight + THRESHOLD;
    return remaining <= THRESHOLD || fitsInViewport;
  }

  function isBottomMobile() {
    const activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel) return false;
    const rect = activePanel.getBoundingClientRect();
    const reachedBottom = rect.bottom <= window.innerHeight + 12; // allow small tolerance
    const scrolledSome = window.scrollY > 40; // avoid showing immediately on load
    return reachedBottom && scrolledSome;
  }

  function checkPopup() {
    const nearEnd = window.innerWidth > 900 ? isNearBottomDesktop() : isBottomMobile();
    popup.classList.toggle('visible', nearEnd);
    popup.inert = !nearEnd;
  }

  // expose so tab switcher can force a recalculation
  window.checkNavPopup = checkPopup;

  content.addEventListener('scroll', checkPopup, { passive: true });
  window.addEventListener('scroll', checkPopup, { passive: true });
  window.addEventListener('resize', checkPopup, { passive: true });
  checkPopup();
})();

// ── Tab button click handlers (attached via data-tab attributes) ──
document.addEventListener('DOMContentLoaded', function () {
  const tabs = [...document.querySelectorAll('.menu-item[data-tab]')];
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      showTab(this.getAttribute('data-tab'), this);
    });
  });

  // Arrow / Home / End keys move between tabs (WAI-ARIA tabs pattern)
  document.querySelector('.menu').addEventListener('keydown', function (e) {
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    let next;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    showTab(tabs[next].getAttribute('data-tab'), tabs[next]);
    tabs[next].focus();
  });
});
