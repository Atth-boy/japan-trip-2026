import { TRIP, DAYS, HOTELS, FLIGHTS, TIPS, CATEGORIES, DEFAULT_MEMBERS, DEFAULT_SPLIT, DEFAULT_RATE } from "./data.js";
import { ICON, CATEGORY_ICON, MODE_COLOR } from "./icons.js";
import { createStore, getTripCode, setTripCode, canSync } from "./store.js";

// ---------- helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const parseDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const isoOf = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtDay = new Intl.DateTimeFormat("th-TH", { weekday: "short", day: "numeric", month: "short" });
const fmtDayLong = new Intl.DateTimeFormat("th-TH", { weekday: "long", day: "numeric", month: "long" });
const fmtWeekday = new Intl.DateTimeFormat("th-TH", { weekday: "narrow" });
const baht = (n) => "฿" + Math.round(n).toLocaleString("th-TH");
const yen = (n) => "¥" + Math.round(n).toLocaleString("th-TH");
const MAPS = [
  { label: "เปิดใน Google Maps", url: (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` },
  { label: "นำทางด้วย Google Maps", url: (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}&travelmode=transit` },
  { label: "เปิดใน Apple Maps", url: (q) => `https://maps.apple.com/?q=${encodeURIComponent(q)}` },
];
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
const daysBetween = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 86400000);

// ---------- state ----------
const todayIso = isoOf(new Date());
const todayIndex = DAYS.findIndex((d) => d.date === todayIso);

const state = {
  tab: readPref("tab", "plan"),
  day: todayIndex >= 0 ? todayIndex : Number(readPref("day", 0)) || 0,
  expView: "list",
  expenses: [],
  settings: { rate: DEFAULT_RATE, members: DEFAULT_MEMBERS },
  status: { mode: "local" },
};
let store = null;

function readPref(k, d) {
  try {
    return localStorage.getItem("pref." + k) ?? d;
  } catch {
    return d;
  }
}
function writePref(k, v) {
  try {
    localStorage.setItem("pref." + k, v);
  } catch {
    /* ignore */
  }
}

const AVATAR_COLORS = ["var(--blue)", "var(--pink)", "var(--green)", "var(--orange)"];
const avatar = (m) => {
  const i = state.settings.members.findIndex((x) => x.id === m.id);
  return `<span class="avatar" style="--av:${AVATAR_COLORS[i % AVATAR_COLORS.length]}">${esc(m.name.slice(0, 1).toUpperCase())}</span>`;
};
const memberName = (id) => state.settings.members.find((m) => m.id === id)?.name ?? id;
const toThb = (e) => (e.currency === "THB" ? Number(e.amount) : Number(e.amount) * state.settings.rate);

