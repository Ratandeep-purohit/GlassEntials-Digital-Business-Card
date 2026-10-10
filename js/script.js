/* ─────────────────────────────────────────────────────────────
   GLASSENTIALS — Digital Business Card
   Centralized configuration. Edit the `business` object only.
───────────────────────────────────────────────────────────── */
const business = {
  companyName: "GLASSENTIALS",
  description: "Architectural glass and mirror solutions for considered spaces.",
  websiteUrl: "https://glassentials.com",
  whatsappNumber: "919824298202",   // digits only, with country code
  phoneNumber: "+91 99980 67038",
  email: "sales@glassentials.com",
  mapsUrl: "https://maps.app.goo.gl/TaSCnhMf97uUhX999",
  catalogueUrl: "",                 // optional override external URL
  catalogues: [
    { title: "Product Catalogue", category: "General", url: "https://drive.google.com/file/d/1SFr4ecpiO6_2inFzN-ZlHEH-ECRFkDaT/view?usp=drive_link" },
    { title: "Mirror Catalogue", category: "Mirrors", url: "https://drive.google.com/file/d/1HLEtTL5dX41L0jLJNU8KSWMYsZywnRKZ/view?usp=drive_link" },
    { title: "LED Mirror Catalogue", category: "Mirrors", url: "https://drive.google.com/file/d/1dCJjFqzANF7D0AngHEVUj7ektKjSH5Go/view?usp=drive_link" },
    { title: "Decorative Glass Bricks Catalogue", category: "Glass Blocks & Bricks", url: "https://drive.google.com/file/d/1Ff9TDn_ZJcvnvMd5UFx27FxsXbmttwol/view?usp=drive_link" },
    { title: "Solid Glass Bricks Catalogue", category: "Glass Blocks & Bricks", url: "https://drive.google.com/file/d/1ZdLFEBaG5AyjPrg30qZhi__FpVI-KF-9/view?usp=drive_link" },
    { title: "Glass Block Catalogue", category: "Glass Blocks & Bricks", url: "https://drive.google.com/file/d/1dwxFxsCJPhrZfKXZM7qdGLGOajDI4TGl/view?usp=drive_link" },
    { title: "Glass Partition Systems", category: "Partitions & Systems", url: "https://drive.google.com/file/d/16QFUa2xJ3g5iDsp5o0H-U2YCHD3yE3yf/view?usp=drive_link" },
    { title: "Aluminium Slim Profile Systems", category: "Partitions & Systems", url: "https://drive.google.com/file/d/18As_-k5ekrzbzrUsEG-E_wbsuaDXTHlA/view?usp=drive_link" },
    { title: "Glass Film Catalogue", category: "Films & Fabrics", url: "https://drive.google.com/file/d/1Fy6nXQVMrLZ9ubAWfH3Ve4GXfOHqavef/view?usp=drive_link" },
    { title: "Fabric for Laminated Glass", category: "Films & Fabrics", url: "https://drive.google.com/file/d/1AXjz43NMv9-ffJASexqM45LpQ3FHUDU1/view?usp=drive_link" }
  ],
  quoteUrl: "",   // if empty, falls back to WhatsApp with quote message
  contactUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  address: ""
};

const MSG_QUOTE = "Hello Glassentials, I would like to request a quotation for glass or mirror requirements.";
const MSG_HELLO = "Hello Glassentials, I have an enquiry about your architectural glass solutions.";

/* ── Helpers ── */
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const isExternal = (url) => /^https?:\/\//i.test(url);
const isLocal = (url) => !!url && !/^(?:[a-z]+:|\/\/)/i.test(url);
const isValidUrl = (url) => isExternal(url) || isLocal(url);
const safe = (v) => (typeof v === "string" ? v.trim() : "");
const waUrl = (num, msg = "") => {
  const d = String(num || "").replace(/\D/g, "");
  return d ? `https://wa.me/${d}${msg ? `?text=${encodeURIComponent(msg)}` : ""}` : "";
};

/* ── SVG Icon Library ── */
const SVG = {
  catalogue: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  website: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  glass: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  mirror: `<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>`,
  portfolio: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  location: `<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  email: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  vcard: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`
};

