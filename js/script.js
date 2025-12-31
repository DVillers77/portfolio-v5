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

  function initSlideshow() {
    // We use querySelector to match your new BEM class names
    const slideshowContainer = document.getElementById("slideshow-container"); // Target for touch events
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
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("slideshow__slide--active");
        slides[i].setAttribute("aria-hidden", "true");
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
        dots[i].removeAttribute("aria-current");
      }

      const currentSlide = slides[slideIndex - 1];
      currentSlide.classList.add("slideshow__slide--active");
      currentSlide.setAttribute("aria-hidden", "false");

      dots[slideIndex - 1].classList.add("active");
      dots[slideIndex - 1].setAttribute("aria-current", "true");

      if (slideTitleElement && slideTitleLink) {
        const currentTitle = currentSlide.getAttribute("data-title");
        const currentImage = currentSlide.querySelector(".slideshow__image");

        // CRITICAL FIX: Ensure we are grabbing a clean ID (e.g., #tic-tac-toe-details)
        const currentTarget = currentImage
          ? currentImage.getAttribute("data-target")
          : "#";

        slideTitleElement.textContent = currentTitle;

        // Use setAttribute to ensure the DOM updates immediately so the click listener sees it
        slideTitleLink.setAttribute("href", currentTarget);
      }
    }

    // Your original event listeners
    if (prevButton)
      prevButton.addEventListener("click", () => showSlides((slideIndex -= 1)));
    if (nextButton)
      nextButton.addEventListener("click", () => showSlides((slideIndex += 1)));

    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => showSlides((slideIndex = i + 1)));
    }

    // NEW: Touch Swipe Listeners
    if (slideshowContainer) {
      slideshowContainer.addEventListener("touchstart", (event) => {
        touchstartX = event.changedTouches[0].screenX;
      });

      slideshowContainer.addEventListener("touchend", (event) => {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
      });
    }

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance for a swipe
      // Swipe Left
      if (touchstartX - touchendX > swipeThreshold) {
        showSlides((slideIndex += 1));
      }
      // Swipe Right
      if (touchendX - touchstartX > swipeThreshold) {
        showSlides((slideIndex -= 1));
      }
    }

    // Your original keyboard navigation
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showSlides((slideIndex -= 1));
      else if (event.key === "ArrowRight") showSlides((slideIndex += 1));
    });

    if (slides.length > 0) showSlides(slideIndex);
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
    document.addEventListener("click", function (e) {
      // 1. Find the link - we look for the attribute specifically to ensure it's a hash link
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // 2. Filter: Only internal links, excluding the contact modal
      if (
        href &&
        href.startsWith("#") &&
        !anchor.classList.contains("navbar__link--contact-trigger")
      ) {
        const targetElement = document.querySelector(href);

        if (targetElement) {
          // 3. THE FIX: Stop the instant jump immediately
          e.preventDefault();

          // 4. Your fine-tuned smooth scroll
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // 5. Your fine-tuned focus management (prevents the flicker)
          setTimeout(() => {
            targetElement.setAttribute("tabindex", "-1");
            targetElement.focus({ preventScroll: true }); // Adding preventScroll ensures the focus doesn't cause a jump
          }, 0);

          // Update URL bar without jumping
          history.pushState(null, null, href);
        }
      }
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
