// แผนทริปจาก "แผน japan 69 re1.xlsx" (ชีต Sheet1.2)
// price = ราคาประมาณการต่อหน่วยจากคอลัมน์การเดินทาง (ไว้ดูหน้างาน ไม่ใช่ยอดที่จ่ายจริง)
// who = ระบุเฉพาะรายการที่ไม่ได้ไปทั้ง 4 คน (Boy · Mom บิน ANA / Ik · Bim บิน AirAsia)
// mode: plane | car | train | bus | taxi | walk | food | hotel | spot | shop

export const TRIP = {
  title: "Japan 2026",
  subtitle: "Matsumoto · Fuji · Tokyo",
  start: "2026-10-20",
  end: "2026-10-28",
};

export const HOTELS = [
  {
    id: "tabino",
    name: "TABINO HOTEL lit",
    city: "Matsumoto",
    checkIn: "2026-10-21",
    checkOut: "2026-10-22",
    nights: 1,
    map: "TABINO HOTEL lit Matsumoto",
  },
  {
    id: "highland",
    name: "Highland Resort Hotel & Spa",
    city: "Fujiyoshida · Fuji-Q",
    checkIn: "2026-10-22",
    checkOut: "2026-10-23",
    nights: 1,
    map: "Highland Resort Hotel & Spa",
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
  {
    id: "monday-ext",
    name: "MONday Apart Premium ASAKUSA I",
    city: "Tokyo · Asakusa",
    checkIn: "2026-10-27",
    checkOut: "2026-10-28",
    nights: 1,
    who: "Ik · Bim",
    map: "MONday Apart Premium Asakusa",
  },
];

export const FLIGHTS = [
  { no: "NH808", airline: "ANA", from: "BKK", to: "NRT T1", dep: "20 ต.ค. 23:35", arr: "21 ต.ค. 07:45", who: "Boy · Mom" },
  { no: "XJ600", airline: "AirAsia", from: "DMK", to: "NRT T2", dep: "20 ต.ค. 23:55", arr: "21 ต.ค. 08:00", who: "Ik · Bim" },
  { no: "NH877", airline: "ANA", from: "HND T2", to: "BKK", dep: "28 ต.ค. 01:25", arr: "28 ต.ค. 06:30", who: "Boy · Mom" },
  { no: "XJ603", airline: "AirAsia", from: "NRT T2", to: "DMK", dep: "28 ต.ค. 12:10", arr: "28 ต.ค. 17:40", who: "Ik · Bim" },
];

export const DAYS = [
  {
    date: "2026-10-20",
    title: "ออกเดินทาง",
    route: "Bangkok → Tokyo",
    items: [
      { time: "23:35", mode: "plane", title: "บินออกจากสุวรรณภูมิ", how: "ANA NH808 · นอนพักบนเครื่อง", who: "Boy · Mom", map: "Suvarnabhumi Airport" },
      { time: "23:55", mode: "plane", title: "บินออกจากดอนเมือง (Terminal 1)", how: "AirAsia XJ600 · นอนพักบนเครื่อง", who: "Ik · Bim", map: "Don Mueang International Airport" },
    ],
  },
  {
    date: "2026-10-21",
    title: "Road trip สู่ Matsumoto",
    route: "Narita → Matsumoto",
    hotel: "tabino",
    items: [
      { time: "07:45", mode: "plane", title: "ถึงสนามบิน Narita Terminal 1", how: "ANA NH808 · ผ่าน ตม. และรับกระเป๋า", who: "Boy · Mom", map: "Narita International Airport Terminal 1" },
      { time: "08:00", mode: "plane", title: "ถึงสนามบิน Narita Terminal 2", how: "AirAsia XJ600 · ผ่าน ตม. และรับกระเป๋า", who: "Ik · Bim", note: "ANA ลง Terminal 1 · AirAsia ลง Terminal 2 — นัดจุดเจอกันก่อนไปรับรถเช่า", map: "Narita International Airport Terminal 2" },
      { time: "09:30", mode: "car", title: "รับรถเช่าที่ Narita แล้วขับไป Matsumoto", how: "รถเช่า · ประมาณ 4.5–5 ชม.", note: "สลับกันขับ เผื่อเพลียจากไฟลต์ดึก" },
      { time: "12:00", mode: "food", title: "แวะพัก Dangozaka SA (ขาลง) · มื้อกลางวัน", how: "Chuo Expressway ฝั่งขาลงไปทาง Matsumoto · ศูนย์อาหาร “麺工房” เปิด 24 ชม.", price: "โฮโต ≈ ¥1,100–1,200", note: "ลองโฮโต (ほうとう) บะหมี่เส้นแบนซุปมิโซะ อาหารขึ้นชื่อยามานาชิ · มีแบบ “つけ麺ほうとう” จิ้มน้ำซุปใสด้วย · เวลาถึงขึ้นกับรถติดช่วงผ่านโตเกียว", map: "談合坂サービスエリア 下り" },
      { time: "15:30", mode: "hotel", title: "ถึง Matsumoto · เช็คอิน TABINO HOTEL lit", price: "ทางด่วน ETC ≈ ¥6,080 / คัน", how: "ทางด่วน (ETC)", map: "TABINO HOTEL lit Matsumoto" },
      { time: "16:30", mode: "spot", title: "ปราสาท Matsumoto", price: "≈ ¥1,300 / ผู้ใหญ่", how: "ต้องซื้อบัตรเข้าชม", map: "Matsumoto Castle" },
      { time: "18:00", mode: "food", title: "มื้อเย็น" },
      { time: "19:00", mode: "hotel", title: "กลับที่พัก", price: "ค่าจอดรถ ≈ ¥1,100 / คืน", how: "จอดรถที่โรงแรม" },
    ],
  },
  {
    date: "2026-10-22",
    title: "Kamikochi → ฟูจิ",
    route: "Matsumoto → Kamikochi → Kawaguchiko",
    hotel: "highland",
    items: [
      { time: "06:00", mode: "car", title: "เช็คเอาท์ TABINO แล้วขับไปลานจอด Sawando", price: "ค่าจอด Sawando ≈ ¥700–800", how: "ขับรถเอง · ประมาณ 1 ชม. · ขนกระเป๋าไว้ในรถ", note: "Kamikochi ห้ามรถส่วนตัวเข้า ต้องต่อรถจาก Sawando · อาหารเช้าแวะร้านสะดวกซื้อระหว่างทาง", map: "Sawando Parking Kamikochi" },
      { time: "07:00", mode: "bus", title: "ต่อรถเข้า Kamikochi", price: "Shuttle bus ¥1,600 / คน (ไปกลับ ¥3,000) · Taxi ≈ ¥4,300–5,200 / คัน", how: "Shuttle bus หรือ Taxi" },
      { time: "07:30", mode: "walk", title: "Taisho Pond (ไทโชอิเกะ)", how: "ลงรถที่ป้าย Taisho-ike แล้วเดินเลียบแม่น้ำ Azusa ผ่าน Tashiro Pond · ถึง Kappa Bridge ประมาณ 1 ชม.", note: "เวลาของแต่ละจุดในวันนี้เป็นเวลาประมาณ เดินตามสบาย", map: "Taisho Pond Kamikochi" },
      { time: "09:00", mode: "spot", title: "Kappa Bridge (คัปปะบาชิ)", how: "จุดชมวิวเทือกเขา Hotaka · เดินต่อไป Myojin Pond ประมาณ 1 ชม.", map: "Kappabashi Bridge Kamikochi" },
      { time: "10:00", mode: "walk", title: "Myojin Pond (เมียวจินอิเกะ)", how: "บ่อน้ำใสในศาลเจ้า Hotaka · แล้วเดินกลับ Kappa Bridge ประมาณ 1 ชม.", map: "Myojin Pond Kamikochi" },
      { time: "12:00", mode: "food", title: "มื้อกลางวันแถว Kappa Bridge", how: "พักผ่อน เดินเล่นริมแม่น้ำก่อนกลับ", map: "Kappabashi Bridge Kamikochi" },
      { time: "14:00", mode: "taxi", title: "กลับลานจอด Sawando", price: "Taxi ≈ ¥4,300–5,200 / คัน", how: "ขึ้นรถที่ Kamikochi Bus Terminal · Taxi หรือ Shuttle bus", map: "Kamikochi Bus Terminal" },
      { time: "14:30", mode: "car", title: "ขับลงเขาไป Matsumoto IC", how: "ประมาณ 1 ชม. · ช่วงทางเขาขับตอนฟ้ายังสว่าง" },
      { time: "15:30", mode: "car", title: "ทางด่วนมุ่งหน้าโซนฟูจิ", how: "Nagano Exp. → Chuo Exp. · ประมาณ 2 ชม.", note: "สลับคนขับ เพราะเดินมาทั้งวัน" },
      { time: "17:30", mode: "hotel", title: "เช็คอิน Highland Resort Hotel & Spa", map: "Highland Resort Hotel & Spa" },
      { time: "18:30", mode: "food", title: "มื้อเย็น · แช่ออนเซ็น Fujiyama Onsen", map: "Fujiyama Onsen" },
    ],
  },
  {
    date: "2026-10-23",
    title: "ฟูจิ → Gotemba → Tokyo",
    route: "Oishi Park → Gotemba → Asakusa",
    hotel: "monday",
    items: [
      { time: "07:00", mode: "hotel", title: "ชมวิวฟูจิ · อาหารเช้า · เช็คเอาท์" },
      { time: "08:30", mode: "spot", title: "Oishi Park ชมวิวฟูจิและทะเลสาบ", how: "ขับรถเอง", map: "Oishi Park Kawaguchiko" },
      { time: "09:30", mode: "car", title: "ขับไป Gotemba", how: "ผ่าน Lake Yamanaka · ประมาณ 1 ชม." },
      { time: "10:30", mode: "shop", title: "Gotemba Premium Outlets · มื้อกลางวัน", how: "ช้อปได้ประมาณ 5.5 ชม.", map: "Gotemba Premium Outlets" },
      { time: "16:30", mode: "car", title: "ขับเข้าโตเกียว โซน Sumida / Asakusa", how: "ทางด่วน Tomei · เผื่อเวลา 3 ชม.", note: "เย็นวันศุกร์รถติด ออกตามเวลาจะได้ไม่รีบ" },
      { time: "19:30", mode: "car", title: "เติมน้ำมันเต็มถัง · คืนรถเช่าสาขา Sumida", how: "กำหนดคืนรถ 20:00" },
      { time: "20:00", mode: "hotel", title: "เช็คอิน MONday Apart · มื้อเย็น", note: "เช็คอินดึก ควรแจ้งที่พักล่วงหน้า", map: "MONday Apart Premium Asakusa" },
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
      { time: "13:30", mode: "spot", title: "teamLab Planets TOYOSU", price: "≈ ¥5,000 / ผู้ใหญ่", how: "จองบัตรแล้ว", map: "teamLab Planets TOKYO" },
      { time: "16:00", mode: "walk", title: "ไปจับจองจุดชมพลุ" },
      { time: "19:00", mode: "spot", title: "Tokyo Bay Grand Fireworks", price: "≈ ¥10,000 / ผู้ใหญ่", how: "จองบัตรแล้ว", highlight: true },
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
      { time: "10:00", mode: "walk", title: "สวน Shinjuku Gyoen", price: "≈ ¥500 / ผู้ใหญ่", how: "ต้องซื้อบัตรเข้าชม", map: "Shinjuku Gyoen National Garden" },
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
      { time: "06:30", mode: "train", title: "Tobu Limited Express ไป Nikko", price: "Tobu ≈ ¥1,500–2,000 · NIKKO PASS ≈ ¥3,000 / ผู้ใหญ่", how: "Tobu Asakusa → Tobu-Nikko · Revaty · E-ticket", note: "ใช้คู่กับ NIKKO PASS World Heritage Area (2 วัน)", map: "Tobu Asakusa Station" },
      { time: "08:22", mode: "train", title: "ถึงสถานี Nikko", price: "Chuzenji Onsen Free Pass ≈ ¥2,300 / ผู้ใหญ่", how: "ซื้อ Chuzenji Onsen Free Pass ที่ Tourist Center ในสถานี", map: "Tobu-Nikko Station" },
      { time: "08:45", mode: "bus", title: "นั่งบัสขึ้นเขา", how: "ป้าย 2A หรือ 2C · สาย 26 ไป Chuzenji / Yumoto Onsen" },
      { time: "11:30", mode: "spot", title: "น้ำตก Kegon", map: "Kegon Falls" },
      { time: "11:50", mode: "food", title: "เดินไปทะเลสาบ Chuzenji · มื้อกลางวัน", how: "เดินเท้า", map: "Lake Chuzenji" },
      { time: "12:50", mode: "bus", title: "นั่งบัสลงเขา", how: "ป้าย No.26 → ลงที่ No.9 Nishisando" },
      { time: "13:30", mode: "spot", title: "ศาลเจ้า Toshogu · วัด Rinno-ji", price: "≈ ¥1,600 / ผู้ใหญ่", how: "ต้องซื้อบัตรเข้าชม", map: "Nikko Toshogu" },
      { time: "15:00", mode: "spot", title: "สะพาน Shinkyo", price: "≈ ¥300 / ผู้ใหญ่", map: "Shinkyo Bridge Nikko" },
      { time: "17:44", mode: "train", title: "Tobu Limited Express กลับโตเกียว", price: "≈ ¥1,500–2,000 / ผู้ใหญ่", how: "นั่งบัสกลับสถานี Tobu-Nikko ก่อน · E-ticket" },
      { time: "18:30", mode: "food", title: "มื้อเย็นที่ Asakusa" },
    ],
  },
  {
    date: "2026-10-27",
    title: "ช้อปเก็บตก & กลับบ้าน",
    route: "Ueno · Akihabara · Haneda",
    hotel: "monday-ext",
    items: [
      { time: "07:30", mode: "walk", title: "สวน Ueno Park", map: "Ueno Park" },
      { time: "09:30", mode: "hotel", title: "เช็คเอาท์ (ฝากกระเป๋าไว้)", who: "Boy · Mom", note: "Ik · Bim พักต่ออีก 1 คืน ไม่ต้องเช็คเอาท์" },
      { time: "10:00", mode: "shop", title: "ซื้อของฝากที่ตลาด Ameyoko", map: "Ameyoko" },
      { time: "11:00", mode: "shop", title: "แกดเจ็ตที่ Akihabara", map: "Akihabara" },
      { time: "15:00", mode: "walk", title: "เดินเล่น Ginza หรือ Arcakit Kinshicho", map: "Ginza" },
      { time: "18:00", mode: "food", title: "มื้อเย็น" },
      { time: "21:00", mode: "train", title: "รถไฟตรงไปสนามบิน Haneda Terminal 2", price: "≈ ¥610 / ผู้ใหญ่", how: "Asakusa → Haneda · Airport Limited Express · ลงสถานี Terminal 2", who: "Boy · Mom", map: "Haneda Airport Terminal 2" },
    ],
  },
  {
    date: "2026-10-28",
    title: "เดินทางกลับ",
    route: "Haneda / Narita → Bangkok",
    items: [
      { time: "01:25", mode: "plane", title: "บินออกจาก Haneda Terminal 2", how: "ANA NH877", who: "Boy · Mom", map: "Haneda Airport Terminal 2" },
      { time: "06:30", mode: "plane", title: "ถึงสุวรรณภูมิ", who: "Boy · Mom" },
      { time: "09:00", mode: "hotel", title: "เช็คเอาท์ MONday Apart", who: "Ik · Bim" },
      { time: "09:15", mode: "train", title: "เดินทางไปสนามบิน Narita Terminal 2", how: "Keisei Access Express จาก Asakusa (มีขบวนตรงถึง Narita) · ประมาณ 1 ชม.", note: "เวลาออกเป็นเวลาแนะนำ เผื่อเช็คอินก่อนบิน 2–3 ชม.", who: "Ik · Bim", map: "Asakusa Station" },
      { time: "12:10", mode: "plane", title: "บินออกจาก Narita Terminal 2", how: "AirAsia XJ603", who: "Ik · Bim", map: "Narita International Airport Terminal 2" },
      { time: "17:40", mode: "plane", title: "ถึงดอนเมือง (Terminal 1)", who: "Ik · Bim" },
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
  { id: "jaruwan", name: "Mom" },
  { id: "teera", name: "Ik" },
  { id: "bim", name: "Bim" },
];

// ค่าเริ่มต้นของ "หารกับ" ตอนเพิ่มรายการใหม่ (Mom ไม่ร่วมหาร) — แก้ทีละรายการได้
export const DEFAULT_SPLIT = ["boy", "teera", "bim"];

export const DEFAULT_RATE = 0.21; // 1 JPY = 0.21 THB (ตาม Excel)

export const CATEGORIES = [
  { id: "lodging", name: "ที่พัก", color: "#5E5CE6" },
  { id: "flight", name: "เครื่องบิน", color: "#30B0C7" },
  { id: "transport", name: "เดินทาง", color: "#0A84FF" },
  { id: "ticket", name: "ตั๋ว/เข้าชม", color: "#FF9F0A" },
  { id: "food", name: "อาหาร", color: "#FF453A" },
  { id: "shopping", name: "ช้อปปิ้ง", color: "#BF5AF2" },
  { id: "other", name: "อื่นๆ", color: "#8E8E93" },
];
