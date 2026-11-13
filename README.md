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

## v5.1 — what changed
- Bottom bar is now Home, Add, Stock, **Debts**, More (Expenses moved into More).
- Sales and purchases are only **Catfish** (per kg) and **Kpomo** (per piece).
  Quantity, price and amount are linked: type any two and the third fills in.
- Sale prices are remembered per product (dried catfish, fresh catfish, kpomo)
  and can be changed in Settings or on the sale page; they stay until changed.
- **Kpomo stock and profit**: stock = bought − sold − taken out; profit uses
  the average price paid per piece. Summary has a Kpomo section; "Take out of
  stock" records own use / spoiled pieces. Selling more than is in stock asks
  first. Opening stock = record a purchase with the old date.
- Add page: Tilapia replaced by Chicken, "Other / select" removed. The drying
  amount now always follows the Settings rate (and shows the rate).
- People screen shows "Biz" again.
- Fix: coming back online no longer tries a background Google popup.

## v5.0 — what changed
- **Sales**: record fish sold (Dried or Fresh, per kg), with cash / transfer,
  part payment or credit. Back-date any sale to record an older one.
- **Purchases**: record fresh fish bought from suppliers, same payment options.
- **One person, one record**: drying customers, buyers and suppliers are
  merged by phone number (any format: 0803…, +234 803…), then by name. Two
  people with the same name but different phones stay separate.
- **Debts** now has two sides — *Owed to you* and *You owe* — with a net
  position, "Receive payment / Pay" (paid against the oldest debts first), and
  **Set off**, which cancels what a person owes you against what you owe them.
- **Old debts**: "+ Old debt" records money owed from before the app (either
  direction) with a past date.
- **Receipts** for sales and purchases (share image or WhatsApp).
- Summary and Expenses screens now show fish sales received and fish
  purchases paid (cash only — it is not a profit figure).
- **Google sign-in**: the sign-in is kept on the phone, renewed on your next
  tap instead of from a background timer, and can no longer hang on
  "Signing in…". See the note below about its limits.
- Payments record whether they were cash or transfer.

### Google sync — known limit
Google's browser sign-in only lasts one hour and cannot be renewed silently on
a phone. The app now renews it on the next tap ("Tap to sync"). For sync that
never asks again, the data needs to live on a small server (e.g. Firebase or
your own API) instead of Google Drive.

## v4.0 — what changed
- **Removed the buy/sell dry-fish shop feature** (purchases, sales, stock
  tracking) — the app is now focused purely on the drying service and
  expenses.
- **Fish type on intake now defaults to Catfish** (the dropdown is still
  there if it's something else). The price field pre-fills with what was
  last charged for that type — starting at ₦350 for Catfish — but it's
  always editable, never fixed.
- **Drying expense, recorded in one tap**: on the intake screen there's now
  a checkbox "Pay for drying this visit?", checked by default, with the
  amount pre-filled at the weight × the drying rate (₦50/kg by default, set
  it in Settings → "Drying charge you pay"). Uncheck it for the times she
  doesn't pay, or edit the amount if it's different that visit.
- **Shop screen is now "Expenses"**: record an expense (Drying and Cleaning
  are the first two options, since they're the most common), see This
  month / Last month / All time totals against drying revenue collected,
  and the full expense list below.
- Debts and Customers screens are simpler now too, since they no longer
  need to track supplier or dry-fish-sale debts — just drying service.

## v3.1 — what was fixed
The app failed to start properly on every load because of a missing element
reference, which meant multi-device sync, the date header, and the
background sync loop never ran. Also fixed:
- Real cross-device sync (was silently broken — see below)
- Deleting a record now deletes it everywhere, not just on the phone you deleted it from
- Two phones can now safely add records at the same time without one overwriting the other
- Pinch-to-zoom / a working "display size" control (the old font-size setting broke the layout)
- A crash when saving a sale
- Customer names with an apostrophe (e.g. "Mummy J's") no longer break the Call/WhatsApp buttons on that record
- Dates no longer shift by a day depending on time of night
- Broken receipt/acknowledgement header text size
- Added: manual "Sync now" button + last-synced status, and a backup export/import (Settings → Backup)

### How multi-device sync works now
1. On Settings, sign in with the same Google account on both phones.
2. Each phone keeps its own local copy and quietly uploads/downloads a shared
   file in your Google Drive's private app storage (not visible in your
   regular Drive) every time you make a change, when you reopen the app, and
   every 30 seconds while it's open.
3. If you're offline, changes are saved locally and sent the next time you're
   back online — nothing is lost.
4. Use "Sync now" in Settings any time you want to force it immediately.

## Future improvements to consider
- PIN lock / password protection
- Export to Excel/PDF for monthly records
- Multiple staff / users
- Receipt printing via Bluetooth thermal printer
