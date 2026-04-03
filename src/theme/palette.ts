/**
 * Centralized color palette for the entire site.
 *
 * Change these values to re-theme everything at once:
 * - Tailwind classes (via tailwind.config.js)
 * - Theme hook (useTailwindThemes)
 * - 3D sphere materials (colors.ts re-exports from here)
 * - Project card accents
 *
 * The palette is intentionally warm-toned: sandy golds,
 * muted terracotta, with a dark near-black base.
 */

// ─── Base surfaces ────────────────────────────────────────

export const surface = {
  /** Page background (dark mode) */
  bg: '#0A0A0A',
  /** Elevated cards, panels */
  card: '#141414',
  /** Subtle card borders, dividers */
  border: 'rgba(255, 255, 255, 0.08)',
  /** Hover-state card background */
  cardHover: '#1A1A1A',
} as const

// ─── Text ─────────────────────────────────────────────────

export const text = {
  primary: '#EEEEEE',
  secondary: 'rgba(255, 255, 255, 0.55)',
  tertiary: 'rgba(255, 255, 255, 0.35)',
} as const

// ─── Accent (warm) ────────────────────────────────────────
// The signature color. Used sparingly for links, active
// states, and key UI touches. A muted warm gold.

export const accent = {
  /** Primary warm accent */
  primary: '#C8A47E',
  /** Lighter variant for hover / highlights */
  light: '#D4B896',
  /** Darker variant for pressed / subtle backgrounds */
  dark: '#A8845E',
  /** Very subtle background tint */
  muted: 'rgba(200, 164, 126, 0.08)',
  /** Border-strength tint */
  border: 'rgba(200, 164, 126, 0.2)',
} as const

// ─── Decorative (for 3D spheres) ──────────────────────────
// Warm palette that the spheres can use when colorized.

export const decorative = {
  sand: '#D4B896',
  clay: '#B8926A',
  stone: '#8C7A6B',
  fog: '#C4BAB0',
  shadow: '#2A2420',
} as const

// ─── Semantic ─────────────────────────────────────────────

export const semantic = {
  link: accent.primary,
  linkHover: accent.light,
  tagBg: accent.muted,
  tagText: accent.primary,
  tagBgHover: 'rgba(200, 164, 126, 0.15)',
  tagTextHover: accent.light,
} as const

// ─── Full palette export ──────────────────────────────────

const palette = {
  surface,
  text,
  accent,
  decorative,
  semantic,
} as const

export default palette
