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
    this.ratingSpacing = -25;
    this.tooltip = null;
    this.tooltipDim = null;
    this.tooltipVisible = false;
    this.tooltipBodyName = null;
    this.tooltipBodyRating = null;
    this.tooltipBodyGroups = [];
    this.bestRowsContainer = null;
    this.bestRowItems = [];
    this.tooltipRatingDigits = [];
    this.tooltipRatingScale = 0.38;
    this.tooltipRatingPos = { x: 0, y: 0 }; // screen coords (deprecated)
    this.tooltipRatingLocalPos = { x: 0, y: 0 }; // local to tooltip container
    this.tooltipRankText = null;
    this.tooltipAvatarButton = null;
    this.tooltipNameButton = null;
    this.tooltipBannerButton = null;
    this.tooltipSignOutButton = null;
    this.tooltipBannerImage = null;
    this.tooltipBannerRect = null;
    this.bannerCache = {};
    this.hiddenBannerInput = null;
    this.bannerHeight = 240;
    this.currentBannerUrl = null;
    this.bestRowsLayout = { startX: 0, startY: 0, cardW: 210, cardH: 80, gapX: 16, rowGap: 110 };
    this.currentUser = null;
    this.userDoc = null;
    this.userDocUnsub = null;
    this.fallbackCache = null;
    this.loginContainer = null;
    this.loginFields = {};
    this.avatarCache = {};
    this.hiddenFileInput = null;
    this.hiddenBannerInput = null;
    this.lastNameChangeAt = null;
    this.nameTooltip = null;
    this.nameChangeModal = null;
    this.profileTab = "best";
    this.profileTabButtons = {};
    this.profileTabButtonItems = [];
    this.profileTabContentRoot = null;
    this.profileTabContentMask = null;
    this.profileTabContentMaskGfx = null;
    this.profileTabContentContainer = null;
    this.profileTabContentViewport = { x: 0, y: 0, w: 0, h: 0 };
    this.profileTabScrollY = 0;
    this.profileTabContentHeight = 0;
    this.bestScoresTab = "Easy";
    this.bestScoresTabButtons = {};
    this.bestScoresTabButtonItems = [];
    this.bestScoresTabRowY = 0;
  }

  updateBanner(url) {
    this.currentBannerUrl = url || null;
    if (this.tooltipBannerImage) {
      this.tooltipBannerImage.destroy();
      this.tooltipBannerImage = null;
    }
    if (this.tooltipBannerOverlay) {
      this.tooltipBannerOverlay.destroy();
      this.tooltipBannerOverlay = null;
    }
    if (!url) {
      if (this.tooltipBannerRect) this.tooltipBannerRect.setVisible(false);
      return;
    }
    if (this.tooltipBannerRect) this.tooltipBannerRect.setVisible(true);
    const cachedKey = url ? this.bannerCache[url] : null;
    const placeBanner = (key) => {
      if (!this.tooltip) return;
      const w = (this.tooltipBg?.width || this.cameras.main.width * 0.75) - 16;
      const h = this.bannerHeight;
      const y = -((this.tooltipBg?.height || this.cameras.main.height * 0.75) / 2) + h / 2 + 8;
      
      // Banner image (centered, no stretching)
      this.tooltipBannerImage = this.add
        .image(0, y, key)
        .setOrigin(0.5)
        .setDepth((this.tooltip?.depth || this.baseDepth) + 0.1) // Behind all text elements
        .setScrollFactor(0);
      
      // Scale image to fit banner height while maintaining aspect ratio
      const texture = this.textures.get(key);
      if (texture && texture.source) {
        const imgWidth = texture.source.width;
        const imgHeight = texture.source.height;
        const aspectRatio = imgWidth / imgHeight;
        const displayHeight = h;
        const displayWidth = displayHeight * aspectRatio;
        
        // If image is wider than container, scale to fit width
        if (displayWidth > w) {
          const scale = w / displayWidth;
          this.tooltipBannerImage.setScale(scale);
        } else {
          this.tooltipBannerImage.setDisplaySize(displayWidth, displayHeight);
        }
      } else {
        // Fallback: use display size but maintain aspect ratio
        this.tooltipBannerImage.setDisplaySize(w, h);
      }
      
      this.tooltip.add(this.tooltipBannerImage);
      
      // Grey tint overlay above banner but below text
      this.tooltipBannerOverlay = this.add
        .rectangle(0, y, w, h, 0x000000, 0.3) // Semi-transparent black overlay
        .setOrigin(0.5)
        .setDepth((this.tooltip?.depth || this.baseDepth) + 0.2) // Still behind text elements
        .setScrollFactor(0);
      this.tooltip.add(this.tooltipBannerOverlay);
    };
    if (cachedKey && this.textures.exists(cachedKey)) {
      placeBanner(cachedKey);
      return;
    }
    const key = `banner_${Date.now()}`;
    this.load.image(key, url);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.bannerCache[url] = key;
      placeBanner(key);
    });
    this.load.start();
  }

  async handleBannerFile(file) {
    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    if (!auth?.currentUser) return;
    const uploader = FC?.updateBannerFromFile;
    if (!uploader) return;
    try {
      const url = await uploader(auth.currentUser, file);
      this.updateBanner(url);
    } catch (e) {
      console.warn("Banner upload failed", e);
    }
  }

  handleBannerChange() {
    if (!this.currentUser) {
      if (!this.scene.isActive("AuthScene")) {
        this.scene.launch("AuthScene");
      } else {
        this.scene.bringToTop("AuthScene");
      }
    } else {
      this.hiddenBannerInput?.click();
    }
  }

  handleSignOut() {
    const FC = window.FirebaseClient;
    const signOutUser = FC?.signOutUser;
    if (typeof signOutUser === "function") {
      signOutUser().catch((e) => console.warn("Sign out failed", e));
    }
    this.hideTooltip();
    this.setTooltipRatingVisible(false);
    this.setRatingVisible(false);
  }

  setTooltipRatingVisible(visible) {
    const shouldShow = visible && this.currentUser;
    if (this.tooltipRatingDigits?.length) {
      this.tooltipRatingDigits.forEach((d) => d.setVisible(shouldShow));
    }
    this.tooltipBodyRating?.setVisible(shouldShow && (!this.tooltipRatingDigits?.length || !this.ratingDigitsReady));
  }

  updateTooltipRatingDigits(value, colorHex) {
    this.clearTooltipRatingDigits();
    if (!this.ratingDigitsReady || !this.textures.exists("ratingdigits")) {
      this.tooltipBodyRating?.setText(value || "—").setColor(colorHex || "#bbbbbb").setVisible(true);
      return;
    }
    
    // Handle the case where value is "—" or null/undefined
    if (!value || value === "—") {
      this.tooltipBodyRating?.setText("—").setColor(colorHex || "#bbbbbb").setVisible(true);
      return;
    }
    
    const num = Number(value);
    const digitsStr = Number.isFinite(num) ? Math.max(0, Math.round(num)).toString() : null;
    if (!digitsStr) {
      this.tooltipBodyRating?.setText(value || "—").setColor(colorHex || "#bbbbbb").setVisible(true);
      return;
    }
    this.tooltipBodyRating?.setVisible(false);

    const mult = (this.digitWidth || 0) >= 200 ? 0.5 : 1;
    const scaledWidth = (this.digitWidth || 100) * this.tooltipRatingScale * mult;
    const scaledHeight = (this.digitHeight || 100) * this.tooltipRatingScale * mult;
    const spacing = (this.ratingSpacing + 5) * mult + (mult === 0.5 ? -12 : 0);
    const targetContainer = this.tooltip || this;
    const baseDepth = (this.tooltip?.depth || this.baseDepth) + 2;
    
    // Check if we need gradient
    const needsGradient = colorHex && (colorHex.includes("gradient") || colorHex === "rainbow");
    
    if (needsGradient) {
      // Create individual digit sprites with gradient applied directly
      for (let i = 0; i < digitsStr.length; i++) {
        const d = digitsStr[i];
        const frameIndex = parseInt(d, 10);
        
        // Verify the frame exists before proceeding
        const spritesheet = this.textures.get('ratingdigits');
        const frame = spritesheet.get(frameIndex.toString());
        
        if (!frame) {
          continue; // Skip this digit if frame doesn't exist
        }
        
        // Create gradient digit canvas
        const gradientDigitTexture = this.createGradientDigitCanvas(
          frameIndex,
          colorHex,
          mult === 0.5 ? scaledWidth / mult : scaledWidth,
          mult === 0.5 ? scaledHeight / mult : scaledHeight,
          i,
          digitsStr.length,
        );
        
        if (!gradientDigitTexture) {
          continue;
        }
        
        // Create container for this digit
        const container = this.add.container(this.tooltipRatingLocalPos.x + i * (scaledWidth + spacing), this.tooltipRatingLocalPos.y);
        container.setDepth(baseDepth);
        container.setScrollFactor(0);
        
        // Add the gradient digit sprite
        const digitSprite = this.add.image(0, 0, gradientDigitTexture)
          .setOrigin(0, 0)
          .setDisplaySize(scaledWidth, scaledHeight);
        
        container.add(digitSprite);
        targetContainer.add(container);
        this.tooltipRatingDigits.push(container);
      }
    } else {
      // Regular digit sprites with color tint
      const tintValue = typeof colorHex === 'string' && colorHex.startsWith('#') 
        ? parseInt(colorHex.replace('#', '0x'), 16) 
        : colorHex;
      
      for (let i = 0; i < digitsStr.length; i++) {
        const d = digitsStr[i];
        const frameIndex = parseInt(d, 10);
        const img = this.add
          .image(this.tooltipRatingLocalPos.x + i * (scaledWidth + spacing), this.tooltipRatingLocalPos.y, "ratingdigits", frameIndex)
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setDepth(baseDepth)
          .setTint(tintValue)
          .setDisplaySize(scaledWidth, scaledHeight)
          .setVisible(true);
        targetContainer.add(img);
        this.tooltipRatingDigits.push(img);
      }
    }
  }

  clearRatingDigits() {
    if (this.ratingDigits?.length) {
      this.ratingDigits.forEach((d) => d.destroy());
    }
    this.ratingDigits = [];
  }

  clearTooltipRatingDigits() {
    if (this.tooltipRatingDigits?.length) {
      this.tooltipRatingDigits.forEach((d) => d.destroy());
    }
    this.tooltipRatingDigits = [];
  }

  layoutRatingDigits() {
    if (!this.ratingDigits?.length) return;
    const baseX = this.ratingPos.x;
    const baseY = this.ratingPos.y;
    const mult = (this.digitWidth || 0) >= 200 ? 0.5 : 1;
    const scaledWidth = (this.digitWidth || 100) * this.ratingScale * mult;
    const spacing = this.ratingSpacing * mult + (mult === 0.5 ? -12 : 0);
    const step = Math.round(scaledWidth + spacing);
    this.ratingDigits.forEach((img, idx) => {
      img.setPosition(Math.round(baseX + idx * step), Math.round(baseY));
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
    
    // Handle the case where value is "—" or null/undefined
    if (!this.ratingString || this.ratingString === "—") {
      this.ratingText?.setText("—").setColor(this.ratingColor).setVisible(true);
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
    const mult = (this.digitWidth || 0) >= 200 ? 0.5 : 1;
    const scaledWidth = (this.digitWidth || 100) * this.ratingScale * mult;
    const scaledHeight = (this.digitHeight || 100) * this.ratingScale * mult;
    const spacing = this.ratingSpacing * mult + (mult === 0.5 ? -12 : 0);
    
    // Check if we need gradient
    const needsGradient = this.ratingColor && (this.ratingColor.includes("gradient") || this.ratingColor === "rainbow");
    
    if (needsGradient) {
      // Create individual digit sprites with gradient applied directly
      for (let i = 0; i < digitsStr.length; i++) {
        const d = digitsStr[i];
        const frameIndex = parseInt(d, 10);
        
        // Verify the frame exists before proceeding
        const spritesheet = this.textures.get('ratingdigits');
        const frame = spritesheet.get(frameIndex.toString());
        
        if (!frame) {
          continue; // Skip this digit if frame doesn't exist
        }
        
        // Create gradient digit canvas
        const gradientDigitTexture = this.createGradientDigitCanvas(
          frameIndex,
          this.ratingColor,
          mult === 0.5 ? scaledWidth / mult : scaledWidth,
          mult === 0.5 ? scaledHeight / mult : scaledHeight,
          i,
          digitsStr.length,
        );
        
        if (!gradientDigitTexture) {
          continue;
        }
        
        // Create container for this digit
        const container = this.add.container(this.ratingPos.x + i * (scaledWidth + spacing), this.ratingPos.y);
        container.setDepth(depth);
        container.setScrollFactor(0);
        
        // Add the gradient digit sprite
        const digitSprite = this.add.image(0, 0, gradientDigitTexture)
          .setOrigin(0, 0)
          .setDisplaySize(scaledWidth, scaledHeight);
        
        container.add(digitSprite);
        this.ratingDigits.push(container);
      }
    } else {
      // Regular digit sprites with color tint
      const tintValue = typeof this.ratingColor === 'string' && this.ratingColor.startsWith('#') 
        ? parseInt(this.ratingColor.replace('#', '0x'), 16) 
        : this.ratingColor;
      
      for (let i = 0; i < digitsStr.length; i++) {
        const d = digitsStr[i];
        const frameIndex = parseInt(d, 10);
        const img = this.add
          .image(this.ratingPos.x + i * (scaledWidth + spacing), this.ratingPos.y, "ratingdigits", frameIndex)
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setDepth(depth)
          .setTint(tintValue)
          .setDisplaySize(scaledWidth, scaledHeight);
        this.ratingDigits.push(img);
      }
    }
    
    // Skip layoutRatingDigits since we're positioning manually
  }

  setRatingVisible(visible) {
    const shouldShow = visible && this.currentUser;
    this.ratingText?.setVisible(shouldShow);
    if (this.ratingDigits?.length) {
      this.ratingDigits.forEach((d) => d.setVisible(shouldShow));
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
    this.avatarSize = Math.min(cardHeight - 12, 48);

    const baseDepth = this.baseDepth; // keep under corner texts if they use higher depth

    this.card = this.add
      .rectangle(width - margin, margin, cardWidth, cardHeight, 0x111111, 0.85)
      .setOrigin(1, 0)
      .setStrokeStyle(1, 0x444444)
      .setScrollFactor(0)
      .setDepth(baseDepth)
      .setInteractive({ useHandCursor: true });

    this.avatarCircle = this.add
      .circle(width - margin - 24, margin + cardHeight / 2, this.avatarSize / 2, 0x777777, 1)
      .setStrokeStyle(1, 0xaaaaaa)
      .setScrollFactor(0)
      .setDepth(baseDepth + 1);

    this.nameText = this.add
      .text(cardLeftX + 12, margin + 10, "Guest", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "16px",
        color: "#ffffff",
        antialias: true,
        smooth: false,
      })
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(baseDepth + 1);

    const ratingBgY = margin + 34;
    const ratingBgX = cardLeftX - 8;
    this.ratingPos = { x: ratingBgX + 4, y: ratingBgY - 6 };

    const ensureRatingTexture = () => {
      if (this.textures.exists("ratingdigits")) return Promise.resolve();
      return new Promise((resolve) => {
        // const onComplete = () => {
        //   this.load.off(Phaser.Loader.Events.LOAD_ERROR, onError);
        //   resolve();
        // };
        // const onError = (file) => {
        //   if (file && file.key === "ratingdigits") {
        //     this.load.off(Phaser.Loader.Events.COMPLETE, onComplete);
        //     this.load.off(Phaser.Loader.Events.LOAD_ERROR, onError);
        //     this.load.spritesheet("ratingdigits", "img/ratingnumbers.png", { frameWidth: 115, frameHeight: 115 });
        //     this.load.once(Phaser.Loader.Events.COMPLETE, resolve);
        //     this.load.start();
        //   }
        // };

        // this.load.spritesheet("ratingdigits", "img/ratingnumbers@2x.png", { frameWidth: 230, frameHeight: 230 });
        // this.load.once(Phaser.Loader.Events.COMPLETE, onComplete);
        // this.load.on(Phaser.Loader.Events.LOAD_ERROR, onError);
        // this.load.start();

        this.load.spritesheet("ratingdigits", "img/ratingnumbers.png", { frameWidth: 115, frameHeight: 115 });
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
       // Also render tooltip rating sprites once texture is ready
      this.updateTooltipRatingDigits(this.ratingString, this.colorForRating(this.userDoc?.rating?.value));
    });

    this.buildTooltip(baseDepth + 2, cardWidth);

    // Small helper tooltip for name change
    this.nameTooltip = this.add
      .text(cardLeftX + 12, margin - 6, "Change display name (7-day cooldown)", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "12px",
        color: "#c3ff7c",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: { x: 4, y: 2 },
        antialias: true,
        smooth: false,
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

    // Hidden file input for banner change
    this.hiddenBannerInput = document.createElement("input");
    this.hiddenBannerInput.type = "file";
    this.hiddenBannerInput.accept = "image/*";
    this.hiddenBannerInput.style.display = "none";
    this.hiddenBannerInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) this.handleBannerFile(file);
      e.target.value = "";
    });
    document.body.appendChild(this.hiddenBannerInput);

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
    
    // Add console function for testing rating colors
    window.testRatingColor = (rating) => {
      const color = this.colorForRating(rating);
      console.log(`Rating ${rating} -> Color: ${color}`);
      this.ratingString = rating.toString();
      this.ratingColor = color;
      this.updateRatingDigits(this.ratingString, this.ratingColor);
      this.updateTooltipRatingDigits(this.ratingString, this.ratingColor);
    };
    
    console.log('Rating color test function available: testRatingColor(rating)');
    console.log('Examples: testRatingColor(196), testRatingColor(5000), testRatingColor(15000)');
  }

  async handleAvatarFile(file) {
    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    if (!auth?.currentUser) return;
    const uploader = FC?.updateAvatarFromFile;
    if (!uploader) return;
    try {
      const url = await uploader(auth.currentUser, file);
      this.updateAvatar(url);
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
      alert("Unable to update name right now.");
    });
  }

  showNameTooltip(x, y) {
    if (!this.nameTooltip) return;
    this.nameTooltip.setPosition(x, y).setVisible(true);
  }

  hideNameTooltip() {
    if (!this.nameTooltip) return;
    this.nameTooltip.setVisible(false);
  }

  async handleNameChange(forcedName, password, statusText) {
    const FC = window.FirebaseClient;
    const auth = FC?.getAuth?.();
    const user = auth?.currentUser;
    if (!user) {
      this.promptLogin();
      return;
    }
    const now = Date.now();
    const cooldownMs = 7 * 24 * 60 * 60 * 1000;
    if (this.lastNameChangeAt && now - this.lastNameChangeAt < cooldownMs) {
      const remainingDays = Math.ceil((cooldownMs - (now - this.lastNameChangeAt)) / (24 * 60 * 60 * 1000));
      statusText ? statusText.setText(`Change allowed in ${remainingDays} day(s)`) : alert(`You can change your name again in ${remainingDays} day(s).`);
      return false;
    }
    const newName = forcedName ?? prompt("Enter new display name (3-20 chars):", user.displayName || "");
    if (!newName) return false;
    const trimmed = newName.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      statusText ? statusText.setText("Name must be 3-20 characters") : alert("Name must be 3-20 characters.");
      return false;
    }
    try {
      // Optional reauth if password provided
      if (password && FC?.reauthWithPassword) {
        await FC.reauthWithPassword(user, password);
      }
      if (typeof user.updateProfile === "function") {
        await user.updateProfile({ displayName: trimmed });
      } else if (FC?.updateDisplayName) {
        await FC.updateDisplayName(user, trimmed);
      }
      this.lastNameChangeAt = now;
      this.renderTexts();
      // Optionally write timestamp to Firestore if available
      if (FC?.updateUserProfileDoc) {
        FC.updateUserProfileDoc(user.uid, { lastNameChangeAt: new Date(now).toISOString(), profile: { displayName: trimmed } }).catch(() => {});
      }
      statusText ? statusText.setText("Updated") : null;
      return true;
    } catch (e) {
      console.warn("Name update failed", e);
      statusText ? statusText.setText("Unable to update") : alert("Unable to update name right now.");
      return false;
    }
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

  createGradientDigitCanvas(frameIndex, colorType, width, height, digitIndex, totalDigits) {
    const dpr =
      (this.game && this.game.renderer && typeof this.game.renderer.resolution === "number"
        ? this.game.renderer.resolution
        : window.devicePixelRatio || 1) || 1;
    const textureKey = `gradient_digit_canvas_${frameIndex}_${colorType}_${digitIndex}_${width}_${height}_dpr${dpr}`;
    
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    const ctx = canvas.getContext('2d');
    if (ctx && dpr !== 1) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    // Enable image smoothing for high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Get the original digit frame using multiple frame access methods
    const spritesheet = this.textures.get('ratingdigits');
    
    // Try different frame access methods
    let frame = null;
    
    // Method 1: Try get with string key
    frame = spritesheet.get(frameIndex.toString());
    
    // Method 2: Try get with numeric key
    if (!frame) {
      frame = spritesheet.get(frameIndex);
    }
    
    // Method 3: Try frames array access
    if (!frame && spritesheet.frames) {
      frame = spritesheet.frames[frameIndex];
    }
    
    // Method 4: Try frameNames array access
    if (!frame && spritesheet.frameNames) {
      const frameName = spritesheet.frameNames[frameIndex];
      if (frameName) {
        frame = spritesheet.get(frameName);
      }
    }
    
    if (frame && frame.source) {
      const sourceImage = frame.source.image;
      const inferredFrameWidth =
        (typeof frame.cutWidth === "number" && frame.cutWidth) ||
        (typeof frame.width === "number" && frame.width) ||
        Math.floor((sourceImage?.width || 0) / 10) ||
        1;
      const inferredFrameHeight =
        (typeof frame.cutHeight === "number" && frame.cutHeight) ||
        (typeof frame.height === "number" && frame.height) ||
        (sourceImage?.height || 0) ||
        1;

      const calculatedX =
        (typeof frame.cutX === "number" && frame.cutX) ||
        (typeof frame.x === "number" && frame.x) ||
        frameIndex * inferredFrameWidth;
      const calculatedY =
        (typeof frame.cutY === "number" && frame.cutY) ||
        (typeof frame.y === "number" && frame.y) ||
        0;
      
      // Draw the digit first
      ctx.drawImage(
        sourceImage,
        calculatedX, calculatedY, inferredFrameWidth, inferredFrameHeight,
        0, 0, width, height
      );
      
      // Create gradient that spans across all digits
      const totalWidth = width * totalDigits;
      const gradient = ctx.createLinearGradient(0, 0, totalWidth, 0);
      
      if (colorType === "gold-gradient") {
        gradient.addColorStop(0, '#FFEB3B');
        gradient.addColorStop(0.3, '#FFEB3B');
        gradient.addColorStop(0.5, '#FFD700');
        gradient.addColorStop(0.7, '#FFD700');
        gradient.addColorStop(1, '#FFEB3B');
      } else if (colorType === "cyan-white-cyan-gradient") {
        // Single consistent cyan-white-cyan pattern across all digits
        gradient.addColorStop(0, '#00FFFF');
        gradient.addColorStop(0.5, '#FFFFFF');
        gradient.addColorStop(1, '#00FFFF');
      } else if (colorType === "rainbow") {
        gradient.addColorStop(0, '#FF0000');
        gradient.addColorStop(0.17, '#FF7F00');
        gradient.addColorStop(0.33, '#FFFF00');
        gradient.addColorStop(0.5, '#00FF00');
        gradient.addColorStop(0.67, '#0000FF');
        gradient.addColorStop(0.83, '#4B0082');
        gradient.addColorStop(1, '#9400D3');
      }
      
      // Apply gradient only to the digit pixels using source-atop
      ctx.globalCompositeOperation = 'source-atop';
      
      // Create a temporary canvas for the gradient portion
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = Math.max(1, Math.floor(totalWidth * dpr));
      tempCanvas.height = Math.max(1, Math.floor(height * dpr));
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx && dpr !== 1) {
        tempCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(0, 0, totalWidth, height);
      
      // Copy just the portion for this digit
      const sx = Math.floor(digitIndex * width * dpr);
      const sw = Math.floor(width * dpr);
      const sh = Math.floor(height * dpr);
      ctx.drawImage(tempCanvas, sx, 0, sw, sh, 0, 0, width, height);
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    }
    
    this.textures.addCanvas(textureKey, canvas);
    return textureKey;
  }

  createGradientTexture(colorType, width = 100, height = 100) {
    const dpr =
      (this.game && this.game.renderer && typeof this.game.renderer.resolution === "number"
        ? this.game.renderer.resolution
        : window.devicePixelRatio || 1) || 1;
    const textureKey = `gradient_${colorType}_${width}_${height}_dpr${dpr}`;
    
    // Check if texture already exists
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }
    
    // Create canvas element for better gradient control
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    const ctx = canvas.getContext('2d');
    if (ctx && dpr !== 1) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    // Enable image smoothing for high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    if (colorType === "gold-gradient") {
      // Vertical gradient from gold to orange
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.5, '#FFD700');
      gradient.addColorStop(0.5, '#FFA500');
      gradient.addColorStop(1, '#FFA500');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else if (colorType === "cyan-white-cyan-gradient") {
      // Horizontal gradient from cyan to white to cyan
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00FFFF');
      gradient.addColorStop(0.5, '#FFFFFF');
      gradient.addColorStop(1, '#00FFFF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else if (colorType === "rainbow") {
      // Create rainbow with horizontal stripes
      const stripeHeight = Math.max(1, Math.floor(height / 7));
      const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
      
      for (let i = 0; i < 7; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(0, i * stripeHeight, width, stripeHeight);
      }
    } else {
      // Single color
      ctx.fillStyle = colorType;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Create texture from canvas
    this.textures.addCanvas(textureKey, canvas);
    
    return textureKey;
  }

  
  colorForRating(value) {
    if (value >= 15000) return "rainbow";
    if (value >= 14500) return "gold-gradient";
    if (value >= 14000) return "#FFD700"; // gold
    if (value >= 13000) return "#C0C0C0"; // silver
    if (value >= 12000) return "#CD7F32"; // bronze
    if (value >= 10000) return "#9B59B6"; // purple
    if (value >= 7000) return "#FF0000"; // red
    if (value >= 4000) return "#FFFF00"; // yellow
    if (value >= 2000) return "#90EE90"; // light green
    if (value >= 1000) return "#00FFFF"; // cyan
    if (value >= 0) return "cyan-white-cyan-gradient";
    return "#bbbbbb";
  }

  getRatingColor(value) {
    const colorType = this.colorForRating(value);
    return colorType;
  }

  renderTexts() {
    const name = this.currentUser?.displayName || this.userDoc?.profile?.displayName || "Guest";
    const ratingVal =
      this.userDoc?.rating?.value ??
      this.userDoc?.fallbackRating?.value ??
      this.fallbackCache?.rating?.value;
    const ratingText = ratingVal != null ? Math.round(ratingVal).toString() : "—";
    const ratingColor = ratingVal != null ? this.colorForRating(ratingVal) : "#bbbbbb";
    
    const rankVal = this.userDoc?.rating?.absoluteRank ?? this.userDoc?.rating?.rank ?? null;
    const bannerUrl = this.userDoc?.profile?.bannerUrl || this.currentBannerUrl;
    this.nameText?.setText(name);
    this.ratingString = ratingText;
    this.ratingColor = ratingColor;
    this.updateRatingDigits(this.ratingString, this.ratingColor);
    this.updateTooltipRatingDigits(this.ratingString, this.ratingColor);
    if (this.tooltipRankText) {
      this.tooltipRankText.setText(rankVal != null ? `#${rankVal}` : "#-");
    }
    if (this.tooltipBodyName) this.tooltipBodyName.setText(name);
    if (this.tooltipBodyRating) this.tooltipBodyRating.setText(`Rating: ${ratingText}`);
    const avatarUrl = this.currentUser?.photoURL || this.userDoc?.profile?.photoURL || this.userDoc?.profile?.avatarUrl;
    this.updateAvatar(avatarUrl);
    if (bannerUrl) this.updateBanner(bannerUrl);
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
    [this.card, this.nameText, this.avatarCircle, this.avatarImage, this.tooltip, this.tooltipDim].forEach((obj) => {
      if (obj) obj.setVisible(show && (obj !== this.tooltip && obj !== this.tooltipDim ? true : this.tooltipVisible) && (obj === this.avatarCircle || obj === this.avatarImage ? this.currentUser : true));
    });
    // Hide rating while tooltip is open so the grey backdrop sits above it
    // Keep rating visible on card even when tooltip is open
    this.setRatingVisible(show);
    if (this.card && this.card.input && this.card.input.enabled && this.input?.activePointer?.isDown) {
      // noop to keep pointer active
    }
  }

  updateAvatar(url) {
    const x = this.game.scale.width - this.cardMargin - 24;
    const y = this.cardMargin + this.cardHeight / 2;
    const size = this.avatarSize;
    const cachedKey = url ? this.avatarCache[url] : null;
    const setTooltipAvatar = (textureKey) => {
      if (this.tooltipAvatarImage) {
        this.tooltipAvatarImage.destroy();
        this.tooltipAvatarImage = null;
      }
      if (this.tooltipAvatarMask) {
        this.tooltipAvatarMask.destroy();
        this.tooltipAvatarMask = null;
      }
      if (textureKey && this.tooltip && this.currentUser) {
        this.tooltipAvatarImage = this.add
          .image(this.tooltipAvatarCircle.x, this.tooltipAvatarCircle.y, textureKey)
          .setDisplaySize(this.tooltipAvatarCircle.radius * 2, this.tooltipAvatarCircle.radius * 2)
          .setOrigin(0.5)
          .setDepth(this.tooltip.depth + 1)
          .setScrollFactor(0);
        this.tooltip.add(this.tooltipAvatarImage);
        // Circular mask for tooltip avatar
        const maskGfx = this.make.graphics({ x: 0, y: 0, add: false });
        maskGfx.fillStyle(0xffffff);
        maskGfx.fillCircle(this.tooltipAvatarCircle.x, this.tooltipAvatarCircle.y, this.tooltipAvatarCircle.radius);
        this.tooltipAvatarMask = maskGfx.createGeometryMask();
        this.tooltipAvatarImage.setMask(this.tooltipAvatarMask);
      }
      this.tooltipAvatarCircle?.setVisible(!textureKey && this.currentUser);
    };

    if (!url || !this.currentUser) {
      if (this.avatarImage) {
        this.avatarImage.destroy();
        this.avatarImage = null;
      }
      if (this.avatarMask) {
        this.avatarMask.destroy();
        this.avatarMask = null;
      }
      this.avatarCircle?.setVisible(this.currentUser ? true : false);
      setTooltipAvatar(null);
      return;
    }
    const useTexture = (key) => {
      if (this.avatarImage) this.avatarImage.destroy();
      this.avatarImage = this.add
        .image(x, y, key)
        .setDisplaySize(size, size)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(this.baseDepth + 1);
      // Circular mask for card avatar
      if (this.avatarMask) {
        this.avatarMask.destroy();
        this.avatarMask = null;
      }
      const maskGfx = this.make.graphics({ x: 0, y: 0, add: false });
      maskGfx.fillStyle(0xffffff);
      maskGfx.fillCircle(x, y, size / 2);
      this.avatarMask = maskGfx.createGeometryMask();
      this.avatarImage.setMask(this.avatarMask);
      this.avatarCircle?.setVisible(false);
      setTooltipAvatar(key);
    };
    if (cachedKey && this.textures.exists(cachedKey)) {
      useTexture(cachedKey);
      return;
    }
    const key = `avatar_${Date.now()}`;
    this.load.image(key, url);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.avatarCache[url] = key;
      useTexture(key);
    });
    this.load.start();
  }

  buildTooltip(depth, cardWidth) {
    const cam = this.cameras.main;
    const dim = this.add
      .rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.65)
      .setScrollFactor(0)
      .setDepth(depth - 0.5) // above card/avatar, below modal
      .setVisible(false)
      .setInteractive();

    const modalW = cam.width * 0.75;
    const modalH = cam.height * 0.75;
    const container = this.add.container(cam.width / 2, cam.height / 2).setDepth(depth).setVisible(false).setScrollFactor(0);
    const bg = this.add.rectangle(0, 0, modalW, modalH, 0x111111, 0.95).setOrigin(0.5).setStrokeStyle(1, 0x555555);
    const title = this.add.text(-modalW / 2 + 16, -modalH / 2 + 16, "Profile", {
      fontFamily: "Hatsukoi Friends, monospace",
      fontSize: "18px",
      color: "#ffffff",
      antialias: true,
      smooth: false,
    }).setOrigin(0, 0);
    // Banner background (under text but above modal bg)
    this.tooltipBannerRect = this.add
      .rectangle(0, -modalH / 2 + this.bannerHeight / 2 + 8, modalW - 16, this.bannerHeight, 0x222222, 0.6)
      .setOrigin(0.5)
      .setDepth(depth + 0.05); // Very low depth, just above background
    this.tooltipBannerImage = null;
    this.tooltipBannerOverlay = null;

    // Position avatar, name, rating, and rank above the banner area
    const aboveBannerY = -modalH / 2 + 8; // Move up higher (was 16)
    const avatarR = 26;
    this.tooltipAvatarCircle = this.add
      .circle(-modalW / 2 + 16 + avatarR, aboveBannerY + avatarR, avatarR, 0x777777, 1)
      .setStrokeStyle(1, 0xaaaaaa)
      .setDepth(depth + 0.8); // High depth for text elements
    const closeBtn = this.add
      .text(modalW / 2 - 12, -modalH / 2 + 12, "[X]", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "14px",
        color: "#ff9999",
        antialias: true,
        smooth: false,
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => this.hideTooltip());
    // Rank text positioned at top right, above banner
    this.tooltipRankText = this.add
      .text(modalW / 2 - 16, aboveBannerY, "#-", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "40px",
        color: "#ffffff",
        antialias: true,
        smooth: false,
      })
      .setOrigin(1, 0)
      .setDepth(depth + 0.8); // High depth for text elements
      
    // Name and rating positioned above banner, next to avatar
    this.tooltipBodyName = this.add.text(-modalW / 2 + 16 + avatarR * 2 + 10, aboveBannerY, "Guest", {
      fontFamily: "Hatsukoi Friends, monospace",
      fontSize: "20px", // Increased from 16px
      color: "#ffffff",
      antialias: true,
      smooth: false,
    }).setOrigin(0, 0)
    .setDepth(depth + 0.8); // High depth for text elements
    
    this.tooltipBodyRating = this.add
      .text(-modalW / 2 + 16 + avatarR * 2 + 10, aboveBannerY + 28, "Rating: —", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "14px",
        color: "#bbbbbb",
        antialias: true,
        smooth: false,
      })
      .setOrigin(0, 0)
      .setDepth(depth + 0.8); // High depth for text elements
      
    // Update rating position for digit display
    this.tooltipRatingPos = {
      x: -modalW / 2 + 16 + avatarR * 2 + 10,
      y: aboveBannerY + 28,
    };
    const buttonRowY = -modalH / 2 + 12;
    const buttonYOffset = 10;
    const makeHeaderButton = (label, x, color, handler, customY) => {
      const paddingX = 8;
      const paddingY = 8;
      const txt = this.add
        .text(0, 0, label, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "16px",
          color,
          antialias: true,
          smooth: false,
        })
        .setOrigin(0.5);
      const bg = this.add
        .rectangle(0, 0, txt.width + paddingX * 2, txt.height + paddingY * 2, 0x111111, 0.9)
        .setStrokeStyle(1, 0x666666)
        .setOrigin(0.5);
      const container = this.add
        .container(x, (customY ?? (buttonRowY + txt.height / 2 + buttonYOffset)) + (customY ? buttonYOffset : 0), [bg, txt])
        .setDepth(this.baseDepth + 2)
        .setScrollFactor(0)
        .setSize(bg.width, bg.height)
        .setInteractive(new Phaser.Geom.Rectangle(-bg.width / 2, -bg.height / 2, bg.width, bg.height), Phaser.Geom.Rectangle.Contains)
        .on("pointerup", handler)
        .on("pointerover", () => bg.setStrokeStyle(1, 0xffffff))
        .on("pointerout", () => bg.setStrokeStyle(1, 0x666666));
      if (container.input) container.input.cursor = "pointer";
      return { container, bg, txt };
    };

    const buttons = [];
    // Position buttons below the banner area
    const buttonY = -modalH / 2 + this.bannerHeight + 20;
    const avatarBtn = makeHeaderButton("Avatar", modalW / 2 - 280, "#7cc7ff", () => this.handleAvatarChange(), buttonY);
    const nameBtn = makeHeaderButton("Name", modalW / 2 - 170, "#c3ff7c", () => this.showNameChangeModal(), buttonY);
    const bannerBtn = makeHeaderButton("Banner", modalW / 2 - 110, "#ffcc7c", () => this.handleBannerChange(), buttonY);
    const signOutBtn = makeHeaderButton("Sign Out", modalW / 2 - 16 - 70, "#ff9999", () => this.handleSignOut(), modalH / 2 - 26);
    const gap = 10;
    const positionHeaderButtons = () => {
      const bannerX = modalW / 2 - 110;
      const { width: bannerW } = bannerBtn.bg;
      const { width: signW } = signOutBtn.bg;
      const { width: nameW } = nameBtn.bg;
      const { width: avatarW } = avatarBtn.bg;
      bannerBtn.container.setX(bannerX);
      signOutBtn.container.setX(bannerX + bannerW / 2 + gap + signW / 2 - 45);
      nameBtn.container.setX(bannerX - (bannerW / 2 + gap + nameW / 2));
      avatarBtn.container.setX(nameBtn.container.x - (nameW / 2 + gap + avatarW / 2));
      signOutBtn.container.setY(signOutBtn.container.y - 5);
    };
    positionHeaderButtons();
    this.tooltipAvatarButton = avatarBtn.container;
    this.tooltipNameButton = nameBtn.container;
    this.tooltipBannerButton = bannerBtn.container;
    this.tooltipSignOutButton = signOutBtn.container;
    buttons.push(avatarBtn.container, nameBtn.container, bannerBtn.container, signOutBtn.container);

    const makeTabButton = (label, x, handler) => {
      const paddingX = 10;
      const paddingY = 6;
      const txt = this.add
        .text(0, 0, label, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "14px",
          color: "#ffffff",
          antialias: true,
          smooth: false,
        })
        .setOrigin(0.5);
      const bg = this.add
        .rectangle(0, 0, txt.width + paddingX * 2, txt.height + paddingY * 2, 0x111111, 0.9)
        .setStrokeStyle(1, 0x666666)
        .setOrigin(0.5);
      const container = this.add
        .container(x, 0, [bg, txt])
        .setDepth(this.baseDepth + 2)
        .setScrollFactor(0)
        .setSize(bg.width, bg.height)
        .setInteractive(new Phaser.Geom.Rectangle(-bg.width / 2, -bg.height / 2, bg.width, bg.height), Phaser.Geom.Rectangle.Contains)
        .on("pointerup", handler)
        .on("pointerover", () => bg.setStrokeStyle(1, 0xffffff))
        .on("pointerout", () => bg.setStrokeStyle(1, 0x666666));
      if (container.input) container.input.cursor = "pointer";
      return { container, bg, txt };
    };

    const tabY = -modalH / 2 + this.bannerHeight + 62;
    const tabDefs = [
      { id: "best", label: "Best Scores" },
      { id: "illustrations", label: "Illustrations" },
      { id: "achievements", label: "Achievements" },
    ];

    // Clear any existing tab UI (safety if buildTooltip is called again)
    if (this.profileTabButtonItems?.length) {
      this.profileTabButtonItems.forEach((t) => t?.destroy?.());
    }
    this.profileTabButtons = {};
    this.profileTabButtonItems = [];

    // Create tab buttons and then pack them so they never go out-of-bounds.
    let currentX = -modalW / 2 + 16;
    const tabButtonMetas = [];
    tabDefs.forEach((t) => {
      const btn = makeTabButton(t.label, 0, () => this.setProfileTab(t.id));
      btn.container.setY(tabY);
      tabButtonMetas.push({ id: t.id, btn });
      this.profileTabButtons[t.id] = btn;
      this.profileTabButtonItems.push(btn.container);
      currentX += btn.bg.width + 10;
    });

    const totalWidth = tabButtonMetas.reduce((acc, m) => acc + m.btn.bg.width, 0) + (tabButtonMetas.length - 1) * 10;
    const availableWidth = modalW - 32;
    const scale = totalWidth > availableWidth && totalWidth > 0 ? availableWidth / totalWidth : 1;
    const startX = -modalW / 2 + 16;
    let xPos = startX;
    tabButtonMetas.forEach((m) => {
      m.btn.container.setScale(scale);
      // Set positions using unscaled widths; scale applied to container.
      m.btn.container.setX(xPos + (m.btn.bg.width * scale) / 2);
      xPos += m.btn.bg.width * scale + 10;
    });

    // Content viewport and root
    const viewportX = -modalW / 2 + 16;
    const viewportY = tabY + 28;
    const viewportW = modalW - 32;
    const viewportH = modalH - (this.bannerHeight + 110);
    this.profileTabContentViewport = { x: viewportX, y: viewportY, w: viewportW, h: viewportH };

    // Best-scores sub-tabs (mode type)
    this.bestScoresTabRowY = viewportY;
    if (this.bestScoresTabButtonItems?.length) {
      this.bestScoresTabButtonItems.forEach((t) => t?.destroy?.());
    }
    this.bestScoresTabButtons = {};
    this.bestScoresTabButtonItems = [];
    const bestTabDefs = [
      { id: "Easy", label: "Easy" },
      { id: "Standard", label: "Standard" },
      { id: "Master", label: "Master" },
      { id: "20G", label: "20G" },
      { id: "Race", label: "Race" },
      { id: "All Clear", label: "All Clear" },
      { id: "Puzzle", label: "Puzzle" },
      { id: "Extra", label: "Extra" },
    ];

    const bestButtonMetas = [];
    bestTabDefs.forEach((t) => {
      const btn = makeTabButton(t.label, 0, () => this.setBestScoresTab(t.id));
      btn.container.setY(this.bestScoresTabRowY);
      bestButtonMetas.push({ id: t.id, btn });
      this.bestScoresTabButtons[t.id] = btn;
      this.bestScoresTabButtonItems.push(btn.container);
    });

    const bestTotalWidth =
      bestButtonMetas.reduce((acc, m) => acc + (m.btn.bg?.width || 0), 0) +
      Math.max(0, bestButtonMetas.length - 1) * 8;
    const bestAvailable = modalW - 32;
    const bestScale = bestTotalWidth > bestAvailable && bestTotalWidth > 0 ? bestAvailable / bestTotalWidth : 1;
    let bx = -modalW / 2 + 16;
    bestButtonMetas.forEach((m) => {
      m.btn.container.setScale(bestScale);
      m.btn.container.setX(bx + ((m.btn.bg.width || 0) * bestScale) / 2);
      bx += (m.btn.bg.width || 0) * bestScale + 8;
    });

    // Dedicated overlay container for tab content + mask.
    // Keeping it out of the tooltip container avoids Phaser container/mask coordinate issues.
    if (this.profileTabContentContainer) {
      this.profileTabContentContainer.destroy(true);
      this.profileTabContentContainer = null;
    }
    this.profileTabContentContainer = this.add
      .container(cam.width / 2, cam.height / 2)
      .setDepth(this.baseDepth + 1205)
      .setVisible(false)
      .setScrollFactor(0);

    this.profileTabContentRoot = this.add.container(0, 0).setScrollFactor(0);

    // IMPORTANT: GeometryMask + Container transforms are easy to get wrong.
    // Build the mask in world space so it clips the overlay content reliably.
    if (this.profileTabContentMaskGfx) {
      this.profileTabContentMaskGfx.destroy();
      this.profileTabContentMaskGfx = null;
    }
    this.profileTabContentMaskGfx = this.make.graphics({ x: 0, y: 0, add: false });
    this.profileTabContentMaskGfx.clear();
    this.profileTabContentMaskGfx.fillStyle(0xffffff);
    this.profileTabContentMaskGfx.fillRect(cam.width / 2 + viewportX, cam.height / 2 + viewportY, viewportW, viewportH);
    this.profileTabContentMask = this.profileTabContentMaskGfx.createGeometryMask();
    this.profileTabContentRoot.setMask(this.profileTabContentMask);
    this.profileTabContentContainer.add([this.profileTabContentRoot]);

    // Ensure the initial tab is rendered
    this.setProfileTab(this.profileTab || "best");

    
    // Best score cards container (above tooltip background)
    this.bestRowsContainer = this.add
      .container(cam.width / 2, cam.height / 2)
      .setDepth(this.baseDepth + 1200)
      .setVisible(false)
      .setScrollFactor(0);

    const containerItems = [
      bg,
      this.tooltipBannerRect,
      title,
      this.tooltipAvatarCircle,
      closeBtn,
      this.tooltipBodyName,
      this.tooltipBodyRating,
      ...buttons,
      ...this.profileTabButtonItems,
      ...this.bestScoresTabButtonItems,
      this.tooltipRankText,
    ];
    
    // Add banner image and overlay if they exist
    if (this.tooltipBannerImage) containerItems.push(this.tooltipBannerImage);
    if (this.tooltipBannerOverlay) containerItems.push(this.tooltipBannerOverlay);
    
    container.add(containerItems);
    this.tooltipBg = bg;
    this.tooltipDim = dim;
    this.tooltip = container;
  }

  layoutTooltip(width, height) {
    if (!this.tooltip || !this.tooltipDim) return;
    const modalW = width * 0.75;
    const modalH = height * 0.75;
    const centerX = width / 2;
    const centerY = height / 2;
    this.tooltipDim.setPosition(width / 2, height / 2).setSize(width, height);
    this.tooltip.setPosition(width / 2, height / 2);
    if (this.profileTabContentContainer) {
      this.profileTabContentContainer.setPosition(width / 2, height / 2);
    }
    const bg = this.tooltipBg;
    if (bg) {
      bg.setSize(modalW, modalH);
      bg.setPosition(0, 0);
    }
    const offsetX = -modalW / 2 + 16;
    const offsetY = -modalH / 2 + 16;
    if (this.tooltipBannerRect) {
      this.tooltipBannerRect
        .setSize(modalW - 16, this.bannerHeight)
        .setPosition(0, -modalH / 2 + this.bannerHeight / 2 + 8);
    }
    if (this.tooltipBannerImage) {
      const y = -modalH / 2 + this.bannerHeight / 2 + 8;
      this.tooltipBannerImage.setPosition(0, y);
      // Don't use setDisplaySize here as it's handled in updateBanner with proper aspect ratio
    }
    if (this.tooltipBannerOverlay) {
      const w = modalW - 16;
      const h = this.bannerHeight;
      const y = -modalH / 2 + h / 2 + 8;
      this.tooltipBannerOverlay.setSize(w, h).setPosition(0, y);
    }
    
    // Update avatar, name, rating, and rank positioning (above banner)
    const aboveBannerY = -modalH / 2 + 8; // Match the new position
    const avatarR = this.tooltipAvatarCircle?.radius || 26;
    if (this.tooltipAvatarCircle) {
      this.tooltipAvatarCircle.setPosition(-modalW / 2 + 16 + avatarR, aboveBannerY + avatarR);
    }
    if (this.tooltipAvatarImage) {
      this.tooltipAvatarImage.setPosition(-modalW / 2 + 16 + avatarR, aboveBannerY + avatarR);
    }
    this.tooltipBodyName?.setPosition(-modalW / 2 + 16 + avatarR * 2 + 10, aboveBannerY);
    if (this.tooltipBodyRating) this.tooltipBodyRating?.setPosition(-modalW / 2 + 16 + avatarR * 2 + 10, aboveBannerY + 28);
    if (this.tooltipRankText) {
      this.tooltipRankText.setPosition(modalW / 2 - 16, aboveBannerY);
    }
    const ratingBaseX = -modalW / 2 + 16 + avatarR * 2 + 10; // align left with name
    this.tooltipRatingPos = {
      x: centerX + ratingBaseX,
      y: centerY + aboveBannerY + 28,
    };
    this.tooltipRatingLocalPos = {
      x: ratingBaseX,
      y: aboveBannerY + 28,
    };
    // Re-render tooltip rating digits at new position
    this.updateTooltipRatingDigits(this.ratingString, this.ratingColor);

    // Re-layout tabs + content viewport/mask
    if (this.profileTabButtonItems?.length) {
      const tabY = -modalH / 2 + this.bannerHeight + 62;
      const availableWidth = modalW - 32;
      // Buttons are scaled by buildTooltip; recompute packing on resize.
      const metas = Object.keys(this.profileTabButtons || {})
        .map((id) => ({ id, btn: this.profileTabButtons[id] }))
        .filter((m) => m.btn && m.btn.bg && m.btn.container);

      const totalWidth =
        metas.reduce((acc, m) => acc + (m.btn.bg?.width || 0), 0) +
        Math.max(0, metas.length - 1) * 10;
      const scale = totalWidth > availableWidth && totalWidth > 0 ? availableWidth / totalWidth : 1;
      const startX = -modalW / 2 + 16;
      let xPos = startX;
      metas.forEach((m) => {
        m.btn.container.setScale(scale);
        m.btn.container.setY(tabY);
        m.btn.container.setX(xPos + ((m.btn.bg.width || 0) * scale) / 2);
        xPos += (m.btn.bg.width || 0) * scale + 10;
      });

      const viewportX = -modalW / 2 + 16;
      const viewportY = tabY + 28;
      const viewportW = modalW - 32;
      const viewportH = modalH - (this.bannerHeight + 110);
      this.profileTabContentViewport = { x: viewportX, y: viewportY, w: viewportW, h: viewportH };

      // Re-layout best-scores sub-tabs (mode type)
      if (this.bestScoresTabButtonItems?.length) {
        this.bestScoresTabRowY = viewportY;
        const bestMetas = Object.keys(this.bestScoresTabButtons || {})
          .map((id) => ({ id, btn: this.bestScoresTabButtons[id] }))
          .filter((m) => m.btn && m.btn.bg && m.btn.container);
        const bestTotalWidth =
          bestMetas.reduce((acc, m) => acc + (m.btn.bg?.width || 0), 0) +
          Math.max(0, bestMetas.length - 1) * 8;
        const bestAvailable = modalW - 32;
        const bestScale = bestTotalWidth > bestAvailable && bestTotalWidth > 0 ? bestAvailable / bestTotalWidth : 1;
        let bx = -modalW / 2 + 16;
        bestMetas.forEach((m) => {
          m.btn.container.setScale(bestScale);
          m.btn.container.setY(this.bestScoresTabRowY);
          m.btn.container.setX(bx + ((m.btn.bg.width || 0) * bestScale) / 2);
          bx += (m.btn.bg.width || 0) * bestScale + 8;
        });
      }

      if (this.profileTabContentMaskGfx) {
        this.profileTabContentMaskGfx.clear();
        this.profileTabContentMaskGfx.fillStyle(0xffffff);
        this.profileTabContentMaskGfx.fillRect(width / 2 + viewportX, height / 2 + viewportY, viewportW, viewportH);
        if (this.profileTabContentMask) {
          // Geometry mask reads from the graphics, so updating it is enough.
          this.profileTabContentRoot?.setMask(this.profileTabContentMask);
        }
      }

      if (this.tooltipVisible) {
        this.renderProfileTabContent();
      }
    }
    if (this.bestRowsContainer) {
      this.bestRowsContainer.setPosition(width / 2, height / 2);
      this.bestRowsLayout = {
        startX: -modalW / 2 + 16,
        startY: -modalH / 2 + this.bannerHeight + 80, // Position below banner and buttons
        cardW: 200,
        cardH: 72,
        gapX: 14,
        rowGap: 90,
      };
    }
  }

  toggleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
    if (this.tooltip) this.tooltip.setVisible(this.tooltipVisible);
    if (this.tooltipDim) this.tooltipDim.setVisible(this.tooltipVisible);
    if (this.bestRowsContainer) this.bestRowsContainer.setVisible(false);
    if (this.profileTabContentContainer) this.profileTabContentContainer.setVisible(this.tooltipVisible);
    this.tooltipBodyGroups?.forEach((t) => t.setVisible(this.tooltipVisible));
    this.setTooltipRatingVisible(this.tooltipVisible);
    if (this.tooltipVisible) {
      this.layoutTooltip(this.scale.width, this.scale.height);
      this.updateTooltipRatingDigits(this.ratingString, this.ratingColor);
      this.renderProfileTabContent();
    }
  }

  hideTooltip() {
    this.tooltipVisible = false;
    if (this.tooltip) this.tooltip.setVisible(false);
    if (this.tooltipDim) this.tooltipDim.setVisible(false);
    if (this.bestRowsContainer) this.bestRowsContainer.setVisible(false);
    if (this.profileTabContentContainer) this.profileTabContentContainer.setVisible(false);
    this.tooltipBodyGroups?.forEach((t) => t.setVisible(false));
    this.setTooltipRatingVisible(false);
  }

  setProfileTab(tabId) {
    const next = tabId || "best";
    this.profileTab = next;
    Object.keys(this.profileTabButtons || {}).forEach((k) => {
      const btn = this.profileTabButtons[k];
      if (!btn || !btn.bg || !btn.txt) return;
      const active = k === next;
      btn.bg.setFillStyle(active ? 0x222222 : 0x111111, 0.9);
      btn.bg.setStrokeStyle(1, active ? 0xffffff : 0x666666);
      btn.txt.setColor(active ? "#ffff00" : "#ffffff");
    });
    this.profileTabScrollY = 0;
    if (this.bestScoresTabButtonItems?.length) {
      this.bestScoresTabButtonItems.forEach((b) => b?.setVisible?.(next === "best"));
    }
    if (this.tooltipVisible) {
      this.renderProfileTabContent();
    }
  }

  setBestScoresTab(tabId) {
    const next = tabId || "Easy";
    this.bestScoresTab = next;
    this.updateBestScoresTabButtonStyles();
    this.profileTabScrollY = 0;
    if (this.tooltipVisible && this.profileTab === "best") {
      this.renderProfileTabContent();
    }
  }

  updateBestScoresTabButtonStyles() {
    const activeTab = this.bestScoresTab || "Easy";
    Object.keys(this.bestScoresTabButtons || {}).forEach((k) => {
      const btn = this.bestScoresTabButtons[k];
      if (!btn || !btn.bg || !btn.txt) return;
      const active = k === activeTab;
      btn.bg.setFillStyle(active ? 0x222222 : 0x111111, 0.9);
      btn.bg.setStrokeStyle(1, active ? 0xffffff : 0x666666);
      btn.txt.setColor(active ? "#ffff00" : "#ffffff");
    });
  }

  installProfileScrollHandlers() {
    if (this.__profileScrollHandlersInstalled) return;
    this.__profileScrollHandlersInstalled = true;
    this.input.on("wheel", (_pointer, _go, _dx, dy) => {
      if (!this.tooltipVisible) return;
      if (!this.profileTabContentRoot || !this.profileTabContentViewport) return;
      if (this.profileTab !== "best") return;
      const maxScroll = Math.max(0, (this.profileTabContentHeight || 0) - (this.profileTabContentViewport.h || 0));
      if (maxScroll <= 0) return;
      const step = Math.sign(dy) * 26;
      this.profileTabScrollY = Math.max(0, Math.min(maxScroll, (this.profileTabScrollY || 0) + step));
      this.profileTabContentRoot.setY(-(this.profileTabScrollY || 0));
    });
  }

  renderProfileTabContent() {
    if (!this.profileTabContentRoot) return;
    this.installProfileScrollHandlers();

    // Debug escape hatch: in DevTools console run `window.__debugProfileNoMask = true`
    // to verify whether content is being clipped by the mask.
    if (typeof window !== "undefined" && window.__debugProfileNoMask) {
      this.profileTabContentRoot.setMask(null);
    } else if (this.profileTabContentMask) {
      this.profileTabContentRoot.setMask(this.profileTabContentMask);
    }

    // Clear previous tab content
    this.profileTabContentRoot.removeAll(true);
    this.profileTabContentHeight = 0;
    this.profileTabContentRoot.setPosition(0, 0);

    const { x, y, w } = this.profileTabContentViewport || { x: 0, y: 0, w: 0, h: 0 };
    // Leave space for best-scores mode tabs.
    let cursorY = this.profileTab === "best" ? y + 30 : y;

    const addHeading = (text, color) => {
      const heading = this.add
        .text(x, cursorY, text, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "13px",
          color: color || "#ffffff",
        })
        .setOrigin(0, 0)
        .setScrollFactor(0);
      this.profileTabContentRoot.add(heading);
      cursorY += 20;
    };

    const addRow = (leftText, rightText, colorLeft, colorRight) => {
      const left = this.add
        .text(x, cursorY, leftText, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "12px",
          color: colorLeft || "#cfcfcf",
        })
        .setOrigin(0, 0)
        .setScrollFactor(0);
      const right = this.add
        .text(x + w, cursorY, rightText, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "12px",
          color: colorRight || "#aaaaaa",
        })
        .setOrigin(1, 0)
        .setScrollFactor(0);
      this.profileTabContentRoot.add([left, right]);
      cursorY += 18;
    };

    if (this.profileTab === "best") {
      if (this.bestScoresTabButtonItems?.length) {
        this.bestScoresTabButtonItems.forEach((b) => b?.setVisible?.(true));
      }
      // Do NOT call setBestScoresTab() here (it triggers a render); just ensure styles are correct.
      this.bestScoresTab = this.bestScoresTab || "Easy";
      this.updateBestScoresTabButtonStyles();
      const best =
        this.userDoc?.scores ||
        this.userDoc?.bestScores ||
        this.userDoc?.modes ||
        this.fallbackCache?.scores ||
        {};

      const targets = window.RatingEngine?.MODE_TARGETS || {};
      const bestKeys = Object.keys(best || {});
      const targetKeys = Object.keys(targets || {});
      const allKeys = new Set([...targetKeys, ...bestKeys]);
      console.info("[Profile] Render Best Scores", {
        bestScoresTab: this.bestScoresTab,
        bestKeys: bestKeys.length,
        targetKeys: targetKeys.length,
        allKeys: allKeys.size,
      });

      const isExtraMode = (modeId) => {
        const id = String(modeId || "");
        return /_\d_1$/i.test(id) || /_x\.1$/i.test(id) || /_1_1$/i.test(id) || /_2_1$/i.test(id) || /_3_1$/i.test(id);
      };

      const getType = (modeId) => {
        const id = String(modeId || "").toLowerCase();
        // Hard overrides (these should win even if ModeManager difficulty disagrees)
        if (id.includes("konoha")) return "All Clear";
        if (id.includes("flashpoint")) return "Puzzle";

        // Prefer authoritative difficulty mapping from ModeManager (available globally via ModeManager.js)
        try {
          if (typeof getModeManager !== "undefined") {
            const mm = getModeManager();
            const diff = mm?.modeDefinitions?.[id]?.config?.difficulty;
            if (typeof diff === "string" && diff.trim()) {
              const key = diff.trim().toLowerCase();
              if (key === "easy") return "Easy";
              if (key === "standard") return "Standard";
              if (key === "master") return "Master";
              if (key === "20g") return "20G";
              if (key === "race") return "Race";
              if (key === "all clear") return "All Clear";
              if (key === "puzzle") return "Puzzle";
              return diff;
            }
          }
        } catch (_e) {
          // ignore
        }

        // Fallback heuristic for known ids
        if (id.includes("sakura")) return "Puzzle";
        if (id.includes("asuka")) return "Race";
        if (id.includes("shirase") || id.includes("death") || id === "20g" || id.includes("20g")) return "20G";
        if (id.includes("easy")) return "Easy";
        if (id.includes("marathon") || id.includes("sprint") || id.includes("ultra") || id.includes("zen")) return "Standard";
        if (id.includes("tgm")) return "Master";
        return "";
      };

      const typeOrder = ["Easy", "Standard", "Master", "20G", "Race", "All Clear", "Puzzle", "Extra"];
      const grouped = {};
      allKeys.forEach((k) => {
        const typeName = isExtraMode(k) ? "Extra" : (getType(k) || "Other");
        if (!grouped[typeName]) grouped[typeName] = [];
        grouped[typeName].push(k);
      });

      const byName = (a, b) => this.formatModeName(a).localeCompare(this.formatModeName(b));
      const orderForType = {
        Standard: ["sprint_40", "sprint_100", "ultra", "marathon", "zen"],
        Master: ["tgm1", "tgm2", "tgm_plus", "tgm3", "tgm4"],
        "20G": ["20g", "ta_death", "tgm3_shirase", "tgm4_rounds"],
        Race: ["asuka_easy", "asuka", "asuka_hard"],
      };
      const compareWithOrder = (typeName) => (a, b) => {
        const order = orderForType[typeName] || null;
        const normalizeForOrder = (id) => {
          const s = String(id || "").toLowerCase();
          if (s === "tgm2_master") return "tgm2";
          return s;
        };
        const isXPointOneMode = (modeId) => {
          const id = String(modeId || "");
          return /_x\.1$/i.test(id) || /_\d_1$/i.test(id) || /_\d\.1$/i.test(id);
        };

        if (typeName === "Extra") {
          const ax = isXPointOneMode(a);
          const bx = isXPointOneMode(b);
          if (ax !== bx) return ax ? 1 : -1; // append x.1 modes at the end
          return byName(a, b);
        }
        if (order) {
          const ia = order.indexOf(normalizeForOrder(a));
          const ib = order.indexOf(normalizeForOrder(b));
          if (ia !== -1 || ib !== -1) {
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
          }
        }
        return byName(a, b);
      };
      Object.keys(grouped).forEach((t) => grouped[t].sort(compareWithOrder(t)));

      const typeColor = {
        Easy: "#00ff00",
        Standard: "#0088ff",
        Master: "#888888",
        "20G": "#ff0000",
        Race: "#ff8800",
        "All Clear": "#ff69b4",
        Puzzle: "#8800ff",
        Extra: "#ffff00",
        Other: "#ffffff",
      };

      const selected = this.bestScoresTab || "Easy";
      const keys = grouped[selected] || [];
      if (!keys.length) {
        addRow("No scores in this category yet.", "", "#aaaaaa", "#aaaaaa");
      } else {
        addHeading(selected.toUpperCase(), typeColor[selected] || "#ffffff");

        const cardW = 320;
        const cardH = 120;
        const gapX = 14;
        const gapY = 14;
        const cols = Math.max(1, Math.floor((w + gapX) / (cardW + gapX)));
        const startY = cursorY;

        const isXPointOneMode = (modeId) => {
          const id = String(modeId || "");
          return /_x\.1$/i.test(id) || /_\d_1$/i.test(id) || /_\d\.1$/i.test(id);
        };

        keys.forEach((modeId, idx) => {
          const entry = best?.[modeId];
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const cx = x + col * (cardW + gapX);
          const cy = startY + row * (cardH + gapY);

          const modeColor =
            selected === "Extra" && isXPointOneMode(modeId)
              ? "#8b0000"
              : typeColor[selected] || "#ffffff";

          const card = this.add.container(cx, cy).setScrollFactor(0);
          const bg = this.add
            .rectangle(0, 0, cardW, cardH, 0x222222, 0.9)
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0x555555)
            .setScrollFactor(0);

          const title = this.add
            .text(12, 10, this.formatModeName(modeId), {
              fontFamily: "Hatsukoi Friends, monospace",
              fontSize: "14px",
              color: modeColor,
            })
            .setOrigin(0, 0)
            .setScrollFactor(0);

          const main = this.formatScore(entry, modeId);
          const rank = entry?.rank ?? entry?.position ?? "—";
          const rankText = this.add
            .text(cardW - 12, 10, `#${rank}`, {
              fontFamily: "Hatsukoi Friends, monospace",
              fontSize: "13px",
              color: "#aaaaaa",
            })
            .setOrigin(1, 0)
            .setScrollFactor(0);

          const big = this.add
            .text(cardW / 2, cardH / 2 - 6, main, {
              fontFamily: "Hatsukoi Friends, monospace",
              fontSize: "22px",
              color: "#ffffff",
              align: "center",
            })
            .setOrigin(0.5)
            .setScrollFactor(0);

          // Bottom metrics: PPS | Score | Time (only show if present)
          const parts = [];
          const pps = entry?.pps ?? entry?.piecesPerSecond;
          if (pps != null && Number.isFinite(Number(pps))) {
            parts.push(`PPS: ${Number(pps).toFixed(2)}`);
          }
          if (entry?.score != null) {
            parts.push(`Score: ${entry.score}`);
          }
          if (entry?.timeSeconds != null) {
            parts.push(`Time: ${this.formatTime(entry.timeSeconds)}`);
          }
          const metricsText = parts.length ? parts.join(" | ") : "";
          const metrics = this.add
            .text(cardW / 2, cardH - 18, metricsText, {
              fontFamily: "Hatsukoi Friends, monospace",
              fontSize: "12px",
              color: "#aaaaaa",
              align: "center",
            })
            .setOrigin(0.5)
            .setScrollFactor(0);

          // Keep text from overflowing card bounds.
          title.setCrop(0, 0, cardW - 90, 22);
          metrics.setWordWrapWidth(cardW - 24, true);
          metrics.setCrop(0, 0, cardW - 24, 16);
          big.setCrop(0, 0, cardW - 24, 28);

          card.add([bg, title, rankText, big, metrics]);
          this.profileTabContentRoot.add(card);
        });

        const rowsUsed = Math.ceil(keys.length / cols);
        cursorY = startY + rowsUsed * (cardH + gapY) + 6;
      }
    } else if (this.profileTab === "illustrations") {
      if (this.bestScoresTabButtonItems?.length) {
        this.bestScoresTabButtonItems.forEach((b) => b?.setVisible?.(false));
      }
      addHeading("UNLOCKED CHARACTER ILLUSTRATIONS", "#c3ff7c");
      const slotSize = 92;
      const cols = Math.max(1, Math.floor((w + 10) / (slotSize + 10)));
      const totalSlots = 12;
      for (let i = 0; i < totalSlots; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const sx = x + col * (slotSize + 10);
        const sy = cursorY + row * (slotSize + 10);
        const rect = this.add
          .rectangle(sx, sy, slotSize, slotSize, 0x222222, 0.9)
          .setOrigin(0, 0)
          .setStrokeStyle(1, 0x555555)
          .setScrollFactor(0);
        const label = this.add
          .text(sx + slotSize / 2, sy + slotSize / 2 - 8, "[Placeholder]", {
            fontFamily: "Hatsukoi Friends, monospace",
            fontSize: "12px",
            color: "#aaaaaa",
            align: "center",
          })
          .setOrigin(0.5)
          .setScrollFactor(0);
        const label2 = this.add
          .text(sx + slotSize / 2, sy + slotSize / 2 + 12, `Slot ${i + 1}`, {
            fontFamily: "Hatsukoi Friends, monospace",
            fontSize: "12px",
            color: "#666666",
          })
          .setOrigin(0.5)
          .setScrollFactor(0);
        this.profileTabContentRoot.add([rect, label, label2]);
      }
      const rowsUsed = Math.ceil(totalSlots / cols);
      cursorY += rowsUsed * (slotSize + 10) + 10;
      addRow("(Konoha unlock integration pending)", "", "#aaaaaa", "#aaaaaa");
    } else if (this.profileTab === "achievements") {
      if (this.bestScoresTabButtonItems?.length) {
        this.bestScoresTabButtonItems.forEach((b) => b?.setVisible?.(false));
      }
      addHeading("ACHIEVEMENTS", "#7cc7ff");
      const rect = this.add
        .rectangle(x, cursorY, w, 220, 0x222222, 0.9)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0x555555)
        .setScrollFactor(0);
      const text = this.add
        .text(x + w / 2, cursorY + 110, "[Achievements Panel Placeholder]", {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "14px",
          color: "#aaaaaa",
        })
        .setOrigin(0.5)
        .setScrollFactor(0);
      this.profileTabContentRoot.add([rect, text]);
      cursorY += 240;
    }

    this.profileTabContentHeight = Math.max(0, cursorY - (this.profileTabContentViewport?.y || 0));
    this.profileTabScrollY = 0;
    this.profileTabContentRoot.setY(0);
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
    // Disable outside click to close; only [X] closes now
    this.tooltipDim?.setInteractive();
  }

  showNameChangeModal() {
    if (!this.currentUser) {
      this.promptLogin();
      return;
    }
    this.destroyNameChangeModal();
    const cam = this.cameras.main;
    const w = 300;
    const h = 170;
    const overlay = this.add
      .rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.65)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1250)
      .setVisible(true)
      .setInteractive();
    const bg = this.add
      .rectangle(cam.width / 2, cam.height / 2, w, h, 0x111111, 0.95)
      .setStrokeStyle(1, 0x666666)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1251)
      .setVisible(true);
    const title = this.add
      .text(bg.x, bg.y - h / 2 + 12, "Change Name", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "14px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1252);
    const name = this.add.dom(bg.x, bg.y - 20, "input", "width:240px;height:24px;font-size:13px;", this.currentUser?.displayName || "");
    name.node.placeholder = "New display name (3-20)";
    name.node.maxLength = 20;
    name.node.tabIndex = 1;
    const password = this.add.dom(bg.x, bg.y + 10, "input", "width:240px;height:24px;font-size:13px;", "");
    password.node.type = "password";
    password.node.placeholder = "Password (for verification)";
    password.node.tabIndex = 2;
    const status = this.add
      .text(bg.x, bg.y + 55, "", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "12px",
        color: "#ffcccc",
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1252);
    const saveBtn = this.add
      .text(bg.x - 60, bg.y + 35, "[Save]", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "12px",
        color: "#c3ff7c",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1252)
      .setInteractive({ useHandCursor: true });
    const cancelBtn = this.add
      .text(bg.x + 60, bg.y + 35, "[Cancel]", {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "12px",
        color: "#ff9999",
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(this.baseDepth + 1252)
      .setInteractive({ useHandCursor: true });

    const hideModal = () => {
      this.destroyNameChangeModal();
    };

    saveBtn.on("pointerup", async () => {
      const newName = name.node.value.trim();
      const pwd = password.node.value;
      if (newName.length < 3 || newName.length > 20) {
        status.setText("Name must be 3-20 chars");
        return;
      }
      if (!pwd) {
        status.setText("Password required");
        return;
      }
      status.setText("Updating...");
      const result = await this.handleNameChange(newName, pwd, status);
      if (result) hideModal();
    });
    cancelBtn.on("pointerup", () => hideModal());
    overlay.on("pointerup", () => hideModal());

    this.nameChangeModal = { overlay, bg, title, name, password, status, saveBtn, cancelBtn };
  }

  destroyNameChangeModal() {
    if (!this.nameChangeModal) return;
    const { overlay, bg, title, status, saveBtn, cancelBtn, name, password } = this.nameChangeModal;
    [overlay, bg, title, status, saveBtn, cancelBtn].forEach((o) => o?.destroy?.());
    [name, password].forEach((dom) => dom?.destroy?.());
    this.nameChangeModal = null;
  }

  populateTooltipBestScores() {
    const groups = [
      { title: "Easy", keys: ["tgm2_normal", "tgm3_easy"] },
      { title: "Standard", keys: ["marathon", "ultra", "sprint_40", "sprint_100"] },
      { title: "Master", keys: ["tgm1", "tgm2_master", "tgm3", "tgm_plus", "tgm4"] },
      { title: "20G", keys: ["20g", "ta_death", "shirase", "tgm4_rounds"] },
      { title: "Race", keys: ["asuka_easy", "asuka", "asuka_hard"] },
    ];
    const best =
      this.userDoc?.scores ||
      this.userDoc?.bestScores ||
      this.userDoc?.modes ||
      this.fallbackCache?.scores ||
      {};
    const typeColor = {
      Easy: "#00ff00",
      Standard: "#0088ff",
      Master: "#888888",
      "20G": "#ff0000",
      Race: "#ff8800",
    };
    console.info("[Profile] Populating best plays", {
      source: this.userDoc?.bestScores ? "bestScores" : this.userDoc?.modes ? "modes" : "fallback",
      modes: Object.keys(best),
    });
    // Clear previous cards
    if (this.bestRowItems?.length) {
      this.bestRowItems.forEach((c) => c?.destroy?.());
    }
    this.bestRowItems = [];
    const { startX, startY, cardW, cardH, gapX, rowGap } = this.bestRowsLayout || {};
    groups.forEach((g, rowIdx) => {
      const rowY = (startY || 0) + rowIdx * (rowGap || 90);
      const label = this.add.text((startX || 0), rowY, g.title.toUpperCase(), {
        fontFamily: "Hatsukoi Friends, monospace",
        fontSize: "13px",
        color: typeColor[g.title] || "#ffffff",
      }).setOrigin(0, 0).setScrollFactor(0).setDepth(this.baseDepth + 1205);
      this.bestRowsContainer.add(label);
      this.bestRowItems.push(label);
      g.keys.forEach((k, idx) => {
        const entry = best[k];
        const x = (startX || 0) + 120 + idx * ((cardW || 200) + (gapX || 14));
        const card = this.add.container(x, rowY).setScrollFactor(0).setDepth(this.baseDepth + 1205);
        const bg = this.add
          .rectangle(0, 0, cardW || 200, cardH || 72, 0x222222, 0.9)
          .setOrigin(0, 0)
          .setStrokeStyle(1, 0x555555);
        const displayName = this.formatModeName(k);
        const line1 = this.add.text(8, 6, `[${displayName}]  Rank: ${entry?.rank ?? entry?.position ?? "—"}`, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "12px",
          color: typeColor[g.title] || "#ffffff",
        }).setOrigin(0, 0);
        const main = this.formatScore(entry, k);
        const line2 = this.add.text(8, 24, `Best: ${main}`, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "12px",
          color: "#cfcfcf",
        }).setOrigin(0, 0);
        const timeVal = entry?.timeSeconds != null ? this.formatTime(entry.timeSeconds) : "—";
        const scoreVal = entry?.score != null ? `${entry.score}` : "—";
        const line3 = this.add.text(8, 42, `Time: ${timeVal}    Score: ${scoreVal}`, {
          fontFamily: "Hatsukoi Friends, monospace",
          fontSize: "12px",
          color: "#aaaaaa",
        }).setOrigin(0, 0);
        card.add([bg, line1, line2, line3]);
        this.bestRowsContainer.add(card);
        this.bestRowItems.push(card);
      });
    });
  }

  formatModeName(modeId) {
    if (!modeId) return "—";
    const raw = String(modeId).toLowerCase();
    const special = {
      tgm: "TGM",
      "tgm1": "TGM",
      tgm2: "TGM2",
      "tgm2_master": "TGM2",
      "tgm2_normal": "TGM2 Normal",
      "tgm3": "TGM3",
      "tgm3_easy": "TGM3 Easy",
      "tgm_plus": "TGM+",
      "tgm4": "TGM4",
      "20g": "20G",
      ta_death: "T.A.Death",
      "tgm3_shirase": "Shirase",
      tgm4_rounds: "Rounds",
      sprint_40: "40L",
      sprint_100: "100L",
      asuka_easy: "Asuka Easy",
      asuka: "Asuka Normal",
      asuka_hard: "Asuka Hard",
      konoha_easy: "Konoha Easy",
      konoha_hard: "Konoha Hard",
      flashpoint: "Flashpoint",
    };
    if (special[raw]) return special[raw];
    return String(modeId)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  formatModeBlockShort(modeId, entry) {
    const rank = entry?.rank ?? entry?.position ?? "—";
    const main = this.formatScore(entry, modeId);
    const timeVal = entry?.timeSeconds != null ? this.formatTime(entry.timeSeconds) : "—";
    const scoreVal = entry?.score != null ? `${entry.score}` : "—";
    return `[${modeId}] Rank:${rank} | ${main} | T:${timeVal} S:${scoreVal}`;
  }

  formatModeBlock(modeId, entry) {
    const rank = entry?.rank ?? entry?.position ?? "—";
    const main = this.formatScore(entry, modeId);
    const timeVal = entry?.timeSeconds != null ? this.formatTime(entry.timeSeconds) : "—";
    const scoreVal = entry?.score != null ? `${entry.score}` : "—";
    const left = `[${modeId}]`.padEnd(12, " ");
    const mid = `Rank: ${rank}`.padEnd(12, " ");
    const mainLine = `${left}${mid}${main}`;
    const subLine = `Time: ${timeVal}    Score: ${scoreVal}`;
    return `${mainLine}\n${subLine}\n`;
  }

  formatTime(sec) {
    const s = Math.max(0, sec || 0);
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    const cs = Math.floor((s % 1) * 100)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}.${cs}`;
  }

  formatScore(entry, modeId) {
    if (!entry) return "—";
    const cfg = window.RatingEngine?.MODE_TARGETS?.[modeId];
    const type = cfg?.type;
    if (type === "time" && entry.timeSeconds != null) return this.formatTime(entry.timeSeconds);
    if ((type === "grade" || type === "grade_ext") && entry.grade != null) return `${entry.grade}`;
    if (type === "level" && (entry.level != null || entry.lines != null)) return `${entry.level ?? entry.lines}`;
    if (type === "hanabi" && entry.hanabi != null) return `${entry.hanabi}`;
    if (type === "score" && entry.score != null) return `${entry.score}`;
    // fallbacks
    if (entry.timeSeconds != null) return this.formatTime(entry.timeSeconds);
    if (entry.grade != null) return `${entry.grade}`;
    if (entry.level != null) return `${entry.level}`;
    if (entry.score != null) return `${entry.score}`;
    if (typeof entry === "number") return entry.toString();
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
      fontFamily: "Hatsukoi Friends, monospace",
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
      fontFamily: "Hatsukoi Friends, monospace",
      fontSize: "12px",
      color: "#ffcccc",
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(12001);

    const loginBtn = this.add.text(bg.x - 60, bg.y + 30, "[Login]", {
      fontFamily: "Hatsukoi Friends, monospace",
      fontSize: "12px",
      color: "#7cc7ff",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(12001).setInteractive({ useHandCursor: true });

    const registerBtn = this.add.text(bg.x + 60, bg.y + 30, "[Register]", {
      fontFamily: "Hatsukoi Friends, monospace",
      fontSize: "12px",
      color: "#c3ff7c",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(12001).setInteractive({ useHandCursor: true });

    const closeBtn = this.add.text(bg.x + w / 2 - 10, bg.y - h / 2 + 8, "X", {
      fontFamily: "Hatsukoi Friends, monospace",
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
