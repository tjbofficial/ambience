# Ambience

A generative ambient music visualiser for mobile browsers. Tap the screen to seed a note -- it renders as an expanding, colour-tinted shape and a synthesized pad or bell. As shapes reach the screen edge (or reflect off one another like ripples in a pond) they trigger further notes within the active scale, building an evolving ambient texture with no fixed loop.

## Files

- `index.html` -- the entire app: Web Audio synth engine, canvas visualiser, and toolbar. Single self-contained file, no build step, no dependencies.
- `manifest.json` -- PWA manifest so the app can be added to a phone's home screen with a proper name and icon.
- `ambience-icon_192x192.png`, `ambience-icon_512x512.png` -- app icons referenced by `manifest.json`. Place these two files alongside `index.html` in the repo root (they are not included in this delivery -- copy your existing icon files in here).
- `pitch-map.html` -- a standalone reference tool for previewing which note lands where on the 9:16 frame for a given Key/Scale, independent of the main app.

## Running it

Open `index.html` directly in any modern mobile browser, or serve the folder with any static file host. No server-side code, no build step.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo's Settings -> Pages, set the source to the branch/folder containing `index.html` (typically the repo root on `main`).
3. Once published, visiting the Pages URL on a phone and using "Add to Home Screen" will pick up the name and icon from `manifest.json`.

## Controls

- Play/Stop -- starts or stops playback. Tapping the visualiser itself also starts playback if nothing is currently playing.
- Key -- cycles through the 12 keys via the circle of fifths (C, G, D, A, E...) rather than chromatically.
- Scale -- cycles through the available scales/modes (labelled with roman-numeral or chord-symbol shorthand).
- Shape -- cycles the visualiser's shape generator (circle, pentagon, hexagon, ripple, triangle, quad).
- Timer -- Off / 15 min / 60 min auto-stop, with a live countdown and a slow fade-out rather than an abrupt cut when it reaches zero.
