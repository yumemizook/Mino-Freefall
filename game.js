// Sega-style rotation matrices for ARS (Arika Rotation System)
// These are aligned to the bottom of the bounding box, unlike SRS
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
// More generous kicks than SRS, particularly for I-piece
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
        // Safety checks
        if (!piece || !piece.shape || !this.grid) {
            console.warn('isValidPosition: Invalid piece or board');
            return false;
        }
        
        try {
            for (let r = 0; r < piece.shape.length; r++) {
                if (!piece.shape[r]) continue;
                
                for (let c = 0; c < piece.shape[r].length; c++) {
                    if (piece.shape[r][c]) {
                        const newX = x + c;
                        const newY = y + r;
                        // Allow pieces in hidden rows (negative Y) but prevent going beyond matrix bounds
                        if (newX < 0 || newX >= this.cols || newY >= this.rows || (newY >= 0 && this.grid[newY] && this.grid[newY][newX])) {
                            return false;
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            console.warn('isValidPosition: Error checking position:', error);
            return false;
        }
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

    draw(scene, offsetX, offsetY, cellSize) {
        // Only draw the visible rows (rows 2-21 of the 22-row matrix)
        const startRow = 2;
        const endRow = Math.min(this.rows, startRow + scene.visibleRows);

        for (let r = startRow; r < endRow; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    let color = this.grid[r][c];
                    
                    // Apply mino fading if active
                    if (scene.minoFadeActive) {
                        const minoIndex = scene.placedMinos.findIndex(mino => 
                            mino.x === c && mino.y === r && mino.color === this.grid[r][c]
                        );
                        if (minoIndex !== -1 && scene.placedMinos[minoIndex].faded) {
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
        // Safety checks
        if (!board || !board.isValidPosition) {
            console.warn('Move: Invalid board');
            return false;
        }
        
        if (!this.shape || this.x === undefined || this.y === undefined) {
            console.warn('Move: Invalid piece state');
            return false;
        }
        
        const newX = this.x + dx;
        const newY = this.y + dy;
        
        try {
            if (board.isValidPosition(this, newX, newY)) {
                this.x = newX;
                this.y = newY;
                this.fractionalY = this.y; // Reset fractional tracking
                return true;
            }
        } catch (error) {
            console.warn('Move: Error during movement:', error);
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
        // Safety check for null board
        if (!board || !board.grid) {
            console.warn('HardDrop: Invalid board');
            return;
        }
        
        // Safety check for piece validity
        if (!this.shape || !this.type) {
            console.warn('HardDrop: Invalid piece');
            return;
        }
        
        let moves = 0;
        const maxMoves = board.rows * 2; // Safety limit
        
        while (this.move(board, 0, 1) && moves < maxMoves) {
            moves++;
        }
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
        // Safety checks
        if (!this.type || !this.rotationSystem || this.rotation === undefined) {
            console.warn('getGhostPosition: Invalid piece data');
            return null;
        }
        
        if (!board || !board.grid) {
            console.warn('getGhostPosition: Invalid board');
            return null;
        }
        
        try {
            const ghost = new Piece(this.type, this.rotationSystem, this.rotation);
            ghost.x = this.x;
            ghost.y = this.y;
            ghost.hardDrop(board);
            return ghost;
        } catch (error) {
            console.warn('getGhostPosition: Error creating ghost piece:', error);
            return null;
        }
    }
}

// Get starting level from URL parameters
function getStartingLevel() {
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get('level');
    
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
        super({ key: 'MenuScene' });
    }

    preload() {
        // Load assets if needed
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 200, 'MINO FREEFALL', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 0,
                stroke: true,
                fill: false
            }
        }).setOrigin(0.5);

        // Mode buttons (placeholders)
        const modes = ['Mode 1', 'Mode 2', 'Mode 3'];
        modes.forEach((mode, index) => {
            const button = this.add.text(centerX, centerY - 100 + index * 60, mode, {
                fontSize: '24px',
                fill: '#ffffff',
                fontFamily: 'Courier New'
            }).setOrigin(0.5).setInteractive();

            button.on('pointerdown', () => {
                this.scene.start('AssetLoaderScene', { mode: mode });
            });
        });

        // Settings button
        const settingsButton = this.add.text(centerX, centerY + 50, 'Settings', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive();

        settingsButton.on('pointerdown', () => {
            this.scene.start('SettingsScene');
        });

        // Best scores display
        this.displayBestScores(centerX, centerY + 120);
    }

    displayBestScores(centerX, startY) {
        const modes = ['Mode 1', 'Mode 2', 'Mode 3'];
        modes.forEach((mode, index) => {
            const bestScore = this.getBestScore(mode);
            this.add.text(centerX, startY + index * 40, `${mode} Best: ${bestScore.score} pts, Lvl ${bestScore.level}, ${bestScore.grade}, ${bestScore.time}`, {
                fontSize: '16px',
                fill: '#cccccc',
                fontFamily: 'Courier New'
            }).setOrigin(0.5);
        });
    }

    getBestScore(mode) {
        const key = `bestScore_${mode}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return { score: 0, level: 0, grade: '9', time: '0:00.00' };
    }
}

class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 100, 'Settings', {
            fontSize: '36px',
            fill: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5);

        // Rotation system toggle
        const rotationSystem = localStorage.getItem('rotationSystem') || 'SRS';
        this.rotationText = this.add.text(centerX, centerY - 20, `Rotation System: ${rotationSystem}`, {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive();

        this.rotationText.on('pointerdown', () => {
            const newSystem = rotationSystem === 'SRS' ? 'ARS' : 'SRS';
            localStorage.setItem('rotationSystem', newSystem);
            this.rotationText.setText(`Rotation System: ${newSystem}`);
        });

        // Back to menu
        const backButton = this.add.text(centerX, centerY + 60, 'Back to Menu', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

class AssetLoaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AssetLoaderScene' });
    }

    preload() {
        // Load all assets for the game
        this.load.image('mino_srs', 'img/mino.png');
        this.load.image('mino_ars', 'img/minoARS.png');
        
        // Load BGM files
        this.load.audio('stage1', 'bgm/stage1.mp3');
        this.load.audio('stage2', 'bgm/stage2.mp3');
        this.load.audio('credits', 'bgm/credits.mp3');
        
        // Load all sound effects
        this.load.audio('ready', 'sfx/ready.wav');
        this.load.audio('go', 'sfx/go.wav');
        this.load.audio('gradeup', 'sfx/gradeup.wav');
        this.load.audio('complete', 'sfx/complete.wav');
        this.load.audio('clear', 'sfx/clear.wav');
        this.load.audio('fall', 'sfx/fall.wav');
        this.load.audio('sectionchange', 'sfx/sectionchange.wav');
        this.load.audio('IRS', 'sfx/IRS.wav');
        this.load.audio('ground', 'sfx/ground.wav');
        this.load.audio('lock', 'sfx/lock.wav');
        
        // Load tetromino sound effects
        this.load.audio('sound_s', 'sfx/s.wav');
        this.load.audio('sound_z', 'sfx/z.wav');
        this.load.audio('sound_t', 'sfx/t.wav');
        this.load.audio('sound_j', 'sfx/j.wav');
        this.load.audio('sound_l', 'sfx/l.wav');
        this.load.audio('sound_o', 'sfx/o.wav');
        this.load.audio('sound_i', 'sfx/i.wav');
    }

    create() {
        // All assets loaded, proceed to loading screen
        this.scene.start('LoadingScreenScene', { mode: this.selectedMode });
    }
}

class LoadingScreenScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScreenScene' });
    }

    init(data) {
        this.selectedMode = data.mode || 'Mode 1';
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Add loading text
        this.add.text(centerX, centerY, 'LOADING...', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Start the READY/GO sequence after 1 second
        this.time.delayedCall(1000, () => {
            this.showReadyGoSequence();
        });
    }

    showReadyGoSequence() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Show READY text with sound
        const readyText = this.add.text(centerX, centerY, 'READY', {
            fontSize: '64px',
            fill: '#ffff00',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Play ready sound
        const readySound = this.sound.add('ready', { volume: 0.7 });
        readySound.play();

        // Show GO text with sound after 1 second
        this.time.delayedCall(1000, () => {
            readyText.destroy();
            
            const goText = this.add.text(centerX, centerY, 'GO', {
                fontSize: '64px',
                fill: '#00ff00',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // Play go sound
            const goSound = this.sound.add('go', { volume: 0.7 });
            goSound.play();

            // Start game after 1 more second
            this.time.delayedCall(1000, () => {
                this.scene.start('GameScene', { mode: this.selectedMode });
            });
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.board = new Board();
        this.currentPiece = null;
        this.holdPiece = null;
        this.canHold = true;
        this.nextPieces = []; // Initialize next pieces array
        this.gravityTimer = 0.0;
        this.lockDelay = 0;
        this.isGrounded = false;
        this.level = getStartingLevel(); // Set starting level from URL parameter
        this.startingLevel = this.level; // Preserve the starting level for restarts
        this.piecesPlaced = 0; // Track pieces for level system
        this.score = 0;
        this.grade = '9';
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

        // DAS (Delayed Auto Shift) variables
        this.dasDelay = 16/60; // seconds until auto-repeat starts
        this.arrDelay = 1/60; // seconds between repeats
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

        // ARE (Appearance Delay)
        this.areDelay = 30/60; // seconds until next piece appears
        this.areTimer = 0;
        this.areActive = false;

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
        this.gameTimerStopped = false; // Stop timer at level 999 or game over

        // Piece per second tracking
        this.totalPiecesPlaced = 0; // Total pieces that have entered the playfield
        this.activeTime = 0; // Time spent not in ARE (piece movement time)
        this.areTime = 0; // Time spent in ARE phases
        this.conventionalPPS = 0; // PPS including ARE time
        this.rawPPS = 0; // PPS excluding ARE time
        
        // PPS display objects (initialized in setupUI)
        this.ppsLabel = null;
        this.ppsText = null;
        this.rawPpsLabel = null;
        this.rawPpsText = null;

        // Sections and level caps
        this.sectionCap = 99; // Start at first section cap
        this.sectionTransition = false;
        this.sectionMessage = null;
        this.sectionMessageTimer = 0;

        // Piece randomizer history (TGM1 system)
        this.pieceHistory = ['Z', 'Z', 'S', 'S']; // Start with [Z,Z,S,S] as specified
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

        // Credits system
        this.creditsActive = false;
        this.creditsTimer = 0;
        this.creditsDuration = 61.60; // 61.60 seconds
        this.creditsText = null;
        this.creditsScrollSpeed = 0.5; // pixels per frame
        this.creditsAlpha = 1;
        this.congratulationsActive = false;
        this.gameComplete = false;

        // Mino fading system
        this.minoFadeActive = false;
        this.minoFadeProgress = 0;
        this.minoFadeDelay = 30/60; // seconds between each row fade (will be calculated dynamically)
        this.minoFadeTimer = 0;
        this.placedMinos = []; // Track all placed minos for fading
        this.placedMinoRows = []; // Track rows containing minos for row-by-row fading
        this.gameOverTextDelay = 3; // seconds until GAME OVER text appears
        this.gameOverTextTimer = 0;
        this.showGameOverText = false;

        // GM grade tracking
        this.gmConditions = {
            level300: { achieved: false, time: 0, score: 0 },
            level500: { achieved: false, time: 0, score: 0 },
            level999: { achieved: false, time: 0, score: 0 }
        };

        // Rotation system selection
        this.rotationSystem = localStorage.getItem('rotationSystem') || 'SRS'; // 'SRS' or 'ARS'
        this.rotationSystemDisplay = null;

        // Keybind and IRS display
        this.irsActivated = false;

        // FPS limiter
        this.lastUpdateTime = 0;
        this.deltaTime = 1/60; // Default delta time

        // Pause time tracking
        this.pauseStartTime = null;
        this.totalPausedTime = 0;

        // Mode and best score tracking
        this.selectedMode = null;

        // Game over timer
        this.gameOverTimer = 0;
        
        // Soft drop ground sound tracking
        this.wasGroundedDuringSoftDrop = false;
    }

    init(data) {
        this.selectedMode = data.mode || 'Mode 1';
    }

    preload() {
        // Assets are loaded in AssetLoaderScene
        // This preload is intentionally empty to avoid duplicate loading
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
        this.borderOffsetY = Math.floor((windowHeight - this.playfieldHeight) / 2) - 30; // Adjusted for better centering
        
        // Move the matrix to the right within the border
        this.matrixOffsetX = this.borderOffsetX + 19; // Slightly smaller offset for better space usage
        this.matrixOffsetY = this.borderOffsetY + 20;
        
        // Store window dimensions for UI positioning
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }
    
    setupUI() {
        const uiFontSize = Math.max(16, Math.min(24, Math.floor(this.cellSize * 0.8)));
        const largeFontSize = Math.max(20, Math.min(32, Math.floor(this.cellSize * 1.2)));
        const xlargeFontSize = Math.max(28, Math.min(48, Math.floor(this.cellSize * 1.8)));
        const timeFontSize = Math.max(24, Math.min(40, Math.floor(this.cellSize * 1.5))); // Larger for time

        // UI positioned to the left of border, moved 50px right
        const uiX = Math.max(20, this.borderOffsetX - 200) + 50;

        // Grade display - next to matrix on left, right-aligned, moved 25px right
        const gradeX = uiX + 25;
        const gradeY = this.borderOffsetY;
        const gradeWidth = 80;
        this.gradeDisplay = this.add.graphics();
        this.gradeDisplay.lineStyle(2, 0xffffff);
        this.gradeDisplay.strokeRect(gradeX, gradeY, gradeWidth, 80);
        
        // Add colored background for grade
        this.gradeBackground = this.add.graphics();
        this.gradeBackground.fillStyle(0x444444, 0.8); // Default dark gray
        this.gradeBackground.fillRect(gradeX + 2, gradeY + 2, gradeWidth - 4, 76);
        
        // Add to game group for proper rendering
        this.gameGroup.add(this.gradeBackground);
        this.gameGroup.add(this.gradeDisplay);
        
        this.gradeText = this.add.text(gradeX + gradeWidth/2, gradeY + 40, '9', { 
            fontSize: `${xlargeFontSize}px`, 
            fill: '#fff', 
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        // Next grade requirement below, wrapped to 1.5x grade width, right-aligned
        const nextGradeWidth = gradeWidth * 1.75;
        this.nextGradeText = this.add.text(gradeX + gradeWidth, gradeY + 90, 'Next: 400 pts', {
            fontSize: `${uiFontSize}px`,
            fill: '#ccc',
            fontFamily: 'Courier New',
            wordWrap: { width: nextGradeWidth },
            align: 'right',
            fontStyle: 'normal'
        }).setOrigin(1, 0);

        // Level display - next to matrix on left, right-aligned, moved 60px up and 20px right
        const levelBottomY = this.borderOffsetY + this.playfieldHeight - 60;
        const levelRowHeight = 20; // Decreased spacing
        const levelFontSize = Math.max(24, Math.min(36, Math.floor(this.cellSize * 1.0))); // Increased font
        this.levelLabel = this.add.text(uiX + 135, levelBottomY - 3.5 * levelRowHeight - 43, 'LEVEL', { 
            fontSize: `${uiFontSize}px`, 
            fill: '#fff', 
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(1, 0);
        // Level bar and texts will be added in draw

        // Score display - next to matrix on left, right-aligned, moved 30px up and 20px right
        const scoreRowHeight = 25;
        this.scoreLabel = this.add.text(uiX + 135, levelBottomY, 'SCORE', { 
            fontSize: `${uiFontSize - 4}px`, 
            fill: '#fff', 
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }).setOrigin(1, 0);
        this.scoreText = this.add.text(uiX + 140, levelBottomY + 15, '0', { 
            fontSize: `${xlargeFontSize}px`, 
            fill: '#fff', 
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            align: 'right'
        }).setOrigin(1, 0);

        // PPS displays on the right side (initialized but positioned later in draw)
        const rightSideX = this.borderOffsetX + (this.cellSize * this.board.cols) + 50;
        const ppsY = this.borderOffsetY + 120;
        const ppsFontSize = Math.max(14, Math.min(20, Math.floor(this.cellSize * 0.7)));
        const largePpsFontSize = Math.max(18, Math.min(24, Math.floor(this.cellSize * 0.9)));
        
        this.ppsLabel = this.add.text(rightSideX, ppsY, 'PPS', {
            fontSize: `${ppsFontSize}px`,
            fill: '#fff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        });
        this.ppsText = this.add.text(rightSideX, ppsY + 20, '0.00', {
            fontSize: `${largePpsFontSize}px`,
            fill: '#fff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        });
        
        this.rawPpsLabel = this.add.text(rightSideX, ppsY + 50, 'RAW PPS', {
            fontSize: `${ppsFontSize - 2}px`,
            fill: '#ccc',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        });
        this.rawPpsText = this.add.text(rightSideX, ppsY + 70, '0.00', {
            fontSize: `${largePpsFontSize - 2}px`,
            fill: '#ccc',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        });
        
        // Add to game group
        this.gameGroup.add(this.ppsLabel);
        this.gameGroup.add(this.ppsText);
        this.gameGroup.add(this.rawPpsLabel);
        this.gameGroup.add(this.rawPpsText);


        // Time - centered below border, larger font, bold
        if (!this.timeText) {
            this.timeText = this.add.text(this.borderOffsetX + this.playfieldWidth/2, this.borderOffsetY + this.playfieldHeight + 50, '0:00.00', {
                fontSize: `${timeFontSize}px`,
                fill: '#fff',
                fontFamily: 'Courier New',
                fontStyle: 'bold',
                align: 'center'
            }).setOrigin(0.5, 0);
        } else {
            // Update position and style if text already exists
            this.timeText.setPosition(this.borderOffsetX + this.playfieldWidth/2, this.borderOffsetY + this.playfieldHeight + 50);
            this.timeText.setStyle({ fontSize: `${timeFontSize}px` });
        }

        // Playfield border - adjusted to fit exactly 10x20 with smaller width and height
        this.playfieldBorder = this.add.graphics();
        this.playfieldBorder.lineStyle(3, 0xffffff);
        this.playfieldBorder.strokeRect(this.borderOffsetX - 4, this.borderOffsetY - 3,
            this.cellSize * this.board.cols + 4, this.cellSize * this.visibleRows + 5); // Height reduced by 1px, width expanded 1px left
    }

    create() {
        // Initialize game elements here
        this.gameGroup = this.add.group();
        this.generateNextPieces();
        this.spawnPiece();
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
            r: Phaser.Input.Keyboard.KeyCodes.R
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
            Phaser.Input.Keyboard.KeyCodes.ENTER
        ]);
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Initialize time tracking using Date.now() for reliability
        this.startTime = Date.now();
        this.gameStartTime = this.startTime;
        this.currentTime = 0;
        this.totalPausedTime = 0;
        this.isPaused = false;
        this.pauseStartTime = null;

        // UI - positioned relative to screen size
        this.setupUI();
        
        // Initialize BGM system
        this.initializeBGM();
        
        // Ensure audio context can be resumed on first user interaction
        this.input.on('pointerdown', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });
        
        // Also handle keyboard input
        this.input.keyboard.on('keydown', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });

        // Test audio system
        this.testAudioSystem();
    }
    
    testAudioSystem() {
        // Test a simple sound effect to verify audio works
        setTimeout(() => {
            try {
                const testSound = this.sound.add('ready', { volume: 0.1 });
                if (testSound) {
                    testSound.play();
                    setTimeout(() => testSound.destroy(), 500);
                }
            } catch (error) {
                console.warn('Audio test failed:', error);
            }
        }, 2000);
    }
    
    initializeBGM() {
        // Check if audio files are available
        const audioContext = this.sound.context;
        const stage1Data = this.cache.audio.get('stage1');
        const stage2Data = this.cache.audio.get('stage2');
        
        if (!audioContext || audioContext.state !== 'running') {
            console.warn('Audio context not ready, state:', audioContext ? audioContext.state : 'no context');
            return;
        }
        
        // Try creating seamless loops first, fallback to Phaser audio if that fails
        if (stage1Data) {
            this.stage1BGM = this.createSeamlessLoop('stage1', 56.862, 113.708, 0.5);
            if (!this.stage1BGM) {
                this.stage1BGM = this.sound.add('stage1', { loop: true, volume: 0.5 });
            }
        } else {
            this.stage1BGM = this.sound.add('stage1', { loop: true, volume: 0.5 });
        }
        
        if (stage2Data) {
            this.stage2BGM = this.createSeamlessLoop('stage2', 97.622, 203.217, 0.5);
            if (!this.stage2BGM) {
                this.stage2BGM = this.sound.add('stage2', { loop: true, volume: 0.5 });
            }
        } else {
            this.stage2BGM = this.sound.add('stage2', { loop: true, volume: 0.5 });
        }
        
        // Start with stage 1 BGM after ensuring audio context is running
        if (this.bgmEnabled && this.stage1BGM) {
            this.time.delayedCall(1500, () => {
                try {
                    // Ensure audio context is running
                    if (audioContext.state !== 'running') {
                        audioContext.resume();
                    }
                    
                    // Handle both Phaser audio and Web Audio API sources
                    if (typeof this.stage1BGM.play === 'function') {
                        this.stage1BGM.play();
                    } else if (typeof this.stage1BGM.start === 'function') {
                        this.stage1BGM.start();
                    } else {
                        throw new Error('Unknown audio object type');
                    }
                    
                    this.currentBGM = this.stage1BGM;
                    
                } catch (error) {
                    console.error('Failed to start Stage 1 BGM:', error);
                }
            });
        }
    }
    
    createSeamlessLoop(audioKey, loopStartTime, loopEndTime, volume = 0.5) {
        // Create a seamless audio loop with custom loop points using Web Audio API
        try {
            const audioContext = this.sound.context;
            const audioData = this.cache.audio.get(audioKey);
            
            if (!audioData || !audioContext) {
                console.warn('Audio context or data not available for:', audioKey);
                return null;
            }
            
            const audioBuffer = audioData.data;
            
            if (!audioBuffer) {
                console.error('Audio buffer is undefined for:', audioKey);
                return null;
            }
            
            // Validate loop points
            if (loopStartTime >= audioBuffer.duration || loopEndTime > audioBuffer.duration || loopStartTime >= loopEndTime) {
                console.warn('Invalid loop points for:', audioKey);
                return null;
            }
            
            // Create buffer source for precise control
            const source = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.loop = true;
            
            // Set custom loop points
            source.loopStart = loopStartTime;
            source.loopEnd = loopEndTime;
            
            // Set volume
            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
            
            // Connect audio graph: source -> gain -> destination
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Store reference for later control
            source.gainNode = gainNode;
            source.audioKey = audioKey;
            source.loopStartTime = loopStartTime;
            source.loopEndTime = loopEndTime;
            source.originalVolume = volume;
            source.isPaused = false;
            source.startTime = 0;
            
            // Add pause/resume methods
            source.pause = () => {
                source.isPaused = true;
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            };
            
            source.resume = () => {
                if (source.isPaused) {
                    source.isPaused = false;
                    gainNode.gain.setValueAtTime(source.originalVolume, audioContext.currentTime);
                }
            };
            
            // Add error handling
            source.onended = () => {
                console.log('Audio ended:', audioKey);
            };
            
            source.onerror = (error) => {
                console.error('Audio playback error for', audioKey, ':', error);
            };
            

            return source;
            
        } catch (error) {
            console.error('Error creating seamless loop for', audioKey, ':', error);
            return null;
        }
    }
    
    stopSeamlessLoop(audioSource) {
        if (audioSource) {
            try {
                // Check if it's a Phaser audio object (has play method but not start method)
                if (typeof audioSource.play === 'function' && typeof audioSource.start !== 'function') {
                    // Phaser audio
                    if (audioSource.stop) {
                        audioSource.stop();
                    }
                    if (audioSource.destroy) {
                        audioSource.destroy();
                    }
                } else if (typeof audioSource.start === 'function') {
                    // Web Audio API source
                    audioSource.stop();
                }
            } catch (error) {
                console.warn('Error stopping audio:', error);
            }
        }
    }
    
    setLoopVolume(audioSource, volume) {
        if (audioSource && audioSource.gainNode) {
            const audioContext = this.sound.context;
            audioSource.gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        }
    }
    
    updateTimer() {
        if (this.startTime && !this.isPaused && !this.gameTimerStopped) {
            this.currentTime = (Date.now() - this.startTime) / 1000;
        }
    }
    
    updateBGM() {
        if (!this.bgmEnabled) return;
        
        if (this.level >= 491 && this.level < 500) {
            // Level 491-499: No BGM
            if (this.currentBGM) {
                this.stopSeamlessLoop(this.currentBGM);
                this.currentBGM = null;
            }
        } else if (this.level >= 500) {
            // Level 500+: Stage 2 BGM with custom loop points (97.622s to 203.217s)
            if (this.currentBGM !== this.stage2BGM) {
                if (this.currentBGM) {
                    this.stopSeamlessLoop(this.currentBGM);
                }
                if (this.stage2BGM) {
                    try {
                        // Handle both Phaser audio and Web Audio API sources
                        if (typeof this.stage2BGM.play === 'function') {
                            this.stage2BGM.play();
                        } else if (typeof this.stage2BGM.start === 'function') {
                            this.stage2BGM.start();
                        }
                        this.currentBGM = this.stage2BGM;
                    } catch (error) {
                        console.warn('Failed to start Stage 2 BGM:', error);
                        // Recreate if start fails
                        this.stage2BGM = this.createSeamlessLoop('stage2', 97.622, 203.217, 0.5);
                        if (this.stage2BGM) {
                            try {
                                if (typeof this.stage2BGM.play === 'function') {
                                    this.stage2BGM.play();
                                } else if (typeof this.stage2BGM.start === 'function') {
                                    this.stage2BGM.start();
                                }
                                this.currentBGM = this.stage2BGM;
                            } catch (retryError) {
                                console.warn('Failed to retry Stage 2 BGM:', retryError);
                            }
                        }
                    }
                }
            }
        } else {
            // Level 0-490: Stage 1 BGM with custom loop points (56.862s to 113.708s)
            if (this.currentBGM !== this.stage1BGM) {
                if (this.currentBGM) {
                    this.stopSeamlessLoop(this.currentBGM);
                }
                if (this.stage1BGM) {
                    try {
                        // Handle both Phaser audio and Web Audio API sources
                        if (typeof this.stage1BGM.play === 'function') {
                            this.stage1BGM.play();
                        } else if (typeof this.stage1BGM.start === 'function') {
                            this.stage1BGM.start();
                        }
                        this.currentBGM = this.stage1BGM;
                    } catch (error) {
                        console.warn('Failed to start Stage 1 BGM:', error);
                        // Recreate if start fails
                        this.stage1BGM = this.createSeamlessLoop('stage1', 56.862, 113.708, 0.5);
                        if (this.stage1BGM) {
                            try {
                                if (typeof this.stage1BGM.play === 'function') {
                                    this.stage1BGM.play();
                                } else if (typeof this.stage1BGM.start === 'function') {
                                    this.stage1BGM.start();
                                }
                                this.currentBGM = this.stage1BGM;
                            } catch (retryError) {
                                console.warn('Failed to retry Stage 1 BGM:', retryError);
                            }
                        }
                    }
                }
            }
        }
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
            this.deltaTime = 1/60; // Default to 60fps if first frame
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

        if (this.rotationSystem === 'ARS') {
            // ARS: Process rotation before movement

            // Track rotation keys for immediate response
            this.kKeyPressed = this.kKeyPressed || false;
            this.spaceKeyPressed = this.spaceKeyPressed || false;
            this.lKeyPressed = this.lKeyPressed || false;
            this.xKeyPressed = this.xKeyPressed || false;

            // K key for clockwise rotation - immediate response
            if (kKeyDown && !this.kKeyPressed) {
                this.kKeyPressed = true;
                if (this.currentPiece && this.currentPiece.rotate(this.board, 1, this.rotationSystem)) {
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
                if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.rotationSystem)) {
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
                if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.rotationSystem)) {
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
                    try {
                        // Calculate hard drop rows before dropping
                        const ghost = this.currentPiece.getGhostPosition(this.board);
                        if (ghost) {
                            this.hardDropRows = ghost.y - this.currentPiece.y;
                        } else {
                            this.hardDropRows = 0;
                        }
                        this.currentPiece.hardDrop(this.board);
                        this.lockPiece();
                    } catch (error) {
                        console.warn('Hard drop error:', error);
                        // Fallback: just try to lock the piece
                        if (this.currentPiece) {
                            this.lockPiece();
                        }
                    }
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
                if (this.currentPiece && this.currentPiece.rotate(this.board, 1, this.rotationSystem)) {
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
                if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.rotationSystem)) {
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
                if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.rotationSystem)) {
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
                    try {
                        // Calculate hard drop rows before dropping
                        const ghost = this.currentPiece.getGhostPosition(this.board);
                        if (ghost) {
                            this.hardDropRows = ghost.y - this.currentPiece.y;
                        } else {
                            this.hardDropRows = 0;
                        }
                        this.currentPiece.hardDrop(this.board);
                        this.lockPiece();
                    } catch (error) {
                        console.warn('Hard drop error:', error);
                        // Fallback: just try to lock the piece
                        if (this.currentPiece) {
                            this.lockPiece();
                        }
                    }
                }
            } else if (!xKeyDown && this.xKeyPressed) {
                this.xKeyPressed = false;
            }
        }
        
        // Handle DAS for left key (cursors.left or z key)
        if ((this.leftKeyPressed && (leftDown || zKeyDown))) {
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
        if ((this.rightKeyPressed && (rightDown || cKeyDown))) {
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
        if ((!leftDown && !zKeyDown) && this.leftKeyPressed) {
            this.leftKeyPressed = false;
            this.leftTimer = 0;
            this.leftInRepeat = false;
        }
        if ((!rightDown && !cKeyDown) && this.rightKeyPressed) {
            this.rightKeyPressed = false;
            this.rightTimer = 0;
            this.rightInRepeat = false;
        }

        // ARE input tracking
        if (this.areActive) {
            this.areLeftHeld = leftDown || zKeyDown;
            this.areRightHeld = rightDown || cKeyDown;

            // Track rotation key states during ARE for IRS (Initial Rotation System)
            this.areRotationKeys.k = kKeyDown;
            this.areRotationKeys.space = spaceKeyDown;
            this.areRotationKeys.l = lKeyDown;

            // Determine rotation direction based on held keys
            // Priority: K (clockwise) > Space/L (counter-clockwise)
            if (kKeyDown) {
                this.areRotationDirection = 1;
            } else if (spaceKeyDown || lKeyDown) {
                this.areRotationDirection = -1;
            } else {
                this.areRotationDirection = 0; // Deactivate IRS if no rotation keys held
            }

            // Update IRS state
            this.irsActivated = this.areRotationDirection !== 0;

            // TGM1 has no hold mechanics - commented out for TGM1 mode
            // Uncomment for other modes that support hold
            /*
            if (Phaser.Input.Keyboard.JustDown(this.keys.shift)) {
                this.areHoldPressed = true;
            }
            */
        } else {
            // Reset ARE rotation tracking when not in ARE
            this.areRotationKeys = { k: false, space: false, l: false };
            this.areRotationDirection = 0;
            this.irsActivated = false;
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
            if (this.gameOverTimer >= 10) { // 10 seconds
                this.saveBestScore();
                this.scene.start('MenuScene');
            }
        }

        // Update time tracking using Date.now() for reliability
        this.updateTimer();
        
        // Track active time and ARE time for PPS calculations (exclude paused time)
        if (!this.isPaused) {
            if (!this.areActive) {
                this.activeTime += this.deltaTime;
            } else {
                this.areTime += this.deltaTime;
            }
        }
        
        // Skip ALL game logic if paused or game over
        if (this.isPaused || this.gameOver) {
            // Still update UI for pause screen
            this.draw();
            return;
        }

        if (!this.areActive) {
            // Track key states for DAS using custom keys (z for left, c for right)
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
                    if (this.lockDelay >= 0.5) { // 30 frames = 0.5 seconds
                        this.lockPiece();
                    }
                    // Play ground sound only once when piece first touches ground during soft drop
                    if (!this.wasGroundedDuringSoftDrop && this.currentPiece.isTouchingGround(this.board)) {
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
                    if (this.lockDelay >= 0.5) { // 30 frames = 0.5 seconds
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
            // TGM1 has no hold mechanics - commented out for TGM1 mode
            // Uncomment for other modes that support hold
            /*
            if (Phaser.Input.Keyboard.JustDown(this.keys.shift)) {
                this.hold();
            }
            */
        }
        
        // Pause/unpause with ESC
        if (Phaser.Input.Keyboard.JustDown(this.keys.pause) && !this.gameOver) {
            this.togglePause();
        }

        // Gravity (TGM-style curve)
        if (!this.areActive) { // Only apply gravity when not in ARE
            const internalGravity = this.getTGMGravitySpeed(this.level);
            
            // Mixed gravity system:
            // - For internalGravity >= 256 (1G+): New row-by-row system
            // - For internalGravity < 256 (sub-1G): Original timer-based system
            
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
        if (this.isGrounded && this.currentPiece && !this.areActive && this.lockDelay > 0) {
            this.lockDelay += this.deltaTime;
            if (this.lockDelay >= 0.5) { // 30 frames = 0.5 seconds
                this.lockPiece();
            }
        }
        
        // ARE (Appearance Delay) handling
        if (this.areActive) {
            this.areTimer += this.deltaTime;
            if (this.areTimer >= this.areDelay) {
                if (this.lineClearPhase) {
                    // Line clear ARE completed, now actually clear the lines
                    this.clearStoredLines();
                    
                    // Play fall sound
                    const fallSound = this.sound.add('fall', { volume: 0.7 });
                    fallSound.play();
                    
                    // Start normal ARE phase (0.5 seconds)
                    this.areDelay = 30/60;
                    this.areTimer = 0;
                    this.lineClearPhase = false;
                    this.isClearingLines = false;
                } else {
                    // Normal ARE completed, spawn next piece
                    this.areActive = false;
                    this.spawnPiece();
                }
            }
        }
        


        // Update piece active time for scoring
        if (this.currentPiece && this.pieceSpawnTime > 0) {
            this.pieceActiveTime = Math.floor((this.time.now - this.pieceSpawnTime) / (1000 / 60)); // Convert to frames
        }
        
        // Update grade based on performance
        this.updateGrade();
        
        // Calculate piece per second rates
        this.updatePPS();
        
        // Update section message
        if (this.sectionMessage) {
            this.sectionMessageTimer--;
            if (this.sectionMessageTimer <= 0) {
                this.sectionMessage = null;
            }
        }

        // Update credits system
        if (this.creditsActive) {
            this.creditsTimer += 1/60; // Convert frame time to seconds

            // End credits after duration
            if (this.creditsTimer >= this.creditsDuration) {
                this.creditsActive = false;
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

        // Determine initial rotation based on ARE inputs for IRS
        let initialRotation = 0;
        if (this.areRotationDirection === 1) {
            initialRotation = 1; // Clockwise 90 degrees
        } else if (this.areRotationDirection === -1) {
            initialRotation = 3; // Counter-clockwise 90 degrees (270 degrees)
        }

        this.currentPiece = new Piece(type, this.rotationSystem, initialRotation);
        
        // Play IRS sound if piece is prerotated
        if (initialRotation !== 0) {
            const irsSound = this.sound.add('IRS', { volume: 0.5 });
            irsSound.play();
        }
        
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

        if (!this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            // If prerotated piece can't spawn, try shifting up to give player a chance
            if (initialRotation !== 0) {
                let shifted = false;
                for (let shiftY = -1; shiftY >= -3; shiftY--) {
                    if (this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y + shiftY)) {
                        this.currentPiece.y += shiftY;
                        shifted = true;
                        break;
                    }
                }
                if (!shifted) {
                    // Still can't spawn after shifting - game over
                    // Stop BGM on game over
                    if (this.currentBGM) {
                        this.stopSeamlessLoop(this.currentBGM);
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
                    this.stopSeamlessLoop(this.currentBGM);
                    this.currentBGM = null;
                }

                // Show game over screen
                this.showGameOverScreen();
                return;
            }
        }

        // Check for 20G gravity (level 500+)
        const internalGravity = this.getTGMGravitySpeed(this.level);
        if (internalGravity >= 5120) {
            // For 20G gravity, immediately hard drop the piece to the ground/stack
            // but do NOT lock it - let it be placed on top of the stack
            this.currentPiece.hardDrop(this.board);
            // Set grounded state since piece is now on the ground/stack
            this.isGrounded = true;
            this.lockDelay = this.deltaTime; // Start lock delay countdown
            // Do NOT call lockPiece() - let normal gameplay continue
        } else {
            // Normal spawning behavior for non-20G levels
            this.resetLockDelay();
            this.isGrounded = false;
        }

        // Track piece spawn time for scoring
        this.pieceSpawnTime = this.time.now;
        this.pieceActiveTime = 0;



        // Reset ARE rotation tracking
        this.areRotationDirection = 0;

        // TGM1 has no hold mechanics - commented out for TGM1 mode
        // Uncomment for other modes that support hold
        /*
        if (this.areHoldPressed) {
            this.hold();
            this.areHoldPressed = false;
        }
        */
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
            this.updateLevel('piece');
        }
    }

    generateNextPieces() {
        for (let i = 0; i < 6; i++) {
            this.nextPieces.push(this.generateTGM1Piece());
        }
    }

    validatePieceHistory() {
        // Ensure piece history contains exactly 4 pieces and no null/undefined values
        if (!this.pieceHistory || this.pieceHistory.length !== 4) {
            this.pieceHistory = ['Z', 'Z', 'S', 'S']; // Reset to initial state
        }
        
        // Filter out any null, undefined, or invalid pieces
        const validPieces = Object.keys(TETROMINOES);
        this.pieceHistory = this.pieceHistory.filter(piece => 
            piece && validPieces.includes(piece)
        );
        
        // If history got too small, fill with default pieces
        while (this.pieceHistory.length < 4) {
            this.pieceHistory.push('Z'); // Default fallback
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
            const firstPieceTypes = ['I', 'J', 'L', 'T']; // Exclude S, Z, O
            generatedPiece = firstPieceTypes[Math.floor(Math.random() * firstPieceTypes.length)];
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
        const lockSound = this.sound.add('lock', { volume: 0.6 });
        lockSound.play();
        
        // Start lock flash effect
        this.startLockFlash();
        
        // Track placed minos before placing the piece
        for (let r = 0; r < this.currentPiece.shape.length; r++) {
            for (let c = 0; c < this.currentPiece.shape[r].length; c++) {
                if (this.currentPiece.shape[r][c]) {
                    const boardX = this.currentPiece.x + c;
                    const boardY = this.currentPiece.y + r;
                    this.trackPlacedMino(boardX, boardY, this.currentPiece.color);
                }
            }
        }
        
        this.board.placePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);

        // Track pieces placed for PPS calculation (count when piece locks)
        this.totalPiecesPlaced++;

        // Check for T-spin before clearing lines
        const isTSpin = this.detectTSpin(this.currentPiece, this.board);
        
        // Detect cleared lines for animation (don't clear them yet)
        const linesToClear = [];
        // Check ALL rows in the board (0-21) to find complete lines
        for (let r = 0; r < this.board.rows; r++) {
            if (this.board.grid[r].every(cell => cell !== 0)) {
                linesToClear.push(r);
            }
        }
        
        // Store cleared lines for animation
        this.clearedLines = linesToClear;
        
        // Update score with enhanced system
        this.updateScore(linesToClear.length, this.currentPiece.type, isTSpin);
        this.updateLevel('lines', linesToClear.length);
        this.canHold = true;
        this.currentPiece = null;

        if (linesToClear.length > 0) {
            // Start line clear ARE phase (0.683 seconds) with animation
            this.areDelay = 41/60;
            this.areTimer = 0;
            this.areActive = true;
            this.lineClearPhase = true;
            this.isClearingLines = true;
            
            // Play clear sound
            const clearSound = this.sound.add('clear', { volume: 0.7 });
            clearSound.play();
            
        } else {
            // Start normal ARE (0.5 seconds)
            this.areDelay = 30/60;
            this.areTimer = 0;
            this.areActive = true;
            this.lineClearPhase = false;
            this.isClearingLines = false;
        }
    }

    // TGM1 has no hold mechanics - commented out for TGM1 mode
    // Uncomment for other modes that support hold
    /*
    hold() {
        if (!this.canHold) return;
        if (this.holdPiece) {
            [this.currentPiece, this.holdPiece] = [this.holdPiece, this.currentPiece];
            this.currentPiece.x = 3;
            this.currentPiece.y = 0;
            this.currentPiece.rotation = 0;
            this.currentPiece.shape = TETROMINOES[this.currentPiece.type].shape.map(row => [...row]);
        } else {
            this.holdPiece = this.currentPiece;
            this.spawnPiece();
        }
        this.canHold = false;
        this.resetLockDelay();
    }
    */

    clearStoredLines() {
        // ROBUST FIX: Clear lines without index shifting issues
        // Instead of splice/unshift, build a new grid without the cleared lines
        
        // Phase 1: Clear originally detected lines
        if (this.clearedLines.length > 0) {
            // Create a new grid without the cleared lines
            const newGrid = [];
            const clearedSet = new Set(this.clearedLines);
            
            // Add all non-cleared rows to new grid
            for (let r = 0; r < this.board.rows; r++) {
                if (!clearedSet.has(r)) {
                    newGrid.push(this.board.grid[r]);
                }
            }
            
            // Add empty rows at the top to maintain grid size
            const emptyRowsNeeded = this.clearedLines.length;
            for (let i = 0; i < emptyRowsNeeded; i++) {
                newGrid.unshift(Array(this.board.cols).fill(0));
            }
            
            // Replace the entire grid
            this.board.grid = newGrid;
            this.clearedLines = [];
        }
        
        // Phase 2: CRITICAL FIX - Re-check for any newly completed lines
        const additionalLines = [];
        for (let r = 0; r < this.board.rows; r++) {
            if (this.board.grid[r].every(cell => cell !== 0)) {
                additionalLines.push(r);
            }
        }
        
        // Clear any additional lines that became complete
        if (additionalLines.length > 0) {
            const newGrid = [];
            const clearedSet = new Set(additionalLines);
            
            for (let r = 0; r < this.board.rows; r++) {
                if (!clearedSet.has(r)) {
                    newGrid.push(this.board.grid[r]);
                }
            }
            
            const emptyRowsNeeded = additionalLines.length;
            for (let i = 0; i < emptyRowsNeeded; i++) {
                newGrid.unshift(Array(this.board.cols).fill(0));
            }
            
            this.board.grid = newGrid;
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
        this.conventionalPPS = totalTime > 0 ? this.totalPiecesPlaced / totalTime : 0;
        
        // Calculate raw PPS (excluding ARE time)
        this.rawPPS = this.activeTime > 0 ? this.totalPiecesPlaced / this.activeTime : 0;
    }

    updateGradeBackground() {
        // Define colors for different grade ranges
        let bgColor, alpha;
        
        switch (this.grade) {
            case '9': case '8': case '7': case '6': case '5':
                // Low grades - dark red
                bgColor = 0x661111; alpha = 0.8;
                break;
            case '4': case '3': case '2': case '1':
                // Mid grades - orange
                bgColor = 0x664400; alpha = 0.8;
                break;
            case 'S1': case 'S2': case 'S3':
                // Low S grades - yellow
                bgColor = 0x666600; alpha = 0.8;
                break;
            case 'S4': case 'S5': case 'S6':
                // Mid S grades - light green
                bgColor = 0x116611; alpha = 0.8;
                break;
            case 'S7': case 'S8': case 'S9':
                // High S grades - bright green
                bgColor = 0x00AA00; alpha = 0.8;
                break;
            case 'M':
                // Master grade - blue
                bgColor = 0x0000AA; alpha = 0.8;
                break;
            case 'GM':
                // Grand Master grade - gold
                bgColor = 0xDDAA00; alpha = 0.9;
                break;
            default:
                // Default fallback
                bgColor = 0x444444; alpha = 0.8;
                break;
        }
        
        // Update the background
        this.gradeBackground.clear();
        this.gradeBackground.fillStyle(bgColor, alpha);
        
        const gradeX = this.gradeText.x - 40; // Recalculate position
        const gradeY = this.borderOffsetY;
        const gradeWidth = 80;
        this.gradeBackground.fillRect(gradeX + 2, gradeY + 2, gradeWidth - 4, 76);
    }

    updateScore(lines, pieceType = null, isTSpin = false) {
        // Official TGM1 scoring formula:
        // Score = ceil([level + cleared lines]/4 + soft dropped rows + (2 * hard dropped rows))
        //        * cleared lines * combo * bravo
        //        + ceil(level after clear / 2)  // COMMENTED OUT - used for other modes
        //        + (speed * 7)                 // COMMENTED OUT - used for other modes

        let points = 0;
        let clearType = null;

        // Calculate combo value
        // Combo = Previous combo value + (2 * Cleared lines) - 2, or 1 if no lines cleared
        let combo = 1; // Default for no lines cleared
        if (lines > 0) {
            this.comboCount = (this.comboCount === -1) ? 0 : this.comboCount;
            this.comboCount += (2 * lines) - 2;
            combo = Math.max(1, this.comboCount + 1); // +1 because combo starts at 1
        } else {
            this.comboCount = -1;
        }

        // Calculate bravo bonus (perfect clear)
        let bravo = 1;
        if (lines > 0) {
            const boardIsFull = this.board.grid.every(row => row.every(cell => cell !== 0));
            if (boardIsFull) {
                bravo = 4;
                clearType = 'bravo';
            }
        }

        // Calculate speed bonus (COMMENTED OUT - used for other modes)
        // Speed = Lock delay - Piece active time (minimum 0)
        // const speed = Math.max(0, 30 - this.pieceActiveTime); // Lock delay is 30 frames

        // Calculate level after clear for the bonus (COMMENTED OUT - used for other modes)
        // const levelAfterClear = this.level + lines;

        // Main scoring formula
        if (lines > 0) {
            const baseScore = Math.ceil((this.level + lines) / 4 + this.softDropRows + (2 * this.hardDropRows));
            points = baseScore * lines * combo * bravo;
            // points += Math.ceil(levelAfterClear / 2); // COMMENTED OUT - used for other modes
            // points += (speed * 7);                    // COMMENTED OUT - used for other modes
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
        let newLevel = this.level;

        if (type === 'piece') {
            // TGM1: Level increases by 1 for every piece that enters playfield
            this.piecesPlaced++;

            // Check if CURRENT level is a stop level BEFORE incrementing
            // This allows reaching stop levels but prevents advancing from them
            const currentIsStopLevel = (this.level % 100 === 99) || (this.level === 999);
            if (!currentIsStopLevel) {
                this.level += 1; // Advance only if current level is NOT a stop level
            }
            // If current level IS a stop level, stay at current level (require line clear)
            
        } else if (type === 'lines') {
            // TGM1: Level increases by number of lines cleared (1,2,3,4 for Tetris)
            // Line clears can bypass stop levels
            newLevel += amount; // amount is the number of lines cleared
            this.level = newLevel;
        }

        // Check for section transitions
        const oldSection = Math.floor(oldLevel / 100);
        const newSection = Math.floor(this.level / 100);

        if (newSection > oldSection && this.level < 999) {
            this.handleSectionTransition(newSection);
        }

        // Check for important level milestones
        if ((this.level === 100 || this.level === 200 || this.level === 300 || this.level === 500 || this.level === 999) &&
            this.level !== oldLevel) {
            if (this.level === 999) {
                // Stop timer when reaching level 999
                this.gameTimerStopped = true;
                // Keep the Grand Master message for credits trigger
                this.startCredits(); // Start credits when reaching level 999
            }
        }
        
        // Update BGM based on level
        this.updateBGM();
    }
    
    handleSectionTransition(section) {
        this.sectionTransition = true;

        // Play section change sound
        const sectionChangeSound = this.sound.add('sectionchange', { volume: 0.6 });
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
        else if (level < 300) internalGravity = 256; // 1G
        else if (level < 330) internalGravity = 512; // 2G
        else if (level < 360) internalGravity = 768; // 3G
        else if (level < 400) internalGravity = 1024; // 4G
        else if (level < 420) internalGravity = 1280; // 5G
        else if (level < 450) internalGravity = 1024; // 4G
        else if (level < 500) internalGravity = 768; // 3G
        else internalGravity = 5120; // 20G

        return internalGravity;
    }
    
    detectTSpin(piece, board) {
        // Simple T-spin detection
        // A T-spin occurs when the T piece is rotated and locks with blocks in 3 of the 4 corners
        if (piece.type !== 'T') return false;
        
        const corners = [
            { x: piece.x - 1, y: piece.y - 1 },
            { x: piece.x + 1, y: piece.y - 1 },
            { x: piece.x - 1, y: piece.y + 1 },
            { x: piece.x + 1, y: piece.y + 1 }
        ];
        
        let filledCorners = 0;
        corners.forEach(corner => {
            if (corner.x < 0 || corner.x >= board.cols || corner.y >= board.rows || 
                (corner.y >= 0 && board.grid[corner.y][corner.x])) {
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

        let newGrade = '9'; // Default grade

        // Track GM conditions
        if (level >= 300 && score >= 12000 && time <= 4 * 60 + 15) { // 4:15
            this.gmConditions.level300.achieved = true;
            this.gmConditions.level300.time = time;
            this.gmConditions.level300.score = score;
        }
        if (level >= 500 && score >= 40000 && time <= 7 * 60 + 30) { // 7:30
            this.gmConditions.level500.achieved = true;
            this.gmConditions.level500.time = time;
            this.gmConditions.level500.score = score;
        }
        if (level >= 999 && score >= 126000 && time <= 13 * 60 + 30) { // 13:30
            this.gmConditions.level999.achieved = true;
            this.gmConditions.level999.time = time;
            this.gmConditions.level999.score = score;
        }

        // Grand Master requirements (all three conditions must be achieved)
        if (this.gmConditions.level300.achieved && 
            this.gmConditions.level500.achieved && 
            this.gmConditions.level999.achieved) {
            newGrade = 'GM';
        }
        // Regular grade progression based on score thresholds (from tetris.wiki)
        else if (score >= 120000) newGrade = 'S9';
        else if (score >= 100000) newGrade = 'S8';
        else if (score >= 82000) newGrade = 'S7';
        else if (score >= 66000) newGrade = 'S6';
        else if (score >= 52000) newGrade = 'S5';
        else if (score >= 40000) newGrade = 'S4';
        else if (score >= 30000) newGrade = 'S3';
        else if (score >= 22000) newGrade = 'S2';
        else if (score >= 16000) newGrade = 'S1';
        else if (score >= 12000) newGrade = '1';
        else if (score >= 8000) newGrade = '2';
        else if (score >= 5500) newGrade = '3';
        else if (score >= 3500) newGrade = '4';
        else if (score >= 2000) newGrade = '5';
        else if (score >= 1400) newGrade = '6';
        else if (score >= 800) newGrade = '7';
        else if (score >= 400) newGrade = '8';
        // Keep grade 9 for scores below 400 points

        // Update grade if it improved (only upgrade, don't downgrade)
        if (this.getGradeValue(newGrade) > this.getGradeValue(this.grade)) {
            this.grade = newGrade;
            this.animateGradeUpgrade();
            this.updateGradeBackground(); // Update background color
            this.gradeHistory.push({
                grade: newGrade,
                level: this.level,
                time: this.currentTime,
                score: score
            });
        }
    }

    getGradeValue(grade) {
        const gradeValues = {
            '9': 0, '8': 1, '7': 2, '6': 3, '5': 4, '4': 5, '3': 6, '2': 7, '1': 8,
            'S1': 9, 'S2': 10, 'S3': 11, 'S4': 12, 'S5': 13, 'S6': 14, 'S7': 15, 'S8': 16, 'S9': 17,
            'M': 18, 'GM': 19
        };
        return gradeValues[grade] || 0;
    }

    updateNextGradeText() {
        const gradeThresholds = {
            '9': 400, '8': 800, '7': 1400, '6': 2000, '5': 3500, '4': 5500, '3': 8000, '2': 12000, '1': 16000,
            'S1': 22000, 'S2': 30000, 'S3': 40000, 'S4': 52000, 'S5': 66000, 'S6': 82000, 'S7': 100000, 'S8': 120000,
            'S9': 126000, 'GM': Infinity
        };
        const nextThreshold = gradeThresholds[this.grade];
        if (nextThreshold === Infinity) {
            this.nextGradeText.setText('Next grade at ?????? points');
        } else {
            this.nextGradeText.setText(`Next grade at  ${nextThreshold} points`);
        }
    }

    animateGradeUpgrade() {
        // Play grade up sound
        const gradeUpSound = this.sound.add('gradeup', { volume: 0.6 });
        gradeUpSound.play();
        
        // Create background flash effect only in the grade container area
        const gradeX = this.gradeText.x - 40; // Recalculate grade container position
        const gradeY = this.borderOffsetY;
        const gradeWidth = 80;
        const gradeHeight = 80;
        
        const flashOverlay = this.add.graphics();
        flashOverlay.fillStyle(0xFFFFFF, 0.6);
        flashOverlay.fillRect(gradeX, gradeY, gradeWidth, gradeHeight);
        
        // Add flash overlay to game group for proper rendering order
        this.gameGroup.add(flashOverlay);
        
        // Fade out the flash over 300ms
        this.tweens.add({
            targets: flashOverlay,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                flashOverlay.destroy();
            }
        });
        
        // Simple flash animation for grade text
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

    getHeldKeys() {
        const held = [];
        if (this.leftKeyPressed) held.push('Z');
        if (this.rightKeyPressed) held.push('C');
        if (this.kKeyPressed) held.push('K');
        if (this.spaceKeyPressed) held.push('Space');
        if (this.lKeyPressed) held.push('L');
        if (this.xKeyPressed) held.push('X');
        if (this.keys.s.isDown) held.push('S');
        return held;
    }

    restartGame() {
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
        this.grade = '9';
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
        
        // Reset PPS display objects
        this.ppsLabel = null;
        this.ppsText = null;
        this.rawPpsLabel = null;
        this.rawPpsText = null;

        // Reset timer stop flag
        this.gameTimerStopped = false;

        // Reset TGM1 randomizer
        this.pieceHistory = ['Z', 'Z', 'S', 'S']; // Reset to initial state
        this.pieceHistoryIndex = 0;
        this.firstPiece = true;
        this.isFirstSpawn = true;
        
        // Reset key states
        this.kKeyPressed = false;
        this.spaceKeyPressed = false;
        this.lKeyPressed = false;
        this.xKeyPressed = false;
        
        // Reset mino fading system
        this.placedMinos = [];
        this.placedMinoRows = [];
        this.minoFadeActive = false;
        this.showGameOverText = false;
        
        // Validate piece history to ensure it's correct after reset
        this.validatePieceHistory();

        // Reset time tracking using Date.now()
        this.startTime = Date.now();
        this.gameStartTime = this.startTime;
        this.currentTime = 0;
        this.pauseStartTime = null;
        this.totalPausedTime = 0;


        // Clear game elements
        this.gameGroup.clear(true, true);
        
        // Stop current BGM
        if (this.currentBGM) {
            this.stopSeamlessLoop(this.currentBGM);
            this.currentBGM = null;
        }

        // Stop credits BGM
        if (this.creditsBGM) {
            this.creditsBGM.stop();
            this.creditsBGM = null;
        }

        // Reset UI
        this.scoreText.setText('0');
        if (this.levelNumber) {
            this.levelNumber.setText('0');
        }
        if (this.currentLevelText) {
            this.currentLevelText.setText('0');
        }
        this.gradeText.setText('9');
        this.timeText.setText('0:00.00');
        this.ppsText.setText('0.00');
        this.rawPpsText.setText('0.00');

        // Restart game
        this.generateNextPieces();
        this.spawnPiece();
        
        // Restart BGM with custom seamless loops
        if (this.bgmEnabled) {
            // Stop current BGM
            if (this.currentBGM) {
                this.stopSeamlessLoop(this.currentBGM);
                this.currentBGM = null;
            }
            
            // Clean up old BGM references
            if (this.stage1BGM) {
                this.stopSeamlessLoop(this.stage1BGM);
            }
            if (this.stage2BGM) {
                this.stopSeamlessLoop(this.stage2BGM);
            }
            
            this.stage1BGM = null;
            this.stage2BGM = null;
            
            // Create fresh seamless loops with custom loop points
            this.stage1BGM = this.createSeamlessLoop('stage1', 56.862, 113.708, 0.5);
            this.stage2BGM = this.createSeamlessLoop('stage2', 97.622, 203.217, 0.5);
            
            // Start fresh stage1 BGM
            if (this.stage1BGM) {
                try {
                    // Handle both Phaser audio and Web Audio API sources
                    if (typeof this.stage1BGM.play === 'function') {
                        this.stage1BGM.play();
                    } else if (typeof this.stage1BGM.start === 'function') {
                        this.stage1BGM.start();
                    }
                    this.currentBGM = this.stage1BGM;
                } catch (error) {
                    console.warn('Failed to restart BGM:', error);
                }
            }
        }
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
                if (this.currentBGM.pause) {
                    this.currentBGM.pause();
                } else {
                    // Fallback for seamless loops
                    this.setLoopVolume(this.currentBGM, 0);
                }
            } else {
                if (this.currentBGM.resume) {
                    this.currentBGM.resume();
                } else {
                    // Fallback for seamless loops
                    this.setLoopVolume(this.currentBGM, this.currentBGM.originalVolume || 0.5);
                }
            }
        }
        
        // Pause/resume credits BGM
        if (this.creditsBGM) {
            if (this.isPaused) {
                this.creditsBGM.pause();
            } else {
                this.creditsBGM.resume();
            }
        }
    }
    
    
    startCredits() {
        this.creditsActive = true;
        this.creditsTimer = 0;
        
        // Play completion sound if GM grade achieved
        if (this.grade === 'GM') {
            const completeSound = this.sound.add('complete', { volume: 0.8 });
            completeSound.play();
        }
        
        // Load credits BGM if available
        this.creditsBGM = this.sound.add('credits', { loop: true, volume: 0.3 });
        if (this.creditsBGM && this.bgmEnabled) {
            this.creditsBGM.play();
        }
        
        // Stop current BGM
        if (this.currentBGM) {
            this.stopSeamlessLoop(this.currentBGM);
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
            this.stopSeamlessLoop(this.currentBGM);
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
        const flashColor = this.currentPiece ? this.currentPiece.color : 0xFFFFFF;
        
        // Create a temporary flash overlay
        const flashOverlay = this.add.graphics();
        flashOverlay.fillStyle(0xFFFFFF, 0.8);
        flashOverlay.fillRect(this.borderOffsetX - 4, this.borderOffsetY - 3,
            this.cellSize * this.board.cols + 4, this.cellSize * this.visibleRows + 5);
        
        // Add flash overlay to game group
        this.gameGroup.add(flashOverlay);
        
        // Fade out the flash over 15 frames (0.25 seconds)
        this.tweens.add({
            targets: flashOverlay,
            alpha: 0,
            duration: 250, // 0.25 seconds
            onComplete: () => {
                flashOverlay.destroy();
            }
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
            time: `${Math.floor(this.currentTime / 60)}:${Math.floor(this.currentTime % 60).toString().padStart(2, '0')}.${Math.floor((this.currentTime % 1) * 100).toString().padStart(2, '0')}`
        };

        // Update if better score, or same score but higher level, or same level but better grade
        if (newScore.score > currentBest.score ||
            (newScore.score === currentBest.score && newScore.level > currentBest.level) ||
            (newScore.score === currentBest.score && newScore.level === currentBest.level && this.getGradeValue(newScore.grade) > this.getGradeValue(currentBest.grade))) {
            localStorage.setItem(key, JSON.stringify(newScore));
        }
    }

    getBestScore(mode) {
        const key = `bestScore_${mode}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return { score: 0, level: 0, grade: '9', time: '0:00.00' };
    }

    showGameOverScreen() {
        this.gameOver = true;
        this.gameTimerStopped = true; // Stop timer on game over (top out)
        this.gameOverTimer = 0; // Start timer for 10 seconds

        // Start mino fading immediately
        this.startMinoFading();
    }
    
    drawCreditsScreen() {
        // Create scrolling credits text behind the tetrominos
        const creditsText = [
            'CREDITS',
            '',
            'Game Developer',
            'Tetris Grand Master Implementation',
            '',
            'Special Thanks',
            'To all Tetris players who strive for perfection',
            'The Tetris Company for creating this amazing game',
            '',
            'Music & Sound',
            'Original TGM Soundtrack',
            '',
            'Inspired by',
            'Tetris: The Grand Master Series',
            '',
            'Technical Implementation',
            'Phaser 3 Game Framework',
            'SRS (Super Rotation System)',
            'TGM1 Mechanics',
            '',
            'Level System',
            'Internal Gravity Curves',
            'TGM-Style Grading',
            '',
            'Piece Randomizer',
            'TGM1 4-Piece History System',
            '',
            'Achievement System',
            'Grand Master Grade Requirements',
            '',
            'Thank you for playing!',
            'Continue striving for perfection!'
        ];

        const scrollY = (this.creditsTimer * this.creditsScrollSpeed * 60) % (creditsText.length * 40);
        const centerX = this.windowWidth / 2;

        for (let i = 0; i < creditsText.length; i++) {
            const y = this.windowHeight - scrollY + (i * 40);
            if (y > -50 && y < this.windowHeight + 50) {
                const fontSize = creditsText[i] === 'CREDITS' ? 48 : 24;
                const fillColor = creditsText[i] === 'CREDITS' ? '#ffff00' : '#ffffff';
                const text = this.add.text(centerX, y, creditsText[i], {
                    fontSize: `${fontSize}px`,
                    fill: fillColor,
                    stroke: '#000000',
                    strokeThickness: 2,
                    fontFamily: 'Courier New',
                    fontStyle: fontSize === 48 ? 'bold' : 'normal'
                }).setOrigin(0.5);
                this.gameGroup.add(text);
            }
        }
    }
    
    
    drawLevelBar() {
        const uiX = Math.max(20, this.borderOffsetX - 200) + 50;
        const levelBottomY = this.borderOffsetY + this.playfieldHeight - 60;
        const levelRowHeight = 20; // Decreased spacing
        const rightX = uiX + 120;
        const levelFontSize = Math.max(24, Math.min(36, Math.floor(this.cellSize * 1.0))); // Increased font

        // Calculate section cap
        const section = Math.floor(this.level / 100);
        const sectionCap = section >= 9 ? 999 : (section + 1) * 100;

        // Current level - top row
        const currentY = levelBottomY - 3 * levelRowHeight;
        const currentLevelText = this.level.toString();
        if (!this.currentLevelText) {
            this.currentLevelText = this.add.text(rightX + 17, currentY - 30, currentLevelText, { 
                fontSize: `${levelFontSize}px`, 
                fill: '#fff', 
                fontFamily: 'Courier New',
                fontStyle: 'bold',
                align: 'right'
            }).setOrigin(1, 0);
            this.gameGroup.add(this.currentLevelText);
        } else {
            this.currentLevelText.setText(currentLevelText);
        }
        
        // Also update levelNumber for backwards compatibility
        if (!this.levelNumber) {
            this.levelNumber = this.currentLevelText;
        }

        // Bar - middle row, white background with red fill
        const barY = levelBottomY - 2 * levelRowHeight;
        const barWidth = 60;
        const barHeight = 4;
        const barX = rightX - barWidth;
        const internalGravity = this.getTGMGravitySpeed(this.level);
        const gravityRatio = Math.min(internalGravity / 2560, 1); // 0 to 1, 5120 is 20G

        // Create or recreate level bar graphics
        if (this.levelBar) {
            this.levelBar.destroy();
        }
        this.levelBar = this.add.graphics();
        
        // White background
        this.levelBar.fillStyle(0xffffff);
        this.levelBar.fillRect(barX + 14, barY - 15, barWidth, barHeight);
        // Red fill from left
        this.levelBar.fillStyle(0xff0000);
        this.levelBar.fillRect(barX + 14, barY - 15, barWidth * gravityRatio, barHeight);
        
        // Add to game group
        this.gameGroup.add(this.levelBar);

        // Cap level - bottom row
        const capY = levelBottomY - levelRowHeight;
        const capText = sectionCap.toString();
        if (!this.capLevelText) {
            this.capLevelText = this.add.text(rightX + 17, capY - 25, capText, { 
                fontSize: `${levelFontSize}px`, 
                fill: '#fff', 
                fontFamily: 'Courier New',
                fontStyle: 'bold',
                align: 'right'
            }).setOrigin(1, 0);
            this.gameGroup.add(this.capLevelText);
        } else {
            this.capLevelText.setText(capText);
        }
    }

    draw() {
        // Clear previous game elements
        this.gameGroup.clear(true, true);
        
        // Recreate border
        this.playfieldBorder = this.add.graphics();
        this.playfieldBorder.lineStyle(3, 0xffffff);
        this.playfieldBorder.strokeRect(this.borderOffsetX - 4, this.borderOffsetY - 3,
            this.cellSize * this.board.cols + 4, this.cellSize * this.visibleRows + 5);
        
        // Recreate grade background and display
        this.gradeBackground = this.add.graphics();
        this.gradeDisplay = this.add.graphics();
        
        // Add to game group immediately after creation
        this.gameGroup.add(this.playfieldBorder);
        this.gameGroup.add(this.gradeBackground);
        this.gameGroup.add(this.gradeDisplay);
        
        // Recreate UI elements that need to be redrawn
        const gradeX = Math.max(20, this.borderOffsetX - 200) + 50 + 25;
        const gradeY = this.borderOffsetY;
        const gradeWidth = 80;
        
        this.gradeDisplay.lineStyle(2, 0xffffff);
        this.gradeDisplay.strokeRect(gradeX, gradeY, gradeWidth, 80);
        
        // Set grade background based on current grade
        let bgColor, alpha;
        switch (this.grade) {
            case '9': case '8': case '7': case '6': case '5':
                bgColor = 0x661111; alpha = 0.8; break;
            case '4': case '3': case '2': case '1':
                bgColor = 0x664400; alpha = 0.8; break;
            case 'S1': case 'S2': case 'S3':
                bgColor = 0x666600; alpha = 0.8; break;
            case 'S4': case 'S5': case 'S6':
                bgColor = 0x116611; alpha = 0.8; break;
            case 'S7': case 'S8': case 'S9':
                bgColor = 0x00AA00; alpha = 0.8; break;
            case 'M':
                bgColor = 0x0000AA; alpha = 0.8; break;
            case 'GM':
                bgColor = 0xDDAA00; alpha = 0.9; break;
            default:
                bgColor = 0x444444; alpha = 0.8; break;
        }
        
        this.gradeBackground.fillStyle(bgColor, alpha);
        this.gradeBackground.fillRect(gradeX + 2, gradeY + 2, gradeWidth - 4, 76);



        // Draw game elements using matrix offset
        this.board.draw(this, this.matrixOffsetX, this.matrixOffsetY, this.cellSize);
        
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
                        const textureKey = this.rotationSystem === 'ARS' ? 'mino_ars' : 'mino_srs';
                        const sprite = this.add.sprite(
                            this.matrixOffsetX + col * this.cellSize, 
                            this.matrixOffsetY + (lineRow - 2) * this.cellSize, 
                            textureKey
                        );
                        sprite.setDisplaySize(this.cellSize, this.cellSize);
                        sprite.setTint(0xFFFFFF); // White for cleared lines
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
                ghost.draw(this, this.matrixOffsetX, this.matrixOffsetY, this.cellSize, true);
            }

            // Calculate alpha for lock delay fade effect
            let pieceAlpha = 1;
            if (this.isGrounded && this.lockDelay > 0) {
                pieceAlpha = 1 - (this.lockDelay / 0.5) * 0.5; // Fade from 1 to 0.5 over 0.5 seconds
            }

            this.currentPiece.draw(this, this.matrixOffsetX, this.matrixOffsetY, this.cellSize, false, pieceAlpha);
        }

        // Update UI
        this.scoreText.setText(this.score.toString());
        this.gradeText.setText(this.grade);

        // Update next grade requirement
        this.updateNextGradeText();

        // Update piece per second displays
        if (this.ppsText) {
            this.ppsText.setText(this.conventionalPPS.toFixed(2));
        }
        if (this.rawPpsText) {
            this.rawPpsText.setText(this.rawPPS.toFixed(2));
        }
        
        // Update grade background color
        this.updateGradeBackground();

        // Draw level bar
        this.drawLevelBar();

        // Format and display time
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = Math.floor(this.currentTime % 60);
        const centiseconds = Math.floor((this.currentTime % 1) * 100);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        

        
        // Create or update time text
        if (!this.timeText) {
            this.timeText = this.add.text(this.borderOffsetX + this.playfieldWidth/2, this.borderOffsetY + this.playfieldHeight + 50, timeString, {
                fontSize: `${Math.max(24, Math.min(40, Math.floor(this.cellSize * 1.5)))}px`,
                fill: '#fff',
                fontFamily: 'Courier New',
                fontStyle: 'bold',
                align: 'center'
            }).setOrigin(0.5, 0);
            this.gameGroup.add(this.timeText);
        } else {
            this.timeText.setText(timeString);
        }


        // Draw NEXT label and PPS displays - positioned to the right of border
        const nextX = this.borderOffsetX + (this.cellSize * this.board.cols) + 50;
        const nextY = this.borderOffsetY;
        const nextFontSize = Math.max(16, Math.min(24, Math.floor(this.cellSize * 0.8)));
        
        const nextLabel = this.add.text(nextX, nextY, 'NEXT', {
            fontSize: `${nextFontSize}px`,
            fill: '#fff',
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        });
        this.gameGroup.add(nextLabel);

        // PPS displays are already created in setupUI(), no need to recreate them here

        // TGM1: Only show 1 next piece
        if (this.nextPieces.length > 0) {
            const nextPiece = new Piece(this.nextPieces[0], this.rotationSystem);
            // Use matrix-relative positioning like the main game pieces
            nextPiece.x = 0;
            nextPiece.y = 2; // Start from the top visible row
            // Position the next piece area to the right of the playfield
            const nextAreaOffsetX = this.borderOffsetX + (this.cellSize * this.board.cols) + 50;
            const nextAreaOffsetY = this.borderOffsetY + 40;
            nextPiece.draw(this, nextAreaOffsetX, nextAreaOffsetY, this.cellSize);
        }

        // TGM1 has no hold mechanics - commented out for TGM1 mode
        // Uncomment for other modes that support hold
        /*
        // Draw HOLD label
        const holdLabel = this.add.text(this.boardOffsetX - 80, this.boardOffsetY - 30, 'HOLD', {
            fontSize: '20px',
            fill: '#fff'
        });
        this.gameGroup.add(holdLabel);

        // Draw hold
        if (this.holdPiece) {
            this.holdPiece.x = 0;
            this.holdPiece.y = 0;
            this.holdPiece.draw(this, this.boardOffsetX - 80, this.boardOffsetY, this.cellSize);
        }
        */

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

        // Playfield border already added to game group above

        // Draw pause overlay - centered on screen
        if (this.isPaused) {
            const overlay = this.add.rectangle(this.windowWidth / 2, this.windowHeight / 2, this.windowWidth, this.windowHeight, 0x000000, 0.8);
            const pauseFontSize = Math.max(48, Math.min(72, Math.floor(this.cellSize * 2.4)));
            const pauseText = this.add.text(this.windowWidth / 2, this.windowHeight / 2 - 50, 'PAUSED', {
                fontSize: `${pauseFontSize}px`,
                fill: '#ffff00',
                stroke: '#000',
                strokeThickness: 2,
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            const resumeFontSize = Math.max(16, Math.min(28, Math.floor(this.cellSize * 0.9)));
            const resumeText = this.add.text(this.windowWidth / 2, this.windowHeight / 2 + 50, 'Press ESC to resume', {
                fontSize: `${resumeFontSize}px`,
                fill: '#fff',
                fontFamily: 'Courier New',
                fontStyle: 'normal'
            }).setOrigin(0.5);
            this.gameGroup.add(overlay);
            this.gameGroup.add(pauseText);
            this.gameGroup.add(resumeText);
        }

        // Draw game over text - centered on screen (only after 3 seconds)
        if (this.showGameOverText) {
            const gameOverFontSize = Math.max(48, Math.min(72, Math.floor(this.cellSize * 2.4)));

            const centerY = this.windowHeight / 2;
            const centerX = this.windowWidth / 2;

            const gameOverText = this.add.text(centerX, centerY, 'GAME OVER', {
                fontSize: `${gameOverFontSize}px`,
                fill: '#ff0000',
                stroke: '#000',
                strokeThickness: 2,
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            this.gameGroup.add(gameOverText);
        }

        // Draw credits screen (behind the game)
        if (this.creditsActive) {
            this.drawCreditsScreen();
        }

    }
}

// Initialize game after all classes are defined
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [MenuScene, SettingsScene, AssetLoaderScene, LoadingScreenScene, GameScene],
    backgroundColor: '#000000',
    fps: 60,
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false,
        powerPreference: 'high-performance',
        desynchronized: false,
        clearBeforeRender: true
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

// Limit frame rate to 60fps
game.loop.maxFps = 60;

// Handle window resize
window.addEventListener('resize', () => {
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