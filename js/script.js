// ================================================================
// === 1. GLOBAL STATE & UTILITIES
// ================================================================

/** * SINGLETON REFERENCE: Persistent reference for the dynamically fetched modal.
 * Initialized as null and populated on the first 'Contact' click to avoid
 * redundant network requests.
 */
let modalInstance = null;

/**
 * KINETIC POWER-DOWN: Handles the visual exit sequence.
 * This function triggers the CSS transition before natively closing
 * the dialog to ensure a smooth, high-fidelity departure.
 */
function closeModal() {
  if (!modalInstance) return;

  // Trigger CSS transition (400ms) defined in stylesheet.css
  modalInstance.classList.add("is-closing");
  modalInstance.classList.remove("is-visible");

  setTimeout(() => {
    modalInstance.close();

    // --- RIG CLEANUP: Resetting the Form & HUD ---
    const contactForm = modalInstance.querySelector(".contact-modal__form");
    if (contactForm) {
      contactForm.reset(); // Clears all inputs (Name, Email, Message)

      // Reset the Submit Button state to disabled
      const submitBtn = contactForm.querySelector(".contact-modal__button--submit");
      if (submitBtn) submitBtn.disabled = true;

      // Clear and hide the HUD status bar
      const statusBar = contactForm.querySelector(".contact-modal__status-bar");
      if (statusBar) {
        statusBar.style.display = "none";
        statusBar.innerHTML = "";
      }
    }

    // UI Cleanup
    modalInstance.classList.remove("is-closing");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }, 400);
}

/**
 * UI UTILITY: Toggles the mobile navigation menu (Hamburger Menu).
 * Implements defensive ARIA state management to ensure accessibility.
 */
function toggleMobileNav() {
  const navBar = document.getElementById("myNavbar");
  const navToggleButton = document.querySelector(".navbar__toggle");

  navBar.classList.toggle("responsive");
  const isExpanded = navBar.classList.contains("responsive");
  navToggleButton.setAttribute("aria-expanded", isExpanded);
}

