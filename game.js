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

const SRS_KICKS = {
  JLSTZ_CW: [
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2],
      [-2, 0],
      [2, 0],
      [0, 1],
      [0, -1],
    ], // 0->1 extended
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2],
      [2, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
    ], // 1->2 extended
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2],
      [2, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
    ], // 2->3 extended
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2],
      [-2, 0],
      [2, 0],
      [0, 1],
      [0, -1],
    ], // 3->0 extended
  ],
  JLSTZ_CCW: [
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2],
      [2, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
    ], // 0->3 extended
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2],
      [2, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
    ], // 3->2 extended
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2],
      [-2, 0],
      [2, 0],
      [0, 1],
      [0, -1],
    ], // 2->1 extended
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2],
      [-2, 0],
      [2, 0],
      [0, 1],
      [0, -1],
    ], // 1->0 extended
  ],
  I_CW: [
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2],
      [-1, 0],
      [2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 0->1 extended
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1],
      [1, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 1->2 extended
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2],
      [-2, 0],
      [1, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 2->3 extended
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1],
      [0, 0],
      [2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 3->0 extended
  ],
  I_CCW: [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1],
      [1, 0],
      [-2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 0->3 extended
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2],
      [-2, 0],
      [1, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 3->2 extended
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1],
      [0, 0],
      [2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 2->1 extended
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2],
      [-1, 0],
      [2, 0],
      [0, 1],
      [0, -1],
      [0, -2],
      [-1, -1],
      [1, -1],
    ], // 1->0 extended
  ],
};

// ARS (Arika Rotation System) kick tables - Used in TGM series
// More generous kicks than SRS, particularly for I-piece
const ARS_KICKS = {
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
  // ARS I-piece kicks are more generous than SRS
  I_CW: [
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2],
      [-1, 0],
      [2, 0],
    ], // 0->1 (extended)
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1],
      [1, 0],
      [-2, 0],
    ], // 1->2 (extended)
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2],
      [-2, 0],
      [1, 0],
    ], // 2->3 (extended)
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1],
      [0, 0],
      [2, 0],
    ], // 3->0 (extended)
  ],
  I_CCW: [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, 2],
      [2, -1],
      [1, 0],
      [-2, 0],
    ], // 0->3 (extended)
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, 1],
      [-1, -2],
      [-2, 0],
      [1, 0],
    ], // 3->2 (extended)
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, -2],
      [-2, 1],
      [0, 0],
      [2, 0],
    ], // 2->1 (extended)
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, -1],
      [1, 2],
      [-1, 0],
      [2, 0],
    ], // 1->0 (extended)
  ],
  // Additional ARS-specific kicks for special cases
  JLSTZ_180: [
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [0, -2],
      [0, 2],
    ], // 180-degree rotation for JLSTZ
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [0, -2],
      [0, 2],
    ],
  ],
  I_180: [
    [
      [0, 0],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ], // I-piece 180-degree rotation
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],
  ],
};

class Board {
  constructor() {
    this.rows = 22; // Increased from 20 to 22 for better border alignment
    this.cols = 10;
    this.grid = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(0),
    );

    this.fadeGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  clear() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.fadeGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  isValidPosition(piece, x, y) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const newX = x + c;
          const newY = y + r;
          // Allow pieces in hidden rows (negative Y) but prevent going beyond matrix bounds
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
          let color = this.grid[r][c];

          // Apply mino fading if active
          if (scene.minoFadeActive) {
            const minoIndex = scene.placedMinos.findIndex(
              (mino) =>
                mino.x === c && mino.y === r && mino.color === this.grid[r][c],
            );
            if (minoIndex !== -1 && scene.placedMinos[minoIndex].faded) {
              // Skip drawing faded minos to make them invisible
              continue;
            }
          }