// ---------- Plan ----------
function renderPlan() {
  const day = DAYS[state.day];
  const date = parseDate(day.date);
  const hotel = HOTELS.find((h) => h.id === day.hotel);
  const untilStart = daysBetween(todayIso, TRIP.start);
  const pill =
    untilStart > 0
      ? `<span class="pill pill--accent">อีก ${untilStart} วันออกเดินทาง</span>`
      : todayIndex >= 0
        ? `<span class="pill pill--green">กำลังเที่ยว · วันที่ ${todayIndex + 1}</span>`
        : "";

  const isToday = day.date === todayIso;
  const nowHm = new Date().toTimeString().slice(0, 5);
  let nextMarked = false;

  const items = day.items
    .map((it) => {
      let cls = "";
      if (isToday && it.time) {
        if (it.time < nowHm) cls = "is-past";
        else if (!nextMarked) {
          cls = "is-next";
          nextMarked = true;
        }
      }
      if (it.highlight) cls += " is-highlight";
      return `
      <li class="tl-item ${cls}" style="--mode:${MODE_COLOR[it.mode] || "var(--gray)"}">
        <div class="tl-time">${it.time ? esc(it.time) : "—"}</div>
        <div class="tl-rail"><span class="tl-dot">${ICON[it.mode] || ICON.spot}</span></div>
        <div class="tl-body">
          ${cls.includes("is-next") ? '<div class="tl-next">ถัดไป</div>' : ""}
          <div class="tl-title">${esc(it.title)}</div>
          ${it.who ? `<div class="who">${ICON.person}<span>${esc(it.who)}</span></div>` : ""}
          ${it.how ? `<div class="tl-how">${esc(it.how)}</div>` : ""}
          ${it.price ? `<div class="tl-price">${ICON.yen}<span>${esc(it.price)}</span></div>` : ""}
          ${it.note ? `<div class="tl-note">${esc(it.note)}</div>` : ""}
        </div>
        ${it.map ? `<button class="tl-map" data-action="map" data-q="${esc(it.map)}" data-t="${esc(it.title)}" aria-label="เปิดแผนที่ ${esc(it.title)}">${ICON.map}</button>` : ""}
      </li>`;
    })
    .join("");

  let hotelCard = "";
  if (hotel) {
    const nightNo = daysBetween(hotel.checkIn, day.date) + 1;
    hotelCard = `
      <button class="card hotel" data-action="map" data-q="${esc(hotel.map)}" data-t="${esc(hotel.name)}">
        <span class="icon-tile" style="background:var(--purple)">${ICON.hotel}</span>
        <span class="hotel__text">
          <span class="hotel__label">ที่พักคืนนี้${hotel.who ? ` · เฉพาะ ${esc(hotel.who)}` : ` · คืนที่ ${nightNo}/${hotel.nights}`}</span>
          <span class="hotel__name">${esc(hotel.name)}</span>
          <span class="hotel__city">${esc(hotel.city)}</span>
        </span>
        <span class="chev">${ICON.chevron}</span>
      </button>`;
  }

  return `
    <header class="lt">
      <div class="lt__row"><h1 class="lt__title">${esc(TRIP.title)}</h1></div>
      <p class="lt__sub">${esc(TRIP.subtitle)} · 20–28 ต.ค. 2569 ${pill}</p>
    </header>
    <nav class="days" aria-label="เลือกวัน">
      ${DAYS.map((d, i) => {
        const dt = parseDate(d.date);
        return `<button class="day-chip ${i === state.day ? "is-active" : ""} ${d.date === todayIso ? "is-today" : ""}" data-action="day" data-i="${i}">
          <span class="day-chip__wd">${fmtWeekday.format(dt)}</span>
          <span class="day-chip__d">${dt.getDate()}</span>
        </button>`;
      }).join("")}
    </nav>
    <div class="day" data-swipe="day">
      <div class="day__head">
        <div class="eyebrow">วันที่ ${state.day + 1} · ${fmtDayLong.format(date)}${isToday ? " · วันนี้" : ""}</div>
        <h2 class="day__title">${esc(day.title)}</h2>
        <div class="day__route">${esc(day.route)}</div>
      </div>
      ${hotelCard}
      <ol class="card timeline">${items}</ol>
      <div class="day__pager">
        <button class="btn-plain" data-action="day" data-i="${state.day - 1}" ${state.day === 0 ? "disabled" : ""}>‹ วันก่อน</button>
        <button class="btn-plain" data-action="day" data-i="${state.day + 1}" ${state.day === DAYS.length - 1 ? "disabled" : ""}>วันถัดไป ›</button>
      </div>
    </div>`;
}

// ---------- Expenses ----------
function computeSummary() {
  const members = state.settings.members;
  const paid = Object.fromEntries(members.map((m) => [m.id, 0]));
  const share = Object.fromEntries(members.map((m) => [m.id, 0]));
  const byCat = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0]));
  let total = 0;
  for (const e of state.expenses) {
    const thb = toThb(e);
    if (!Number.isFinite(thb)) continue;
    total += thb;
    if (e.paidBy in paid) paid[e.paidBy] += thb;
    byCat[e.category in byCat ? e.category : "other"] += thb;
    const split = (e.splitAmong?.length ? e.splitAmong : members.map((m) => m.id)).filter((id) => id in share);
    split.forEach((id) => (share[id] += thb / split.length));
  }
  const balance = members.map((m) => ({ ...m, paid: paid[m.id], share: share[m.id], bal: paid[m.id] - share[m.id] }));

  // จับคู่คนที่ต้องจ่าย → คนที่ต้องได้คืน (greedy)
  const debt = balance.filter((b) => b.bal < -0.5).map((b) => ({ ...b, left: -b.bal })).sort((a, b) => b.left - a.left);
  const cred = balance.filter((b) => b.bal > 0.5).map((b) => ({ ...b, left: b.bal })).sort((a, b) => b.left - a.left);
  const transfers = [];
  let i = 0;
  let j = 0;
  while (i < debt.length && j < cred.length) {
    const amt = Math.min(debt[i].left, cred[j].left);
    transfers.push({ from: debt[i].name, to: cred[j].name, amt });
    debt[i].left -= amt;
    cred[j].left -= amt;
    if (debt[i].left < 0.5) i++;
    if (cred[j].left < 0.5) j++;
  }
  return { total, balance, transfers, byCat };
}

