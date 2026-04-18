# Design System — Jacquelyn Portfolio

A reference for the design decisions, tokens, components, and file structure used across this site. Update this file whenever you make a change so it stays in sync.

---

## File Structure

```
index.html          — Homepage (hero, projects preview, articles, about, CTA, footer)
projects.html       — Full projects listing with filter
about.html          — Bio, experience timeline, skills, values
contact.html        — Contact form (Formspree + reCAPTCHA v3)
styles.css          — All shared styles (edit once, applies everywhere)
components.js       — Shared data and components (nav, footer, CTA, project cards)
master.md           — This file

case-studies/
├── neighbourhood.html   — Neighbourhood app
├── cpf.html             — Grow with CPF
├── kinokuniya.html      — Kinokuniya design system
└── paylah.html          — DBS PayLah! UX research
```

> Case study files live one level below root and use `../` to reference `styles.css` and `components.js`.

### How pages are built

Each HTML page contains only its own unique content. Everything shared — nav, footer, CTA, project cards — is injected by `components.js` at load time using placeholder `div` tags:

```html
<div id="nav-placeholder"></div>    <!-- nav injected here -->
<div id="cta-placeholder"></div>    <!-- CTA injected here (homepage only) -->
<div id="footer-placeholder"></div> <!-- footer injected here -->
```

At the bottom of each page, call the render functions:
```js
renderNav('Home');       // pass the active page label — must match SITE.navLinks label exactly
renderCTA();             // homepage only
renderFooter();
renderProjectCards('container-id', { limit: 2 }); // homepage: limit to 2; projects.html: omit limit
initScrollAnimations();
```

Case study pages do not call `renderCTA()` — they use inline CTA buttons instead.

---

## Nav links

Defined in `SITE.navLinks` in `components.js`. Current config:

| Label | href | Active on |
|-------|------|-----------|
| Home | `index.html#hero` | `index.html` |
| Projects | `projects.html` | `projects.html`, case study pages |
| Articles | `index.html#articles` | — |
| About | `about.html` | `about.html` |
| Contact | `contact.html` | `contact.html` |

The `#nav-placeholder` div has `position: sticky; top: 0; z-index: 100` in `styles.css` — this is what makes the nav sticky when it is injected dynamically.

Pass the matching label to `renderNav()` to highlight the active link:
```js
renderNav('Home');      // index.html
renderNav('Projects');  // projects.html and all case study pages
renderNav('About');     // about.html
renderNav('Contact');   // contact.html
```

---

## Colours

Defined as CSS variables in `styles.css` under `:root`. Change a value here and it updates everywhere.

| Variable         | Value     | Usage                                      |
|------------------|-----------|--------------------------------------------|
| `--navy`         | `#283287` | Primary brand colour, nav logo, buttons, borders |
| `--black`        | `#181A4D` | Headings, body text                        |
| `--gray`         | `#464871` | Secondary text, nav links, descriptions    |
| `--gray-light`   | `#F0F2F2` | Section backgrounds, card backgrounds      |
| `--white`        | `#F7F7F4` | Page background, card backgrounds          |
| `--purple`       | `#9398C3` | Nav link colour, accents                   |
| `--purple-light` | `#D4DEE8` | Card borders, light backgrounds            |
| `--purple-mid`   | `#D4DEE8` | Tag accent background, CTA blobs           |
| `--secondary`    | `#D5B4FB` | Hero arch background, avatar gradient      |

---

## Typography

**Font:** Rubik (Google Fonts) — used for both display and body text.

```html
<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
```

| Variable         | Value                 |
|------------------|-----------------------|
| `--font-display` | `'Rubik', sans-serif` |
| `--font-body`    | `'Rubik', sans-serif` |

### Type scale

