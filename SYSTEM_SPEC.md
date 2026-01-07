# Antigravity Migration Instruction (Refactor Log)

## 🏁 Current Milestone: V24 Brand & Atmosphere Integration

### 1. Background Rig Migration
- [x] Register `@property` variables for CSS Houdini transitions.
- [x] Implement Dithered Ink radial gradients across all page surfaces.
- [x] Sync Modal "Sun" positioning with the Global Engine.

### 2. Brand Implementation (Syntax Signature)
- [ ] Inject `navbar__logo` into Header.
- [ ] Implement "Function Pulse" hover state on Magenta suffix.
- [ ] **Constraint:** Maintain `align-items: stretch` on navbar to preserve bracket integrity.

### 3. Typography Cleanup
- [x] Convert all remaining `px` values to `rem`.
- [x] Audit Mobile H2 vs. Blockquote hierarchy.
- [x] Verify line-height consistency (1.1 for H1, 1.6 for Body).

### 4. Stability Checks (The "Pixel-Perfect" Audit)
- [ ] Verify `.active` tab brackets touch the navbar bottom edge with 0px gap.
- [ ] Verify Slideshow "Straddle" math at 810px breakpoint.
- [ ] Confirm `aria-label="Home"` is present on the typographic logo.

## 🛠️ Ongoing Technical Compromises
- **Scroll Anchor Stability:** `setupAnchorHandler` uses `e.preventDefault()` to block URL hash corruption.
- **Z-Index Stacking:** Navbar locked at `1000`, Modal at `2000` to prevent atmospheric shadow clipping.