function statusPill() {
  const st = state.status;
  if (st.error) return `<span class="pill pill--red">${esc(st.error)}</span>`;
  if (st.mode === "local") return `<span class="pill">${ICON.phone} เก็บในเครื่องนี้</span>`;
  if (st.pending) return `<span class="pill pill--orange">${ICON.cloud} รอซิงก์</span>`;
  return `<span class="pill pill--green">${ICON.cloud} ซิงก์กับกลุ่มแล้ว</span>`;
}

function renderExpenses() {
  const { total, balance, transfers, byCat } = computeSummary();
  // เฉลี่ยเฉพาะคนที่มีส่วนต้องจ่าย (คนที่ไม่ได้ร่วมหารเลยไม่นับ)
  const n = balance.filter((b) => b.share > 0.5).length || state.settings.members.length;
  const header = `
    <header class="lt">
      <div class="lt__row">
        <h1 class="lt__title">ค่าใช้จ่าย</h1>
        <button class="round-btn" data-action="add" aria-label="เพิ่มค่าใช้จ่าย">${ICON.plus}</button>
      </div>
      <p class="lt__sub">${statusPill()}</p>
    </header>
    <section class="card total">
      <div class="total__label">ยอดรวมทั้งทริป</div>
      <div class="total__amt">${baht(total)}</div>
      <div class="total__meta">
        <span>เฉลี่ยคนละ <b>${baht(total / n)}</b></span>
        <span>≈ ${yen(total / state.settings.rate)}</span>
      </div>
      ${total > 0 ? `<div class="catbar">${CATEGORIES.filter((c) => byCat[c.id] > 0)
        .map((c) => `<span style="flex:${byCat[c.id]};background:${c.color}" title="${esc(c.name)}"></span>`)
        .join("")}</div>
      <div class="catlegend">${CATEGORIES.filter((c) => byCat[c.id] > 0)
        .map((c) => `<span><i style="background:${c.color}"></i>${esc(c.name)} ${baht(byCat[c.id])}</span>`)
        .join("")}</div>` : ""}
    </section>
    <div class="segmented" role="tablist">
      <button class="${state.expView === "list" ? "is-active" : ""}" data-action="expview" data-v="list">รายการ</button>
      <button class="${state.expView === "summary" ? "is-active" : ""}" data-action="expview" data-v="summary">สรุปรายคน</button>
    </div>`;

  if (!state.expenses.length) {
    return `${header}
      <div class="empty">
        <span class="empty__icon">${ICON.wallet}</span>
        <h3>ยังไม่มีรายการ</h3>
        <p>บันทึกค่าที่พัก ค่าเดินทาง ค่าอาหาร และใครเป็นคนจ่าย แอปจะคำนวณให้ว่าใครต้องโอนให้ใคร</p>
        <button class="btn-filled" data-action="add">${ICON.plus} เพิ่มค่าใช้จ่าย</button>
      </div>`;
  }

  if (state.expView === "summary") {
    return `${header}
      <h3 class="section-title">แต่ละคน</h3>
      <ul class="card list">
        ${balance
          .map(
            (b) => `<li class="row">
              ${avatar(b)}
              <span class="row__main">
                <span class="row__title">${esc(b.name)}</span>
                <span class="row__sub">จ่ายไป ${baht(b.paid)} · ส่วนของตัวเอง ${baht(b.share)}</span>
              </span>
              <span class="row__end ${b.bal > 0.5 ? "pos" : b.bal < -0.5 ? "neg" : ""}">
                ${b.bal > 0.5 ? "+" + baht(b.bal) : b.bal < -0.5 ? "−" + baht(-b.bal) : "พอดี"}
                <small>${b.bal > 0.5 ? "ได้คืน" : b.bal < -0.5 ? "ต้องจ่าย" : ""}</small>
              </span>
            </li>`,
          )
          .join("")}
      </ul>
      <h3 class="section-title">ใครต้องโอนให้ใคร</h3>
      <ul class="card list">
        ${
          transfers.length
            ? transfers
                .map(
                  (t) => `<li class="row transfer">
                    <span class="row__main"><span class="row__title">${esc(t.from)} <span class="arrow">${ICON.arrow}</span> ${esc(t.to)}</span></span>
                    <span class="row__end">${baht(t.amt)}</span>
                  </li>`,
                )
                .join("")
            : `<li class="row"><span class="row__main"><span class="row__sub">ทุกคนจ่ายเท่ากันแล้ว ไม่ต้องโอน</span></span></li>`
        }
      </ul>
      <p class="footnote">คิดเป็นเงินบาทที่อัตรา 1 เยน = ${state.settings.rate} บาท (แก้ได้ในแท็บข้อมูล)</p>`;
  }

  // group by date
  const groups = new Map();
  [...state.expenses]
    .sort((a, b) => (a.date || "").localeCompare(b.date || "") || (a.createdAt || 0) - (b.createdAt || 0))
    .forEach((e) => {
      const k = e.date || "";
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(e);
    });

  return `${header}
    ${[...groups.entries()]
      .map(([k, list]) => {
        const sum = list.reduce((s, e) => s + toThb(e), 0);
        return `<h3 class="section-title"><span>${k ? fmtDay.format(parseDate(k)) : "จองล่วงหน้า / ไม่ระบุวัน"}</span><span>${baht(sum)}</span></h3>
        <ul class="card list">
          ${list
            .map((e) => {
              const cat = CATEGORIES.find((c) => c.id === e.category) || CATEGORIES.at(-1);
              const splitN = e.splitAmong?.length || state.settings.members.length;
              return `<li><button class="row row--btn" data-action="edit" data-id="${esc(e.id)}">
                <span class="icon-tile" style="background:${cat.color}">${CATEGORY_ICON[cat.id]}</span>
                <span class="row__main">
                  <span class="row__title">${esc(e.title)}</span>
                  <span class="row__sub">จ่ายโดย ${esc(memberName(e.paidBy))} · หาร ${splitN}${e.note ? " · " + esc(e.note) : ""}</span>
                </span>
                <span class="row__end">${baht(toThb(e))}${e.currency === "JPY" ? `<small>${yen(e.amount)}</small>` : ""}</span>
              </button></li>`;
            })
            .join("")}
        </ul>`;
      })
      .join("")}
    <p class="footnote">แตะรายการเพื่อแก้ไขหรือลบ</p>`;
}

