const assert = require("node:assert");

/**
 * Determines which scoring path should be used based on the current mode.
 * Mirrors GameScene.updateScore() now that the mode decision lives there.
 */
function determineScoringPath({ selectedMode, selectedModeId, gameMode }) {
  const guidelineModes = new Set([
    "marathon",
    "sprint_40",
    "sprint_100",
    "ultra",
    "zen",
  ]);

  const selectedModeKey =
    typeof selectedMode === "string" ? selectedMode : selectedModeId || "";

  const isTwentyGMode =
    (gameMode && typeof gameMode.isTwentyGMode === "function"
      ? gameMode.isTwentyGMode()
      : false) || selectedModeKey === "20g";

  return !isTwentyGMode && guidelineModes.has(selectedModeKey)
    ? "guideline"
    : "tgm1";
}

// Regression assertions
assert.strictEqual(
  determineScoringPath({ selectedMode: "20g" }),
  "tgm1",
  "20G should continue to use the TGM1/TGM-style formula even though it shares the 20g flag.",
);

assert.strictEqual(
  determineScoringPath({ selectedMode: "marathon" }),
  "guideline",
  "Marathon should still use the guideline scoring path.",
);

assert.strictEqual(
  determineScoringPath({
    selectedMode: null,
    selectedModeId: "20g",
  }),
  "tgm1",
  "Mode ID fallback should still route 20G through the TGM1 scoring logic.",
);

assert.strictEqual(
  determineScoringPath({
    selectedMode: "ultra",
    gameMode: { isTwentyGMode: () => true },
  }),
  "tgm1",
  "A mode object that claims 20G gravity should force the TGM path even if the ID is a guideline mode.",
);

console.log("scoreSystemRegression: All regression checks passed.");

module.exports = {
  determineScoringPath,
};
