import { getFirebaseApp } from "./firebaseConfig.js";

// Compat namespace from CDN
const firebaseNS = window.firebase || {};

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    // Already loaded?
    if ([...document.scripts].some((s) => s.src.includes(src))) {
      resolve();
      return;
    }
    const tag = document.createElement("script");
    tag.src = src;
    tag.onload = () => resolve();
    tag.onerror = (e) => reject(e);
    document.head.appendChild(tag);
  });
}

function getAuth() {
  const app = getFirebaseApp();
  return firebaseNS.auth?.(app);
}

function getFirestore() {
  const app = getFirebaseApp();
  return firebaseNS.firestore?.(app);
}

async function signInWithEmailPassword(email, password) {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth not available");
  const cred = await auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

async function registerWithEmailPassword(email, password, displayName) {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth not available");
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  if (displayName) {
    await cred.user.updateProfile({ displayName });
  }
  if (!cred.user.emailVerified) {
    await cred.user.sendEmailVerification().catch(() => {});
  }
  return cred.user;
}

async function signOutUser() {
  const auth = getAuth();
  if (!auth) return;
  await auth.signOut();
}

async function ensureUserDocument(user) {
  const db = getFirestore();
  if (!db) throw new Error("Firestore not available");
  const uid = user?.uid;
  if (!uid) throw new Error("Missing user UID");

  const device = window.AuthSupport?.ensureDeviceIdentity
    ? await window.AuthSupport.ensureDeviceIdentity()
    : {};

  const docRef = db.collection("users").doc(uid);
  const snap = await docRef.get();
  if (snap.exists) {
    await docRef.update({
      "profile.displayName": user.displayName || null,
      "profile.avatarUrl": user.photoURL || null,
      lastLoginAt: new Date().toISOString(),
      deviceId: device.deviceId || firebaseNS.firestore.FieldValue.delete?.(),
      firstLoginDate: device.firstLoginDate || firebaseNS.firestore.FieldValue.delete?.(),
      lastIpUsed: device.lastIpUsed || firebaseNS.firestore.FieldValue.delete?.(),
      ipUnavailable: device.ipUnavailable || false,
    });
    return docRef;
  }

  const baseDoc = {
    profile: {
      displayName: user.displayName || "Player",
      avatarUrl: user.photoURL || null,
    },
    settings: {},
    scores: {},
    rating: {
      value: 0,
      colorBand: "unrated",
      breakdown: {},
      lastCalculatedAt: null,
      absoluteRank: null,
    },
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    deviceId: device.deviceId || null,
    firstLoginDate: device.firstLoginDate || null,
    lastIpUsed: device.lastIpUsed || null,
    ipUnavailable: !!device.ipUnavailable,
  };

  await docRef.set(baseDoc);
  return docRef;
}

async function updateAvatarFromFile(user, file) {
  if (!user?.uid) throw new Error("Missing user UID");
  const uploadAvatar = window.ImageUploadSupport?.uploadAvatar || window.ImgBBSupport?.uploadAvatar;
  if (!uploadAvatar) throw new Error("Image uploader not available");
  const result = await uploadAvatar(file);
  const db = getFirestore();
  if (!db) throw new Error("Firestore not available");
  const docRef = db.collection("users").doc(user.uid);
  await docRef.update({
    "profile.avatarUrl": result.url,
    "profile.avatarId": result.id || null,
    "profile.avatarDeleteUrl": result.deleteUrl || null,
    "profile.avatarUpdatedAt": new Date().toISOString(),
  });
  // Optionally update Firebase Auth profile photoURL
  const auth = getAuth();
  if (auth?.currentUser?.updateProfile) {
    await auth.currentUser.updateProfile({ photoURL: result.url }).catch(() => {});
  }
  return result.url;
}

async function updateBannerFromFile(user, file) {
  if (!user?.uid) throw new Error("Missing user UID");
  const uploadBanner = window.ImageUploadSupport?.uploadBanner || window.ImgBBSupport?.uploadBanner;
  if (!uploadBanner) throw new Error("Image uploader not available");
  const result = await uploadBanner(file);
  const db = getFirestore();
  if (!db) throw new Error("Firestore not available");
  const docRef = db.collection("users").doc(user.uid);
  await docRef.update({
    "profile.bannerUrl": result.url,
    "profile.bannerId": result.id || null,
    "profile.bannerDeleteUrl": result.deleteUrl || null,
    "profile.bannerUpdatedAt": new Date().toISOString(),
  });
  return result.url;
}

async function updateDisplayName(user, newName) {
  if (!user?.uid) throw new Error("Missing user UID");
  const db = getFirestore();
  if (!db) throw new Error("Firestore not available");
  const docRef = db.collection("users").doc(user.uid);
  await docRef.update({
    "profile.displayName": newName,
    lastNameChangeAt: new Date().toISOString(),
  });
  const auth = getAuth();
  if (auth?.currentUser?.updateProfile) {
    await auth.currentUser.updateProfile({ displayName: newName }).catch(() => {});
  }
}

function getModeConfig(modeId) {
  return window.RatingEngine?.MODE_TARGETS?.[modeId] || null;
}

function normalizeModeId(modeId) {
  const raw = String(modeId || "");
  const canonical = raw
    .trim()
    .toLowerCase()
    .replace(/[\s\-]+/g, "_")
    .replace(/\./g, "")
    .replace(/__+/g, "_");

  const aliases = {
    // TGM3 naming
    tgm3_master: "tgm3",
    tgm3_shirase: "shirase",

    // TGM2 shortcuts
    tgm2: "tgm2_master",

    // TA Death spellings
    ta_death: "tadeath",
    tadeath: "tadeath",
    tadeathmode: "tadeath",
    ta_deathmode: "tadeath",
    ta_death_mode: "tadeath",
    tad: "tadeath",
    tada: "tadeath",

    // Plus mode
    "tgm+": "tgm_plus",
    tgmplus: "tgm_plus",
    tgm_plus: "tgm_plus",

    // 20G formatting
    "20_g": "20g",
    "20g": "20g",

    // Easy mode tabs in UI map to rating targets
    easy_normal: "tgm2_normal",
    easy_easy: "tgm3_easy",

    // TGM4 variants all share the same rating bucket
    tgm4_1_1: "tgm4",
    tgm4_2_1: "tgm4",
    tgm4_3_1: "tgm4",
    // Some inputs include dots (e.g. "tgm4_1.1" / "TGM4 1.1") which become "tgm4_11"
    tgm4_11: "tgm4",
    tgm4_21: "tgm4",
    tgm4_31: "tgm4",

    // Common display-name-like shortcuts
    master: "tgm4_rounds",
  };

  return aliases[canonical] || canonical;
}

function gradeToValue(grade) {
  const arr = ["9","8","7","6","5","4","3","2","1","S1","S2","S3","S4","S5","S6","S7","S8","S9","GM"];
  const idx = arr.indexOf(String(grade || "").toUpperCase());
  return idx >= 0 ? idx + 1 : 0;
}

async function ensureRatingEngineLoaded() {
  if (window.RatingEngine?.computeRating) return true;
  try {
    await loadScriptOnce("rating.js");
  } catch (e) {
    console.warn("Failed to load rating.js", e);
    return false;
  }
  return !!window.RatingEngine?.computeRating;
}

async function updateUserScoreAndRating(modeId, entry) {
  modeId = normalizeModeId(modeId);
  const auth = getAuth();
  const db = getFirestore();
  const fallbackKey = "mino_rating_fallback";
  try {
    if (window.RatingEngine?.MODE_TARGETS && !window.RatingEngine.MODE_TARGETS[modeId]) {
      console.warn("[Rating] Submitting score for unknown/unrated modeId:", modeId);
    }
  } catch (_) {}
  if (!auth || !db) {
    // offline/local fallback
    try {
      const existing = JSON.parse(localStorage.getItem(fallbackKey) || "{}");
      existing.scores = existing.scores || {};
      existing.scores[modeId] = entry;
      const { value, breakdown } = window.RatingEngine?.computeRating
        ? window.RatingEngine.computeRating(existing.scores)
        : { value: 0, breakdown: {} };
      existing.rating = { value, breakdown, lastCalculatedAt: new Date().toISOString() };
      localStorage.setItem(fallbackKey, JSON.stringify(existing));
    } catch (_) {}
    return;
  }
  const user = auth.currentUser;
  if (!user?.uid) return;
  const ratingReady = await ensureRatingEngineLoaded();
  if (!ratingReady) return;

  const docRef = db.collection("users").doc(user.uid);
  const snap = await docRef.get();
  if (!snap.exists) {
    await docRef.set({
      profile: {
        displayName: user.displayName || "Player",
        avatarUrl: user.photoURL || null,
      },
      scores: {},
      rating: { value: 0, breakdown: {}, lastCalculatedAt: null, colorBand: "unrated", absoluteRank: null },
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    });
  }
  const data = (await docRef.get()).data() || {};
  const scores = data.scores || {};
  const existing = scores[modeId];

  const cfg = getModeConfig(modeId);
  let better = true;
  if (cfg) {
    if (cfg.type === "time") {
      const prev = existing?.timeSeconds;
      better = entry.timeSeconds != null && (prev == null || entry.timeSeconds < prev);
    } else if (cfg.type === "grade" || cfg.type === "grade_ext") {
      const prev = gradeToValue(existing?.grade);
      better = gradeToValue(entry.grade) > prev || (entry.lines || 0) > (existing?.lines || 0);
    } else if (cfg.type === "level") {
      const prev = existing?.level ?? existing?.lines ?? 0;
      const curr = entry.level ?? entry.lines ?? 0;
      better = curr > prev;
    } else if (cfg.type === "hanabi") {
      const prev = existing?.hanabi ?? 0;
      const curr = entry.hanabi ?? 0;
      better = curr > prev;
    } else if (cfg.type === "all_clears") {
      const prev = existing?.allClears ?? existing?.bravos ?? 0;
      const curr = entry.allClears ?? entry.bravos ?? 0;
      better = curr > prev;
    } else {
      better = (entry.score || 0) > (existing?.score || 0);
    }
  }
  if (!better) return;

  const cleanedEntry = Object.fromEntries(
    Object.entries(entry).filter(([, v]) => v !== undefined)
  );
  const newScores = { ...scores, [modeId]: cleanedEntry };
  const { value, breakdown } = window.RatingEngine.computeRating(newScores);

  await docRef.set(
    {
      scores: newScores,
      rating: {
        value,
        breakdown,
        lastCalculatedAt: new Date().toISOString(),
      },
      fallbackRating: {
        value,
        breakdown,
        lastCalculatedAt: new Date().toISOString(),
      },
    },
    { merge: true },
  );

  // Also keep fallback cache updated
  try {
    localStorage.setItem(
      fallbackKey,
      JSON.stringify({ scores: newScores, rating: { value, breakdown, lastCalculatedAt: new Date().toISOString() } }),
    );
  } catch (_) {}

  // Verify persisted rating once to ensure write success
  try {
    const verifySnap = await docRef.get();
    const storedRating = verifySnap.data()?.rating?.value;
    console.info("[Rating] Stored rating after submit:", storedRating);
  } catch (_) {
    // ignore verification errors
  }

  return { value, breakdown };
}

window.FirebaseClient = {
  getFirebaseApp,
  getAuth,
  getFirestore,
  signInWithEmailPassword,
  registerWithEmailPassword,
  signOutUser,
  ensureUserDocument,
  updateAvatarFromFile,
  updateBannerFromFile,
  updateDisplayName,
  submitScore: updateUserScoreAndRating,
};