// ---------- Info ----------
function renderInfo() {
  const code = getTripCode();
  const sync = canSync()
    ? `<li class="row"><span class="icon-tile" style="background:var(--green)">${ICON.cloud}</span>
         <span class="row__main"><span class="row__title">รหัสทริป</span><span class="row__sub">${code ? "เชื่อมกับกลุ่มแล้ว" : "ยังไม่ได้เชื่อม · ค่าใช้จ่ายเก็บในเครื่องนี้"}</span></span>
         <button class="btn-plain" data-action="code">${code ? "เปลี่ยน" : "ใส่รหัส"}</button></li>
       ${code ? `<li><button class="row row--btn" data-action="invite"><span class="icon-tile" style="background:var(--blue)">${ICON.share}</span><span class="row__main"><span class="row__title tint">ส่งลิงก์เชิญให้สมาชิก</span></span></button></li>` : ""}`
    : `<li class="row"><span class="icon-tile" style="background:var(--gray)">${ICON.phone}</span>
         <span class="row__main"><span class="row__title">เก็บข้อมูลในเครื่องนี้</span><span class="row__sub">ยังไม่ได้ตั้งค่า Firebase สำหรับแชร์กับกลุ่ม</span></span></li>`;

  return `
    <header class="lt"><div class="lt__row"><h1 class="lt__title">ข้อมูลทริป</h1></div></header>

    <h3 class="section-title">เที่ยวบิน</h3>
    <ul class="card list">
      ${FLIGHTS.map(
        (f) => `<li class="row flight">
          <span class="icon-tile" style="background:var(--indigo)">${ICON.plane}</span>
          <span class="row__main">
            <span class="row__title">${esc(f.from)} <span class="arrow">${ICON.arrow}</span> ${esc(f.to)}</span>
            <span class="row__sub">${esc(f.airline)} ${esc(f.no)} · ออก ${esc(f.dep)} · ถึง ${esc(f.arr)}</span>
            ${f.seat ? `<span class="row__sub">ที่นั่ง ${esc(f.seat)}</span>` : ""}
            ${f.who ? `<span class="who">${ICON.person}<span>${esc(f.who)}</span></span>` : ""}
          </span>
        </li>`,
      ).join("")}
    </ul>

    <h3 class="section-title">ที่พัก</h3>
    <ul class="card list">
      ${HOTELS.map(
        (h) => `<li><button class="row row--btn" data-action="map" data-q="${esc(h.map)}" data-t="${esc(h.name)}">
          <span class="icon-tile" style="background:var(--purple)">${ICON.hotel}</span>
          <span class="row__main">
            <span class="row__title">${esc(h.name)}</span>
            <span class="row__sub">${esc(h.city)} · ${fmtDay.format(parseDate(h.checkIn))} – ${fmtDay.format(parseDate(h.checkOut))} · ${h.nights} คืน</span>
            ${h.who ? `<span class="who">${ICON.person}<span>เฉพาะ ${esc(h.who)}</span></span>` : ""}
          </span>
          <span class="chev">${ICON.chevron}</span>
        </button></li>`,
      ).join("")}
    </ul>

    <h3 class="section-title">สมาชิก</h3>
    <ul class="card list">
      ${state.settings.members
        .map(
          (m) => `<li><button class="row row--btn" data-action="rename" data-id="${esc(m.id)}">
            ${avatar(m)}
            <span class="row__main"><span class="row__title">${esc(m.name)}</span></span>
            <span class="row__end muted">แก้ชื่อ</span>
          </button></li>`,
        )
        .join("")}
    </ul>

    <h3 class="section-title">ค่าเงิน</h3>
    <ul class="card list">
      <li><button class="row row--btn" data-action="rate">
        <span class="icon-tile" style="background:var(--orange)">${ICON.yen}</span>
        <span class="row__main"><span class="row__title">อัตราแลกเปลี่ยน</span><span class="row__sub">ใช้แปลงเยนเป็นบาทในหน้าค่าใช้จ่าย</span></span>
        <span class="row__end muted">1 ¥ = ${state.settings.rate} ฿</span>
      </button></li>
    </ul>

    <h3 class="section-title">ซิงก์ข้อมูลค่าใช้จ่าย</h3>
    <ul class="card list">${sync}</ul>

    <h3 class="section-title">ข้อควรรู้</h3>
    <ul class="card list tips">
      ${TIPS.map((t) => `<li class="row"><span class="row__main"><span class="row__sub">${esc(t)}</span></span></li>`).join("")}
    </ul>
    <p class="footnote">ติดตั้งบน iPhone: เปิดใน Safari → ปุ่มแชร์ → “เพิ่มไปยังหน้าจอโฮม”</p>`;
}