| Element         | Size                             | Weight | Notes                     |
|-----------------|----------------------------------|--------|---------------------------|
| Hero title      | `clamp(2.4rem, 5vw, 4.2rem)`     | 800    | Accent word in `<em>`     |
| Page title      | `clamp(2.2rem, 5vw, 3.8rem)`     | 800    | projects.html, about.html |
| Case study title | `clamp(2rem, 4vw, 3.2rem)`      | 700    | `.case-title`             |
| Section title   | `clamp(1.8rem, 3vw, 2.8rem)`     | 800    | `.section-title`          |
| CS section title | `clamp(1.6rem, 3vw, 2.2rem)`    | 700    | `.cs-section-title`       |
| Project name    | `clamp(1rem, 1.8vw, 1.25rem)`    | 700    | `.project-name`           |
| Body / bio      | `clamp(0.95rem, 1.5vw, 1.05rem)` | 300    | `.cs-body`, `.about-text` |
| Nav links       | `0.875rem`                       | 400    |                           |
| Tags / meta     | `0.72rem`                        | 500–600 | Uppercase, letter-spaced |
| Footer / small  | `0.8rem`                         | —      |                           |

---

## Icons

### Material Symbols Outlined

From Google Fonts. All icon names must go in a **single** `<link>` tag — two separate tags for the same font family will break one of them.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=bar_chart_4_bars,co_present,mail,user_attributes,wb_incandescent,arrow_outward" />
```

**To add a new icon:** append its name to `icon_names`, separated by a comma.

Usage:
```html
<span class="material-symbols-outlined">icon_name</span>
```

| Icon name          | Used in                   |
|--------------------|---------------------------|
| `mail`             | CTA section, contact page |
| `arrow_outward`    | Case study next-project card |
| `bar_chart_4_bars` | Skills — Data             |
| `co_present`       | Skills — Strategy         |
| `user_attributes`  | Skills — Research         |
| `wb_incandescent`  | Skills — Innovation       |

### Font Awesome

Used for the LinkedIn icon in `contact.html`. Loaded via kit script:

```html
<script src="https://kit.fontawesome.com/7881900bfb.js" crossorigin="anonymous"></script>
```

Usage:
```html
<i class="fa-brands fa-linkedin"></i>
```

---

## Spacing & Shape

| Variable      | Value   | Usage                        |
|---------------|---------|------------------------------|
| `--radius`    | `16px`  | Cards, large containers      |
| `--radius-sm` | `10px`  | Skill cards, small elements  |

Section padding uses fluid sizing:
```css
section { padding: clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px); }
```

---

## Components

### Buttons

```html
<a class="btn btn-primary">Label</a>    <!-- navy fill -->
<a class="btn btn-outline">Label</a>    <!-- bordered -->
<a class="btn btn-accent">Label</a>     <!-- accent colour fill -->
```

To prevent a button stretching full width inside a flex column:
```html
style="align-self: flex-start;"
```

---

### Project Cards

Cards are driven entirely by the `PROJECTS` array in `components.js`. To add or edit a project, update the array — no HTML changes needed.

```js
{
  id:         'my-project',        // unique identifier
  title:      'Project Title',
  desc:       'Short description.',
  meta:       'UX Design',         // displayed above the title
  year:       '2025',
  tags:       ['ux', 'research'],  // must match filter data-filter values exactly
  image:      'thumbnail.png',     // optional — gradient shows if omitted
  thumbClass: 'project-thumb-alt', // optional — alternate gradient colour
  thumbStyle: 'background: ...',   // optional — custom inline gradient
  href:       'case-studies/case-study.html',
  featured:   true,                // optional — makes card full-width on projects.html
}
```

**Current projects in `PROJECTS` array:**

| id | title | href |
|----|-------|------|
| `cpf` | Grow with CPF | `case-studies/cpf.html` |
| `neighbourhood` | Neighbourhood | `case-studies/neighbourhood.html` |
| `dashboard` | Dashboard redesign | `#` |
| `research` | First-time investor research | `#` |
| `strategy` | 0 to 1 product strategy | `#` |

> `kinokuniya.html` and `paylah.html` still need to be added to the `PROJECTS` array.

**Tag keys** must match `data-filter` values on filter buttons exactly:

