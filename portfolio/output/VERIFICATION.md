# Verification

- `npm run lint`
- `npm run build`
- Browser checks in headless Microsoft Edge:
  - Three featured projects and all five side projects are present.
  - All / Web / AI / Games filters return the expected projects.
  - Behind-the-build disclosures open and close.
  - Email copying writes the correct address to the clipboard.
  - Live 3D loads on desktop and mobile; drag, keyboard rotation, pause, and reset work.
  - Returning to Cinematic disposes the WebGL canvas.
  - Reduced-motion preferences stop artwork animation and use the still model view.
  - Failed model downloads show the local fallback and a clear status.
  - Mobile navigation opens, closes on selection, and closes with Escape.
  - No horizontal page overflow at 320, 390, 768, 1024, 1440, or 1920 pixels.
  - Core project and contact content remains available without JavaScript.
  - No uncaught page errors during the interaction checks.

Screenshots: `redesign-desktop.png`, `redesign-work.png`, `redesign-about.png`,
`redesign-contact.png`, `redesign-mobile.png`, and `redesign-live-3d.png`.