// ================================================================
// === 2. MAIN DOCUMENT INITIALIZATION (DOMContentLoaded)
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
  /**
   * COMPONENT: Slideshow Engine
   * Manages state for the project gallery, including touch gestures
   * and keyboard navigation for a multi-modal user experience.
   */
  function initSlideshow() {
    const slideshowContainer = document.getElementById("slideshow-container");
    const slides = document.querySelectorAll(".slideshow__slide");
    const dots = document.querySelectorAll(".slideshow__dot");
    const slideTitleElement = document.getElementById("slide-title");
    const slideTitleLink = document.getElementById("slide-title-link");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    let slideIndex = 1;
    let touchstartX = 0;
    let touchendX = 0;

    function showSlides(n) {
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;

      slides.forEach((slide) => {
        slide.classList.remove("slideshow__slide--active");
        slide.setAttribute("aria-hidden", "true");
      });
      dots.forEach((dot) => {
        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
      });

      const currentSlide = slides[slideIndex - 1];
      currentSlide.classList.add("slideshow__slide--active");
      currentSlide.setAttribute("aria-hidden", "false");

      dots[slideIndex - 1].classList.add("active");
      dots[slideIndex - 1].setAttribute("aria-current", "true");

      if (slideTitleElement && slideTitleLink) {
        const currentTitle = currentSlide.getAttribute("data-title");
        const currentImage = currentSlide.querySelector(".slideshow__image");
        const currentTarget = currentImage ? currentImage.getAttribute("data-target") : "#";

        slideTitleElement.textContent = currentTitle;
        slideTitleLink.setAttribute("href", currentTarget);
        slideTitleLink.setAttribute("aria-label", `${currentTitle} - View full size uncropped image`);
      }
    }

    if (prevButton) prevButton.addEventListener("click", () => showSlides((slideIndex -= 1)));
    if (nextButton) nextButton.addEventListener("click", () => showSlides((slideIndex += 1)));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlides((slideIndex = i + 1))));

    if (slideshowContainer) {
      slideshowContainer.addEventListener("touchstart", (e) => (touchstartX = e.changedTouches[0].screenX));
      slideshowContainer.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        if (touchstartX - touchendX > 50) showSlides((slideIndex += 1));
        if (touchendX - touchstartX > 50) showSlides((slideIndex -= 1));
      });
    }

    if (slides.length > 0) showSlides(slideIndex);
  }

  /**
   * COMPONENT: Modern Contact Modal (Native <dialog>)
   * * DX NOTE: We use [data-modal-trigger] instead of CSS classes to decouple
   * behavior from styling. This allows the same logic to apply to a Nav Link,
   * a Footer Link, or a primary CTA Button without CSS specificity conflicts.
   */
  async function initContactModal() {
    // 1. DATA-DRIVEN SELECTOR: Target by function, not by look.
    const contactTriggers = document.querySelectorAll('[data-modal-trigger="contact"]');

    async function openModal(e) {
      // PREVENT DEFAULT: Necessary if the trigger is an <a> tag to prevent URL jumps
      if (e) e.preventDefault();

      // 2. SINGLETON PATTERN: Only fetch and inject the modal once per session
      if (!modalInstance) {
        try {
          const response = await fetch("components/contact-modal.html");
          if (!response.ok) throw new Error("Network response was not ok");

          const html = await response.text();
          document.body.insertAdjacentHTML("beforeend", html);

          modalInstance = document.getElementById("contact-modal");

          // UI BINDING: Close icon listener
          const closeBtn = modalInstance.querySelector(".contact-modal__close-icon");
          if (closeBtn) closeBtn.onclick = closeModal;

          // --- FORM VALIDATION RIG ---
          const contactForm = modalInstance.querySelector(".contact-modal__form");
          const submitBtn = contactForm.querySelector(".contact-modal__button--submit");

          /**
           * LOGIC GATE: Syncs button 'disabled' state with HTML5 validation.
           * Modern DX: Rely on browser-native .checkValidity() for lightweight perf.
           */
          const toggleButtonState = () => {
            if (submitBtn && contactForm) {
              submitBtn.disabled = !contactForm.checkValidity();
            }
          };

          // Initialize and listen for input
          toggleButtonState();
          contactForm.addEventListener("input", toggleButtonState);

          // Initialize Submission Handler (Assumes setupFormSubmission exists)
          if (typeof setupFormSubmission === "function") {
            setupFormSubmission(contactForm);
          }

          /**
           * UX GUARDRAIL: Backdrop Dismissal
           * If user clicks the 'air' around the modal on desktop, close it.
           */
          modalInstance.addEventListener("click", (event) => {
            if (window.innerWidth > 809) {
              const rect = modalInstance.getBoundingClientRect();
              const isInDialog =
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom &&
                event.clientX >= rect.left &&
                event.clientX <= rect.right;
              if (!isInDialog) closeModal();
            }
          });
        } catch (err) {
          console.error("[SYSTEM ERROR]: Failed to initialize contact component.", err);
          return;
        }
      }

      // 3. EXECUTION: Show the modal
      // Prevent background scrolling while modal is active
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");

      // Native <dialog> API: Handles top-layer rendering and focus trapping
      modalInstance.showModal();

      // KINETIC ENTRY: 10ms delay ensures entry transition plays smoothly
      setTimeout(() => {
        modalInstance.classList.add("is-visible");
      }, 10);

      // ACCESSIBILITY (a11y): Handshake focus to the first input field
      const nameInput = modalInstance.querySelector("#name");
      if (nameInput) nameInput.focus();
    }

    // 4. ATTACH LISTENERS: Apply to all triggers found on the page
    contactTriggers.forEach((trigger) => {
      trigger.addEventListener("click", openModal);
    });
  }

  /**
   * HANDSHAKE PROTOCOL: AJAX Form Logic & HUD Status Bar
   * Drives the "Post-Apocalyptic HUD" status bar with system-style feedback.
   */
  function setupFormSubmission(contactForm) {
    const submitBtn = contactForm.querySelector(".contact-modal__button--submit");

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      submitBtn.style.pointerEvents = "none";
      submitBtn.innerHTML = "SENDING...";
      submitBtn.classList.remove("button--error");

      let statusBar = contactForm.querySelector(".contact-modal__status-bar");
      if (!statusBar) {
        statusBar = document.createElement("div");
        statusBar.className = "contact-modal__status-bar";
        contactForm.appendChild(statusBar);
      }
      statusBar.style.display = "none";

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          submitBtn.classList.add("button--success");
          submitBtn.innerHTML = "SENT ✓";
          statusBar.style.display = "block";
          statusBar.innerHTML = `<span class="typewriter-text">[SYSTEM]: DATA RECEIVED. HANDSHAKE COMPLETE.</span>`;
          setTimeout(() => {
            if (modalInstance.open) closeModal();
          }, 3500);
        } else {
          throw new Error("validation");
        }
      } catch (error) {
        submitBtn.style.pointerEvents = "auto";
        submitBtn.classList.add("button--error");
        submitBtn.innerHTML = "RETRY?";
        statusBar.style.display = "block";
        const msg = error.message === "validation" ? "INVALID INPUT DETECTED..." : "CONNECTION LOST. USE BACKUP.";
        statusBar.innerHTML = `<span class="typewriter-text">[SYSTEM ALERT]: ${msg}</span>`;
      }
    });
  }

  /**
   * UTILITY: Smooth Anchor Handler
   * Replaces default jump behavior with fluid motion and focus management.
   */
  function setupAnchorHandler() {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");

      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }, 0);
        }
      }
    });
  }

  // --- 3. SYSTEM BOOT SEQUENCE ---
  const slideshowContainer = document.getElementById("slideshow-container");
  if (slideshowContainer) initSlideshow();

  initContactModal();
  setupAnchorHandler();

  // Handshake for the Mobile Toggle (Replaces HTML onclick)
  const navToggleButton = document.querySelector(".navbar__toggle");
  if (navToggleButton) {
    navToggleButton.addEventListener("click", toggleMobileNav);
  }

  // Global Keydown: Escape key handles both Modal and Mobile Nav contextually
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const navBar = document.getElementById("myNavbar");
      if (modalInstance && modalInstance.open) {
        closeModal();
      } else if (navBar && navBar.classList.contains("responsive")) {
        toggleMobileNav();
      }
    }
  });

  // Mobile Nav: Close on click-away
  document.addEventListener("click", (event) => {
    const navBar = document.getElementById("myNavbar");
    const navToggleButton = document.querySelector(".navbar__toggle");
    if (navBar && navBar.classList.contains("responsive")) {
      if (!navBar.contains(event.target) && !navToggleButton.contains(event.target)) {
        toggleMobileNav();
      }
    }
  });
});
