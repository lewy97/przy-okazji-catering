// Strona czyta treść z plików JSON w /content, które edytuje się w panelu /admin.

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

const load = (name) => fetch(`/content/${name}.json`, { cache: "no-cache" }).then((r) => r.json());

const stars = (rating) =>
  `<span class="stars" role="img" aria-label="Ocena ${rating} na 5"><span style="width:${(Math.max(0, Math.min(5, rating)) / 5) * 100}%"></span></span>`;

const GOOGLE_G = `<svg class="google-g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;

// --- Ozdobniki w stylu Instagrama: lawenda, drewniana łyżka i widelec ---

const LAV = "#8a76ad", LAV_DARK = "#6f5b94", LEAF = "#6f7d60", WOOD = "#a8744b", WOOD_DARK = "#7d5233";

function lavenderSprig(x, y, len, angle) {
  let buds = "";
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const by = -len + t * len * 0.55;
    const side = i % 2 ? 1 : -1;
    const r = 2.6 + t * 0.6;
    buds += `<ellipse cx="${side * 2.2}" cy="${by}" rx="${r}" ry="${r * 1.6}" fill="${i % 3 ? LAV : LAV_DARK}" transform="rotate(${side * 20} ${side * 2.2} ${by})"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path d="M0 0 L0 ${-len}" stroke="${LEAF}" stroke-width="1.6"/>${buds}</g>`;
}

let logoId = 0;
function logoSvg() {
  const id = `arc${logoId++}`;
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Logo Przy okazji! Catering">
    <defs><path id="${id}" d="M38 104 A62 62 0 0 1 162 104"/></defs>
    <circle cx="100" cy="100" r="97" fill="#f7f2e5" stroke="${WOOD}" stroke-width="2"/>
    <circle cx="100" cy="100" r="88" fill="none" stroke="${LEAF}" stroke-width="1" stroke-dasharray="2 4"/>
    <text font-family="Cinzel, serif" font-size="19" font-weight="700" fill="${WOOD_DARK}" letter-spacing="2">
      <textPath href="#${id}" startOffset="50%" text-anchor="middle">PRZY OKAZJI</textPath>
    </text>
    ${lavenderSprig(86, 150, 78, -16)}
    ${lavenderSprig(114, 150, 78, 16)}
    <g transform="rotate(-32 100 108)">
      <ellipse cx="100" cy="66" rx="12" ry="17" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.5"/>
      <ellipse cx="100" cy="64" rx="7" ry="11" fill="#c08e62" opacity=".7"/>
      <rect x="96.5" y="81" width="7" height="66" rx="3.5" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.5"/>
    </g>
    <g transform="rotate(32 100 108)">
      <path d="M88 52 v16 a12 9 0 0 0 24 0 v-16" fill="none" stroke="${WOOD_DARK}" stroke-width="1.5"/>
      <path d="M88 52 v16 a12 9 0 0 0 24 0 v-16 h-4 v15 h-4 v-15 h-4 v15 h-4 v-15 h-4 v15 h-4 z" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.2"/>
      <rect x="96.5" y="76" width="7" height="71" rx="3.5" fill="${WOOD}" stroke="${WOOD_DARK}" stroke-width="1.5"/>
    </g>
    <text x="100" y="174" text-anchor="middle" font-family="'Great Vibes', cursive" font-size="27" fill="${WOOD_DARK}">Catering</text>
  </svg>`;
}

function dividerSvg() {
  let s = `<svg viewBox="0 0 240 28" aria-hidden="true"><path d="M14 14 Q120 9 226 14" stroke="${LEAF}" stroke-width="1.4" fill="none"/>`;
  for (const dir of [-1, 1]) {
    for (let i = 0; i < 10; i++) {
      const x = 120 + dir * (52 + i * 6.5);
      const y = 13 + (i % 2 ? -3 : 3);
      s += `<ellipse cx="${x}" cy="${y}" rx="${3.4 - i * 0.14}" ry="2.2" fill="${i % 3 ? LAV : LAV_DARK}" transform="rotate(${dir * (i % 2 ? -25 : 25)} ${x} ${y})"/>`;
    }
    for (let i = 0; i < 3; i++) {
      const x = 120 + dir * (16 + i * 12);
      s += `<ellipse cx="${x}" cy="${i % 2 ? 9 : 17}" rx="7" ry="2.4" fill="${LEAF}" transform="rotate(${dir * (i % 2 ? -18 : 18)} ${x} ${i % 2 ? 9 : 17})"/>`;
    }
  }
  return s + `<circle cx="120" cy="12" r="3" fill="${LAV}"/></svg>`;
}

