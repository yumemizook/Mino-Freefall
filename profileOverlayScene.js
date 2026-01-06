class ProfileOverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "ProfileOverlayScene", active: true });
    this.card = null;
    this.nameText = null;
    this.ratingText = null; // fallback text only
    this.avatarCircle = null;
    this.avatarImage = null;
    this.avatarSize = 0;
    this.tooltipAvatarCircle = null;
    this.tooltipAvatarImage = null;
    this.baseDepth = 9000;
    this.cardHeight = 70;
    this.cardMargin = 16;
    this.ratingDigits = [];
    this.digitWidth = 0;
    this.digitHeight = 0;
    this.ratingPos = { x: 0, y: 0 };
    this.ratingScale = 0.45;
    this.ratingString = "—";
    this.ratingDigitsReady = false;
    this.ratingColor = "#bbbbbb";
    this.ratingSpacing = 4;
    this.tooltip = null;
    this.tooltipDim = null;
    this.tooltipVisible = false;
    this.tooltipBodyName = null;
    this.tooltipBodyRating = null;
    this.tooltipBodyGroups = [];
    this.currentUser = null;
    this.userDoc = null;
    this.userDocUnsub = null;
    this.fallbackCache = null;
    this.loginContainer = null;
    this.loginFields = {};
    this.hiddenFileInput = null;
    this.lastNameChangeAt = null;
    this.nameTooltip = null;
  }

  clearRatingDigits() {
    if (this.ratingDigits?.length) {
      this.ratingDigits.forEach((d) => d.destroy());
    }
    this.ratingDigits = [];
  }

  layoutRatingDigits() {
    if (!this.ratingDigits?.length) return;
    const baseX = this.ratingPos.x;
    const baseY = this.ratingPos.y;
    const step = (this.digitWidth || 100) * this.ratingScale + this.ratingSpacing;
    this.ratingDigits.forEach((img, idx) => {
      img.setPosition(baseX + idx * step, baseY);
    });
  }

  updateRatingDigits(value, colorHex) {
    this.ratingString = value || "—";
    this.ratingColor = colorHex || "#bbbbbb";
    if (!this.ratingDigitsReady || !this.textures.exists("ratingdigits")) {
      this.ratingText?.setText(this.ratingString).setColor(this.ratingColor).setVisible(true);
      this.clearRatingDigits();
      return;
    }
    const num = Number(this.ratingString);
    const digitsStr = Number.isFinite(num) ? Math.max(0, Math.round(num)).toString() : null;
    if (!digitsStr) {
      this.ratingText?.setText(this.ratingString).setColor(this.ratingColor).setVisible(true);
      this.clearRatingDigits();
      return;
    }
    this.ratingText?.setVisible(false);
    this.clearRatingDigits();
    const depth = this.baseDepth + 2;
    const color = Phaser.Display.Color.HexStringToColor(this.ratingColor || "#bbbbbb").color;
    for (let i = 0; i < digitsStr.length; i++) {
      const d = digitsStr[i];
      const frameIndex = parseInt(d, 10);
      const img = this.add
        .image(this.ratingPos.x, this.ratingPos.y, "ratingdigits", frameIndex)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(depth)
        .setScale(this.ratingScale)
        .setTint(color);
      this.ratingDigits.push(img);
    }
    this.layoutRatingDigits();
  }

  setRatingVisible(visible) {
    this.ratingText?.setVisible(visible);
    if (this.ratingDigits?.length) {
      this.ratingDigits.forEach((d) => d.setVisible(visible));
    }
  }

  create() {
    const width = this.cameras.main.width;
    const margin = 16;
    const cardWidth = 220;
    const cardHeight = 70;
    const cardLeftX = width - margin - cardWidth;
    this.cardHeight = cardHeight;
    this.cardMargin = margin;

    const baseDepth = this.baseDepth; // keep under corner texts if they use higher depth

    this.card = this.add
      .rectangle(width - margin, margin, cardWidth, cardHeight, 0x111111, 0.85)
      .setOrigin(1, 0)
      .setStrokeStyle(1, 0x444444)
      .setScrollFactor(0)
      .setDepth(baseDepth)
      .setInteractive({ useHandCursor: true });

    this.avatarSize = cardHeight - 4;
    this.avatarCircle = this.add
      .circle(width - margin - 24, margin + cardHeight / 2, (cardHeight - 4) / 2, 0x777777, 1)
      .setStrokeStyle(1, 0xaaaaaa)
      .setScrollFactor(0)
      .setDepth(baseDepth + 1)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => this.handleAvatarChange());

    this.nameText = this.add
      .text(cardLeftX + 12, margin + 10, "Guest", {
        fontFamily: "Courier New, monospace",
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(baseDepth + 1)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => this.handleNameChange());
    this.nameText.on("pointerover", () => this.showNameTooltip(cardLeftX + 12, margin - 6));
    this.nameText.on("pointerout", () => this.hideNameTooltip());

    const ratingBgY = margin + 34;
    const ratingBgX = cardLeftX - 8;
    this.ratingPos = { x: ratingBgX + 4, y: ratingBgY - 6 };

    const ensureRatingTexture = () => {
      if (this.textures.exists("ratingdigits")) return Promise.resolve();
      return new Promise((resolve) => {
        this.load.spritesheet("ratingdigits", "img/ratingnumbers.png", { frameWidth: 102, frameHeight: 102 });
        this.load.once(Phaser.Loader.Events.COMPLETE, resolve);
        this.load.start();
      });
    };

    ensureRatingTexture().then(() => {
      const tex = this.textures.get("ratingdigits");
      if (tex && tex.has("0")) {
        const f = tex.get("0");
        this.digitWidth = f.width;
        this.digitHeight = f.height;
      }
      this.ratingDigitsReady = true;
      this.updateRatingDigits(this.ratingString, this.colorForRating(this.userDoc?.rating?.value));
    });

    this.buildTooltip(baseDepth + 2, cardWidth);

    // Small helper tooltip for name change
    this.nameTooltip = this.add
      .text(cardLeftX + 12, margin - 6, "Change display name (7-day cooldown)", {
        fontFamily: "Courier New, monospace",
        fontSize: "12px",
        color: "#c3ff7c",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: { x: 4, y: 2 },
      })
      .setOrigin(0, 1)
      .setDepth(baseDepth + 5)
      .setScrollFactor(0)
      .setVisible(false);

    // Hidden file input for avatar change
    this.hiddenFileInput = document.createElement("input");
    this.hiddenFileInput.type = "file";
    this.hiddenFileInput.accept = "image/*";
    this.hiddenFileInput.style.display = "none";
    this.hiddenFileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) this.handleAvatarFile(file);
      e.target.value = "";
    });
    document.body.appendChild(this.hiddenFileInput);

    this.scale.on("resize", (gameSize) => this.onResize(gameSize));
    this.onResize({ width, height: this.cameras.main.height });

    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    if (auth?.onAuthStateChanged) {
      auth.onAuthStateChanged((user) => {
        if (this.userDocUnsub) {
          this.userDocUnsub();
          this.userDocUnsub = null;
        }
        this.currentUser = user;
        if (user) {
          FC.ensureUserDocument?.(user)
            .then(async (docRef) => {
              this.userDocUnsub = docRef.onSnapshot((snap) => {
                this.userDoc = snap.data();
                this.lastNameChangeAt = snap.data()?.lastNameChangeAt ? Date.parse(snap.data().lastNameChangeAt) : null;
                this.renderTexts();
              });
            })
            .catch(() => {});
        } else {
          this.userDoc = null;
          this.loadFallbackCache();
          this.renderTexts();
        }
      });
    }

    this.renderTexts();
    this.registerInputHandlers();
  }

  async handleAvatarFile(file) {
    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    if (!auth?.currentUser) return;
    const uploader = FC?.updateAvatarFromFile;
    if (!uploader) return;
    try {
      await uploader(auth.currentUser, file);
      this.updateAvatar(file);
    } catch (e) {
      console.warn("Avatar upload failed", e);
    }
  }

  handleAvatarChange() {
    if (!this.currentUser) {
      if (!this.scene.isActive("AuthScene")) {
        this.scene.launch("AuthScene");
      } else {
        this.scene.bringToTop("AuthScene");
      }
    } else {
      this.hiddenFileInput?.click();
    }
  }

  promptLogin() {
    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    if (!auth) return;
    const email = prompt("Email:");
    const password = prompt("Password:");
    if (!email || !password) return;
    FC.signInWithEmailPassword?.(email, password).catch((err) => {
      alert(`Login failed: ${err?.message || err}`);
    });
  }

  onResize(gameSize) {
    const { width, height } = gameSize;
    const margin = this.cardMargin;
    const cardWidth = 220;
    const cardLeftX = width - margin - cardWidth;
    if (this.card) this.card.setPosition(width - margin, margin);
    if (this.avatarCircle) this.avatarCircle.setPosition(width - margin - 24, margin + this.cardHeight / 2);
    if (this.avatarImage) this.avatarImage.setPosition(width - margin - 24, margin + this.cardHeight / 2);
    if (this.nameText) this.nameText.setPosition(cardLeftX + 12, margin + 10);
    this.ratingPos = { x: cardLeftX - 4, y: margin + 18 };
    this.layoutRatingDigits();
    if (this.tooltip) {
      this.layoutTooltip(width, height);
    }
  }

  colorForRating(value) {
    if (value >= 2000) return "#7cc7ff";
    if (value >= 1500) return "#c3ff7c";
    if (value >= 1000) return "#ffd37c";
    if (value >= 500) return "#ff9f7c";
    return "#bbbbbb";
  }

  renderTexts() {
    const name = this.currentUser?.displayName || this.userDoc?.profile?.displayName || "Guest";
    const ratingVal =
      this.userDoc?.rating?.value ??
      this.userDoc?.fallbackRating?.value ??
      this.fallbackCache?.rating?.value;
    const ratingText = ratingVal != null ? Math.round(ratingVal).toString() : "—";
    const ratingColor = ratingVal != null ? this.colorForRating(ratingVal) : "#bbbbbb";
    this.nameText?.setText(name);
    this.ratingString = ratingText;
    this.ratingColor = ratingColor;
    this.updateRatingDigits(this.ratingString, this.ratingColor);
    if (this.tooltipBodyName) this.tooltipBodyName.setText(name);
    if (this.tooltipBodyRating) this.tooltipBodyRating.setText(`Rating: ${ratingText}`);
    const avatarUrl = this.currentUser?.photoURL || this.userDoc?.profile?.photoURL || this.userDoc?.profile?.avatarUrl;
    this.updateAvatar(avatarUrl);
  }

  loadFallbackCache() {
    try {
      const cached = localStorage.getItem("mino_rating_fallback");
      this.fallbackCache = cached ? JSON.parse(cached) : null;
    } catch (_) {
      this.fallbackCache = null;
    }
  }

  update() {
    // Only show overlay in main menu
    const show = this.scene.manager.isActive("MenuScene");
    if (!show && this.tooltipVisible) {
      this.hideTooltip();
    }
    [this.card, this.nameText, this.avatarCircle, this.tooltip, this.tooltipDim].forEach((obj) => {
      if (obj) obj.setVisible(show && (obj !== this.tooltip && obj !== this.tooltipDim ? true : this.tooltipVisible));
    });
    this.setRatingVisible(show && this.tooltipVisible ? this.tooltipVisible : show);
    if (this.card && this.card.input && this.card.input.enabled && this.input?.activePointer?.isDown) {
      // noop to keep pointer active
    }
  }

  updateAvatar(url) {
    const x = this.game.scale.width - this.cardMargin - 24;
    const y = this.cardMargin + this.cardHeight / 2;
    const size = this.avatarSize;
    const setTooltipAvatar = (textureKey) => {
      if (this.tooltipAvatarImage) {
        this.tooltipAvatarImage.destroy();
        this.tooltipAvatarImage = null;
      }
      if (textureKey && this.tooltip) {
        this.tooltipAvatarImage = this.add
          .image(this.tooltipAvatarCircle.x, this.tooltipAvatarCircle.y, textureKey)
          .setDisplaySize(this.tooltipAvatarCircle.radius * 2, this.tooltipAvatarCircle.radius * 2)
          .setOrigin(0.5)
          .setDepth(this.tooltip.depth + 1)
          .setScrollFactor(0);
        this.tooltipAvatarCircle?.setVisible(false);
      } else {
        this.tooltipAvatarCircle?.setVisible(true);
      }
    };

    if (!url) {
      if (this.avatarImage) {
        this.avatarImage.destroy();
        this.avatarImage = null;
      }
      this.avatarCircle?.setVisible(true);
      setTooltipAvatar(null);
      return;
    }
    const key = `avatar_${Date.now()}`;
    this.load.image(key, url);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      if (this.avatarImage) this.avatarImage.destroy();
      this.avatarImage = this.add
        .image(x, y, key)
        .setDisplaySize(size, size)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(this.baseDepth + 1);
      this.avatarCircle?.setVisible(false);
      setTooltipAvatar(key);
    });
    this.load.start();
  }

  buildTooltip(depth, cardWidth) {
    const cam = this.cameras.main;
    const dim = this.add
      .rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.65)
      .setScrollFactor(0)
      .setDepth(depth - 1)
      .setVisible(false)
      .setInteractive();

    const modalW = cam.width * 0.75;
    const modalH = cam.height * 0.75;
    const container = this.add.container(cam.width / 2, cam.height / 2).setDepth(depth).setVisible(false).setScrollFactor(0);
    const bg = this.add.rectangle(0, 0, modalW, modalH, 0x111111, 0.95).setOrigin(0.5).setStrokeStyle(1, 0x555555);
    const title = this.add.text(-modalW / 2 + 16, -modalH / 2 + 16, "Profile", {
      fontFamily: "Courier New, monospace",
      fontSize: "18px",
      color: "#ffffff",
    }).setOrigin(0, 0);
    const avatarR = 26;
    this.tooltipAvatarCircle = this.add
      .circle(-modalW / 2 + 16 + avatarR, -modalH / 2 + 44 + avatarR, avatarR, 0x777777, 1)
      .setStrokeStyle(1, 0xaaaaaa)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => this.handleAvatarChange());
    this.tooltipBodyName = this.add.text(-modalW / 2 + 16 + avatarR * 2 + 10, -modalH / 2 + 44, "Guest", {
      fontFamily: "Courier New, monospace",
      fontSize: "16px",
      color: "#ffffff",
    }).setOrigin(0, 0).setInteractive({ useHandCursor: true }).on("pointerup", () => this.handleNameChange());
    this.tooltipBodyRating = this.add.text(-modalW / 2 + 16 + avatarR * 2 + 10, -modalH / 2 + 68, "Rating: —", {
      fontFamily: "Courier New, monospace",
      fontSize: "14px",
      color: "#bbbbbb",
    }).setOrigin(0, 0);

    // Placeholder best scores grouped rows
    this.tooltipBodyGroups = [];
    const groupYStart = -modalH / 2 + 110;
    const groupLineHeight = 22;
    for (let i = 0; i < 6; i++) {
      const t = this.add.text(-modalW / 2 + 16, groupYStart + i * groupLineHeight, "", {
        fontFamily: "Courier New, monospace",
        fontSize: "13px",
        color: "#cfcfcf",
      }).setOrigin(0, 0);
      this.tooltipBodyGroups.push(t);
      container.add(t);
    }

    container.add([bg, title, this.tooltipAvatarCircle, this.tooltipBodyName, this.tooltipBodyRating]);
    this.tooltipDim = dim;
    this.tooltip = container;
  }

  layoutTooltip(width, height) {
    if (!this.tooltip || !this.tooltipDim) return;
    const modalW = width * 0.75;
    const modalH = height * 0.75;
    this.tooltipDim.setPosition(width / 2, height / 2).setSize(width, height);
    this.tooltip.setPosition(width / 2, height / 2);
    const bg = this.tooltip.list?.find((c) => c.width === this.tooltip.list[0].width); // first child is bg
    if (bg) {
      bg.setSize(modalW, modalH);
      bg.setPosition(0, 0);
    }
    const offsetX = -modalW / 2 + 16;
    const offsetY = -modalH / 2 + 16;
    const avatarR = this.tooltipAvatarCircle?.radius || 26;
    if (this.tooltipAvatarCircle) {
      this.tooltipAvatarCircle.setPosition(offsetX + avatarR, offsetY + 28 + avatarR);
    }
    if (this.tooltipAvatarImage) {
      this.tooltipAvatarImage.setPosition(offsetX + avatarR, offsetY + 28 + avatarR);
    }
    this.tooltipBodyName?.setPosition(offsetX + avatarR * 2 + 10, offsetY + 28);
    this.tooltipBodyRating?.setPosition(offsetX + avatarR * 2 + 10, offsetY + 52);
    const groupYStart = offsetY + 94;
    this.tooltipBodyGroups?.forEach((t, idx) => t.setPosition(offsetX, groupYStart + idx * 22));
  }

  toggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
    if (this.tooltip) this.tooltip.setVisible(this.tooltipVisible);
    if (this.tooltipDim) this.tooltipDim.setVisible(this.tooltipVisible);
    if (this.tooltipVisible) this.populateTooltipBestScores();
  }

  hideTooltip() {
    this.tooltipVisible = false;
    if (this.tooltip) this.tooltip.setVisible(false);
    if (this.tooltipDim) this.tooltipDim.setVisible(false);
  }

  registerInputHandlers() {
    this.card?.on("pointerup", () => {
      if (!this.currentUser) {
        if (!this.scene.isActive("AuthScene")) {
          this.scene.launch("AuthScene");
        } else {
          this.scene.bringToTop("AuthScene");
        }
      } else {
        this.toggleTooltip();
      }
    });
    this.tooltipDim?.on("pointerup", () => {
      if (this.tooltipVisible) this.hideTooltip();
    });
    this.input?.on("pointerdown", (pointer, currentlyOver) => {
      if (!this.tooltipVisible) return;
      const overTooltip = currentlyOver?.some?.((obj) => obj === this.tooltip || obj === this.card || this.tooltip?.contains?.(obj));
      if (!overTooltip) {
        this.hideTooltip();
      }
    });
  }

  populateTooltipBestScores() {
    const groups = [
      { title: "Sprint", keys: ["sprint_40", "sprint_100"] },
      { title: "Marathon", keys: ["marathon", "ultra"] },
      { title: "Master", keys: ["tgm1", "tgm2_master", "tgm2_normal", "tgm3_master", "ta_death", "tgm3_shirase"] },
      { title: "Versus", keys: ["vs_standard"] },
      { title: "Others", keys: ["zen", "sakura"] },
    ];
    const best = this.userDoc?.bestScores || this.userDoc?.modes || {};
    const lines = [];
    groups.forEach((g) => {
      const entries = g.keys
        .map((k) => (best[k] ? `${k}: ${this.formatScore(best[k])}` : null))
        .filter(Boolean);
      if (entries.length) {
        lines.push(`${g.title}: ${entries.join("  |  ")}`);
      }
    });
    while (lines.length < this.tooltipBodyGroups.length) lines.push("");
    this.tooltipBodyGroups.forEach((t, idx) => t.setText(lines[idx] || ""));
  }

  formatScore(entry) {
    if (!entry) return "—";
    if (typeof entry === "number") return entry.toString();
    if (entry.timeSeconds != null) {
      const sec = Math.max(0, entry.timeSeconds);
      const mm = Math.floor(sec / 60)
        .toString()
        .padStart(2, "0");
      const ss = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");
      return `${mm}:${ss}`;
    }
    if (entry.score != null) return `${entry.score}`;
    if (entry.grade != null) return `${entry.grade}`;
    return JSON.stringify(entry);
  }

  buildLoginUI() {
    const cam = this.cameras.main;
    const w = 280;
    const h = 200;
    const overlay = this.add.rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.75)
      .setScrollFactor(0)
      .setDepth(11999)
      .setInteractive({ useHandCursor: false });
    const bg = this.add.rectangle(cam.width / 2, cam.height / 2, w, h, 0x111111, 0.95)
      .setStrokeStyle(1, 0x666666)
      .setScrollFactor(0)
      .setDepth(12000);
    const title = this.add.text(bg.x, bg.y - h / 2 + 12, "Account", {
      fontFamily: "Courier New, monospace",
      fontSize: "14px",
      color: "#ffffff",
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(12001);

    const email = this.add.dom(bg.x, bg.y - 40, "input", "width:220px;height:24px;font-size:13px;", "");
    email.node.type = "email";
    email.node.placeholder = "Email";
    email.node.tabIndex = 1;
    const pass = this.add.dom(bg.x, bg.y, "input", "width:220px;height:24px;font-size:13px;", "");
    pass.node.type = "password";
    pass.node.placeholder = "Password";
    pass.node.tabIndex = 2;
    const status = this.add.text(bg.x, bg.y + 60, "", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#ffcccc",
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(12001);

    const loginBtn = this.add.text(bg.x - 60, bg.y + 30, "[Login]", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#7cc7ff",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(12001).setInteractive({ useHandCursor: true });

    const registerBtn = this.add.text(bg.x + 60, bg.y + 30, "[Register]", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#c3ff7c",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(12001).setInteractive({ useHandCursor: true });

    const closeBtn = this.add.text(bg.x + w / 2 - 10, bg.y - h / 2 + 8, "X", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#ff9999",
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(12001).setInteractive({ useHandCursor: true });

    loginBtn.on("pointerup", async () => {
      await this.handleLogin(email.node.value, pass.node.value, status);
    });
    registerBtn.on("pointerup", async () => {
      await this.handleRegister(email.node.value, pass.node.value, status);
    });
    closeBtn.on("pointerup", () => this.hideLoginUI());

    this.loginContainer = {
      overlay,
      bg,
      title,
      email,
      pass,
      status,
      loginBtn,
      registerBtn,
      closeBtn,
      mode: "choice",
      keyboardWasEnabled: true,
    };
  }

  hideLoginUI() {
    if (!this.loginContainer) return;
    Object.values(this.loginContainer).forEach((obj) => {
      if (obj?.setVisible) obj.setVisible(false);
      if (obj?.node) obj.node.style.display = "none";
    });
    if (this.input?.keyboard && this.loginContainer.keyboardWasEnabled) {
      this.input.keyboard.enabled = true;
    }
  }

  showLoginUI() {
    if (!this.loginContainer) return;
    this.loginContainer.keyboardWasEnabled = this.input?.keyboard?.enabled !== false;
    if (this.input?.keyboard) this.input.keyboard.enabled = false;
    this.setMode("choice");
    Object.values(this.loginContainer).forEach((obj) => {
      if (obj?.setVisible) obj.setVisible(true);
      if (obj?.node) obj.node.style.display = "block";
    });
    // Dim the card while modal is open
    this.card?.setVisible(false);
    this.nameText?.setVisible(false);
    this.ratingText?.setVisible(false);
  }

  async handleLogin(email, password, statusText) {
    const FC = window.FirebaseClient;
    if (!FC?.signInWithEmailPassword) return;
    if (!email || !password) {
      statusText.setText("Enter email/password");
      return;
    }
    statusText.setText("Signing in...");
    try {
      await FC.signInWithEmailPassword(email, password);
      statusText.setText("Signed in");
      this.hideLoginUI();
      this.card?.setVisible(true);
      this.nameText?.setVisible(true);
      this.ratingText?.setVisible(true);
    } catch (e) {
      statusText.setText(e?.message || "Login failed");
    }
  }

  async handleRegister(email, password, statusText) {
    const FC = window.FirebaseClient;
    if (!FC?.registerWithEmailPassword) return;
    if (!email || !password) {
      statusText.setText("Enter email/password");
      return;
    }
    statusText.setText("Registering...");
    try {
      await FC.registerWithEmailPassword(email, password, email.split("@")[0]);
      statusText.setText("Check your email to verify");
      this.card?.setVisible(true);
      this.nameText?.setVisible(true);
      this.ratingText?.setVisible(true);
    } catch (e) {
      statusText.setText(e?.message || "Register failed");
    }
  }

  setMode(mode) {
    if (!this.loginContainer) return;
    this.loginContainer.mode = mode;
    const { email, pass, loginBtn, registerBtn, status, title } = this.loginContainer;
    if (mode === "login") {
      title.setText("Login");
      loginBtn.setVisible(true);
      registerBtn.setVisible(false);
      status.setText("");
      email.node.placeholder = "Email";
      pass.node.placeholder = "Password";
      email.node.value = "";
      pass.node.value = "";
      email.node.type = "email";
      pass.node.type = "password";
      setTimeout(() => email.node.focus(), 0);
    } else if (mode === "register") {
      title.setText("Register (verify email)");
      loginBtn.setVisible(false);
      registerBtn.setVisible(true);
      status.setText("");
      email.node.placeholder = "Email";
      pass.node.placeholder = "Password";
      email.node.value = "";
      pass.node.value = "";
      email.node.type = "email";
      pass.node.type = "password";
      setTimeout(() => email.node.focus(), 0);
    } else {
      title.setText("Account");
      loginBtn.setVisible(true);
      registerBtn.setVisible(true);
      status.setText("Choose login or register");
      email.node.value = "";
      pass.node.value = "";
      setTimeout(() => email.node.focus(), 0);
    }
  }
}

window.ProfileOverlayScene = ProfileOverlayScene;