// ---------- Expense sheet ----------
function openSheet(expense) {
  const isEdit = Boolean(expense);
  const members = state.settings.members;
  const defaultDate = DAYS.some((d) => d.date === todayIso) ? todayIso : "";
  const e = expense || {
    id: uid(),
    title: "",
    amount: "",
    currency: "JPY",
    category: "food",
    paidBy: members[0].id,
    splitAmong: members.filter((m) => DEFAULT_SPLIT.includes(m.id)).map((m) => m.id),
    date: defaultDate,
    note: "",
  };
  const draft = { ...e, splitAmong: e.splitAmong?.length ? [...e.splitAmong] : members.map((m) => m.id) };

  const root = document.createElement("div");
  root.className = "sheet-backdrop";
  root.innerHTML = `
    <div class="sheet" role="dialog" aria-modal="true" aria-label="${isEdit ? "แก้ไขค่าใช้จ่าย" : "เพิ่มค่าใช้จ่าย"}">
      <div class="sheet__grab"></div>
      <div class="sheet__nav">
        <button class="btn-plain" data-s="cancel">ยกเลิก</button>
        <b>${isEdit ? "แก้ไขรายการ" : "ค่าใช้จ่ายใหม่"}</b>
        <button class="btn-plain strong" data-s="save">บันทึก</button>
      </div>
      <div class="sheet__body">
        <ul class="card list form">
          <li class="row"><input name="title" type="text" placeholder="รายการ เช่น ค่าอาหารเย็น" value="${esc(draft.title)}" enterkeyhint="next" autocomplete="off"></li>
          <li class="row amount">
            <input name="amount" type="text" inputmode="decimal" placeholder="0" value="${esc(draft.amount)}" autocomplete="off">
            <div class="segmented small" data-s="currency">
              <button type="button" data-v="JPY">¥ เยน</button><button type="button" data-v="THB">฿ บาท</button>
            </div>
          </li>
        </ul>
        <p class="hint" data-s="conv"></p>

        <h3 class="section-title">หมวด</h3>
        <div class="chips" data-s="category">
          ${CATEGORIES.map((c) => `<button type="button" class="chip" data-v="${c.id}" style="--c:${c.color}"><span class="chip__icon">${CATEGORY_ICON[c.id]}</span>${esc(c.name)}</button>`).join("")}
        </div>

        <h3 class="section-title">ใครจ่าย</h3>
        <div class="segmented" data-s="paidBy">
          ${members.map((m) => `<button type="button" data-v="${esc(m.id)}">${esc(m.name)}</button>`).join("")}
        </div>

        <h3 class="section-title"><span>หารกับ</span><button type="button" class="btn-plain small" data-s="all">เลือกทั้งหมด</button></h3>
        <div class="chips" data-s="split">
          ${members.map((m) => `<button type="button" class="chip chip--check" data-v="${esc(m.id)}"><span class="chip__check">${ICON.check}</span>${esc(m.name)}</button>`).join("")}
        </div>

        <ul class="card list form">
          <li class="row"><span class="row__label">วันที่</span>
            <input name="date" type="date" min="${TRIP.start}" max="${TRIP.end}" value="${esc(draft.date || "")}">
            <button type="button" class="btn-plain small" data-s="nodate">ไม่ระบุ</button>
          </li>
          <li class="row"><input name="note" type="text" placeholder="หมายเหตุ (ไม่บังคับ)" value="${esc(draft.note || "")}" autocomplete="off"></li>
        </ul>
        ${isEdit ? `<ul class="card list"><li><button class="row row--btn danger" data-s="delete">ลบรายการนี้</button></li></ul>` : ""}
      </div>
    </div>`;

  const sheet = $(".sheet", root);
  const f = (n) => $(`[name="${n}"]`, root);

  const sync = () => {
    root.querySelectorAll('[data-s="currency"] button').forEach((b) => b.classList.toggle("is-active", b.dataset.v === draft.currency));
    root.querySelectorAll('[data-s="category"] .chip').forEach((b) => b.classList.toggle("is-active", b.dataset.v === draft.category));
    root.querySelectorAll('[data-s="paidBy"] button').forEach((b) => b.classList.toggle("is-active", b.dataset.v === draft.paidBy));
    root.querySelectorAll('[data-s="split"] .chip').forEach((b) => b.classList.toggle("is-active", draft.splitAmong.includes(b.dataset.v)));
    const amt = parseAmount(f("amount").value);
    const conv = $('[data-s="conv"]', root);
    if (amt > 0) {
      const thb = draft.currency === "THB" ? amt : amt * state.settings.rate;
      const per = thb / Math.max(1, draft.splitAmong.length);
      conv.textContent = `${draft.currency === "JPY" ? "≈ " + baht(thb) + " · " : ""}หาร ${draft.splitAmong.length} คน = คนละ ${baht(per)}`;
    } else conv.textContent = "";
    f("date").classList.toggle("is-empty", !f("date").value);
    const ok = f("title").value.trim() && amt > 0 && draft.splitAmong.length > 0;
    $('[data-s="save"]', root).disabled = !ok;
  };

  const close = () => {
    root.classList.remove("is-open");
    document.body.classList.remove("sheet-open");
    setTimeout(() => root.remove(), 280);
  };

  root.addEventListener("input", sync);
  root.addEventListener("click", (ev) => {
    if (ev.target === root) return close();
    const btn = ev.target.closest("button");
    if (!btn) return;
    const group = btn.closest("[data-s]")?.dataset.s;
    const s = btn.dataset.s;
    if (s === "cancel") return close();
    if (s === "all") {
      draft.splitAmong = members.map((m) => m.id);
      return sync();
    }
    if (s === "nodate") {
      f("date").value = "";
      return sync();
    }
    if (s === "delete") {
      if (confirm(`ลบ “${draft.title || "รายการนี้"}”?`)) {
        store.deleteExpense(draft.id);
        close();
      }
      return;
    }
    if (s === "save") {
      const out = {
        ...draft,
        title: f("title").value.trim(),
        amount: parseAmount(f("amount").value),
        date: f("date").value || "",
        note: f("note").value.trim(),
        createdAt: draft.createdAt || Date.now(),
        updatedAt: Date.now(),
      };
      store.saveExpense(out);
      return close();
    }
    if (group === "currency") draft.currency = btn.dataset.v;
    else if (group === "category") draft.category = btn.dataset.v;
    else if (group === "paidBy") draft.paidBy = btn.dataset.v;
    else if (group === "split") {
      const v = btn.dataset.v;
      draft.splitAmong = draft.splitAmong.includes(v) ? draft.splitAmong.filter((x) => x !== v) : [...draft.splitAmong, v];
    }
    sync();
  });

  document.body.appendChild(root);
  document.body.classList.add("sheet-open");
  sync();
  requestAnimationFrame(() => root.classList.add("is-open"));
  sheet.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") close();
  });
}