| Tag key    | Display label | Filter button            |
|------------|---------------|--------------------------|
| `ux`       | UX Design     | `data-filter="ux"`       |
| `research` | Research      | `data-filter="research"` |
| `strategy` | Strategy      | `data-filter="strategy"` |
| `data`     | Data          | `data-filter="data"`     |

To add a new tag/filter: add the key to `tagLabels` in `projectCardHTML()` in `components.js`, and add a matching filter button in `projects.html`.

---

### Tags

```html
<span class="tag">Label</span>        <!-- default: transparent, bordered -->
<span class="tag accent">Label</span> <!-- accent: filled -->
```

On the projects page, the filter script highlights tags matching the active filter with the `accent` class, and removes all accents when "All" is selected.

---

### CTA

Rendered by `renderCTA()`. To edit copy or email, update `SITE.email` and the strings inside `renderCTA()` in `components.js`.

---

### Footer

Rendered by `renderFooter()`. Name, logo, and copyright are pulled from the `SITE` config object at the top of `components.js`.

---

## Hero (index.html only)

The hero image uses an arch shape with the photo overlapping it:

```html
<div class="hero-image-wrap">
  <div class="hero-arch"></div>
  <span class="sparkle sparkle-1">✦</span>
  <span class="sparkle sparkle-2">✦</span>
  <img src="hero.png" class="hero-photo">
</div>
```

The arch is `border-radius: 9999px 9999px 0 0`. The photo is `position: absolute; bottom: -20px` so it sits in front of and below the arch. Use a PNG with a transparent background for best results.

---

## Contact form (contact.html)

Uses **Formspree** for email delivery and **reCAPTCHA v3** for spam protection. The form submits via `fetch` so the page never redirects.

**Formspree endpoint:** `https://formspree.io/f/xyknvqzo`

**To go live, replace in `contact.html`:**

1. In `<head>`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

2. In the script block:
```js
const RECAPTCHA_KEY = 'YOUR_SITE_KEY';
```

