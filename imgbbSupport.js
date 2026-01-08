(() => {
  const FREEIMAGE_KEY_B64 =
    window.FREEIMAGE_KEY_B64 ||
    (typeof process !== "undefined" && process?.env?.FREEIMAGE_KEY_B64) ||
    "NmQyMDdlMDIxOThhODQ3YWE5OGQwYTJhOTAxNDg1YTU="; // fallback obfuscated key

  function decodeKey() {
    try {
      // Prefer window override if set explicitly
      const b64 = window.FREEIMAGE_KEY_B64 || FREEIMAGE_KEY_B64;
      return atob(b64);
    } catch {
      throw new Error("Failed to decode FreeImage API key");
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
    const formData = new FormData();
    formData.append("key", key);
    formData.append("source", file);
    formData.append("type", "file");

    const res = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`FreeImage upload failed: ${res.status} ${text}`.trim());
    }

    const data = await res.json();
    const url = data?.image?.url;
    if (!url) throw new Error("FreeImage upload response missing URL");
    return {
      url,
      deleteUrl: data?.image?.delete_url,
      id: data?.image?.id,
    };
  }

  async function uploadBanner(file) {
    if (!file) throw new Error("No file provided");
    const key = decodeKey();
    const formData = new FormData();
    formData.append("key", key);
    formData.append("source", file);
    formData.append("type", "file");
    formData.append("name", `banner_${Date.now()}`);

    const res = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`FreeImage upload failed: ${res.status} ${text}`.trim());
    }

    const data = await res.json();
    const url = data?.image?.url;
    if (!url) throw new Error("FreeImage upload response missing URL");
    return {
      url,
      deleteUrl: data?.image?.delete_url,
      id: data?.image?.id,
    };
  }

  window.ImageUploadSupport = window.ImageUploadSupport || {};
  window.ImageUploadSupport.uploadAvatar = uploadAvatar;
  window.ImageUploadSupport.uploadBanner = uploadBanner;
  
  // Keep backwards compatibility
  window.ImgBBSupport = window.ImgBBSupport || {};
  window.ImgBBSupport.uploadAvatar = uploadAvatar;
  window.ImgBBSupport.uploadBanner = uploadBanner;
})();
