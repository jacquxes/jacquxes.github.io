# Design System — Jacquelyn Portfolio

A reference for the design decisions, tokens, components, and file structure used across this site. Update this file whenever you make a change so it stays in sync.

---

## File Structure

```
index.html       — Homepage (hero, projects preview, articles, about, CTA, footer)
projects.html    — Full projects listing page with filter
styles.css       — All shared styles (edit once, applies everywhere)
components.js    — Shared data and components (nav, footer, CTA, project cards)
master.md        — This file
```

### How pages are built

Each HTML page contains only its own unique content. Everything shared — nav, footer, CTA, project cards — is injected by `components.js` at load time using placeholder `div` tags:

```html
<div id="nav-placeholder"></div>   <!-- nav injected here -->
<div id="cta-placeholder"></div>   <!-- CTA injected here -->
<div id="footer-placeholder"></div> <!-- footer injected here -->
```

At the bottom of each page, call the render functions:
```js
renderNav('Home');       // pass the active page label
renderCTA();
renderFooter();
renderProjectCards('container-id', { limit: 2 }); // limit optional
initScrollAnimations();
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

| Variable         | Value               |
|------------------|---------------------|
| `--font-display` | `'Rubik', sans-serif` |
| `--font-body`    | `'Rubik', sans-serif` |

### Type scale

| Element         | Size                          | Weight | Notes                    |
|-----------------|-------------------------------|--------|--------------------------|
| Hero title      | `clamp(2.4rem, 5vw, 4.2rem)`  | —      | Italic em for accent word |
| Page title      | `clamp(2.2rem, 5vw, 3.8rem)`  | —      | Used on projects.html and article.html |
| Section title   | `clamp(1.8rem, 3vw, 2.8rem)`  | —      | `.section-title`          |
| Project name    | `clamp(1rem, 1.8vw, 1.25rem)` | —      | `.project-name`           |
| Body / bio      | `clamp(0.95rem, 1.5vw, 1.05rem)` | 300 | `.hero-bio`, `.about-text` |
| Nav links       | `0.875rem`                    | 400    |                           |
| Tags / meta     | `0.72rem`                     | 500    | Uppercase, letter-spaced  |
| Footer / small  | `0.8rem`                      | —      |                           |

---

## Icons

Material Symbols Outlined from Google Fonts. All icons must be listed in a single `<link>` tag — multiple tags for the same font family will break them.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=bar_chart_4_bars,co_present,mail,user_attributes,wb_incandescent" />
```

**To add a new icon:** append its name to `icon_names`, separated by a comma.

Usage:
```html
<span class="material-symbols-outlined">icon_name</span>
```

| Icon name          | Used in         |
|--------------------|-----------------|
| `mail`             | CTA section     |
| `bar_chart_4_bars` | Skills — Data   |
| `co_present`       | Skills — Strategy |
| `user_attributes`  | Skills — Research |
| `wb_incandescent`  | Skills — Innovation |

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

### Nav

Rendered by `renderNav(activePage)` in `components.js`. Pass the label of the active page (must match exactly):

```js
renderNav('Home');      // index.html
renderNav('Projects');  // projects.html
```

Nav links are defined in the `SITE.navLinks` array in `components.js`. Edit there to add, remove, or rename links.

The `#nav-placeholder` div is `position: sticky; top: 0; z-index: 100` in `styles.css` — this is what makes the nav sticky since the nav itself is injected dynamically.

---

### Buttons

```html
<a class="btn btn-primary">Label</a>    <!-- dark fill -->
<a class="btn btn-outline">Label</a>    <!-- bordered -->
<a class="btn btn-accent">Label</a>     <!-- accent colour fill -->
```

To prevent a button stretching full width inside a flex column, add:
```html
style="align-self: flex-start;"
```

---

### Project Cards

Cards are driven entirely by the `PROJECTS` array in `components.js`. To add or edit a project, update the array — no HTML changes needed.

```js
{
  id:         'my-project',       // unique identifier
  title:      'Project Title',
  desc:       'Short description.',
  meta:       'UX Design',        // displayed above the title
  year:       '2025',
  tags:       ['ux', 'research'], // must match filter data-filter values
  image:      'thumbnail.png',    // optional — uses gradient if omitted
  thumbClass: 'project-thumb-alt', // optional — alternate gradient
  thumbStyle: 'background: ...',  // optional — custom gradient
  href:       'case-study.html',
  featured:   true,               // optional — makes card full width on projects.html
}
```

**Tag keys** must match the `data-filter` values on filter buttons exactly:

| Tag key      | Display label | Filter button        |
|--------------|---------------|----------------------|
| `ux`         | UX Design     | `data-filter="ux"`   |
| `research`   | Research      | `data-filter="research"` |
| `strategy`   | Strategy      | `data-filter="strategy"` |
| `data`       | Data          | `data-filter="data"` |

To add a new tag/filter, add the key to `tagLabels` in `projectCardHTML()` and add a new filter button in `projects.html`.

---

### Tags

```html
<span class="tag">Label</span>           <!-- default: transparent, bordered -->
<span class="tag accent">Label</span>    <!-- accent: filled with --purple-mid -->
```

On the projects page, the filter script highlights matching tags with the `accent` class when a filter is active, and removes all accents when "All" is selected.

---

### CTA

Rendered by `renderCTA()`. To edit the text or email, update `SITE.email` and the strings inside `renderCTA()` in `components.js`.

---

### Footer

Rendered by `renderFooter()`. Name, logo, and copyright are pulled from the `SITE` config object in `components.js`.

---

## Hero (index.html only)

The hero image uses an arch shape with the photo overlapping it:

```html
<div class="hero-image-wrap">
  <div class="hero-arch"></div>       <!-- purple arch background -->
  <span class="sparkle sparkle-1">✦</span>
  <span class="sparkle sparkle-2">✦</span>
  <img src="hero.png" class="hero-photo"> <!-- photo overlaps arch -->
</div>
```

The arch is `border-radius: 9999px 9999px 0 0`. The photo is `position: absolute; bottom: -20px` so it sits in front of and slightly below the arch. Use a PNG with a transparent background for best results.

---

## Animations

### Fade up on scroll

Add `class="fade-up"` to any element. It becomes visible when it enters the viewport.

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

| Breakpoint   | Changes                                              |
|--------------|------------------------------------------------------|
| `≤ 768px`    | Nav links hidden, hamburger shown; grids go to 1 column; hero stacks vertically |
| `≤ 480px`    | Skills grid goes to 1 column; section header stacks  |

---

## How to make common updates

| Task | Where to edit |
|------|---------------|
| Add / edit a project | `PROJECTS` array in `components.js` |
| Change nav links | `SITE.navLinks` in `components.js` |
| Change email / copyright | `SITE` object in `components.js` |
| Change colours | `:root` variables in `styles.css` |
| Change font | Font `<link>` in each HTML file + `--font-display` / `--font-body` in `styles.css` |
| Add a new icon | Append name to `icon_names` in the Material Symbols `<link>` tag |
| Edit card layout or style | `.project-card` styles in `styles.css` |
| Edit CTA or footer copy | `renderCTA()` / `renderFooter()` in `components.js` |
| Add a new page | Create new `.html` file, link `styles.css` and `components.js`, call render functions |