let customLogo = "";
const logoHtml = () => customLogo
  ? `<img src="${esc(encodeURI(customLogo))}" alt="Logo" style="width:100%;height:100%;object-fit:contain;border-radius:50%">`
  : logoSvg();

function paintDecorations() {
  document.querySelectorAll(".logo-mark").forEach((el) => (el.innerHTML = logoHtml()));
  document.querySelectorAll(".divider").forEach((el) => (el.innerHTML = dividerSvg()));
}

function setPhoto(el, url, photoClass) {
  if (url) {
    el.classList.remove("placeholder-img");
    el.classList.add(photoClass);
    el.style.backgroundImage = `url("${encodeURI(url)}")`;
    el.innerHTML = "";
  } else {
    el.classList.add("placeholder-img");
    el.innerHTML = `<span class="logo-mark"></span>`;
  }
}

// --- Sekcje ---

function renderSettings(s) {
  customLogo = s.logo || "";
  const pageTitle = document.body.dataset.title;
  if (pageTitle) document.title = `${pageTitle} – ${s.name || "Catering"}`;
  else document.title = s.name ? `${s.name} – ${s.tagline || "catering"}` : "Catering";
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = s[el.dataset.bind];
    if (v) el.textContent = v;
  });

  const hero = document.getElementById("hero-visual");
  if (hero) hero.innerHTML = s.heroImage
    ? `<div class="hero-photo" style="background-image:url('${esc(encodeURI(s.heroImage))}')"></div>`
    : `<span class="logo-mark logo-hero"></span>`;

  const tel = s.phone ? `<a href="tel:${esc(s.phone.replace(/[\s-]/g, ""))}">${esc(s.phone)}</a>` : "";
  const mail = s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : "";

  const strip = document.getElementById("contact-strip");
  if (strip) strip.innerHTML = [
    tel && `<span>☎ ${tel}</span>`,
    mail && `<span>✉ ${mail}</span>`,
    s.area && `<span>🚗 ${esc(s.area)}</span>`
  ].filter(Boolean).join("");

  const items = [];
  if (tel) items.push(`<li><span class="label">Telefon</span>${tel}</li>`);
  if (mail) items.push(`<li><span class="label">E-mail</span>${mail}</li>`);
  if (s.address) items.push(`<li><span class="label">Skąd</span>${esc(s.address)}</li>`);
  if (s.area) items.push(`<li><span class="label">Dowóz</span>${esc(s.area)}</li>`);
  const social = [];
  if (s.instagram) social.push(`<a href="${esc(s.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  if (s.facebook) social.push(`<a href="${esc(s.facebook)}" target="_blank" rel="noopener">Facebook</a>`);
  if (social.length) items.push(`<li><span class="label">Obserwuj</span>${social.join(" · ")}</li>`);
  document.getElementById("contact-list").innerHTML = items.join("");

  if (s.instagram && document.getElementById("gallery-ig")) {
    document.getElementById("gallery-ig").innerHTML =
      `<a class="btn btn-ghost" href="${esc(s.instagram)}" target="_blank" rel="noopener">Więcej zdjęć na Instagramie</a>`;
  }
}

const menuSlug = (m) => "menu-" + String(m.title || "")
  .toLowerCase()
  .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function renderMenu(data) {
  const menus = data.menus || [];
  const grid = document.getElementById("menu-grid");
  const filters = document.getElementById("filters");
  const occasions = [...new Set(menus.map((m) => m.occasion).filter(Boolean))];

  const draw = (occasion) => {
    const list = occasion ? menus.filter((m) => m.occasion === occasion) : menus;
    if (!list.length) {
      grid.innerHTML = `<p class="empty">Wkrótce pojawią się tu propozycje menu.</p>`;
      return;
    }
    grid.innerHTML = list.map((m) => `
      <article class="menu-card" id="${menuSlug(m)}">
        ${m.image
          ? `<div class="menu-card-img" style="background-image:url('${esc(encodeURI(m.image))}')"></div>`
          : `<div class="menu-card-img placeholder-img"><span class="logo-mark"></span></div>`}
        <div class="menu-card-body">
          ${m.occasion ? `<span class="menu-tag">${esc(m.occasion)}</span>` : ""}
          <h3>${esc(m.title)}</h3>
          ${m.price ? `<p class="menu-price">${esc(m.price)}</p>` : ""}
          ${m.description ? `<p class="menu-desc">${esc(m.description)}</p>` : ""}
          ${(m.dishes || []).length ? `
            <details>
              <summary>Dania i składniki (${m.dishes.length})</summary>
              <ul class="dishes">
                ${m.dishes.map((d) => `
                  <li>
                    <span class="dish-name">${esc(d.name)}</span>
                    ${d.ingredients ? `<span class="dish-ing">${esc(d.ingredients)}</span>` : ""}
                  </li>`).join("")}
              </ul>
            </details>` : ""}
        </div>
      </article>`).join("");
    grid.querySelectorAll(".logo-mark").forEach((el) => (el.innerHTML = logoHtml()));
  };

  if (occasions.length > 1) {
    filters.innerHTML = [`<button class="filter active" data-o="">Wszystkie</button>`]
      .concat(occasions.map((o) => `<button class="filter" data-o="${esc(o)}">${esc(o)}</button>`))
      .join("");
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      draw(btn.dataset.o);
    });
  }
  draw("");

  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && target.classList.contains("menu-card")) {
    const det = target.querySelector("details");
    if (det) det.open = true;
    target.classList.add("highlighted");
    target.scrollIntoView({ block: "start" });
  }
}

// Strona główna: krótki podgląd oferty z linkami do podstrony /oferta/
function renderTeaser(data) {
  const menus = data.menus || [];
  document.getElementById("offer-tiles").innerHTML = menus.map((m) => `
    <a class="offer-tile" href="/oferta/#${menuSlug(m)}">
      ${m.image
        ? `<span class="offer-tile-img" style="background-image:url('${esc(encodeURI(m.image))}')"></span>`
        : `<span class="offer-tile-img placeholder-img"><span class="logo-mark"></span></span>`}
      <span class="offer-tile-title">${esc(m.title)}</span>
    </a>`).join("");
  document.querySelectorAll("#offer-tiles .logo-mark").forEach((el) => (el.innerHTML = logoHtml()));
}

// --- Blog ---

const sortedPosts = (data) => (data.posts || [])
  .filter((p) => p.title)
  .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

const postDate = (d) => {
  const t = d && new Date(`${String(d).slice(0, 10)}T12:00:00`);
  return t && !isNaN(t) ? t.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }) : "";
};

const postCard = (p) => `
  <a class="blog-card" href="/blog/wpis/?w=${encodeURIComponent(menuSlug(p).replace(/^menu-/, ""))}">
    ${p.image
      ? `<span class="blog-card-img" style="background-image:url('${esc(encodeURI(p.image))}')"></span>`
      : `<span class="blog-card-img placeholder-img"><span class="logo-mark"></span></span>`}
    <span class="blog-card-body">
      ${p.date ? `<span class="blog-date">${esc(postDate(p.date))}</span>` : ""}
      <span class="blog-card-title">${esc(p.title)}</span>
      ${p.excerpt ? `<span class="blog-excerpt">${esc(p.excerpt)}</span>` : ""}
      <span class="blog-read">Czytaj dalej →</span>
    </span>
  </a>`;

function renderBlogList(data, el, limit) {
  const posts = sortedPosts(data).slice(0, limit || undefined);
  el.innerHTML = posts.length ? posts.map(postCard).join("") : `<p class="empty">Wkrótce pojawią się tu pierwsze wpisy.</p>`;
  el.querySelectorAll(".logo-mark").forEach((m) => (m.innerHTML = logoHtml()));
  return posts.length;
}

// Treść wpisu jest w Markdownie (z panelu); bez bibliotek pokazujemy ją jako zwykłe akapity
function markdownHtml(md) {
  if (window.marked && window.DOMPurify) return DOMPurify.sanitize(marked.parse(md || ""));
  return String(md || "").split(/\n\s*\n/).map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
}

function renderPost(data) {
  const wrap = document.querySelector("#post .post-wrap");
  const slug = new URLSearchParams(location.search).get("w");
  const post = sortedPosts(data).find((p) => menuSlug(p).replace(/^menu-/, "") === slug);
  const back = `<p class="post-back"><a href="/blog/">← Wszystkie wpisy</a></p>`;
  if (!post) {
    wrap.innerHTML = back + `<p class="empty">Nie znaleziono tego wpisu.</p>`;
    return;
  }
  document.title = `${post.title} – Blog`;
  wrap.innerHTML = `${back}
    <header class="post-head">
      ${post.date ? `<p class="blog-date">${esc(postDate(post.date))}</p>` : ""}
      <h1>${esc(post.title)}</h1>
      <div class="divider"></div>
    </header>
    ${post.image ? `<img class="post-img" src="${esc(encodeURI(post.image))}" alt="">` : ""}
    <div class="post-body">${markdownHtml(post.body)}</div>
    <p class="post-cta"><a href="/#kontakt" class="btn">Zamów catering</a></p>`;
  wrap.querySelectorAll(".divider").forEach((d) => (d.innerHTML = dividerSvg()));
}

function renderGallery(g) {
  const photos = (g.photos || []).filter((p) => p.image);
  if (!photos.length) {
    document.querySelector('.nav a[href$="#galeria"]').hidden = true;
    return;
  }
  if (!document.getElementById("galeria")) return;
  document.getElementById("galeria").hidden = false;
  document.getElementById("gallery").innerHTML = photos.map((p) =>
    `<figure><img src="${esc(encodeURI(p.image))}" alt="${esc(p.alt || "Zdjęcie z realizacji")}" loading="lazy"></figure>`
  ).join("");
}

function renderAbout(a) {
  document.getElementById("about-title").textContent = a.title || "O mnie";
  document.getElementById("about-text").innerHTML = (a.text || "")
    .split(/\n\s*\n/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
  setPhoto(document.getElementById("about-photo"), a.photo, "about-photo");
  document.getElementById("highlights").innerHTML = (a.highlights || [])
    .map((h) => `<div class="highlight"><strong>${esc(h.number)}</strong><span>${esc(h.label)}</span></div>`)
    .join("");
}

function renderReviews(r) {
  const rating = Number(r.rating) || 0;
  const count = Number(r.count) || 0;
  const ratingText = rating.toFixed(1).replace(".", ",");
  const countText = count ? `na podstawie ${count} opinii w Google` : "ocena w Google";

  document.getElementById("rating-summary").innerHTML = rating ? `
    <span class="rating-big">${ratingText}</span>
    <div>
      ${stars(rating)}
      <div class="rating-meta">${GOOGLE_G} ${countText}</div>
    </div>` : "";

  const hero = document.getElementById("hero-rating");
  if (rating) {
    hero.innerHTML = `${GOOGLE_G} ${stars(rating)} <strong>${ratingText}</strong>${count ? ` · ${count} opinii` : ""}`;
    hero.hidden = false;
  }

  document.getElementById("reviews").innerHTML = (r.reviews || []).map((v) => `
    <article class="review">
      <div class="review-head">
        <div class="avatar">${esc((v.author || "?").trim().charAt(0).toUpperCase())}</div>
        <div>
          <div class="review-author">${esc(v.author)}</div>
          ${v.date ? `<div class="review-date">${esc(v.date)}</div>` : ""}
        </div>
      </div>
      ${stars(Number(v.rating) || 5)}
      <p class="review-text">${esc(v.text)}</p>
      <button type="button" class="review-more" hidden>Pokaż więcej</button>
    </article>`).join("");

  // Długie opinie są skrócone; przycisk pokazujemy tylko tam, gdzie tekst się nie mieści
  const reviewsEl = document.getElementById("reviews");
  const fitButtons = () => reviewsEl.querySelectorAll(".review").forEach((card) => {
    const text = card.querySelector(".review-text");
    const btn = card.querySelector(".review-more");
    if (!text.classList.contains("expanded")) btn.hidden = text.scrollHeight <= text.clientHeight + 2;
  });
  fitButtons();
  document.fonts?.ready.then(fitButtons);
  window.addEventListener("resize", fitButtons);
  reviewsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".review-more");
    if (!btn) return;
    const open = btn.previousElementSibling.classList.toggle("expanded");
    btn.textContent = open ? "Pokaż mniej" : "Pokaż więcej";
  });

  const links = [];
  if (r.googleUrl) links.push(`<a class="btn btn-ghost" href="${esc(r.googleUrl)}" target="_blank" rel="noopener">Wszystkie opinie w Google</a>`);
  if (r.reviewUrl) links.push(`<a class="btn" href="${esc(r.reviewUrl)}" target="_blank" rel="noopener">Wystaw opinię</a>`);
  document.getElementById("reviews-links").innerHTML = links.join("");

  if (!rating && !(r.reviews || []).length) document.getElementById("opinie").hidden = true;
}

// Menu mobilne
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});
document.getElementById("year").textContent = new Date().getFullYear();

const has = (id) => document.getElementById(id);

Promise.all(["settings", "menu", "gallery", "about", "reviews", "blog"].map((n) => load(n).catch(() => ({}))))
  .then(([settings, menu, gallery, about, reviews, blog]) => {
    renderSettings(settings);
    renderGallery(gallery);
    if (has("about-text")) renderAbout(about);
    if (has("reviews")) renderReviews(reviews);
    paintDecorations();
    if (has("menu-grid")) renderMenu(menu);
    if (has("offer-tiles")) renderTeaser(menu);
    if (has("blog-latest") && renderBlogList(blog, has("blog-latest"), 3)) has("blog").hidden = false;
    if (has("blog-list")) renderBlogList(blog, has("blog-list"));
    if (has("post")) renderPost(blog);
  });