// ---------- Map action sheet ----------
function openMapSheet(q, title) {
  const root = document.createElement("div");
  root.className = "sheet-backdrop action-backdrop";
  root.innerHTML = `
    <div class="action-sheet" role="dialog" aria-modal="true" aria-label="เปิดแผนที่">
      <div class="action-group">
        <div class="action-title">${esc(title)}</div>
        ${MAPS.map((m) => `<a class="action-btn" href="${m.url(q)}" target="_blank" rel="noopener">${esc(m.label)}</a>`).join("")}
      </div>
      <div class="action-group"><button class="action-btn strong" data-close>ยกเลิก</button></div>
    </div>`;
  const close = () => {
    root.classList.remove("is-open");
    setTimeout(() => root.remove(), 280);
  };
  root.addEventListener("click", (ev) => {
    if (ev.target === root || ev.target.closest("[data-close]") || ev.target.closest("a")) close();
  });
  document.body.appendChild(root);
  requestAnimationFrame(() => root.classList.add("is-open"));
}

function parseAmount(v) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

// ---------- render & events ----------
const VIEWS = { plan: renderPlan, expenses: renderExpenses, info: renderInfo };
const TITLES = { plan: TRIP.title, expenses: "ค่าใช้จ่าย", info: "ข้อมูลทริป" };

