// แผนทริปจาก "แผน japan 69 re1.xlsx" (ชีต Sheet1.2) — ตัดราคาประมาณการออกตามที่ตกลงกัน
// mode: plane | car | train | bus | taxi | walk | food | hotel | spot | shop

export const TRIP = {
  title: "Japan 2026",
  subtitle: "Matsumoto · Tokyo",
  start: "2026-10-20",
  end: "2026-10-28",
};

export const HOTELS = [
  {
    id: "tabino",
    name: "TABINO HOTEL lit",
    city: "Matsumoto",
    checkIn: "2026-10-21",
    checkOut: "2026-10-23",
    nights: 2,
    map: "TABINO HOTEL lit Matsumoto",
  },
  {
    id: "monday",
    name: "MONday Apart Premium ASAKUSA I",
    city: "Tokyo · Asakusa",
    checkIn: "2026-10-23",
    checkOut: "2026-10-27",
    nights: 4,
    map: "MONday Apart Premium Asakusa",
  },
];

export const FLIGHTS = [
  { no: "NH808", airline: "ANA", from: "BKK", to: "NRT", dep: "20 ต.ค. 23:35", arr: "21 ต.ค. 07:45" },
  { no: "NH877", airline: "ANA", from: "HND", to: "BKK", dep: "28 ต.ค. 01:25", arr: "28 ต.ค. 06:30" },
];

