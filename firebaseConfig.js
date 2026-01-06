const firebaseNS = window.firebase || {};
const initializeApp = firebaseNS.initializeApp;
const getApps = firebaseNS.getApps;

function loadConfig() {
  const b64 = import.meta?.env?.VITE_FIREBASE_CONFIG_B64 || process.env?.FIREBASE_CONFIG_B64;
  if (!b64) throw new Error("Missing Firebase config env");
  try {
    return JSON.parse(atob(b64));
  } catch {
    throw new Error("Invalid Firebase config encoding");
  }
}

let app;
export function getFirebaseApp() {
  if (!initializeApp) throw new Error("Firebase CDN app module not found on window.firebase");
  if (app) return app;
  const existing = typeof getApps === "function" ? getApps() : firebaseNS.apps || [];
  if (existing?.length) return (app = existing[0]);
  app = initializeApp(loadConfig());
  return app;
}