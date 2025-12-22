// GameEngine.js - Core engine with mode-agnostic logic
// This contains the universal game mechanics that work across all modes

// Sega-style rotation matrices for ARS (Arika Rotation System)
const SEGA_ROTATIONS = {
    I: {
        rotations: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ], // Rotation 0
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ], // Rotation 2
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0x00FFFF
    },
    O: {
        rotations: [
            [
                [1, 1],
                [1, 1]
            ], // Rotation 0
            [
                [1, 1],
                [1, 1]
            ], // Rotation 1
            [
                [1, 1],
                [1, 1]
            ], // Rotation 2
            [
                [1, 1],
                [1, 1]
            ]  // Rotation 3
        ],
        color: 0xFFFF00
    },
    S: {
        rotations: [
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ], // Rotation 0
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ], // Rotation 2
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0x00FF00
    },
    Z: {
        rotations: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
            ], // Rotation 1
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ], // Rotation 2
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0xFF0000
    },
    J: {
        rotations: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ], // Rotation 0 (3-wide)
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0],
                [1, 0, 0],
                [1, 1, 1]
            ], // Rotation 2 (3-wide) - shifted down
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0x0000FF
    },
    L: {
        rotations: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0]
            ], // Rotation 0 (3-wide)
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0],
                [0, 0, 1],
                [1, 1, 1]
            ], // Rotation 2 (3-wide) - shifted down
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
            ]  // Rotation 3
        ],
        color: 0xFFA500
    },
    T: {
        rotations: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ], // Rotation 0 (3-wide)
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ], // Rotation 2 (3-wide)
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0xFF00FF
    }
};

// ARS (Arika Rotation System) color scheme
const ARS_COLORS = {
    I: 0xFF0000, // red
    T: 0x00FFFF, // cyan
    S: 0xFF00FF, // purple
    Z: 0x00FF00, // green
    O: 0xFFFF00, // yellow
    L: 0xFFA500, // orange
    J: 0x0000FF  // blue
};

const TETROMINOES = {
    I: {
        rotations: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ], // Rotation 0
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ], // Rotation 2
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]  // Rotation 3
        ],
        color: 0x00FFFF
    },
    O: {
        rotations: [
            [
                [1, 1],
                [1, 1]
            ], // Rotation 0
            [
                [1, 1],
                [1, 1]
            ], // Rotation 1
            [
                [1, 1],
                [1, 1]
            ], // Rotation 2
            [
                [1, 1],
                [1, 1]
            ]  // Rotation 3
        ],
        color: 0xFFFF00
    },
    S: {
        rotations: [
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]
            ], // Rotation 1
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ], // Rotation 2
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0x00FF00
    },
    Z: {
        rotations: [
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ], // Rotation 2
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]
            ]  // Rotation 3
        ],
        color: 0xFF0000
    },
    J: {
        rotations: [
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ], // Rotation 2
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ]  // Rotation 3
        ],
        color: 0x0000FF
    },
    L: {
        rotations: [
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
            ], // Rotation 1
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0]
            ], // Rotation 2
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0xFFA500
    },
    T: {
        rotations: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ], // Rotation 0
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ], // Rotation 1
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ], // Rotation 2
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]  // Rotation 3
        ],
        color: 0xFF00FF
    }
};

const SRS_KICKS = {
    JLSTZ_CW: [
        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], [-2, 0], [2, 0], [0, 1], [0, -1]], // 0->1 extended
        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2], [2, 0], [-2, 0], [0, 1], [0, -1]], // 1->2 extended
        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2], [2, 0], [-2, 0], [0, 1], [0, -1]], // 2->3 extended
        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2], [-2, 0], [2, 0], [0, 1], [0, -1]] // 3->0 extended
    ],
    JLSTZ_CCW: [
        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2], [2, 0], [-2, 0], [0, 1], [0, -1]], // 0->3 extended
        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2], [2, 0], [-2, 0], [0, 1], [0, -1]], // 3->2 extended
        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], [-2, 0], [2, 0], [0, 1], [0, -1]], // 2->1 extended
        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2], [-2, 0], [2, 0], [0, 1], [0, -1]] // 1->0 extended
    ],
    I_CW: [
        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2], [-1, 0], [2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 0->1 extended
        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1], [1, 0], [-2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 1->2 extended
        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2], [-2, 0], [1, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 2->3 extended
        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1], [0, 0], [2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]] // 3->0 extended
    ],
    I_CCW: [
        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1], [1, 0], [-2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 0->3 extended
        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2], [-2, 0], [1, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 3->2 extended
        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1], [0, 0], [2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]], // 2->1 extended
        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2], [-1, 0], [2, 0], [0, 1], [0, -1], [0, -2], [-1, -1], [1, -1]] // 1->0 extended
    ]
};