          const textureKey =
            scene.rotationSystem === "ARS" ? "mino_ars" : "mino_srs";
          const sprite = scene.add.sprite(
            offsetX + c * cellSize,
            offsetY + (r - startRow) * cellSize,
            textureKey,
          );
          sprite.setDisplaySize(cellSize, cellSize);
          sprite.setTint(color);
          scene.gameGroup.add(sprite);
        }
      }
    }
  }
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
      // I-piece uses special ARS kick table with wall and floor kicks
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
    } else {
      // Other pieces use simple wall kicks: basic, right, left
      const kicks = [
        [0, 0],
        [1, 0],
        [-1, 0],
      ]; // Basic, right, left

      for (let i = 0; i < kicks.length; i++) {
        const kick = kicks[i];
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

    // Select kick tables based on rotation system and piece type
    let kicks;
    kicks =
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
    return this.move(board, 0, 1);
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
            const sprite = scene.add.sprite(
              offsetX + (this.x + c) * cellSize,
              offsetY + (pieceY - 2) * cellSize,
              textureKey,
            );
            sprite.setDisplaySize(cellSize, cellSize);
            sprite.setTint(this.color);
            sprite.setAlpha(finalAlpha);
            scene.gameGroup.add(sprite);
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
    this.leaderboardContainer = this.add.container(centerX + 220, centerY - 50);

    // Leaderboard title - create as separate text object
    this.leaderboardTitle = this.add
      .text(centerX + 220, centerY - 70, "BEST SCORES", {
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
      console.log("Settings button clicked");
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

    // Update leaderboard container (right side)
    if (this.leaderboardContainer) {
      this.leaderboardContainer.setPosition(centerX + 220, centerY - 50);
    }
    if (this.leaderboardTitle) {
      this.leaderboardTitle.setPosition(centerX + 220, centerY - 70);
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
    // Clear existing leaderboard entries by destroying old text objects
    if (this.leaderboardEntries && this.leaderboardEntries.length > 0) {
      this.leaderboardEntries.forEach((entry) => {
        if (entry.gradeText) entry.gradeText.destroy();
        if (entry.levelText) entry.levelText.destroy();
        if (entry.timeText) entry.timeText.destroy();
      });
    }
    this.leaderboardEntries = [];

    // Only show the best score for the currently selected submode
    const currentModeType = this.modeTypes[this.currentModeTypeIndex];
    const currentSubmode = currentModeType.modes[this.currentSubmodeIndex];

    const bestScore = this.getBestScore(currentSubmode.id);

    // Create single leaderboard entry for the selected submode
    // Grade text (large, left-aligned)
    const gradeText = this.add
      .text(
        this.leaderboardContainer.x - 60,
        this.leaderboardContainer.y,
        bestScore.grade || "9",
        {
          fontSize: "32px",
          fill: "#ffff00",
          fontFamily: "Courier New",
          fontStyle: "bold",
        },
      )
      .setOrigin(1, 0.5);

    // Level (top-right)
    const levelText = this.add
      .text(
        this.leaderboardContainer.x + 60,
        this.leaderboardContainer.y - 12,
        `L${bestScore.level || 0}`,
        {
          fontSize: "16px",
          fill: "#00ffff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        },
      )
      .setOrigin(0, 0.5);

    // Time (bottom-right)
    const timeText = this.add
      .text(
        this.leaderboardContainer.x + 60,
        this.leaderboardContainer.y + 12,
        bestScore.time || "0:00.00",
        {
          fontSize: "16px",
          fill: "#cccccc",
          fontFamily: "Courier New",
          fontStyle: "bold",
        },
      )
      .setOrigin(0, 0.5);

    // Store references for cleanup
    this.leaderboardEntries.push({
      gradeText: gradeText,
      levelText: levelText,
      timeText: timeText,
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

    console.log(`Starting mode: ${currentSubmode.id}`);

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

    console.log(`Loaded mode: ${gameMode.getName()} (${currentSubmode.id})`);

    // Store the mode information for later use
    this.selectedMode = gameMode;
    this.selectedModeId = currentSubmode.id;

    // Start the AssetLoaderScene with the mode information
    this.scene.start("AssetLoaderScene", {
      mode: currentSubmode.id,
      gameMode: gameMode,
    });
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
          time: parsed.time || "0:00.00",
        };
      } catch (error) {
        console.warn(`Failed to parse stored score for mode ${mode}:`, error);
      }
    }
    return { score: 0, level: 0, grade: "9", time: "0:00.00" };
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
      rotateCCW: "Rotate CCW",
      hardDrop: "Hard Drop",
      hold: "Hold",
      pause: "Pause",
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
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

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
      this.rotationText.setText(`Rotation System: ${newSystem}`);
      this.updateRotationSystemDisplay(newSystem);
    });

    // Add T piece display under rotation system text
    this.rotationSystem = rotationSystem;
    this.tPieceDisplay = this.createTPieceDisplay(centerX, centerY - 90);

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
      rotateCCW: Phaser.Input.Keyboard.KeyCodes.SPACE,
      hardDrop: Phaser.Input.Keyboard.KeyCodes.X,
      hold: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
      restart: Phaser.Input.Keyboard.KeyCodes.ENTER,
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

  createTPieceDisplay(centerX, centerY, system) {
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

          if (this.textures.exists(textureKey)) {
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
    // Animate the T piece when rotation system changes
    const tPiece = this.tPieceDisplay;

    // Determine the rotation shapes based on system
    const rotations =
      newSystem === "ARS"
        ? SEGA_ROTATIONS.T.rotations
        : TETROMINOES.T.rotations;

    // Update the T piece shape and color immediately
    this.updateTPieceShape(tPiece, rotations, newSystem);

    // Animate 360-degree rotation with the new shape/color
    this.tweens.add({
      targets: tPiece.container,
      angle: 360,
      duration: 600,
      ease: "Power2",
      onComplete: () => {
        // Reset angle to 0
        tPiece.container.angle = 0;
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
    tPiece.minos = [];

    // Recreate mino sprites/graphics with new shape
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (shape[r][c]) {
          // Center the T piece around (0,0) in the container
          const offsetX = (c - 1) * minoSize; // Center horizontally around c=1
          const offsetY = (r - 0.5) * minoSize; // Center vertically around r=0.5

          if (this.textures.exists(textureKey)) {
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
}

class AssetLoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "AssetLoaderScene" });
  }

  init(data) {
    this.selectedMode = data.mode || "Mode 1";
    this.gameMode = data.gameMode || null; // Store gameMode from data

    console.log("AssetLoaderScene.init() - received:", {
      mode: this.selectedMode,
      hasGameMode: !!this.gameMode,
    });
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

    // Load all assets for the game
    this.load.image("mino_srs", "img/mino.png");
    this.load.image("mino_ars", "img/minoARS.png");

    // Load BGM files from the correct directory paths
    try {
      // Load MP3 files from bgm directory (Phaser compatible)
      this.load.audio("stage1", "bgm/tm1_1.mp3");
      this.load.audio("stage2", "bgm/tm1_2.mp3");
      this.load.audio("credits", "bgm/tm1_endroll.mp3");

      // Load TGM2 BGM files
      this.load.audio("tgm2_stage1", "bgm/tm1_1.mp3");
      this.load.audio("tgm2_stage2", "bgm/tm1_2.mp3");
      this.load.audio("tgm2_stage3", "bgm/tm2_3.mp3");
      this.load.audio("tgm2_stage4", "bgm/tm2_4.mp3");
    } catch (error) {
      console.warn("BGM files could not be loaded from bgm directory", error);
    }

    // Load all sound effects
    this.load.audio("ready", "sfx/ready.wav");
    this.load.audio("go", "sfx/go.wav");
    this.load.audio("gradeup", "sfx/gradeup.wav");
    this.load.audio("complete", "sfx/complete.wav");
    this.load.audio("clear", "sfx/clear.wav");
    this.load.audio("fall", "sfx/fall.wav");
    this.load.audio("sectionchange", "sfx/sectionchange.wav");

    this.load.audio("IRS", "sfx/IRS.wav");
    this.load.audio("ground", "sfx/ground.wav");
    this.load.audio("lock", "sfx/lock.wav");
    this.load.audio("sound_s", "sfx/s.wav");
    this.load.audio("sound_z", "sfx/z.wav");
    this.load.audio("sound_t", "sfx/t.wav");
    this.load.audio("sound_j", "sfx/j.wav");
    this.load.audio("sound_l", "sfx/l.wav");
    this.load.audio("sound_o", "sfx/o.wav");
    this.load.audio("sound_i", "sfx/i.wav");
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

    console.log("LoadingScreenScene.init() - received:", {
      mode: this.selectedMode,
      hasGameMode: !!this.gameMode,
    });
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
    // lockDelay is a timer; lockDelayMax is the per-mode limit
    this.lockDelay = 0;
    this.lockDelayMax = 0.5;
    // defer starting the lock timer until after the first grounded frame
    this.lockDelayBufferedStart = false;
    this.isGrounded = false;
    this.level = getStartingLevel(); // Set starting level from URL parameter
    this.startingLevel = this.level; // Preserve the starting level for restarts
    this.piecesPlaced = 0; // Track pieces for level system
    this.score = 0;
    this.grade = "9";
    this.internalGrade = 0;
    this.gradeDisplay = null;
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

    // Track if BGM has been played for the first time
    this.bgmFirstPlay = {
      stage1: true,
      stage2: true,
    };

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

    this.invisibleStackActive = false;
    this.fadingRollActive = false;

    // Mino fading system
    this.minoFadeActive = false;
    this.minoFadeProgress = 0;
    this.minoFadeDelay = 30 / 60; // seconds between each row fade (will be calculated dynamically)
    this.minoFadeTimer = 0;
    this.placedMinos = []; // Track all placed minos for fading
    this.placedMinoRows = []; // Track rows containing minos for row-by-row fading
    this.fadingComplete = false; // Track when fading is complete
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
    this.rotationSystem = localStorage.getItem("rotationSystem") || "SRS"; // 'SRS' or 'ARS'
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

  init(data) {
    console.log("GameScene.init() - received data:", {
      mode: data.mode,
      hasGameMode: !!data.gameMode,
    });

    this.selectedMode = data.mode || "Mode 1";
    this.gameMode = data.gameMode || null;

    console.log("GameScene.init() - after assignment:", {
      selectedMode: this.selectedMode,
      hasGameMode: !!this.gameMode,
    });

    // Load mode if not provided
    if (!this.gameMode && typeof getModeManager !== "undefined") {
      console.log("GameScene: Loading mode from ModeManager...");
      const modeManager = getModeManager();
      this.gameMode = modeManager.getMode(this.selectedMode);
      console.log(
        "GameScene: Loaded mode:",
        this.gameMode ? this.gameMode.getName() : "null",
      );
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
    this.ghostEnabled = config.ghostEnabled !== false; // Default true
    this.levelUpType = config.levelUpType || "piece";
    this.lineClearBonus = config.lineClearBonus || 1;
    this.gravityLevelCap = config.gravityLevelCap || 999;

    // Rotation system is handled by global settings, not mode configuration
    // Get from localStorage (already set in constructor)
    this.rotationSystem = localStorage.getItem("rotationSystem") || "SRS";

    console.log(`Applied mode configuration for: ${this.gameMode.getName()}`);
    console.log(`Config:`, config);
    console.log(
      `DAS: ${this.dasDelay}s, ARR: ${this.arrDelay}s, ARE: ${this.areDelay}s`,
    );
    console.log(
      `Lock Delay: ${this.lockDelayMax}s, Next Pieces: ${this.nextPiecesCount}`,
    );
    console.log(
      `Hold Enabled: ${this.holdEnabled}, Ghost Enabled: ${this.ghostEnabled}`,
    );
    console.log(
      `Level Up Type: ${this.levelUpType}, Line Clear Bonus: ${this.lineClearBonus}`,
    );
    console.log(`Gravity Level Cap: ${this.gravityLevelCap}`);
    console.log(`Rotation System: ${this.rotationSystem} (from settings)`);
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
    this.matrixOffsetX = this.borderOffsetX + 19; // Slightly smaller offset for better space usage
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

    if (hasGrading) {
      const gradeX = uiX + 25;
      const gradeY = this.borderOffsetY;
      const gradeWidth = 80;
      this.gradeDisplay = this.add.graphics();
      this.gradeDisplay.lineStyle(2, 0xffffff);
      this.gradeDisplay.strokeRect(gradeX, gradeY, gradeWidth, 80);
      this.gradeText = this.add
        .text(gradeX + gradeWidth / 2, gradeY + 40, "9", {
          fontSize: `${xlargeFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "center",
        })
        .setOrigin(0.5);
      // Next grade requirement below, wrapped to 1.5x grade width, right-aligned
      if (this.nextGradeText) {
        this.nextGradeText.destroy();
      }
      this.nextGradeText = null;
    }

    // Level display - next to matrix on left, right-aligned, moved 60px up and 20px right
    const levelBottomY = this.borderOffsetY + this.playfieldHeight - 60;
    const levelRowHeight = 20; // Decreased spacing
    const levelFontSize = Math.max(
      24,
      Math.min(36, Math.floor(this.cellSize * 1.0)),
    ); // Increased font

    // Determine mode types
    const isMarathonMode = !!(
      this.selectedMode &&
      (this.selectedMode === "marathon" || this.selectedMode === "ultra")
    );
    const isZenMode = !!(this.selectedMode === "zen");
    const isSprintMode = !!(
      this.selectedMode &&
      (this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100")
    );

    // For Marathon mode, add separate level display above
    if (isMarathonMode) {
      this.levelDisplayLabel = this.add
        .text(uiX + 135, levelBottomY - 4.5 * levelRowHeight - 43, "LEVEL", {
          fontSize: `${uiFontSize - 4}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
        })
        .setOrigin(1, 0);
      this.levelDisplayText = this.add
        .text(uiX + 140, levelBottomY - 4 * levelRowHeight - 43, "0", {
          fontSize: `${levelFontSize}px`,
          fill: "#fff",
          fontFamily: "Courier New",
          fontStyle: "bold",
          align: "right",
        })
        .setOrigin(1, 0);
    }

    // Level/Lines label and display
    const levelLabelText =
      isMarathonMode || isZenMode || isSprintMode ? "LINES" : "LEVEL";
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

    // Time - centered below border, larger font, bold
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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      x: Phaser.Input.Keyboard.KeyCodes.X,
      z: Phaser.Input.Keyboard.KeyCodes.Z,
      c: Phaser.Input.Keyboard.KeyCodes.C,
      l: Phaser.Input.Keyboard.KeyCodes.L,
      k: Phaser.Input.Keyboard.KeyCodes.K,
      r: Phaser.Input.Keyboard.KeyCodes.R,
    });

    // Prevent default browser behavior for game keys
    this.input.keyboard.addCapture([
      Phaser.Input.Keyboard.KeyCodes.SPACE,
      Phaser.Input.Keyboard.KeyCodes.S,
      Phaser.Input.Keyboard.KeyCodes.X,
      Phaser.Input.Keyboard.KeyCodes.Z,
      Phaser.Input.Keyboard.KeyCodes.C,
      Phaser.Input.Keyboard.KeyCodes.L,
      Phaser.Input.Keyboard.KeyCodes.K,
      Phaser.Input.Keyboard.KeyCodes.ESC,
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    ]);
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    // Initialize time tracking using Date.now() for reliability
    this.startTime = Date.now();
    this.gameStartTime = this.startTime;
    this.currentTime = 0;

    this.sectionStartTime = 0;
    this.currentSection = Math.floor(this.level / 100);
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
        this.currentSection = Math.floor(this.level / 100);
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
      !this.gameOver
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
          setTimeout(() => {
            this.startLoopPhase(bgmType);
          }, 100);
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
          setTimeout(() => {
            this.startLoopPhase(bgmType);
          }, 50);
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
      console.log(
        `T.A.Death BGM switching to ${bgmKey} at level ${this.level}`,
      );
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
        console.log(`${bgmType} completed first play, entering loop mode`);
      }
    }
  }

  getCurrentBGMType() {
    if (this.currentBGM === this.stage1BGM) return "stage1";
    if (this.currentBGM === this.stage2BGM) return "stage2";
    return null;
  }

  update() {
    // Limit to 60fps by skipping updates if too fast
    const now = this.time.now;
    if (this.lastUpdateTime > 0) {
      const delta = now - this.lastUpdateTime;
      if (delta < 1000 / 60) {
        return; // Skip this update
      }
      // Store delta time in seconds for timing calculations
      this.deltaTime = delta / 1000;
    } else {
      this.deltaTime = 1 / 60; // Default to 60fps if first frame
    }
    this.lastUpdateTime = now;

    // Input handling
    const leftDown = this.cursors.left.isDown;
    const rightDown = this.cursors.right.isDown;
    const downDown = this.cursors.down.isDown;

    // Custom key bindings
    const sKeyDown = this.keys.s.isDown;
    const xKeyDown = this.keys.x.isDown;
    const zKeyDown = this.keys.z.isDown;
    const cKeyDown = this.keys.c.isDown;
    const spaceKeyDown = this.keys.space.isDown;
    const lKeyDown = this.keys.l.isDown;
    const kKeyDown = this.keys.k.isDown;

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
    if (this.leftKeyPressed && (leftDown || zKeyDown)) {
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
    if (this.rightKeyPressed && (rightDown || cKeyDown)) {
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
    if (!leftDown && !zKeyDown && this.leftKeyPressed) {
      this.leftKeyPressed = false;
      this.leftTimer = 0;
      this.leftInRepeat = false;
    }
    if (!rightDown && !cKeyDown && this.rightKeyPressed) {
      this.rightKeyPressed = false;
      this.rightTimer = 0;
      this.rightInRepeat = false;
    }

    // ARE input tracking - allow during loading for initial piece handling
    if (this.areActive || !this.currentPiece) {
      this.areLeftHeld = leftDown || zKeyDown;
      this.areRightHeld = rightDown || cKeyDown;

      // Track rotation key states during ARE/loading for IRS (Initial Rotation System)
      this.areRotationKeys.k = kKeyDown;
      this.areRotationKeys.space = spaceKeyDown;
      this.areRotationKeys.l = lKeyDown;

      // Determine rotation direction based on currently held keys during ARE
      // Priority: K (clockwise) > Space/L (counter-clockwise)
      // Deactivate if keys are released during ARE
      if (kKeyDown) {
        this.areRotationDirection = 1;
        if (!this.irsActivated) {
          console.log(
            `[IRS] Rotation key K held during ARE, activating CW rotation`,
          );
          this.irsActivated = true;
        }
      } else if (spaceKeyDown || lKeyDown) {
        this.areRotationDirection = -1;
        if (!this.irsActivated) {
          console.log(
            `[IRS] Rotation key ${spaceKeyDown ? "Space" : "L"} held during ARE, activating CCW rotation`,
          );
          this.irsActivated = true;
        }
      } else {
        this.areRotationDirection = 0;
        if (this.irsActivated) {
          console.log(
            `[IRS] Rotation keys released during ARE, deactivating IRS`,
          );
          this.irsActivated = false;
        }
      }

      // Hold functionality for ARE - check if hold key is currently held during ARE
      const holdCurrentlyHeld = this.holdEnabled && this.keys.shift.isDown;
      if (holdCurrentlyHeld && !this.areHoldPressed) {
        this.areHoldPressed = true;
        console.log(`[IHS] Hold key held during ARE, activating IHS`);
      } else if (!holdCurrentlyHeld && this.areHoldPressed) {
        this.areHoldPressed = false;
        console.log(`[IHS] Hold key released during ARE, deactivating IHS`);
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
      this.gameOverTextTimer += this.deltaTime;

      // Show GAME OVER text after 3 seconds
      if (this.gameOverTextTimer >= this.gameOverTextDelay) {
        this.showGameOverText = true;
      }

      if (this.minoFadeTimer >= this.minoFadeDelay) {
        this.minoFadeTimer = 0;
        this.minoFadeProgress++;

        // Mark all minos in the next row as faded (if we have that row)
        if (this.minoFadeProgress <= this.placedMinoRows.length) {
          const rowToFade = this.placedMinoRows[this.minoFadeProgress - 1];
          for (let mino of this.placedMinos) {
            if (mino.y === rowToFade) {
              mino.faded = true;
            }
          }
        }

        // Check if all rows are faded
        if (this.minoFadeProgress >= this.placedMinoRows.length) {
          this.minoFadeActive = false;
          this.fadingComplete = true;
        }
      }
    }

    // Pause/unpause with ESC - handle BEFORE early return
    if (Phaser.Input.Keyboard.JustDown(this.keys.pause) && !this.gameOver) {
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

    // Update time tracking using Date.now() for reliability
    this.updateTimer();

    // Handle BGM first play vs loop mode
    this.manageBGMLoopMode();

    // Track active time and ARE time for PPS calculations
    if (!this.areActive && !this.level999Reached) {
      this.activeTime += this.deltaTime;
    } else if (this.areActive && !this.level999Reached) {
      this.areTime += this.deltaTime;
    }

    // Skip ALL game logic if paused or game over
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
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
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
      if (this.holdEnabled && Phaser.Input.Keyboard.JustDown(this.keys.shift)) {
        this.hold();
      }
    }

    // Pause/unpause with ESC
    if (Phaser.Input.Keyboard.JustDown(this.keys.pause) && !this.gameOver) {
      this.togglePause();
    }

    // Gravity (TGM-style curve)
    if (!this.areActive) {
      // Only apply gravity when not in ARE
      const internalGravity = this.getTGMGravitySpeed(this.level);

      // Mixed gravity system:
      // - For internalGravity >= 256 (1G+): New row-by-row system
      // - For internalGravity < 256 (sub-1G): Original timer-based system

      if (!this.currentPiece) return;
      if (internalGravity >= 256) {
        // New row-by-row gravity system for 1G and above:
        // This means:
        // - internalGravity 256 (1G) = 1 row per frame
        // - internalGravity 512 (2G) = 2 rows per frame
        // - internalGravity 5120 (20G) = 20 rows per frame
        const rowsPerFrame = Math.max(1, Math.floor(internalGravity / 256));

        // Move piece down by the calculated rows per frame
        let moved = false;
        for (let i = 0; i < rowsPerFrame; i++) {
          if (this.currentPiece.move(this.board, 0, 1)) {
            moved = true;
          } else {
            // Piece can't move down anymore
            if (!this.isGrounded) {
              // Piece just became grounded - start lock delay immediately
              this.isGrounded = true;
              this.lockDelay = this.deltaTime; // Start counting from current delta time
              // Play ground sound
              this.currentPiece.playGroundSound(this);
            }
            break;
          }
        }

        if (moved) {
          this.isGrounded = false;
          this.resetLockDelay();
        }
      } else {
        // Original timer-based gravity system for sub-1G values
        // Internal gravity represents 1/256 G, so frames per row = 256 / internalGravity
        this.gravityTimer += 1;
        const framesPerRow = Math.ceil(256 / internalGravity); // Round up to ensure at least 1 frame

        // Apply gravity when timer exceeds frames per row threshold
        if (this.gravityTimer >= framesPerRow) {
          if (!this.currentPiece) return;
          if (this.currentPiece.move(this.board, 0, 1)) {
            this.isGrounded = false;
            this.resetLockDelay();
          } else {
            if (!this.isGrounded) {
              // Piece just became grounded - start lock delay immediately
              this.isGrounded = true;
              this.lockDelay = this.deltaTime; // Start counting from current delta time
              // Play ground sound
              this.currentPiece.playGroundSound(this);
            }
          }
          this.gravityTimer = 0; // Reset timer for next drop
        }
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
          // Line clear delay completed, enter line ARE
          this.lineClearDelayActive = false;
          this.lineClearPhase = true;
          this.areDelay = this.pendingLineAREDelay || 41 / 60;
          this.areTimer = 0;
          console.log(`[ARE] Line clear delay ended, entering line ARE: ${this.areDelay}s`);
        } else if (this.lineClearPhase) {
          // Line clear ARE completed, now actually clear the lines
          this.clearStoredLines();

          // Play fall sound
          const fallSound = this.sound.add("fall", { volume: 0.7 });
          fallSound.play();

          // Start normal ARE phase (0.5 seconds)
          this.areDelay = 30 / 60;
          this.areTimer = 0;
          this.lineClearPhase = false;
          this.isClearingLines = false;
        } else {
          // Normal ARE completed, spawn next piece
          console.log(`[ARE] ARE completed, spawning piece`);
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
      } else {
        this.updateGrade();
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
        this.creditsActive = false;

        // Stop credits BGM when credits end
        if (this.creditsBGM) {
          this.creditsBGM.stop();
          this.creditsBGM = null;
        }

        this.showGameOverScreen();
      }
    }

    // Draw

    this.draw();
  }

  spawnPiece() {
    if (this.nextPieces.length < 6) {
      this.generateNextPieces();
    }
    const type = this.nextPieces.shift();

    // Create piece with default rotation first
    this.currentPiece = new Piece(type, this.rotationSystem, 0);

    console.log(
      `[SPAWN] Starting spawn for piece ${type}, ARE active: ${this.areActive}, rotation direction: ${this.areRotationDirection}, hold pressed: ${this.areHoldPressed}`,
    );

    console.log(
      `[SPAWN] Starting spawn for piece ${type}, ARE active: ${this.areActive}, rotation direction: ${this.areRotationDirection}, hold pressed: ${this.areHoldPressed}`,
    );

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
    const holdPressedAtSpawn = this.areHoldPressed;

    // Reset ARE rotation and hold tracking for the next cycle
    this.areRotationDirection = 0;
    this.areHoldPressed = false;

    console.log(
      `[IHS] Before IHS application: current piece ${this.currentPiece?.type ?? "none"}, hold piece ${this.holdPiece ? this.holdPiece.type : "none"}, areHoldPressed ${holdPressedAtSpawn}`,
    );

    // Handle ARE hold (Initial Hold System) for modes that support hold
    if (this.holdEnabled && holdPressedAtSpawn) {
      console.log(
        `[IHS] ARE Hold pressed: ${holdPressedAtSpawn}, Hold enabled: ${this.holdEnabled}`,
      );
      this.hold();
    }

    console.log(
      `[IHS] After IHS application: current piece ${this.currentPiece.type}, hold piece ${this.holdPiece ? this.holdPiece.type : "none"}`,
    );

    const irsRotationDirection = rotationDirectionAtSpawn;

    // Apply IRS to the spawning piece (which may have been swapped by IHS)
    if (irsRotationDirection === 1) {
      console.log(
        `[IRS] ARE Rotation CW held at spawn: ${irsRotationDirection === 1}, Hold pressed: ${holdPressedAtSpawn}`,
      );
      this.currentPiece.rotation = 1; // Clockwise 90 degrees
      this.currentPiece.shape = this.currentPiece.getRotatedShape();
      wasPreRotated = true;
    } else if (irsRotationDirection === -1) {
      console.log(
        `[IRS] ARE Rotation CCW held at spawn: ${irsRotationDirection === -1}, Hold pressed: ${holdPressedAtSpawn}`,
      );
      this.currentPiece.rotation = 3; // Counter-clockwise 90 degrees
      this.currentPiece.shape = this.currentPiece.getRotatedShape();
      wasPreRotated = true;
    }

    // Log IRS+IHS combination
    if (wasPreRotated && this.holdEnabled && this.holdPiece) {
      console.log(
        `[IRS+IHS] Both IRS and IHS applied: piece ${this.currentPiece.type} rotated to ${this.currentPiece.rotation}, hold contains previous piece`,
      );
    }

    // Play IRS sound if piece was pre-rotated
    if (wasPreRotated) {
      console.log(
        `[IRS] Playing IRS sound for pre-rotated piece: ${this.currentPiece.type}, rotation: ${this.currentPiece.rotation}`,
      );
      const irsSound = this.sound.add("IRS", { volume: 0.5 });
      irsSound.play();
    }

    // Log final piece state after spawn
    console.log(
      `[SPAWN] Final piece after spawn: type ${this.currentPiece.type}, rotation ${this.currentPiece.rotation}, hold: ${this.holdPiece ? this.holdPiece.type : "none"}`,
    );
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
      const sectionIndex = Math.floor(this.level / 100);
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
      console.log(
        `[ARE] Starting line clear delay: ${lineClearDelay}s, upcoming line ARE: ${lineAREDelay}s`,
      );

      // Play clear sound
      const clearSound = this.sound.add("clear", { volume: 0.7 });
      clearSound.play();
    } else {
      // Start normal ARE (0.5 seconds)
      this.areDelay = 30 / 60;
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
      console.log(`[ARE] Starting normal ARE, delay: ${this.areDelay}s`);
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
    console.log(
      `[IHS] Hold function called, current piece: ${currentType}, hold piece: ${holdType}`,
    );

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
      console.log(
        `[IHS] Swapped pieces: ${oldCurrent} -> hold, ${oldHold} -> current`,
      );
    } else {
      // Move current piece to hold
      this.resetPieceToDefaultRotation(this.currentPiece);
      this.holdPiece = this.currentPiece;
      console.log(
        `[IHS] Moved ${this.currentPiece.type} to hold, spawning new piece`,
      );
      this.spawnPiece();
    }

    this.canHold = false;
    this.resetLockDelay();
    this.isGrounded = false;

    // Play hold sound if available
    if (this.sound && this.sound.get("lock")) {
      const holdSound = this.sound.add("lock", { volume: 0.4 });
      holdSound.play();
      console.log(`[IHS] Played hold sound`);
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
    this.lockDelay = 0;
    this.isGrounded = false;
    this.wasGroundedDuringSoftDrop = false; // Reset soft drop ground sound tracking
  }

  updatePPS() {
    // Calculate conventional PPS (including ARE time)
    const totalTime = this.activeTime + this.areTime;
    this.conventionalPPS =
      totalTime > 0 ? this.totalPiecesPlaced / totalTime : 0;

    // Calculate raw PPS (excluding ARE time)
    this.rawPPS =
      this.activeTime > 0 ? this.totalPiecesPlaced / this.activeTime : 0;
  }

  updateScore(lines, pieceType = null, isTSpin = false) {
    // Don't update score during credits roll
    if (this.creditsActive) {
      return;
    }

    // Determine scoring system based on mode
    const isStandardMode = [
      "marathon",
      "sprint_40",
      "sprint_100",
      "ultra",
      "zen",
    ].includes(this.selectedMode);

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
    this.lastClearType = clearType;

    // Track piece for potential T-spin detection next time
    this.lastPieceType = pieceType;
  }

  updateLevel(type, amount = 1) {
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
    const oldSection = Math.floor(oldLevel / 100);
    const newSection = Math.floor(this.level / 100);

    if (newSection > oldSection && this.level < maxLevel) {
      this.handleSectionTransition(newSection);
    }

    // Check for important level milestones
    const milestones = [100, 200, 300, 500, maxLevel];
    if (milestones.includes(this.level) && this.level !== oldLevel) {
      if (this.level === maxLevel) {
        const lastSectionIndex = Math.floor(oldLevel / 100);
        if (
          typeof this.sectionTimes[lastSectionIndex] !== "number" &&
          lastSectionIndex === this.currentSection
        ) {
          this.sectionTimes[lastSectionIndex] = this.currentTime - this.sectionStartTime;
          this.sectionTetrises[lastSectionIndex] = this.currentSectionTetrisCount;
        }

        // Start credits when reaching max level
        this.level999Reached = true;

        if (this.selectedMode && this.selectedMode.startsWith("tgm2") && maxLevel === 999) {
          this.board.clear();
          this.placedMinos = [];
          this.placedMinoRows = [];
          this.clearedLines = [];
          this.isClearingLines = false;
          this.lineClearPhase = false;
          this.lineClearDelayActive = false;
          this.lineClearDelayDuration = 0;
          this.pendingLineAREDelay = 0;
          this.invisibleStackActive = false;
          this.fadingRollActive = false;
        }

        this.startCredits();

        if (this.gameMode && typeof this.gameMode.onCreditsStart === "function") {
          this.gameMode.onCreditsStart(this);
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
    this.sectionCap = (section + 1) * 100;
    if (section >= 9) {
      this.sectionCap = 999;
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

  updateNextGradeText() {
    if (!this.nextGradeText) return; // Skip if grade display not created

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
    if (nextThreshold === Infinity) {
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
    this.currentSection = Math.floor(this.level / 100);
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
      this.levelDisplayText.setText("0");
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

  startCredits() {
    this.creditsActive = true;
    this.creditsTimer = 0;

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

  trackPlacedMino(x, y, color) {
    // Add mino to tracking list for fading
    this.placedMinos.push({ x, y, color, faded: false });

    // Track rows that contain minos for row-by-row fading
    if (!this.placedMinoRows.includes(y)) {
      this.placedMinoRows.push(y);
    }
  }

  startMinoFading() {
    this.minoFadeActive = true;
    this.minoFadeProgress = 0;
    this.minoFadeTimer = 0;
    this.gameOverTextTimer = 0;
    this.showGameOverText = false;

    // Stop BGM immediately when game over and fading starts
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }

    // Sort rows from bottom to top for proper fading order
    this.placedMinoRows.sort((a, b) => b - a); // Descending order

    // Calculate fade delay to complete all rows in 3 seconds
    if (this.placedMinoRows.length > 0) {
      this.minoFadeDelay = 3 / this.placedMinoRows.length; // 3 seconds total / number of rows
    } else {
      this.minoFadeDelay = 3; // fallback if no minos
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
    if (!this.selectedMode) return;
    const key = `bestScore_${this.selectedMode}`;
    const currentBest = this.getBestScore(this.selectedMode);
    const newScore = {
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
    };

    // Update if better score, or same score but higher level, or same level but better grade
    if (
      newScore.score > currentBest.score ||
      (newScore.score === currentBest.score &&
        newScore.level > currentBest.level) ||
      (newScore.score === currentBest.score &&
        newScore.level === currentBest.level &&
        this.getGradeValue(newScore.grade) >
          this.getGradeValue(currentBest.grade))
    ) {
      localStorage.setItem(key, JSON.stringify(newScore));
    }
  }

  getBestScore(mode) {
    const key = `bestScore_${mode}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return { score: 0, level: 0, grade: "9", time: "0:00.00" };
  }

  showGameOverScreen() {
    this.gameOver = true;
    this.gameOverTimer = 0; // Start timer for 10 seconds

    // Stop any playing BGM (stage BGM or credits BGM)
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM = null;
    }
    if (this.creditsBGM) {
      this.creditsBGM.stop();
      this.creditsBGM = null;
    }

    // Stop TGM2 BGM objects
    const tgm2Bgms = [
      this.tgm2_stage1,
      this.tgm2_stage2,
      this.tgm2_stage3,
      this.tgm2_stage4,
    ];
    tgm2Bgms.forEach((bgm) => {
      if (bgm && bgm.isPlaying) {
        bgm.stop();
      }
    });

    // Start mino fading immediately
    this.startMinoFading();

    // Handle game over in game mode (for TGM2, powerup minos, etc.)
    if (this.gameMode && this.gameMode.onGameOver) {
      this.gameMode.onGameOver(this);
    }
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
    const isMarathonMode =
      this.selectedMode &&
      (this.selectedMode === "marathon" || this.selectedMode === "ultra");
    const isZenMode = this.selectedMode === "zen";
    const isSprintMode =
      this.selectedMode &&
      (this.selectedMode === "sprint_40" || this.selectedMode === "sprint_100");

    // For Marathon mode, update separate level display
    if (isMarathonMode && this.levelDisplayText) {
      this.levelDisplayText.setText(this.level.toString());
    }

    // For Zen/Ultra modes, only show lines cleared, no level bar or cap
    if (isZenMode) {
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
      isMarathonMode || isZenMode || isSprintMode
        ? this.totalLines.toString()
        : this.level.toString();
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

    // Bar - middle row, white background with red fill (skip for Marathon)
    if (!isMarathonMode) {
      const barY = levelBottomY - 2 * levelRowHeight;
      const barWidth = 60;
      const barHeight = 4;
      const barX = rightX - barWidth;
      const internalGravity = this.getTGMGravitySpeed(this.level);
      const gravityRatio = Math.min(internalGravity / 2560, 1); // 0 to 1, 5120 is 20G

      if (!this.levelBar) {
        this.levelBar = this.add.graphics();
      }
      this.levelBar.clear();
      // White background
      this.levelBar.fillStyle(0xffffff);
      this.levelBar.fillRect(barX + 14, barY - 15, barWidth, barHeight);
      // Red fill from left
      this.levelBar.fillStyle(0xff0000);
      this.levelBar.fillRect(
        barX + 14,
        barY - 15,
        barWidth * gravityRatio,
        barHeight,
      );
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
      if (
        this.gameStarted &&
        (!this.gameOver || (!this.minoFadeActive && !this.fadingComplete))
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
            const sprite = this.add.sprite(
              this.matrixOffsetX + col * this.cellSize,
              this.matrixOffsetY + (lineRow - 2) * this.cellSize,
              textureKey,
            );
            sprite.setDisplaySize(this.cellSize, this.cellSize);
            sprite.setTint(0xffffff); // White for cleared lines
            sprite.setAlpha(fadeAlpha);
            this.gameGroup.add(sprite);
          }
        }
      }
    }
    if (this.currentPiece) {
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
    }

    // Update piece per second displays
    this.ppsText.setText(this.conventionalPPS.toFixed(2));
    this.rawPpsText.setText(this.rawPPS.toFixed(2));

    // Draw level bar
    this.drawLevelBar();

    // Format and display time
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = Math.floor(this.currentTime % 60);
    const centiseconds = Math.floor((this.currentTime % 1) * 100);
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;

    if (this.timeText) {
      this.timeText.setText(timeString);
    } else {
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
      this.gameGroup.add(overlay);
      this.gameGroup.add(pauseText);
      this.gameGroup.add(resumeText);
    }

    // Draw game over text - centered on screen (only after 3 seconds)
    if (this.showGameOverText) {
      const gameOverFontSize = Math.max(
        48,
        Math.min(72, Math.floor(this.cellSize * 2.4)),
      );

      const centerY = this.windowHeight / 2;
      const centerX = this.windowWidth / 2;

      const gameOverText = this.add
        .text(centerX, centerY, "GAME OVER", {
          fontSize: `${gameOverFontSize}px`,
          fill: "#ff0000",
          stroke: "#000",
          strokeThickness: 2,
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
    antialias: true,
    pixelArt: false,
    roundPixels: false,
    powerPreference: "high-performance",
    desynchronized: false,
    clearBeforeRender: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

// Limit frame rate to 60fps
game.loop.maxFps = 60;

// Handle window resize
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
  // Recalculate layout when window is resized
  if (game.scene.scenes.length > 0) {
    const scene = game.scene.scenes[0];
    if (scene && scene.calculateLayout) {
      scene.calculateLayout();
      // Recreate UI with new layout
      if (scene.setupUI) {
        scene.setupUI();
      }
    }
  }
});
