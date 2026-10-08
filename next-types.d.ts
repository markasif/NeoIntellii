/// <reference types="next" />

// NOTE: This file replaces next-env.d.ts to prevent Next.js's StaticImageData
// type from overriding our string-based image imports (we use asset/resource
// in webpack so images resolve to URL strings, identical to Vite behaviour).