// ARS (Arika Rotation System) kick tables - Used in TGM series
const ARS_KICKS = {
    JLSTZ_CW: [
        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]], // 0->1
        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], // 1->2
        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]], // 2->3
        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]] // 3->0
    ],
    JLSTZ_CCW: [
        [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]], // 0->3
        [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]], // 3->2
        [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]], // 2->1
        [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]] // 1->0
    ],
    // ARS I-piece kicks are more generous than SRS
    I_CW: [
        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2], [-1, 0], [2, 0]], // 0->1 (extended)
        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1], [1, 0], [-2, 0]], // 1->2 (extended)
        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2], [-2, 0], [1, 0]], // 2->3 (extended)
        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1], [0, 0], [2, 0]] // 3->0 (extended)
    ],
    I_CCW: [
        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1], [1, 0], [-2, 0]], // 0->3 (extended)
        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2], [-2, 0], [1, 0]], // 3->2 (extended)
        [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1], [0, 0], [2, 0]], // 2->1 (extended)
        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2], [-1, 0], [2, 0]] // 1->0 (extended)
    ],
    // Additional ARS-specific kicks for special cases
    JLSTZ_180: [
        [[0, 0], [0, -1], [0, 1], [0, -2], [0, 2]], // 180-degree rotation for JLSTZ
        [[0, 0], [0, -1], [0, 1], [0, -2], [0, 2]]
    ],
    I_180: [
        [[0, 0], [-1, 0], [1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]], // I-piece 180-degree rotation
        [[0, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    ]
};

class Board {
    constructor() {
        this.rows = 22; // Increased from 20 to 22 for better border alignment
        this.cols = 10;
        this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    }

    isValidPosition(piece, x, y) {
        for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
                if (piece.shape[r][c]) {
                    const newX = x + c;
                    const newY = y + r;
                    // Allow pieces in hidden rows (negative Y) but prevent going beyond matrix bounds
                    if (newX < 0 || newX >= this.cols || newY >= this.rows || (newY >= 0 && this.grid[newY][newX])) {
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
            if (this.grid[r].every(cell => cell !== 0)) {
                linesToClear.push(r);
            }
        }
        linesToClear.forEach(line => {
            this.grid.splice(line, 1);
            this.grid.unshift(Array(this.cols).fill(0));
        });
        return linesToClear.length;
    }

    draw(scene, offsetX, offsetY, cellSize, minoFadeActive = false, placedMinos = []) {
        // Only draw the visible rows (rows 2-21 of the 22-row matrix)
        const startRow = 2;
        const endRow = Math.min(this.rows, startRow + scene.visibleRows);

        for (let r = startRow; r < endRow; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    let color = this.grid[r][c];
                    
                    // Apply mino fading if active
                    if (minoFadeActive) {
                        const minoIndex = placedMinos.findIndex(mino => 
                            mino.x === c && mino.y === r && mino.color === this.grid[r][c]
                        );
                        if (minoIndex !== -1 && placedMinos[minoIndex].faded) {
                            // Skip drawing faded minos to make them invisible
                            continue;
                        }
                    }
                    
                    const textureKey = scene.rotationSystem === 'ARS' ? 'mino_ars' : 'mino_srs';
                    const sprite = scene.add.sprite(offsetX + c * cellSize, offsetY + (r - startRow) * cellSize, textureKey);
                    sprite.setDisplaySize(cellSize, cellSize);
                    sprite.setTint(color);
                    scene.gameGroup.add(sprite);
                }
            }
        }
    }
}

