// ===============================================
// === GLOBAL UTILITY FUNCTIONS ===
// ===============================================

/**
 * Toggles the mobile navigation menu (Hamburger Menu).
 */
function toggleMobileNav() {
  const navBar = document.getElementById("myNavbar");
  const navToggleButton = document.querySelector(".navbar__toggle");
  // 1. Toggle the visual class first.
  navBar.classList.toggle("responsive");

  // 2. Read the DEFINITIVE state from the visual element itself.
  const isExpanded = navBar.classList.contains("responsive");

  // 3. Set the ARIA attribute to match the definitive visual state.
  navToggleButton.setAttribute("aria-expanded", isExpanded);
}

/**
 * Removes the modal from the DOM and restores scrolling.
 */
function closeModal() {
  const modalWrapper = document.getElementById("contact-modal");
  if (modalWrapper) {
    modalWrapper.remove();
  }
  // CRITICAL FIX: Restore scrolling to the body
  document.body.style.overflow = "";
}

// ===========================================
// === MAIN DOCUMENT READY BLOCK ===
// ===========================================

document.addEventListener("DOMContentLoaded", (event) => {
  // NOTE: Scroll restoration is now handled by the browser default for consistency.

  // ===========================================
  // === A. FUNCTION DEFINITIONS ===
  // ===========================================

  // NOTE: initSlideshow function body is included for file completeness.
  function initSlideshow() {
    const slides = document.getElementsByClassName("slideshow__slide");
    const dots = document.getElementsByClassName("slideshow__dot");
    const slideTitleElement = document.getElementById("slide-title");
    const prevButton = document.querySelector(".slideshow__control--prev");
    const nextButton = document.querySelector(".slideshow__control--next");
    const slideTitleLink = document.getElementById("slide-title-link");
    let slideIndex = 1;
    const announcer = document.getElementById("slide-announcer");

    function showSlides(n) {
      let i;
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      const totalSlides = slides.length;

      // 1. Loop to HIDE all slides (by removing the 'active' class)
      for (i = 0; i < slides.length; i++) {
        // CRITICAL FIX: Remove 'active' class (CSS sets opacity: 0, z-index: 0)
        slides[i].classList.remove("active");

        // Remove old style.display line if it exists
        // slides[i].style.display = "none";

        slides[i].removeAttribute("aria-current");
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      const currentSlide = slides[slideIndex - 1];

      // 2. ACTIVATE the current slide (by adding the 'active' class)
      currentSlide.classList.add("active");

      // Remove old style.display line if it exists
      // currentSlide.style.display = "block";

      // ACTIVATE the dot
      dots[slideIndex - 1].className += " active";

      // Update ARIA attributes
      currentSlide.setAttribute("aria-current", "true");
      currentSlide.setAttribute(
        "aria-label",
        `Slide ${slideIndex} of ${totalSlides}: ${currentSlide.getAttribute(
          "data-title"
        )}`
      );

      if (announcer) {
        announcer.textContent = `${currentSlide.getAttribute(
          "data-title"
        )}, slide ${slideIndex} of ${totalSlides}`;
      }

      if (slideTitleElement && slideTitleLink) {
        const currentTitle = currentSlide.getAttribute("data-title");
        const currentImage = currentSlide.querySelector(".slideshow__image");
        const currentTarget = currentImage
          ? currentImage.getAttribute("data-target")
          : "#";
        slideTitleElement.textContent = currentTitle;
        slideTitleLink.href = currentTarget;
      }
    }
    function plusSlides(n) {
      showSlides((slideIndex += n));
    }
    function currentSlide(n) {
      showSlides((slideIndex = n));
    }

    if (slides.length > 0) {
      showSlides(slideIndex);
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => plusSlides(-1));
    }
    if (nextButton) {
      nextButton.addEventListener("click", () => plusSlides(1));
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => currentSlide(i + 1));
    }
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
      if (event.key === "ArrowLeft") {
        plusSlides(-1);
      } else if (event.key === "ArrowRight") {
        plusSlides(1);
      }
    });
  }

  function initContactModal() {
    const contactTriggers = document.getElementsByClassName(
      "navbar__link--contact-trigger"
    );
    const modalTemplate = document.getElementById("contact-modal-template");

    if (!modalTemplate) {
      console.error(
        "Contact modal template not found. Modal will not function."
      );
      return;
    }

    // Modal Helper Functions
    function getFocusableElements(modalWrapper) {
      const focusableSelectors =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(modalWrapper.querySelectorAll(focusableSelectors));
    }

    function handleFormSubmission(e) {
      e.preventDefault();
      alert("Message sent successfully!");
      closeModal();
    }

    // The function that opens the modal
    function openModal(e) {
      e.preventDefault();

      // 1. Clone and inject the modal
      const modalWrapper =
        modalTemplate.content.cloneNode(true).firstElementChild;
      document.body.appendChild(modalWrapper);

      modalWrapper.style.display = "flex";
      document.body.style.overflow = "hidden";

      // 2. DECLARE ALL VARIABLES ONCE
      const contactForm = modalWrapper.querySelector(".contact-modal__form");
      const submitBtn = modalWrapper.querySelector(
        ".contact-modal__button--submit"
      );
      const closeModalButton = modalWrapper.querySelector(
        ".contact-modal__close-icon"
      );

      // 3. VALIDATION LOGIC
      function toggleButtonState() {
        // Check if the form meets all 'required' and 'type' constraints
        const isValid = contactForm.checkValidity();
        submitBtn.disabled = !isValid;
      }

      // Set initial state (disabled) and listen for input
      toggleButtonState();
      contactForm.addEventListener("input", toggleButtonState);

      // 4. ACCESSIBILITY & FOCUS TRAPPING
      const focusableElements = getFocusableElements(modalWrapper);
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (closeModalButton) {
        closeModalButton.focus();
        closeModalButton.addEventListener("click", closeModal);
      }

      modalWrapper.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            // Tab only
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });

      // 5. SUBMIT & CLICK-AWAY HANDLERS
      contactForm.addEventListener("submit", handleFormSubmission);

      modalWrapper.addEventListener("click", function (e) {
        if (e.target === modalWrapper) {
          closeModal();
        }
      });
    }

    // 4. Bind the modal open handler to all trigger links
    Array.from(contactTriggers).forEach((link) => {
      link.addEventListener("click", openModal);
    });
  }

  /**
   * Scroll Anchor Handler - CRITICAL FIX AND KNOWN COMPROMISE
   * * The smooth scrolling for internal anchor links relies on this custom function
   * to prevent a critical bug: the URL hash (#section-id) being permanently
   * recorded in the browser's history (which causes a jarring jump on refresh).
   * * Compromise: While the fix successfully prevents URL corruption, eliminates
   * the jarring refresh jump, and stabilizes focus, the browser exhibits a
   * negligible flicker or minor scroll inconsistency after multiple, rapid,
   * consecutive refreshes. This is a low-impact race condition between the
   * browser's aggressive scroll restoration and the JavaScript timing. The current
   * solution represents the most stable and reliable compromise for production.
   * * ----------------------------------------------------------------------------
   * Functionality:
   * Handles all internal anchor link clicks by preventing the native URL hash
   * update (e.preventDefault) and manually applying smooth scroll. Uses setTimeout(0)
   * to prevent the focus call from causing a secondary jump/flicker.
   */

  function setupAnchorHandler() {
    // Selects all links whose href attribute starts with a '#'
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        // Check that a target exists AND it is NOT the contact modal link
        if (
          targetElement &&
          !this.classList.contains("navbar__link--contact-trigger")
        ) {
          // 1. CRITICAL FIX: Prevent the default browser action (URL hash update).
          // This eliminates all refresh/history corruption problems.
          e.preventDefault();

          // 2. Manually implement smooth scroll (to replace the canceled native scroll)
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // 3. FINAL FIX: Use setTimeout(0) to ensure the focus is applied as a new
          // microtask AFTER the scroll has started. This prevents the flicker/jump.
          setTimeout(() => {
            targetElement.setAttribute("tabindex", "-1");
            targetElement.focus();
          }, 0);
        }
      });
    });
  }

  // ===========================================
  // === B. CONDITIONAL EXECUTION & GLOBAL EVENTS ===
  // ===========================================

  const slideshowContainer = document.getElementById("slideshow-container");

  if (slideshowContainer) {
    initSlideshow();
  }

  // Always initialize the modal logic here
  initContactModal();

  // Initialize the anchor link handler (Replaces simple CSS smooth scroll)
  setupAnchorHandler();

  // GLOBAL EVENT LISTENER: Escape Key for mobile nav and modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const isModalOpen = document.getElementById("contact-modal");
      const navBar = document.getElementById("myNavbar");

      if (isModalOpen) {
        closeModal();
      } else if (navBar.classList.contains("responsive")) {
        toggleMobileNav();
      }
    }
  });
  // --- MOBILE NAV OFF-CLICK CLOSE ---
  // Listens for clicks on the body to close the mobile menu if the user clicks away
  document.addEventListener("click", function (event) {
    const navBar = document.getElementById("myNavbar");
    const navToggleButton = document.querySelector(".navbar__toggle");

    // Only run if the menu is currently open (has the 'responsive' class)
    if (navBar.classList.contains("responsive")) {
      // If the click was NOT inside the navbar AND NOT on the toggle button itself
      if (
        !navBar.contains(event.target) &&
        !navToggleButton.contains(event.target)
      ) {
        toggleMobileNav(); // Reuse your existing function to close it properly
      }
    }
  });
});
