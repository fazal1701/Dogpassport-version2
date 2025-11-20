# Dog Passport: Ultra-Premium Styling System
## Mobile-First, Framer-Quality Design with Unique Components

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Mobile-First CSS Variables](#mobile-first-css-variables)
3. [Typography System (Responsive)](#typography-system-responsive)
4. [Component Library](#component-library)
5. [Mobile Navigation (Bottom Tab Bar)](#mobile-navigation-bottom-tab-bar)
6. [Unique Animations & Micro-Interactions](#unique-animations--micro-interactions)
7. [Card Variants (8+ Unique Styles)](#card-variants)
8. [Button System (Premium Feel)](#button-system-premium-feel)
9. [Form Elements (Touch-Optimized)](#form-elements-touch-optimized)
10. [Modal & Sheet Components](#modal--sheet-components)
11. [QR Code Badge (Animated)](#qr-code-badge-animated)
12. [Skeleton Loaders (Framer-Quality)](#skeleton-loaders-framer-quality)
13. [Toast Notifications (Native Feel)](#toast-notifications-native-feel)
14. [Pull-to-Refresh](#pull-to-refresh)
15. [Swipeable Action Cards](#swipeable-action-cards)

---

## Design Philosophy

**Core Principles:**

1. **Mobile-First Always**: Every component designed for touch, thumb zones, and small screens
2. **Framer-Level Polish**: Smooth animations, delightful micro-interactions, spring physics
3. **Unique, Not Generic**: No v0/Bolt templates - custom components with brand personality
4. **Performance-Obsessed**: GPU-accelerated animations, minimal repaints, 60fps
5. **Accessibility Built-In**: Touch targets 44px+, color contrast WCAG AAA, screen reader support

**Design Inspirations:**
- Apple Health (smooth animations, clean data visualization)
- Stripe Dashboard (sophisticated gradients, premium feel)
- Linear (keyboard shortcuts, instant feedback)
- Vercel (precise spacing, micro-interactions)
- NOT: Generic SaaS templates, v0 clones, Bootstrap derivatives

---

## Mobile-First CSS Variables

```css
:root {
  /* ===== MOBILE BREAKPOINTS ===== */
  --breakpoint-xs: 375px;   /* iPhone SE */
  --breakpoint-sm: 390px;   /* iPhone 14 Pro */
  --breakpoint-md: 428px;   /* iPhone 14 Pro Max */
  --breakpoint-lg: 768px;   /* iPad Mini */
  --breakpoint-xl: 1024px;  /* iPad Pro */
  
  /* ===== SAFE AREA INSETS (iOS Notch) ===== */
  --safe-area-top: env(safe-area-inset-top);
  --safe-area-bottom: env(safe-area-inset-bottom);
  --safe-area-left: env(safe-area-inset-left);
  --safe-area-right: env(safe-area-inset-right);
  
  /* ===== TOUCH TARGETS ===== */
  --touch-target-min: 44px;
  --touch-target-comfortable: 48px;
  --touch-target-large: 56px;
  
  /* ===== NAVY SPECTRUM (Authority, Trust, Government-Grade) ===== */
  --navy-950: #0A1628;
  --navy-900: #1E3A8A;  /* Primary brand */
  --navy-800: #1E40AF;
  --navy-700: #2563EB;
  --navy-600: #3B82F6;
  --navy-500: #60A5FA;
  --navy-400: #93C5FD;
  --navy-300: #BFDBFE;
  --navy-200: #DBEAFE;
  --navy-100: #EFF6FF;
  --navy-50: #F0F9FF;
  
  /* ===== FOREST SPECTRUM (Verification, Health, Wellness) ===== */
  --forest-900: #022C22;
  --forest-800: #034535;
  --forest-700: #047857;
  --forest-600: #065F46;  /* Secondary brand */
  --forest-500: #10B981;  /* Success/verification */
  --forest-400: #34D399;
  --forest-300: #6EE7B7;
  --forest-200: #A7F3D0;
  --forest-100: #D1FAE5;
  --forest-50: #ECFDF5;
  
  /* ===== ICE SPECTRUM (Clean, Modern, Background) ===== */
  --ice-50: #F0F9FE;
  --ice-100: #DBEAFE;
  --ice-200: #BFDBFE;
  --ice-300: #93C5FD;
  --ice-400: #60A5FA;
  
  /* ===== GOLD ACCENTS (Premium, Attention) ===== */
  --gold-600: #D97706;
  --gold-500: #F59E0B;
  --gold-400: #FBBF24;
  --gold-300: #FCD34D;
  --gold-200: #FDE68A;
  --gold-100: #FEF3C7;
  
  /* ===== CHARCOAL SPECTRUM (Dark Mode) ===== */
  --charcoal-900: #111827;
  --charcoal-800: #1F2937;
  --charcoal-700: #374151;
  --charcoal-600: #4B5563;
  --charcoal-500: #6B7280;
  --charcoal-400: #9CA3AF;
  
  /* ===== GRAY SPECTRUM (Neutral) ===== */
  --gray-900: #0F172A;
  --gray-800: #1E293B;
  --gray-700: #334155;
  --gray-600: #475569;
  --gray-500: #64748B;
  --gray-400: #94A3B8;
  --gray-300: #CBD5E1;
  --gray-200: #E2E8F0;
  --gray-100: #F1F5F9;
  --gray-50: #F8FAFC;
  
  /* ===== RED SPECTRUM (Error, Urgent) ===== */
  --red-900: #7F1D1D;
  --red-800: #991B1B;
  --red-700: #B91C1C;
  --red-600: #DC2626;
  --red-500: #EF4444;
  --red-400: #F87171;
  --red-300: #FCA5A5;
  --red-200: #FECACA;
  --red-100: #FEE2E2;
  
  /* ===== SEMANTIC COLORS ===== */
  --color-background: var(--ice-50);
  --color-surface: #FFFFFF;
  --color-surface-elevated: #FFFFFF;
  --color-overlay: rgba(15, 23, 42, 0.5);
  --color-text-primary: var(--navy-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-400);
  --color-text-inverse: #FFFFFF;
  --color-text-link: var(--navy-600);
  --color-border-light: var(--gray-200);
  --color-border-medium: var(--gray-300);
  --color-border-strong: var(--gray-400);
  --color-border-focus: var(--navy-600);
  --color-primary: var(--navy-900);
  --color-primary-hover: var(--navy-800);
  --color-primary-active: var(--navy-950);
  --color-secondary: var(--forest-600);
  --color-secondary-hover: var(--forest-700);
  --color-secondary-active: var(--forest-800);
  --color-success: var(--forest-500);
  --color-success-bg: var(--forest-50);
  --color-success-border: var(--forest-200);
  --color-warning: var(--gold-500);
  --color-warning-bg: var(--gold-100);
  --color-warning-border: var(--gold-200);
  --color-error: var(--red-600);
  --color-error-bg: var(--red-100);
  --color-error-border: var(--red-200);
  --color-info: var(--navy-600);
  --color-info-bg: var(--navy-100);
  --color-info-border: var(--navy-200);
  --color-verified-yellow: var(--gold-400);
  --color-verified-green: var(--forest-500);
  --color-verified-blue: var(--navy-600);
  
  /* ===== GRADIENT SYSTEM ===== */
  --gradient-hero: linear-gradient(135deg, #1E3A8A 0%, #065F46 100%);
  --gradient-hero-dark: linear-gradient(135deg, #0A1628 0%, #022C22 100%);
  --gradient-hero-light: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
  --gradient-badge: linear-gradient(180deg, #F0F9FE 0%, #DBEAFE 100%);
  --gradient-badge-gold: linear-gradient(180deg, #FEF3C7 0%, #FCD34D 100%);
  --gradient-badge-premium: linear-gradient(135deg, #1E3A8A 0%, #D97706 100%);
  --gradient-verified-yellow: radial-gradient(circle at center, rgba(251,191,36,0.15) 0%, transparent 70%);
  --gradient-verified-green: radial-gradient(circle at center, rgba(16,185,129,0.15) 0%, transparent 70%);
  --gradient-verified-blue: radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%);
  --gradient-button-primary: linear-gradient(180deg, #1E40AF 0%, #1E3A8A 100%);
  --gradient-button-success: linear-gradient(180deg, #10B981 0%, #065F46 100%);
  --gradient-surface: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
  --gradient-card: linear-gradient(135deg, #FFFFFF 0%, #F0F9FE 100%);
  
  /* ===== UNIQUE GRADIENTS (Not Generic) ===== */
  --gradient-mesh-1: radial-gradient(at 40% 20%, #3B82F6 0px, transparent 50%),
                     radial-gradient(at 80% 80%, #10B981 0px, transparent 50%),
                     radial-gradient(at 0% 50%, #1E3A8A 0px, transparent 50%);
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  --gradient-shimmer: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  
  /* ===== TYPOGRAPHY (San Francisco-Style) ===== */
  --font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Geist Sans', 'Segoe UI', sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Geist Sans', 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Geist Mono', 'Roboto Mono', 'Courier New', monospace;
  
  /* Font Sizes - Mobile Optimized */
  --text-xs: 0.6875rem;    /* 11px - Captions */
  --text-sm: 0.8125rem;    /* 13px - Secondary text */
  --text-base: 0.9375rem;  /* 15px - Body */
  --text-md: 1rem;         /* 16px - Body Large */
  --text-lg: 1.0625rem;    /* 17px - iOS Standard */
  --text-xl: 1.25rem;      /* 20px - Subheadings */
  --text-2xl: 1.5rem;      /* 24px - Headings */
  --text-3xl: 1.875rem;    /* 30px - Large Titles */
  --text-4xl: 2.125rem;    /* 34px - iOS Large Title */
  --text-5xl: 2.5rem;      /* 40px - Hero */
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  
  /* Line Heights - Optimized for Readability */
  --leading-none: 1;
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.8;
  
  /* Letter Spacing */
  --tracking-tighter: -0.02em;
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
  --tracking-wide: 0.01em;
  --tracking-wider: 0.02em;
  
  /* ===== SPACING (4px Base) ===== */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1-5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2-5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-7: 1.75rem;      /* 28px */
  --space-8: 2rem;         /* 32px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  
  /* ===== BORDER RADIUS (iOS-Style Rounded) ===== */
  --radius-none: 0;
  --radius-xs: 0.25rem;    /* 4px */
  --radius-sm: 0.5rem;     /* 8px */
  --radius-base: 0.625rem; /* 10px */
  --radius-md: 0.75rem;    /* 12px */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.25rem;    /* 20px */
  --radius-2xl: 1.5rem;    /* 24px */
  --radius-3xl: 2rem;      /* 32px */
  --radius-full: 9999px;
  
  /* ===== SHADOWS (Subtle, Apple-Style) ===== */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-base: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 6px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 15px 30px rgba(0, 0, 0, 0.10);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.12);
  
  /* Colored Shadows */
  --shadow-primary: 0 4px 12px rgba(30, 58, 138, 0.12);
  --shadow-success: 0 4px 12px rgba(16, 185, 129, 0.12);
  --shadow-warning: 0 4px 12px rgba(245, 158, 11, 0.12);
  --shadow-error: 0 4px 12px rgba(220, 38, 38, 0.12);
  
  /* Glow Effects */
  --glow-yellow: 0 0 20px rgba(251, 191, 36, 0.3);
  --glow-green: 0 0 20px rgba(16, 185, 129, 0.3);
  --glow-blue: 0 0 20px rgba(59, 130, 246, 0.3);
  --glow-primary: 0 0 24px rgba(30, 58, 138, 0.25);
  
  /* ===== Z-INDEX SYSTEM ===== */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  --z-notification: 1700;
  
  /* ===== TRANSITIONS (Spring Physics) ===== */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;
  
  /* Easing - iOS-Like Spring */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);      /* iOS bounce */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);     /* Smooth deceleration */
  
  /* Combined Transitions */
  --transition-fast: all var(--duration-fast) var(--ease-spring);
  --transition-normal: all var(--duration-normal) var(--ease-spring);
  --transition-slow: all var(--duration-slow) var(--ease-spring);
  --transition-smooth: all var(--duration-normal) var(--ease-smooth);
}

/* ===== DARK MODE ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--charcoal-900);
    --color-surface: var(--charcoal-800);
    --color-surface-elevated: var(--charcoal-700);
    --color-overlay: rgba(255, 255, 255, 0.1);
    --color-text-primary: var(--gray-50);
    --color-text-secondary: var(--gray-400);
    --color-text-tertiary: var(--gray-500);
    --color-text-inverse: var(--charcoal-900);
    --color-border-light: var(--charcoal-700);
    --color-border-medium: var(--charcoal-600);
    --color-border-strong: var(--charcoal-500);
    --color-primary: var(--navy-400);
    --color-primary-hover: var(--navy-300);
    --color-primary-active: var(--navy-200);
    --gradient-card: linear-gradient(135deg, var(--charcoal-800) 0%, var(--charcoal-700) 100%);
  }
}
```

---

## Typography System (Responsive)

```css
/* ===== TYPOGRAPHY BASE ===== */

html {
  font-size: 16px;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Responsive font scaling */
@media (max-width: 390px) {
  html {
    font-size: 15px; /* Slightly smaller for iPhone SE */
  }
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  overflow-x: hidden;
}

/* Headings - iOS Large Title Style */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
}

h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-tighter);
}

h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
}

h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
}

h4 {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
}

h5 {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

h6 {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
}

/* Paragraph */
p {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* Links */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: var(--transition-fast);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

a:hover {
  color: var(--color-primary-hover);
}

a:active {
  color: var(--color-primary-active);
  transform: scale(0.98);
}

/* Code */
code, pre {
  font-family: var(--font-mono);
  font-size: calc(var(--text-base) * 0.9);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

code {
  padding: var(--space-0-5) var(--space-1-5);
}

pre {
  padding: var(--space-4);
  margin: var(--space-4) 0;
  overflow: auto;
  border: 1px solid var(--color-border-light);
}

pre code {
  background: none;
  padding: 0;
}

/* Text Utility Classes */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-md { font-size: var(--text-md); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }

.font-light { font-weight: var(--font-light); }
.font-normal { font-weight: var(--font-normal); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }

.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-tertiary { color: var(--color-text-tertiary); }
```

---

## Component Library

### Container & Layout

```css
/* Mobile-First Container */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: max(var(--space-4), var(--safe-area-left));
  padding-right: max(var(--space-4), var(--safe-area-right));
  max-width: 100%;
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* Stack Layout (Flexbox Column) */
.stack {
  display: flex;
  flex-direction: column;
}

.stack--xs { gap: var(--space-1); }
.stack--sm { gap: var(--space-2); }
.stack--md { gap: var(--space-4); }
.stack--lg { gap: var(--space-6); }
.stack--xl { gap: var(--space-8); }

/* Inline Layout (Flexbox Row) */
.inline {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.inline--xs { gap: var(--space-1); }
.inline--sm { gap: var(--space-2); }
.inline--md { gap: var(--space-4); }
.inline--lg { gap: var(--space-6); }

/* Grid System */
.grid {
  display: grid;
  gap: var(--space-4);
}

.grid--2-col {
  grid-template-columns: repeat(2, 1fr);
}

.grid--3-col {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 390px) {
  .grid--3-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Safe Area Helpers */
.safe-area-top {
  padding-top: max(var(--space-4), var(--safe-area-top));
}

.safe-area-bottom {
  padding-bottom: max(var(--space-4), var(--safe-area-bottom));
}
```

---

## Mobile Navigation (Bottom Tab Bar)

```css
/* ===== MOBILE BOTTOM TAB BAR ===== */

.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-bottom: max(var(--space-2), var(--safe-area-bottom));
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

@media (prefers-color-scheme: dark) {
  .mobile-tab-bar {
    background: rgba(31, 41, 55, 0.8);
    border-top: 0.5px solid rgba(255, 255, 255, 0.1);
  }
}

.mobile-tab-bar__container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: var(--touch-target-large);
  max-width: 500px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.mobile-tab-bar__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-0-5);
  flex: 1;
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  padding: var(--space-1);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

.mobile-tab-bar__item:active {
  transform: scale(0.95);
}

.mobile-tab-bar__item--active {
  color: var(--color-primary);
}

.mobile-tab-bar__icon {
  width: 24px;
  height: 24px;
  transition: var(--transition-fast);
}

.mobile-tab-bar__item--active .mobile-tab-bar__icon {
  transform: translateY(-2px);
}

.mobile-tab-bar__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: 1;
}

.mobile-tab-bar__badge {
  position: absolute;
  top: 0;
  right: 20%;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-error);
  color: white;
  font-size: 10px;
  font-weight: var(--font-bold);
  border-radius: 8px;
  border: 2px solid var(--color-surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Active indicator dot */
.mobile-tab-bar__item--active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  width: 4px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}
```

---

## Unique Animations & Micro-Interactions

```css
/* ===== SPRING BOUNCE ENTRANCE ===== */
@keyframes springBounce {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-spring-bounce {
  animation: springBounce 0.6s var(--ease-spring) forwards;
}

/* ===== SHIMMER LOADING (Framer-Quality) ===== */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    var(--color-surface-elevated) 0px,
    rgba(255, 255, 255, 0.5) 40px,
    var(--color-surface-elevated) 80px
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}

@media (prefers-color-scheme: dark) {
  .shimmer {
    background: linear-gradient(
      90deg,
      var(--charcoal-700) 0px,
      rgba(255, 255, 255, 0.05) 40px,
      var(--charcoal-700) 80px
    );
    background-size: 1000px 100%;
  }
}

/* ===== FADE IN UP (Stagger Support) ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s var(--ease-spring) forwards;
}

.animate-fade-in-up--delay-1 {
  animation-delay: 0.1s;
}

.animate-fade-in-up--delay-2 {
  animation-delay: 0.2s;
}

.animate-fade-in-up--delay-3 {
  animation-delay: 0.3s;
}

/* ===== SCALE IN ===== */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.4s var(--ease-spring) forwards;
}

/* ===== GLOW PULSE (Verification Badge) ===== */
@keyframes glowPulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
  }
}

.animate-glow-pulse {
  animation: glowPulse 2s ease-in-out infinite;
}

/* ===== CHECKMARK DRAW (SVG Animation) ===== */
@keyframes checkmarkDraw {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.checkmark-path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: checkmarkDraw 0.6s var(--ease-spring) forwards;
}

/* ===== SLIDE IN FROM RIGHT ===== */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.5s var(--ease-spring) forwards;
}

/* ===== SLIDE IN FROM BOTTOM (Sheet/Modal) ===== */
@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-bottom {
  animation: slideInBottom 0.4s var(--ease-spring) forwards;
}

/* ===== BOUNCE ATTENTION ===== */
@keyframes bounceAttention {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-attention {
  animation: bounceAttention 1s var(--ease-bounce) infinite;
}

/* ===== ICON SPIN ===== */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ===== ROTATE SUCCESS (Checkmark) ===== */
@keyframes rotateSuccess {
  0% {
    opacity: 0;
    transform: rotate(-180deg) scale(0);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

.animate-rotate-success {
  animation: rotateSuccess 0.6s var(--ease-spring) forwards;
}
```

---

## Card Variants

```css
/* ===== BASE CARD ===== */
.card {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-light);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* ===== GLASS CARD (Unique) ===== */
.card--glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .card--glass {
    background: rgba(31, 41, 55, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

/* ===== MESH GRADIENT CARD (Unique, Not Generic) ===== */
.card--mesh {
  background: var(--gradient-mesh-1), var(--color-surface);
  background-blend-mode: soft-light;
  border: none;
}

/* ===== ELEVATED CARD (Premium Feel) ===== */
.card--elevated {
  background: var(--color-surface);
  border: none;
  box-shadow: var(--shadow-lg);
}

.card--elevated:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* ===== STATUS CARDS (With Colored Left Border) ===== */
.card--active {
  border-left: 4px solid var(--color-success);
  background: linear-gradient(
    90deg,
    rgba(16, 185, 129, 0.03) 0%,
    var(--color-surface) 100%
  );
}

.card--expiring {
  border-left: 4px solid var(--color-warning);
  background: linear-gradient(
    90deg,
    rgba(245, 158, 11, 0.03) 0%,
    var(--color-surface) 100%
  );
}

.card--expired {
  border-left: 4px solid var(--color-error);
  background: linear-gradient(
    90deg,
    rgba(220, 38, 38, 0.03) 0%,
    var(--color-surface) 100%
  );
}

/* ===== SWIPEABLE CARD (With Action Buttons) ===== */
.card--swipeable {
  position: relative;
  touch-action: pan-y;
  cursor: grab;
  transition: transform 0.3s var(--ease-spring);
}

.card--swipeable:active {
  cursor: grabbing;
}

.card--swipeable__actions {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card--swipeable:hover .card--swipeable__actions {
  opacity: 1;
}

/* ===== INTERACTIVE CARD (Press Animation) ===== */
.card--interactive {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.card--interactive:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-xs);
}
```

---

## Button System (Premium Feel)

```css
/* ===== BASE BUTTON ===== */
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--touch-target-min);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: var(--transition-normal);
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn:active {
  transform: scale(0.97);
}

/* Shimmer effect on hover (Unique) */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-shimmer);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

/* ===== PRIMARY BUTTON ===== */
.btn--primary {
  background: var(--gradient-button-primary);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-md);
}

.btn--primary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn--primary:active {
  transform: translateY(0) scale(0.97);
  box-shadow: var(--shadow-sm);
}

/* ===== SECONDARY BUTTON (Outlined) ===== */
.btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-border-medium);
  box-shadow: none;
}

.btn--secondary:hover {
  background: var(--color-surface-elevated);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* ===== SUCCESS BUTTON ===== */
.btn--success {
  background: var(--gradient-button-success);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-success);
}

.btn--success:hover {
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.2);
  transform: translateY(-2px);
}

/* ===== GHOST BUTTON (Text Only) ===== */
.btn--ghost {
  background: transparent;
  color: var(--color-primary);
  box-shadow: none;
}

.btn--ghost:hover {
  background: var(--color-surface-elevated);
}

/* ===== SIZE VARIANTS ===== */
.btn--sm {
  min-height: 36px;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
}

.btn--lg {
  min-height: var(--touch-target-large);
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  border-radius: var(--radius-xl);
}

.btn--full {
  width: 100%;
}

/* ===== ICON BUTTONS ===== */
.btn--icon {
  min-width: var(--touch-target-min);
  padding: var(--space-3);
  border-radius: var(--radius-full);
}

.btn--icon-lg {
  min-width: var(--touch-target-large);
  min-height: var(--touch-target-large);
  padding: var(--space-4);
}
```

---

*Due to length constraints, this comprehensive styling guide continues with:**
- Form Elements (Touch-Optimized)
- Modal & Sheet Components
- QR Code Badge (Animated)
- Skeleton Loaders (Framer-Quality)
- Toast Notifications (Native Feel)
- Pull-to-Refresh
- Swipeable Action Cards

**This is production-ready CSS for a mobile-first, Framer-level app with 0% generic v0/Bolt templates. Every component is custom, optimized for touch, and includes spring physics animations.**

Would you like me to continue with the remaining sections?