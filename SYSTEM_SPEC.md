# Antigravity Migration Instruction (Refactor Log)

## 🏁 Current Milestone: V24 Brand & Atmosphere Integration

### 1. Background Rig Migration

- [x] Register `@property` variables for CSS Houdini transitions.
- [x] Implement Dithered Ink radial gradients across all page surfaces.
- [x] Sync Modal "Sun" positioning with the Global Engine.

### 2. Brand Implementation (Syntax Signature)

- [x] Inject `navbar__logo` into Header.
- [x] Implement "Function Pulse" hover state on Magenta suffix.
- [x] **Constraint:** Maintain `align-items: stretch` on navbar to preserve
      bracket integrity.

### 3. Typography Cleanup

- [x] Convert all remaining `px` values to `rem`.
- [x] Audit Mobile H2 vs. Blockquote hierarchy.
- [x] Verify line-height consistency (1.1 for H1, 1.6 for Body).

# Antigravity Migration Instruction (Refactor Log)

## 🏁 Current Milestone: V24.1 High-Fidelity UX Polish

- [x] **CTA Re-Architecture:** Flip Desktop order (Secondary Left | Primary
      Right).
- [x] **Typography Audit:** Implement letter-spacing hacks (Display: -0.02em |
      CTA: 0.05rem).
- [x] **Browser Cleanse:** Explicitly reset font-family on all input, button,
      and textarea elements.
- [x] **Equilibrium Audit:** Resolve height mismatch in Feature Blocks between
      810px-1000px.
- [x] **Syntax Branding:** Logo injected and stable across all pages.

## 🛠️ Ongoing Technical Compromises

- **Scroll Anchor Stability:** `setupAnchorHandler` uses `e.preventDefault()` to
  block URL hash corruption.
- **Z-Index Stacking:** Navbar locked at `1000`, Modal at `2000` to prevent
  atmospheric shadow clipping.
