import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        sans:    ["var(--font-plus-jakarta)", "var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "system-ui", "sans-serif"],
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      /* ------------------------------------------------------------------
         Typography scale (single source of truth)

         One Apple-style scale for the whole site. Every step carries its own
         line-height and letter-spacing so a size class alone produces correct
         rhythm; an explicit `leading-*` / `tracking-*` utility still wins
         because Tailwind emits those after fontSize.

         Display steps are fluid (clamp) and the breakpoints are chosen so the
         `text-display-sm md:text-display` / `text-hero-sm md:text-hero` pairs
         used across the site meet exactly at 768px - no jump, and no oversized
         heading on a phone.

           2xs  12px  eyebrow / micro label
           xs   13px  caption, table cell, meta
           sm   15px  small body, buttons, nav, card body
           base 17px  body (matches the <body> size)
           lg   19px  lede / intro paragraph
           xl   21px  card title / h4
           2xl  24px  h3 (compact)
           3xl  28px  h3
           4xl  32px  h2 (static)
           5xl  40px
           6xl  48px
           7xl  56px
           8xl  64px
           9xl  72px  hard ceiling - nothing on the site is larger
      ------------------------------------------------------------------ */
      fontSize: {
        "2xs":  ["0.75rem",    { lineHeight: "1.45", letterSpacing: "0.01em" }],
        xs:     ["0.8125rem",  { lineHeight: "1.5",  letterSpacing: "0" }],
        sm:     ["0.9375rem",  { lineHeight: "1.55", letterSpacing: "-0.005em" }],
        base:   ["1.0625rem",  { lineHeight: "1.6",  letterSpacing: "-0.01em" }],
        lg:     ["1.1875rem",  { lineHeight: "1.55", letterSpacing: "-0.012em" }],
        xl:     ["1.3125rem",  { lineHeight: "1.35", letterSpacing: "-0.018em" }],
        "2xl":  ["1.5rem",     { lineHeight: "1.3",  letterSpacing: "-0.022em" }],
        "3xl":  ["1.75rem",    { lineHeight: "1.22", letterSpacing: "-0.025em" }],
        "4xl":  ["2rem",       { lineHeight: "1.15", letterSpacing: "-0.028em" }],
        "5xl":  ["2.5rem",     { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        "6xl":  ["3rem",       { lineHeight: "1.08", letterSpacing: "-0.032em" }],
        "7xl":  ["3.5rem",     { lineHeight: "1.06", letterSpacing: "-0.034em" }],
        "8xl":  ["4rem",       { lineHeight: "1.05", letterSpacing: "-0.036em" }],
        "9xl":  ["4.5rem",     { lineHeight: "1.04", letterSpacing: "-0.038em" }],

        /* Semantic display steps - fluid, continuous across the md breakpoint. */
        "hero":       ["clamp(3.25rem, 5.6vw, 4.5rem)",  { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.035em" }],
        "hero-sm":    ["clamp(2.25rem, 7.2vw, 3.25rem)", { lineHeight: "1.07", fontWeight: "700", letterSpacing: "-0.032em" }],
        "display":    ["clamp(2.25rem, 3.6vw, 2.875rem)",{ lineHeight: "1.12", fontWeight: "400", letterSpacing: "-0.028em" }],
        "display-sm": ["clamp(1.75rem, 4.6vw, 2.25rem)", { lineHeight: "1.16", fontWeight: "400", letterSpacing: "-0.025em" }],
        "body-lg":    ["1.1875rem", { lineHeight: "1.55", letterSpacing: "-0.012em" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary:  { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:{ DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive:{ DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted:  { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover:{ DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card:   { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          mid: "hsl(var(--navy-mid))",
          lighter: "hsl(var(--navy-lighter, 193 89% 45%))",
        },
        gold: { DEFAULT: "hsl(var(--gold))", dark: "hsl(30 85% 36%)" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        brand: {
          navy: "#2B3D66",
          "navy-dark": "#1C2A48",
          "navy-muted": "#536485",
          blue: "#169DC8",
          "blue-light": "#EBF7FC",
          "blue-hover": "#1181A6",
          orange: "#F19326",
          "orange-hover": "#DE8017",
          surface: "#F7FBFD",
          "surface-alt": "#F0F6FA",
          "border-subtle": "#E2EDF5",
          "border-blue": "rgba(22, 157, 200, 0.25)",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer:   { from: { backgroundPosition: "-200% center" }, to: { backgroundPosition: "200% center" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "gradient-spin": {
          to: { "--angle": "360deg" } as unknown as Record<string, string>,
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "drift-slow": {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%":     { transform: "translate3d(0,-12px,0)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.55" },
          "50%":     { opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmerBar: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        float:    "float 4s ease-in-out infinite",
        shimmer:  "shimmer 3s linear infinite",
        "fade-up":"fade-up 0.55s cubic-bezier(.16,1,.3,1) forwards",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "gradient-spin":  "gradient-spin 6s linear infinite",
        "scan-line":      "scan-line 4s linear infinite",
        "drift-slow":     "drift-slow 9s ease-in-out infinite",
        "pulse-soft":     "pulse-soft 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gradient-flow": "gradientFlow 5s ease infinite",
        "shimmer-bar": "shimmerBar 3s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