function render() {
  const main = $("#main");
  const chips = $(".days");
  const keepScroll = chips ? chips.scrollLeft : null;
  main.innerHTML = VIEWS[state.tab]();
  main.dataset.tab = state.tab;
  $("#navTitle").textContent = TITLES[state.tab];
  $("#navAction").hidden = state.tab !== "expenses";
  document.querySelectorAll(".tabbar button").forEach((b) => {
    const on = b.dataset.tab === state.tab;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-selected", on);
  });
  const newChips = $(".days");
  if (newChips) {
    if (keepScroll !== null) newChips.scrollLeft = keepScroll;
    const active = $(".day-chip.is-active", newChips);
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: keepScroll === null ? "instant" : "smooth" });
  }
  onScroll();
}

function setDay(i) {
  if (i < 0 || i >= DAYS.length || i === state.day) return;
  state.day = i;
  writePref("day", i);
  render();
  const head = $(".day__head");
  if (head && head.getBoundingClientRect().top < 0) head.scrollIntoView({ block: "start", behavior: "smooth" });
}

document.addEventListener("click", async (ev) => {
  const el = ev.target.closest("[data-action],[data-tab]");
  if (!el || el.closest(".sheet-backdrop")) return;
  if (el.dataset.tab) {
    if (state.tab === el.dataset.tab) return window.scrollTo({ top: 0, behavior: "smooth" });
    state.tab = el.dataset.tab;
    writePref("tab", state.tab);
    render();
    window.scrollTo(0, 0);
    return;
  }
  const a = el.dataset.action;
  if (a === "day") setDay(Number(el.dataset.i));
  else if (a === "expview") {
    state.expView = el.dataset.v;
    render();
  } else if (a === "add") openSheet(null);
  else if (a === "map") openMapSheet(el.dataset.q, el.dataset.t);
  else if (a === "edit") openSheet(state.expenses.find((e) => e.id === el.dataset.id));
  else if (a === "rename") {
    const m = state.settings.members.find((x) => x.id === el.dataset.id);
    const name = prompt("ชื่อที่แสดง", m.name)?.trim();
    if (name) store.saveSettings({ ...state.settings, members: state.settings.members.map((x) => (x.id === m.id ? { ...x, name } : x)) });
  } else if (a === "rate") {
    const v = prompt("1 เยน = กี่บาท", String(state.settings.rate));
    const n = Number(v);
    if (v !== null && n > 0) store.saveSettings({ ...state.settings, rate: n });
  } else if (a === "code") {
    const v = prompt("ใส่รหัสทริป (ขอจากคนสร้างทริป)", getTripCode());
    if (v !== null) {
      setTripCode(v);
      location.reload();
    }
  } else if (a === "invite") {
    const link = `${location.origin}${location.pathname}#trip=${encodeURIComponent(getTripCode())}`;
    try {
      if (navigator.share) await navigator.share({ title: "แผนเที่ยว Japan 2026", url: link });
      else {
        await navigator.clipboard.writeText(link);
        alert("คัดลอกลิงก์แล้ว");
      }
    } catch {
      /* ผู้ใช้กดยกเลิก */
    }
  }
});

