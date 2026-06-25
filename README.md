# Mentari Sehat Indonesia Karanganyar

Project frontend ini sudah dipindah ke Vite.

## Scripts

- `npm run start` or `npm run dev`: jalankan Vite dev server
- `npm run build`: build produksi ke `dist/` lalu obfuscate bundle JS
- `npm run ssr`: jalankan server Express untuk serve hasil build
- `npm run full`: build lalu start server Express

## Environment

File `.env` lama masih didukung. `vite.config.js` membaca kedua format berikut:

- `REACT_APP_BASE_URL`
- `REACT_APP_IMAGE_URL`
- `REACT_APP_SERVICE_ID`
- `REACT_APP_TEMPLATE_ID`
- `REACT_APP_PUBLIC_KEY`

Kalau ingin, kamu juga bisa pindah bertahap ke prefix `VITE_` untuk variabel baru.
