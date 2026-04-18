/* ============================================
   SHARED COMPONENTS — components.js
   Edit nav, footer, CTA, project cards here
   and changes apply to every page at once
   ============================================ */

// ── CONFIG ─────────────────────────────────
// Change these values to update across the whole site
const SITE = {
  name: 'acquelyn',
  logo: 'https://jacquxes.github.io/logo.png',
  email: 'hello@jacquelyn.com',
  copyright: '© 2026 · Jacquelyn Tan',

  // Nav links — { label, href }
  // Use full paths like 'index.html#projects' from other pages
  navLinks: [
    { label: 'Home', href: 'https://jacquxes.github.io/' },
    { label: 'Projects', href: 'https://jacquxes.github.io/projects.html' },
    { label: 'Articles', href: 'https://jacquxes.github.io/article.html' },
    { label: 'About', href: 'https://jacquxes.github.io/about.html' },
    { label: 'Contact', href: 'https://jacquxes.github.io/contact.html' },
  ],
};

// ── PROJECT CARDS ───────────────────────────
// Add, remove or edit projects here.
// They will render on any page that calls renderProjectCards()
const PROJECTS = [
  {
    id: 'cpf',
    title: 'Grow with CPF: Reframing retirement for the next generation',
    desc: 'Reframed retirement planning to motivate young adults to start saving.',
    meta: 'Product Design',
    year: '2025',
    tags: ['ux', 'data', 'strategy'],
    image: 'https://jacquxes.github.io/thumbnail-cpf.png',
    href: 'https://jacquxes.github.io/projects/cpf.html',
    featured: true,
  },
  {
    id: 'neighbourhood',
    title: 'Neighbourhood: From vague problem to meaningful product',
    desc: 'Designed community networking product to help neighbours connect with each other.',
    meta: 'Product Design',
    year: '2025',
    tags: ['ux', 'research'],
    image: 'https://jacquxes.github.io/thumbnail-neighbours.png',
    href: 'https://jacquxes.github.io/projects/neighbourhood.html',
    thumbClass: 'project-thumb-alt',
  },
  {
    id: 'kinokuniya',
    title: 'Kinokuniya: Adapting design cross-culturally',
    desc: 'Redesigned the Kinokuniya website to make it accessible across languages.',
    meta: 'Design System',
    year: '2025',
    tags: ['ux'],
    image: 'thumbnail-kinokuniya.png',
    href: 'https://jacquxes.github.io/projects/kinokuniya.html',
    thumbClass: 'project-thumb-alt',
  },
  {
    id: 'paylah',
    title: 'PayLah: Surfacing hidden user insights',
    desc: 'Applied quantitative and qualitative research methods to improve user experience.',
    meta: 'UX Research',
    year: '2025',
    tags: ['ux', 'research'],
    image: 'thumbnail-paylah.png',
    href: 'projects/paylah.html',
    thumbClass: 'project-thumb-alt',
  },
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard redesign: Making data actually useful',
  //   desc: 'Redesigned an internal analytics dashboard to surface insights that teams actually act on.',
  //   meta: 'Data',
  //   year: '2024',
  //   tags: ['data', 'strategy'],
  //   thumbStyle: 'background: linear-gradient(135deg, #D6D9EE 0%, #C9B8F5 100%);',
  //   href: '#',
  // },
  // {
  //   id: 'research',
  //   title: 'Understanding the first-time investor: A research study',
  //   desc: 'Conducted 20 user interviews to map the mental models of people investing for the first time.',
  //   meta: 'Research',
  //   year: '2024',
  //   tags: ['research'],
  //   thumbStyle: 'background: linear-gradient(135deg, #C8E000 30%, #D6D9EE 100%);',
  //   href: '#',
  // },
  // {
  //   id: 'strategy',
  //   title: '0 to 1: Building a product strategy from scratch',
  //   desc: 'Defined the product vision, OKRs and roadmap for a new fintech feature from zero.',
  //   meta: 'Strategy',
  //   year: '2023',
  //   tags: ['strategy', 'data'],
  //   thumbStyle: 'background: linear-gradient(135deg, #141A4A 0%, #1E2A6E 100%);',
  //   href: '#',
  // },
];

// ── RENDER HELPERS ──────────────────────────

function renderNav(activePage) {
  const links = SITE.navLinks.map(link => {
    const isActive = link.label === activePage ? 'class="active"' : '';
    return `<li><a href="${link.href}" ${isActive}>${link.label}</a></li>`;
  }).join('\n    ');

  const mobileLinks = SITE.navLinks.map(link =>
    `<a href="${link.href}">${link.label}</a>`
  ).join('\n  ');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav>
      <a href="index.html#hero" class="nav-logo">
        <img src="${SITE.logo}" alt="Logo">
        ${SITE.name}
      </a>
      <ul class="nav-links">
        ${links}
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
    </div>
  `;

  // Wire up hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

function renderFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
    <footer>
      <span class="footer-name">
        <img src="${SITE.logo}" alt="Logo">
        ${SITE.name}
      </span>
      <span class="footer-copy">${SITE.copyright}</span>
    </footer>
  `;
}

function renderCTA() {
  document.getElementById('cta-placeholder').innerHTML = `
    <div class="cta">
      <div class="cta-icon">
        <span class="material-symbols-outlined">mail</span>
      </div>
      <h2 class="cta-title">Let's work together</h2>
      <p class="cta-sub">I'm currently available for freelance projects. Let's chat about how we can create something amazing together.</p>
      <a href="mailto:${SITE.email}" class="btn btn-primary">Get in touch →</a>
    </div>
  `;
}

// Renders a single project card.
// Pass featured:true for the wide layout used on projects.html
function projectCardHTML(project, featured = false) {
  const thumb = project.image
    ? `<img src="${project.image}" alt="${project.title}">`
    : '';

  const thumbStyle = project.thumbStyle ? `style="${project.thumbStyle}"` : '';
  const thumbClass = `project-thumb ${project.thumbClass || ''}`;

  const tagLabels = { ux: 'UX Design', research: 'Research', strategy: 'Strategy', data: 'Data' };

  const tags = project.tags.map(t =>
    `<span class="tag" data-tag="${t}">${tagLabels[t] || t}</span>`
  ).join('');

  const featuredClass = featured ? ' featured' : '';

  return `
    <a href="${project.href}" class="project-card${featuredClass} fade-up" data-tags="${project.tags.join(',')}">
      <div class="${thumbClass}" ${thumbStyle}>
        ${thumb}
        ${featured ? '<span class="project-thumb-tag">Featured</span>' : ''}
      </div>
      <div class="project-info">
        <p class="project-meta">
          ${project.meta} <span class="dot"></span> ${project.year}
        </p>
        <h2 class="project-name">${project.title}</h2>
        <p class="project-desc">${project.desc}</p>
        <div class="project-tags">${tags}</div>
        <span class="project-link">
          View case study →
        </span>
      </div>
    </a>
  `;
}

// Renders the first N projects into a container.
// Set featured:true to make the first card span full width.
function renderProjectCards(containerId, { limit = PROJECTS.length, featured = false } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const subset = PROJECTS.slice(0, limit);
  container.innerHTML = subset.map((p, i) =>
    projectCardHTML(p, featured && i === 0)
  ).join('');
}

// ── SHARED BEHAVIOURS ───────────────────────

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}