export const DAYS = [
  {
    date: "2026-10-20",
    title: "ออกเดินทาง",
    route: "Bangkok → Tokyo",
    items: [
      { time: "23:35", mode: "plane", title: "บินออกจากสุวรรณภูมิ", how: "ANA NH808 · นอนพักบนเครื่อง", map: "Suvarnabhumi Airport" },
    ],
  },
  {
    date: "2026-10-21",
    title: "Road trip สู่ Matsumoto",
    route: "Narita → Matsumoto",
    hotel: "tabino",
    items: [
      { time: "07:45", mode: "plane", title: "ถึงสนามบิน Narita", how: "ผ่าน ตม. และรับกระเป๋า", map: "Narita International Airport" },
      { time: "09:30", mode: "car", title: "รับรถเช่าที่ Narita แล้วขับไป Matsumoto", how: "รถเช่า · ประมาณ 4.5–5 ชม.", note: "สลับกันขับ เผื่อเพลียจากไฟลต์ดึก" },
      { time: "15:30", mode: "hotel", title: "ถึง Matsumoto · เช็คอิน TABINO HOTEL lit", how: "ทางด่วน (ETC)", map: "TABINO HOTEL lit Matsumoto" },
      { time: "16:30", mode: "spot", title: "ปราสาท Matsumoto", how: "ต้องซื้อบัตรเข้าชม", map: "Matsumoto Castle" },
      { time: "18:00", mode: "food", title: "มื้อเย็น" },
      { time: "19:00", mode: "hotel", title: "กลับที่พัก", how: "จอดรถที่โรงแรม (มีค่าจอด)" },
    ],
  },
  {
    date: "2026-10-22",
    title: "Kamikochi",
    route: "Matsumoto ⇄ Kamikochi",
    hotel: "tabino",
    items: [
      { time: "07:00", mode: "car", title: "ออกจากโรงแรมไปลานจอด Sawando", how: "ขับรถเอง · จอดที่ Sawando Parking", map: "Sawando Parking Kamikochi", note: "Kamikochi ห้ามรถส่วนตัวเข้า ต้องต่อรถจาก Sawando" },
      { time: "08:00", mode: "bus", title: "ต่อรถเข้า Kamikochi", how: "Shuttle bus หรือ Taxi" },
      { time: "09:00", mode: "walk", title: "เดิน Nature Trail เริ่มที่ Taisho Pond", how: "เดินเท้า", map: "Taisho Pond Kamikochi" },
      { time: "", mode: "food", title: "สะพาน Kappabashi และมื้อกลางวัน", map: "Kappabashi Bridge Kamikochi" },
      { time: "15:30", mode: "taxi", title: "กลับไป Sawando", how: "Taxi (หรือ Shuttle bus)" },
      { time: "16:30", mode: "car", title: "ขับกลับ Matsumoto", how: "ขับรถเอง" },
      { time: "18:00", mode: "food", title: "ถึงโรงแรม · มื้อเย็น", how: "จอดรถที่โรงแรม (มีค่าจอด)" },
    ],
  },
  {
    date: "2026-10-23",
    title: "Karuizawa → Tokyo",
    route: "Matsumoto → Karuizawa → Asakusa",
    hotel: "monday",
    items: [
      { time: "09:00", mode: "hotel", title: "อาหารเช้า · เช็คเอาท์ TABINO HOTEL lit" },
      { time: "09:30", mode: "car", title: "ขับไป Karuizawa", how: "ทางด่วน (ETC)" },
      { time: "11:30", mode: "shop", title: "Karuizawa Prince Shopping Plaza · มื้อกลางวัน", map: "Karuizawa Prince Shopping Plaza" },
      { time: "15:00", mode: "car", title: "ขับเข้าโตเกียว ไป Asakusa", how: "ขับรถเอง" },
      { time: "17:30", mode: "car", title: "ถึงโตเกียว · คืนรถเช่า", how: "คืนรถสาขาใกล้ที่พัก" },
      { time: "18:00", mode: "food", title: "มื้อเย็น · เช็คอิน MONday Apart", map: "MONday Apart Premium Asakusa" },
    ],
  },
  {
    date: "2026-10-24",
    title: "Toyosu & พลุอ่าวโตเกียว",
    route: "Tsukiji · Toyosu",
    hotel: "monday",
    items: [
      { time: "07:00", mode: "food", title: "ตลาด Tsukiji Outer Market", how: "รถไฟ / IC card", map: "Tsukiji Outer Market" },
      { time: "09:00", mode: "shop", title: "Urban Dock LaLaport Toyosu (Akachan Honpo)", map: "Urban Dock LaLaport Toyosu" },
      { time: "11:30", mode: "walk", title: "สวน Toyosu Park", map: "Toyosu Park" },
      { time: "12:30", mode: "food", title: "มื้อกลางวัน" },
      { time: "13:30", mode: "spot", title: "teamLab Planets TOYOSU", how: "จองบัตรแล้ว", map: "teamLab Planets TOKYO" },
      { time: "16:00", mode: "walk", title: "ไปจับจองจุดชมพลุ" },
      { time: "19:00", mode: "spot", title: "Tokyo Bay Grand Fireworks", how: "จองบัตรแล้ว", highlight: true },
    ],
  },
  {
    date: "2026-10-25",
    title: "Design district & Shibuya",
    route: "Daikanyama · Shinjuku · Shibuya",
    hotel: "monday",
    items: [
      { time: "08:00", mode: "spot", title: "Daikanyama T-SITE", how: "รถไฟ / IC card", note: "ย่านดีไซน์และสถาปัตยกรรม", map: "Daikanyama T-SITE" },
      { time: "09:00", mode: "walk", title: "ริมคลอง Nakameguro · Starbucks Reserve Roastery", map: "Starbucks Reserve Roastery Tokyo" },
      { time: "10:00", mode: "walk", title: "สวน Shinjuku Gyoen", how: "ต้องซื้อบัตรเข้าชม", map: "Shinjuku Gyoen National Garden" },
      { time: "12:00", mode: "food", title: "มื้อกลางวันที่ Shinjuku" },
      { time: "13:30", mode: "walk", title: "สถาปัตยกรรมและคาเฟ่ Omotesando / Aoyama", map: "Omotesando" },
      { time: "16:00", mode: "spot", title: "Shibuya Sky · Scramble Crossing · Hachiko", map: "Shibuya Sky" },
      { time: "18:00", mode: "food", title: "มื้อเย็น" },
    ],
  },
  {
    date: "2026-10-26",
    title: "Nikko day trip",
    route: "Asakusa ⇄ Nikko",
    hotel: "monday",
    items: [
      { time: "06:30", mode: "train", title: "Tobu Limited Express ไป Nikko", how: "Tobu Asakusa → Tobu-Nikko · Revaty · E-ticket", note: "ใช้คู่กับ NIKKO PASS World Heritage Area (2 วัน)", map: "Tobu Asakusa Station" },
      { time: "08:22", mode: "train", title: "ถึงสถานี Nikko", how: "ซื้อ Chuzenji Onsen Free Pass ที่ Tourist Center ในสถานี", map: "Tobu-Nikko Station" },
      { time: "08:45", mode: "bus", title: "นั่งบัสขึ้นเขา", how: "ป้าย 2A หรือ 2C · สาย 26 ไป Chuzenji / Yumoto Onsen" },
      { time: "11:30", mode: "spot", title: "น้ำตก Kegon", map: "Kegon Falls" },
      { time: "11:50", mode: "food", title: "เดินไปทะเลสาบ Chuzenji · มื้อกลางวัน", how: "เดินเท้า", map: "Lake Chuzenji" },
      { time: "12:50", mode: "bus", title: "นั่งบัสลงเขา", how: "ป้าย No.26 → ลงที่ No.9 Nishisando" },
      { time: "13:30", mode: "spot", title: "ศาลเจ้า Toshogu · วัด Rinno-ji", how: "ต้องซื้อบัตรเข้าชม", map: "Nikko Toshogu" },
      { time: "15:00", mode: "spot", title: "สะพาน Shinkyo", map: "Shinkyo Bridge Nikko" },
      { time: "17:44", mode: "train", title: "Tobu Limited Express กลับโตเกียว", how: "นั่งบัสกลับสถานี Tobu-Nikko ก่อน · E-ticket" },
      { time: "18:30", mode: "food", title: "มื้อเย็นที่ Asakusa" },
    ],
  },
  {
    date: "2026-10-27",
    title: "ช้อปเก็บตก & กลับบ้าน",
    route: "Ueno · Akihabara · Haneda",
    items: [
      { time: "07:30", mode: "walk", title: "สวน Ueno Park", map: "Ueno Park" },
      { time: "09:30", mode: "hotel", title: "เช็คเอาท์ (ฝากกระเป๋าไว้)" },
      { time: "10:00", mode: "shop", title: "ซื้อของฝากที่ตลาด Ameyoko", map: "Ameyoko" },
      { time: "11:00", mode: "shop", title: "แกดเจ็ตที่ Akihabara", map: "Akihabara" },
      { time: "15:00", mode: "walk", title: "เดินเล่น Ginza หรือ Arcakit Kinshicho", map: "Ginza" },
      { time: "18:00", mode: "food", title: "มื้อเย็น" },
      { time: "21:00", mode: "train", title: "รถไฟตรงไปสนามบิน Haneda", how: "Asakusa → Haneda · Airport Limited Express", map: "Haneda Airport Terminal 3" },
    ],
  },
  {
    date: "2026-10-28",
    title: "ถึงบ้าน",
    route: "Tokyo → Bangkok",
    items: [
      { time: "01:25", mode: "plane", title: "บินออกจาก Haneda", how: "ANA NH877" },
      { time: "06:30", mode: "plane", title: "ถึงสุวรรณภูมิ" },
    ],
  },
];