/* ── Card definitions ── */
function buildCards() {
  const wa = waUrl(business.whatsappNumber, MSG_HELLO);
  const hasCats = business.catalogues.length > 0 || isValidUrl(safe(business.catalogueUrl));

  return [
    {
      id: "01", title: "View Catalogue", label: "Open Library", featured: true,
      icon: SVG.catalogue,
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop",
      action: () => qs("#catalogue-dialog").showModal(),
      show: hasCats
    },
    {
      id: "02", title: "Visit Website", label: "glassentials.com", featured: true,
      icon: SVG.website,
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&auto=format&fit=crop",
      action: () => window.open(business.websiteUrl, "_blank", "noopener,noreferrer"),
      show: isValidUrl(safe(business.websiteUrl))
    },
    {
      id: "03", title: "Contact Us", sub: "Get in touch",
      icon: SVG.phone,
      img: null,
      action: () => {
        if (isValidUrl(safe(business.contactUrl))) window.open(business.contactUrl, "_blank", "noopener,noreferrer");
        else if (safe(business.phoneNumber)) window.location.href = `tel:${business.phoneNumber.replace(/[^\d+]/g, "")}`;
      },
      show: isValidUrl(safe(business.contactUrl)) || !!safe(business.phoneNumber)
    },
    {
      id: "04", title: "WhatsApp Us", sub: "Chat with our team",
      icon: SVG.whatsapp,
      img: null,
      action: () => window.open(wa, "_blank", "noopener,noreferrer"),
      show: !!wa
    },
    {
      id: "05", title: "Get Directions", sub: "Visit our office",
      icon: SVG.location,
      img: null,
      action: () => window.open(business.mapsUrl, "_blank", "noopener,noreferrer"),
      show: isValidUrl(safe(business.mapsUrl))
    },
    {
      id: "06", title: "Email Us", sub: safe(business.email) || "Send us a message",
      icon: SVG.email,
      img: null,
      action: () => { if (safe(business.email)) window.location.href = `mailto:${business.email}`; },
      show: !!safe(business.email)
    },
    {
      id: "17", title: "Save Contact", sub: "Add to your phone",
      icon: SVG.vcard,
      img: null,
      action: downloadVCard,
      show: true
    }
  ];
}

/* ── Catalogue dialog ── */
function initCatalogueDialog() {
  const dialog = qs("#catalogue-dialog");
  const groupsEl = qs("#catalogue-groups");
  const items = [...business.catalogues];
  const extCat = safe(business.catalogueUrl);
  if (isValidUrl(extCat)) items.push({ title: "Online Catalogue", category: "Online", url: extCat });

  const ORDER = ["General", "Mirrors", "Glass Blocks & Bricks", "Partitions & Systems", "Films & Fabrics", "Online"];
  ORDER.forEach((cat) => {
    const matches = items.filter((i) => i.category === cat);
    if (!matches.length) return;
    const sec = document.createElement("section");
    sec.className = "catalogue-group";
    const h = document.createElement("h3");
    h.textContent = cat;
    sec.append(h);
    matches.forEach((item) => {
      const a = document.createElement("a");
      a.className = "catalogue-option";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.href = item.url || `Cateloge/${encodeURIComponent(item.file)}`;
      a.innerHTML = `<span>${item.title}</span><span class="catalogue-option-arrow">↗</span>`;
      sec.append(a);
    });
    groupsEl.append(sec);
  });

  qs("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
}

/* ── Render action cards ── */
function renderCards() {
  const featuredContainer = qs("#featured-cards");
  const gridContainer     = qs("#cards-list");
  const allCards = buildCards().filter((c) => c.show);

  const featuredCards = allCards.filter((c) => c.featured);
  const gridCards     = allCards.filter((c) => !c.featured);

  /* Render featured cards */
  featuredCards.forEach((card) => {
    const el = document.createElement("div");
    el.className = "featured-card";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", card.title);

    const activate = () => card.action();
    el.addEventListener("click", activate);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });

    el.innerHTML = `
      <span class="featured-num">${card.id}</span>
      <div class="featured-body">
        <div class="featured-icon">${card.icon}</div>
        <div class="featured-title">${card.title}</div>
        ${card.label ? `<div class="featured-label">${card.label}</div>` : ""}
      </div>
      <div class="featured-right">
        <div class="featured-arrow">${SVG.arrow}</div>
        ${card.img ? `` : ""}
      </div>
      ${card.img ? `<div class="featured-photo"><img src="${card.img}" alt="${card.title}" loading="lazy"></div>` : ""}
    `;
    featuredContainer.append(el);
  });

  /* Divider between featured and grid */
  if (featuredCards.length && gridCards.length) {
    const div = document.createElement("div");
    div.className = "cards-divider";
    div.innerHTML = `<span class="cards-divider-rule"></span><span class="cards-divider-label">MORE OPTIONS</span><span class="cards-divider-rule"></span>`;
    gridContainer.before(div);
  }

  /* Render grid cards */
  gridCards.forEach((card) => {
    const el = document.createElement("div");
    el.className = "action-card";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", card.title);

    const activate = () => card.action();
    el.addEventListener("click", activate);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } });

    el.innerHTML = `
      <span class="card-num">${card.id}</span>
      <div class="card-top">
        <div class="card-icon">${card.icon}</div>
      </div>
      <div class="card-bottom">
        <div class="card-title">${card.title}</div>
        <div class="card-arrow">${SVG.arrow}</div>
      </div>
    `;
    gridContainer.append(el);
  });
}

