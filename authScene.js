class AuthScene extends Phaser.Scene {
  constructor() {
    super({ key: "AuthScene", active: false });
    this.form = null;
    this.pausedScenes = [];
    this.layoutRefs = null;
  }

  create() {
    const cam = this.cameras.main;
    const w = 360;
    const h = 320;
    const overlay = this.add.rectangle(cam.width / 2, cam.height / 2, cam.width, cam.height, 0x000000, 0.8)
      .setScrollFactor(0)
      .setDepth(15000)
      .setInteractive();
    const panel = this.add.rectangle(cam.width / 2, cam.height / 2, w, h, 0x111111, 0.95)
      .setStrokeStyle(1, 0x666666)
      .setScrollFactor(0)
      .setDepth(15001);

    const title = this.add.text(panel.x, panel.y - h / 2 + 10, "-- LOGIN --", {
      fontFamily: "Courier New, monospace",
      fontSize: "16px",
      color: "#ffffff",
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(15002);

    const actionLink = this.add.text(panel.x - 70, panel.y + 110, "[Login]", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#7cc7ff",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(15002).setInteractive({ useHandCursor: true });
    const divider = this.add.text(panel.x, panel.y + 110, "|", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#7cc7ff",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(15002);
    const toggleLink = this.add.text(panel.x + 70, panel.y + 110, "Register instead", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#7cc7ff",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(15002).setInteractive({ useHandCursor: true });
    const forgotText = this.add.text(panel.x, panel.y + 140, "Forgot Password", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#c3ff7c",
    }).setOrigin(0.5).setScrollFactor(0).setDepth(15002).setInteractive({ useHandCursor: true });

    const baseStyle =
      "width:240px;height:26px;font-size:13px;background:#1c1c1c;color:#eaeaea;border:1px solid #444;border-radius:4px;padding:2px 6px;outline:none;transition:border-color 120ms;";
    const focusBorder = "#7cc7ff";

    const styleDom = (dom, show = true) => {
      const node = dom.node;
      node.style.position = "absolute";
      node.style.transform = "translate(-50%, -50%)";
      node.style.pointerEvents = "auto";
      node.style.zIndex = "20000";
      node.style.display = show ? "block" : "none";
    };

    const wireFocus = (dom) => {
      const node = dom.node;
      node.addEventListener("focus", () => {
        node.style.borderColor = focusBorder;
      });
      node.addEventListener("blur", () => {
        node.style.borderColor = "#444";
      });
      node.addEventListener("keydown", (e) => {
        // Keep enter inside this scene
        e.stopPropagation();
        if (e.key === "Enter") {
          e.preventDefault();
          doAction();
        }
      });
    };

    const nameField = this.add.dom(panel.x, panel.y - 60, "input", `${baseStyle}display:none;`, "")
      .setScrollFactor(0)
      .setDepth(15002);
    styleDom(nameField, false);
    nameField.setVisible(false);
    nameField.node.type = "text";
    nameField.node.placeholder = "Name";
    nameField.node.tabIndex = 1;

    const email = this.add.dom(panel.x, panel.y - 20, "input", baseStyle, "")
      .setScrollFactor(0)
      .setDepth(15002);
    styleDom(email, true);
    email.node.type = "email";
    email.node.placeholder = "Email";
    email.node.tabIndex = 2;

    const pass = this.add.dom(panel.x, panel.y + 20, "input", baseStyle, "")
      .setScrollFactor(0)
      .setDepth(15002);
    styleDom(pass, true);
    pass.node.type = "password";
    pass.node.placeholder = "Password";
    pass.node.tabIndex = 3;

    const pass2 = this.add.dom(panel.x, panel.y + 60, "input", `${baseStyle}display:none;`, "")
      .setScrollFactor(0)
      .setDepth(15002);
    styleDom(pass2, false);
    pass2.setVisible(false);
    pass2.node.type = "password";
    pass2.node.placeholder = "Repeat password";
    pass2.node.tabIndex = 4;

    [nameField, email, pass, pass2].forEach((dom) => wireFocus(dom));

    const status = this.add.text(panel.x, panel.y + 180, "", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#ffcccc",
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(15002);

    const closeBtn = this.add.text(panel.x + w / 2 - 8, panel.y - h / 2 + 6, "X", {
      fontFamily: "Courier New, monospace",
      fontSize: "12px",
      color: "#ff9999",
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(15002).setInteractive({ useHandCursor: true });

    let mode = "login";
    const FC = window.FirebaseClient;

    const setMode = (m) => {
      mode = m;
      title.setText(mode === "login" ? "-- LOGIN --" : "-- REGISTER --");
      actionLink.setText(mode === "login" ? "[Login]" : "[Register]");
      toggleLink.setText(mode === "login" ? "Register instead" : "Login instead");
      const showExtra = mode === "register";
      nameField.node.style.display = showExtra ? "block" : "none";
      pass2.node.style.display = showExtra ? "block" : "none";
      nameField.setVisible(showExtra);
      pass2.setVisible(showExtra);
      nameField.node.value = "";
      pass2.node.value = "";
      forgotText.setVisible(mode === "login");
      status.setText("");
      [nameField, email, pass, pass2].forEach((f) => { if (f?.node) f.node.value = ""; });
      setTimeout(() => (mode === "register" ? nameField.node : email.node).focus(), 0);
    };
    actionLink.on("pointerup", () => {
      doAction();
    });
    toggleLink.on("pointerup", () => {
      setMode(mode === "login" ? "register" : "login");
    });

    const resumePaused = () => {
      this.pausedScenes?.forEach((key) => {
        if (this.scene.isPaused(key)) this.scene.resume(key);
      });
      this.pausedScenes = [];
    };

    const doAction = async () => {
      if (mode === "login") {
        if (!email.node.value || !pass.node.value) {
          status.setText("Enter email/password");
          return;
        }
        status.setText("Signing in...");
        try {
          await FC?.signInWithEmailPassword?.(email.node.value, pass.node.value);
          status.setText("Signed in");
          this.scene.stop();
          this.scene.resume("ProfileOverlayScene");
          resumePaused();
        } catch (e) {
          status.setText(e?.message || "Login failed");
        }
      } else {
        if (!nameField.node.value || !email.node.value || !pass.node.value || !pass2.node.value) {
          status.setText("Fill all fields");
          return;
        }
        if (pass.node.value !== pass2.node.value) {
          status.setText("Passwords do not match");
          return;
        }
        status.setText("Registering...");
        try {
          await FC?.registerWithEmailPassword?.(email.node.value, pass.node.value, nameField.node.value);
          status.setText("Check your email to verify");
          this.scene.stop();
          this.scene.resume("ProfileOverlayScene");
          resumePaused();
        } catch (e) {
          status.setText(e?.message || "Register failed");
        }
      }
    };

    [pass, email, nameField, pass2].forEach((dom) => {
      dom.node.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          e.preventDefault();
          doAction();
        }
      });
    });

    closeBtn.on("pointerup", () => {
      this.scene.stop();
      this.scene.resume("ProfileOverlayScene");
      resumePaused();
    });

    forgotText.on("pointerup", async () => {
      if (!email.node.value) {
        status.setText("Enter email to reset");
        email.node.focus();
        return;
      }
      status.setText("Sending reset...");
      try {
        await FC?.getAuth?.().sendPasswordResetEmail(email.node.value);
        status.setText("Reset email sent");
      } catch (e) {
        status.setText(e?.message || "Reset failed");
      }
    });

    // Pause other active scenes so only auth UI shows
    this.pausedScenes = [];
    const allScenes = this.scene.manager.getScenes(true);
    allScenes.forEach((s) => {
      if (s.scene.key !== "AuthScene" && s.scene.isActive()) {
        s.scene.pause();
        this.pausedScenes.push(s.scene.key);
      }
    });

    const layout = () => {
      const c = this.cameras.main;
      overlay.setPosition(c.centerX, c.centerY);
      overlay.setSize(c.width, c.height);
      panel.setPosition(c.centerX, c.centerY);
      title.setPosition(panel.x, panel.y - h / 2 + 10);
      actionLink.setPosition(panel.x - 70, panel.y + 110);
      divider.setPosition(panel.x, panel.y + 110);
      toggleLink.setPosition(panel.x + 70, panel.y + 110);
      forgotText.setPosition(panel.x, panel.y + 140);
      nameField.setPosition(panel.x, panel.y - 60);
      email.setPosition(panel.x, panel.y - 20);
      pass.setPosition(panel.x, panel.y + 20);
      pass2.setPosition(panel.x, panel.y + 60);
      status.setPosition(panel.x, panel.y + 180);
      closeBtn.setPosition(panel.x + w / 2 - 8, panel.y - h / 2 + 6);
    };

    layout();
    this.scale.on("resize", layout, this);

    setMode("login");
    this.input.keyboard.enabled = false; // rely on DOM inputs for typing
    this.form = { overlay, panel, email, pass, pass2, nameField, status, closeBtn, actionLink, toggleLink, divider, forgotText, layout };
  }
}

window.AuthScene = AuthScene;