class Piece {
    constructor(type, rotationSystem = 'SRS', initialRotation = 0) {
        this.type = type;
        this.rotationSystem = rotationSystem;
        // Use Sega rotations for ARS, SRS rotations for SRS
        const rotations = rotationSystem === 'ARS' ? SEGA_ROTATIONS[type].rotations : TETROMINOES[type].rotations;
        this.shape = rotations[initialRotation].map(row => [...row]); // Start with specified rotation
        // Use ARS colors for ARS mode, SRS colors for SRS mode
        this.color = rotationSystem === 'ARS' ? ARS_COLORS[type] : TETROMINOES[type].color;
        this.x = 3; // spawn position
        if (this.type === 'O') this.x = 4; // Move O piece 1 column to the right
        this.y = 1; // Spawn at rows 18-19 from bottom (equivalent to rows 1-2 from top) - will be overridden in spawnPiece
        this.fractionalY = 0; // For fractional gravity movement
        this.rotation = initialRotation;
    }

    getRotatedShape() {
        const rotations = this.rotationSystem === 'ARS' ? SEGA_ROTATIONS[this.type].rotations : TETROMINOES[this.type].rotations;
        return rotations[this.rotation] || rotations[0]; // Fallback to first rotation
    }

    rotate(board, direction, rotationSystem = 'SRS') {
        // S and Z pieces only have 2 rotation states
        const rotationStates = (this.type === 'S' || this.type === 'Z') ? 2 : 4;
        const newRotation = (this.rotation + direction + rotationStates) % rotationStates; // Proper cycling
        const rotations = rotationSystem === 'ARS' ? SEGA_ROTATIONS[this.type].rotations : TETROMINOES[this.type].rotations;
        const newShape = rotations[newRotation];

        if (rotationSystem === 'ARS') {
            // ARS (Arika Rotation System) implementation
            return this.rotateARS(board, direction, newRotation, newShape);
        } else {
            // SRS (Super Rotation System) implementation
            return this.rotateSRS(board, direction, newRotation, newShape);
        }
    }
    
    rotateARS(board, direction, newRotation, newShape) {
        if (this.type === 'I') {
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
                    this.shape = newShape.map(row => [...row]);
                    this.rotation = newRotation;
                    return true;
                }
            }
        } else {
            // Other pieces use simple wall kicks: basic, right, left
            const kicks = [[0, 0], [1, 0], [-1, 0]]; // Basic, right, left

            for (let i = 0; i < kicks.length; i++) {
                const kick = kicks[i];
                const newX = this.x + kick[0];
                const newY = this.y + kick[1];
                if (board.isValidPosition({ shape: newShape }, newX, newY)) {
                    this.x = newX;
                    this.y = newY;
                    this.shape = newShape.map(row => [...row]);
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
        kicks = this.type === 'I' ? (isCW ? SRS_KICKS.I_CW : SRS_KICKS.I_CCW) : (isCW ? SRS_KICKS.JLSTZ_CW : SRS_KICKS.JLSTZ_CCW);

        const kickTable = kicks[this.rotation];

        for (let i = 0; i < kickTable.length; i++) {
            const kick = kickTable[i];
            const newX = this.x + kick[0];
            const newY = this.y + kick[1];
            if (board.isValidPosition({ shape: newShape }, newX, newY)) {
                this.x = newX;
                this.y = newY;
                this.shape = newShape.map(row => [...row]);
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
            const groundSound = scene.sound.add('ground', { volume: 0.4 });
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
                        const textureKey = scene.rotationSystem === 'ARS' ? 'mino_ars' : 'mino_srs';
                        const sprite = scene.add.sprite(offsetX + (this.x + c) * cellSize, offsetY + (pieceY - 2) * cellSize, textureKey);
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

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEGA_ROTATIONS,
        ARS_COLORS,
        TETROMINOES,
        SRS_KICKS,
        ARS_KICKS,
        Board,
        Piece
    };
}