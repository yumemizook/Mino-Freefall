(() => {
  const MODE_TARGETS = {
    marathon: { weight: 1.0, targetScore: 500000, type: "score", cap: 600 },
    ultra: { weight: 1.0, targetScore: 100000, type: "score", cap: 600 },
    sprint_40: { weight: 1.2, targetTime: 60, type: "time", cap: 700, targetLines: 40 },
    sprint_100: { weight: 1.2, targetTime: 150, type: "time", cap: 1000, targetLines: 100 },
    "20g": { weight: 1.4, targetGrade: "GM", type: "grade", cap: 1100 },
    tgm1: { weight: 1.2, targetGrade: "GM", type: "grade", cap: 900 },
    tgm2_master: { weight: 1.5, targetGrade: "GM", type: "grade", cap: 1300 },
    tgm2_normal: { weight: 1.1, targetScore: 300000, type: "score", cap: 700 },
    tgm3_easy: { weight: 1.1, targetHanabi: 700, type: "hanabi", cap: 800 },
    tgm3: { weight: 1.6, targetGrade: "GM", type: "grade_ext", cap: 1500 },
    shirase: { weight: 2.0, targetLevel: 1300, type: "level", cap: 2500 },
    tgm_plus: { weight: 1.2, targetLevel: 999, type: "level", cap: 1200 },
    tadeath: { weight: 1.6, targetLevel: 999, type: "level", cap: 1800 },
    // RACE modes
    asuka_easy: { weight: 1.3, targetLevel: 1300, type: "level", cap: 800 },
    asuka_normal: { weight: 1.4, targetLevel: 1300, type: "level", cap: 1500 },
    asuka_hard: { weight: 1.5, targetLevel: 1300, type: "level", cap: 2200 },
    // PUZZLE/ALL CLEAR modes
    konoha_easy: { weight: 1.0, targetBravos: 110, type: "all_clears", cap: 900 },
    konoha_hard: { weight: 1.2, targetBravos: 110, type: "all_clears", cap: 1400 },
    // Additional TGM modes
    tgm4: { weight: 1.7, targetGrade: "10/10", type: "grade_spec", cap: 1600 },
    master20g: { weight: 1.8, targetLevel: 2600, type: "level", cap: 2800 },
    // Zen mode (excluded from rating as per game.js logic)
    zen: { weight: 0, targetScore: 0, type: "score", cap: 0 },
    // Sakura modes (excluded from rating as per game.js logic)
    tgm3_sakura: { weight: 0, targetScore: 0, type: "score", cap: 0 },
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
    "M",
    "GM",
  ];

  const TGM123_GRADE_ORDER = [
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
    "GM",
  ];

  const TGM2_GRADE_ORDER = [
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
    "M",
    "GM",
  ];

  const TGM3_GRADE_ORDER = [
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

  function gradeToValue(grade, modeId = null) {
    if (!grade) return 0;
    
    let gradeOrder;
    if (modeId === "tgm1" || modeId === "20g") {
      gradeOrder = TGM123_GRADE_ORDER;
    } else if (modeId === "tgm2_master" || modeId === "tgm2_normal") {
      gradeOrder = TGM2_GRADE_ORDER;
    } else if (modeId === "tgm3" || modeId === "tgm3_easy") {
      gradeOrder = TGM3_GRADE_ORDER;
    } else {
      gradeOrder = GRADE_ORDER;
    }
    
    const idx = gradeOrder.indexOf(String(grade).toUpperCase());
    return idx >= 0 ? idx + 1 : 0;
  }

  function logLinear(normalized) {
    if (normalized <= 0) return 0;
    // logarithmic easing up to 1, then linear past 1 with reduced slope
    const logPart = Math.log1p(normalized * 4) / Math.log1p(4); // 0..1 for 0..1
    if (normalized <= 1) return logPart * 500;
    return 500 + (normalized - 1) * 500; // linear tail beyond 1
  }

  function quadraticCurve(normalized) {
    if (normalized <= 0) return 0;
    return normalized * normalized * 500; // quadratic scaling
  }

  function tadeathCurve(level) {
    if (level <= 0) return 0;
    if (level <= 500) {
      // Quadratic before level 500
      const normalized = level / 500;
      return normalized * normalized * 400;
    } else {
      // Linear from 500-999
      const normalized = (level - 500) / 499;
      return 400 + normalized * 400;
    }
  }

  function shiraseCurve(level) {
    if (level <= 0) return 0;
    if (level <= 500) {
      // Log-linear before level 500
      const normalized = level / 500;
      return logLinear(normalized) * 0.6; // scale down for early segment
    } else if (level <= 999) {
      // Linear for 500-999
      const normalized = (level - 500) / 499;
      return 300 + normalized * 400; // 300-700 range
    } else {
      // Quadratic for 1000-1300
      const normalized = (level - 999) / 301;
      return 700 + normalized * normalized * 800; // 700-1500 range
    }
  }

  function asukaEasyCurve(level) {
    if (level <= 0) return 0;
    if (level <= 300) {
      // Log curve before level 300
      const normalized = level / 300;
      return Math.log1p(normalized * 9) / Math.log1p(9) * 300; // 0-300 range
    } else {
      // Linear from 300-1000
      const normalized = (level - 300) / 700;
      return 300 + normalized * 500; // 300-800 range
    }
  }

  function asukaNormalCurve(level) {
    if (level <= 0) return 0;
    if (level <= 200) {
      // Log-linear for 0-200
      const normalized = level / 200;
      return logLinear(normalized) * 0.4; // 0-200 range
    } else if (level <= 399) {
      // Linear for 200-399
      const normalized = (level - 200) / 199;
      return 200 + normalized * 200; // 200-400 range
    } else if (level <= 799) {
      // Log-linear again for 400-799
      const normalized = (level - 399) / 400;
      return 400 + logLinear(normalized) * 0.4; // 400-600 range
    } else if (level <= 999) {
      // Linear for 800-999
      const normalized = (level - 799) / 200;
      return 600 + normalized * 400; // 600-1000 range
    } else {
      // Quadratic for 1000-1300
      const normalized = (level - 999) / 301;
      return 1000 + normalized * normalized * 500; // 1000-1500 range
    }
  }

  function asukaHardCurve(level) {
    if (level <= 0) return 0;
    if (level <= 200) {
      // Log-linear for 0-200
      const normalized = level / 200;
      return logLinear(normalized) * 0.4; // 0-200 range
    } else if (level <= 399) {
      // Linear for 200-399
      const normalized = (level - 200) / 199;
      return 200 + normalized * 200; // 200-400 range
    } else if (level <= 799) {
      // Log-linear again for 400-799
      const normalized = (level - 399) / 400;
      return 400 + logLinear(normalized) * 0.4; // 400-600 range
    } else if (level <= 999) {
      // Linear for 800-999
      const normalized = (level - 799) / 200;
      return 600 + normalized * 400; // 600-1000 range
    } else {
      // Exponential for 1000-1300
      const normalized = (level - 999) / 301;
      return 1000 + (Math.exp(normalized * 2) - 1) * 300; // 1000-~2200 range
    }
  }

  function konohaCurve(bravos) {
    if (bravos <= 0) return 0;
    if (bravos <= 25) {
      // Log curve for first 25 all clears
      const normalized = bravos / 25;
      return Math.log1p(normalized * 9) / Math.log1p(9) * 400; // 0-400 range
    } else {
      // Linear from 26th all clear onwards
      const normalized = (bravos - 25) / 85; // 25-110 range
      return 400 + normalized * 600; // 400-1000 range
    }
  }

  function tgm4Calculation(grade) {
    // TGM4: 40% numerator (quadratic), 60% denominator (linear)
    const gradeValue = gradeToValue(grade, "tgm4");
    if (gradeValue <= 0) return 0;
    
    // Numerator: quadratic function (40% weight)
    const numerator = Math.pow(gradeValue / 10, 2) * 0.4;
    
    // Denominator: linear function (60% weight)
    const denominator = (gradeValue / 10) * 0.6;
    
    return (numerator + denominator) * 100; // Scale to appropriate range
  }

  function gradeProgressiveValue(currentGrade, targetGrade, modeId) {
    // Progressive value: higher grade promotions worth more
    const currentValue = gradeToValue(currentGrade, modeId);
    const targetValue = gradeToValue(targetGrade, modeId);
    
    if (currentValue >= targetValue) return 1;
    
    // Apply exponential scaling based on grade tier
    const gradeTier = Math.floor(currentValue / 5); // Group grades into tiers
    const tierMultiplier = 1 + (gradeTier * 0.2); // Higher tiers get more weight
    
    const baseProgress = currentValue / targetValue;
    return Math.pow(baseProgress, 1 / tierMultiplier); // Inverse scaling for progressive difficulty
  }

  function computeModeValue(modeId, entry) {
    const cfg = MODE_TARGETS[modeId];
    if (!cfg) return { value: 0, cap: 0, weight: 0 };
    let progress = 0;
    if (cfg.type === "score" && entry?.score) {
      progress = Math.max(0, entry.score) / cfg.targetScore;
    } else if (cfg.type === "time" && entry?.timeSeconds) {
      progress = cfg.targetTime > 0 ? cfg.targetTime / Math.max(entry.timeSeconds, cfg.targetTime) : 0;
    } else if (cfg.type === "grade" || cfg.type === "grade_ext" || cfg.type === "grade_spec") {
      const current = gradeToValue(entry?.grade, modeId);
      const target = gradeToValue(cfg.targetGrade, modeId);
      
      // Use progressive grading for TGM modes
      if (modeId === "tgm1" || modeId === "tgm2_master" || modeId === "tgm2_normal" || modeId === "20g") {
        progress = gradeProgressiveValue(entry?.grade, cfg.targetGrade, modeId);
      } else if (modeId === "tgm4") {
        progress = tgm4Calculation(entry?.grade) / 1600; // Normalize to cap
      } else {
        progress = target ? current / target : 0;
      }
      
      const targetLines = cfg.type === "grade_ext" ? 1300 : 999;
      const lineFactor = entry?.lines ? Math.min(1, entry.lines / targetLines) : 1;
      progress *= lineFactor;
      if (cfg.type === "grade_ext" && entry?.level) {
        const levelFactor = Math.min(1, entry.level / targetLines);
        progress = Math.max(progress, progress * 0.7 + levelFactor * 0.3);
      }
    } else if (cfg.type === "level") {
      const currentLevel = entry?.level ?? entry?.lines ?? 0;
      
      // Use specialized curves for specific modes
      if (modeId === "tgm_plus") {
        const targetLevel = cfg.targetLevel || 999;
        const normalized = currentLevel / targetLevel;
        progress = logLinear(normalized) / 500; // Normalize to 0-1
      } else if (modeId === "tadeath") {
        progress = tadeathCurve(currentLevel) / 800; // Normalize to 0-1 (max ~800)
      } else if (modeId === "shirase") {
        progress = shiraseCurve(currentLevel) / 1500; // Normalize to 0-1 (max ~1500)
      } else if (modeId === "asuka_easy") {
        progress = asukaEasyCurve(currentLevel) / 800; // Normalize to 0-1 (max ~800)
      } else if (modeId === "asuka_normal") {
        progress = asukaNormalCurve(currentLevel) / 1500; // Normalize to 0-1 (max ~1500)
      } else if (modeId === "asuka_hard") {
        progress = asukaHardCurve(currentLevel) / 2200; // Normalize to 0-1 (max ~2200)
      } else {
        const targetLevel = cfg.targetLevel || cfg.targetLines || 1;
        progress = targetLevel > 0 ? Math.max(0, currentLevel / targetLevel) : 0;
      }
    } else if (cfg.type === "all_clears" && entry?.bravos != null) {
      progress = konohaCurve(entry.bravos) / 1000; // Normalize to 0-1
    } else if (cfg.type === "hanabi" && entry?.hanabi != null) {
      progress = Math.max(0, entry.hanabi) / cfg.targetHanabi;
    }
    
    let scaled;
    if (modeId === "tgm_plus") {
      scaled = logLinear(progress);
    } else if (modeId === "tadeath") {
      scaled = tadeathCurve(entry?.level ?? 0);
    } else if (modeId === "shirase") {
      scaled = shiraseCurve(entry?.level ?? 0);
    } else if (modeId === "asuka_easy") {
      scaled = asukaEasyCurve(entry?.level ?? 0);
    } else if (modeId === "asuka_normal") {
      scaled = asukaNormalCurve(entry?.level ?? 0);
    } else if (modeId === "asuka_hard") {
      scaled = asukaHardCurve(entry?.level ?? 0);
    } else if (modeId === "tgm4") {
      scaled = tgm4Calculation(entry?.grade);
    } else if (cfg.type === "all_clears") {
      scaled = konohaCurve(entry?.bravos ?? 0);
    } else {
      scaled = logLinear(progress);
    }
    
    const capped = Math.min(cfg.cap, scaled);
    return { value: capped * cfg.weight, cap: cfg.cap * cfg.weight, weight: cfg.weight };
  }

  const MODE_ALIASES = {
    tgm3_master: "tgm3",
    tgm3_shirase: "shirase",
    "t.a. death": "tadeath",
    ta_death: "tadeath",
    "tgm+": "tgm_plus",
    // Additional aliases for consistency
    tgm2: "tgm2_master",
    master: "master20g",
    // Merge easy modes with TGM modes
    easy_normal: "tgm2_normal",
    easy_easy: "tgm3_easy",
  };

  function computeRating(scores) {
    const breakdown = {};
    let total = 0;
    Object.entries(scores || {}).forEach(([modeId, entry]) => {
      const key = MODE_ALIASES[modeId] || modeId;
      const res = computeModeValue(key, entry);
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
