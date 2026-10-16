// ที่เก็บข้อมูลค่าใช้จ่าย: Firestore (แชร์ทั้งกลุ่ม) เมื่อมี config + รหัสทริป, ไม่งั้นเก็บในเครื่อง
import { firebaseConfig } from "./firebase-config.js";
import { DEFAULT_MEMBERS, DEFAULT_RATE } from "./data.js";

const FB = "https://www.gstatic.com/firebasejs/10.14.1";
const LS_EXPENSES = "trip.expenses";
const LS_SETTINGS = "trip.settings";
const LS_CODE = "trip.code";

const DEFAULT_SETTINGS = { rate: DEFAULT_RATE, members: DEFAULT_MEMBERS };

function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota — ignore */
  }
}

export function getTripCode() {
  return lsGet(LS_CODE, "");
}
export function setTripCode(code) {
  lsSet(LS_CODE, code.trim());
}
export function canSync() {
  return Boolean(firebaseConfig);
}

function withSettingsDefaults(s) {
  const members = DEFAULT_MEMBERS.map((d) => ({ ...d, ...(s?.members?.find((m) => m.id === d.id) || {}) }));
  return { rate: Number(s?.rate) > 0 ? Number(s.rate) : DEFAULT_RATE, members };
}

export async function createStore({ onExpenses, onSettings, onStatus }) {
  const code = getTripCode();
  if (firebaseConfig && code) {
    try {
      return await createFirestoreStore(code, { onExpenses, onSettings, onStatus });
    } catch (err) {
      console.error("Firestore init failed", err);
      onStatus({ mode: "local", error: "เชื่อมข้อมูลกลุ่มไม่สำเร็จ ใช้ข้อมูลในเครื่องแทน" });
    }
  }
  return createLocalStore({ onExpenses, onSettings, onStatus });
}

function createLocalStore({ onExpenses, onSettings, onStatus }) {
  let expenses = lsGet(LS_EXPENSES, []);
  let settings = withSettingsDefaults(lsGet(LS_SETTINGS, DEFAULT_SETTINGS));
  onStatus({ mode: "local" });
  onExpenses(expenses);
  onSettings(settings);
  return {
    mode: "local",
    saveExpense(e) {
      const i = expenses.findIndex((x) => x.id === e.id);
      expenses = i >= 0 ? expenses.map((x) => (x.id === e.id ? e : x)) : [...expenses, e];
      lsSet(LS_EXPENSES, expenses);
      onExpenses(expenses);
    },
    deleteExpense(id) {
      expenses = expenses.filter((x) => x.id !== id);
      lsSet(LS_EXPENSES, expenses);
      onExpenses(expenses);
    },
    saveSettings(s) {
      settings = withSettingsDefaults(s);
      lsSet(LS_SETTINGS, settings);
      onSettings(settings);
    },
  };
}

async function createFirestoreStore(code, { onExpenses, onSettings, onStatus }) {
  const { initializeApp } = await import(`${FB}/firebase-app.js`);
  const fs = await import(`${FB}/firebase-firestore.js`);
  const app = initializeApp(firebaseConfig);
  const db = fs.initializeFirestore(app, {
    localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }),
  });
  const expCol = fs.collection(db, "trips", code, "expenses");
  const settingsRef = fs.doc(db, "trips", code, "meta", "settings");

  onStatus({ mode: "cloud", pending: true });

  fs.onSnapshot(
    expCol,
    { includeMetadataChanges: true },
    (snap) => {
      onExpenses(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      onStatus({ mode: "cloud", pending: snap.metadata.hasPendingWrites, fromCache: snap.metadata.fromCache });
    },
    (err) => {
      console.error(err);
      onStatus({ mode: "cloud", error: err.code === "permission-denied" ? "รหัสทริปไม่ถูกต้อง" : "ซิงก์ไม่สำเร็จ" });
    },
  );
  fs.onSnapshot(settingsRef, (snap) => onSettings(withSettingsDefaults(snap.data())), () => {});

  // ย้ายรายการที่เคยบันทึกไว้ในเครื่องขึ้นกลุ่ม (ครั้งแรกที่เชื่อม)
  const local = lsGet(LS_EXPENSES, []);
  if (local.length) {
    local.forEach((e) => fs.setDoc(fs.doc(expCol, e.id), e).catch(console.error));
    lsSet(LS_EXPENSES, []);
  }

  // ไม่ await การเขียน: ตอนออฟไลน์ promise จะค้างจนกว่าจะต่อเน็ต แต่ข้อมูลลง cache และแสดงผลทันทีแล้ว
  const write = (p) => p.catch((err) => {
    console.error(err);
    onStatus({ mode: "cloud", error: "บันทึกขึ้นกลุ่มไม่สำเร็จ" });
  });

  return {
    mode: "cloud",
    saveExpense(e) {
      const { id, ...data } = e;
      write(fs.setDoc(fs.doc(expCol, id), data));
    },
    deleteExpense(id) {
      write(fs.deleteDoc(fs.doc(expCol, id)));
    },
    saveSettings(s) {
      write(fs.setDoc(settingsRef, withSettingsDefaults(s)));
    },
  };
}
