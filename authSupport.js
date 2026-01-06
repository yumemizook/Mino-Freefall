(() => {
  const IPIFY_URL = "https://api.ipify.org?format=json";

  function getRandomDigits(length) {
    const digits = [];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      digits.push((array[i] % 10).toString());
    }
    return digits.join("");
  }

  async function fetchPublicIp() {
    try {
      const res = await fetch(IPIFY_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("ipify request failed");
      const data = await res.json();
      return typeof data?.ip === "string" ? data.ip : null;
    } catch {
      return null;
    }
  }

  function toDateDigits(date) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    const y = d.getFullYear().toString().padStart(4, "0");
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${y}${m}${day}`;
  }

  function deriveNumericId(ip, firstLoginDate) {
    const ipDigits = (ip || "").replace(/\D/g, "");
    const dateDigits = toDateDigits(firstLoginDate);
    let seed = `${ipDigits}${dateDigits}`;
    if (!seed) seed = getRandomDigits(8);
    const needed = 16 - seed.length;
    const padding = needed > 0 ? getRandomDigits(needed) : "";
    const combined = `${seed}${padding}${getRandomDigits(4)}`;
    return combined.slice(0, 16);
  }

  async function ensureDeviceIdentity() {
    const stored = {
      deviceId: localStorage.getItem("deviceId"),
      firstLoginDate: localStorage.getItem("firstLoginDate"),
      ipUnavailable: localStorage.getItem("ipUnavailable") === "true",
    };

    if (stored.deviceId && stored.deviceId.length === 16 && stored.firstLoginDate) {
      return stored;
    }

    const firstLoginDate = stored.firstLoginDate || new Date().toISOString();
    const ip = await fetchPublicIp();
    const deviceId = deriveNumericId(ip, firstLoginDate);

    localStorage.setItem("deviceId", deviceId);
    localStorage.setItem("firstLoginDate", firstLoginDate);
    if (!ip) {
      localStorage.setItem("ipUnavailable", "true");
    } else {
      localStorage.removeItem("ipUnavailable");
      localStorage.setItem("lastIpUsed", ip);
    }

    return {
      deviceId,
      firstLoginDate,
      ipUnavailable: !ip,
      lastIpUsed: ip || undefined,
    };
  }

  window.AuthSupport = window.AuthSupport || {};
  window.AuthSupport.ensureDeviceIdentity = ensureDeviceIdentity;
})();
