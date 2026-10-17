# Free Fire Diamonds · Isaac Diamond Store

Online order page and admin console for selling Free Fire diamond top-ups.
Live at **https://id.yonghangishak.com.np**

| File | What it is |
|---|---|
| `index.html` | Customer order page: pick a pack, enter UID, pay by QR / bank, upload the payment screenshot, track the order live |
| `admin.html` | Admin console (Diamond Counter): orders, sales ledger, dollar card + Razer Gold, pricing, coupons, reviews, reports, backup |
| `404.html` | Sends any wrong link to the order page (keeps `?o=` tracking links working) |
| `sw.js` | Service worker for order notifications. It does **not** cache pages, so updates show up right away |
| `manifest.json`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | "Add to Home screen" app icon |
| `og-image.png` | Preview picture when the link is shared on WhatsApp / Facebook |
| `robots.txt`, `sitemap.xml` | Search engines see the order page, not the admin |
| `CNAME` | Custom domain for GitHub Pages |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## One-time Firebase setup (project `free-fire-daimonds-2e4f1`)

1. **Authentication → Sign-in method**: enable **Anonymous** and **Google**.
2. **Authentication → Settings → Authorized domains**: add `id.yonghangishak.com.np`.
3. **Firestore → Rules**: open `admin.html` → Help → Orders, copy the rules and **Publish** them.
   Publish again every time the rules in Help change.

## Updating the site

Edit or upload the files in this repo. GitHub Pages publishes within a few minutes.
After an update, open the admin once and check the **Launch checklist** on the dashboard.

## Data

All data lives in Firebase (Firestore), not in this repo:
`orders`, `customers`, `payshots` (payment screenshots), `dshots` (delivery proof), `reviews`,
`public/prices`, `public/pay`, and the admin's own `users/{uid}/…` (sales, dollar card, settings).
Download a backup from **Admin → Backup & restore** every week.
