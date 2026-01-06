(() => {
  const IMGBB_KEY_B64 =
    window.IMGBB_KEY_B64 ||
    (typeof process !== "undefined" && process?.env?.IMGBB_KEY_B64) ||
    "YTFkNmUxMDNlYWE0NmY3ODI4OGZjMmM1YWE1NmYzYmQ="; // fallback obfuscated key

  function decodeKey() {
    try {
      // Prefer window override if set explicitly
      const b64 = window.IMGBB_KEY_B64 || IMGBB_KEY_B64;
      return atob(b64);
    } catch {
      throw new Error("Failed to decode ImgBB API key");
    }
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadAvatar(file) {
    if (!file) throw new Error("No file provided");
    const key = decodeKey();
    const imageBase64 = await fileToBase64(file);
    const formData = new FormData();
    formData.append("image", imageBase64);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`ImgBB upload failed: ${res.status} ${text}`.trim());
    }

    const data = await res.json();
    const url = data?.data?.url || data?.data?.display_url;
    if (!url) throw new Error("ImgBB upload response missing URL");
    return {
      url,
      deleteUrl: data?.data?.delete_url,
      id: data?.data?.id,
    };
  }

  window.ImgBBSupport = window.ImgBBSupport || {};
  window.ImgBBSupport.uploadAvatar = uploadAvatar;
})();
