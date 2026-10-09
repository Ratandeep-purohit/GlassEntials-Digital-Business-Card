# Glassentials Digital Business Card

A lightweight, mobile-first business card site built with HTML, CSS, and vanilla JavaScript. It is ready for static hosting. Business contact details are intentionally left blank until official values are supplied.

## Configure business details

Edit the `business` object near the top of `js/script.js`. Replace each `TODO` placeholder with an official value. Keep optional fields as empty strings (`""`) when unavailable; their links stay hidden. Website, contact, catalogue, maps, quote, and social URLs should be complete `https://` URLs. Enter the WhatsApp number with country code and digits only. The `phoneNumber`, `email`, `address`, and `description` values are used for visible details and the downloadable contact file.

If `quoteUrl` is configured, Request a Quote opens that page. Otherwise, it opens a WhatsApp chat with the supplied number and a prefilled request. If neither is configured, the quote action remains hidden.

## Logo and catalogue

The current identity is text based, with a simple SVG favicon at `assets/favicon.svg`. To use the official logo, add the approved logo file under `assets/` and update the brand markup in `index.html`; keep the image dimensions modest and provide descriptive alternative text.

The Catalogue link opens a chooser grouped by product category. Its PDF list is configured in the `business.catalogues` array in `js/script.js`; each item has a title, category, and exact filename. Keep the PDFs in the `Cateloge/` folder and preserve their filenames, or update the `file` value to match. The optional `catalogueUrl` adds an online catalogue entry to the chooser. Include the `Cateloge/` folder when deploying so its links continue to work.

Social links for Instagram, Facebook, LinkedIn, and YouTube are shown only when their official URLs are configured. Do not add a platform URL unless it belongs to Glassentials.

## Test locally

Open `index.html` directly, or serve the folder with any static file server. For example, with Python installed:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. Check the configured links on a phone and desktop. Save Contact creates `Glassentials.vcf` in the browser without a server. Test the layout at 320, 360, 375, 390, 430, 768, 1024, and 1440 CSS pixels; the page is designed to reflow without horizontal scrolling.

## Deploy and connect a subdomain

Upload the contents of this folder to the document root for the chosen static host or subdomain, for example `connect.glassentials.com`. Keep the `css/`, `js/`, and `assets/` folders beside `index.html`; all asset references are relative. Configure the subdomain's DNS record with the values supplied by the hosting provider, add the custom domain in the host control panel, and enable its HTTPS certificate. DNS and certificate setup depend on the hosting provider. After propagation, open the HTTPS URL on mobile and use that final URL for the QR code.
