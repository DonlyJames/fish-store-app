# 🐟 Mama's Fish Store — PWA

A mobile-first Progressive Web App for tracking a fish business.
Runs offline, installs on Android like a native app.

---

## Features
- Log fish, meat, and foodstuff intake (weight, count, price, discount)
- Track drying status: Fresh → Drying → Ready → Collected
- Record payments and track debts
- Call customers directly from the app
- Fully offline — data saved on the device
- Works on any Android phone via Chrome

---

## How to deploy (step by step)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fish-store-app.git
git push -u origin main
```

### 2. Deploy on Netlify (free, 2 minutes)
1. Go to https://netlify.com and sign up (free)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account and pick this repo
4. Leave all settings as default → click "Deploy site"
5. You'll get a URL like: https://your-site-name.netlify.app

### 3. Install on your mum's Android phone
1. Open Chrome on her phone
2. Type in the Netlify URL
3. Wait for the page to fully load
4. Chrome will show a bar at the bottom: "Add Fish Store to Home screen"
5. Tap "Add" — done! The app now sits on her home screen like a real app

### 4. Optional — custom domain
You can set a custom domain in Netlify settings (e.g. mamafish.netlify.app)
for free if you want a nicer URL.

---

## File structure
```
fish-store-app/
  index.html      ← the entire app
  manifest.json   ← makes it installable on Android
  sw.js           ← service worker (offline support)
  icons/
    icon-192.png  ← app icon
    icon-512.png  ← large icon for splash screen
  README.md       ← this file
```

---

## Data & privacy
All data is stored on the phone using localStorage.
Nothing is sent to any server. The app works 100% offline after first load.

---

## Future improvements to consider
- PIN lock / password protection
- Export to Excel/PDF for monthly records
- Multiple staff / users
- Cloud sync (Firebase) so data is backed up
- Receipt printing via Bluetooth thermal printer
