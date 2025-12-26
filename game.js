// Sega-style rotation matrices for ARS (Arika Rotation System)
// These are aligned to the bottom of the bounding box, unlike SRS
const SEGA_ROTATIONS = {
  I: {
    rotations: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ], // Rotation 0
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ], // Rotation 2
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ], // Rotation 3
    ],
    color: 0x00ffff,
  },
  O: {
    rotations: [
      [
        [1, 1],
        [1, 1],
      ], // Rotation 0
      [
        [1, 1],
        [1, 1],
      ], // Rotation 1
      [
        [1, 1],
        [1, 1],
      ], // Rotation 2
      [
        [1, 1],
        [1, 1],
      ], // Rotation 3
    ],
    color: 0xffff00,
  },
  S: {
    rotations: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ], // Rotation 0
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ], // Rotation 2
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0x00ff00,
  },
  Z: {
    rotations: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ], // Rotation 1
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ], // Rotation 2
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0xff0000,
  },
  J: {
    rotations: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ], // Rotation 0 (3-wide)
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ], // Rotation 2 (3-wide) - shifted down
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0x0000ff,
  },
  L: {
    rotations: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ], // Rotation 0 (3-wide)
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1],
      ], // Rotation 2 (3-wide) - shifted down
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ], // Rotation 3
    ],
    color: 0xffa500,
  },
  T: {
    rotations: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ], // Rotation 0 (3-wide)
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ], // Rotation 2 (3-wide)
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0xff00ff,
  },
};

// Simple snapshot test for kick tables (SRS and ARS) to help verify tables in other environments.
function runKickTableSnapshotTest() {
  const expect = {
    SRS_JLSTZ_CW: [
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -2],
        [-1, -2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, -1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, -2],
        [1, -2],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 2],
        [-1, 2],
      ],
    ],
    SRS_JLSTZ_CCW: [
      [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, -2],
        [1, -2],
      ],
      [
        [0, 0],
        [1, 0],
        [1, -1],
        [0, 2],
        [1, 2],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, -2],
        [-1, -2],
      ],
      [
        [0, 0],
        [-1, 0],
        [-1, -1],
        [0, 2],
        [-1, 2],
      ],
    ],
    SRS_I_CW: [
      [
        [0, 0],
        [-2, 0],
        [1, 0],
        [-2, 1],
        [1, -2],
      ],
      [
        [0, 0],
        [-1, 0],
        [2, 0],
        [-1, -2],
        [2, 1],
      ],
      [
        [0, 0],
        [2, 0],
        [-1, 0],
        [2, -1],
        [-1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [-2, 0],
        [1, 2],
        [-2, -1],
      ],
    ],
    SRS_I_CCW: [
      [
        [0, 0],
        [-1, 0],
        [2, 0],
        [-1, -2],
        [2, 1],
      ],
      [
        [0, 0],
        [2, 0],
        [-1, 0],
        [2, -1],
        [-1, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [-2, 0],
        [1, 2],
        [-2, -1],
      ],
      [
        [0, 0],
        [-2, 0],
        [1, 0],
        [-2, 1],
        [1, -2],
      ],
    ],
    ARS_JLSTZ_CW: [
      [
        [0, 0],
        [-1, 0],
        [0, -1],
        [-1, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [-1, 1],
        [0, -1],
      ],
    ],
    ARS_JLSTZ_CCW: [
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [1, -1],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, 1],
        [-1, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [-1, 0],
        [0, -1],
        [-1, -1],
        [0, 1],
      ],
    ],
    ARS_I_CW: [
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, -1],
        [-2, 0],
        [1, 2],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ],
    ],
    ARS_I_CCW: [
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, -1],
        [2, 0],
        [-1, 2],
      ],
      [
        [0, 0],
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],
      ],
      [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ],
      [
        [0, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ],
    ],
  };

  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const results = {
    srsJLSTZCW: deepEqual(SRS_KICKS.JLSTZ_CW, expect.SRS_JLSTZ_CW),
    srsJLSTZCCW: deepEqual(SRS_KICKS.JLSTZ_CCW, expect.SRS_JLSTZ_CCW),
    srsICW: deepEqual(SRS_KICKS.I_CW, expect.SRS_I_CW),
    srsICCW: deepEqual(SRS_KICKS.I_CCW, expect.SRS_I_CCW),
    arsJLSTZCW: deepEqual(ARS_KICKS.JLSTZ_CW, expect.ARS_JLSTZ_CW),
    arsJLSTZCCW: deepEqual(ARS_KICKS.JLSTZ_CCW, expect.ARS_JLSTZ_CCW),
    arsICW: deepEqual(ARS_KICKS.I_CW, expect.ARS_I_CW),
    arsICCW: deepEqual(ARS_KICKS.I_CCW, expect.ARS_I_CCW),
  };

  results.all = Object.values(results).every((v) => v === true);
  return results;
}

if (typeof window !== "undefined") {
  window.runKickTableSnapshotTest = runKickTableSnapshotTest;
}

function getSrsMinimalRotations(type, rotation) {
  if (type === "O") return 0;
  if (type === "I") {
    return rotation === 1 || rotation === 3 ? 1 : 0;
  }
  if (type === "S" || type === "Z") {
    const r = rotation % 2;
    return r === 1 ? 1 : 0;
  }
  // J, L, T
  if (rotation === 0) return 0;
  if (rotation === 2) return 2;
  return 1; // rotation 1 or 3
}

function getSrsMinimalMoves(type, rotation, leftCol) {
  const table = SRS_FINESSE_TABLE[type];
  if (!table) return null;
  const rKey =
    type === "S" || type === "Z" ? rotation % 2 : rotation % (table ? Object.keys(table).length : 4);
  const arr = table[rKey];
  if (!arr || leftCol < 0 || leftCol >= arr.length) return null;
  return arr[leftCol];
}

function isFinesseEligibleMode(selectedMode) {
  return selectedMode === "sprint_40" || selectedMode === "sprint_100" || selectedMode === "ultra";
}

function getLeftmostColumn(piece) {
  let minCol = Infinity;
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c]) {
        const col = piece.x + c;
        if (col < minCol) {
          minCol = col;
        }
      }
    }
  }
  return Number.isFinite(minCol) ? minCol : 0;
}

function computeFinesseActual(piece) {
  if (!piece || !piece.finesseInputs) return { moves: 0, rotations: 0 };
  return {
    moves: piece.finesseInputs.moves || 0,
    rotations: piece.finesseInputs.rotations || 0,
  };
}

// ARS (Arika Rotation System) color scheme
const ARS_COLORS = {
  I: 0xff0000, // red
  T: 0x00ffff, // cyan
  S: 0xff00ff, // purple
  Z: 0x00ff00, // green
  O: 0xffff00, // yellow
  L: 0xffa500, // orange
  J: 0x0000ff, // blue
};

const TETROMINOES = {
  I: {
    rotations: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ], // Rotation 0
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ], // Rotation 2
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ], // Rotation 3
    ],
    color: 0x00ffff,
  },
  O: {
    rotations: [
      [
        [1, 1],
        [1, 1],
      ], // Rotation 0
      [
        [1, 1],
        [1, 1],
      ], // Rotation 1
      [
        [1, 1],
        [1, 1],
      ], // Rotation 2
      [
        [1, 1],
        [1, 1],
      ], // Rotation 3
    ],
    color: 0xffff00,
  },
  S: {
    rotations: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ], // Rotation 1
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ], // Rotation 2
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0x00ff00,
  },
  Z: {
    rotations: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ], // Rotation 2
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ], // Rotation 3
    ],
    color: 0xff0000,
  },
  J: {
    rotations: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ], // Rotation 2
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ], // Rotation 3
    ],
    color: 0x0000ff,
  },
  L: {
    rotations: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ], // Rotation 1
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ], // Rotation 2
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0xffa500,
  },
  T: {
    rotations: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ], // Rotation 0
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ], // Rotation 1
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ], // Rotation 2
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ], // Rotation 3
    ],
    color: 0xff00ff,
  },
};

// OLD (commented out) extended kick tables used previously; retained for fallback/debugging.
// const SRS_KICKS = { ...extended tables... };
// const ARS_KICKS = { ...extended tables... };

// Official Guideline SRS kick tables (5 tests each). O-piece has no kicks.
const SRS_KICKS = {
  JLSTZ_CW: [
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2],
    ], // 0->1
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2],
    ], // 1->2
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2],
    ], // 2->3
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2],
    ], // 3->0
  ],
  JLSTZ_CCW: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2],
    ], // 0->3
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2],
    ], // 3->2
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2],
    ], // 2->1
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2],
    ], // 1->0
  ],
  // TGM3 World (SRS) I-piece kicks
  I_CW: [
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2],
    ], // 0->1
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1],
    ], // 1->2
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2],
    ], // 2->3
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1],
    ], // 3->0
  ],
  I_CCW: [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1],
    ], // 0->3
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2],
    ], // 3->2
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1],
    ], // 2->1
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2],
    ], // 1->0
  ],
};

// Minimal-input SRS finesse tables (leftmost column reference, rotations count per final orientation)
// Columns 0-9, rotation index per SRS (0=spawn/up for J/L/S/Z/T, 0=horizontal for I)
const SRS_FINESSE_TABLE = {
  O: {
    0: [1, 1, 2, 1, 0, 1, 2, 1, 1, 1], // moves only, rotation=0 always
  },
  I: {
    // Flat (spawn, rotation 0 or 2 equivalent)
    0: [1, 1, 2, 1, 0, 1, 2, 1, 1, 1],
    // Vertical (rotation 1 or 3 equivalent) includes one rotation
    1: [2, 2, 2, 1, 1, 1, 2, 2, 2, 2], // minMoves (with DAS/taps) + 1 rotation counted separately
    2: [1, 1, 2, 1, 0, 1, 2, 1, 1, 1],
    3: [2, 2, 2, 1, 1, 1, 2, 2, 2, 2],
  },
  T: {
    0: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    1: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
    2: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    3: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  },
  L: {
    0: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    1: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
    2: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    3: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  },
  J: {
    0: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    1: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
    2: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    3: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  },
  S: {
    0: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    1: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  },
  Z: {
    0: [2, 1, 1, 1, 0, 1, 1, 1, 2, 2],
    1: [2, 1, 1, 1, 1, 1, 1, 1, 2, 2],
  },
};

// ARS (Arika Rotation System) kick tables - TGM3 Classic (TGM2 + extra T and I floor kicks), with vertical I wall kicks.
// O-piece has no kicks; JLSTZ share a single table per direction; I has its own.
const ARS_KICKS = {
  JLSTZ_CW: [
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [0, 1], // extra floor kick for TGM3 (T only benefits in practice)
    ], // 0->1
    [
      [0, 0],
      [1, 0],
      [0, -1],
      [1, -1],
      [0, 1],
    ], // 1->2
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, -1],
    ], // 2->3
    [
      [0, 0],
      [-1, 0],
      [0, 1],
      [-1, 1],
      [0, -1],
    ], // 3->0
  ],
  JLSTZ_CCW: [
    [
      [0, 0],
      [1, 0],
      [0, -1],
      [1, -1],
      [0, 1],
    ], // 0->3
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, -1],
    ], // 3->2
    [
      [0, 0],
      [-1, 0],
      [0, 1],
      [-1, 1],
      [0, -1],
    ], // 2->1
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [0, 1],
    ], // 1->0
  ],
  I_CW: [
    [
      [0, 0],
      [-1, 0], // vertical wall kick left
      [1, 0], // vertical wall kick right
      [0, -1], // floor kick (TGM3)
      [-2, 0], // legacy ARS side kick
      [1, 2], // legacy ARS upward/right
    ], // 0->1 (horizontal->vertical)
    [
      [0, 0],
      [0, -1], // floor kick
      [0, 1], // soft floor
      [-1, 0],
      [1, 0],
    ], // 1->2 (vertical->horizontal)
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ], // 2->3 (horizontal->vertical)
    [
      [0, 0],
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ], // 3->0 (vertical->horizontal)
  ],
  I_CCW: [
    [
      [0, 0],
      [1, 0], // vertical wall kick right
      [-1, 0], // vertical wall kick left
      [0, -1], // floor kick
      [2, 0],
      [-1, 2],
    ], // 0->3 (horizontal->vertical)
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
    ], // 3->2
    [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ], // 2->1
    [
      [0, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ], // 1->0
  ],
};

class Board {
  constructor(rows = 22, cols = 10) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    this.fadeGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  isValidPosition(piece, x, y) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const newX = x + c;
          const newY = y + r;
          if (
            newX < 0 ||
            newX >= this.cols ||
            newY >= this.rows ||
            (newY >= 0 && this.grid[newY][newX])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  placePiece(piece, x, y) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          this.grid[y + r][x + c] = piece.color;
        }
      }
    }
  }

  clearLines() {
    const linesToClear = [];
    for (let r = 0; r < this.rows; r++) {
      if (this.grid[r].every((cell) => cell !== 0)) {
        linesToClear.push(r);
      }
    }
    linesToClear.forEach((line) => {
      this.grid.splice(line, 1);
      this.grid.unshift(Array(this.cols).fill(0));
      this.fadeGrid.splice(line, 1);
      this.fadeGrid.unshift(Array(this.cols).fill(0));
    });
    return linesToClear.length;
  }

  draw(scene, offsetX, offsetY, cellSize) {
    // Only draw the visible rows (rows 2-21 of the 22-row matrix)
    const startRow = 2;
    const endRow = Math.min(this.rows, startRow + scene.visibleRows);

    for (let r = startRow; r < endRow; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c]) {
          const rowAlpha =
            scene.minoRowFadeAlpha && scene.minoRowFadeAlpha[r] !== undefined
              ? scene.minoRowFadeAlpha[r]
              : 1;
          if (rowAlpha <= 0) {
            continue;
          }
          if (
            scene.fadingRollActive &&
            !scene.invisibleStackActive &&
            this.fadeGrid[r][c] > 0 &&
            scene.currentTime >= this.fadeGrid[r][c]
          ) {
            continue;
          }
          if (scene.invisibleStackActive) {
            continue;
          }

          const color = this.grid[r][c];
          if (scene.minoFadeActive) {
            const minoIndex = scene.placedMinos.findIndex(
              (mino) => mino.x === c && mino.y === r && mino.color === color,
            );
            if (minoIndex !== -1 && scene.placedMinos[minoIndex].faded) {
              continue;
            }
          }

          const textureKey =
            scene.rotationSystem === "ARS" ? "mino_ars" : "mino_srs";
          const texture = scene.textures ? scene.textures.get(textureKey) : null;
          const textureSource = texture && texture.source ? texture.source[0] : null;
          const hasValidTextureSource =
            !!texture && !!textureSource && !!textureSource.image;
          if (hasValidTextureSource) {
            const sprite = scene.add.sprite(
              offsetX + c * cellSize,
              offsetY + (r - startRow) * cellSize,
              textureKey,
            );
            sprite.setDisplaySize(cellSize, cellSize);
            sprite.setTint(color);
            sprite.setAlpha(rowAlpha);
            scene.gameGroup.add(sprite);
          } else {
            const graphics = scene.add.graphics();
            graphics.fillStyle(color, rowAlpha);
            graphics.fillRect(
              offsetX + c * cellSize - cellSize / 2,
              offsetY + (r - startRow) * cellSize - cellSize / 2,
              cellSize,
              cellSize,
            );
            scene.gameGroup.add(graphics);
          }
        }
      }
    }
  }

  // End of Board class
}

class Piece {
  constructor(type, rotationSystem = "SRS", initialRotation = 0) {
    this.type = type;
    this.rotationSystem = rotationSystem;
    // Use Sega rotations for ARS, SRS rotations for SRS
    const rotations =
      rotationSystem === "ARS"
        ? SEGA_ROTATIONS[type].rotations
        : TETROMINOES[type].rotations;
    this.shape = rotations[initialRotation].map((row) => [...row]); // Start with specified rotation
    // Use ARS colors for ARS mode, SRS colors for SRS mode
    this.color =
      rotationSystem === "ARS" ? ARS_COLORS[type] : TETROMINOES[type].color;
    this.x = 3; // spawn position
    if (this.type === "O") this.x = 4; // Move O piece 1 column to the right
    this.y = 1; // Spawn at rows 18-19 from bottom (equivalent to rows 1-2 from top) - will be overridden in spawnPiece
    this.fractionalY = 0; // For fractional gravity movement
    this.rotation = initialRotation;
    // Finesse tracking (per piece)
    this.finesseInputs = {
      moves: 0, // horizontal moves (DAS start counts as 1, each tap as 1)
      rotations: 0, // rotation key presses
    };
  }

  getRotatedShape() {
    const rotations =
      this.rotationSystem === "ARS"
        ? SEGA_ROTATIONS[this.type].rotations
        : TETROMINOES[this.type].rotations;
    return rotations[this.rotation] || rotations[0]; // Fallback to first rotation
  }

  rotate(board, direction, rotationSystem = "SRS") {
    // S and Z pieces only have 2 rotation states
    const rotationStates = this.type === "S" || this.type === "Z" ? 2 : 4;
    const newRotation =
      (this.rotation + direction + rotationStates) % rotationStates; // Proper cycling
    const rotations =
      rotationSystem === "ARS"
        ? SEGA_ROTATIONS[this.type].rotations
        : TETROMINOES[this.type].rotations;
    const newShape = rotations[newRotation];

    if (rotationSystem === "ARS") {
      // ARS (Arika Rotation System) implementation
      return this.rotateARS(board, direction, newRotation, newShape);
    } else {
      // SRS (Super Rotation System) implementation
      return this.rotateSRS(board, direction, newRotation, newShape);
    }
  }

  rotateARS(board, direction, newRotation, newShape) {
    if (this.type === "I") {
      // I-piece uses special ARS kick table with wall and floor kicks (TGM3 Classic)
      const isCW = direction === 1;
      const kickTable = isCW ? ARS_KICKS.I_CW : ARS_KICKS.I_CCW;
      const kickTableIndex = this.rotation;

      for (let i = 0; i < kickTable[kickTableIndex].length; i++) {
        const kick = kickTable[kickTableIndex][i];
        const newX = this.x + kick[0];
        const newY = this.y + kick[1];
        if (board.isValidPosition({ shape: newShape }, newX, newY)) {
          this.x = newX;
          this.y = newY;
          this.shape = newShape.map((row) => [...row]);
          this.rotation = newRotation;
          return true;
        }
      }
    } else if (this.type === "O") {
      // O-piece: no kicks in ARS
      if (board.isValidPosition({ shape: newShape }, this.x, this.y)) {
        this.shape = newShape.map((row) => [...row]);
        this.rotation = newRotation;
        return true;
      }
    } else {
      // JLSTZ use ARS kick tables (TGM3 Classic ordering)
      const isCW = direction === 1;
      const kickTable = isCW ? ARS_KICKS.JLSTZ_CW : ARS_KICKS.JLSTZ_CCW;
      const table = kickTable[this.rotation];
      for (let i = 0; i < table.length; i++) {
        const kick = table[i];
        const newX = this.x + kick[0];
        const newY = this.y + kick[1];
        if (board.isValidPosition({ shape: newShape }, newX, newY)) {
          this.x = newX;
          this.y = newY;
          this.shape = newShape.map((row) => [...row]);
          this.rotation = newRotation;
          return true;
        }
      }
    }

    return false;
  }

  rotateSRS(board, direction, newRotation, newShape) {
    const isCW = direction === 1;

    // Select kick tables based on piece type; O-piece has no kicks
    if (this.type === "O") {
      if (board.isValidPosition({ shape: newShape }, this.x, this.y)) {
        this.shape = newShape.map((row) => [...row]);
        this.rotation = newRotation;
        return true;
      }
      return false;
    }

    const kicks =
      this.type === "I"
        ? isCW
          ? SRS_KICKS.I_CW
          : SRS_KICKS.I_CCW
        : isCW
          ? SRS_KICKS.JLSTZ_CW
          : SRS_KICKS.JLSTZ_CCW;

    const kickTable = kicks[this.rotation];

    for (let i = 0; i < kickTable.length; i++) {
      const kick = kickTable[i];
      const newX = this.x + kick[0];
      const newY = this.y + kick[1];
      if (board.isValidPosition({ shape: newShape }, newX, newY)) {
        this.x = newX;
        this.y = newY;
        this.shape = newShape.map((row) => [...row]);
        this.rotation = newRotation;
        return true;
      }
    }
    return false;
  }

  move(board, dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    if (board.isValidPosition(this, newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.fractionalY = this.y; // Reset fractional tracking
      return true;
    }
    return false;
  }

  playGroundSound(scene) {
    if (scene && scene.sound) {
      const groundSound = scene.sound.add("ground", { volume: 0.4 });
      groundSound.play();
    }
  }

  isTouchingGround(board) {
    // Check if piece is touching the ground (bottom of stack or matrix bottom)
    // This checks if any part of the piece is at the bottom row or on top of existing blocks
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape[r].length; c++) {
        if (this.shape[r][c]) {
          const boardX = this.x + c;
          const boardY = this.y + r;

          // Check if at bottom of matrix
          if (boardY >= board.rows - 1) {
            return true;
          }

          // Check if block below is occupied (touching stack)
          if (boardY + 1 >= 0 && board.grid[boardY + 1][boardX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  moveFractional(board, dx, dy) {
    // For fractional movements, we need to track sub-pixel positions
    if (!this.fractionalY) {
      this.fractionalY = this.y;
    }

    this.fractionalY += dy;

    // Only move when we've accumulated a full row
    if (this.fractionalY >= this.y + 1) {
      if (this.move(board, 0, 1)) {
        this.y = Math.floor(this.fractionalY);
        return true;
      }
      return false;
    }
    return true; // Still moving fractionally
  }

  canMoveDown(board) {
    return board.isValidPosition(this, this.x, this.y + 1);
  }

  hardDrop(board) {
    while (this.move(board, 0, 1)) {}
  }

  draw(scene, offsetX, offsetY, cellSize, ghost = false, alpha = 1) {
    const finalAlpha = ghost ? 0.3 : alpha;
    for (let r = 0; r < this.shape.length; r++) {
      for (let c = 0; c < this.shape[r].length; c++) {
        if (this.shape[r][c]) {
          const pieceY = this.y + r;
          // Only draw pieces that are in the visible area (row 2 and below in the 22-row matrix)
          if (pieceY >= 2) {
            const textureKey =
              scene.rotationSystem === "ARS" ? "mino_ars" : "mino_srs";
            const texture = scene.textures ? scene.textures.get(textureKey) : null;
            const textureSource = texture && texture.source ? texture.source[0] : null;
            const hasValidTextureSource =
              !!texture && !!textureSource && !!textureSource.image;
            if (hasValidTextureSource) {
              const sprite = scene.add.sprite(
                offsetX + (this.x + c) * cellSize,
                offsetY + (pieceY - 2) * cellSize,
                textureKey,
              );
              sprite.setDisplaySize(cellSize, cellSize);
              sprite.setTint(this.color);
              sprite.setAlpha(finalAlpha);
              scene.gameGroup.add(sprite);
            } else {
              const graphics = scene.add.graphics();
              graphics.fillStyle(this.color, finalAlpha);
              graphics.fillRect(
                offsetX + (this.x + c) * cellSize - cellSize / 2,
                offsetY + (pieceY - 2) * cellSize - cellSize / 2,
                cellSize,
                cellSize,
              );
              scene.gameGroup.add(graphics);
            }
          }
        }
      }
    }
  }

  getGhostPosition(board) {
    const ghost = new Piece(this.type, this.rotationSystem, this.rotation);
    ghost.x = this.x;
    ghost.y = this.y;
    ghost.hardDrop(board);
    return ghost;
  }
}

// Get starting level from URL parameters
function getStartingLevel() {
  const urlParams = new URLSearchParams(window.location.search);
  const levelParam = urlParams.get("level");

  if (levelParam !== null) {
    const level = parseInt(levelParam);
    if (!isNaN(level) && level >= 0 && level <= 999) {
      return level;
    }
  }
  return 0;
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });

    // Mode categories and their modes
    this.modeTypes = [
      {
        name: "EASY",
        modes: [
          {
            id: "tgm2_normal",
            name: "Normal",
            description: "Score as many points as you can within 300 levels!",
          },
          {
            id: "tgm3_easy",
            name: "Easy",
            description: "TGM3 Easy with Hanabi scoring and credit roll",
          },
        ],
      },
      {
        name: "STANDARD",
        modes: [
          {
            id: "sprint_40",
            name: "Sprint 40L",
            description: "Clear 40 lines as fast as possible",
          },
          {
            id: "sprint_100",
            name: "Sprint 100L",
            description: "Clear 100 lines as fast as possible",
          },
          { id: "ultra", name: "Ultra", description: "2-minute score attack" },
          { id: "marathon", name: "Marathon", description: "Clear 150 lines" },
          { id: "zen", name: "Zen", description: "Endless relaxed play" },
        ],
      },
      {
        name: "MASTER",
        modes: [
          {
            id: "tgm1",
            name: "TGM1",
            description:
              "The Tetris game you know and love. Scale through the grades and be a Grand Master!",
          },
          {
            id: "tgm2",
            name: "TGM2",
            description:
              "Brand new mechanics, brand new challenges! Do you have what it takes?",
          },
          {
            id: "tgm_plus",
            name: "TGM+",
            description: "Rising garbage mode with fixed 24-row pattern!",
          },
          {
            id: "tgm3",
            name: "TGM3",
            description: "Try to be COOL!!, or you will REGRET!! it",
          },
          { id: "tgm4", name: "TGM4", description: "Patience is key..." },
        ],
      },
      {
        name: "20G",
        modes: [
          {
            id: "20g",
            name: "20G",
            description: "Maximum gravity from the start! Good luck!",
          },
          {
            id: "tadeath",
            name: "T.A.Death",
            description: "Difficult 20G challenge mode. Speed is key!",
          },
          {
            id: "shirase",
            name: "Shirase",
            description: "Lightning-fast speeds. Do you have what it takes?",
          },
          {
            id: "master20g",
            name: "Master",
            description:
              "Brand new, unique game mechanics. Can you handle them?",
          },
        ],
      },
      {
        name: "RACE",
        modes: [
          {
            id: "asuka_easy",
            name: "Asuka Easy",
            description: "20G Tetris stacking introduction",
          },
          {
            id: "asuka_normal",
            name: "Asuka",
            description: "Race mode. Finish 1300 levels in 7 minutes.",
          },
          {
            id: "asuka_hard",
            name: "Asuka Hard",
            description: "The true test of skill and speed!",
          },
        ],
      },
      {
        name: "ALL CLEAR",
        modes: [
          {
            id: "konoha_easy",
            name: "Konoha Easy",
            description: "Easy all-clear challenge with 5 pieces!",
          },
          {
            id: "konoha_hard",
            name: "Konoha Hard",
            description: "Hard all-clear challenge with all 7 pieces!",
          },
        ],
      },
      {
        name: "PUZZLE",
        modes: [
          {
            id: "tgm3_sakura",
            name: "TGM3-Sakura",
            description: "Puzzle mode from TGM3",
          },
          {
            id: "flashpoint",
            name: "Flashpoint",
            description: "From Flashpoint.",
          },
        ],
      },
    ];

    this.currentModeTypeIndex = 0;
    this.currentSubmodeIndex = 0;

    // UI elements
    this.modeTypeTitle = null;
    this.leftModeTypeArrow = null;
    this.rightModeTypeArrow = null;
    this.upSubmodeArrow = null;
    this.downSubmodeArrow = null;
    this.modeTypeListContainer = null;
    this.submodeTitle = null;
    this.submodeDescription = null;
    this.leaderboardContainer = null;
    this.leaderboardTitle = null;
    this.leaderboardEntries = [];
    this.startButton = null;
    this.settingsButton = null;
    this.settingsBorder = null;
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.tPieceX = centerX;
    this.tPieceY = centerY - 90;

    this.events.once("shutdown", () => {
      if (this.input && this.input.keyboard && this.input.keyboard.removeAllListeners) {
        this.input.keyboard.removeAllListeners();
      }
    });

    // Title
    this.add
      .text(centerX, centerY - 220, "MINO FREEFALL", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "#000000",
          blur: 0,
          stroke: true,
          fill: false,
        },
      })
      .setOrigin(0.5);

    this.createMenuUI();
    this.updateMenuDisplay();
    this.setupKeyboardControls();
  }

  createMenuUI() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Mode type list container (left side)
    this.modeTypeListContainer = this.add.container(
      centerX - 350,
      centerY - 50,
    );

