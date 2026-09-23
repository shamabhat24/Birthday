# Chinnu's Birthday Surprise 🌸 (React + Vite)

Same 3-stage flow as before — DOB verification → loading → confetti reveal → story —
rebuilt as a proper React app.

## Structure
```
src/
  config.js              ← her birthday + loading messages (edit this first)
  App.jsx                ← controls which stage is showing
  index.css              ← all colors/fonts/layout (edit :root for theme)
  components/
    VerifyPage.jsx        page 1: the DOB gate
    LoadingScreen.jsx     the "Checking... Verifying..." sequence
    RevealPage.jsx        page 2: confetti + happy birthday
    StoryPage.jsx         page 3: placeholder — put the real content here
    Flower.jsx            reusable decorative SVGs
    BackgroundPetals.jsx  floating background petals
```

## Run it
You'll need [Node.js](https://nodejs.org) installed (18+ is fine).

```bash
npm install
npm run dev
```

Open the localhost link it prints (usually `http://localhost:5173`). Vite hot-reloads
on every save, so edits show up instantly.

## Things you'll likely want to edit
- **Her birthday**: `CORRECT_DOB` in `src/config.js` (format: `yyyy-mm-dd`).
- **Colors**: the `:root { ... }` block at the top of `src/index.css`.
- **The actual birthday story**: `src/components/StoryPage.jsx` — swap the placeholder
  paragraphs for your real message, photos, whatever.
- **Loading messages**: `LOADING_STEPS` in `src/config.js`.

## Putting it online
```bash
npm run build
```
This outputs a `dist/` folder — a plain static site, no server needed. Drag that
`dist/` folder into **app.netlify.com/drop** and you'll get a live link to send her.
(Netlify can also build straight from a GitHub repo if you'd rather not run the
build yourself each time — just set the build command to `npm run build` and the
publish directory to `dist`.)
