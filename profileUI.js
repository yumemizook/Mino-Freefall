(() => {
  const firebaseNS = window.firebase || {};
  const FC = window.FirebaseClient || {};

  const container = document.createElement("div");
  container.id = "profile-widget";
  container.style.position = "fixed";
  container.style.top = "16px";
  container.style.right = "16px";
  container.style.zIndex = "10001";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-end";
  container.style.gap = "8px";

  const chip = document.createElement("button");
  chip.id = "profile-chip";
  chip.style.display = "flex";
  chip.style.alignItems = "center";
  chip.style.gap = "8px";
  chip.style.padding = "8px 12px";
  chip.style.borderRadius = "24px";
  chip.style.border = "1px solid #444";
  chip.style.background = "rgba(0,0,0,0.6)";
  chip.style.color = "#fff";
  chip.style.cursor = "pointer";

  const avatar = document.createElement("div");
  avatar.id = "profile-avatar";
  avatar.style.width = "32px";
  avatar.style.height = "32px";
  avatar.style.borderRadius = "50%";
  avatar.style.background = "#222";
  avatar.style.display = "flex";
  avatar.style.alignItems = "center";
  avatar.style.justifyContent = "center";
  avatar.style.fontSize = "14px";
  avatar.style.fontWeight = "bold";
  avatar.style.overflow = "hidden";

  const nameEl = document.createElement("span");
  nameEl.id = "profile-name";
  nameEl.textContent = "Guest";
  const ratingEl = document.createElement("span");
  ratingEl.id = "profile-rating";
  ratingEl.textContent = "—";
  ratingEl.style.fontWeight = "bold";

  chip.appendChild(avatar);
  chip.appendChild(nameEl);
  chip.appendChild(ratingEl);
  container.appendChild(chip);

  const tooltip = document.createElement("div");
  tooltip.id = "profile-tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.top = "48px";
  tooltip.style.right = "0";
  tooltip.style.minWidth = "280px";
  tooltip.style.maxHeight = "320px";
  tooltip.style.overflowY = "auto";
  tooltip.style.padding = "12px";
  tooltip.style.borderRadius = "12px";
  tooltip.style.border = "1px solid #444";
  tooltip.style.background = "rgba(0,0,0,0.85)";
  tooltip.style.color = "#fff";
  tooltip.style.display = "none";
  tooltip.style.boxShadow = "0 6px 24px rgba(0,0,0,0.4)";
  container.appendChild(tooltip);

  document.body.appendChild(container);

  let currentUser = null;
  let userDoc = null;

  function colorForRating(value) {
    if (value >= 1600) return "#7cc7ff";
    if (value >= 1200) return "#c3ff7c";
    if (value >= 800) return "#ffd37c";
    if (value >= 400) return "#ff9f7c";
    return "#bbbbbb";
  }

  function initialFromName(name) {
    return (name || "G")[0]?.toUpperCase() || "G";
  }

  function renderChip() {
    const name = currentUser?.displayName || userDoc?.profile?.displayName || "Guest";
    const rating = userDoc?.rating?.value ?? "—";
    const avatarUrl = userDoc?.profile?.avatarUrl || currentUser?.photoURL;
    nameEl.textContent = name;
    ratingEl.textContent = typeof rating === "number" ? Math.round(rating) : "—";
    ratingEl.style.color = typeof rating === "number" ? colorForRating(rating) : "#bbb";
    if (avatarUrl) {
      avatar.style.background = `center / cover url("${avatarUrl}")`;
      avatar.textContent = "";
    } else {
      avatar.style.background = "#222";
      avatar.textContent = initialFromName(name);
    }
  }

  function renderTooltip() {
    if (!tooltip) return;
    tooltip.innerHTML = "";
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "8px";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";
    const avatarClone = avatar.cloneNode(true);
    avatarClone.style.width = "40px";
    avatarClone.style.height = "40px";
    const nameClone = document.createElement("div");
    nameClone.textContent = nameEl.textContent;
    left.appendChild(avatarClone);
    left.appendChild(nameClone);

    const right = document.createElement("div");
    right.style.textAlign = "right";
    const ratingVal = ratingEl.textContent;
    const ratingLabel = document.createElement("div");
    ratingLabel.textContent = `Rating: ${ratingVal}`;
    ratingLabel.style.color = ratingEl.style.color;
    const rankLabel = document.createElement("div");
    rankLabel.textContent = `Rank: ${userDoc?.rating?.absoluteRank ?? "—"}`;
    right.appendChild(ratingLabel);
    right.appendChild(rankLabel);

    header.appendChild(left);
    header.appendChild(right);
    tooltip.appendChild(header);

    const list = document.createElement("div");
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.gap = "6px";
    const scores = userDoc?.scores || {};
    const modeIds = Object.keys(scores);
    if (!modeIds.length) {
      const empty = document.createElement("div");
      empty.textContent = "No rated scores yet.";
      empty.style.color = "#aaa";
      list.appendChild(empty);
    } else {
      modeIds.forEach((modeId) => {
        const entry = scores[modeId];
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.style.fontSize = "13px";
        const leftRow = document.createElement("div");
        leftRow.textContent = modeId;
        const rightRow = document.createElement("div");
        const best = entry.bestScore ?? entry.bestTime ?? entry.bestLines ?? "—";
        const rank = entry.absoluteRank ?? "—";
        rightRow.textContent = `${best} | Rank ${rank}`;
        row.appendChild(leftRow);
        row.appendChild(rightRow);
        list.appendChild(row);
      });
    }
    tooltip.appendChild(list);
  }

  function toggleTooltip(show) {
    if (!tooltip) return;
    tooltip.style.display = show ? "block" : "none";
  }

  document.addEventListener("click", (e) => {
    if (!tooltip) return;
    if (container.contains(e.target)) return;
    toggleTooltip(false);
  });

  chip.addEventListener("click", () => {
    const nowOpen = tooltip.style.display !== "block";
    toggleTooltip(nowOpen);
  });

  function authStateChanged(user) {
    currentUser = user;
    renderChip();
    renderTooltip();
    if (user) {
      FC.ensureUserDocument?.(user)
        .then(async (docRef) => {
          const snap = await docRef.get();
          userDoc = snap.data();
          renderChip();
          renderTooltip();
        })
        .catch(() => {});
    } else {
      userDoc = null;
      renderChip();
      renderTooltip();
    }
  }

  // Simple prompts for sign-in/register (placeholder until full UI exists)
  chip.addEventListener("contextmenu", async (e) => {
    e.preventDefault();
    if (!FC || !FC.getAuth) return;
    const choice = prompt("Type 'login', 'register', or 'logout':");
    if (choice === "login") {
      const email = prompt("Email:");
      const password = prompt("Password:");
      if (!email || !password) return;
      try {
        await FC.signInWithEmailPassword(email, password);
      } catch (err) {
        alert(`Login failed: ${err?.message || err}`);
      }
    } else if (choice === "register") {
      const email = prompt("Email:");
      const password = prompt("Password (min 6 chars):");
      const displayName = prompt("Display name:");
      if (!email || !password) return;
      try {
        await FC.registerWithEmailPassword(email, password, displayName);
        alert("Registered. Please verify your email.");
      } catch (err) {
        alert(`Register failed: ${err?.message || err}`);
      }
    } else if (choice === "logout") {
      await FC.signOutUser?.();
    }
  });

  // Listen to Firebase auth state
  const auth = FC.getAuth?.();
  if (auth?.onAuthStateChanged) {
    auth.onAuthStateChanged(authStateChanged);
  } else {
    renderChip();
  }
})();
