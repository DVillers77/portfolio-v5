## 🔄 System Migration & Refactor (Dec 2025 - Jan 2026)

Currently undergoing a major architectural refactor to transition from a
localized "Fix-and-Patch" workflow to a **Semantic Design System**.

- **Goal:** Implement Material 3 (M3) logic and Tokenized CSS.
- **Status:** Moving to Agentic IDE (Antigravity) to preserve structural
  integrity and eliminate AI regressions.

# Portfolio: UX-Driven Front-End Development

A professional portfolio showcasing skills in HTML5, CSS3, and Vanilla
JavaScript, with a strong emphasis on user experience (UX), performance, and
accessibility (A11y).

---

## 🚀 Key Features & Technical Highlights

This project demonstrates a rigorous, clean approach to front-end development,
focusing on stability and maintainability.

### Architecture & Design

- **Dual Expertise:** Serves as a direct showcase for both UX design philosophy
  and robust front-end implementation.
- **Design System Implementation:** Now features a complete, centralized
  **Design System** utilizing **CSS Custom Properties** for the entire **Color
  Palette** and a consistent **Typography System** (Poppins & Inter).
- **Modern Typography:** Implements the **Poppins** typeface for all
  **Display/Headlines** and the **Inter** typeface for **Body/UI Text**,
  ensuring a professional and legible aesthetic across all pages.
- **Performance Optimization:** Aggressively optimized image assets and utilizes
  resource hints (`<link rel="preconnect">`) for fast loading.

### Accessibility (A11y)

- **ARIA-Compliant Modal:** The Contact Modal includes **full focus trapping**
  (keyboard navigation locked inside the modal) and **scroll locking** (prevents
  background scrolling), adhering to WAI-ARIA standards.
- **Accessible Dynamic Content:** The project slideshow uses ARIA attributes
  (`aria-current`, `aria-live`) to ensure dynamic content changes are announced
  to screen readers.
- **Synchronized Mobile Navigation:** The mobile toggle button's `aria-expanded`
  state is programmatically synchronized with the navigation's visual state,
  guaranteeing **state accuracy** for screen readers.

### Vanilla JavaScript Implementation

- **Robust Scroll & Focus:** The custom `setupAnchorHandler` function prevents
  URL corruption via `e.preventDefault()` and ensures **smooth scroll stability
  and correct keyboard focus** via a deferred focus call, eliminating browser
  jump artifacts.
- **Complex Modal Logic:** Manages the full lifecycle of the Contact Modal,
  including display, close logic (button/escape key/click-outside), and scroll
  management persistence, DOM manipulation, and user input validation.

---

## 🛠️ Project Modules

| Module              | Description                                                                                                        | Repository                                 | Live Demo                |
| :------------------ | :----------------------------------------------------------------------------------------------------------------- | :----------------------------------------- | :----------------------- |
| **Contact Modal**   | Implements a fully accessible, keyboard-trapped modal using vanilla JS for form submission and scroll-locking.     | [Link to Repository]                       | [Link to Live Demo]      |
| **Image Slideshow** | Custom, accessible slideshow with keyboard controls (Arrow Keys) and dynamic ARIA updates for screen reader users. | Included in the main portfolio repository. | N/A (Integrated feature) |

**(NOTE: Update the [Link to Repository] and [Link to Live Demo] fields before
publishing.)**

---

## ⚠️ Development Notes (Known Compromise)

This section documents the specific technical compromise made to ensure
cross-browser stability, showcasing a transparent approach to problem-solving.

### Scroll Anchor Stability Issue

The smooth scrolling for internal anchor links (like the dynamic slideshow title
link) presented a conflict with browser history.

- **Problem:** The browser's native link click was silently recording the URL
  hash (`#section-id`), causing the page to abruptly **jump to the wrong
  position upon refresh**.
- **Solution:** The custom **`setupAnchorHandler`** function uses
  `e.preventDefault()` to block the URL update and `setTimeout(0)` to reliably
  defer the focus state.
- **Current Compromise:** This solution successfully prevents URL corruption and
  the refresh jump. A minimal, negligible flicker remains only after **multiple,
  rapid, consecutive refreshes**—a low-impact race condition that is the stable
  compromise for this specific browser behavior.