export const TIPS = [
  "ขับรถในญี่ปุ่นต้องใช้ใบขับขี่สากล (IDP) พร้อมใบขับขี่ไทยตัวจริง",
  "รับรถ Narita แล้วคืนที่โตเกียว อาจมีค่า drop-off เพิ่ม",
  "Kamikochi ห้ามรถส่วนตัวเข้า จอดที่ Sawando แล้วต่อ shuttle bus หรือ taxi",
  "จองตั๋ว Tobu Limited Express ล่วงหน้าผ่านเว็บ Tobu เพื่อให้ได้นั่งติดกัน 4 คน",
  "ในโตเกียวใช้ IC card (Suica / PASMO) แตะจ่ายค่ารถไฟได้ทุกสาย",
];

export const DEFAULT_MEMBERS = [
  { id: "boy", name: "Boy" },
  { id: "jaruwan", name: "Jaruwan" },
  { id: "teera", name: "Teera" },
  { id: "bim", name: "Bim" },
];

// ค่าเริ่มต้นของ "หารกับ" ตอนเพิ่มรายการใหม่ (Jaruwan ไม่ร่วมหาร) — แก้ทีละรายการได้
export const DEFAULT_SPLIT = ["boy", "teera", "bim"];

export const DEFAULT_RATE = 0.21; // 1 JPY = 0.21 THB (ตาม Excel)

export const CATEGORIES = [
  { id: "lodging", name: "ที่พัก", color: "#5E5CE6" },
  { id: "transport", name: "เดินทาง", color: "#0A84FF" },
  { id: "ticket", name: "ตั๋ว/เข้าชม", color: "#FF9F0A" },
  { id: "food", name: "อาหาร", color: "#FF453A" },
  { id: "shopping", name: "ช้อปปิ้ง", color: "#BF5AF2" },
  { id: "other", name: "อื่นๆ", color: "#8E8E93" },
];