    // Submode navigation arrows (center)
    this.upSubmodeArrow = this.add
      .text(centerX - 100, centerY + 20, "◀", {
        fontSize: "24px",
        fill: "#888888",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.downSubmodeArrow = this.add
      .text(centerX + 100, centerY + 20, "▶", {
        fontSize: "24px",
        fill: "#888888",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    // Submode title and description (center)
    this.submodeTitle = this.add
      .text(centerX, centerY + 20, "", {
        fontSize: "24px",
        fill: "#00ffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.submodeDescription = this.add
      .text(centerX, centerY + 60, "", {
        fontSize: "14px",
        fill: "#cccccc",
        fontFamily: "Courier New",
        wordWrap: { width: 300 },
        align: "center",
      })
      .setOrigin(0.5);

    // Best scores leaderboard (right side)
    const leaderboardBaseX = centerX + 270;
    const leaderboardBaseY = centerY - 80;
    const leaderboardOffsetX = 30;
    const leaderboardOffsetY = 100;
    const leaderboardTitleExtraY = -100;
    this.leaderboardContainer = this.add.container(
      leaderboardBaseX + leaderboardOffsetX,
      leaderboardBaseY + leaderboardOffsetY,
    );

    // Leaderboard title - anchored relative to the container, pushed further down
    this.leaderboardTitle = this.add
      .text(
        leaderboardBaseX + leaderboardOffsetX,
        leaderboardBaseY + leaderboardOffsetY + leaderboardTitleExtraY,
        "BEST SCORES",
      {
        fontSize: "20px",
        fill: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Leaderboard entries will be created dynamically
    this.leaderboardEntries = [];

    // Start button (bottom center)
    this.startButton = this.add
      .text(centerX, centerY + 120, "START GAME", {
        fontSize: "24px",
        fill: "#00ff00",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.startButton.on("pointerdown", () => {
      this.startSelectedMode();
    });

    this.startButton.on("pointerover", () => {
      this.startButton.setStyle({ fill: "#ffffff" });
    });

    this.startButton.on("pointerout", () => {
      this.startButton.setStyle({ fill: "#00ff00" });
    });

    // Settings button (bottom with border)
    const buttonWidth = 120;
    const buttonHeight = 40;
    const buttonX = centerX + 200;
    const buttonY = this.cameras.main.height - 60;

    // Create border rectangle
    this.settingsBorder = this.add.graphics();
    this.settingsBorder.lineStyle(2, 0xffffff);
    this.settingsBorder.strokeRect(
      buttonX - buttonWidth / 2,
      buttonY - buttonHeight / 2,
      buttonWidth,
      buttonHeight,
    );

    // Create button text
    this.settingsButton = this.add
      .text(buttonX, buttonY, "Settings", {
        fontSize: "18px",
        fill: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.settingsButton.on("pointerdown", () => {
      // Settings functionality to be implemented
    });

    this.settingsButton.on("pointerover", () => {
      this.settingsButton.setStyle({ fill: "#ffff00" });
    });

    this.settingsButton.on("pointerout", () => {
      this.settingsButton.setStyle({ fill: "#ffffff" });
    });

    this.settingsButton.on("pointerdown", () => {
      this.scene.start("SettingsScene");
    });

    // Arrow click handlers
    this.upSubmodeArrow.on("pointerdown", () => {
      this.navigateSubmode(-1);
    });

    this.downSubmodeArrow.on("pointerdown", () => {
      this.navigateSubmode(1);
    });

    // Create initial mode type list display
    this.createModeTypeListDisplay();
  }

  updateMenuLayout() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Update submode arrows (center)
    if (this.upSubmodeArrow) {
      this.upSubmodeArrow.setPosition(centerX - 100, centerY + 20);
    }
    if (this.downSubmodeArrow) {
      this.downSubmodeArrow.setPosition(centerX + 100, centerY + 20);
    }

    // Update submode title and description (center)
    if (this.submodeTitle) {
      this.submodeTitle.setPosition(centerX, centerY + 20);
    }
    if (this.submodeDescription) {
      this.submodeDescription.setPosition(centerX, centerY + 60);
    }

    // Update mode type list container (left side)
    if (this.modeTypeListContainer) {
      this.modeTypeListContainer.setPosition(centerX - 350, centerY - 50);
    }

    // Update leaderboard container (right side) - keep consistent with creation offsets
    const leaderboardBaseX = centerX + 270;
    const leaderboardBaseY = centerY - 80;
    const leaderboardOffsetX = 30;
    const leaderboardOffsetY = 100;
    const leaderboardTitleOffsetX = 15;
    const leaderboardTitleExtraY = -100;
    if (this.leaderboardContainer) {
      this.leaderboardContainer.setPosition(
        leaderboardBaseX + leaderboardOffsetX,
        leaderboardBaseY + leaderboardOffsetY,
      );
    }
    if (this.leaderboardTitle) {
      this.leaderboardTitle.setPosition(
        leaderboardBaseX + leaderboardTitleOffsetX,
        leaderboardBaseY + leaderboardOffsetY + leaderboardTitleExtraY,
      );
    }

    // Update start button (bottom center)
    if (this.startButton) {
      this.startButton.setPosition(centerX, centerY + 120);
    }

    // Update settings button (bottom with border)
    if (this.settingsButton && this.settingsBorder) {
      const buttonWidth = 120;
      const buttonHeight = 40;
      const buttonX = centerX + 200;
      const buttonY = this.cameras.main.height - 60;

      this.settingsButton.setPosition(buttonX, buttonY);

      // Update border
      this.settingsBorder.clear();
      this.settingsBorder.lineStyle(2, 0xffffff);
      this.settingsBorder.strokeRect(
        buttonX - buttonWidth / 2,
        buttonY - buttonHeight / 2,
        buttonWidth,
        buttonHeight,
      );
    }
  }

  setupKeyboardControls() {
    if (this.input && this.input.keyboard && this.input.keyboard.removeAllListeners) {
      this.input.keyboard.removeAllListeners();
    }

    // Left/Right for submode navigation within selected mode type
    this.input.keyboard.on("keydown-LEFT", () => {
      this.navigateSubmode(-1);
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
      this.navigateSubmode(1);
    });

    // Up/Down for mode type selection (all displayed vertically)
    this.input.keyboard.on("keydown-UP", () => {
      this.navigateModeType(-1);
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      this.navigateModeType(1);
    });

    // Enter to start game
    this.input.keyboard.on("keydown-ENTER", () => {
      this.startSelectedMode();
    });

    // Escape for settings
    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.start("SettingsScene");
    });
  }

  navigateModeType(direction) {
    const numModeTypes = this.modeTypes.length;
    this.currentModeTypeIndex =
      (this.currentModeTypeIndex + direction + numModeTypes) % numModeTypes;
    this.currentSubmodeIndex = 0; // Reset to first submode in new mode type
    this.updateMenuDisplay();
  }

  navigateSubmode(direction) {
    const currentModeType = this.modeTypes[this.currentModeTypeIndex];
    const numSubmodes = currentModeType.modes.length;
    this.currentSubmodeIndex =
      (this.currentSubmodeIndex + direction + numSubmodes) % numSubmodes;
    this.updateMenuDisplay();
  }

  createModeTypeListDisplay() {
    // Clear existing mode type list
    if (this.modeTypeListContainer && this.modeTypeListContainer.removeAll) {
      this.modeTypeListContainer.removeAll(true);
    }

    const modeTypes = this.modeTypes;

    // Create mode type list entries
    modeTypes.forEach((modeType, index) => {
      const modeTypeY = index * 50; // Increased spacing between mode types

      // Mode type name text positioned relative to container
      const modeTypeColor =
        index === this.currentModeTypeIndex
          ? this.getDifficultyColor(modeType.name)
          : "#666666";
      const modeTypeText = this.add
        .text(0, modeTypeY, modeType.name, {
          fontSize: "18px",
          fill: modeTypeColor,
          fontFamily: "Courier New",
          fontStyle: index === this.currentModeTypeIndex ? "bold" : "normal",
        })
        .setOrigin(0, 0.5);

      // Make selected mode type interactive
      if (index === this.currentModeTypeIndex) {
        modeTypeText.setInteractive();
        modeTypeText.on("pointerdown", () => {
          this.currentModeTypeIndex = index;
          this.currentSubmodeIndex = 0; // Reset to first submode
          this.updateMenuDisplay();
        });
      }

      // Add to container
      if (this.modeTypeListContainer && this.modeTypeListContainer.add) {
        this.modeTypeListContainer.add(modeTypeText);
      }
    });
  }

  updateLeaderboardDisplay() {
    if (this.leaderboardEntries && this.leaderboardEntries.length > 0) {
      this.leaderboardEntries.forEach((entry) => {
        Object.values(entry).forEach((t) => t && t.destroy && t.destroy());
      });
    }
    this.leaderboardEntries = [];

    const currentModeType = this.modeTypes[this.currentModeTypeIndex];
    const currentSubmode = currentModeType.modes[this.currentSubmodeIndex];
    const modeId = currentSubmode.id;
    const isPuzzleMode = this.isPuzzleMode(modeId);
    const leaderboard = this.getLeaderboard(modeId);

    if (isPuzzleMode) {
      const entry = leaderboard[0] || {};
      const placeholders = {
        stage: entry.stage || "—",
        completion: entry.completionRate != null ? `${entry.completionRate}%` : "—",
        time: entry.time || "--:--.--",
      };

      const baseX = this.leaderboardContainer.x;
      const baseY = this.leaderboardContainer.y;

      const stageText = this.add
        .text(baseX, baseY - 20, `Best Stage: ${placeholders.stage}`, {
          fontSize: "24px",
          fill: "#ffff00",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);

      const completionText = this.add
        .text(baseX, baseY + 10, `Completion Rate: ${placeholders.completion}`, {
          fontSize: "18px",
          fill: "#ffffff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);

      const timeText = this.add
        .text(baseX, baseY + 40, `Time Taken: ${placeholders.time}`, {
          fontSize: "18px",
          fill: "#cccccc",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);

      this.leaderboardEntries.push({ stageText, completionText, timeText });
      return;
    }

    const maxEntries = 5;
    const padded = [...leaderboard];
    while (padded.length < maxEntries) padded.push(null);

    const rowHeight = 48;
    const startY =
      this.leaderboardContainer.y - ((maxEntries - 1) * rowHeight) / 2 + 30;

    padded.slice(0, maxEntries).forEach((entry, index) => {
      const y = startY + index * rowHeight;

      const formatted = this.formatLeaderboardEntry(modeId, entry);
      const leftText = this.add
        .text(this.leaderboardContainer.x - 110, y, formatted.left, {
          fontSize: "24px",
          fill: "#ffff00",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0, 0.5);

      // Stack secondary fields (middle/right) in one column
      const secondaryX = this.leaderboardContainer.x + 40;
      const middleText = this.add
        .text(secondaryX, y - rowHeight * 0.2, formatted.middle, {
          fontSize: "16px",
          fill: "#00ffff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);

      const rightText = this.add
        .text(secondaryX, y + rowHeight * 0.2, formatted.right, {
          fontSize: "16px",
          fill: "#cccccc",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5, 0.5);

      this.leaderboardEntries.push({ leftText, middleText, rightText });
    });
  }

  updateMenuDisplay() {
    const currentModeType = this.modeTypes[this.currentModeTypeIndex];
    const currentSubmode = currentModeType.modes[this.currentSubmodeIndex];

    // Update submode display
    this.submodeTitle.setText(currentSubmode.name);
    this.submodeDescription.setText(currentSubmode.description);

    // Update submode arrows (vertical navigation)
    const numSubmodes = currentModeType.modes.length;
    this.upSubmodeArrow.setStyle({
      fill: this.currentSubmodeIndex > 0 ? "#ffffff" : "#444444",
    });
    this.downSubmodeArrow.setStyle({
      fill: this.currentSubmodeIndex < numSubmodes - 1 ? "#ffffff" : "#444444",
    });

    // Recreate mode type list with updated selection highlighting
    this.createModeTypeListDisplay();

    // Update leaderboard
    this.updateLeaderboardDisplay();
  }

  startSelectedMode() {
    const currentModeType = this.modeTypes[this.currentModeTypeIndex];
    const currentSubmode = currentModeType.modes[this.currentSubmodeIndex];

    // Initialize mode manager and load the selected mode
    if (typeof getModeManager === "undefined") {
      console.error(
        "Mode manager not available - make sure mode files are loaded",
      );
      // Fallback to default mode
      this.scene.start("AssetLoaderScene", { mode: "tgm1" });
      return;
    }

    const modeManager = getModeManager();
    const gameMode = modeManager.loadMode(currentSubmode.id);

    if (!gameMode) {
      console.error(`Failed to load mode: ${currentSubmode.id}`);
      // Fallback to TGM1 mode
      this.scene.start("AssetLoaderScene", { mode: "tgm1" });
      return;
    }

    // Store the mode information for later use
    this.selectedMode = gameMode;
    this.selectedModeId = currentSubmode.id;

    // Start the AssetLoaderScene with the mode information
    this.scene.start("AssetLoaderScene", {
      mode: currentSubmode.id,
      gameMode: gameMode,
    });
  }

  isPuzzleMode(modeId) {
    return modeId === "tgm3_sakura";
  }

  // Sakura: during Ready/Go, pressing Hold advances sequence (handled by mode)
  advanceSakuraSequenceWithHold() {
    if (
      this.gameMode &&
      typeof this.gameMode.advanceSequenceWithHold === "function" &&
      this.gameMode.isReadyGoActive &&
      this.gameMode.isReadyGoActive()
    ) {
      this.gameMode.advanceSequenceWithHold(this);
    }
  }

  getLeaderboard(modeId) {
    const key = `leaderboard_${modeId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.warn("Failed to parse leaderboard", modeId, e);
      }
    }

    // Fallback: migrate legacy single best score if present
    const legacyKey = `bestScore_${modeId}`;
    const legacyStored = localStorage.getItem(legacyKey);
    if (legacyStored && this.getBestScore) {
      const legacy = this.getBestScore(modeId);
      const migrated = [legacy];
      localStorage.setItem(key, JSON.stringify(migrated));
      return migrated;
    }
    return [];
  }

  saveLeaderboardEntryToModeId(modeId, entry) {
    const key = `leaderboard_${modeId}`;
    const list = this.getLeaderboard(modeId);
    list.push(entry);
    const deduped = [];
    const seen = new Set();
    list
      .filter(Boolean)
      .sort((a, b) => this.compareEntries(modeId, a, b))
      .forEach((e) => {
        const sig = JSON.stringify({
          time: e.time,
          score: e.score,
          level: e.level,
          grade: e.grade,
          lines: e.lines,
          pps: e.pps,
        });
        if (!seen.has(sig)) {
          seen.add(sig);
          deduped.push(e);
        }
      });
    const capped = deduped.slice(0, this.isPuzzleMode(modeId) ? 1 : 5);
    localStorage.setItem(key, JSON.stringify(capped));
    this.leaderboardSaved = true;
  }

  saveLeaderboardEntry(modeId, entry) {
    this.saveLeaderboardEntryToModeId(modeId, entry);

    const selectedModeId =
      typeof this.selectedMode === "string" && this.selectedMode !== "Mode 1"
        ? this.selectedMode
        : null;

    if (selectedModeId && selectedModeId !== modeId) {
      this.saveLeaderboardEntryToModeId(selectedModeId, entry);
    }
  }

  getGradeValue(grade) {
    const gradeValues = {
      9: 0,
      8: 1,
      7: 2,
      6: 3,
      5: 4,
      4: 5,
      3: 6,
      2: 7,
      1: 8,
      S1: 9,
      S2: 10,
      S3: 11,
      S4: 12,
      S5: 13,
      S6: 14,
      S7: 15,
      S8: 16,
      S9: 17,
      M: 18,
      GM: 19,
    };
    return gradeValues[grade] || 0;
  }

  compareEntries(modeId, a, b) {
    const getVal = (val) => (val === undefined || val === null ? 0 : val);
    const parseNumTime = (t) => {
      if (!t || typeof t !== "string") return Number.POSITIVE_INFINITY;
      const parts = t.split(":");
      if (parts.length !== 2) return Number.POSITIVE_INFINITY;
      const [m, s] = parts;
      const sec = parseFloat(s);
      if (Number.isNaN(sec)) return Number.POSITIVE_INFINITY;
      const minutes = parseInt(m, 10);
      if (Number.isNaN(minutes)) return Number.POSITIVE_INFINITY;
      return minutes * 60 + sec;
    };

    const byGrade = () =>
      this.getGradeValue(getVal(b.grade)) - this.getGradeValue(getVal(a.grade));
    const byDesc = (x, y) => getVal(y) - getVal(x);
    const byAsc = (x, y) => getVal(x) - getVal(y);

    switch (modeId) {
      case "tgm2_normal": // Normal
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "easy_easy": // Easy
        return (
          byDesc(a.hanabi, b.hanabi) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "sprint_40":
      case "sprint_100": // Sprint
        return (
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.score, b.score) ||
          byDesc(a.pps, b.pps)
        );
      case "ultra": // Ultra
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.pps, b.pps)
        );
      case "marathon": // Marathon
        return (
          byDesc(a.lines, b.lines) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.pps, b.pps)
        );
      case "konoha_easy":
      case "konoha_hard": // All Clear
        return (
          byDesc(a.allClears, b.allClears) ||
          byDesc(a.level, b.level) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "tgm1":
      case "tgm2":
      case "tgm_plus":
      case "tgm3":
      case "tgm4":
      case "20g":
      case "tadeath":
      case "shirase":
      case "master20g":
      case "asuka_easy":
      case "asuka_normal":
      case "asuka_hard": // Master, 20G, Race
        return (
          byGrade() ||
          byDesc(a.level, b.level) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "tgm3_sakura": // Puzzle
        return (
          byDesc(a.stage, b.stage) ||
          byDesc(a.completionRate, b.completionRate) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      default:
        // Generic: prefer score desc, time asc
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
    }
  }

  formatLeaderboardEntry(modeId, entry) {
    if (!entry) {
      return { left: "—", middle: "—", right: "—" };
    }

    const fmtTime = (t) => t || "--:--.--";
    const fmtNum = (n) => (n === undefined || n === null ? "—" : n.toString());
    const fmtPps = (n) =>
      n === undefined || n === null ? "—" : Number(n).toFixed(2);

    switch (modeId) {
      case "tgm2_normal": // Normal
        return {
          left: fmtNum(entry.score),
          middle: fmtTime(entry.time),
          right: "",
        };
      case "easy_easy": // Easy - Hanabi | Score | Level
      case "easy_hard": // Easy Hard variant
        return {
          left: fmtNum(entry.hanabi || "—"),
          middle: fmtNum(entry.score || "—"),
          right: `L${fmtNum(entry.level || 0)}`,
        };
      case "sprint_40":
      case "sprint_100": // Sprint
        return {
          left: fmtTime(entry.time),
          middle: fmtNum(entry.score),
          right: fmtPps(entry.pps),
        };
      case "ultra": // Ultra
        return {
          left: fmtNum(entry.score),
          middle: fmtTime(entry.time),
          right: fmtPps(entry.pps),
        };
      case "marathon": // Marathon
        return {
          left: fmtNum(entry.lines),
          middle: fmtPps(entry.pps),
          right: fmtTime(entry.time),
        };
      case "konoha_easy":
      case "konoha_hard": // All Clear
        return {
          left: fmtNum(entry.allClears),
          middle: fmtNum(entry.level),
          right: fmtTime(entry.time),
        };
      case "tgm1":
      case "tgm2":
      case "tgm_plus":
      case "tgm3":
      case "tgm4":
      case "20g":
      case "tadeath":
      case "shirase":
      case "master20g":
      case "asuka_easy":
      case "asuka_normal":
      case "asuka_hard": // Master, 20G, Race
        return {
          left: entry.grade || "9",
          middle: `L${fmtNum(entry.level)}`,
          right: fmtTime(entry.time),
        };
      default:
        return {
          left: fmtNum(entry.score),
          middle: fmtNum(entry.level || ""),
          right: fmtTime(entry.time),
        };
    }
  }

  getBestScore(mode) {
    const key = `bestScore_${mode}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure all required properties exist with fallbacks
        return {
          score: parsed.score || 0,
          level: parsed.level || 0,
          grade: parsed.grade || "9",
          time: parsed.time || "--:--.--",
        };
      } catch (error) {
        console.warn(`Failed to parse stored score for mode ${mode}:`, error);
      }
    }
    return { score: 0, level: 0, grade: "9", time: "--:--.--" };
  }

  // Get difficulty color for a mode type
  getDifficultyColor(modeTypeName) {
    if (typeof getModeManager !== "undefined") {
      const modeManager = getModeManager();
      return (
        modeManager.difficultyColors[modeTypeName.toLowerCase()] || "#ffffff"
      );
    }
    // Fallback colors if mode manager not available
    const fallbackColors = {
      easy: "#00ff00", // green
      standard: "#0088ff", // blue
      master: "#888888", // grey
      "20g": "#ffff00", // yellow
      race: "#ff8800", // orange
      "all clear": "#ff69b4", // pink
      puzzle: "#8800ff", // purple
    };
    return fallbackColors[modeTypeName.toLowerCase()] || "#ffffff";
  }

  update() {
    // Check for window resize and update layout if needed
    const currentWindowWidth = window.innerWidth;
    const currentWindowHeight = window.innerHeight;

    if (
      this.windowWidth !== currentWindowWidth ||
      this.windowHeight !== currentWindowHeight
    ) {
      this.windowWidth = currentWindowWidth;
      this.windowHeight = currentWindowHeight;
      this.updateMenuLayout();
    }
  }
}

class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: "SettingsScene" });
    this.keybindLabels = {};
    this.keybindTexts = {};
    this.listeningForKey = null;
    this.keybindActions = {
      moveLeft: "Move Left",
      moveRight: "Move Right",
      softDrop: "Soft Drop",
      rotateCW: "Rotate CW",
      rotateCW2: "Rotate CW (Alt)",
      rotateCCW: "Rotate CCW",
      rotateCCW2: "Rotate CCW (Alt)",
      rotate180: "Rotate 180",
      hardDrop: "Hard Drop",
      hold: "Hold",
      pause: "Pause",
      menu: "Return to Menu",
      restart: "Restart",
    };

    // Volume controls
    this.mainVolumeLabel = null;
    this.mainVolumeText = null;
    this.mainVolumeSlider = null;
    this.mainVolumeSliderFill = null;
    this.mainVolumeKnob = null;

    this.bgmVolumeLabel = null;
    this.bgmVolumeText = null;
    this.bgmVolumeSlider = null;
    this.bgmVolumeSliderFill = null;
    this.bgmVolumeKnob = null;

    this.sfxVolumeLabel = null;
    this.sfxVolumeText = null;
    this.sfxVolumeSlider = null;
    this.sfxVolumeSliderFill = null;
    this.sfxVolumeKnob = null;

    // ARS lock reset mode toggle
    this.arsResetModeText = null;
  }

  preload() {
    const ensureImageTexture = (key, url) => {
      if (this.textures.exists(key)) {
        const existingTexture = this.textures.get(key);
        const src =
          existingTexture && existingTexture.source
            ? existingTexture.source[0]
            : null;
        if (!src || !src.image) {
          this.textures.remove(key);
        }
      }
      if (!this.textures.exists(key)) {
        this.load.image(key, url);
      }
    };

    ensureImageTexture("mino_srs", "img/mino.png");
    ensureImageTexture("mino_ars", "img/minoARS.png");
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    this.events.once("shutdown", () => {
      if (this.input && this.input.keyboard) {
        this.input.keyboard.off("keydown", this.onKeyDown, this);
      }
    });

    // Title - moved up 50px
    this.add
      .text(centerX, centerY - 200, "Settings", {
        fontSize: "36px",
        fill: "#ffffff",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    // Rotation system toggle - moved up 50px
    const rotationSystem = localStorage.getItem("rotationSystem") || "SRS";
    this.rotationText = this.add
      .text(centerX, centerY - 130, `Rotation System: ${rotationSystem}`, {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.rotationText.on("pointerdown", () => {
      const currentSystem = localStorage.getItem("rotationSystem") || "SRS";
      const newSystem = currentSystem === "SRS" ? "ARS" : "SRS";
      localStorage.setItem("rotationSystem", newSystem);
      this.rotationSystem = newSystem;
      this.rotationText.setText(`Rotation System: ${newSystem}`);
      this.updateRotationSystemDisplay(newSystem);
      this.updateArsResetModeVisibility(newSystem);
    });

    // Add T piece display under rotation system text
    this.rotationSystem = rotationSystem;
    this.tPieceDisplay = this.createTPieceDisplay(this.tPieceX, this.tPieceY, this.rotationSystem);
    // Ensure initial display uses correct texture/tint for current selection
    this.updateRotationSystemDisplay(this.rotationSystem);

    // ARS lock reset mode toggle (only relevant when ARS is selected)
    const arsResetIsMove =
      (localStorage.getItem("arsMoveReset") || "false") === "true";
    // ARS reset label (two-line: label + value)
    this.arsResetLabel = this.add
      .text(centerX, centerY - 40, "ARS Lock Reset", {
        fontSize: "18px",
        fill: "#ffffff",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    this.arsResetModeText = this.add
      .text(
        centerX,
        centerY - 20,
        arsResetIsMove ? "Move (SRS-style)" : "Step (default)",
        {
          fontSize: "18px",
          fill: "#ffffff",
          fontFamily: "Courier New",
        },
      )
      .setOrigin(0.5)
      .setInteractive();
    this.arsResetModeText.on("pointerdown", () => {
      const current = (localStorage.getItem("arsMoveReset") || "false") === "true";
      const next = !current;
      localStorage.setItem("arsMoveReset", next.toString());
      this.updateArsResetModeText(next);
    });
    this.updateArsResetModeVisibility(rotationSystem);

    // Keybind settings - moved to left side
    const keybindsX = centerX - 300; // Moved to left
    const keybindsY = centerY - 100;

    this.add
      .text(keybindsX, keybindsY - 40, "Keybinds (Click to change)", {
        fontSize: "20px",
        fill: "#ffff00",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    let yOffset = keybindsY;
    const spacing = 35;

    Object.keys(this.keybindActions).forEach((action) => {
      // Label
      this.keybindLabels[action] = this.add
        .text(keybindsX - 80, yOffset, this.keybindActions[action] + ":", {
          fontSize: "18px",
          fill: "#ffffff",
          fontFamily: "Courier New",
        })
        .setOrigin(1, 0.5); // Right-aligned

      // Current keybind
      const currentKey = this.getCurrentKeybind(action);
      this.keybindTexts[action] = this.add
        .text(keybindsX + 80, yOffset, currentKey, {
          fontSize: "18px",
          fill: "#00ff00",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0, 0.5)
        .setInteractive(); // Left-aligned

      this.keybindTexts[action].on("pointerdown", () => {
        this.startListeningForKey(action);
      });

      yOffset += spacing;
    });

    // Volume controls - moved to right side with main volume control
    const volumeX = centerX + 300; // Moved to right
    const volumeY = centerY - 100;

    // Main Volume
    this.mainVolumeLabel = this.add
      .text(volumeX, volumeY - 60, "Master Volume", {
        fontSize: "20px",
        fill: "#ffff00",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    // Main Volume slider background
    const mainSliderX = volumeX;
    const mainSliderY = volumeY - 20;
    const sliderWidth = 200;
    const sliderHeight = 10;

    this.mainVolumeSlider = this.add.graphics();
    this.mainVolumeSlider.fillStyle(0x333333);
    this.mainVolumeSlider.fillRect(
      mainSliderX - sliderWidth / 2,
      mainSliderY - sliderHeight / 2,
      sliderWidth,
      sliderHeight,
    );

    // Main Volume slider fill
    this.mainVolumeSliderFill = this.add.graphics();
    this.mainVolumeSliderFill.fillStyle(0x00ff00);
    this.mainVolumeSliderFill.fillRect(
      mainSliderX - sliderWidth / 2,
      mainSliderY - sliderHeight / 2,
      sliderWidth * this.getMasterVolume(),
      sliderHeight,
    );

    // Main Volume slider knob
    this.mainVolumeKnob = this.add.graphics();
    this.mainVolumeKnob.fillStyle(0xffffff);
    this.mainVolumeKnob.fillCircle(
      mainSliderX - sliderWidth / 2 + sliderWidth * this.getMasterVolume(),
      mainSliderY,
      8,
    );

    // Main Volume percentage text
    this.mainVolumeText = this.add
      .text(
        mainSliderX,
        mainSliderY + 30,
        `${Math.round(this.getMasterVolume() * 100)}%`,
        {
          fontSize: "16px",
          fill: "#ffffff",
          fontFamily: "Courier New",
        },
      )
      .setOrigin(0.5);

    // Make Main slider interactive
    this.mainVolumeSlider.setInteractive(
      new Phaser.Geom.Rectangle(
        mainSliderX - sliderWidth / 2,
        mainSliderY - sliderHeight / 2,
        sliderWidth,
        sliderHeight,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.mainVolumeSlider.on("pointerdown", (pointer) => {
      this.updateMainVolumeFromPointer(pointer);
    });
    this.mainVolumeSlider.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        this.updateMainVolumeFromPointer(pointer);
      }
    });

    // BGM Volume
    this.bgmVolumeLabel = this.add
      .text(volumeX, volumeY + 40, "BGM Volume", {
        fontSize: "20px",
        fill: "#ffff00",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    // BGM Volume slider background
    const bgmSliderX = volumeX;
    const bgmSliderY = volumeY + 80;

    this.bgmVolumeSlider = this.add.graphics();
    this.bgmVolumeSlider.fillStyle(0x333333);
    this.bgmVolumeSlider.fillRect(
      bgmSliderX - sliderWidth / 2,
      bgmSliderY - sliderHeight / 2,
      sliderWidth,
      sliderHeight,
    );

    // BGM Volume slider fill
    this.bgmVolumeSliderFill = this.add.graphics();
    this.bgmVolumeSliderFill.fillStyle(0x00ff00);
    this.bgmVolumeSliderFill.fillRect(
      bgmSliderX - sliderWidth / 2,
      bgmSliderY - sliderHeight / 2,
      sliderWidth * this.getBGMVolume(),
      sliderHeight,
    );

    // BGM Volume slider knob
    this.bgmVolumeKnob = this.add.graphics();
    this.bgmVolumeKnob.fillStyle(0xffffff);
    this.bgmVolumeKnob.fillCircle(
      bgmSliderX - sliderWidth / 2 + sliderWidth * this.getBGMVolume(),
      bgmSliderY,
      8,
    );

    // BGM Volume percentage text
    this.bgmVolumeText = this.add
      .text(
        bgmSliderX,
        bgmSliderY + 30,
        `${Math.round(this.getBGMVolume() * 100)}%`,
        {
          fontSize: "16px",
          fill: "#ffffff",
          fontFamily: "Courier New",
        },
      )
      .setOrigin(0.5);

    // Make BGM slider interactive
    this.bgmVolumeSlider.setInteractive(
      new Phaser.Geom.Rectangle(
        bgmSliderX - sliderWidth / 2,
        bgmSliderY - sliderHeight / 2,
        sliderWidth,
        sliderHeight,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.bgmVolumeSlider.on("pointerdown", (pointer) => {
      this.updateBGMVolumeFromPointer(pointer);
    });
    this.bgmVolumeSlider.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        this.updateBGMVolumeFromPointer(pointer);
      }
    });

    // SFX Volume
    this.sfxVolumeLabel = this.add
      .text(volumeX, volumeY + 160, "SFX Volume", {
        fontSize: "20px",
        fill: "#ffff00",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    // SFX Volume slider background
    const sfxSliderX = volumeX;
    const sfxSliderY = volumeY + 200;

    this.sfxVolumeSlider = this.add.graphics();
    this.sfxVolumeSlider.fillStyle(0x333333);
    this.sfxVolumeSlider.fillRect(
      sfxSliderX - sliderWidth / 2,
      sfxSliderY - sliderHeight / 2,
      sliderWidth,
      sliderHeight,
    );

    // SFX Volume slider fill
    this.sfxVolumeSliderFill = this.add.graphics();
    this.sfxVolumeSliderFill.fillStyle(0x00ff00);
    this.sfxVolumeSliderFill.fillRect(
      sfxSliderX - sliderWidth / 2,
      sfxSliderY - sliderHeight / 2,
      sliderWidth * this.getSFXVolume(),
      sliderHeight,
    );

    // SFX Volume slider knob
    this.sfxVolumeKnob = this.add.graphics();
    this.sfxVolumeKnob.fillStyle(0xffffff);
    this.sfxVolumeKnob.fillCircle(
      sfxSliderX - sliderWidth / 2 + sliderWidth * this.getSFXVolume(),
      sfxSliderY,
      8,
    );

    // SFX Volume percentage text
    this.sfxVolumeText = this.add
      .text(
        sfxSliderX,
        sfxSliderY + 30,
        `${Math.round(this.getSFXVolume() * 100)}%`,
        {
          fontSize: "16px",
          fill: "#ffffff",
          fontFamily: "Courier New",
        },
      )
      .setOrigin(0.5);

    // Make SFX slider interactive
    this.sfxVolumeSlider.setInteractive(
      new Phaser.Geom.Rectangle(
        sfxSliderX - sliderWidth / 2,
        sfxSliderY - sliderHeight / 2,
        sliderWidth,
        sliderHeight,
      ),
      Phaser.Geom.Rectangle.Contains,
    );
    this.sfxVolumeSlider.on("pointerdown", (pointer) => {
      this.updateSFXVolumeFromPointer(pointer);
    });
    this.sfxVolumeSlider.on("pointermove", (pointer) => {
      if (pointer.isDown) {
        this.updateSFXVolumeFromPointer(pointer);
      }
    });

    // Reset to defaults button - moved down 70px
    this.resetButton = this.add
      .text(centerX, centerY + 190, "Reset to Defaults", {
        fontSize: "18px",
        fill: "#ff8800",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.resetButton.on("pointerdown", () => {
      this.resetKeybindsToDefaults();
    });

    // Reset high scores button - moved down 70px
    this.resetScoresButton = this.add
      .text(centerX, centerY + 230, "Reset High Scores", {
        fontSize: "18px",
        fill: "#ff8800",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.resetScoresButton.on("pointerdown", () => {
      this.resetHighScores();
    });

    // Back to menu - moved down 70px
    this.backButton = this.add
      .text(centerX, centerY + 270, "Back to Menu", {
        fontSize: "24px",
        fill: "#ffffff",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5)
      .setInteractive();

    this.backButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });

    // Setup keyboard input for keybind changes
    this.input.keyboard.on("keydown", this.onKeyDown, this);
  }

  getCurrentKeybind(action) {
    const keybinds = this.getKeybinds();
    const keyCode = keybinds[action];

    // Create reverse mapping for key codes to names
    const reverseKeyMap = {};
    Object.keys(Phaser.Input.Keyboard.KeyCodes).forEach((key) => {
      reverseKeyMap[Phaser.Input.Keyboard.KeyCodes[key]] = key;
    });

    const keyName = reverseKeyMap[keyCode];

    const displayMap = {
      LEFT: "←",
      RIGHT: "→",
      UP: "↑",
      DOWN: "↓",
      SPACE: "Space",
      ESC: "Esc",
      ENTER: "Enter",
      SHIFT: "Shift",
      CTRL: "Ctrl",
      ALT: "Alt",
      BACKSPACE: "Backspace",
      TAB: "Tab",
      CAPSLOCK: "Caps Lock",
      NUMLOCK: "Num Lock",
      SCROLLLOCK: "Scroll Lock",
      PAUSE: "Pause",
      INSERT: "Insert",
      HOME: "Home",
      PAGEUP: "Page Up",
      PAGEDOWN: "Page Down",
      END: "End",
      DELETE: "Delete",
    };

    let displayName = displayMap[keyName] || keyName;
    if (!keyName) displayName = "Key " + keyCode;
    return displayName;
  }

  getKeybinds() {
    const defaultKeybinds = {
      moveLeft: Phaser.Input.Keyboard.KeyCodes.Z,
      moveRight: Phaser.Input.Keyboard.KeyCodes.C,
      softDrop: Phaser.Input.Keyboard.KeyCodes.S,
      rotateCW: Phaser.Input.Keyboard.KeyCodes.K,
      rotateCW2: Phaser.Input.Keyboard.KeyCodes.UP,
      rotateCCW: Phaser.Input.Keyboard.KeyCodes.SPACE,
      rotateCCW2: Phaser.Input.Keyboard.KeyCodes.SPACE,
      rotate180: Phaser.Input.Keyboard.KeyCodes.X,
      hold: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
      menu: Phaser.Input.Keyboard.KeyCodes.ESC, // Menu and Pause share key
      start: Phaser.Input.Keyboard.KeyCodes.ENTER,
      restart: Phaser.Input.Keyboard.KeyCodes.R,
    };

    const stored = localStorage.getItem("keybinds");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { ...defaultKeybinds, ...parsed };
      } catch (error) {
        console.warn("Failed to parse stored keybinds:", error);
      }
    }
    return defaultKeybinds;
  }

  startListeningForKey(action) {
    if (this.listeningForKey) {
      // Cancel previous listening
      this.keybindTexts[this.listeningForKey].setStyle({ fill: "#00ff00" });
    }

    this.listeningForKey = action;
    this.keybindTexts[action].setStyle({ fill: "#ffff00" });
    this.keybindTexts[action].setText("Press a key...");
  }

  onKeyDown(event) {
    if (this.listeningForKey) {
      const action = this.listeningForKey;
      const keyCode = event.keyCode;

      // Save the new keybind
      const keybinds = this.getKeybinds();
      keybinds[action] = keyCode;
      localStorage.setItem("keybinds", JSON.stringify(keybinds));

      // Update display using the same method as getCurrentKeybind
      const currentKey = this.getCurrentKeybind(action);
      this.keybindTexts[action].setText(currentKey);
      this.keybindTexts[action].setStyle({ fill: "#00ff00" });

      this.listeningForKey = null;
    }
  }

  resetKeybindsToDefaults() {
    localStorage.removeItem("keybinds");
    localStorage.removeItem("masterVolume");
    // Refresh all keybind displays
    Object.keys(this.keybindActions).forEach((action) => {
      const currentKey = this.getCurrentKeybind(action);
      this.keybindTexts[action].setText(currentKey);
    });
    // Reset volume display
    this.updateVolumeDisplay();
  }

  // Volume control methods
  getMasterVolume() {
    const volume = localStorage.getItem("masterVolume");
    return volume ? parseFloat(volume) : 1.0;
  }

  getBGMVolume() {
    const volume = localStorage.getItem("bgmVolume");
    return volume ? parseFloat(volume) : 1.0;
  }

  getSFXVolume() {
    const volume = localStorage.getItem("sfxVolume");
    return volume ? parseFloat(volume) : 1.0;
  }

  setMasterVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem("masterVolume", clampedVolume.toString());
    this.updateMainVolumeDisplay();

    // Apply master volume to all sounds
    if (this.sound) {
      this.sound.setVolume(clampedVolume);
    }
  }

  setBGMVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem("bgmVolume", clampedVolume.toString());
    this.updateBGMVolumeDisplay();

    // Apply volume to BGM sounds
    if (this.sound) {
      // Update all BGM sounds
      const bgmSounds = [
        "stage1",
        "stage2",
        "tgm2_stage1",
        "tgm2_stage2",
        "tgm2_stage3",
        "tgm2_stage4",
        "credits",
      ];
      bgmSounds.forEach((soundKey) => {
        const sound = this.sound.get(soundKey);
        if (sound) {
          const masterVolume = this.getMasterVolume();
          sound.setVolume(clampedVolume * masterVolume * 0.5); // Base volume 0.5, limited by master
        }
      });
    }
  }

  setSFXVolume(volume) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    localStorage.setItem("sfxVolume", clampedVolume.toString());
    this.updateSFXVolumeDisplay();

    // Apply volume to SFX sounds
    if (this.sound) {
      // Update all SFX sounds
      const sfxSounds = [
        "ready",
        "go",
        "gradeup",
        "complete",
        "clear",
        "fall",
        "sectionchange",
        "IRS",
        "ground",
        "lock",
        "sound_s",
        "sound_z",
        "sound_t",
        "sound_j",
        "sound_l",
        "sound_o",
        "sound_i",
      ];
      sfxSounds.forEach((soundKey) => {
        const sound = this.sound.get(soundKey);
        if (sound) {
          const masterVolume = this.getMasterVolume();
          sound.setVolume(clampedVolume * masterVolume * 0.7); // Base volume 0.7, limited by master
        }
      });
    }
  }

  updateMainVolumeFromPointer(pointer) {
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300; // Main slider X position
    const sliderWidth = 200;
    const sliderY = centerY - 20; // Main slider Y position

    // Calculate volume based on pointer position
    const relativeX = pointer.x - (sliderX - sliderWidth / 2);
    const volume = Math.max(0, Math.min(1, relativeX / sliderWidth));

    this.setMasterVolume(volume);
  }

  updateBGMVolumeFromPointer(pointer) {
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300; // BGM slider X position
    const sliderWidth = 200;
    const sliderY = centerY + 80; // BGM slider Y position (moved down 20px)

    // Calculate volume based on pointer position
    const relativeX = pointer.x - (sliderX - sliderWidth / 2);
    const volume = Math.max(0, Math.min(1, relativeX / sliderWidth));

    this.setBGMVolume(volume);
  }

  updateSFXVolumeFromPointer(pointer) {
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300; // SFX slider X position
    const sliderWidth = 200;
    const sliderY = centerY + 200; // SFX slider Y position (moved down 20px)

    // Calculate volume based on pointer position
    const relativeX = pointer.x - (sliderX - sliderWidth / 2);
    const volume = Math.max(0, Math.min(1, relativeX / sliderWidth));

    this.setSFXVolume(volume);
  }

  updateMainVolumeDisplay() {
    const volume = this.getMasterVolume();
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300;
    const sliderWidth = 200;
    const sliderY = centerY - 20;

    // Update slider fill
    if (this.mainVolumeSliderFill) {
      this.mainVolumeSliderFill.clear();
      this.mainVolumeSliderFill.fillStyle(0x00ff00);
      this.mainVolumeSliderFill.fillRect(
        sliderX - sliderWidth / 2,
        sliderY - 5,
        sliderWidth * volume,
        10,
      );
    }

    // Update knob position
    if (this.mainVolumeKnob) {
      this.mainVolumeKnob.clear();
      this.mainVolumeKnob.fillStyle(0xffffff);
      this.mainVolumeKnob.fillCircle(
        sliderX - sliderWidth / 2 + sliderWidth * volume,
        sliderY,
        8,
      );
    }

    // Update text
    if (this.mainVolumeText) {
      this.mainVolumeText.setText(`${Math.round(volume * 100)}%`);
    }
  }

  updateBGMVolumeDisplay() {
    const volume = this.getBGMVolume();
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300;
    const sliderWidth = 200;
    const sliderY = centerY + 80;

    // Update slider fill
    if (this.bgmVolumeSliderFill) {
      this.bgmVolumeSliderFill.clear();
      this.bgmVolumeSliderFill.fillStyle(0x00ff00);
      this.bgmVolumeSliderFill.fillRect(
        sliderX - sliderWidth / 2,
        sliderY - 5,
        sliderWidth * volume,
        10,
      );
    }

    // Update knob position
    if (this.bgmVolumeKnob) {
      this.bgmVolumeKnob.clear();
      this.bgmVolumeKnob.fillStyle(0xffffff);
      this.bgmVolumeKnob.fillCircle(
        sliderX - sliderWidth / 2 + sliderWidth * volume,
        sliderY,
        8,
      );
    }

    // Update text
    if (this.bgmVolumeText) {
      this.bgmVolumeText.setText(`${Math.round(volume * 100)}%`);
    }
  }

  updateSFXVolumeDisplay() {
    const volume = this.getSFXVolume();
    const centerX = this.cameras.main.width / 2;
    const sliderX = centerX + 300;
    const sliderWidth = 200;
    const sliderY = centerY + 200;

    // Update slider fill
    if (this.sfxVolumeSliderFill) {
      this.sfxVolumeSliderFill.clear();
      this.sfxVolumeSliderFill.fillStyle(0x00ff00);
      this.sfxVolumeSliderFill.fillRect(
        sliderX - sliderWidth / 2,
        sliderY - 5,
        sliderWidth * volume,
        10,
      );
    }

    // Update knob position
    if (this.sfxVolumeKnob) {
      this.sfxVolumeKnob.clear();
      this.sfxVolumeKnob.fillStyle(0xffffff);
      this.sfxVolumeKnob.fillCircle(
        sliderX - sliderWidth / 2 + sliderWidth * volume,
        sliderY,
        8,
      );
    }

    // Update text
    if (this.sfxVolumeText) {
      this.sfxVolumeText.setText(`${Math.round(volume * 100)}%`);
    }
  }

  resetKeybindsToDefaults() {
    localStorage.removeItem("keybinds");
    localStorage.removeItem("masterVolume");
    localStorage.removeItem("bgmVolume");
    localStorage.removeItem("sfxVolume");
    // Refresh all keybind displays
    Object.keys(this.keybindActions).forEach((action) => {
      const currentKey = this.getCurrentKeybind(action);
      this.keybindTexts[action].setText(currentKey);
    });
    // Reset volume displays
    this.updateMainVolumeDisplay();
    this.updateBGMVolumeDisplay();
    this.updateSFXVolumeDisplay();
  }

  resetHighScores() {
    // Get all mode types from MenuScene
    const modeTypes = [
      {
        name: "EASY",
        modes: [
          {
            id: "tgm2_normal",
            name: "Normal",
            description: "Score as many points as you can within 300 levels!",
          },
          {
            id: "easy_easy",
            name: "Easy",
            description: "Clear lines, light fireworks. Have fun!",
          },
        ],
      },
      {
        name: "STANDARD",
        modes: [
          {
            id: "sprint_40",
            name: "Sprint 40L",
            description: "Clear 40 lines as fast as possible",
          },
          {
            id: "sprint_100",
            name: "Sprint 100L",
            description: "Clear 100 lines as fast as possible",
          },
          { id: "ultra", name: "Ultra", description: "2-minute score attack" },
          { id: "marathon", name: "Marathon", description: "Clear 150 lines" },
          { id: "zen", name: "Zen", description: "Endless relaxed play" },
        ],
      },
      {
        name: "MASTER",
        modes: [
          {
            id: "tgm1",
            name: "TGM1",
            description:
              "The Tetris game you know and love. Scale through the grades and be a Grand Master!",
          },
          {
            id: "tgm2",
            name: "TGM2",
            description:
              "Brand new mechanics, brand new challenges! Do you have what it takes?",
          },
          {
            id: "tgm3",
            name: "TGM3",
            description: "Try to be COOL!!, or you will REGRET!! it",
          },
          { id: "tgm4", name: "TGM4", description: "Patience is key..." },
          {
            id: "tgm_plus",
            name: "TGM+",
            description: "Rising garbage mode. Master the art of survival!",
          },
        ],
      },
      {
        name: "20G",
        modes: [
          {
            id: "20g",
            name: "20G",
            description: "Maximum gravity from the start! Good luck!",
          },
          {
            id: "tadeath",
            name: "T.A.Death",
            description: "Difficult 20G challenge mode. Speed is key!",
          },
          {
            id: "shirase",
            name: "Shirase",
            description: "Lightning-fast speeds. Do you have what it takes?",
          },
          {
            id: "master20g",
            name: "Master",
            description:
              "Brand new, unique game mechanics. Can you handle them?",
          },
        ],
      },
      {
        name: "RACE",
        modes: [
          {
            id: "asuka_easy",
            name: "Asuka Easy",
            description: "20G Tetris stacking introduction",
          },
          {
            id: "asuka_normal",
            name: "Asuka",
            description: "Race mode. Finish 1300 levels in 7 minutes.",
          },
          {
            id: "asuka_hard",
            name: "Asuka Hard",
            description: "The true test of skill and speed!",
          },
        ],
      },
      {
        name: "ALL CLEAR",
        modes: [
          {
            id: "konoha_easy",
            name: "Konoha Easy",
            description: "Easy all-clear challenge with 5 pieces!",
          },
          {
            id: "konoha_hard",
            name: "Konoha Hard",
            description: "Hard all-clear challenge with all 7 pieces!",
          },
        ],
      },
      {
        name: "PUZZLE",
        modes: [
          {
            id: "tgm3_sakura",
            name: "TGM3-Sakura",
            description: "Puzzle mode from TGM3",
          },
          {
            id: "flashpoint",
            name: "Flashpoint",
            description: "From Flashpoint.",
          },
        ],
      },
    ];

    // Clear all high scores
    modeTypes.forEach((modeType) => {
      modeType.modes.forEach((mode) => {
        localStorage.removeItem(`bestScore_${mode.id}`);
        localStorage.removeItem(`leaderboard_${mode.id}`);
      });
    });

    // Show confirmation message
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const confirmationText = this.add
      .text(centerX, centerY + 320, "High scores reset to defaults!", {
        fontSize: "16px",
        fill: "#00ff00",
        fontFamily: "Courier New",
      })
      .setOrigin(0.5);

    // Remove confirmation after 2 seconds
    this.time.delayedCall(2000, () => {
      confirmationText.destroy();
    });
  }

  createTPieceDisplay(centerX, centerY, system = this.rotationSystem) {
    const container = this.add.container(centerX, centerY);

    // Create T piece minos
    const minoSize = 20;
    const minos = [];

    // Get T piece shape and color based on rotation system
    const rotations =
      system === "ARS" ? SEGA_ROTATIONS.T.rotations : TETROMINOES.T.rotations;
    const color = system === "ARS" ? ARS_COLORS.T : TETROMINOES.T.color;
    const textureKey = system === "ARS" ? "mino_ars" : "mino_srs";

    // T piece shape in rotation 0 (3-wide)
    const shape = rotations[0];

    // Create mino sprites - use actual textures if available, otherwise fallback to colored rectangles
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (shape[r][c]) {
          // Center the T piece around (0,0) in the container
          const offsetX = (c - 1) * minoSize; // Center horizontally around c=1
          const offsetY = (r - 0.5) * minoSize; // Center vertically around r=0.5 (middle of the T)

          const texture = this.textures ? this.textures.get(textureKey) : null;
          const textureSource = texture && texture.source ? texture.source[0] : null;
          const hasValidTextureSource =
            !!texture && !!textureSource && !!textureSource.image;
          if (hasValidTextureSource) {
            const sprite = this.add.sprite(offsetX, offsetY, textureKey);
            sprite.setDisplaySize(minoSize, minoSize);
            sprite.setTint(color);
            minos.push(sprite);
            container.add(sprite);
          } else {
            // Fallback: create colored rectangle
            const graphics = this.add.graphics();
            graphics.fillStyle(color);
            graphics.fillRect(
              offsetX - minoSize / 2,
              offsetY - minoSize / 2,
              minoSize,
              minoSize,
            );
            minos.push(graphics);
            container.add(graphics);
          }
        }
      }
    }

    return { container, minos, rotation: 0 };
  }

  updateRotationSystemDisplay(newSystem) {
    this.rotationSystem = newSystem;

    // Rebuild T piece display to ensure correct texture/color
    if (this.tPieceDisplay && this.tPieceDisplay.container) {
      this.tPieceDisplay.container.destroy(true);
    }
    const centerX = this.tPieceX || this.cameras.main.width / 2;
    const centerY = this.tPieceY || this.cameras.main.height / 2 - 90;
    this.tPieceDisplay = this.createTPieceDisplay(centerX, centerY, newSystem);

    // Animate 360-degree rotation with the new shape/color
    this.tweens.add({
      targets: this.tPieceDisplay.container,
      angle: 360,
      duration: 600,
      ease: "Power2",
      onComplete: () => {
        // Reset angle to 0
        this.tPieceDisplay.container.angle = 0;
      },
    });
  }

  updateTPieceShape(tPiece, rotations, system) {
    const minoSize = 20;
    const color = system === "ARS" ? ARS_COLORS.T : TETROMINOES.T.color;
    const textureKey = system === "ARS" ? "mino_ars" : "mino_srs";

    // Get current rotation (keep same rotation index)
    const currentRotation = tPiece.rotation;
    const shape = rotations[currentRotation];

    // Clear existing minos and recreate them
    tPiece.minos.forEach((mino) => mino.destroy());
    tPiece.minos.length = 0;

    // Recreate mino sprites/graphics with new shape
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (shape[r][c]) {
          // Center the T piece around (0,0) in the container
          const offsetX = (c - 1) * minoSize; // Center horizontally around c=1
          const offsetY = (r - 0.5) * minoSize; // Center vertically around r=0.5

          const texture = this.textures ? this.textures.get(textureKey) : null;
          const textureSource = texture && texture.source ? texture.source[0] : null;
          const hasValidTextureSource =
            !!texture && !!textureSource && !!textureSource.image;
          if (hasValidTextureSource) {
            const sprite = this.add.sprite(offsetX, offsetY, textureKey);
            sprite.setDisplaySize(minoSize, minoSize);
            sprite.setTint(color);
            tPiece.minos.push(sprite);
            tPiece.container.add(sprite);
          } else {
            // Fallback: create colored rectangle
            const graphics = this.add.graphics();
            graphics.fillStyle(color);
            graphics.fillRect(
              offsetX - minoSize / 2,
              offsetY - minoSize / 2,
              minoSize,
              minoSize,
            );
            tPiece.minos.push(graphics);
            tPiece.container.add(graphics);
          }
        }
      }
    }
  }

  updateArsResetModeText(isMoveReset) {
    if (!this.arsResetModeText) return;
    this.arsResetModeText.setText(
      isMoveReset ? "Move (SRS-style)" : "Step (default)",
    );
  }

  updateArsResetModeVisibility(rotationSystem) {
    const visible = rotationSystem === "ARS";
    if (this.arsResetModeText) this.arsResetModeText.setVisible(visible);
    if (this.arsResetLabel) this.arsResetLabel.setVisible(visible);
  }
}

class AssetLoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "AssetLoaderScene" });
  }

  init(data) {
    this.selectedMode = data.mode || "Mode 1";
    this.gameMode = data.gameMode || null; // Store gameMode from data


  }

  preload() {
    // Show loading text
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.loadingText = this.add
      .text(centerX, centerY, "LOADING...", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const ensureImageTexture = (key, url) => {
      if (this.textures.exists(key)) {
        const existingTexture = this.textures.get(key);
        const src = existingTexture && existingTexture.source ? existingTexture.source[0] : null;
        if (!src || !src.image) {
          this.textures.remove(key);
        }
      }
      if (!this.textures.exists(key)) {
        this.load.image(key, url);
      }
    };

    // Load all assets for the game
    ensureImageTexture("mino_srs", "img/mino.png");
    ensureImageTexture("mino_ars", "img/minoARS.png");

    // Load BGM files from the correct directory paths
    try {
      // Load MP3 files from bgm directory (Phaser compatible)
      if (!this.cache.audio.exists("stage1")) {
        this.load.audio("stage1", "bgm/tm1_1.mp3");
      }
      if (!this.cache.audio.exists("stage2")) {
        this.load.audio("stage2", "bgm/tm1_2.mp3");
      }
      if (!this.cache.audio.exists("credits")) {
        this.load.audio("credits", "bgm/tm1_endroll.mp3");
      }

      // Load TGM2 BGM files
      if (!this.cache.audio.exists("tgm2_stage1")) {
        this.load.audio("tgm2_stage1", "bgm/tm1_1.mp3");
      }
      if (!this.cache.audio.exists("tgm2_stage2")) {
        this.load.audio("tgm2_stage2", "bgm/tm1_2.mp3");
      }
      if (!this.cache.audio.exists("tgm2_stage3")) {
        this.load.audio("tgm2_stage3", "bgm/tm2_3.mp3");
      }
      if (!this.cache.audio.exists("tgm2_stage4")) {
        this.load.audio("tgm2_stage4", "bgm/tm2_4.mp3");
      }
    } catch (error) {
      console.warn("BGM files could not be loaded from bgm directory", error);
    }

    // Load all sound effects
    if (!this.cache.audio.exists("ready")) {
      this.load.audio("ready", "sfx/ready.wav");
    }
    if (!this.cache.audio.exists("go")) {
      this.load.audio("go", "sfx/go.wav");
    }
    if (!this.cache.audio.exists("gradeup")) {
      this.load.audio("gradeup", "sfx/gradeup.wav");
    }
    if (!this.cache.audio.exists("complete")) {
      this.load.audio("complete", "sfx/complete.wav");
    }
    if (!this.cache.audio.exists("clear")) {
      this.load.audio("clear", "sfx/clear.wav");
    }
    if (!this.cache.audio.exists("fall")) {
      this.load.audio("fall", "sfx/fall.wav");
    }
    if (!this.cache.audio.exists("sectionchange")) {
      this.load.audio("sectionchange", "sfx/sectionchange.wav");
    }

    if (!this.cache.audio.exists("IRS")) {
      this.load.audio("IRS", "sfx/IRS.wav");
    }
    if (!this.cache.audio.exists("ground")) {
      this.load.audio("ground", "sfx/ground.wav");
    }
    if (!this.cache.audio.exists("lock")) {
      this.load.audio("lock", "sfx/lock.wav");
    }
    if (!this.cache.audio.exists("sound_s")) {
      this.load.audio("sound_s", "sfx/s.wav");
    }
    if (!this.cache.audio.exists("sound_z")) {
      this.load.audio("sound_z", "sfx/z.wav");
    }
    if (!this.cache.audio.exists("sound_t")) {
      this.load.audio("sound_t", "sfx/t.wav");
    }
    if (!this.cache.audio.exists("sound_j")) {
      this.load.audio("sound_j", "sfx/j.wav");
    }
    if (!this.cache.audio.exists("sound_l")) {
      this.load.audio("sound_l", "sfx/l.wav");
    }
    if (!this.cache.audio.exists("sound_o")) {
      this.load.audio("sound_o", "sfx/o.wav");
    }
    if (!this.cache.audio.exists("sound_i")) {
      this.load.audio("sound_i", "sfx/i.wav");
    }
  }

  create() {
    // Remove loading text and start game scene
    if (this.loadingText) {
      this.loadingText.destroy();
    }

    // Proceed to loading/ready-go scene
    this.scene.start("LoadingScreenScene", {
      mode: this.selectedMode,
      gameMode: this.gameMode,
    });
  }
}

class LoadingScreenScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoadingScreenScene" });
  }

  init(data) {
    this.selectedMode = data.mode || "Mode 1";
    this.gameMode = data.gameMode || null; // Store gameMode from data

  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Show loading text briefly, then proceed directly to GameScene
    const loading = this.add
      .text(centerX, centerY, "LOADING...", {
        fontSize: "48px",
        fill: "#ffffff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.time.delayedCall(300, () => {
      if (loading) loading.destroy();
      this.scene.start("GameScene", {
        mode: this.selectedMode,
        gameMode: this.gameMode,
      });
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.board = new Board();
    this.currentPiece = null;
    this.holdPiece = null;
    this.canHold = true;
    this.nextPieces = []; // Initialize next pieces array
    this.gravityTimer = 0.0;
    this.gravityAccum = 0.0;
    // lockDelay is a timer; lockDelayMax is the per-mode limit
    this.lockDelay = 0;
    this.lockDelayMax = 0.5;
    this.lockResetCount = 0; // Number of lock delay resets on current piece (SRS limit)
    // defer starting the lock timer until after the first grounded frame
    this.lockDelayBufferedStart = false;
    this.lastGroundedY = null; // Track last grounded row for ARS lock reset rule
    this.isGrounded = false;
    this.level = getStartingLevel(); // Set starting level from URL parameter
    this.startingLevel = this.level; // Preserve the starting level for restarts
    this.piecesPlaced = 0; // Track pieces for level system
    this.score = 0;
    this.grade = "9";
    this.internalGrade = 0;
    this.gradeDisplay = null;
    this.gradeText = null;
    this.gradePointsText = null;
    this.nextGradeText = null;
    this.levelDisplay = null;
    this.playfieldBorder = null;
    this.gameOver = false;
    this.visibleRows = 20; // Only show bottom 20 rows of the 22-row matrix
    // Calculate cell size and positioning for full screen
    this.calculateLayout();
    this.visibleRows = 20; // Only show bottom 20 rows of the 22-row matrix
    // Calculate cell size and positioning for full screen
    this.calculateLayout();

    // DAS (Delayed Auto Shift) variables - will be set by mode
    this.dasDelay = 16 / 60; // seconds until auto-repeat starts
    this.arrDelay = 1 / 60; // seconds between repeats
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.leftTimer = 0;
    this.rightTimer = 0;
    this.leftInRepeat = false;
    this.rightInRepeat = false;

    // Rotation and action key states
    this.kKeyPressed = false;
    this.spaceKeyPressed = false;
    this.lKeyPressed = false;
    this.rotate180Pressed = false;
    this.xKeyPressed = false;

    // ARE (Appearance Delay) - will be set by mode
    this.areDelay = 30 / 60; // seconds until next piece appears
    this.areTimer = 0;
    this.areActive = false;
    this.lineClearDelayActive = false;
    this.lineClearDelayDuration = 0;
    this.pendingLineAREDelay = 0;

    // Line clear animation tracking
    this.clearedLines = []; // Lines being cleared for animation
    this.isClearingLines = false; // Flag for line clear animation phase
    this.lineClearPhase = false; // True during line clear ARE, false during normal ARE

    // ARE input tracking for IRS/IHS/DAS
    this.areRotationDirection = 0;
    this.areHoldPressed = false;
    this.areLeftHeld = false;
    this.areRightHeld = false;
    this.areRotationKeys = { k: false, space: false, l: false }; // Track which rotation keys are held during ARE

    // Enhanced scoring system
    this.comboCount = -1; // -1 means no combo active
    this.lastClearType = null; // 'single', 'double', 'triple', 'tetris', 'tspin'
    this.backToBack = false;
    this.totalLines = 0;
    this.lastPieceType = null;
    this.spinRotatedWhileGrounded = false;

    this.isTSpin = false;

    // Piece active time tracking for scoring
    this.pieceActiveTime = 0;
    this.pieceSpawnTime = 0;

    // Drop tracking for scoring
    this.softDropRows = 0;
    this.hardDropRows = 0;

    // Time tracking for grade system
    this.startTime = null;
    this.currentTime = 0;
    this.bestTime = null;
    this.gradeHistory = [];
    this.sectionTimes = {}; // Track time for each 100-level section

    this.sectionStartTime = 0;
    this.currentSection = 0;
    this.sectionTetrises = {};
    this.currentSectionTetrisCount = 0;

    // Piece per second tracking
    this.totalPiecesPlaced = 0; // Total pieces that have entered the playfield
    this.activeTime = 0; // Time spent not in ARE (piece movement time)
    this.areTime = 0; // Time spent in ARE phases
    this.conventionalPPS = 0; // PPS including ARE time
    this.rawPPS = 0; // PPS excluding ARE time
    this.maxPpsRecorded = 0;
    this.worstChoke = 0; // Longest active time (frames) for a single piece
    this.ppsHistory = [];
    this.lastPpsRecordedPieceCount = 0;
    this.ppsGraphGraphics = null;
    this.ppsGraphArea = null;
    this.ppsSummaryText = null;

    // Leaderboard tracking
    this.leaderboardSaved = false;

    // Finesse tracking (SRS only)
    this.finesseEnabled = false;
    this.finesseErrors = 0;
    this.finessePieces = 0;
    this.finesseStreak = 0;
    this.finesseCurrentInputs = { moves: 0, rotations: 0 };
    this.finesseTexts = {
      header: null,
      streakAcc: null,
      errors: null,
    };
    this.finesseActiveForPiece = false;
    this.finesseLastAccuracy = 0;

    // Sections and level caps
    this.sectionCap = 99; // Start at first section cap
    this.sectionTransition = false;
    this.sectionMessage = null;
    this.sectionMessageTimer = 0;

    // Piece randomizer history (TGM1 system)
    this.pieceHistory = ["Z", "Z", "S", "S"]; // Start with [Z,Z,S,S] as specified
    this.pieceHistoryIndex = 0; // Current position in history for rotation
    this.firstPiece = true; // Track if this is the first piece
    this.isFirstSpawn = true; // Track if this is the first spawn for level setting

    // Validate piece history to ensure it's correct
    this.validatePieceHistory();
    // Reset spin/hanabi for new run
    this.spinRotatedWhileGrounded = false;
    this.hanabiCounter = 0;
    this.clearHanabiParticles();

    // Pause functionality
    this.isPaused = false;
    this.pauseOverlay = null;

    // BGM system
    this.stage1BGM = null;
    this.stage2BGM = null;
    this.currentBGM = null;
    this.bgmEnabled = true;

    // Loop point configuration for BGM tracks
    this.loopPoints = {
      stage1: { start: 56.862, end: 113.708 },
      stage2: { start: 97.622, end: 203.217 },
    };

    this.bgmLoopTimer = null;

    // Track if BGM has been played for the first time
    this.bgmFirstPlay = {
      stage1: true,
      stage2: true,
    };

    // Re-apply mode timing configuration in case restart reset defaults
    this.applyModeConfiguration();

    // Credits system
    this.creditsActive = false;
    this.creditsTimer = 0;
    this.creditsDuration = 61.6; // 61.60 seconds
    this.creditsText = null;
    this.creditsScrollSpeed = 0.5; // pixels per frame
    this.creditsAlpha = 1;
    this.congratulationsActive = false;
    this.gameComplete = false;
    this.level999Reached = false; // Track when level 999 is reached for TGM behavior
    this.creditsFinalized = false;
    this.rollFailedDuringRoll = false;

    this.invisibleStackActive = false;
    this.fadingRollActive = false;
    this.minoFadeActive = false;
    this.minoFadeProgress = 0;
    this.minoFadeDelay = 30 / 60; // seconds between each row fade (will be calculated dynamically)
    this.minoFadeTimer = 0;
    this.minoFadePerRowDuration = 0;
    this.placedMinos = []; // Track all placed minos for fading
    this.placedMinoRows = []; // Track rows containing minos for row-by-row fading
    this.fadingComplete = false; // Track when fading is complete
    this.minoRowFadeAlpha = {}; // Row -> alpha during fading
    this.rollType = null; // 'fading' or 'mroll'
    this.rollLinesCleared = 0;
    this.gameOverFadeDoneTime = null;
    this.showGameOverText = false;
    this.gameOverMessage = "GAME OVER";

    this.gameOverTextDelay = 3; // seconds until GAME OVER text appears
    this.gameOverTextTimer = 0;
    this.showGameOverText = false;

    // GM grade tracking
    this.gmConditions = {
      level300: { achieved: false, time: 0, score: 0 },
      level500: { achieved: false, time: 0, score: 0 },
      level999: { achieved: false, time: 0, score: 0 },
    };

    // Rotation system selection
    this.rotationSystem =
      localStorage.getItem("rotationSystem") || "SRS"; // 'SRS' or 'ARS'
    this.arsMoveResetEnabled =
      (localStorage.getItem("arsMoveReset") || "false") === "true";
    this.rotationSystemDisplay = null;

    // Keybind and IRS display
    this.irsActivated = false;

    // FPS limiter
    this.lastUpdateTime = 0;
    this.deltaTime = 1 / 60; // Default delta time

    // Pause time tracking
    this.pauseStartTime = null;
    this.totalPausedTime = 0;

    // Mode and best score tracking
    this.selectedMode = null;
    this.gameMode = null; // Will be set by init method

    // Loading and ready-go phases
    this.loadingPhase = true;
    this.readyGoPhase = false;
    this.gameStarted = false;

    // Game over timer
    this.gameOverTimer = 0;

    // Soft drop ground sound tracking
    this.wasGroundedDuringSoftDrop = false;
  }

  // Get border color based on selected mode
  getModeTypeBorderColor() {
    if (
      this.gameMode &&
      this.gameMode.modeId &&
      typeof getModeManager !== "undefined"
    ) {
      const modeManager = getModeManager();
      const color = modeManager.modeColors[this.gameMode.modeId];
      return color || 0xffffff;
    }

    return 0xffffff; // Default white
  }

  formatTimeValue(seconds) {
    if (seconds === null || seconds === undefined) return "--:--.--";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    return `${minutes}:${secs.toString().padStart(2, "0")}.${cs
      .toString()
      .padStart(2, "0")}`;
  }

  getSectionLength() {
    return this.selectedMode === "marathon" ? 10 : 100;
  }

  getSectionBasisValue() {
    return this.selectedMode === "marathon" ? this.totalLines : this.level;
  }

  // Finesse tracking helpers
  incrementFinesseMove() {
    if (
      !this.finesseEnabled ||
      !this.finesseActiveForPiece ||
      !this.currentPiece ||
      !this.currentPiece.finesseInputs
    ) {
      return;
    }
    this.currentPiece.finesseInputs.moves += 1;
  }

  incrementFinesseRotation() {
    if (
      !this.finesseEnabled ||
      !this.finesseActiveForPiece ||
      !this.currentPiece ||
      !this.currentPiece.finesseInputs
    ) {
      return;
    }
    this.currentPiece.finesseInputs.rotations += 1;
  }

  resetFinessePieceInputs(piece) {
    if (!piece || !this.finesseEnabled) return;
    piece.finesseInputs = { moves: 0, rotations: 0 };
    this.finesseActiveForPiece = true;
  }

  evaluateFinesseOnLock(piece) {
    if (!this.finesseEnabled || !piece) return;
    const leftCol = getLeftmostColumn(piece);
    const minimalMoves = getSrsMinimalMoves(piece.type, piece.rotation, leftCol);
    const minimalRotations = getSrsMinimalRotations(piece.type, piece.rotation);
    if (minimalMoves === null || minimalRotations === null) {
      return;
    }
    const actual = computeFinesseActual(piece);
    const isError = actual.moves > minimalMoves || actual.rotations > minimalRotations;
    this.finessePieces += 1;
    if (isError) {
      this.finesseErrors += 1;
      this.finesseStreak = 0;
    } else {
      this.finesseStreak += 1;
    }
    const clean = Math.max(0, this.finessePieces - this.finesseErrors);
    this.finesseLastAccuracy =
      this.finessePieces > 0 ? (clean / this.finessePieces) * 100 : 100;
    this.updateFinesseUI();
  }

  updateFinesseUI() {
    const { header, streakAcc, errors } = this.finesseTexts;
    const visible = this.finesseEnabled && header && streakAcc && errors;
    if (!header || !streakAcc || !errors) return;
    header.setVisible(visible);
    streakAcc.setVisible(visible);
    errors.setVisible(visible);
    if (!visible) return;
    const streakVal = this.finesseStreak;
    const accVal =
      this.finessePieces > 0
        ? Math.max(0, Math.min(100, this.finesseLastAccuracy))
        : 100;
    const errorVal = this.finesseErrors;
    streakAcc.setText(`${streakVal.toString()}   ${accVal.toFixed(1)}%`);
    errors.setText(`${errorVal} errors`);
  }

  getMaxSectionsForTracker() {
    if (this.selectedMode === "marathon") {
      const targetLines =
        this.gameMode && typeof this.gameMode.targetLines === "number"
          ? this.gameMode.targetLines
          : 999;
      return Math.ceil(targetLines / this.getSectionLength());
    }
    return 10;
  }

  isPuzzleMode(modeId) {
    return modeId === "tgm3_sakura";
  }

  getGradeValue(grade) {
    const gradeValues = {
      9: 0,
      8: 1,
      7: 2,
      6: 3,
      5: 4,
      4: 5,
      3: 6,
      2: 7,
      1: 8,
      S1: 9,
      S2: 10,
      S3: 11,
      S4: 12,
      S5: 13,
      S6: 14,
      S7: 15,
      S8: 16,
      S9: 17,
      M: 18,
      GM: 19,
    };
    return gradeValues[grade] || 0;
  }

  compareEntries(modeId, a, b) {
    const getVal = (val) => (val === undefined || val === null ? 0 : val);
    const parseNumTime = (t) => {
      if (!t || typeof t !== "string") return Number.POSITIVE_INFINITY;
      const parts = t.split(":");
      if (parts.length !== 2) return Number.POSITIVE_INFINITY;
      const [m, s] = parts;
      const sec = parseFloat(s);
      if (Number.isNaN(sec)) return Number.POSITIVE_INFINITY;
      const minutes = parseInt(m, 10);
      if (Number.isNaN(minutes)) return Number.POSITIVE_INFINITY;
      return minutes * 60 + sec;
    };

    const byGrade = () =>
      this.getGradeValue(getVal(b.grade)) - this.getGradeValue(getVal(a.grade));
    const byDesc = (x, y) => getVal(y) - getVal(x);
    const byAsc = (x, y) => getVal(x) - getVal(y);

    switch (modeId) {
      case "tgm2_normal": // Normal
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "easy_easy": // Easy
        return (
          byDesc(a.hanabi, b.hanabi) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "sprint_40":
      case "sprint_100": // Sprint
        return (
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.score, b.score) ||
          byDesc(a.pps, b.pps)
        );
      case "ultra": // Ultra
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.pps, b.pps)
        );
      case "marathon": // Marathon
        return (
          byDesc(a.lines, b.lines) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.pps, b.pps)
        );
      case "konoha_easy":
      case "konoha_hard": // All Clear
        return (
          byDesc(a.allClears, b.allClears) ||
          byDesc(a.level, b.level) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "tgm1":
      case "tgm2":
      case "tgm_plus":
      case "tgm3":
      case "tgm4":
      case "20g":
      case "tadeath":
      case "shirase":
      case "master20g":
      case "asuka_easy":
      case "asuka_normal":
      case "asuka_hard": // Master, 20G, Race
        return (
          byGrade() ||
          byDesc(a.level, b.level) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "tgm3_sakura": // Puzzle
        return (
          byDesc(a.stage, b.stage) ||
          byDesc(a.completionRate, b.completionRate) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      default:
        // Generic: prefer score desc, time asc
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
    }
  }

  init(data) {
 
    this.selectedMode = data.mode || "Mode 1";
    this.gameMode = data.gameMode || null;

 

    // Load mode if not provided
    if (!this.gameMode && typeof getModeManager !== "undefined") {
      const modeManager = getModeManager();
      this.gameMode = modeManager.getMode(this.selectedMode);
    } else if (this.gameMode === null) {
      const modeManager = getModeManager();
      this.gameMode = modeManager.getMode(this.selectedMode);
    }

    // Fallback to default if no mode loaded
    if (!this.gameMode) {
      console.warn("No game mode loaded, using fallback configuration");
      this.gameMode = {
        getConfig: () => ({
          gravity: { type: "tgm1", value: 0, curve: null },
          das: 16 / 60,
          arr: 1 / 60,
          are: 30 / 60,
          lockDelay: 0.5,
          nextPieces: 1,
          holdEnabled: false,
          ghostEnabled: true,
          levelUpType: "piece",
          lineClearBonus: 1,
          gravityLevelCap: 999,
          specialMechanics: {},
        }),
        getGravitySpeed: (level) => this.getTGM1GravitySpeed(level),
        getName: () => "Fallback Mode",
      };
    }

    // Apply mode configuration to game settings
    this.applyModeConfiguration();
  }

  markGroundedSpin() {
    this.spinRotatedWhileGrounded = true;
    if (
      this.gameMode &&
      typeof this.gameMode.onRotateWhileGrounded === "function"
    ) {
      this.gameMode.onRotateWhileGrounded(this);
    }
  }

  spawnHanabiBurst(count = 1) {
    if (!this.hanabiContainer) return;
    const particlesToSpawn = Math.min(
      this.hanabiMaxActive - this.hanabiParticles.length,
      Math.max(2, Math.min(12, count * 3)),
    );
    const originX = this.matrixOffsetX + (this.cellSize * this.board.cols) / 2;
    const originY = this.matrixOffsetY + (this.cellSize * this.visibleRows) / 3;
    for (let i = 0; i < particlesToSpawn; i++) {
      let g = this.hanabiPool.pop();
      if (!g) {
        g = this.add.graphics();
      } else {
        g.clear();
      }
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 60;
      const life = 0.35 + Math.random() * 0.2;
      const radius = 2 + Math.random() * 2;
      const color = Phaser.Display.Color.GetColor(
        200 + Math.floor(Math.random() * 55),
        200 + Math.floor(Math.random() * 55),
        120 + Math.floor(Math.random() * 135),
      );
      g.fillStyle(color, 1);
      g.fillCircle(0, 0, radius);
      g.x = originX;
      g.y = originY;
      g.setDepth(1000);
      this.hanabiContainer.add(g);
      this.hanabiParticles.push({
        g,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        life,
      });
    }
    this.hanabiCounter += count;
  }

  updateHanabiParticles(deltaTime) {
    if (!this.hanabiParticles.length) return;
    const remaining = [];
    for (const p of this.hanabiParticles) {
      p.life -= deltaTime;
      if (p.life <= 0) {
        p.g.clear();
        p.g.setVisible(false);
        this.hanabiPool.push(p.g);
        continue;
      }
      p.vy += 120 * deltaTime;
      p.g.x += p.vx * deltaTime;
      p.g.y += p.vy * deltaTime;
      p.g.setAlpha(Math.max(0, p.life / 0.5));
      remaining.push(p);
    }
    this.hanabiParticles = remaining;
  }

  clearHanabiParticles() {
    this.hanabiParticles.forEach((p) => {
      if (p.g) {
        p.g.clear();
        p.g.destroy();
      }
    });
    this.hanabiParticles = [];
    this.hanabiPool = [];
  }

  updatePlacementHint() {
    if (!this.hintGraphics) return;
    this.hintGraphics.clear();
    if (
      !this.currentPiece ||
      this.areActive ||
      this.lineClearPhase ||
      this.isPaused ||
      this.gameOver
    ) {
      return;
    }
    const placements = [];
    const rotations = [0, 1, 2, 3];
    const pieceType = this.currentPiece.type;
    for (const rot of rotations) {
      const testPiece = new Piece(pieceType, this.rotationSystem, rot);
      const shape = testPiece.shape;
      const width = shape[0].length;
      for (let x = -2; x < this.board.cols; x++) {
        let testX = x;
        let testY = -4;
        const tmpPiece = new Piece(pieceType, this.rotationSystem, rot);
        tmpPiece.x = testX;
        tmpPiece.y = testY;
        // Move down until collision
        while (
          this.board.isValidPosition(tmpPiece, tmpPiece.x, tmpPiece.y + 1)
        ) {
          tmpPiece.y += 1;
        }
        if (!this.board.isValidPosition(tmpPiece, tmpPiece.x, tmpPiece.y)) {
          continue;
        }
        // Skip if out of bounds horizontally
        if (tmpPiece.x < -2 || tmpPiece.x + width > this.board.cols + 2) {
          continue;
        }
        // Simple score: holes and height
        let holes = 0;
        let maxY = 0;
        for (let r = 0; r < tmpPiece.shape.length; r++) {
          for (let c = 0; c < tmpPiece.shape[r].length; c++) {
            if (!tmpPiece.shape[r][c]) continue;
            const bx = tmpPiece.x + c;
            const by = tmpPiece.y + r;
            maxY = Math.max(maxY, by);
            // If empty below and within bounds, count hole risk
            if (by + 1 < this.board.rows) {
              if (this.board.grid[by + 1][bx] === 0) holes += 1;
            }
          }
        }
        const score = holes * 100 + maxY;
        placements.push({ score, piece: tmpPiece });
      }
    }
    if (!placements.length) return;
    placements.sort((a, b) => a.score - b.score);
    this.hintPlacement = placements[0].piece;
    const startRow = 2;
    const cell = this.cellSize;
    const offX = this.matrixOffsetX;
    const offY = this.matrixOffsetY;
    this.hintGraphics.lineStyle(2, 0x00e0ff, 0.5);
    for (let r = 0; r < this.hintPlacement.shape.length; r++) {
      for (let c = 0; c < this.hintPlacement.shape[r].length; c++) {
        if (!this.hintPlacement.shape[r][c]) continue;
        const x = this.hintPlacement.x + c;
        const y = this.hintPlacement.y + r;
        const drawY = y - startRow;
        if (drawY < 0) continue;
        this.hintGraphics.strokeRect(
          offX + x * cell - cell / 2,
          offY + drawY * cell - cell / 2,
          cell,
          cell,
        );
      }
    }
  }

  preload() {
    // Assets are loaded in AssetLoaderScene
    // This preload is intentionally empty to avoid duplicate loading
  }

  // Apply mode-specific configuration to game settings
  applyModeConfiguration() {
    if (!this.gameMode) {
      console.warn("No gameMode available, using default configuration");
      return;
    }

    const config = this.gameMode.getConfig();

    if (!config) {
      console.warn("No config found in gameMode, using default");
      return;
    }

    // Rotation system + ARS reset behavior
    const storedRotation = localStorage.getItem("rotationSystem") || "SRS";
    const configRotation = config.rotationSystem || null;
    this.rotationSystem = configRotation || storedRotation;

    const storedArsMoveReset =
      (localStorage.getItem("arsMoveReset") || "false") === "true";
    const configArsMoveReset =
      config.specialMechanics && typeof config.specialMechanics.arsMoveResetEnabled === "boolean"
        ? config.specialMechanics.arsMoveResetEnabled
        : null;
    this.arsMoveResetEnabled =
      configArsMoveReset !== null ? configArsMoveReset : storedArsMoveReset;

    // Apply timing configurations - use mode methods if available for progressive timings
    this.dasDelay =
      this.gameMode.getDAS && typeof this.gameMode.getDAS === "function"
        ? this.gameMode.getDAS()
        : config.das || 16 / 60;
    this.arrDelay =
      this.gameMode.getARR && typeof this.gameMode.getARR === "function"
        ? this.gameMode.getARR()
        : config.arr || 1 / 60;
    this.areDelay =
      this.gameMode.getARE && typeof this.gameMode.getARE === "function"
        ? this.gameMode.getARE()
        : config.are || 30 / 60;
    this.lockDelayMax =
      this.gameMode.getLockDelay &&
      typeof this.gameMode.getLockDelay === "function"
        ? this.gameMode.getLockDelay()
        : config.lockDelay || 0.5;

    // Apply other configurations
    this.nextPiecesCount = config.nextPieces || 1;
    this.holdEnabled = config.holdEnabled || false;
    this.ghostEnabled = true; // Default true
    this.hanabiParticles = [];
    this.hanabiPool = [];
    this.hanabiContainer = null;
    this.hintGraphics = null;
    this.hintPlacement = null;
    this.lowEndFireworks = true;
    this.hanabiMaxActive = 80;
    this.spinRotatedWhileGrounded = false;
    this.hanabiCounter = 0;
    this.levelUpType = config.levelUpType || "piece";
    this.lineClearBonus = config.lineClearBonus || 1;
    this.gravityLevelCap = config.gravityLevelCap || 999;
    this.nextPiecesCount = config.nextPieces || 1; // Number of next pieces to show

    // Store modeId for easy reference
    this.modeId = this.gameMode.modeId || null;

    // Enable finesse tracking only for SRS and sprint/ultra modes
    const isSprintMode =
      this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100";
    const isUltraMode = this.selectedMode === "ultra";
    this.finesseEnabled = this.rotationSystem === "SRS" && (isSprintMode || isUltraMode);
    if (!this.finesseEnabled) {
      this.finesseErrors = 0;
      this.finessePieces = 0;
      this.finesseStreak = 0;
      this.finesseCurrentInputs = { moves: 0, rotations: 0 };
      this.finesseActiveForPiece = false;
      this.finesseLastAccuracy = 0;
    }

  }

  // Leaderboard helpers (GameScene)
  isPuzzleMode(modeId) {
    return modeId === "tgm3_sakura";
  }

  getGradeValue(grade) {
    const gradeValues = {
      9: 0,
      8: 1,
      7: 2,
      6: 3,
      5: 4,
      4: 5,
      3: 6,
      2: 7,
      1: 8,
      S1: 9,
      S2: 10,
      S3: 11,
      S4: 12,
      S5: 13,
      S6: 14,
      S7: 15,
      S8: 16,
      S9: 17,
      M: 18,
      GM: 19,
    };
    return gradeValues[grade] || 0;
  }

  compareEntries(modeId, a, b) {
    const getVal = (val) => (val === undefined || val === null ? 0 : val);
    const parseNumTime = (t) => {
      if (!t || typeof t !== "string") return Number.POSITIVE_INFINITY;
      const parts = t.split(":");
      if (parts.length !== 2) return Number.POSITIVE_INFINITY;
      const [m, s] = parts;
      const sec = parseFloat(s);
      if (Number.isNaN(sec)) return Number.POSITIVE_INFINITY;
      const minutes = parseInt(m, 10);
      if (Number.isNaN(minutes)) return Number.POSITIVE_INFINITY;
      return minutes * 60 + sec;
    };

    const byGrade = () =>
      this.getGradeValue(getVal(b.grade)) - this.getGradeValue(getVal(a.grade));
    const byDesc = (x, y) => getVal(y) - getVal(x);
    const byAsc = (x, y) => getVal(x) - getVal(y);

    switch (modeId) {
      case "tgm2_normal": // Normal
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "easy_easy": // Easy
        return (
          byDesc(a.hanabi, b.hanabi) ||
          byDesc(a.lines, b.lines) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "easy_hard": // Hard
        return (
          byDesc(a.hanabi, b.hanabi) ||
          byDesc(a.lines, b.lines) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
      case "tgm2_master":
      case "tgmplus":
      case "tgm2_death":
        return (
          byDesc(a.level, b.level) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byGrade()
        );
      case "marathon":
      case "ultra":
      case "zen":
      case "sprint_40":
      case "sprint_100":
        return (
          byAsc(parseNumTime(a.time), parseNumTime(b.time)) ||
          byDesc(a.lines, b.lines) ||
          byDesc(a.score, b.score)
        );
      default:
        // Generic: prefer score desc, time asc
        return (
          byDesc(a.score, b.score) ||
          byAsc(parseNumTime(a.time), parseNumTime(b.time))
        );
    }
  }

  getLeaderboard(modeId) {
    const key = `leaderboard_${modeId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.warn("Failed to parse leaderboard", modeId, e);
      }
    }

    // Fallback: migrate legacy single best score if present
    const legacyKey = `bestScore_${modeId}`;
    const legacyStored = localStorage.getItem(legacyKey);
    if (legacyStored && this.getBestScore) {
      const legacy = this.getBestScore(modeId);
      const migrated = [legacy];
      localStorage.setItem(key, JSON.stringify(migrated));
      return migrated;
    }
    return [];
  }

  saveLeaderboardEntryToModeId(modeId, entry) {
    const key = `leaderboard_${modeId}`;
    const list = this.getLeaderboard(modeId);
    list.push(entry);
    const deduped = [];
    const seen = new Set();
    list
      .filter(Boolean)
      .sort((a, b) => this.compareEntries(modeId, a, b))
      .forEach((e) => {
        const sig = JSON.stringify({
          time: e.time,
          score: e.score,
          level: e.level,
          grade: e.grade,
          lines: e.lines,
          pps: e.pps,
        });
        if (!seen.has(sig)) {
          seen.add(sig);
          deduped.push(e);
        }
      });
    const capped = deduped.slice(0, this.isPuzzleMode(modeId) ? 1 : 5);
    localStorage.setItem(key, JSON.stringify(capped));
    this.leaderboardSaved = true;
  }

  saveLeaderboardEntry(modeId, entry) {
    this.saveLeaderboardEntryToModeId(modeId, entry);

    const selectedModeId =
      typeof this.selectedMode === "string" && this.selectedMode !== "Mode 1"
        ? this.selectedMode
        : null;

    if (selectedModeId && selectedModeId !== modeId) {
      this.saveLeaderboardEntryToModeId(selectedModeId, entry);
    }
  }

  calculateLayout() {
    // Calculate layout based on current window size
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate optimal cell size to utilize more of the screen space
    // Use more aggressive sizing to fill the screen better
    const maxCellWidth = Math.floor((windowWidth * 0.8) / this.board.cols); // Use 80% of width for playfield
    const maxCellHeight = Math.floor((windowHeight * 0.9) / this.visibleRows); // Use 90% of height for playfield
    this.cellSize = Math.min(maxCellWidth, maxCellHeight, 40); // Cap at 40 for better utilization

    // Ensure minimum cell size for readability
    this.cellSize = Math.max(this.cellSize, 20);

    // Calculate playfield dimensions and store as instance properties
    this.playfieldWidth = this.cellSize * this.board.cols;
    this.playfieldHeight = this.cellSize * this.visibleRows;

    // Center the border with better screen utilization
    this.borderOffsetX = Math.floor((windowWidth - this.playfieldWidth) / 2);
    this.borderOffsetY =
      Math.floor((windowHeight - this.playfieldHeight) / 2) - 30; // Adjusted for better centering

    // Move the matrix to the right within the border
    this.matrixOffsetX = this.borderOffsetX + 17; // Shifted 2px left to align with border
    this.matrixOffsetY = this.borderOffsetY + 20;

    // Store window dimensions for UI positioning
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
  }

  setupUI() {
    const uiFontSize = Math.max(
      16,
      Math.min(24, Math.floor(this.cellSize * 0.8)),
    );
    const largeFontSize = Math.max(
      20,
      Math.min(32, Math.floor(this.cellSize * 1.2)),
    );
    const xlargeFontSize = Math.max(
      28,
      Math.min(48, Math.floor(this.cellSize * 1.8)),
    );
    const timeFontSize = Math.max(
      24,
      Math.min(40, Math.floor(this.cellSize * 1.5)),
    ); // Larger for time

    // UI positioned to the left of border, moved 50px right
    const uiX = Math.max(20, this.borderOffsetX - 200) + 50;

    // Grade display - next to matrix on left, right-aligned, moved 25px right
    // Only show for modes that use grading
    const modeConfig = this.gameMode ? this.gameMode.getConfig() : {};
    const hasGrading = modeConfig.hasGrading !== false;
    const modeId =
      this.gameMode && typeof this.gameMode.getModeId === "function"
        ? this.gameMode.getModeId()
        : this.selectedMode;
    const specialMechanics = modeConfig.specialMechanics || {};
    const isTADeathMode = modeId === "tadeath";
    const isTGM2Mode =
      Boolean(specialMechanics.tgm2Grading) ||
      (typeof modeId === "string" && modeId.startsWith("tgm2"));
    const hideGradePoints =
      modeId === "tgm1" ||
      modeId === "20g" ||
      (this.gameMode &&
        typeof this.gameMode.isTwentyGMode === "function" &&
        this.gameMode.isTwentyGMode());
    this.shouldShowGradePoints = !hideGradePoints;
    this.shouldShowNextGradeText =
      hasGrading && !isTADeathMode && !isTGM2Mode;

    if (hasGrading) {
      const gradeX = uiX + 25;
      const gradeY = this.borderOffsetY;
      const gradeWidth = 80;
      this.gradeDisplay = this.add.graphics();
      this.gradeDisplay.lineStyle(2, 0xffffff);
      this.gradeDisplay.strokeRect(gradeX, gradeY, gradeWidth, 80);
      const initialDisplayedGrade =
        this.gameMode && typeof this.gameMode.getDisplayedGrade === "function"
          ? this.gameMode.getDisplayedGrade()
          : this.grade;
      this.grade =
        initialDisplayedGrade !== undefined && initialDisplayedGrade !== null
          ? initialDisplayedGrade
          : this.grade;
      const gradeTextValue = this.grade || "";
      const gradeVisible = !!gradeTextValue;
      this.gradeText = this.add
        .text(gradeX + gradeWidth / 2, gradeY + 40, gradeTextValue, {
          fontSize: `${xlargeFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "center",
        })
        .setOrigin(0.5);
      this.gradeDisplay.setVisible(gradeVisible);
      this.gradeText.setVisible(gradeVisible);
      if (this.gradePointsText) {
        this.gradePointsText.destroy();
        this.gradePointsText = null;
      }
      if (this.shouldShowGradePoints) {
        this.gradePointsText = this.add
          .text(gradeX + gradeWidth / 2, gradeY + 90, "0", {
            fontSize: `${largeFontSize - 4}px`,
            fill: "#ffffff",
            fontFamily: "Courier New",
            fontStyle: "bold",
            align: "center",
          })
          .setOrigin(0.5, 0);
        this.gradePointsText.setVisible(gradeVisible);
      }
      if (this.shouldShowNextGradeText) {
        if (this.nextGradeText) {
          this.nextGradeText.destroy();
          this.nextGradeText = null;
        }
        this.nextGradeText = this.add
          .text(gradeX + gradeWidth / 2, gradeY + 130, "", {
            fontSize: `${uiFontSize - 2}px`,
            fill: "#cccccc",
            fontFamily: "Courier New",
            fontStyle: "normal",
            align: "center",
          })
          .setOrigin(0.5, 0);
        this.nextGradeText.setWordWrapWidth(gradeWidth * 1.5);
        this.nextGradeText.setVisible(gradeVisible);
        this.updateNextGradeText();
      } else if (this.nextGradeText) {
        this.nextGradeText.destroy();
        this.nextGradeText = null;
      }
      this.updateGradeUIVisibility();
    }

    // Level display - next to matrix on left, right-aligned, moved 60px up and 20px right
    const levelBottomY = this.borderOffsetY + this.playfieldHeight - 60;
    const levelRowHeight = 20; // Decreased spacing
    const levelFontSize = Math.max(
      24,
      Math.min(36, Math.floor(this.cellSize * 1.0)),
    ); // Increased font

    // Determine mode types
    const isMarathonMode = !!(this.selectedMode && this.selectedMode === "marathon");
    const isUltraMode = !!(this.selectedMode && this.selectedMode === "ultra");
    const isZenMode = !!(this.selectedMode === "zen");
    const isSprintMode = !!(
      this.selectedMode &&
      (this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100")
    );
    const isLineCountMode = !!(
      isMarathonMode || isUltraMode || isZenMode || isSprintMode
    );

    // For Marathon mode, add separate level display above
    if (isMarathonMode) {
      this.levelDisplayLabel = this.add
        .text(uiX + 135, levelBottomY - 4.5 * levelRowHeight - 83, "LEVEL", {
          fontSize: `${uiFontSize - 4}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(1, 0);
      this.levelDisplayText = this.add
        .text(uiX + 140, levelBottomY - 4 * levelRowHeight - 83, "1", {
          fontSize: `${levelFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "right",
        })
        .setOrigin(1, 0);
    }

    // Level/Lines label and display
    const levelLabelText = isLineCountMode ? "LINES" : "LEVEL";
    this.levelLabel = this.add
      .text(
        uiX + 135,
        levelBottomY - 3.5 * levelRowHeight - 43,
        levelLabelText,
        {
          fontSize: `${uiFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        },
      )
      .setOrigin(1, 0);
    // Level bar and texts will be added in draw

    // Score display - next to matrix on left, right-aligned, moved 30px up and 20px right
    const scoreRowHeight = 25;
    this.scoreLabel = this.add
      .text(uiX + 135, levelBottomY, "SCORE", {
        fontSize: `${uiFontSize - 4}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(1, 0);
    this.scoreText = this.add
      .text(uiX + 140, levelBottomY + 15, "0", {
        fontSize: `${xlargeFontSize}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
        align: "right",
      })
      .setOrigin(1, 0);

    // Piece per second displays - moved to right side of matrix, aligned with bottom of stack
    const ppsX = this.borderOffsetX + this.cellSize * this.board.cols + 20;
    const ppsY = this.borderOffsetY + this.playfieldHeight - 40; // Align with bottom of stack
    this.hanabiLabel = this.add
      .text(ppsX, ppsY - 40, "HANABI", {
        fontSize: `${uiFontSize - 4}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0, 0);
    this.hanabiTextInGame = this.add
      .text(ppsX, ppsY - 25, "0", {
        fontSize: `${largeFontSize}px`,
        fill: "#ffff88",
        fontFamily: "Courier New",
        fontStyle: "bold",
        align: "left",
      })
      .setOrigin(0, 0);
    this.ppsLabel = this.add
      .text(ppsX, ppsY, "PPS", {
        fontSize: `${uiFontSize - 4}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0, 0);
    this.ppsText = this.add
      .text(ppsX, ppsY + 15, "0.00", {
        fontSize: `${largeFontSize}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
        align: "left",
      })
      .setOrigin(0, 0);
    this.rawPpsLabel = this.add
      .text(ppsX, ppsY + 40, "RAW PPS", {
        fontSize: `${uiFontSize - 6}px`,
        fill: "#ccc",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0, 0);
    this.rawPpsText = this.add
      .text(ppsX, ppsY + 55, "0.00", {
        fontSize: `${largeFontSize - 4}px`,
        fill: "#ccc",
        fontFamily: "Courier New",
        fontStyle: "bold",
        align: "left",
      })
      .setOrigin(0, 0);

    const shouldShowSectionTracker =
      !(isUltraMode || isZenMode) && modeId !== "tgm3_easy";
    if (this.sectionTrackerGroup) {
      this.sectionTrackerGroup.destroy(true);
      this.sectionTrackerGroup = null;
    }

    if (!shouldShowSectionTracker) {
      this.halfTimeTexts = null;
      this.sectionSectionLabels = null;
      this.sectionTimeTexts = null;
      this.sectionTotalTexts = null;
      this.sectionTallyTexts = null;
    }

    if (shouldShowSectionTracker) {
      const trackerX = Math.max(20, this.borderOffsetX - 430);
      const trackerWidth = 240;
      const gradePanelLeftX = hasGrading ? uiX + 25 : uiX;
      const shouldShiftTrackerDown = trackerX + trackerWidth >= gradePanelLeftX - 10;
      const trackerY = shouldShiftTrackerDown
        ? this.borderOffsetY + 170
        : this.borderOffsetY - 10;
      const sectionRowHeight = Math.max(16, Math.floor(this.cellSize * 0.6));
      this.sectionTrackerGroup = this.add.container(trackerX, trackerY);

      const isTgm2Normal = modeId === "tgm2_normal";

      if (isSprintMode) {
        const header = this.add.text(0, 0, "PPS GRAPH", {
          fontSize: `${uiFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        });
        this.sectionTrackerGroup.add(header);

        const graphWidth = 120;
        const graphY = sectionRowHeight + 6;
        const graphMargin = graphY; // keep bottom margin equal to top margin
        const graphHeight = Math.max(
          140,
          this.scale.height - (trackerY + graphY + graphMargin),
        );
        this.ppsGraphArea = {
          x: 0,
          y: graphY,
          width: graphWidth,
          height: graphHeight,
        };
        this.ppsGraphGraphics = this.add.graphics();
        this.sectionTrackerGroup.add(this.ppsGraphGraphics);

        // Summary text under graph
        const summaryStyle = {
          fontSize: `${uiFontSize - 6}px`,
          fill: "#ccc",
          fontFamily: "Courier New",
          fontStyle: "bold",
        };
        this.ppsSummaryText = this.add.text(
          0,
          graphY + graphHeight + 6,
          "Max PPS: -- | Worst choke: --",
          summaryStyle,
        );
        this.sectionTrackerGroup.add(this.ppsSummaryText);

        const yLabel = this.add.text(
          graphWidth + 6,
          graphY - 6,
          "PPS",
          {
            fontSize: `${uiFontSize - 6}px`,
            fill: "#ccc",
            fontFamily: "Courier New",
            fontStyle: "bold",
          },
        );
        this.sectionTrackerGroup.add(yLabel);
      } else {
        const header = this.add.text(0, 0, "SECTIONS", {
          fontSize: `${uiFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        });
        this.sectionTrackerGroup.add(header);

        const sectionLabelFontSize = Math.max(10, uiFontSize - 6);
        const sectionTimeFontSize = Math.max(12, uiFontSize - 4);
        const rowLineHeight = Math.max(12, Math.floor(sectionLabelFontSize * 1.1));
        const rowHeight = rowLineHeight +
          Math.max(14, Math.floor(sectionTimeFontSize * 1.1));

        this.halfTimeTexts = null;
        let tableStartY = sectionRowHeight;
        if (!isTgm2Normal && !isMarathonMode) {
          const colWidth = 120;
          const labelStyle = {
            fontSize: `${sectionLabelFontSize}px`,
            fill: "#ccc",
            fontFamily: "Courier New",
            fontStyle: "bold",
          };
          const timeStyle = {
            fontSize: `${sectionTimeFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
          };

          const half1Label = this.add.text(
            0,
            sectionRowHeight,
            "1ST HALF",
            labelStyle,
          );
          const half1Time = this.add.text(
            0,
            sectionRowHeight + rowLineHeight,
            "--:--.--",
            timeStyle,
          );
          const half2Label = this.add
            .text(colWidth, sectionRowHeight, "2ND HALF", labelStyle)
            .setVisible(false);
          const half2Time = this.add
            .text(colWidth, sectionRowHeight + rowLineHeight, "--:--.--", timeStyle)
            .setVisible(false);

          this.sectionTrackerGroup.add([half1Label, half1Time, half2Label, half2Time]);
          this.halfTimeTexts = [
            { label: half1Label, time: half1Time },
            { label: half2Label, time: half2Time },
          ];

          tableStartY = sectionRowHeight + rowHeight + 6;
        }

        this.sectionSectionLabels = [];
        this.sectionTimeTexts = [];
        this.sectionTotalTexts = [];

        this.sectionTallyTexts = [];
        const sectionLength = this.getSectionLength();
        const maxSections = this.getMaxSectionsForTracker();
        for (let i = 0; i < maxSections; i++) {
          const sectionStart = i * sectionLength;
          const sectionEnd = sectionStart + sectionLength - 1;
          const y = tableStartY + i * rowHeight;

          const label = this.add.text(
            0,
            y,
            `${sectionStart.toString().padStart(3, "0")}-${sectionEnd
              .toString()
              .padStart(3, "0")}`,
            {
              fontSize: `${sectionLabelFontSize}px`,
              fill: "#ccc",
              fontFamily: "Courier New",
              fontStyle: "bold",
            },
          );
          const timeText = this.add.text(0, y + rowLineHeight, "--:--.--", {
            fontSize: `${sectionTimeFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
          });

          const tallyText = this.add.text(140, y, "", {
            fontSize: `${sectionLabelFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
          });
          const totalText = this.add.text(140, y + rowLineHeight, "--:--.--", {
            fontSize: `${sectionTimeFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
          });

          label.setVisible(false);
          timeText.setVisible(false);
          tallyText.setVisible(false);
          totalText.setVisible(false);

          this.sectionTrackerGroup.add([label, timeText, tallyText, totalText]);
          this.sectionSectionLabels.push(label);
          this.sectionTimeTexts.push(timeText);
          this.sectionTallyTexts.push(tallyText);
          this.sectionTotalTexts.push(totalText);
        }
      }
    }

    // Time - centered below border, larger font, bold
    if (this.timeText && !this.timeText.scene) {
      this.timeText = null;
    }
    if (!this.timeText) {
      this.timeText = this.add
        .text(
          this.borderOffsetX + this.playfieldWidth / 2,
          this.borderOffsetY + this.playfieldHeight + 50,
          "0:00.00",
          {
            fontSize: `${timeFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
            align: "center",
          },
        )
        .setOrigin(0.5, 0);
    } else {
      // Update position and style if text already exists
      this.timeText.setPosition(
        this.borderOffsetX + this.playfieldWidth / 2,
        this.borderOffsetY + this.playfieldHeight + 50,
      );
      this.timeText.setStyle({ fontSize: `${timeFontSize}px` });
    }

    // Playfield border - adjusted to fit exactly 10x20 with smaller width and height
    // Use mode type color for border
    const modeTypeColor = this.getModeTypeBorderColor();
    this.playfieldBorder = this.add.graphics();
    this.playfieldBorder.lineStyle(3, modeTypeColor);
    this.playfieldBorder.strokeRect(
      this.borderOffsetX - 4,
      this.borderOffsetY - 3,
      this.cellSize * this.board.cols + 4,
      this.cellSize * this.visibleRows + 5,
    ); // Height reduced by 1px, width expanded 1px left
  }

  create() {
    // Initialize game elements here (spawn deferred until after READY/GO)
    this.gameGroup = this.add.group();
    this.hanabiContainer = this.add.group();
    this.hintGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00e0ff, alpha: 0.5 } });
    this.cursors = this.input.keyboard.createCursorKeys();

    // Scene instances can be reused across restarts; reset runtime flags/timers.
    this.board = new Board();
    this.currentPiece = null;
    this.holdPiece = null;
    this.canHold = true;
    this.nextPieces = [];
    this.areActive = false;
    this.areTimer = 0;
    this.isClearingLines = false;
    this.clearedLines = [];
    this.lineClearPhase = false;

    this.score = 0;
    this.totalLines = 0;
    this.piecesPlaced = 0;
    this.comboCount = -1;
    this.backToBack = false;
    this.lastClearType = null;
    this.lastPieceType = null;

    this.level = this.startingLevel != null ? this.startingLevel : getStartingLevel();
    this.currentSection = Math.floor(this.getSectionBasisValue() / this.getSectionLength());
    this.sectionStartTime = 0;
    this.sectionTimes = {};
    this.sectionTetrises = {};
    this.currentSectionTetrisCount = 0;

    this.isGrounded = false;
    this.lockDelay = 0;
    this.lockDelayBufferedStart = false;

    // Reset randomizer / first-spawn logic so the first spawned piece does not increment level.
    this.pieceHistory = ["Z", "Z", "S", "S"];
    this.pieceHistoryIndex = 0;
    this.firstPiece = true;
    this.isFirstSpawn = true;
    this.validatePieceHistory();

    // Reset stack/credits/fade systems
    this.invisibleStackActive = false;
    this.fadingRollActive = false;
    this.minoFadeActive = false;
    this.minoFadeProgress = 0;
    this.minoFadeTimer = 0;
    this.minoFadePerRowDuration = 0;
    this.placedMinos = [];
    this.placedMinoRows = [];
    this.fadingComplete = false;
    this.minoRowFadeAlpha = {};
    this.gameOverFadeDoneTime = null;
    this.showGameOverText = false;
    this.gameOverTextTimer = 0;
    this.creditsPending = false;
    this.creditsActive = false;
    this.creditsTimer = 0;
    this.creditsDuration = 61.6;
    this.gradeLineColor = "none";
    this.congratulationsActive = false;
    this.gameComplete = false;
    this.sprintCompleted = false;

    this.gameOver = false;
    this.gameOverTimer = 0;
    this.isPaused = false;
    this.pauseStartTime = null;
    this.totalPausedTime = 0;
    this.level999Reached = false;
    this.readyGoPhase = false;
    this.loadingPhase = true;
    this.gameStarted = false;
    this.showGameOverText = false;

    // Ensure layout values are correct for UI drawing (level bar, border, etc.)
    this.calculateLayout();

    this.events.once("shutdown", () => {
      if (this.bgmLoopTimer) {
        this.bgmLoopTimer.remove(false);
        this.bgmLoopTimer = null;
      }

      if (this.currentBGM) {
        this.currentBGM.stop();
        this.currentBGM = null;
      }

      const bgmObjects = [
        this.stage1BGM,
        this.stage2BGM,
        this.tgm2_stage1,
        this.tgm2_stage2,
        this.tgm2_stage3,
        this.tgm2_stage4,
      ];

      bgmObjects.forEach((bgm) => {
        if (bgm) {
          bgm.stop();
          bgm.destroy();
        }
      });

      this.stage1BGM = null;
      this.stage2BGM = null;
      this.tgm2_stage1 = null;
      this.tgm2_stage2 = null;
      this.tgm2_stage3 = null;
      this.tgm2_stage4 = null;

      if (this.tweens) {
        this.tweens.killAll();
      }
      if (this.time) {
        this.time.removeAllEvents();
      }

      // Scene instances can be reused; ensure we don't keep references to destroyed UI objects.
      this.timeText = null;
      this.levelLabel = null;
      this.levelDisplayLabel = null;
      this.levelDisplayText = null;
      this.currentLevelText = null;
      this.capLevelText = null;
      this.levelBar = null;
      this.scoreLabel = null;
      this.scoreText = null;
      this.ppsLabel = null;
      this.ppsText = null;
      this.rawPpsLabel = null;
      this.rawPpsText = null;
      this.gradeDisplay = null;
      this.gradeText = null;
      this.gradePointsText = null;
      this.nextGradeText = null;
      this.playfieldBorder = null;
      this.minoRowFadeAlpha = null;
      if (this.hanabiLabel) this.hanabiLabel.destroy();
      if (this.hanabiTextInGame) this.hanabiTextInGame.destroy();
      this.hanabiLabel = null;
      this.hanabiTextInGame = null;
    });
    const keybinds = (() => {
      const defaultKeybinds = {
        moveLeft: Phaser.Input.Keyboard.KeyCodes.Z,
        moveRight: Phaser.Input.Keyboard.KeyCodes.C,
        softDrop: Phaser.Input.Keyboard.KeyCodes.S,
        rotateCW: Phaser.Input.Keyboard.KeyCodes.K,
        rotateCW2: Phaser.Input.Keyboard.KeyCodes.UP,
        rotateCCW: Phaser.Input.Keyboard.KeyCodes.SPACE,
        rotateCCW2: Phaser.Input.Keyboard.KeyCodes.L,
        hardDrop: Phaser.Input.Keyboard.KeyCodes.X,
        hold: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        pause: Phaser.Input.Keyboard.KeyCodes.ESC,
        menu: Phaser.Input.Keyboard.KeyCodes.M,
        restart: Phaser.Input.Keyboard.KeyCodes.ENTER,
      };
      const stored = localStorage.getItem("keybinds");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...defaultKeybinds, ...parsed };
        } catch (e) {
        }
      }
      return defaultKeybinds;
    })();

    const makeKey = (keyCode) => this.input.keyboard.addKey(keyCode);

    this.keys = {
      left: makeKey(keybinds.moveLeft),
      right: makeKey(keybinds.moveRight),
      softDrop: makeKey(keybinds.softDrop),
      hardDrop: makeKey(keybinds.hardDrop),
      rotateCW: makeKey(keybinds.rotateCW),
      rotateCW2: makeKey(keybinds.rotateCW2),
      rotateCCW: makeKey(keybinds.rotateCCW),
      rotateCCW2: makeKey(keybinds.rotateCCW2),
      rotate180: makeKey(keybinds.rotate180),
      hold: makeKey(keybinds.hold),
      pause: makeKey(keybinds.pause),
      menu: makeKey(keybinds.menu),
      restart: makeKey(keybinds.restart),
    };

    // Prevent default browser behavior for game keys
    this.input.keyboard.addCapture([
      keybinds.moveLeft,
      keybinds.moveRight,
      keybinds.softDrop,
      keybinds.hardDrop,
      keybinds.rotateCW,
      keybinds.rotateCW2,
      keybinds.rotateCCW,
      keybinds.rotateCCW2,
      keybinds.rotate180,
      keybinds.hold,
      keybinds.pause,
      keybinds.menu,
      keybinds.restart,
    ]);
    this.restartKey = this.keys.restart;

    // Initialize time tracking using Date.now() for reliability
    this.startTime = Date.now();
    this.gameStartTime = this.startTime;
    this.currentTime = 0;

    this.sectionStartTime = 0;
    this.currentSection = Math.floor(this.getSectionBasisValue() / this.getSectionLength());
    this.currentSectionTetrisCount = 0;
    this.totalPausedTime = 0;
    this.isPaused = false;
    this.pauseStartTime = null;

    // UI - positioned relative to screen size
    this.setupUI();

    // Initialize BGM system (playback deferred)
    this.initializeBGM();

    // Initialize game mode
    if (this.gameMode && this.gameMode.initializeForGameScene) {
      this.gameMode.initializeForGameScene(this);
    }

    // Prepare next queue (but do not spawn yet)
    if (this.nextPieces.length < 6) {
      this.generateNextPieces();
    }

    // Show READY/GO; spawn will occur after GO
    this.loadingPhase = false;
    this.showReadyGo();
  }

  initializeBGM() {
    // Initialize audio objects with error handling (no auto-play)
    try {
      this.stage1BGM = this.sound.add("stage1", { loop: true, volume: 0.5 });
      this.stage2BGM = this.sound.add("stage2", { loop: true, volume: 0.5 });
      this.tgm2_stage1 = this.sound.add("tgm2_stage1", {
        loop: false,
        volume: 0.5,
      });
      this.tgm2_stage2 = this.sound.add("tgm2_stage2", {
        loop: false,
        volume: 0.5,
      });
      this.tgm2_stage3 = this.sound.add("tgm2_stage3", {
        loop: false,
        volume: 0.5,
      });
      this.tgm2_stage4 = this.sound.add("tgm2_stage4", {
        loop: false,
        volume: 0.5,
      });
    } catch (error) {
      console.warn(
        "BGM initialization failed, disabling background music:",
        error,
      );
      this.bgmEnabled = false;
      this.stage1BGM = null;
      this.stage2BGM = null;
      this.tgm2_stage1 = null;
      this.tgm2_stage2 = null;
      this.tgm2_stage3 = null;
      this.tgm2_stage4 = null;
      this.currentBGM = null;
    }
  }

  startInitialBGM() {
    if (!this.bgmEnabled) return;
    this.updateBGM();
  }

  showReadyGo() {
    this.readyGoPhase = true;
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const readyText = this.add
      .text(centerX, centerY, "READY", {
        fontSize: "64px",
        fill: "#ffff00",
        fontFamily: "Courier New",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.children.bringToTop(readyText);
    this.gameGroup.add(readyText);

    // Play ready sound
    if (this.sound && this.sound.get("ready")) {
      this.sound.add("ready", { volume: 0.7 }).play();
    }

    this.time.delayedCall(1000, () => {
      readyText.destroy();

      const goText = this.add
        .text(centerX, centerY, "GO", {
          fontSize: "64px",
          fill: "#00ff00",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      this.children.bringToTop(goText);
      this.gameGroup.add(goText);

      // Play go sound
      if (this.sound && this.sound.get("go")) {
        this.sound.add("go", { volume: 0.7 }).play();
      }
      this.time.delayedCall(1000, () => {
        goText.destroy();
        this.readyGoPhase = false;
        this.gameStarted = true;
        // Ensure queue and spawn first piece after GO
        if (this.nextPieces.length < 6) {
          this.generateNextPieces();
        }

        this.sectionStartTime = this.currentTime;
        this.currentSection = Math.floor(this.getSectionBasisValue() / this.getSectionLength());
        this.currentSectionTetrisCount = 0;

        this.spawnPiece();
        // Start BGM after GO
        this.startInitialBGM();
      });
    });
  }

  updateTimer() {
    if (
      this.startTime &&
      !this.isPaused &&
      !this.level999Reached &&
      !this.gameOver &&
      !this.creditsActive
    ) {
      this.currentTime = (Date.now() - this.startTime) / 1000;
    }
  }

  startBGMWithLoop(bgmType) {
    if (!this.bgmEnabled) return;

    let audioObject;
    let loopPoint;
    let isFirstPlay = this.bgmFirstPlay[bgmType];

    if (bgmType === "stage1") {
      audioObject = this.stage1BGM;
      loopPoint = this.loopPoints.stage1;
    } else if (bgmType === "stage2") {
      audioObject = this.stage2BGM;
      loopPoint = this.loopPoints.stage2;
    }

    if (audioObject && loopPoint) {
      // Stop any currently playing BGM
      if (this.currentBGM && this.currentBGM !== audioObject) {
        this.currentBGM.stop();
      }

      // Clean up old audio object if it exists
      if (audioObject.isPlaying) {
        audioObject.stop();
      }

      // Create new audio instance with proper configuration
      const audioKey = bgmType === "stage1" ? "stage1" : "stage2";

      // Remove old instance from sound cache to avoid conflicts
      if (this.sound.cache.exists(audioKey)) {
        this.sound.cache.remove(audioKey);
      }

      // Create new audio instance
      const newAudio = this.sound.add(audioKey, {
        loop: false,
        volume: 0.5,
      });

      // Update reference
      if (bgmType === "stage1") {
        this.stage1BGM = newAudio;
      } else {
        this.stage2BGM = newAudio;
      }

      // Set up completion handler
      newAudio.once("complete", () => {
        if (this.bgmEnabled) {
          // Mark that we've completed first play
          this.bgmFirstPlay[bgmType] = false;

          // Start the loop
          if (this.bgmLoopTimer) {
            this.bgmLoopTimer.remove(false);
            this.bgmLoopTimer = null;
          }
          this.bgmLoopTimer = this.time.delayedCall(100, () => {
            this.startLoopPhase(bgmType);
          });
        }
      });

      // Play the audio
      newAudio.play();
      this.currentBGM = newAudio;
    }
  }

  startLoopPhase(bgmType) {
    if (!this.bgmEnabled) return;

    let audioObject;
    let loopPoint;

    if (bgmType === "stage1") {
      audioObject = this.stage1BGM;
      loopPoint = this.loopPoints.stage1;
    } else if (bgmType === "stage2") {
      audioObject = this.stage2BGM;
      loopPoint = this.loopPoints.stage2;
    }

    if (audioObject && loopPoint) {
      // Clean up and restart for loop phase
      if (audioObject.isPlaying) {
        audioObject.stop();
      }

      const audioKey = bgmType === "stage1" ? "stage1" : "stage2";

      // Create new audio for loop phase
      const loopAudio = this.sound.add(audioKey, {
        loop: false,
        volume: 0.5,
      });

      // Update reference
      if (bgmType === "stage1") {
        this.stage1BGM = loopAudio;
      } else {
        this.stage2BGM = loopAudio;
      }

      // Set up continuous looping
      loopAudio.once("complete", () => {
        if (this.bgmEnabled) {
          // Immediately restart for seamless loop
          if (this.bgmLoopTimer) {
            this.bgmLoopTimer.remove(false);
            this.bgmLoopTimer = null;
          }
          this.bgmLoopTimer = this.time.delayedCall(50, () => {
            this.startLoopPhase(bgmType);
          });
        }
      });

      loopAudio.play();
      this.currentBGM = loopAudio;
    }
  }

  switchToLoopMode(bgmType) {
    if (!this.bgmEnabled) return;

    let audioObject;
    let loopPoint;

    if (bgmType === "stage1") {
      audioObject = this.stage1BGM;
      loopPoint = this.loopPoints.stage1;
    } else if (bgmType === "stage2") {
      audioObject = this.stage2BGM;
      loopPoint = this.loopPoints.stage2;
    }

    if (audioObject && loopPoint) {
      // Stop current audio
      audioObject.stop();

      // For simplicity, we'll restart from the beginning but use Phaser's loop
      // This provides seamless looping, though not from the exact start point
      audioObject.play();
      this.currentBGM = audioObject;
    }
  }

  updateBGM() {
    if (!this.bgmEnabled) return;

    // Check if this is a TGM2 mode
    const isTGM2Mode =
      this.selectedMode &&
      (this.selectedMode.startsWith("tgm2") ||
        this.selectedMode === "tgm_plus");

    // Check if this is T.A.Death mode
    const isTADeathMode = this.selectedMode === "tadeath";

    if (isTGM2Mode) {
      this.updateTGM2BGM();
    } else if (isTADeathMode) {
      this.updateTADeathBGM();
    } else {
      this.updateTGM1BGM();
    }
  }

  updateTGM1BGM() {
    if (!this.stage1BGM || !this.stage2BGM) return;

    if (this.level >= 491 && this.level < 500) {
      if (this.currentBGM) {
        this.currentBGM.stop();
        this.currentBGM = null;
      }
    } else if (this.level >= 500 && this.level < 999) {
      if (this.currentBGM !== this.stage2BGM) {
        if (this.currentBGM) this.currentBGM.stop();
        this.stage2BGM.play();
        this.currentBGM = this.stage2BGM;
      }
    } else if (this.level < 491) {
      if (this.currentBGM !== this.stage1BGM) {
        if (this.currentBGM) this.currentBGM.stop();
        this.stage1BGM.play();
        this.currentBGM = this.stage1BGM;
      }
    }
    // At level 999, stop all stage BGM - only credits BGM should play
    // This is handled in startCredits() method
  }

  updateTGM2BGM() {
    // TGM2 BGM selection based on level
    let targetBGM = null;
    let bgmKey = null;

    if (this.level < 500) {
      // Levels 0-299: tm2_3.mp3
      targetBGM = this.tgm2_stage1;
      bgmKey = "tgm2_stage1";
    } else if (this.level < 700) {
      // Levels 300-499: tm2_4.mp3
      targetBGM = this.tgm2_stage2;
      bgmKey = "tgm2_stage2";
    } else if (this.level < 900) {
      // Levels 500-699: tm3_4.mp3
      targetBGM = this.tgm2_stage3;
      bgmKey = "tgm2_stage3";
    } else {
      // Levels 700+: tm3_6.mp3
      targetBGM = this.tgm2_stage4;
      bgmKey = "tgm2_stage4";
    }

    if (targetBGM && this.currentBGM !== targetBGM) {
      if (this.currentBGM) {
        this.currentBGM.stop();
      }
      this.startTGM2BGM(bgmKey, targetBGM);
      this.currentBGM = targetBGM;
    }
  }

  startTGM2BGM(bgmKey, audioObject) {
    if (!audioObject) return;

    // Stop any current playback
    if (audioObject.isPlaying) {
      audioObject.stop();
    }

    // Set up loop points based on the BGM
    let loopStart = 0;
    let loopEnd = audioObject.duration || 0;

    switch (bgmKey) {
      case "tgm2_stage1": // tm2_3.mp3
        // Play from beginning, loop from 29.872s to 115.193s
        loopStart = 29.872;
        loopEnd = 115.193;
        break;
      case "tgm2_stage2": // tm2_4.mp3
        // Loop from 61.432s to 168.954s
        loopStart = 61.432;
        loopEnd = 168.954;
        break;
      case "tgm2_stage3": // tm3_4.mp3
        // Loop entire file
        loopStart = 0;
        break;
      case "tgm2_stage4": // tm3_6.mp3
        // Loop entire file
        loopStart = 0;
        break;
    }

    // For Phaser, we need to handle looping manually since it doesn't support loop points directly
    // We'll play the intro once, then loop the specified section
    if (bgmKey === "tgm2_stage1") {
      // For tm2_3.mp3, play intro then loop
      audioObject.once("complete", () => {
        if (this.bgmEnabled && this.currentBGM === audioObject) {
          this.startTGM2Loop(audioObject, loopStart, loopEnd);
        }
      });
      audioObject.play();
    } else {
      // For others, start looping immediately
      this.startTGM2Loop(audioObject, loopStart, loopEnd);
    }
  }

  startTGM2Loop(audioObject, loopStart, loopEnd) {
    if (!audioObject || !this.bgmEnabled) return;

    // Seek to loop start
    audioObject.seek = loopStart;

    // Set up completion handler to loop back
    audioObject.once("complete", () => {
      if (this.bgmEnabled && this.currentBGM === audioObject) {
        this.startTGM2Loop(audioObject, loopStart, loopEnd);
      }
    });

    audioObject.play();
  }

  updateTADeathBGM() {
    // T.A.Death BGM selection based on level
    let targetBGM = null;
    let bgmKey = null;

    if (this.level < 300) {
      // Levels 0-299: tm1_2.mp3
      targetBGM = this.tgm2_stage2;
      bgmKey = "tgm2_stage2";
    } else if (this.level < 500) {
      // Levels 300-499: tm2_3.flac
      targetBGM = this.tgm2_stage2;
      bgmKey = "tgm2_stage3";
    } else {
      // Levels 500+: tm2_4.flac
      targetBGM = this.tgm2_stage4;
      bgmKey = "tgm2_stage4";
    }

    if (targetBGM && this.currentBGM !== targetBGM) {
      if (this.currentBGM) {
        this.currentBGM.stop();
      }
      if (bgmKey === "stage2") {
        // tm1_2.mp3 uses standard looping
        targetBGM.play();
      } else {
        // TGM2 tracks use loop points
        this.startTGM2BGM(bgmKey, targetBGM);
      }
      this.currentBGM = targetBGM;
    }
  }

  manageBGMLoopMode() {
    if (!this.bgmEnabled || !this.currentBGM) return;

    // Get current audio position (in seconds)
    const currentTime = this.currentBGM.currentTime || 0;
    let loopPoint;
    let bgmType;

    // Determine which track is currently playing and its loop points
    if (this.currentBGM === this.stage1BGM) {
      loopPoint = this.loopPoints.stage1;
      bgmType = "stage1";
    } else if (this.currentBGM === this.stage2BGM) {
      loopPoint = this.loopPoints.stage2;
      bgmType = "stage2";
    }

    if (loopPoint && bgmType) {
      // Check if we've completed the first play (reached end point)
      if (this.bgmFirstPlay[bgmType] && currentTime >= loopPoint.end) {
        // Mark first play as complete
        this.bgmFirstPlay[bgmType] = false;

        // Continue with normal looping - Phaser will handle the loop seamlessly
        // The effect is that we get full track first, then continuous looping
      }
    }
  }

  getCurrentBGMType() {
    if (this.currentBGM === this.stage1BGM) return "stage1";
    if (this.currentBGM === this.stage2BGM) return "stage2";
    return null;
  }

  update(time, delta) {
    // Track delta time in seconds for consistency
    this.deltaTime = delta / 1000;

    // If loading or not fully initialized, skip update
    if (this.loadingPhase) {
      return;
    }

    // Safety: ensure input keys are initialized before use
    if (!this.keys || !this.cursors) {
      return;
    }

    // Input handling (null-safe)
    const isDown = (key) => !!(key && key.isDown);
    const justDown = (key) => !!(key && Phaser.Input.Keyboard.JustDown(key));

    // Custom key bindings (safe for modes that don't define all keys)
    const zKeyDown = isDown(this.keys.left);
    const cKeyDown = isDown(this.keys.right);
    const sKeyDown = isDown(this.keys.softDrop);
    const xKeyDown = isDown(this.keys.hardDrop);
    const rotate180Down = isDown(this.keys.rotate180);
    const kKeyDown = isDown(this.keys.rotateCW) || isDown(this.keys.rotateCW2);
    const spaceKeyDown =
      isDown(this.keys.rotateCCW) || isDown(this.keys.rotateCCW2);
    const lKeyDown = isDown(this.keys.rotateCCW2);
    const startDown = isDown(this.keys.start);
    const startJustDown = justDown(this.keys.start);
    const holdJustDown = justDown(this.keys.hold);

    const leftDown = isDown(this.cursors.left);
    const rightDown = isDown(this.cursors.right);
    const downDown = isDown(this.cursors.down);
    const leftPressed = leftDown || zKeyDown;
    const rightPressed = rightDown || cKeyDown;
    const bothPressed = leftPressed && rightPressed;

    // During top-out, ignore all movement/rotation. Only allow Start/Restart to return to menu.
    if (this.gameOver) {
      this.leftKeyPressed = false;
      this.rightKeyPressed = false;
      this.leftInRepeat = false;
      this.rightInRepeat = false;
      this.leftTimer = 0;
      this.rightTimer = 0;
      this.kKeyPressed = false;
      this.spaceKeyPressed = false;
      this.lKeyPressed = false;
      this.xKeyPressed = false;
      if (justDown(this.restartKey)) {
        this.scene.start("MenuScene");
        return;
      }
      // Let game-over logic (fade/timers/UI) run below, but skip movement/rotation.
    }

    // Update lightweight fireworks particles
    this.updateHanabiParticles(this.deltaTime);

    if (this.gameOver) {
      // Skip any input-driven movement/rotation/drop.
    } else
    if (this.rotationSystem === "ARS") {
      // ARS: Process rotation before movement

      // Track rotation keys for immediate response
      this.kKeyPressed = this.kKeyPressed || false;
      this.spaceKeyPressed = this.spaceKeyPressed || false;
      this.lKeyPressed = this.lKeyPressed || false;
      this.xKeyPressed = this.xKeyPressed || false;

      // K key for clockwise rotation - immediate response
      if (kKeyDown && !this.kKeyPressed) {
        this.kKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, 1, this.rotationSystem)
        ) {
          this.resetLockDelay();
          if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
            this.markGroundedSpin();
          }
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
          // Don't play ground sound on rotation failure
        }
      } else if (!kKeyDown && this.kKeyPressed) {
        this.kKeyPressed = false;
      }

      // 180 rotation - immediate response
      if (rotate180Down && !this.rotate180Pressed) {
        this.rotate180Pressed = true;
        if (this.currentPiece) {
          const first = this.currentPiece.rotate(this.board, 1, this.rotationSystem);
          const second = this.currentPiece.rotate(this.board, 1, this.rotationSystem);
          if (first || second) {
            this.resetLockDelay();
            if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
              this.markGroundedSpin();
            }
          } else {
            this.isGrounded = !this.currentPiece.canMoveDown(this.board);
          }
        }
      } else if (!rotate180Down && this.rotate180Pressed) {
        this.rotate180Pressed = false;
      }

      // Space key for counter-clockwise rotation - immediate response
      if (spaceKeyDown && !this.spaceKeyPressed) {
        this.spaceKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, -1, this.rotationSystem)
        ) {
          this.resetLockDelay();
          if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
            this.markGroundedSpin();
          }
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
        }
      } else if (!spaceKeyDown && this.spaceKeyPressed) {
        this.spaceKeyPressed = false;
      }

      // L key for counter-clockwise rotation - immediate response
      if (lKeyDown && !this.lKeyPressed) {
        this.lKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, -1, this.rotationSystem)
        ) {
          this.resetLockDelay();
          if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
            this.markGroundedSpin();
          }
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
        }
      } else if (!lKeyDown && this.lKeyPressed) {
        this.lKeyPressed = false;
      }

      // X key for hard drop - immediate response
      if (xKeyDown && !this.xKeyPressed) {
        this.xKeyPressed = true;
        if (this.currentPiece) {
          // Calculate hard drop rows before dropping
          const ghost = this.currentPiece.getGhostPosition(this.board);
          this.hardDropRows = ghost.y - this.currentPiece.y;
          this.currentPiece.hardDrop(this.board);
          this.lockPiece();
        }
      } else if (!xKeyDown && this.xKeyPressed) {
        this.xKeyPressed = false;
      }

      // Track key states for DAS using custom keys (z for left, c for right)
      if (leftPressed && !bothPressed && !this.leftKeyPressed) {
        this.leftKeyPressed = true;
        this.leftTimer = 0;
        this.leftInRepeat = false;
        // Initial movement
        if (this.currentPiece && this.currentPiece.move(this.board, -1, 0)) {
          this.resetLockDelay();
        }
        // Don't set grounded state here - let gravity/soft drop logic handle it
      }
      if (rightPressed && !bothPressed && !this.rightKeyPressed) {
        this.rightKeyPressed = true;
        this.rightTimer = 0;
        this.rightInRepeat = false;
        // Initial movement
        if (this.currentPiece && this.currentPiece.move(this.board, 1, 0)) {
          this.resetLockDelay();
        }
        // Don't set grounded state here - let gravity/soft drop logic handle it
      }
    } else {
      // SRS: Process movement before rotation

      // Track key states for DAS using custom keys (z for left, c for right)
      if ((leftDown || zKeyDown) && !this.leftKeyPressed) {
        this.leftKeyPressed = true;
        this.leftTimer = 0;
        this.leftInRepeat = false;
        // Initial movement
        if (this.currentPiece && this.currentPiece.move(this.board, -1, 0)) {
          this.resetLockDelay();
        }
        // Don't set grounded state here - let gravity/soft drop logic handle it
      }
      if ((rightDown || cKeyDown) && !this.rightKeyPressed) {
        this.rightKeyPressed = true;
        this.rightTimer = 0;
        this.rightInRepeat = false;
        // Initial movement
        if (this.currentPiece && this.currentPiece.move(this.board, 1, 0)) {
          this.resetLockDelay();
        }
        // Don't set grounded state here - let gravity/soft drop logic handle it
      }

      // Track rotation keys for immediate response
      this.kKeyPressed = this.kKeyPressed || false;
      this.spaceKeyPressed = this.spaceKeyPressed || false;
      this.lKeyPressed = this.lKeyPressed || false;
      this.xKeyPressed = this.xKeyPressed || false;

      // K key for clockwise rotation - immediate response
      if (kKeyDown && !this.kKeyPressed) {
        this.kKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, 1, this.rotationSystem)
        ) {
          this.resetLockDelay();
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
          // Don't play ground sound on rotation failure
        }
      } else if (!kKeyDown && this.kKeyPressed) {
        this.kKeyPressed = false;
      }

      // Space key for counter-clockwise rotation - immediate response
      if (spaceKeyDown && !this.spaceKeyPressed) {
        this.spaceKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, -1, this.rotationSystem)
        ) {
          this.resetLockDelay();
          if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
            this.markGroundedSpin();
          }
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
        }
      } else if (!spaceKeyDown && this.spaceKeyPressed) {
        this.spaceKeyPressed = false;
      }

      // L key for counter-clockwise rotation - immediate response
      if (lKeyDown && !this.lKeyPressed) {
        this.lKeyPressed = true;
        if (
          this.currentPiece &&
          this.currentPiece.rotate(this.board, -1, this.rotationSystem)
        ) {
          this.resetLockDelay();
          if (this.currentPiece && !this.currentPiece.canMoveDown(this.board)) {
            this.markGroundedSpin();
          }
        } else if (this.currentPiece) {
          this.isGrounded = !this.currentPiece.canMoveDown(this.board);
        }
      } else if (!lKeyDown && this.lKeyPressed) {
        this.lKeyPressed = false;
      }

      // X key for hard drop - immediate response
      if (xKeyDown && !this.xKeyPressed) {
        this.xKeyPressed = true;
        if (this.currentPiece) {
          // Calculate hard drop rows before dropping
          const ghost = this.currentPiece.getGhostPosition(this.board);
          this.hardDropRows = ghost.y - this.currentPiece.y;
          this.currentPiece.hardDrop(this.board);
          this.lockPiece();
        }
      } else if (!xKeyDown && this.xKeyPressed) {
        this.xKeyPressed = false;
      }
    }

    // Handle DAS for left key (cursors.left or z key)
    if (this.leftKeyPressed && leftPressed && !bothPressed) {
      this.leftTimer += this.deltaTime;
      if (!this.leftInRepeat) {
        // Wait for DAS delay
        if (this.leftTimer >= this.dasDelay) {
          this.leftInRepeat = true;
          this.leftTimer = 0;
          if (this.currentPiece) {
            const moved = this.currentPiece.move(this.board, -1, 0);
            if (moved) {
              this.resetLockDelay();
            } else {
              // Piece tried to move left during DAS - no ground sound for movement failures
            }
            // Don't set grounded state here - let gravity/soft drop logic handle it
          }
        }
      } else {
        // Handle ARR (Auto Repeat Rate)
        if (this.leftTimer >= this.arrDelay) {
          this.leftTimer = 0;
          if (this.currentPiece) {
            const moved = this.currentPiece.move(this.board, -1, 0);
            if (moved) {
              this.resetLockDelay();
            } else {
              // Piece tried to move left during ARR - no ground sound for movement failures
            }
            // Don't set grounded state here - let gravity/soft drop logic handle it
          }
        }
      }
    }

    // Handle DAS for right key (cursors.right or c key)
    if (this.rightKeyPressed && rightPressed && !bothPressed) {
      this.rightTimer += this.deltaTime;
      if (!this.rightInRepeat) {
        // Wait for DAS delay
        if (this.rightTimer >= this.dasDelay) {
          this.rightInRepeat = true;
          this.rightTimer = 0;
          if (this.currentPiece) {
            const moved = this.currentPiece.move(this.board, 1, 0);
            if (moved) {
              this.resetLockDelay();
            } else {
              // Piece tried to move right during DAS - no ground sound for movement failures
            }
            // Don't set grounded state here - let gravity/soft drop logic handle it
          }
        }
      } else {
        // Handle ARR (Auto Repeat Rate)
        if (this.rightTimer >= this.arrDelay) {
          this.rightTimer = 0;
          if (this.currentPiece) {
            const moved = this.currentPiece.move(this.board, 1, 0);
            if (moved) {
              this.resetLockDelay();
            } else {
              // Piece tried to move right during ARR - no ground sound for movement failures
            }
            // Don't set grounded state here - let gravity/soft drop logic handle it
          }
        }
      }
    }

    // Key release handling
    if (!leftPressed && this.leftKeyPressed) {
      this.leftKeyPressed = false;
      this.leftTimer = 0;
      this.leftInRepeat = false;
    }
    if (!rightPressed && this.rightKeyPressed) {
      this.rightKeyPressed = false;
      this.rightTimer = 0;
      this.rightInRepeat = false;
    }
    if (!rotate180Down && this.rotate180Pressed) {
      this.rotate180Pressed = false;
    }

    // Update placement hint each frame
    this.updatePlacementHint();

    // Handle ARE input tracking - allow during loading for initial piece handling
    if (this.areActive || !this.currentPiece) {
      this.areLeftHeld = leftDown || zKeyDown;
      this.areRightHeld = rightDown || cKeyDown;
      this.areRotationKeys.k = kKeyDown;
      this.areRotationKeys.space = spaceKeyDown;
      this.areRotationKeys.l = lKeyDown;

      // Determine rotation direction based on currently held keys during ARE
      // Priority: K (clockwise) > Space/L (counter-clockwise)
      // Deactivate if keys are released during ARE
      if (kKeyDown) {
        this.areRotationDirection = 1;
        if (!this.irsActivated) {
          this.irsActivated = true;
        }
      } else if (spaceKeyDown || lKeyDown) {
        this.areRotationDirection = -1;
        if (!this.irsActivated) {
          this.irsActivated = true;
        }
      } else {
        this.areRotationDirection = 0;
        if (this.irsActivated) {
          this.irsActivated = false;
        }
      }

      // Hold functionality for ARE - check if hold key is currently held during ARE
      const holdCurrentlyHeld = this.holdEnabled && isDown(this.keys.hold);
      if (holdCurrentlyHeld && !this.areHoldPressed) {
        this.areHoldPressed = true;
      } else if (!holdCurrentlyHeld && this.areHoldPressed) {
        this.areHoldPressed = false;
      }
    } else {
      // Reset ARE rotation tracking when not in ARE and piece exists
      this.areRotationKeys = { k: false, space: false, l: false };
      this.areRotationDirection = 0;
      this.irsActivated = false;
      this.areHoldPressed = false;
    }

    // Update mino fading system (runs even when game is over)
    if (this.minoFadeActive) {
      this.minoFadeTimer += this.deltaTime;

      const totalRows = this.placedMinoRows.length;
      if (totalRows === 0 || this.minoFadePerRowDuration <= 0) {
        this.minoFadeActive = false;
        this.fadingComplete = true;
        if (this.gameOverFadeDoneTime === null) {
          this.gameOverFadeDoneTime = this.time.now;
        }
        if (this.creditsPending) {
          this.creditsPending = false;
          this.startCredits();
          if (this.gameMode && typeof this.gameMode.onCreditsStart === "function") {
            this.gameMode.onCreditsStart(this);
          }
        }
      } else if (this.minoFadeProgress < totalRows) {
        const rowIndex = this.minoFadeProgress;
        const rowToFade = this.placedMinoRows[rowIndex];
        const perRow = this.minoFadePerRowDuration;
        const alpha = Math.max(0, 1 - this.minoFadeTimer / perRow);
        this.minoRowFadeAlpha[rowToFade] = alpha;

        if (this.minoFadeTimer >= perRow) {
          this.minoFadeTimer = 0;
          this.minoFadeProgress++;
          this.minoRowFadeAlpha[rowToFade] = 0;
          if (this.minoFadeProgress >= totalRows) {
            this.minoFadeActive = false;
            this.fadingComplete = true;
            if (this.gameOverFadeDoneTime === null) {
              this.gameOverFadeDoneTime = this.time.now;
            }
          }
        }
      }
    }

    // Pause/unpause with ESC - handle BEFORE early return
    if (justDown(this.keys.pause) && !this.gameOver) {
      this.togglePause();
    }

    // Update game over timer (runs even when game is over)
    if (this.gameOver) {
      this.gameOverTimer += this.deltaTime;
      if (this.gameOverTimer >= 10) {
        // 10 seconds
        this.saveBestScore();
        this.scene.start("MenuScene");
      }
    }
    // Show GAME OVER text only after fade completes + 3s
    if (this.fadingComplete && this.gameOverFadeDoneTime !== null) {
      const elapsedSinceFade = this.time.now - this.gameOverFadeDoneTime;
      if (elapsedSinceFade >= 3000) {
        this.showGameOverText = true;
      }
    }

    // Update time tracking using Date.now() for reliability
    this.updateTimer();

    // Handle BGM first play vs loop mode
    this.manageBGMLoopMode();

    // Track active time and ARE time for PPS calculations (ignore paused time)
    if (!this.isPaused && !this.level999Reached) {
      if (!this.areActive) {
        this.activeTime += this.deltaTime;
      } else {
        this.areTime += this.deltaTime;
      }
    }

    // Sakura-specific input (skip, hold-advance) before pause/game over exit
    if (
      this.gameMode &&
      typeof this.gameMode.handleSakuraInput === "function" &&
      this.selectedMode === "tgm3_sakura"
    ) {
      this.gameMode.handleSakuraInput(
        this,
        { startDown, startJustDown, holdJustDown },
        this.deltaTime,
      );
    }

    // Skip ALL game logic if paused or game over
    if (this.isPaused) {
      if (justDown(this.keys.menu)) {
        this.scene.start("MenuScene");
        return;
      }
    }

    if (this.isPaused || this.gameOver) {
      // Still update UI for pause screen
      this.draw();
      return;
    }

    if (!this.areActive || !this.currentPiece) {
      // Track key states for DAS using custom keys (z for left, c for right)
      // Allow DAS during loading for initial piece handling
      // Soft drop handling - only when s key is held
      if (downDown || sKeyDown) {
        if (this.currentPiece.move(this.board, 0, 1)) {
          this.resetLockDelay();
          this.softDropRows += 1; // Track soft drop rows for scoring
          this.wasGroundedDuringSoftDrop = false; // Reset flag when piece can move
        } else if (!this.isGrounded) {
          // Piece just became grounded - start lock delay and play ground sound once
          this.isGrounded = true;
          this.lockDelay += this.deltaTime;
          if (this.lockDelay >= this.lockDelayMax) {
            // 30 frames = 0.5 seconds
            this.lockPiece();
          }
          // Play ground sound only once when piece first touches ground during soft drop
          if (
            !this.wasGroundedDuringSoftDrop &&
            this.currentPiece.isTouchingGround(this.board)
          ) {
            this.currentPiece.playGroundSound(this);
            this.wasGroundedDuringSoftDrop = true;
          }
        } else {
          // Piece is already grounded - don't play ground sound again during soft drop
          // This prevents the annoying repetitive ground sound when holding soft drop
        }
        // If piece was already grounded, don't increment lock delay
      } else {
        // Reset flag when soft drop key is not held
        this.wasGroundedDuringSoftDrop = false;
      }

      // Single press actions (keep JustDown for these)
      if (justDown(this.cursors.down)) {
        if (this.currentPiece.move(this.board, 0, 1)) {
          this.resetLockDelay();
        } else if (!this.isGrounded) {
          // Only start lock delay if piece wasn't already grounded
          this.isGrounded = true;
          this.lockDelay += this.deltaTime;
          if (this.lockDelay >= this.lockDelayMax) {
            // 30 frames = 0.5 seconds
            this.lockPiece();
          }
        } else {
          // Piece is already grounded but tried to move down - play ground sound only if touching ground
          if (this.currentPiece.isTouchingGround(this.board)) {
            this.currentPiece.playGroundSound(this);
          }
        }
        // If piece was already grounded, don't increment lock delay
      }
      // Hold functionality for modes that support it
      if (this.holdEnabled && justDown(this.keys.hold)) {
        this.hold();
      }
    }

    // Pause/unpause with ESC
    if (justDown(this.keys.pause) && !this.gameOver) {
      this.togglePause();
    }

    // Gravity (TGM-style curve, time-based to be FPS independent)
    if (!this.areActive) {
      // Only apply gravity when not in ARE
      const internalGravity = Math.max(1, this.getTGMGravitySpeed(this.level));
      if (!this.currentPiece) return;

      // rowsPerSecond derived from internalGravity (1/256G units) assuming 60 fps baseline
      const rowsPerSecond = (internalGravity / 256) * 60;
      this.gravityAccum += rowsPerSecond * this.deltaTime; // deltaTime in seconds

      const rowsToFall = Math.floor(this.gravityAccum);
      if (rowsToFall > 0) {
        let movedRows = 0;
        for (let i = 0; i < rowsToFall; i++) {
          if (this.currentPiece.move(this.board, 0, 1)) {
            movedRows++;
            this.isGrounded = false;
            this.resetLockDelay();
          } else {
            // Piece can't move down anymore
            if (!this.isGrounded) {
              this.isGrounded = true;
              this.lockDelay = this.deltaTime; // Start counting from current delta time
              this.currentPiece.playGroundSound(this);
            }
            break;
          }
        }
        // retain fractional remainder only if we moved; if blocked, drop any accumulated
        this.gravityAccum = movedRows > 0 ? this.gravityAccum - movedRows : 0;
      }
    }

    // Count lock delay continuously when grounded (increment after initial frame)
    if (this.isGrounded && this.currentPiece && !this.areActive) {
      // If we just spawned onto the stack in 20G, begin timing after first grounded frame
      if (this.lockDelayBufferedStart) {
        this.lockDelayBufferedStart = false;
        this.lockDelay = this.deltaTime;
      } else if (this.lockDelay > 0) {
        this.lockDelay += this.deltaTime;
        if (this.lockDelay >= this.lockDelayMax) {
          // 30 frames = 0.5 seconds
          this.lockPiece();
        }
      }
    }

    // ARE (Appearance Delay) handling
    if (this.areActive) {
      this.areTimer += this.deltaTime;
      if (this.areTimer >= this.areDelay) {
        if (this.lineClearDelayActive) {
          // Line clear delay completed, perform flash fade-out and enter line ARE
          this.lineClearDelayActive = false;
          this.lineClearPhase = true;
          this.areDelay = this.pendingLineAREDelay || 41 / 60;
          this.areTimer = 0;

          // Now clear lines and play fall sound at the beginning of line ARE
          this.clearStoredLines();
          const fallSound = this.sound.add("fall", { volume: 0.7 });
          fallSound.play();
          this.isClearingLines = false;
          this.lineClearDelayDuration = 0;
          this.pendingLineAREDelay = 0;
        } else if (this.lineClearPhase) {
          // Line ARE completed, spawn next piece
          this.lineClearPhase = false;
          this.areActive = false;
          this.spawnPiece();
        } else {
          // Normal ARE completed, spawn next piece
          this.areActive = false;
          this.spawnPiece();
        }
      }
    }

    // Update piece active time for scoring
    if (this.currentPiece && this.pieceSpawnTime > 0) {
      this.pieceActiveTime = Math.floor(
        (this.time.now - this.pieceSpawnTime) / (1000 / 60),
      ); // Convert to frames
    }

    // Update grade based on performance (only for modes with grading)
    if (!this.creditsActive) {
      const modeConfig = this.gameMode ? this.gameMode.getConfig() : {};
      const hasGrading = modeConfig.hasGrading !== false;
      if (hasGrading) {
        if (this.gameMode && typeof this.gameMode.getDisplayedGrade === "function") {
          const displayedGrade = this.gameMode.getDisplayedGrade();
          if (displayedGrade) {
            this.grade = displayedGrade;
          }

          if (this.gameMode && typeof this.gameMode.getInternalGrade === "function") {
            const internalGrade = this.gameMode.getInternalGrade();
            if (typeof internalGrade === "number") {
              this.internalGrade = internalGrade;
            }
          }
          this.updateGradeUIVisibility();
        } else {
          this.updateGrade();
        }
        this.updateGradeUIVisibility();
      }
    }

    // Calculate piece per second rates (skip during credits)
    if (!this.creditsActive) {
      this.updatePPS();
    }

    // Update section message
    if (this.sectionMessage) {
      this.sectionMessageTimer--;
      if (this.sectionMessageTimer <= 0) {
        this.sectionMessage = null;
      }
    }

    // Update game mode (for TGM2 grading system, powerup minos, etc.)
    if (this.gameMode && this.gameMode.update) {
      this.gameMode.update(this, this.deltaTime);
    }

    // Update credits system
    if (this.creditsActive) {
      this.creditsTimer += 1 / 60; // Convert frame time to seconds

      // End credits after duration
      if (this.creditsTimer >= this.creditsDuration) {
        this.finalizeCreditsRoll();
      }
    }

    // Draw

    this.draw();
  }

  spawnPiece() {
    if (this.nextPieces.length < 6) {
      this.generateNextPieces();
    }
    // Reset lock reset tracking for new piece
    this.lockResetCount = 0;
    this.lastGroundedY = null;
    const type = this.nextPieces.shift();

    // Create piece with default rotation first
    this.currentPiece = new Piece(type, this.rotationSystem, 0);

    if (this.isFirstSpawn && this.gameMode) {
      this.dasDelay =
        this.gameMode.getDAS && typeof this.gameMode.getDAS === "function"
          ? this.gameMode.getDAS()
          : this.dasDelay;
      this.arrDelay =
        this.gameMode.getARR && typeof this.gameMode.getARR === "function"
          ? this.gameMode.getARR()
          : this.arrDelay;
      this.areDelay =
        this.gameMode.getARE && typeof this.gameMode.getARE === "function"
          ? this.gameMode.getARE()
          : this.areDelay;
    }


    // Track if piece will be pre-rotated for spawn validation
    let wasPreRotated = false;

    // IRS sound will be played after IRS is applied

    // Play next mino sound for the piece that will spawn NEXT (not current piece)
    if (this.nextPieces.length > 0) {
      const nextPieceType = this.nextPieces[0];
      const nextPieceSoundKey = `sound_${nextPieceType.toLowerCase()}`;
      if (this.sound && this.sound.get(nextPieceSoundKey)) {
        const pieceSound = this.sound.add(nextPieceSoundKey, { volume: 0.4 });
        pieceSound.play();
      } else if (this.sound) {
        try {
          const pieceSound = this.sound.add(nextPieceSoundKey, { volume: 0.4 });
          pieceSound.play();
        } catch (error) {
          // Sound file not found, continue silently
        }
      }
    }

    if (
      !this.board.isValidPosition(
        this.currentPiece,
        this.currentPiece.x,
        this.currentPiece.y,
      )
    ) {
      // If prerotated piece can't spawn, try shifting up to give player a chance
      if (wasPreRotated) {
        let shifted = false;
        for (let shiftY = -1; shiftY >= -3; shiftY--) {
          if (
            this.board.isValidPosition(
              this.currentPiece,
              this.currentPiece.x,
              this.currentPiece.y + shiftY,
            )
          ) {
            this.currentPiece.y += shiftY;
            shifted = true;
            break;
          }
        }
        if (!shifted) {
          // Still can't spawn after shifting - game over
          // Stop BGM on game over
          if (this.currentBGM) {
            this.currentBGM.stop();
            this.currentBGM = null;
          }

          // Show game over screen
          this.showGameOverScreen();
          return;
        }
      } else {
        // Game over - piece can't spawn (reached top of visible area)
        // Stop BGM on game over
        if (this.currentBGM) {
          this.currentBGM.stop();
          this.currentBGM = null;
        }

        // Show game over screen
        this.showGameOverScreen();
        return;
      }
    }

    // Check for 20G gravity (using configuration-based detection)
    const internalGravity = this.getTGMGravitySpeed(this.level);
    if (internalGravity >= 5120) {
      // For 20G gravity, immediately hard drop the piece to the ground/stack
      // but do NOT lock it - let it be placed on top of the stack
      this.currentPiece.hardDrop(this.board);
      // Set grounded state since piece is now on the ground/stack
      this.isGrounded = true;
      this.lastGroundedY = this.currentPiece ? this.currentPiece.y : this.lastGroundedY;
      this.lockDelayBufferedStart = true; // start counting on next frame to avoid instant lock
      this.lockDelay = 0;
      // Do NOT call lockPiece() - let normal gameplay continue
    } else {
      // Normal spawning behavior for non-20G levels
      this.resetLockDelay();
      this.isGrounded = false;
    }

    // Track piece spawn time for scoring
    this.pieceSpawnTime = this.time.now;
    this.pieceActiveTime = 0;

    // Preserve ARE input states so we can apply IRS/IHS correctly after swapping
    const rotationDirectionAtSpawn = this.areRotationDirection;
    const rotationKeysAtSpawn = { ...this.areRotationKeys };
    const holdPressedAtSpawn = this.areHoldPressed;

    // Reset ARE rotation and hold tracking for the next cycle
    this.areRotationDirection = 0;
    this.areHoldPressed = false;


    // Handle ARE hold (Initial Hold System) for modes that support hold
    if (this.holdEnabled && holdPressedAtSpawn) {
      this.hold();
    }


    const irsRotationDirection = rotationDirectionAtSpawn;

    // Apply IRS to the spawning piece (which may have been swapped by IHS)
    if (irsRotationDirection === 1) {
      this.currentPiece.rotation = 1; // Clockwise 90 degrees
      this.currentPiece.shape = this.currentPiece.getRotatedShape();
      wasPreRotated = true;
    } else if (irsRotationDirection === -1) {
      this.currentPiece.rotation = 3; // Counter-clockwise 90 degrees
      this.currentPiece.shape = this.currentPiece.getRotatedShape();
      wasPreRotated = true;
    }

    // Prevent the held rotation key from rotating again on the first active frame after spawn.
    // Otherwise, the piece can rotate twice (IRS + immediate input rotation), which can apply kicks (often +1Y).
    if (rotationKeysAtSpawn.k) {
      this.kKeyPressed = true;
    }
    if (rotationKeysAtSpawn.space) {
      this.spaceKeyPressed = true;
    }
    if (rotationKeysAtSpawn.l) {
      this.lKeyPressed = true;
    }

    // IRS rotates the piece without kicks; ensure the rotated spawn is still valid.
    if (
      wasPreRotated &&
      !this.board.isValidPosition(
        this.currentPiece,
        this.currentPiece.x,
        this.currentPiece.y,
      )
    ) {
      let shifted = false;
      for (let shiftY = -1; shiftY >= -3; shiftY--) {
        if (
          this.board.isValidPosition(
            this.currentPiece,
            this.currentPiece.x,
            this.currentPiece.y + shiftY,
          )
        ) {
          this.currentPiece.y += shiftY;
          shifted = true;
          break;
        }
      }

      if (!shifted) {
        if (this.currentBGM) {
          this.currentBGM.stop();
          this.currentBGM = null;
        }
        this.showGameOverScreen();
        return;
      }
    }

    // Log IRS+IHS combination
    // Play IRS sound if piece was pre-rotated
    if (wasPreRotated) {
      const irsSound = this.sound.add("IRS", { volume: 0.5 });
      irsSound.play();
    }

    // Reset finesse tracking for the freshly active piece
    this.resetFinessePieceInputs(this.currentPiece);

    // Log final piece state after spawn
    if (this.areLeftHeld) {
      this.leftKeyPressed = true;
      this.leftTimer = this.dasDelay;
      this.leftInRepeat = false;
    }
    if (this.areRightHeld) {
      this.rightKeyPressed = true;
      this.rightTimer = this.dasDelay;
      this.rightInRepeat = false;
    }
    this.areLeftHeld = false;
    this.areRightHeld = false;

    // Update level on piece spawn
    if (this.isFirstSpawn) {
      // Only set level to 0 if no starting level was specified via URL
      if (!this.startingLevel || this.startingLevel === 0) {
        this.level = 0;
      }
      this.isFirstSpawn = false;
    } else {
      this.updateLevel("piece");
    }
  }

  generateNextPieces() {
    for (let i = 0; i < 6; i++) {
      // Check if current mode supports powerup minos
      if (this.gameMode && this.gameMode.generateNextPiece) {
        const piece = this.gameMode.generateNextPiece(this);
        this.nextPieces.push(piece);
      } else {
        // Fallback to original TGM1 piece generation
        this.nextPieces.push(this.generateTGM1Piece());
      }
    }
  }

  validatePieceHistory() {
    // Ensure piece history contains exactly 4 pieces and no null/undefined values
    if (!this.pieceHistory || this.pieceHistory.length !== 4) {
      this.pieceHistory = ["Z", "Z", "S", "S"]; // Reset to initial state
    }

    // Filter out any null, undefined, or invalid pieces
    const validPieces = Object.keys(TETROMINOES);
    this.pieceHistory = this.pieceHistory.filter(
      (piece) => piece && validPieces.includes(piece),
    );

    // If history got too small, fill with default pieces
    while (this.pieceHistory.length < 4) {
      this.pieceHistory.push("Z"); // Default fallback
    }

    // Ensure we never have more than 4 pieces
    if (this.pieceHistory.length > 4) {
      this.pieceHistory = this.pieceHistory.slice(-4); // Keep only last 4
    }
  }

  generateTGM1Piece() {
    // TGM1 randomizer algorithm:
    // 1. Keep a history of four recent pieces (start with [Z,Z,S,S])
    // 2. Generate a piece, then check if the piece is in the history
    // 3. If it does, generate another piece (retry generating another piece up to 6 times)
    // 4. The first piece can never be S, Z, or O

    const types = Object.keys(TETROMINOES);
    let generatedPiece;
    let attempts = 0;

    // First piece restriction: cannot be S, Z, or O
    if (this.firstPiece) {
      const firstPieceTypes = ["I", "J", "L", "T"]; // Exclude S, Z, O
      generatedPiece =
        firstPieceTypes[Math.floor(Math.random() * firstPieceTypes.length)];
      this.firstPiece = false;
    } else {
      // Generate piece with history checking
      do {
        generatedPiece = types[Math.floor(Math.random() * types.length)];
        attempts++;
      } while (this.pieceHistory.includes(generatedPiece) && attempts < 6);
    }

    // Update history: maintain exactly 4 most recent pieces
    // Remove oldest piece and add new piece
    this.pieceHistory.shift(); // Remove first (oldest) element
    this.pieceHistory.push(generatedPiece); // Add new piece at end

    // Ensure history never exceeds 4 pieces (safety check)
    if (this.pieceHistory.length > 4) {
      this.pieceHistory = this.pieceHistory.slice(-4); // Keep only last 4
    }

    return generatedPiece;
  }

  lockPiece() {
    // Play lock sound
    const lockSound = this.sound.add("lock", { volume: 0.6 });
    lockSound.play();

    // Track pieces placed for PPS calculation
    this.totalPiecesPlaced++;
    // Track worst choke (longest active time)
    this.worstChoke = Math.max(this.worstChoke, this.pieceActiveTime || 0);

    // Start lock flash effect
    this.startLockFlash();

    // Track placed minos before placing the piece
    for (let r = 0; r < this.currentPiece.shape.length; r++) {
      for (let c = 0; c < this.currentPiece.shape[r].length; c++) {
        if (this.currentPiece.shape[r][c]) {
          const boardX = this.currentPiece.x + c;
          const boardY = this.currentPiece.y + r;
          this.trackPlacedMino(boardX, boardY, this.currentPiece.color);

          if (
            this.fadingRollActive &&
            !this.invisibleStackActive &&
            boardY >= 0 &&
            boardY < this.board.rows &&
            boardX >= 0 &&
            boardX < this.board.cols
          ) {
            this.board.fadeGrid[boardY][boardX] = this.currentTime + 4;
          }
        }
      }
    }

    this.board.placePiece(
      this.currentPiece,
      this.currentPiece.x,
      this.currentPiece.y,
    );

    // Finesse evaluation on lock (SRS sprint/ultra only)
    this.evaluateFinesseOnLock(this.currentPiece);
    this.finesseActiveForPiece = false;

    // Check for T-spin before clearing lines
    const isTSpin = this.detectTSpin(this.currentPiece, this.board);

    // Detect cleared lines for animation (don't clear them yet)
    const linesToClear = [];
    // Check ALL rows in the board (0-21) to find complete lines
    for (let r = 0; r < this.board.rows; r++) {
      if (this.board.grid[r].every((cell) => cell !== 0)) {
        linesToClear.push(r);
      }
    }

    // Store cleared lines for animation
    this.clearedLines = linesToClear;

    if (!this.creditsActive && linesToClear.length === 4) {
      const sectionIndex = Math.floor(this.getSectionBasisValue() / this.getSectionLength());
      if (sectionIndex === this.currentSection) {
        this.currentSectionTetrisCount++;
      }
    }

    // Update score with enhanced system
    this.updateScore(linesToClear.length, this.currentPiece.type, isTSpin);
    this.updateLevel("lines", linesToClear.length);
    this.canHold = true;

    // Handle powerup effects for TGM2 mode
    if (this.gameMode && this.gameMode.handleLineClear) {
      this.gameMode.handleLineClear(
        this,
        linesToClear.length,
        this.currentPiece.type,
      );
    }

    this.currentPiece = null;

    if (linesToClear.length > 0) {
      const lineClearDelay =
        this.gameMode && this.gameMode.getLineClearDelay
          ? this.gameMode.getLineClearDelay()
          : 40 / 60;
      const lineAREDelay =
        this.gameMode && this.gameMode.getLineARE
          ? this.gameMode.getLineARE()
          : 41 / 60;
      this.lineClearDelayDuration = lineClearDelay;
      this.pendingLineAREDelay = lineAREDelay;
      this.areDelay = lineClearDelay;
      this.areTimer = 0;
      this.areActive = true;
      this.lineClearDelayActive = true;
      this.lineClearPhase = false;
      this.isClearingLines = true;
      // Reset ARE input state when ARE starts
      this.areRotationDirection = 0;
      this.areHoldPressed = false;

      // Play clear sound
      const clearSound = this.sound.add("clear", { volume: 0.7 });
      clearSound.play();
    } else {
      // Start normal ARE (use mode timing if available)
      const normalARE =
        this.gameMode && this.gameMode.getARE
          ? this.gameMode.getARE()
          : 30 / 60;
      this.areDelay = normalARE;
      this.areTimer = 0;
      this.areActive = true;
      this.lineClearPhase = false;
      this.isClearingLines = false;
      this.lineClearDelayActive = false;
      this.lineClearDelayDuration = 0;
      this.pendingLineAREDelay = 0;
      // Reset ARE input state when ARE starts
      this.areRotationDirection = 0;
      this.areHoldPressed = false;
    }

    // If item animation is active (e.g., powerup activation), delay ARE start by 2 seconds
    if (this.gameMode && this.gameMode.itemAnimationActive) {
      this.areTimer = -2; // Delay ARE start by 2 seconds
    }
  }

  // Reset piece to its default orientation (used when moving into hold)
  resetPieceToDefaultRotation(piece) {
    const rotations =
      this.rotationSystem === "ARS"
        ? SEGA_ROTATIONS[piece.type].rotations
        : TETROMINOES[piece.type].rotations;
    piece.rotation = 0;
    piece.shape = rotations[0].map((row) => [...row]);
  }

  // Hold functionality for modes that support it
  hold() {
    if (!this.canHold || !this.holdEnabled || !this.currentPiece) return;

    const currentType = this.currentPiece?.type ?? "none";
    const holdType = this.holdPiece ? this.holdPiece.type : "none";

    if (this.holdPiece) {
      // Swap current piece with hold piece
      this.resetPieceToDefaultRotation(this.currentPiece);
      const oldCurrent = this.currentPiece.type;
      const oldHold = this.holdPiece.type;
      [this.currentPiece, this.holdPiece] = [this.holdPiece, this.currentPiece];
      this.currentPiece.x = 3; // Reset position
      this.currentPiece.y = 1; // Spawn position
      this.currentPiece.rotation = 0; // Reset rotation
      // Reset piece shape to initial rotation
      const rotations =
        this.rotationSystem === "ARS"
          ? SEGA_ROTATIONS[this.currentPiece.type].rotations
          : TETROMINOES[this.currentPiece.type].rotations;
      this.currentPiece.shape = rotations[0].map((row) => [...row]);
    } else {
      // Move current piece to hold
      this.resetPieceToDefaultRotation(this.currentPiece);
      this.holdPiece = this.currentPiece;
      this.spawnPiece();
    }

    this.canHold = false;
    this.resetLockDelay();
    this.isGrounded = false;

    // Play hold sound if available
    if (this.sound && this.sound.get("lock")) {
      const holdSound = this.sound.add("lock", { volume: 0.4 });
      holdSound.play();
    }
  }

  clearStoredLines() {
    // ROBUST FIX: Clear lines without index shifting issues
    // Instead of splice/unshift, build a new grid without the cleared lines

    // Phase 1: Clear originally detected lines
    if (this.clearedLines.length > 0) {
      // Create a new grid without the cleared lines
      const newGrid = [];
      const newFadeGrid = [];
      const clearedSet = new Set(this.clearedLines);

      // Add all non-cleared rows to new grid
      for (let r = 0; r < this.board.rows; r++) {
        if (!clearedSet.has(r)) {
          newGrid.push(this.board.grid[r]);
          newFadeGrid.push(this.board.fadeGrid[r]);
        }
      }

      // Add empty rows at the top to maintain grid size
      const emptyRowsNeeded = this.clearedLines.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        newGrid.unshift(Array(this.board.cols).fill(0));
        newFadeGrid.unshift(Array(this.board.cols).fill(0));
      }

      // Replace the entire grid
      this.board.grid = newGrid;
      this.board.fadeGrid = newFadeGrid;
      this.clearedLines = [];
    }

    // Phase 2: CRITICAL FIX - Re-check for any newly completed lines
    const additionalLines = [];
    for (let r = 0; r < this.board.rows; r++) {
      if (this.board.grid[r].every((cell) => cell !== 0)) {
        additionalLines.push(r);
      }
    }

    // Clear any additional lines that became complete
    if (additionalLines.length > 0) {
      const newGrid = [];
      const newFadeGrid = [];
      const clearedSet = new Set(additionalLines);

      for (let r = 0; r < this.board.rows; r++) {
        if (!clearedSet.has(r)) {
          newGrid.push(this.board.grid[r]);
          newFadeGrid.push(this.board.fadeGrid[r]);
        }
      }

      const emptyRowsNeeded = additionalLines.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        newGrid.unshift(Array(this.board.cols).fill(0));
        newFadeGrid.unshift(Array(this.board.cols).fill(0));
      }

      this.board.grid = newGrid;
      this.board.fadeGrid = newFadeGrid;
    }
  }

  resetLockDelay() {
    // SRS: limit lock delay resets to prevent infinite stalling
    if (this.rotationSystem === "SRS" && this.isGrounded) {
      if (this.lockResetCount >= 15) {
        this.lockPiece();
        return;
      }
      this.lockResetCount++;
    }

    // ARS: lock reset rules
    if (this.rotationSystem === "ARS" && this.isGrounded) {
      // If move-reset is enabled, behave like SRS (limited by 15 total resets)
      if (this.arsMoveResetEnabled) {
        if (this.lockResetCount >= 15) {
          this.lockPiece();
          return;
        }
        this.lockResetCount++;
        this.lockDelay = 0;
        this.isGrounded = true; // stay grounded
        this.wasGroundedDuringSoftDrop = false;
        return;
      }

      // Default ARS step-reset: only allow reset after dropping at least one row while grounded
      const currentY = this.currentPiece ? this.currentPiece.y : null;
      if (currentY === null) return;
      if (this.lastGroundedY === null) {
        this.lastGroundedY = currentY;
        // First grounded frame after touch: start counting lock delay
        this.lockDelay = 0;
        this.wasGroundedDuringSoftDrop = false;
        return;
      }
      // Require downward progress of at least one row while staying grounded
      if (currentY <= this.lastGroundedY) {
        // No progress: do not reset timer
        return;
      }
      this.lastGroundedY = currentY;
      // Keep grounded state but reset the timer
      this.lockDelay = 0;
      this.wasGroundedDuringSoftDrop = false;
      return;
    }

    // Default reset behavior
    this.lockDelay = 0;

          // Add all non-cleared rows to new grid
          for (let r = 0; r < this.board.rows; r++) {
            if (!clearedSet.has(r)) {
              newGrid.push(this.board.grid[r]);
              newFadeGrid.push(this.board.fadeGrid[r]);
            }
          }

          // Add empty rows at the top to maintain grid size
          const emptyRowsNeeded = this.clearedLines.length;
          for (let i = 0; i < emptyRowsNeeded; i++) {
            newGrid.unshift(Array(this.board.cols).fill(0));
            newFadeGrid.unshift(Array(this.board.cols).fill(0));
          }

          // Replace the entire grid
          this.board.grid = newGrid;
          this.board.fadeGrid = newFadeGrid;
          this.clearedLines = [];
    this.maxPpsRecorded = Math.max(this.maxPpsRecorded, this.conventionalPPS);

    // Track PPS history per placed piece for sprint graph
    if (this.totalPiecesPlaced > this.lastPpsRecordedPieceCount) {
      this.ppsHistory.push(this.conventionalPPS);
      this.lastPpsRecordedPieceCount = this.totalPiecesPlaced;
      // Keep history reasonable
      if (this.ppsHistory.length > 200) {
        this.ppsHistory.shift();
      }
    }
  }

  drawSprintPpsGraph() {
    if (!this.ppsGraphGraphics || !this.ppsGraphArea) {
      return;
    }
    const history = this.ppsHistory || [];
    const { x, y, width, height } = this.ppsGraphArea;
    const g = this.ppsGraphGraphics;

    g.clear();
    g.fillStyle(0x0a0a0a, 0.6);
    g.fillRect(x, y, width, height);
    g.lineStyle(1, 0xffffff, 0.5);
    g.strokeRect(x - 1, y - 1, width + 2, height + 2);

    if (!history.length) {
      if (this.ppsSummaryText) {
        const chokeSec = (this.worstChoke || 0) / 60;
        this.ppsSummaryText.setText(
          `Max PPS: ${this.maxPpsRecorded.toFixed(2)} | Worst choke: ${chokeSec.toFixed(2)}s`,
        );
      }
      return;
    }

    const maxBars = Math.max(1, Math.min(history.length, 60));
    const barHeight = height / maxBars;
    const visibleHistory = history.slice(-maxBars);
    const maxPps = Math.max(1.5, ...visibleHistory);

    visibleHistory.forEach((pps, idx) => {
      const barLength = Math.min(width, Math.max(1, (pps / maxPps) * width));
      const barX = x;
      const barY = y + height - (idx + 1) * barHeight;
      g.fillStyle(0x00ffd0, 0.9);
      g.fillRect(barX, barY, barLength, Math.max(1, barHeight - 1));
    });

    if (this.ppsSummaryText) {
      const chokeSec = (this.worstChoke || 0) / 60;
      this.ppsSummaryText.setText(
        `Max PPS: ${this.maxPpsRecorded.toFixed(2)} | Worst choke: ${chokeSec.toFixed(2)}s`,
      );
    }
  }

  updateScore(lines, pieceType = null, isTSpin = false) {
    // Don't update score during credits roll
    if (this.creditsActive) {
      if (this.rollType) {
        this.rollLinesCleared += lines;
        if (lines > 0) {
          this.lastClearDuringRoll = { lines, time: this.currentTime };
        }
      }
      return;
    }

    // Determine scoring system based on mode
    const guidelineModes = new Set([
      "marathon",
      "sprint_40",
      "sprint_100",
      "ultra",
      "zen",
    ]);

    const selectedModeKey =
      typeof this.selectedMode === "string"
        ? this.selectedMode
        : this.selectedModeId || "";

    const isTwentyGMode =
      (this.gameMode && typeof this.gameMode.isTwentyGMode === "function"
        ? this.gameMode.isTwentyGMode()
        : false) || selectedModeKey === "20g";

    const isStandardMode =
      !isTwentyGMode && guidelineModes.has(selectedModeKey);

    if (isStandardMode) {
      this.updateGuidelineScore(lines, pieceType, isTSpin);
    } else {
      this.updateTGM1Score(lines, pieceType, isTSpin);
    }
  }

  updateGuidelineScore(lines, pieceType = null, isTSpin = false) {
    let points = 0;
    let clearType = null;

    // Guideline scoring with T-spin detection
    if (lines > 0) {
      // Base line clear points
      const basePoints = [0, 100, 300, 500, 800][lines] || 800; // Single, Double, Triple, Tetris
      points = basePoints * this.level;

      // T-spin bonuses
      if (isTSpin) {
        if (lines === 1) {
          points = 800 * this.level; // T-Spin Single
          clearType = "t-spin single";
        } else if (lines === 2) {
          points = 1200 * this.level; // T-Spin Double
          clearType = "t-spin double";
        } else if (lines === 3) {
          points = 1600 * this.level; // T-Spin Triple
          clearType = "t-spin triple";
        }
      }

      // Back-to-back bonus (1.5x for consecutive line clears)
      if (this.backToBack && (lines >= 4 || (isTSpin && lines >= 2))) {
        points = Math.floor(points * 1.5);
        clearType = clearType ? clearType + " b2b" : "b2b";
      }

      // Set back-to-back flag for next clear
      this.backToBack = lines >= 4 || (isTSpin && lines >= 2);

      // Perfect clear bonus (not standard but common in implementations)
      const boardIsFull = this.board.grid.every((row) =>
        row.every((cell) => cell !== 0),
      );
      if (boardIsFull) {
        points += 3500; // All Clear bonus
        clearType = clearType ? clearType + " all clear" : "all clear";
      }
    } else {
      this.backToBack = false;
    }

    // Soft drop bonus (1 point per row)
    points += this.softDropRows;

    // Hard drop bonus (2 points per row)
    points += this.hardDropRows * 2;

    // Reset drop counters for next piece
    this.softDropRows = 0;
    this.hardDropRows = 0;

    this.score += points;
    this.totalLines += lines;
    const isSprintMode =
      this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100";
    if (isSprintMode) {
      const sprintTarget = this.selectedMode === "sprint_100" ? 100 : 40;
      this.totalLines = Math.min(this.totalLines, sprintTarget);
    }
    this.lastClearType = clearType;

    // Track piece for potential T-spin detection next time
    this.lastPieceType = pieceType;
  }

  updateTGM1Score(lines, pieceType = null, isTSpin = false) {
    // Official TGM1 scoring formula:
    // Score = ceil([level + cleared lines]/4 + soft dropped rows + (2 * hard dropped rows))
    //        * cleared lines * combo * bravo

    let points = 0;
    let clearType = null;

    // Calculate combo value
    // Combo = Previous combo value + (2 * Cleared lines) - 2, or 1 if no lines cleared
    let combo = 1; // Default for no lines cleared
    if (lines > 0) {
      this.comboCount = this.comboCount === -1 ? 0 : this.comboCount;
      this.comboCount += 2 * lines - 2;
      combo = Math.max(1, this.comboCount + 1); // +1 because combo starts at 1
    } else {
      this.comboCount = -1;
    }

    // Calculate bravo bonus (perfect clear)
    let bravo = 1;
    if (lines > 0) {
      const boardIsFull = this.board.grid.every((row) =>
        row.every((cell) => cell !== 0),
      );
      if (boardIsFull) {
        bravo = 4;
        clearType = "bravo";
      }
    }

    // Main scoring formula
    if (lines > 0) {
      const baseScore = Math.ceil(
        (this.level + lines) / 4 + this.softDropRows + 2 * this.hardDropRows,
      );
      points = baseScore * lines * combo * bravo;
    }

    // Reset drop counters for next piece
    this.softDropRows = 0;
    this.hardDropRows = 0;

    this.score += points;
    this.totalLines += lines;
    if (this.selectedMode === "sprint_40") {
      this.totalLines = Math.min(this.totalLines, 40);
    }
    this.lastClearType = clearType;

    // Track piece for potential T-spin detection next time
    this.lastPieceType = pieceType;
  }

  updateLevel(type, amount = 1) {
    if (this.creditsActive) {
      return;
    }
    const oldLevel = this.level;

    if (type === "piece") {
      this.piecesPlaced++;
    }

    // Use mode-specific level update logic
    let newLevel = this.level;
    if (this.gameMode && this.gameMode.onLevelUpdate) {
      newLevel = this.gameMode.onLevelUpdate(
        this.level,
        oldLevel,
        type,
        amount,
      );
    } else {
      // Default logic
      if (type === "piece") {
        newLevel += 1;
      } else if (type === "lines") {
        newLevel += amount;
      }
    }

    this.level = newLevel;

    // Ensure level never exceeds mode's gravity level cap
    const maxLevel = this.gameMode ? this.gameMode.getGravityLevelCap() : 999;
    if (this.level > maxLevel) {
      this.level = maxLevel;
    }

    // Update mode-specific timings in case they change with level
    if (this.gameMode) {
      this.dasDelay =
        this.gameMode.getDAS && typeof this.gameMode.getDAS === "function"
          ? this.gameMode.getDAS()
          : 16 / 60;
      this.arrDelay =
        this.gameMode.getARR && typeof this.gameMode.getARR === "function"
          ? this.gameMode.getARR()
          : 1 / 60;
      this.areDelay =
        this.gameMode.getARE && typeof this.gameMode.getARE === "function"
          ? this.gameMode.getARE()
          : 30 / 60;
      this.lockDelay =
        this.gameMode.getLockDelay &&
        typeof this.gameMode.getLockDelay === "function"
          ? this.gameMode.getLockDelay()
          : 0.5;
    }

    // Check for section transitions
    const sectionLength = this.getSectionLength();
    const newBasis = this.getSectionBasisValue();
    const oldBasis =
      this.selectedMode === "marathon"
        ? type === "lines"
          ? Math.max(0, newBasis - amount)
          : newBasis
        : oldLevel;
    const oldSection = Math.floor(oldBasis / sectionLength);
    const newSection = Math.floor(newBasis / sectionLength);

    if (newSection > oldSection && this.level < maxLevel) {
      this.handleSectionTransition(newSection);
    }

    // Check for important level milestones
    const milestones = [100, 200, 300, 500, maxLevel];
    if (milestones.includes(this.level) && this.level !== oldLevel) {
      if (this.level === maxLevel) {
        const sectionLength = this.getSectionLength();
        const basisAtMax = this.getSectionBasisValue();
        const oldBasisForMax =
          this.selectedMode === "marathon" && type === "lines"
            ? Math.max(0, basisAtMax - amount)
            : oldLevel;
        const lastSectionIndex = Math.floor(oldBasisForMax / sectionLength);
        if (
          typeof this.sectionTimes[lastSectionIndex] !== "number" &&
          lastSectionIndex === this.currentSection
        ) {
          this.sectionTimes[lastSectionIndex] = this.currentTime - this.sectionStartTime;
          this.sectionTetrises[lastSectionIndex] = this.currentSectionTetrisCount;
        }

        // Start credits when reaching max level
        this.level999Reached = true;

        const isTGM2Mode =
          this.selectedMode && this.selectedMode.startsWith("tgm2") && maxLevel === 999;

        // TGM2: run 2s stack fade before credits; credits start once fade completes
        if (isTGM2Mode) {
          this.creditsPending = true;
          this.invisibleStackActive = false;
          this.fadingRollActive = false;
          this.startMinoFading();
        } else {
          this.startCredits();
          if (this.gameMode && typeof this.gameMode.onCreditsStart === "function") {
            this.gameMode.onCreditsStart(this);
          }
        }
      }
    }

    // Update BGM based on level
    this.updateBGM();
  }

  handleSectionTransition(section) {
    this.sectionTransition = true;

    const completedSection = section - 1;
    if (completedSection >= 0) {
      this.sectionTimes[completedSection] = this.currentTime - this.sectionStartTime;
      this.sectionTetrises[completedSection] = this.currentSectionTetrisCount;
      this.sectionStartTime = this.currentTime;
      this.currentSection = section;
      this.currentSectionTetrisCount = 0;
    }

    // Play section change sound
    const sectionChangeSound = this.sound.add("sectionchange", { volume: 0.6 });
    sectionChangeSound.play();

    // Section completion messages removed - uncomment if needed for other modes
    /*
        // Show section completion message
        const sectionStart = (section - 1) * 100;
        let sectionEnd = section * 100 - 1;
        if (section >= 5) {
            sectionEnd = 999;
        }
        this.showSectionMessage(`Section ${sectionStart}-${sectionEnd} Complete!`);
        */

    // Adjust section cap based on mode (default to Normal mode)
    if (this.selectedMode === "marathon") {
      this.sectionCap = (section + 1) * 10;
    } else {
      this.sectionCap = (section + 1) * 100;
      if (section >= 9) {
        this.sectionCap = 999;
      }
    }
  }

  getTGMGravitySpeed(level) {
    // Use mode-based gravity calculation if mode is available
    if (this.gameMode) {
      return this.gameMode.getGravitySpeed(level);
    }

    // Fallback to TGM1 curve if no mode
    return this.getTGM1GravitySpeed(level);
  }

  // Official TGM1 Internal Gravity system (fallback method)
  getTGM1GravitySpeed(level) {
    // Official TGM1 Internal Gravity system
    // Returns Internal Gravity value in 1/256 G units
    // Based on Internal Gravity values in the TGM1 specification

    let internalGravity;

    if (level < 30) internalGravity = 4;
    else if (level < 35) internalGravity = 6;
    else if (level < 40) internalGravity = 8;
    else if (level < 50) internalGravity = 10;
    else if (level < 60) internalGravity = 12;
    else if (level < 70) internalGravity = 16;
    else if (level < 80) internalGravity = 32;
    else if (level < 90) internalGravity = 48;
    else if (level < 100) internalGravity = 64;
    else if (level < 120) internalGravity = 80;
    else if (level < 140) internalGravity = 96;
    else if (level < 160) internalGravity = 112;
    else if (level < 170) internalGravity = 128;
    else if (level < 200) internalGravity = 144;
    else if (level < 220) internalGravity = 4;
    else if (level < 230) internalGravity = 32;
    else if (level < 233) internalGravity = 64;
    else if (level < 236) internalGravity = 96;
    else if (level < 239) internalGravity = 128;
    else if (level < 243) internalGravity = 160;
    else if (level < 247) internalGravity = 192;
    else if (level < 251) internalGravity = 224;
    else if (level < 300)
      internalGravity = 256; // 1G
    else if (level < 330)
      internalGravity = 512; // 2G
    else if (level < 360)
      internalGravity = 768; // 3G
    else if (level < 400)
      internalGravity = 1024; // 4G
    else if (level < 420)
      internalGravity = 1280; // 5G
    else if (level < 450)
      internalGravity = 1024; // 4G
    else if (level < 500)
      internalGravity = 768; // 3G
    else internalGravity = 5120; // 20G

    return internalGravity;
  }

  detectTSpin(piece, board) {
    // Simple T-spin detection
    // A T-spin occurs when the T piece is rotated and locks with blocks in 3 of the 4 corners
    if (piece.type !== "T") return false;

    const corners = [
      { x: piece.x - 1, y: piece.y - 1 },
      { x: piece.x + 1, y: piece.y - 1 },
      { x: piece.x - 1, y: piece.y + 1 },
      { x: piece.x + 1, y: piece.y + 1 },
    ];

    let filledCorners = 0;
    corners.forEach((corner) => {
      if (
        corner.x < 0 ||
        corner.x >= board.cols ||
        corner.y >= board.rows ||
        (corner.y >= 0 && board.grid[corner.y][corner.x])
      ) {
        filledCorners++;
      }
    });

    return filledCorners >= 3;
  }

  updateGrade() {
    // Official TGM1 grade progression based on score thresholds with time requirements for GM
    const score = this.score;
    const time = this.currentTime;
    const level = this.level;

    let newGrade = "9"; // Default grade

    // Track GM conditions
    if (level >= 300 && score >= 12000 && time <= 4 * 60 + 15) {
      // 4:15
      this.gmConditions.level300.achieved = true;
      this.gmConditions.level300.time = time;
      this.gmConditions.level300.score = score;
    }
    if (level >= 500 && score >= 40000 && time <= 7 * 60 + 30) {
      // 7:30
      this.gmConditions.level500.achieved = true;
      this.gmConditions.level500.time = time;
      this.gmConditions.level500.score = score;
    }
    if (level >= 999 && score >= 126000 && time <= 13 * 60 + 30) {
      // 13:30
      this.gmConditions.level999.achieved = true;
      this.gmConditions.level999.time = time;
      this.gmConditions.level999.score = score;
    }

    // Grand Master requirements (all three conditions must be achieved)
    if (
      this.gmConditions.level300.achieved &&
      this.gmConditions.level500.achieved &&
      this.gmConditions.level999.achieved
    ) {
      newGrade = "GM";
    }
    // Regular grade progression based on score thresholds (from tetris.wiki)
    else if (score >= 120000) newGrade = "S9";
    else if (score >= 100000) newGrade = "S8";
    else if (score >= 82000) newGrade = "S7";
    else if (score >= 66000) newGrade = "S6";
    else if (score >= 52000) newGrade = "S5";
    else if (score >= 40000) newGrade = "S4";
    else if (score >= 30000) newGrade = "S3";
    else if (score >= 22000) newGrade = "S2";
    else if (score >= 16000) newGrade = "S1";
    else if (score >= 12000) newGrade = "1";
    else if (score >= 8000) newGrade = "2";
    else if (score >= 5500) newGrade = "3";
    else if (score >= 3500) newGrade = "4";
    else if (score >= 2000) newGrade = "5";
    else if (score >= 1400) newGrade = "6";
    else if (score >= 800) newGrade = "7";
    else if (score >= 400) newGrade = "8";
    // Keep grade 9 for scores below 400 points

    // Update grade if it improved (only upgrade, don't downgrade)
    if (this.getGradeValue(newGrade) > this.getGradeValue(this.grade)) {
      this.grade = newGrade;
      this.animateGradeUpgrade();
      this.gradeHistory.push({
        grade: newGrade,
        level: this.level,
        time: this.currentTime,
        score: score,
      });
    }
  }

  getGradeValue(grade) {
    const gradeValues = {
      9: 0,
      8: 1,
      7: 2,
      6: 3,
      5: 4,
      4: 5,
      3: 6,
      2: 7,
      1: 8,
      S1: 9,
      S2: 10,
      S3: 11,
      S4: 12,
      S5: 13,
      S6: 14,
      S7: 15,
      S8: 16,
      S9: 17,
      M: 18,
      GM: 19,
    };
    return gradeValues[grade] || 0;
  }

  updateGradeUIVisibility() {
    if (!this.gradeDisplay || !this.gradeText) return;

    const gradeValue =
      typeof this.grade === "string" ? this.grade.trim() : this.grade;
    const hasGrade =
      gradeValue !== undefined &&
      gradeValue !== null &&
      gradeValue !== "" &&
      gradeValue !== 0;

    this.gradeDisplay.setVisible(hasGrade);
    this.gradeText.setVisible(hasGrade);
    if (this.gradePointsText) {
      this.gradePointsText.setVisible(hasGrade && this.shouldShowGradePoints !== false);
    }

    if (this.nextGradeText) {
      this.nextGradeText.setVisible(
        hasGrade && this.shouldShowNextGradeText,
      );
    }
  }

  updateNextGradeText() {
    if (!this.nextGradeText || !this.shouldShowNextGradeText) return; // Skip if grade display not created

    const gradeThresholds = {
      9: 400,
      8: 800,
      7: 1400,
      6: 2000,
      5: 3500,
      4: 5500,
      3: 8000,
      2: 12000,
      1: 16000,
      S1: 22000,
      S2: 30000,
      S3: 40000,
      S4: 52000,
      S5: 66000,
      S6: 82000,
      S7: 100000,
      S8: 120000,
      S9: 126000,
      GM: Infinity,
    };
    const nextThreshold = gradeThresholds[this.grade];
    if (nextThreshold === Infinity) { // Infinity is used for GM grade, so display this at S9
      this.nextGradeText.setText("Next grade at ?????? points");
    } else {
      this.nextGradeText.setText(`Next grade at  ${nextThreshold} points`);
    }
  }

  animateGradeUpgrade() {
    // Play grade up sound
    const gradeUpSound = this.sound.add("gradeup", { volume: 0.6 });
    gradeUpSound.play();

    // Simple flash animation (only if grade text exists)
    if (this.gradeText) {
      this.gradeText.setTint(0xffff00);
      this.time.delayedCall(200, () => {
        this.gradeText.setTint(0xffffff);
      });
      this.time.delayedCall(400, () => {
        this.gradeText.setTint(0xffff00);
      });
      this.time.delayedCall(600, () => {
        this.gradeText.setTint(0xffffff);
      });
    }
  }

  getHeldKeys() {
    const held = [];
    if (this.leftKeyPressed) held.push("Z");
    if (this.rightKeyPressed) held.push("C");
    if (this.kKeyPressed) held.push("K");
    if (this.spaceKeyPressed) held.push("Space");
    if (this.lKeyPressed) held.push("L");
    if (this.xKeyPressed) held.push("X");
    if (this.keys.s.isDown) held.push("S");
    return held;
  }

  restartGame() {
    // Check if mode uses grading
    const modeConfig = this.gameMode ? this.gameMode.getConfig() : {};
    const hasGrading = modeConfig.hasGrading !== false;

    // Reset all game variables
    this.board = new Board();
    this.currentPiece = null;
    this.holdPiece = null;
    this.canHold = true;
    this.nextPieces = [];
    this.gravityTimer = 0.0;
    this.gravityAccum = 0.0;
    this.lockDelay = 0;
    this.isGrounded = false;
    this.level = this.startingLevel || 0; // Use preserved starting level or default to 0
    this.piecesPlaced = 0; // Reset piece counter
    this.score = 0;
    this.grade = "9";
    this.internalGrade = 0;
    this.gameOver = false;
    this.sectionCap = 99;
    this.sectionTransition = false;
    this.sectionMessage = null;
    this.sectionMessageTimer = 0;
    this.comboCount = -1;
    this.backToBack = false;
    this.totalLines = 0;
    this.lastClearType = null;
    this.gradeHistory = [];
    this.sectionTimes = {};
    this.sectionStartTime = 0;
    this.currentSection = Math.floor(this.getSectionBasisValue() / this.getSectionLength());
    this.sectionTetrises = {};
    this.currentSectionTetrisCount = 0;

    // Reset piece active time tracking
    this.pieceActiveTime = 0;
    this.pieceSpawnTime = 0;

    // Reset drop tracking
    this.softDropRows = 0;
    this.hardDropRows = 0;

    // Reset piece per second tracking
    this.totalPiecesPlaced = 0;
    this.activeTime = 0;
    this.areTime = 0;
    this.conventionalPPS = 0;
    this.rawPPS = 0;
    this.maxPpsRecorded = 0;
    this.worstChoke = 0;
    if (this.ppsSummaryText) {
      this.ppsSummaryText.setText("Max PPS: -- | Worst choke: --");
    }
    this.finesseActiveForPiece = false;

    // Reset leaderboard saved flag so new runs can submit once
    this.leaderboardSaved = false;

    // Reset TGM1 randomizer
    this.pieceHistory = ["Z", "Z", "S", "S"]; // Reset to initial state
    this.pieceHistoryIndex = 0;
    this.firstPiece = true;
    this.isFirstSpawn = true;

    // Reset BGM first play flags
    this.bgmFirstPlay = {
      stage1: true,
      stage2: true,
    };

    // Reset key states
    this.kKeyPressed = false;
    this.spaceKeyPressed = false;
    this.lKeyPressed = false;
    this.rotate180Pressed = false;
    this.xKeyPressed = false;

    // Reset mino fading system
    this.placedMinos = [];
    this.placedMinoRows = [];
    this.minoFadeActive = false;
    this.fadingComplete = false;
    this.showGameOverText = false;

    this.invisibleStackActive = false;
    this.fadingRollActive = false;

    // Reset loading phases
    this.loadingPhase = true;
    this.readyGoPhase = false;
    this.gameStarted = false;

    // Validate piece history to ensure it's correct after reset
    this.validatePieceHistory();

    // Reset time tracking using Date.now()
    this.startTime = Date.now();
    this.gameStartTime = this.startTime;
    this.currentTime = 0;
    this.pauseStartTime = null;
    this.totalPausedTime = 0;
    this.level999Reached = false; // Reset level 999 flag

    // Clear game elements
    this.gameGroup.clear(true, true);

    // Stop and destroy current BGM
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }

    // Clear all BGM objects to ensure clean restart
    if (this.stage1BGM) {
      this.stage1BGM.destroy();
      this.stage1BGM = null;
    }
    if (this.stage2BGM) {
      this.stage2BGM.destroy();
      this.stage2BGM = null;
    }

    // Clear TGM2 BGM objects
    if (this.tgm2_stage1) {
      this.tgm2_stage1.destroy();
      this.tgm2_stage1 = null;
    }
    if (this.tgm2_stage2) {
      this.tgm2_stage2.destroy();
      this.tgm2_stage2 = null;
    }
    if (this.tgm2_stage3) {
      this.tgm2_stage3.destroy();
      this.tgm2_stage3 = null;
    }
    if (this.tgm2_stage4) {
      this.tgm2_stage4.destroy();
      this.tgm2_stage4 = null;
    }

    // Reset UI
    this.scoreText.setText("0");
    this.currentLevelText.setText("0");
    if (hasGrading) {
      this.gradeText.setText("9");
    }
    // Reset Marathon mode separate level display
    if (isMarathonMode && this.levelDisplayText) {
      this.levelDisplayText.setText("1");
    }
    this.timeText.setText("0:00.00");
    this.ppsText.setText("0.00");
    this.rawPpsText.setText("0.00");

    // Restart loading sequence
    this.time.delayedCall(500, () => {
      this.loadingPhase = false;
      this.showReadyGo();
    });

    // Restart game
    this.generateNextPieces();
    this.spawnPiece();

    // Restart BGM
    this.updateBGM();
  }

  togglePause() {
    this.isPaused = !this.isPaused;

    // Handle time tracking during pause using Date.now()
    if (this.isPaused) {
      // Pausing: record the pause start time
      this.pauseStartTime = Date.now();
    } else {
      // Resuming: adjust startTime to exclude paused time
      if (this.pauseStartTime && this.startTime) {
        const now = Date.now();
        const pausedDuration = now - this.pauseStartTime;
        this.startTime += pausedDuration; // Push startTime forward by paused duration
        this.pauseStartTime = null;
      }
    }

    // Pause/resume BGM
    if (this.currentBGM) {
      if (this.isPaused) {
        this.currentBGM.pause();
      } else {
        this.currentBGM.resume();
      }
    }
  }

  startCredits(creditsDurationSec = null) {
    this.creditsActive = true;
    this.creditsTimer = 0;
    if (creditsDurationSec != null) {
      this.creditsDuration = creditsDurationSec;
    }
    this.rollLinesCleared = 0;
    this.rollFailedDuringRoll = false;
    this.creditsFinalized = false;

    // Determine roll type based on mode flags
    this.rollType = null;
    if (this.gameMode) {
      if (this.gameMode.mRollStarted) {
        this.rollType = "mroll";
        this.invisibleStackActive = true;
        this.fadingRollActive = false;
      } else if (this.gameMode.fadingRollActive) {
        this.rollType = "fading";
        this.fadingRollActive = true;
        this.invisibleStackActive = false;
      }
    }

    // Play completion sound if GM grade achieved
    if (this.grade === "GM") {
      const completeSound = this.sound.add("complete", { volume: 0.8 });
      completeSound.play();
    }

    // Load credits BGM if available
    try {
      // Use tm1_2.mp3 for TGM2 Normal mode credits, otherwise use tm1_endroll.mp3
      const creditsBGMKey =
        this.selectedMode === "tgm2_normal" ? "stage2" : "credits";
      this.creditsBGM = this.sound.add(creditsBGMKey, {
        loop: true,
        volume: 0.3,
      });
      if (this.creditsBGM && this.bgmEnabled) {
        this.creditsBGM.play();
      }
    } catch (error) {
      console.warn("Credits BGM could not be loaded:", error);
    }

    // Stop current BGM
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }
  }

  finalizeCreditsRoll() {
    if (this.creditsFinalized) return;
    this.creditsFinalized = true;
    this.creditsActive = false;

    // Stop credits BGM if still playing
    if (this.creditsBGM) {
      this.creditsBGM.stop();
      this.creditsBGM = null;
    }

    // Show Hanabi summary after credits if available
    if (this.gameMode && this.gameMode.hanabi !== undefined) {
      this.showHanabiSummary(this.gameMode.hanabi);
    }

    // If invisible stack was active for fading roll, restore visibility
    if (this.invisibleStackActive) {
      this.invisibleStackActive = false;
    }

    this.setGradeLineColor("green");

    // Delegate to mode-specific finish if available
    if (this.gameMode && typeof this.gameMode.finishCreditRoll === "function") {
      this.gameMode.finishCreditRoll(this);
      return;
    }

    // Fallback: end the game normally
    this.showGameOverScreen();
  }

  trackPlacedMino(x, y, color) {
    // Add mino to tracking list for fading
    this.placedMinos.push({ x, y, color, faded: false });

    // Track rows that contain minos for row-by-row fading
    if (!this.placedMinoRows.includes(y)) {
      this.placedMinoRows.push(y);
    }
  }

  startMinoFading() {
    // Rebuild placed mino tracking from current board state to ensure all rows fade.
    this.placedMinos = [];
    this.placedMinoRows = [];
    for (let y = 0; y < this.board.rows; y++) {
      for (let x = 0; x < this.board.cols; x++) {
        const cell = this.board.grid[y][x];
        if (cell) {
          this.placedMinos.push({ x, y, color: cell, faded: false });
          if (!this.placedMinoRows.includes(y)) {
            this.placedMinoRows.push(y);
          }
        }
      }
    }
    // Include the active piece in fading, if present
    if (this.currentPiece && this.currentPiece.shape) {
      for (let r = 0; r < this.currentPiece.shape.length; r++) {
        for (let c = 0; c < this.currentPiece.shape[r].length; c++) {
          if (this.currentPiece.shape[r][c]) {
            const x = this.currentPiece.x + c;
            const y = this.currentPiece.y + r;
            if (
              y >= 0 &&
              y < this.board.rows &&
              x >= 0 &&
              x < this.board.cols
            ) {
              this.board.grid[y][x] = this.currentPiece.color;
              this.placedMinos.push({ x, y, color: this.currentPiece.color, faded: false });
              if (!this.placedMinoRows.includes(y)) {
                this.placedMinoRows.push(y);
              }
            }
          }
        }
      }
    }

    this.minoFadeActive = true;
    this.minoFadeProgress = 0;
    this.minoFadeTimer = 0;
    this.gameOverTextTimer = 0;
    this.showGameOverText = false;
    this.minoRowFadeAlpha = {};

    // Stop BGM immediately when game over and fading starts
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }

    // Sort rows from bottom to top for proper fading order
    this.placedMinoRows.sort((a, b) => b - a); // Descending order

    // Calculate fade timing to complete all rows in ~2 seconds total
    const rowCount = this.placedMinoRows.length;
    if (rowCount > 0) {
      this.minoFadePerRowDuration = 2 / rowCount;
    } else {
      this.minoFadePerRowDuration = 2;
    }
  }

  startLockFlash() {
    // Store the locked piece's color and position for the flash effect
    const flashColor = this.currentPiece ? this.currentPiece.color : 0xffffff;

    // Create a temporary flash overlay
    const flashOverlay = this.add.graphics();
    flashOverlay.fillStyle(0xffffff, 0.8);
    flashOverlay.fillRect(
      this.borderOffsetX - 4,
      this.borderOffsetY - 3,
      this.cellSize * this.board.cols + 4,
      this.cellSize * this.visibleRows + 5,
    );

    // Add flash overlay to game group
    this.gameGroup.add(flashOverlay);

    // Fade out the flash over 15 frames (0.25 seconds)
    this.tweens.add({
      targets: flashOverlay,
      alpha: 0,
      duration: 250, // 0.25 seconds
      onComplete: () => {
        flashOverlay.destroy();
      },
    });
  }

  saveBestScore() {
    if (this.leaderboardSaved) return;
    if (!this.selectedMode) return;
    if (typeof this.saveLeaderboardEntry !== "function") return;
    // Fallback generic entry; mode-specific handlers should prefer saveLeaderboardEntry directly.
    const entry = {
      hanabi: this.gameMode && this.gameMode.hanabi !== undefined ? this.gameMode.hanabi : undefined,
      score: this.score,
      level: this.level,
      grade: this.grade,
      time: `${Math.floor(this.currentTime / 60)}:${Math.floor(
        this.currentTime % 60,
      )
        .toString()
        .padStart(2, "0")}.${Math.floor((this.currentTime % 1) * 100)
        .toString()
        .padStart(2, "0")}`,
      pps: this.conventionalPPS != null ? Number(this.conventionalPPS.toFixed(2)) : undefined,
    };
    this.saveLeaderboardEntry(this.selectedMode, entry);
  }

  getBestScore(mode) {
    const key = `bestScore_${mode}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return { score: 0, level: 0, grade: "9", time: "--:--.--" };
  }

  showGameOverScreen() {
    if (this.creditsActive) {
      this.rollFailedDuringRoll = true;
      // Topping out during credits is a fail: set to at least green line
      this.setGradeLineColor("green");
    }
    this.gameOver = true;
    this.gameOverTimer = 0; // Start timer for 10 seconds
    this.gameOverMessage = this.sprintCompleted ? "CONGRATULATIONS" : "GAME OVER";
    this.finesseActiveForPiece = false;

    // Show Hanabi summary if available
    if (this.gameMode && this.gameMode.hanabi !== undefined) {
      this.showHanabiSummary(this.gameMode.hanabi);
    }

    // Freeze section tracking so the losing section remains counted and displayed.
    if (
      this.sectionTimes &&
      typeof this.currentSection === "number" &&
      typeof this.sectionStartTime === "number" &&
      typeof this.sectionTimes[this.currentSection] !== "number"
    ) {
      this.sectionTimes[this.currentSection] = this.currentTime - this.sectionStartTime;
      if (this.sectionTetrises) {
        this.sectionTetrises[this.currentSection] = this.currentSectionTetrisCount;
      }
    }

    // Clear any held input state so pieces cannot keep moving during game over.
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
    this.leftInRepeat = false;
    this.rightInRepeat = false;
    this.leftTimer = 0;
    this.rightTimer = 0;
    this.kKeyPressed = false;
    this.spaceKeyPressed = false;
    this.lKeyPressed = false;
    this.xKeyPressed = false;

    if (this.bgmLoopTimer) {
      this.bgmLoopTimer.remove(false);
      this.bgmLoopTimer = null;
    }

    // Stop any playing BGM (stage BGM or credits BGM)
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }
    if (this.creditsBGM) {
      this.creditsBGM.stop();
      this.creditsBGM = null;
    }

    // Stop stage BGM objects
    const stageBgms = [this.stage1BGM, this.stage2BGM];
    stageBgms.forEach((bgm) => {
      if (bgm) {
        if (bgm.isPlaying) {
          bgm.stop();
        }
        bgm.destroy();
      }
    });
    this.stage1BGM = null;
    this.stage2BGM = null;

    // Stop TGM2 BGM objects
    const tgm2Bgms = [
      this.tgm2_stage1,
      this.tgm2_stage2,
      this.tgm2_stage3,
      this.tgm2_stage4,
    ];
    tgm2Bgms.forEach((bgm) => {
      if (bgm) {
        if (bgm.isPlaying) {
          bgm.stop();
        }
        bgm.destroy();
      }
    });
    this.tgm2_stage1 = null;
    this.tgm2_stage2 = null;
    this.tgm2_stage3 = null;
    this.tgm2_stage4 = null;

    // Start mino fading immediately
    this.startMinoFading();

    // Handle game over in game mode (for TGM2, powerup minos, etc.)
    if (this.gameMode && this.gameMode.onGameOver) {
      this.gameMode.onGameOver(this);
    }
  }

  showHanabiSummary(hanabiValue) {
    const text = `Hanabi: ${hanabiValue}`;
    if (this.hanabiText && this.hanabiText.destroy) {
      this.hanabiText.destroy();
    }
    this.hanabiText = this.add
      .text(
        this.borderOffsetX + this.playfieldWidth / 2,
        this.borderOffsetY + this.playfieldHeight + 80,
        text,
        {
          fontSize: "24px",
          fill: "#ffff88",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "center",
        },
      )
      .setOrigin(0.5, 0);
  }

  drawCreditsScreen() {
    // Don't draw credits if game is paused
    if (this.isPaused) {
      return;
    }

    // Create scrolling credits text behind the tetrominos (under the matrix)
    const creditsText = [
      { text: "CREDITS", type: "title" },
      { text: "", type: "empty" },
      { text: "Game Developer", type: "section" },
      { text: "Tetris Grand Master Implementation", type: "content" },
      { text: "", type: "empty" },
      { text: "Special Thanks", type: "section" },
      {
        text: "To all Tetris players who strive for perfection",
        type: "content",
      },
      {
        text: "The Tetris Company for creating this amazing game",
        type: "content",
      },
      { text: "", type: "empty" },
      { text: "Music & Sound", type: "section" },
      { text: "Original TGM Soundtrack", type: "content" },
      { text: "", type: "empty" },
      { text: "Inspired by", type: "section" },
      { text: "Tetris: The Grand Master Series", type: "content" },
      { text: "", type: "empty" },
      { text: "Technical Implementation", type: "section" },
      { text: "Phaser 3 Game Framework", type: "content" },
      { text: "SRS (Super Rotation System)", type: "content" },
      { text: "TGM1 Mechanics", type: "content" },
      { text: "", type: "empty" },
      { text: "Level System", type: "section" },
      { text: "Internal Gravity Curves", type: "content" },
      { text: "TGM-Style Grading", type: "content" },
      { text: "", type: "empty" },
      { text: "Piece Randomizer", type: "section" },
      { text: "TGM1 4-Piece History System", type: "content" },
      { text: "", type: "empty" },
      { text: "Achievement System", type: "section" },
      { text: "Grand Master Grade Requirements", type: "content" },
      { text: "", type: "empty" },
      { text: "Thank you for playing!", type: "closing" },
      { text: "Continue striving for perfection!", type: "closing" },
    ];

    // Calculate scroll speed so credits end exactly when last line moves to top
    // The visible matrix area is 20 rows high, credits should scroll through this area in 61.60 seconds
    const visibleMatrixHeight = this.cellSize * this.visibleRows; // Height of visible matrix area

    // Count only non-empty lines for height calculation
    const nonEmptyLines = creditsText.filter(
      (line) => line.type !== "empty",
    ).length;
    const creditsHeight = nonEmptyLines * 45; // Total height of credits text (increased spacing for larger fonts)
    const totalScrollDistance = visibleMatrixHeight + creditsHeight; // Distance to scroll from bottom to top
    this.creditsScrollSpeed = totalScrollDistance / (this.creditsDuration * 60); // pixels per frame

    // Calculate scroll progress - start with 0 and increase over time
    const scrollProgress =
      (this.creditsTimer * this.creditsScrollSpeed * 60) % totalScrollDistance;

    // Position credits to scroll through the matrix area from bottom to top
    const matrixBottomY = this.borderOffsetY + this.playfieldHeight;
    const matrixTopY = this.borderOffsetY;

    // Start from below the matrix and scroll upward through it
    // First line (CREDITS) should appear first at the bottom
    const creditsStartY = matrixBottomY + creditsHeight; // Start from below matrix by the full credits height
    const centerX =
      this.matrixOffsetX + (this.cellSize * this.board.cols) / 2 - 5; // Center horizontally over matrix, shifted 5px left

    for (let i = 0, visibleLineIndex = 0; i < creditsText.length; i++) {
      const line = creditsText[i];

      // Skip empty lines in positioning but count them for display
      if (line.type === "empty") {
        continue;
      }

      // Calculate the position of this line relative to the scroll progress
      // First visible line (CREDITS) should appear at bottom first
      const lineStartY = creditsStartY - visibleLineIndex * 45;
      const y = lineStartY - scrollProgress;
      visibleLineIndex++;

      // Only draw if within the matrix area (strict bounds checking)
      if (y > matrixTopY && y < matrixBottomY) {
        let fontSize, fillColor;

        // Assign colors and font sizes based on text type
        switch (line.type) {
          case "title":
            fontSize = 36; // Increased from 28
            fillColor = "#ffff00"; // Yellow
            break;
          case "section":
            fontSize = 24; // Increased from 18
            fillColor = "#00ffff"; // Cyan
            break;
          case "content":
            fontSize = 20; // Increased from 18
            fillColor = "#ffffff"; // White
            break;
          case "closing":
            fontSize = 22; // Increased from 18
            fillColor = "#ff00ff"; // Magenta
            break;
          default:
            fontSize = 20;
            fillColor = "#ffffff";
        }

        // Wrap text to matrix width with proper margin
        const text = this.add
          .text(centerX, y, line.text, {
            fontSize: `${fontSize}px`,
            fill: fillColor,
            stroke: "#000000",
            strokeThickness: 2,
            fontFamily: "Courier New",
            fontStyle: "bold", // All text is now bold
            wordWrap: { width: this.cellSize * this.board.cols - 30 }, // Wrap to matrix width with margin
            align: "center",
          })
          .setOrigin(0.5);
        this.gameGroup.add(text);
      }
    }
  }

  drawLevelBar() {
    const uiX = Math.max(20, this.borderOffsetX - 200) + 50;
    const levelBottomY = this.borderOffsetY + this.playfieldHeight - 60;
    const levelRowHeight = 20; // Decreased spacing
    const rightX = uiX + 120;
    const levelFontSize = Math.max(
      24,
      Math.min(36, Math.floor(this.cellSize * 1.0)),
    ); // Increased font

    // Determine mode types
    const isMarathonMode = this.selectedMode === "marathon";
    const isUltraMode = this.selectedMode === "ultra";
    const isZenMode = this.selectedMode === "zen";
    const isSprintMode =
      this.selectedMode &&
      (this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100");
    const isLineCountMode = isMarathonMode || isUltraMode || isZenMode || isSprintMode;

    if (this.currentLevelText && !this.currentLevelText.scene) {
      this.currentLevelText = null;
    }
    if (this.capLevelText && !this.capLevelText.scene) {
      this.capLevelText = null;
    }
    if (this.levelBar && !this.levelBar.scene) {
      this.levelBar = null;
    }
    if (this.levelDisplayText && !this.levelDisplayText.scene) {
      this.levelDisplayText = null;
    }
    if (this.levelDisplayLabel && !this.levelDisplayLabel.scene) {
      this.levelDisplayLabel = null;
    }

    // For Marathon mode, update separate level display
    if (isMarathonMode && this.levelDisplayText) {
      this.levelDisplayText.setText((this.level + 1).toString());
    }

    // For Zen/Ultra modes, only show lines cleared, no level bar or cap
    if (isZenMode || isUltraMode) {
      // Current lines - top row
      const currentY = levelBottomY - 3 * levelRowHeight;
      const currentLinesText = this.totalLines.toString();
      if (!this.currentLevelText) {
        this.currentLevelText = this.add
          .text(rightX + 17, currentY - 30, currentLinesText, {
            fontSize: `${levelFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "bold",
            align: "right",
          })
          .setOrigin(1, 0);
      } else {
        this.currentLevelText.setText(currentLinesText);
      }
      return; // Don't draw bar or cap for Zen mode
    }

    // Calculate section cap based on mode
    let sectionCap;
    if (isMarathonMode) {
      // Marathon: next multiple of 10 above current lines
      sectionCap = Math.ceil((this.totalLines + 1) / 10) * 10;
    } else if (isSprintMode) {
      // Sprint: 40 for sprint_40, 100 for sprint_100
      sectionCap = this.selectedMode === "sprint_40" ? 40 : 100;
    } else {
      // TGM modes: default section calculation
      const maxLevel = this.gameMode ? this.gameMode.getGravityLevelCap() : 999;
      const section = Math.floor(this.level / 100);
      if (maxLevel === 300) {
        // TGM2 Normal: always show 300 as the cap
        sectionCap = 300;
      } else {
        // Default: sections are 0-99, 100-199, etc. up to 999
        sectionCap = section >= 9 ? 999 : (section + 1) * 100;
      }
    }

    // Current level/lines - top row
    const currentY = levelBottomY - 3 * levelRowHeight;
    const currentValue =
      isLineCountMode ? this.totalLines.toString() : this.level.toString();
    if (!this.currentLevelText) {
      this.currentLevelText = this.add
        .text(rightX + 17, currentY - 30, currentValue, {
          fontSize: `${levelFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "right",
        })
        .setOrigin(1, 0);
    } else {
      this.currentLevelText.setText(currentValue);
    }

    // Bar - middle row, white background with red fill
    {
      const barY = levelBottomY - 2 * levelRowHeight;
      const barWidth = 60;
      const barHeight = 4;
      const barX = rightX - barWidth;
      const internalGravity = this.getTGMGravitySpeed(this.level);
      // Green bar: percentage of sub-1G gravity (0–256)
      const greenRatio = Math.min(internalGravity / 256, 1);
      // Red overlay: gravity beyond 1G, scaled up to 20G (5120)
      const redRatio =
        internalGravity > 256
          ? Math.min((internalGravity - 256) / (5120 - 256), 1)
          : 0;

      if (!this.levelBar) {
        this.levelBar = this.add.graphics();
      }
      this.levelBar.clear();
      // White background
      this.levelBar.fillStyle(0xffffff);
      this.levelBar.fillRect(barX + 14, barY - 15, barWidth, barHeight);
      // Green fill for sub-1G portion
      this.levelBar.fillStyle(0x00ff00);
      this.levelBar.fillRect(
        barX + 14,
        barY - 15,
        barWidth * greenRatio,
        barHeight,
      );
      // Red overlay for gravity beyond 1G
      if (redRatio > 0) {
        this.levelBar.fillStyle(0xff0000);
        this.levelBar.fillRect(
          barX + 14,
          barY - 15,
          barWidth * redRatio,
          barHeight,
        );
      }
    }

    // Cap level - bottom row
    const capY = levelBottomY - levelRowHeight;
    const capText = sectionCap.toString();
    if (!this.capLevelText) {
      this.capLevelText = this.add
        .text(rightX + 17, capY - 25, capText, {
          fontSize: `${levelFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "right",
        })
        .setOrigin(1, 0);
    } else {
      this.capLevelText.setText(capText);
    }
  }

  draw() {
    // Check if mode uses grading
    const modeConfig = this.gameMode ? this.gameMode.getConfig() : {};
    const hasGrading = modeConfig.hasGrading !== false;

    // Clear previous game elements
    this.gameGroup.clear(true, true);

    // Show loading text during loading phase
    if (this.loadingPhase) {
      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;
      const loadingText = this.add
        .text(centerX, centerY, "LOADING...", {
          fontSize: "48px",
          fill: "#ffffff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      this.gameGroup.add(loadingText);
      return; // Don't draw anything else during loading
    }

    // Draw credits screen first (behind everything)
    if (this.creditsActive) {
      this.drawCreditsScreen();
    }

    // Draw matrix and border during ready-go and after
    if (this.readyGoPhase || this.gameStarted) {
      // Border adjusted to fit exactly 10x20 with smaller width and height
      // Use mode type color for border
      const modeTypeColor = this.getModeTypeBorderColor();
      this.playfieldBorder = this.add.graphics();
      this.playfieldBorder.lineStyle(3, modeTypeColor);
      this.playfieldBorder.strokeRect(
        this.borderOffsetX - 4,
        this.borderOffsetY - 3,
        this.cellSize * this.board.cols + 4,
        this.cellSize * this.visibleRows + 5,
      ); // Height reduced by 1px, width expanded 1px left
      this.gameGroup.add(this.playfieldBorder);

      // Draw game elements using matrix offset (skip during game over after fading)
      // During game over fading, keep drawing the stack so row-by-row alpha can be applied.
      if (
        this.gameStarted &&
        (!this.gameOver || this.minoFadeActive) &&
        !this.fadingComplete
      ) {
        this.board.draw(
          this,
          this.matrixOffsetX,
          this.matrixOffsetY,
          this.cellSize,
        );
      }
    }

    // Draw line clear animation if active
    if (this.isClearingLines && this.clearedLines.length > 0) {
      // Calculate fading alpha based on progress through line clear ARE
      const fadeProgress = this.areTimer / this.areDelay; // 0 to 1
      const fadeAlpha = Math.max(0.2, 1.0 - fadeProgress); // Fade from 1.0 to 0.2

      // Draw cleared lines with fading effect
      for (const lineRow of this.clearedLines) {
        // Only draw if line is in visible area (row 2 and below)
        if (lineRow >= 2) {
          for (let col = 0; col < this.board.cols; col++) {
            const textureKey =
              this.rotationSystem === "ARS" ? "mino_ars" : "mino_srs";
            const texture = this.textures ? this.textures.get(textureKey) : null;
            const textureSource = texture && texture.source ? texture.source[0] : null;
            const hasValidTextureSource =
              !!texture && !!textureSource && !!textureSource.image;
            if (hasValidTextureSource) {
              const sprite = this.add.sprite(
                this.matrixOffsetX + col * this.cellSize,
                this.matrixOffsetY + (lineRow - 2) * this.cellSize,
                textureKey,
              );
              sprite.setDisplaySize(this.cellSize, this.cellSize);
              sprite.setTint(0xffffff); // White for cleared lines
              sprite.setAlpha(fadeAlpha);
              this.gameGroup.add(sprite);
            } else {
              const graphics = this.add.graphics();
              graphics.fillStyle(0xffffff, fadeAlpha);
              graphics.fillRect(
                this.matrixOffsetX + col * this.cellSize - this.cellSize / 2,
                this.matrixOffsetY + (lineRow - 2) * this.cellSize -
                  this.cellSize / 2,
                this.cellSize,
                this.cellSize,
              );
              this.gameGroup.add(graphics);
            }
          }
        }
      }
    }
    // Draw current/ghost only during active play; during game over fading we already merged the active piece into the board
    if (this.currentPiece && !this.gameOver && !this.minoFadeActive && !this.fadingComplete) {
      // Ghost piece only visible from levels 0-100 in TGM1
      if (this.level <= 100) {
        const ghost = this.currentPiece.getGhostPosition(this.board);
        ghost.draw(
          this,
          this.matrixOffsetX,
          this.matrixOffsetY,
          this.cellSize,
          true,
        );
      }

      // Calculate alpha for lock delay fade effect
      let pieceAlpha = 1;
      if (this.isGrounded && this.lockDelay > 0) {
        pieceAlpha = 1 - (this.lockDelay / 0.5) * 0.5; // Fade from 1 to 0.5 over 0.5 seconds
      }

      this.currentPiece.draw(
        this,
        this.matrixOffsetX,
        this.matrixOffsetY,
        this.cellSize,
        false,
        pieceAlpha,
      );
    }

    // Update UI
    this.scoreText.setText(this.score.toString());

    // Update grade display only for modes that use grading
    if (hasGrading) {
      this.gradeText.setText(this.grade);
      if (this.gradePointsText && this.gameMode && typeof this.gameMode.getGradePoints === "function") {
        const gradePoints = this.gameMode.getGradePoints();
        this.gradePointsText.setText(gradePoints != null ? gradePoints.toString() : "0");
      }
      if (this.nextGradeText && this.shouldShowNextGradeText) {
        this.updateNextGradeText();
      }
    }

    // Update piece per second displays
    this.ppsText.setText(this.conventionalPPS.toFixed(2));
    this.rawPpsText.setText(this.rawPPS.toFixed(2));
    if (
      this.ppsGraphGraphics &&
      this.ppsGraphArea &&
      this.selectedMode &&
      (this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100")
    ) {
      this.drawSprintPpsGraph();
    }

    // Draw level bar
    this.drawLevelBar();

    // Format and display time
    const isUltraMode = this.selectedMode === "ultra";
    let timeToDisplay = this.currentTime;

    if (isUltraMode) {
      const timeLimit =
        this.gameMode && this.gameMode.timeLimit ? this.gameMode.timeLimit : 120;
      const elapsedActiveTime =
        this.gameMode && typeof this.gameMode.elapsedActiveTime === "number"
          ? this.gameMode.elapsedActiveTime
          : this.currentTime;
      timeToDisplay = Math.max(0, timeLimit - elapsedActiveTime);
    }

    const minutes = Math.floor(timeToDisplay / 60);
    const seconds = Math.floor(timeToDisplay % 60);
    const centiseconds = Math.floor((timeToDisplay % 1) * 100);
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;

    if (this.timeText) {
      this.timeText.setText(timeString);
    } else {
    }

    if (
      this.sectionTrackerGroup &&
      this.sectionTimeTexts &&
      this.sectionTotalTexts &&
      this.sectionSectionLabels
    ) {
      const modeId =
        this.gameMode && typeof this.gameMode.getModeId === "function"
          ? this.gameMode.getModeId()
          : this.selectedMode;
      const isTgm2Normal = modeId === "tgm2_normal";
      const isMarathonMode = this.selectedMode === "marathon";
      const maxLevel =
        this.gameMode && typeof this.gameMode.getGravityLevelCap === "function"
          ? this.gameMode.getGravityLevelCap()
          : this.gravityLevelCap || 999;

      const sectionLength = this.getSectionLength();
      const maxSections = this.getMaxSectionsForTracker();
      const basis = this.getSectionBasisValue();
      const lastSectionIndex = Math.min(
        maxSections - 1,
        Math.max(0, Math.floor(Math.max(0, basis - 1) / sectionLength)),
      );
      const displayedCurrentSection = Math.min(this.currentSection, lastSectionIndex);

      const sectionTimesArray = [];
      const sectionTetrisesArray = [];
      for (let i = 0; i < maxSections; i++) {
        if (i > lastSectionIndex) {
          sectionTimesArray.push(null);
          sectionTetrisesArray.push(null);
          continue;
        }

        const storedTime = this.sectionTimes ? this.sectionTimes[i] : undefined;
        const storedTetrises = this.sectionTetrises ? this.sectionTetrises[i] : undefined;
        const isCurrent =
          i === displayedCurrentSection &&
          !this.gameOver &&
          (!isMarathonMode ? this.level < maxLevel : true) &&
          typeof storedTime !== "number";
        const currentElapsed = this.currentTime - this.sectionStartTime;
        const timeValue =
          typeof storedTime === "number" ? storedTime : isCurrent ? currentElapsed : null;
        sectionTimesArray.push(timeValue);

        const tetrisValue =
          typeof storedTetrises === "number"
            ? storedTetrises
            : isCurrent
              ? this.currentSectionTetrisCount || 0
              : null;
        sectionTetrisesArray.push(tetrisValue);
      }

      let runningTotal = 0;
      for (let i = 0; i < this.sectionTimeTexts.length; i++) {
        const shouldShow = i <= displayedCurrentSection && i <= lastSectionIndex;
        this.sectionSectionLabels[i].setVisible(shouldShow);
        this.sectionTimeTexts[i].setVisible(shouldShow);
        if (this.sectionTallyTexts && this.sectionTallyTexts[i]) {
          this.sectionTallyTexts[i].setVisible(shouldShow);
        }

        const storedTime = this.sectionTimes ? this.sectionTimes[i] : undefined;
        const hasCompletedTime = typeof storedTime === "number";
        this.sectionTotalTexts[i].setVisible(shouldShow && hasCompletedTime);

        if (!shouldShow) {
          continue;
        }

        const val = sectionTimesArray[i];
        this.sectionTimeTexts[i].setText(this.formatTimeValue(val));

        const tVal = sectionTetrisesArray[i];
        if (this.sectionTallyTexts && this.sectionTallyTexts[i]) {
          this.sectionTallyTexts[i].setText(
            typeof tVal === "number" && tVal > 0 ? "x".repeat(tVal) : "",
          );
        }

        if (hasCompletedTime) {
          runningTotal += storedTime;
          this.sectionTotalTexts[i].setText(this.formatTimeValue(runningTotal));
        }
      }

      if (!isTgm2Normal && !isMarathonMode && this.halfTimeTexts && this.halfTimeTexts.length === 2) {
        const firstHalf = sectionTimesArray
          .slice(0, 5)
          .reduce(
            (sum, t) => (t !== null && t !== undefined ? sum + t : sum),
            0,
          );
        const secondHalf = sectionTimesArray
          .slice(5)
          .reduce(
            (sum, t) => (t !== null && t !== undefined ? sum + t : sum),
            0,
          );

        this.halfTimeTexts[0].time.setText(this.formatTimeValue(firstHalf || 0));
        this.halfTimeTexts[1].time.setText(this.formatTimeValue(secondHalf || 0));

        const showSecondHalf = displayedCurrentSection >= 5;
        this.halfTimeTexts[1].label.setVisible(showSecondHalf);
        this.halfTimeTexts[1].time.setVisible(showSecondHalf);
      }
    }

    // Draw NEXT label - positioned to the right of border
    const nextX = this.borderOffsetX + this.cellSize * this.board.cols + 20;
    const nextY = this.borderOffsetY;
    const nextFontSize = Math.max(
      16,
      Math.min(24, Math.floor(this.cellSize * 0.8)),
    );

    const nextLabel = this.add.text(nextX, nextY, "NEXT", {
      fontSize: `${nextFontSize}px`,
      fill: "#fff",
      fontFamily: "Courier New",
      fontStyle: "bold",
    });
    this.gameGroup.add(nextLabel);

    // Draw multiple next pieces based on mode configuration
    const maxNextPieces = this.nextPiecesCount || 1;
    const previewCellSize = Math.max(8, Math.floor(this.cellSize * 0.6)); // Smaller preview pieces
    for (let i = 0; i < Math.min(maxNextPieces, this.nextPieces.length); i++) {
      const nextPiece = new Piece(this.nextPieces[i], this.rotationSystem);
      // Use matrix-relative positioning like the main game pieces
      nextPiece.x = 0;
      nextPiece.y = 2; // Start from the top visible row
      // Position the next piece area to the right of the playfield
      const nextAreaOffsetX =
        this.borderOffsetX + this.cellSize * this.board.cols + 20;
      const nextAreaOffsetY =
        this.borderOffsetY + 30 + i * (previewCellSize * 3 + 4); // Closer spacing
      nextPiece.draw(this, nextAreaOffsetX, nextAreaOffsetY, previewCellSize);
    }

    // Draw HOLD label and piece for modes that support hold
    if (this.holdEnabled) {
      const holdX = this.borderOffsetX - 80;
      const holdY = this.borderOffsetY;
      const holdFontSize = Math.max(
        16,
        Math.min(24, Math.floor(this.cellSize * 0.8)),
      );

      const holdLabel = this.add.text(holdX, holdY, "HOLD", {
        fontSize: `${holdFontSize}px`,
        fill: "#fff",
        fontFamily: "Courier New",
        fontStyle: "bold",
      });
      this.gameGroup.add(holdLabel);

      // Draw hold piece with same size as preview pieces
      if (this.holdPiece) {
        const previewCellSize = Math.max(8, Math.floor(this.cellSize * 0.6));
        // Create a copy of the hold piece with default rotation for display
        const displayPiece = new Piece(
          this.holdPiece.type,
          this.holdPiece.rotationSystem,
          0,
        );
        displayPiece.x = 0;
        displayPiece.y = 2; // Start from the top visible row
        displayPiece.draw(this, holdX, holdY + 30, previewCellSize);
      }
    }

    // Section messages removed - uncomment if needed for other modes
    /*
        // Draw section message - centered on screen
        if (this.sectionMessage) {
            const alpha = Math.min(1, this.sectionMessageTimer / 60); // Fade out
            const messageFontSize = Math.max(24, Math.min(48, Math.floor(this.cellSize * 1.6)));
            const text = this.add.text(this.windowWidth / 2, this.windowHeight / 2, this.sectionMessage, {
                fontSize: `${messageFontSize}px`,
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 2
            }).setAlpha(alpha).setOrigin(0.5);
            this.gameGroup.add(text);
        }
        */

    // Add playfield border to game group (already created above)
    this.gameGroup.add(this.playfieldBorder);

    // Draw pause overlay - centered on screen
    if (this.isPaused) {
      const overlay = this.add.rectangle(
        this.windowWidth / 2,
        this.windowHeight / 2,
        this.windowWidth,
        this.windowHeight,
        0x000000,
        0.8,
      );
      const pauseFontSize = Math.max(
        48,
        Math.min(72, Math.floor(this.cellSize * 2.4)),
      );
      const pauseText = this.add
        .text(this.windowWidth / 2, this.windowHeight / 2 - 50, "PAUSED", {
          fontSize: `${pauseFontSize}px`,
          fill: "#ffff00",
          stroke: "#000",
          strokeThickness: 2,
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      const resumeFontSize = Math.max(
        16,
        Math.min(28, Math.floor(this.cellSize * 0.9)),
      );
      const resumeText = this.add
        .text(
          this.windowWidth / 2,
          this.windowHeight / 2 + 50,
          "Press ESC to resume",
          {
            fontSize: `${resumeFontSize}px`,
            fill: "#fff",
            fontFamily: "Courier New",
            fontStyle: "normal",
          },
        )
        .setOrigin(0.5);
      const menuText = this.add
        .text(
          this.windowWidth / 2,
          this.windowHeight / 2 + 90,
          "Press M to return to menu",
          {
            fontSize: `${resumeFontSize - 4}px`,
            fill: "#ffcccc",
            fontFamily: "Courier New",
            fontStyle: "normal",
          },
        )
        .setOrigin(0.5);
      this.gameGroup.add(overlay);
      this.gameGroup.add(pauseText);
      this.gameGroup.add(resumeText);
      this.gameGroup.add(menuText);
    }

    // Draw game over text - centered on screen (only after 3 seconds)
    if (this.showGameOverText) {
      const gameOverFontSize = Math.max(
        48,
        Math.min(72, Math.floor(this.cellSize * 1.5)),
      );

      const centerY = this.windowHeight / 2;
      const centerX = this.windowWidth / 2;

      const gameOverText = this.add
        .text(centerX, centerY, this.gameOverMessage || "GAME OVER", {
          fontSize: `${gameOverFontSize}px`,
          fill: this.sprintCompleted ? "#00ff88" : "#ff0000",
          stroke: "#000",
          strokeThickness: 6,
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(0.5);
      this.gameGroup.add(gameOverText);
    }
  }
}

// Initialize game after all classes are defined
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  // Improve text sharpness on high-DPI displays
  resolution: window.devicePixelRatio || 1,
  scene: [
    MenuScene,
    SettingsScene,
    AssetLoaderScene,
    LoadingScreenScene,
    GameScene,
  ],
  backgroundColor: "#000000",
  fps: 60,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
    powerPreference: "high-performance",
    desynchronized: false,
    clearBeforeRender: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const existingGame = window.__minoGame;
if (existingGame && typeof existingGame.destroy === "function") {
  try {
    existingGame.destroy(true);
  } catch (e) {
  }
  window.__minoGame = null;
}

const gameContainer = document.getElementById("game-container");
if (gameContainer) {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
}

const game = new Phaser.Game(config);
window.__minoGame = game;

// Limit frame rate to 60fps
game.loop.maxFps = 60;

// Handle window resize
if (window.__minoResizeHandler) {
  window.removeEventListener("resize", window.__minoResizeHandler);
}

window.__minoResizeHandler = () => {
  const activeGame = window.__minoGame;
  if (!activeGame || !activeGame.scale) return;

  activeGame.scale.resize(window.innerWidth, window.innerHeight);
  if (activeGame.scene.scenes.length > 0) {
    const scene = activeGame.scene.scenes[0];
    if (scene && scene.calculateLayout) {
      scene.calculateLayout();
      if (scene.setupUI) {
        scene.setupUI();
      }
    }
  }
};

window.addEventListener("resize", window.__minoResizeHandler);