// ปัดซ้าย/ขวาเพื่อเปลี่ยนวัน
let touch = null;
document.addEventListener("touchstart", (e) => {
  touch = e.target.closest('[data-swipe="day"]') ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
document.addEventListener("touchend", (e) => {
  if (!touch) return;
  const dx = e.changedTouches[0].clientX - touch.x;
  const dy = e.changedTouches[0].clientY - touch.y;
  touch = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) setDay(state.day + (dx < 0 ? 1 : -1));
}, { passive: true });

// nav bar: โชว์ชื่อเล็กเมื่อ large title เลื่อนพ้นจอ
function onScroll() {
  const lt = $(".lt__title");
  const nav = $(".navbar");
  const past = lt ? lt.getBoundingClientRect().bottom < nav.getBoundingClientRect().bottom : false;
  nav.classList.toggle("is-compact", past);
}
window.addEventListener("scroll", onScroll, { passive: true });
$("#navAction").addEventListener("click", () => openSheet(null));
$("#navAction").innerHTML = ICON.plus;
$(".tabbar").innerHTML = [
  ["plan", ICON.calendar, "แผนเที่ยว"],
  ["expenses", ICON.wallet, "ค่าใช้จ่าย"],
  ["info", ICON.info, "ข้อมูล"],
]
  .map(([t, ic, label]) => `<button data-tab="${t}" role="tab">${ic}<span>${label}</span></button>`)
  .join("");

// iOS ไม่สน user-scalable=no — กัน pinch zoom ด้วย gesture events
["gesturestart", "gesturechange", "gestureend"].forEach((t) => document.addEventListener(t, (e) => e.preventDefault()));

// ---------- boot ----------
const hashCode = new URLSearchParams(location.hash.slice(1)).get("trip");
if (hashCode) {
  setTripCode(hashCode);
  history.replaceState(null, "", location.pathname + location.search);
}

render();

store = await createStore({
  onExpenses: (list) => {
    state.expenses = list;
    if (state.tab === "expenses") render();
  },
  onSettings: (s) => {
    state.settings = s;
    if (state.tab !== "plan") render();
  },
  onStatus: (st) => {
    state.status = st;
    if (state.tab === "expenses") render();
  },
});

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("./sw.js").catch(console.error);
}
