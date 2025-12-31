# Antigravity Migration Instruction

I am migrating this portfolio to a Tokenized Design System. Please perform the
following steps:

1. **Read `SYSTEM_DESIGN.md` and `UX_ENGINEERING_NOTES.md`** to understand the
   new color tokens, typography scale, and "Sacred" layout rules.
2. **Refactor `stylesheet.css`:**
   - Convert all pixel-based typography to the `rem` scale defined in the Design
     doc.
   - Replace hardcoded hex colors with the Tonal RGB Tokens.
   - Restore the Hamburger-to-X animation in the mobile nav.
3. **Refactor Footer:** Elevate the footer to a semantic component using the new
   color/type hierarchy.
4. **Audit Component Order:** Ensure the Index page H3 and button stacking match
   the Engineering Notes.
5. **Stability Check:** Verify that the "Safety Shelf" and "Slideshow Straddle"
   logic remain untouched.