/* ── Render social links ── */
function renderSocials() {
  const section = qs("#social-section");
  const row = qs("#social-row");
  const SOCIAL = [
    { key: "instagramUrl", label: "Instagram", icon: SVG.instagram },
    { key: "facebookUrl", label: "Facebook", icon: SVG.facebook },
    { key: "linkedinUrl", label: "LinkedIn", icon: SVG.linkedin },
    { key: "youtubeUrl", label: "YouTube", icon: SVG.youtube }
  ];
  SOCIAL.forEach(({ key, label, icon }) => {
    const url = safe(business[key]);
    if (!isExternal(url)) return;
    const a = document.createElement("a");
    a.className = "social-item";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", label);
    a.innerHTML = `<div class="social-icon-wrap">${icon}</div><span class="social-name">${label}</span>`;
    row.append(a);
  });
  if (row.children.length) section.hidden = false;
}

/* ── Header/nav ── */
function initHeader() {
  const toggle = qs("#nav-toggle");
  const nav = qs("#main-nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    nav.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  qsa("[data-close-nav]").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      nav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    })
  );
}

/* ── Quote CTA ── */
function initHeroCta() {
  const btn = qs("#hero-cta");
  const quote = safe(business.quoteUrl);
  const wa = waUrl(business.whatsappNumber, MSG_QUOTE);

  btn.addEventListener("click", () => {
    if (isValidUrl(quote)) window.open(quote, "_blank", "noopener,noreferrer");
    else if (wa) window.open(wa, "_blank", "noopener,noreferrer");
  });
}

/* ── Footer ── */
function initFooter() {
  qs("#year").textContent = new Date().getFullYear();
  const webLink = qs("[data-link='footer-website']");
  const url = safe(business.websiteUrl);
  if (isExternal(url)) {
    webLink.href = url;
    webLink.textContent = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") + " ↗";
    webLink.hidden = false;
  }
}

/* ── Meta & company name ── */
function initMeta() {
  qsa("[data-company]").forEach((el) => { el.textContent = business.companyName; });
  document.title = `${business.companyName} | Digital Business Card`;
  qs('meta[name="description"]').content = business.description;
  qs('meta[property="og:title"]').content = `${business.companyName} | Digital Business Card`;
  qs('meta[property="og:description"]').content = business.description;
  const og = qs('meta[property="og:url"]');
  if (og && isExternal(safe(business.websiteUrl))) og.content = business.websiteUrl;
}

/* ── vCard download ── */
function downloadVCard() {
  const phone = safe(business.phoneNumber);
  const email = safe(business.email);
  const website = safe(business.websiteUrl);
  const address = safe(business.address);

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${vc(business.companyName)}`,
    `ORG:${vc(business.companyName)}`
  ];
  if (phone) lines.push(`TEL;TYPE=WORK,VOICE:${vc(phone)}`);
  if (business.whatsappNumber) lines.push(`TEL;TYPE=CELL,VOICE:+${business.whatsappNumber.replace(/\D/g, "")}`);
  if (email) lines.push(`EMAIL;TYPE=WORK:${vc(email)}`);
  if (website) lines.push(`URL:${vc(website)}`);
  if (address) lines.push(`ADR;TYPE=WORK:;;${vc(address)};;;;`);
  lines.push("END:VCARD");

  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const objUrl = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: objUrl, download: "Glassentials.vcf" });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(objUrl), 1000);
}

function vc(v) {
  return String(v || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/* ── Bootstrap ── */
document.addEventListener("DOMContentLoaded", () => {
  initMeta();
  initHeader();
  initHeroCta();
  initCatalogueDialog();
  renderCards();
  renderSocials();
  initFooter();
});
