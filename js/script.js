// ===============================================
// === GLOBAL UTILITY FUNCTIONS ===
// ===============================================

// NEW: Global reference to restore focus after modal shutdown
let lastFocusedElement;

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
 * Removes the modal from the DOM with a Kinetic 400ms fade-out.
 */
function closeModal() {
  const modalWrapper = document.getElementById("contact-modal");
  if (!modalWrapper) return;

  // 1. Add Closing Class for Fade Out
  modalWrapper.classList.add("is-closing");
  modalWrapper.classList.remove("is-visible");

  // 2. Wait for transition (400ms) then remove
  setTimeout(() => {
    if (modalWrapper) {
      modalWrapper.remove();
    }

    // --- NEW: THE FOCUS RESTORATION ---
    // If we saved a previous element, return the Pilot there now.
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

    // UNLOCK
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  }, 400);
}

// ===========================================
// === MAIN DOCUMENT READY BLOCK ===
// ===========================================

document.addEventListener("DOMContentLoaded", (event) => {
  // NOTE: Scroll restoration is now handled by the browser default for consistency.

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
        const currentTarget = currentImage ? currentImage.getAttribute("data-target") : "#";

        // 1. Update the visible text
        slideTitleElement.textContent = currentTitle;

        // 2. Update the navigation destination
        slideTitleLink.setAttribute("href", currentTarget);

        // 3. THE HANDSHAKE: Combining Title + Action for absolute clarity
        // This tells them exactly WHAT they are viewing in full size.
        slideTitleLink.setAttribute("aria-label", `${currentTitle} - View full size uncropped image`);

        // 4. THE CONNECTION: Link the pill to the target section ID
        if (currentTarget.startsWith("#")) {
          slideTitleLink.setAttribute("aria-controls", currentTarget.substring(1));
        } else {
          slideTitleLink.removeAttribute("aria-controls");
        }
      }
    }

    if (prevButton) prevButton.addEventListener("click", () => showSlides((slideIndex -= 1)));
    if (nextButton) nextButton.addEventListener("click", () => showSlides((slideIndex += 1)));

    for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => showSlides((slideIndex = i + 1)));
    }

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
      const swipeThreshold = 50;
      if (touchstartX - touchendX > swipeThreshold) {
        showSlides((slideIndex += 1));
      }
      if (touchendX - touchstartX > swipeThreshold) {
        showSlides((slideIndex -= 1));
      }
    }

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showSlides((slideIndex -= 1));
      else if (event.key === "ArrowRight") showSlides((slideIndex += 1));
    });

    if (slides.length > 0) showSlides(slideIndex);
  }

  function initContactModal() {
    const contactTriggers = document.getElementsByClassName("navbar__link--contact-trigger");
    const modalTemplate = document.getElementById("contact-modal-template");

    if (!modalTemplate) {
      console.error("Contact modal template not found.");
      return;
    }

    function getFocusableElements(modalWrapper) {
      const focusableSelectors =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(modalWrapper.querySelectorAll(focusableSelectors));
    }

    function openModal(e) {
      e.preventDefault();

      // Save the current focus (the button that was clicked)
      lastFocusedElement = document.activeElement;

      // LOCK THE ENTIRE PORTAL
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");

      const modalWrapper = modalTemplate.content.cloneNode(true).firstElementChild;
      document.body.appendChild(modalWrapper);

      // 2. KINETIC ENTRY
      modalWrapper.style.display = "flex";
      void modalWrapper.offsetWidth;
      modalWrapper.classList.add("is-visible");

      const contactForm = modalWrapper.querySelector(".contact-modal__form");
      const submitBtn = modalWrapper.querySelector(".contact-modal__button--submit");
      const closeModalButton = modalWrapper.querySelector(".contact-modal__close-icon");

      function toggleButtonState() {
        submitBtn.disabled = !contactForm.checkValidity();
      }

      toggleButtonState();
      contactForm.addEventListener("input", toggleButtonState);

      // --- PHYSICAL BARRIER 2: THE FOCUS TRAP ---
      // We recalculate this AFTER the modal is visible to ensure accuracy
      const focusableElements = getFocusableElements(modalWrapper);
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      // --- THE FOCUS HANDSHAKE ---
      // We look for the Name field specifically to drop the Pilot into the action
      const nameInput = modalWrapper.querySelector("#name") || modalWrapper.querySelector('[name="name"]');

      if (nameInput) {
        nameInput.focus();
      } else if (closeModalButton) {
        // Fallback: if Name isn't found, focus the Close button so focus isn't lost
        closeModalButton.focus();
      }

      // Ensure the close button still has its "Power-Down" listener
      if (closeModalButton) {
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
            // Tab
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });

      // 5. AJAX SUBMISSION & HANDSHAKE PROTOCOL
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        // 5a. PRE-FLIGHT STATE
        submitBtn.style.pointerEvents = "none";
        submitBtn.innerHTML = "SENDING...";

        // Reset Error State if Present
        submitBtn.classList.remove("button--error");

        let statusBar = contactForm.querySelector(".contact-modal__status-bar");
        if (!statusBar) {
          statusBar = document.createElement("div");
          statusBar.className = "contact-modal__status-bar";
          contactForm.appendChild(statusBar);
        }
        statusBar.style.display = "none"; // Hide initially

        const formData = new FormData(contactForm);

        try {
          const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: formData,
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            // 5b. SUCCESS STATE
            submitBtn.classList.remove("button--error");
            submitBtn.classList.add("button--success");
            submitBtn.innerHTML = "SENT ✓";

            // SYSTEM HANDSHAKE
            statusBar.style.display = "block";
            statusBar.innerHTML = `<span class="typewriter-text">[SYSTEM]: DATA RECEIVED. HANDSHAKE COMPLETE.</span>`;

            // HANDSHAKE PROTOCOL: 3.5s Delay before closing
            // We check if the modal still exists incase the user closed it manually.
            setTimeout(() => {
              // Only close if it's still in the DOM and open
              const currentModal = document.getElementById("contact-modal");
              if (currentModal) {
                closeModal();
              }
            }, 3500);
          } else {
            throw new Error("validation");
          }
        } catch (error) {
          // 5c. ERROR STATE
          submitBtn.style.pointerEvents = "auto";
          submitBtn.classList.remove("button--success"); // CLASS CLEANUP
          submitBtn.classList.add("button--error"); // COLOR BINDING
          submitBtn.innerHTML = "RETRY?";

          statusBar.style.display = "block";

          const errorMsg =
            error.message === "validation"
              ? "[SYSTEM ALERT]: INVALID INPUT DETECTED..."
              : "[SYSTEM ALERT]: CONNECTION LOST. USE BACKUP.";

          statusBar.innerHTML = `<span class="typewriter-text">${errorMsg}</span>`;
        }
      });

      modalWrapper.addEventListener("click", function (e) {
        if (e.target === modalWrapper) {
          closeModal();
        }
      });
    }

    Array.from(contactTriggers).forEach((link) => {
      link.addEventListener("click", openModal);
    });
  }

  function setupAnchorHandler() {
    document.addEventListener("click", function (e) {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (href && href.startsWith("#") && !anchor.classList.contains("navbar__link--contact-trigger")) {
        const targetElement = document.querySelector(href);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

          setTimeout(() => {
            targetElement.setAttribute("tabindex", "-1");
            targetElement.focus({ preventScroll: true });
          }, 0);

          history.pushState(null, null, href);
        }
      }
    });
  }

  // --- Initialization Calls ---
  const slideshowContainer = document.getElementById("slideshow-container");
  if (slideshowContainer) {
    initSlideshow();
  }

  initContactModal();
  setupAnchorHandler();

  // GLOBAL EVENT LISTENER: Escape Key for mobile nav and modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const isModalOpen = document.getElementById("contact-modal");
      const navBar = document.getElementById("myNavbar");

      if (isModalOpen) {
        closeModal();
      } else if (navBar && navBar.classList.contains("responsive")) {
        toggleMobileNav();
      }
    }
  });

  // --- MOBILE NAV OFF-CLICK CLOSE ---
  document.addEventListener("click", function (event) {
    const navBar = document.getElementById("myNavbar");
    const navToggleButton = document.querySelector(".navbar__toggle");

    if (navBar && navBar.classList.contains("responsive")) {
      if (!navBar.contains(event.target) && !navToggleButton.contains(event.target)) {
        toggleMobileNav();
      }
    }
  });
});
