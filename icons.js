// ไอคอนเส้นแบบ SF Symbols (24×24, stroke = currentColor)
const s = (d, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

export const ICON = {
  plane: s('<path d="M10.2 20.5 12 19.4l1.8 1.1v-1.6l-1.3-1.1v-4.2l7.5 2.2v-1.9l-7.5-4.6V4.6a.9.9 0 0 0-.5-.8.9.9 0 0 0-.5.8v4.7L4 13.9v1.9l7.5-2.2v4.2l-1.3 1.1z" fill="currentColor" stroke-width="1.2"/>'),
  car: s('<path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5"/><rect x="3.5" y="11.5" width="17" height="5.5" rx="1.6"/><path d="M6.5 17v2M17.5 17v2"/><circle cx="7.5" cy="14.2" r=".6" fill="currentColor"/><circle cx="16.5" cy="14.2" r=".6" fill="currentColor"/>'),
  train: s('<rect x="5.5" y="3.5" width="13" height="13.5" rx="3"/><path d="M5.5 10.5h13M9 20.5l1.5-3.5M15 20.5 13.5 17"/><circle cx="9" cy="13.8" r=".7" fill="currentColor"/><circle cx="15" cy="13.8" r=".7" fill="currentColor"/>'),
  bus: s('<rect x="4.5" y="3.5" width="15" height="14" rx="2.5"/><path d="M4.5 11h15M7.5 17.5v2.5M16.5 17.5v2.5M8 7h8"/><circle cx="8" cy="14.3" r=".7" fill="currentColor"/><circle cx="16" cy="14.3" r=".7" fill="currentColor"/>'),
  taxi: s('<path d="M10 4.5h4l.6 2"/><path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5"/><rect x="3.5" y="11.5" width="17" height="5.5" rx="1.6"/><path d="M6.5 17v2M17.5 17v2"/>'),
  walk: s('<circle cx="13" cy="4.5" r="1.7"/><path d="m9.5 21 2.2-6.5L14 17v4M8 12l2.5-4 3.5.6 2 3.4 2.5 1M10.5 8 9 14.5"/>'),
  food: s('<path d="M7 3.5V11a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3.5M9 3.5v17M16.5 20.5v-17c-2 1-3 3.5-3 6.5v3.5h3"/>'),
  hotel: s('<path d="M3 18.5V6M3 14.5h18v4M21 14.5V12a3 3 0 0 0-3-3h-7.5v5.5"/><circle cx="7" cy="11" r="2"/>'),
  spot: s('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  shop: s('<path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>'),
  map: s('<path d="M20 4 4 10.5l7 2.5 2.5 7z" fill="currentColor" stroke-width="1.2"/>'),
  calendar: s('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  wallet: s('<rect x="3" y="6" width="18" height="13.5" rx="3"/><path d="M3 10h18M16 14.8h1.5"/><path d="M5.5 6 15.5 3.5a1.5 1.5 0 0 1 1.9 1.4V6"/>'),
  info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".9" fill="currentColor"/>'),
  plus: s('<path d="M12 5v14M5 12h14"/>', 'stroke-width="2.4"'),
  chevron: s('<path d="m9.5 6 6 6-6 6"/>', 'stroke-width="2.2"'),
  check: s('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 'stroke-width="2.6"'),
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  share: s('<path d="M12 15V3.5M8 7.5l4-4 4 4M6 11H5.5A1.5 1.5 0 0 0 4 12.5v7A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 18.5 11H18"/>'),
  cloud: s('<path d="M7 18.5h10.5a4 4 0 0 0 .6-8A6 6 0 0 0 6.6 9.3 4.6 4.6 0 0 0 7 18.5z"/>'),
  phone: s('<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
  ticket: s('<path d="M3.5 8.5V6.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2.5 2.5 0 0 0 0 5v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2.5 2.5 0 0 0 0-5z"/><path d="M14.5 6v12" stroke-dasharray="1.6 2"/>'),
  dots: s('<circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/>'),
  person: s('<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>'),
  yen: s('<path d="m7 4 5 7.5L17 4M12 11.5V20M7.5 12.5h9M7.5 16h9"/>'),
};

export const CATEGORY_ICON = {
  lodging: ICON.hotel,
  transport: ICON.train,
  ticket: ICON.ticket,
  food: ICON.food,
  shopping: ICON.shop,
  other: ICON.dots,
};

export const MODE_COLOR = {
  plane: "var(--indigo)",
  car: "var(--blue)",
  train: "var(--green)",
  bus: "var(--teal)",
  taxi: "var(--yellow)",
  walk: "var(--mint)",
  food: "var(--orange)",
  hotel: "var(--purple)",
  spot: "var(--red)",
  shop: "var(--pink)",
};