Get your site key from [google.com/recaptcha](https://www.google.com/recaptcha) — choose reCAPTCHA v3, register your domain.

**Also update:** the LinkedIn `href` in the sidebar (`https://linkedin.com` → your actual profile URL).

---

## Case Study pages

Case studies live in a `case-studies/` subfolder and use `../` paths for shared files.

### Page structure

Every case study follows the same shell:

```
Dark navy hero (breadcrumb, title, subtitle, meta row, hero image)
Two-column body (main content + sticky TOC sidebar)
  └── Sections separated by .cs-divider
      └── Next project card at the bottom
Footer (injected, no CTA)
```

### Shared CSS

Every case study copies the full shared CSS block from `case-study-skill/references/components.md` verbatim into its own `<style>` tag. This makes each file self-contained — no dependency on a separate case study stylesheet.

### Script block (all case studies)

```js
renderNav('Projects');
renderFooter();
initScrollAnimations();

// TOC scroll highlighting
const sections = document.querySelectorAll('.cs-section[id]');
const tocLinks = document.querySelectorAll('.toc-link');
const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => tocObserver.observe(s));
```

### Available section components

Full HTML patterns for each are in `case-study-skill/references/components.md`.

| Component | Class / element | Notes |
|-----------|----------------|-------|
| Section wrapper | `.cs-section` | Needs `id` matching TOC href |
| Section label | `.cs-section-label` | Small uppercase category label |
| Section title | `.cs-section-title` | Main heading |
| Body text | `.cs-body` | Light weight, generous line height |
| Overview stats | `.overview-stats` / `.overview-stat` | 3-column grid, always first section |
| Insight cards | `.insight-grid` / `.insight-card` | 3-column, numbered or emoji |
| Two-column text | `.two-col-text` | Side-by-side research sub-sections |
| Quote block | `.cs-quote` | Navy background, italic text |
| Pivot callout | `.pivot-callout` | Lavender background, emoji icon |
| Persona card | `.user-grid` / `.user-persona` | Avatar, quote, tags |
| Objective cards | `.objectives-grid` / `.objective-card` | Left border accent |
| Feature rows | `.feature-list` / `.feature-row` | Alternating left/right with `.reverse` |
| Outcome stats | `.outcome-grid` / `.outcome-card` | Navy background, large numbers |
| Reflection cards | `.reflection-grid` / `.reflection-card` | Add `.highlight` to key card |
| Divider | `.cs-divider` | Between every pair of sections |
| Next project | `.next-project` | Always last inside `<main>` |
| TOC sidebar | `.case-toc` / `.toc-link` | Sticky, highlights on scroll |

### Current case studies

| File | Project | Key page-specific components |
|------|---------|------------------------------|
| `neighbourhood.html` | Neighbourhood app | Standard component set |
| `cpf.html` | Grow with CPF | Interactive savings chart (SVG), objective cards |
| `kinokuniya.html` | Kinokuniya design system | Before/after grid, live type scale table (Noto Sans JP/SC) |
| `paylah.html` | DBS PayLah! UX research | Method cards (qual/quant), heuristic evaluation cards |

---

## Case Study Skill

A packaged skill (`case-study-skill.skill`) generates new case study pages automatically when you drop in images or slides and describe a project.

**To install:** Settings → Skills → upload `case-study-skill.skill`

**To use:** drop an image or slide deck into the chat and describe the project. The skill reads `case-study-skill/references/components.md` for all HTML patterns and CSS, so the output matches the established style automatically.

---

## Animations

Add `class="fade-up"` to any element to animate it in as it enters the viewport.

```html
<div class="fade-up">...</div>
```

Stagger multiple elements with delay helpers:
```html
<div class="fade-up d1">first</div>   <!-- 0.05s delay -->
<div class="fade-up d2">second</div>  <!-- 0.12s delay -->
<div class="fade-up d3">third</div>   <!-- 0.19s delay -->
<div class="fade-up d4">fourth</div>  <!-- 0.26s delay -->
```

Call `initScrollAnimations()` once per page after all content is rendered.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 960px`  | Case study TOC sidebar hidden; some grids go to 2 columns |
| `≤ 768px`  | Nav hamburger shown; hero stacks vertically; most grids go to 1 column |
| `≤ 480px`  | Skills grid 1 column; section headers stack; meta rows tighten |

---

## How to make common updates

| Task | Where to edit |
|------|---------------|
| Add / edit a project card | `PROJECTS` array in `components.js` |
| Change nav links or labels | `SITE.navLinks` in `components.js` |
| Change contact email | `SITE.email` in `components.js` |
| Change copyright text | `SITE.copyright` in `components.js` |
| Change colours | `:root` variables in `styles.css` |
| Change font | Font `<link>` in each HTML file + `--font-display` / `--font-body` in `styles.css` |
| Add a Material Symbol icon | Append name to `icon_names` in the `<link>` tag in that page's `<head>` |
| Edit CTA copy | `renderCTA()` in `components.js` |
| Edit footer copy | `renderFooter()` in `components.js` |
| Add a new standard page | Create `.html`, link `styles.css` and `components.js`, call render functions |
| Add a new case study | Use the case study skill, or follow the shell in this doc. Add to `PROJECTS` in `components.js` |
| Update Formspree endpoint | `FORMSPREE_URL` constant in `contact.html` script block |

---

## Outstanding tasks

| Task | Detail |
|------|--------|
| Add reCAPTCHA site key | Replace `YOUR_SITE_KEY` in `contact.html` — two locations (see Contact form section above) |
| Install case study skill | Upload `case-study-skill.skill` via Settings → Skills |
| Add kinokuniya + paylah to PROJECTS | Add entries to `PROJECTS` array in `components.js` with correct `href` paths |
| Add real images to case studies | See image filename lists in each case study file's comments |
| Update LinkedIn URL | Replace `https://linkedin.com` in `contact.html` sidebar with real profile URL |