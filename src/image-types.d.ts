// Override Next.js's StaticImageData type for static image imports.
// In this project, images are processed by webpack's asset/resource loader
// which returns a plain URL string – identical to Vite's behaviour.
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.gif' { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
declare module '*.avif' { const src: string; export default src; }
declare module '*.ico' { const src: string; export default src; }
declare module '*.bmp' { const src: string; export default src; }
