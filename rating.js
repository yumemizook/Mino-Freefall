(() => {
  const MODE_TARGETS = {
    marathon: { weight: 1.0, targetScore: 500000, type: "score", cap: 600 },
    ultra: { weight: 1.0, targetScore: 100000, type: "score", cap: 600 },
    sprint_40: { weight: 1.2, targetTime: 60, type: "time", cap: 700, targetLines: 40 },
    sprint_100: { weight: 1.2, targetTime: 150, type: "time", cap: 1000, targetLines: 100 },
    "20g": { weight: 1.4, targetScore: 600000, type: "score", cap: 900 },
    tgm1: { weight: 1.2, targetGrade: "GM", type: "grade", cap: 900 },
    tgm2_master: { weight: 1.5, targetGrade: "GM", type: "grade", cap: 1100 },
    tgm2_normal: { weight: 1.1, targetScore: 300000, type: "score", cap: 700 },
    tgm3_easy: { weight: 1.1, targetHanabi: 700, type: "hanabi", cap: 1800 },
    tgm3: { weight: 1.6, targetGrade: "GM", type: "grade_ext", cap: 1300 },
    shirase: { weight: 2.0, targetLevel: 1300, type: "level", cap: 2500 },
    tgm_plus: { weight: 1.2, targetLevel: 999, type: "level", cap: 1200 },
    tadeath: { weight: 1.6, targetLevel: 999, type: "level", cap: 1500 },
  };

  const GRADE_ORDER = [
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M",
    "MK",
    "MV",
    "MO",
    "MM",
    "GM",
  ];

  function gradeToValue(grade) {
    if (!grade) return 0;
    const idx = GRADE_ORDER.indexOf(String(grade).toUpperCase());
    return idx >= 0 ? idx + 1 : 0;
  }

  function logLinear(normalized) {
    if (normalized <= 0) return 0;
    // logarithmic easing up to 1, then linear past 1 with reduced slope
    const logPart = Math.log1p(normalized * 4) / Math.log1p(4); // 0..1 for 0..1
    if (normalized <= 1) return logPart * 500;
    return 500 + (normalized - 1) * 500; // linear tail beyond 1
  }

  function computeModeValue(modeId, entry) {
    const cfg = MODE_TARGETS[modeId];
    if (!cfg) return { value: 0, cap: 0, weight: 0 };
    let progress = 0;
    if (cfg.type === "score" && entry?.score) {
      progress = Math.max(0, entry.score) / cfg.targetScore;
    } else if (cfg.type === "time" && entry?.timeSeconds) {
      progress = cfg.targetTime > 0 ? cfg.targetTime / Math.max(entry.timeSeconds, cfg.targetTime) : 0;
    } else if (cfg.type === "grade" || cfg.type === "grade_ext") {
      const current = gradeToValue(entry?.grade);
      const target = gradeToValue(cfg.targetGrade);
      progress = target ? current / target : 0;
      const targetLines = cfg.type === "grade_ext" ? 1300 : 999;
      const lineFactor = entry?.lines ? Math.min(1, entry.lines / targetLines) : 1;
      progress *= lineFactor;
      if (cfg.type === "grade_ext" && entry?.level) {
        const levelFactor = Math.min(1, entry.level / targetLines);
        progress = Math.max(progress, progress * 0.7 + levelFactor * 0.3);
      }
    } else if (cfg.type === "level") {
      const targetLevel = cfg.targetLevel || cfg.targetLines || 1;
      const currentLevel = entry?.level ?? entry?.lines ?? 0;
      progress = targetLevel > 0 ? Math.min(1, currentLevel / targetLevel) : 0;
    } else if (cfg.type === "hanabi" && entry?.hanabi != null) {
      progress = Math.max(0, entry.hanabi) / cfg.targetHanabi;
    }
    const scaled = logLinear(progress);
    const capped = Math.min(cfg.cap, scaled);
    return { value: capped * cfg.weight, cap: cfg.cap * cfg.weight, weight: cfg.weight };
  }

  function computeRating(scores) {
    const breakdown = {};
    let total = 0;
    Object.entries(scores || {}).forEach(([modeId, entry]) => {
      const res = computeModeValue(modeId, entry);
      breakdown[modeId] = res.value;
      total += res.value;
    });
    return { value: Math.round(total), breakdown };
  }

  window.RatingEngine = {
    computeRating,
    MODE_TARGETS,
  };
})();
