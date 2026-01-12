/**
 * Konoha All Clear Pattern Database
 * Pre-computed efficient All Clear setups for 5x4 board
 */

const KonohaPatterns = {
    // 2x4 + 3x4 Build patterns
    "2x4_3x4_build": [
        {
            name: "I-O Setup",
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["I", "O"],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ]
        }
    ],
    
    // 3x4 + 2x4 Build patterns
    "3x4_2x4_build": [
        {
            name: "L-J-O Setup",
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            pieces: ["L", "J", "O"],
            solution: { piece: "L", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 2, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ]
        },
        {
            name: "O-J-L Setup",
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            pieces: ["O", "J", "L"],
            solution: { piece: "J", x: 2, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 3, rotation: 0 },
                { piece: "L", x: 0, y: 0, rotation: 0 }
            ]
        }
    ],
    
    // T-Spin patterns (TLJ/OLJ)
    "tspin_patterns": [
        {
            name: "T-L-J Setup",
            board: [
                [1,1,0,0,0],
                [1,1,1,0,0],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            pieces: ["T", "L", "J"],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 },
                { piece: "J", x: 3, y: 0, rotation: 0 }
            ]
        },
        {
            name: "T-O-L Setup",
            board: [
                [0,0,1,1,1],
                [0,1,1,1,0],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            pieces: ["T", "O", "L"],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 2, y: 0, rotation: 0 },
                { piece: "O", x: 2, y: 2, rotation: 0 }
            ]
        }
    ],
    
    // PCO patterns
    "pco_patterns": [
        {
            name: "PCO Build IOT",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,0,0,0],
                [1,1,1,1,0]
            ],
            pieces: ["I", "O", "T"],
            solution: { piece: "I", x: 1, y: 1, rotation: 1 },
            alternatives: [
                { piece: "O", x: 0, y: 0, rotation: 0 },
                { piece: "T", x: 3, y: 0, rotation: 3 }
            ]
        },
        {
            name: "PCO Build JJT",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,0,0],
                [1,1,1,1,0]
            ],
            pieces: ["J", "J", "T"],
            solution: { piece: "J", x: 0, y: 1, rotation: 0 },
            alternatives: [
                { piece: "T", x: 2, y: 1, rotation: 1 }
            ]
        }
    ],
    
    "2x4_box_patterns": [
        {
            name: "2x4 Box Build II",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,1,1,0],
                [1,1,1,1,0]
            ],
            pieces: ["I", "I"],
            solution: { piece: "I", x: 0, y: 2, rotation: 0 },
            alternatives: []
        },
        {
            name: "2x4 Box Build JJ",
            board: [
                [0,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,0,0],
                [1,1,1,0,0]
            ],
            pieces: ["J", "J"],
            solution: { piece: "J", x: 0, y: 1, rotation: 0 },
            alternatives: []
        }
    ],

    "3x4_box_patterns": [
        {
            name: "3x4 Box Build LJO",
            board: [
                [0,0,0,0,0],
                [1,1,1,0,0],
                [1,1,1,0,0],
                [1,1,1,0,0]
            ],
            pieces: ["L", "J", "O"],
            solution: { piece: "L", x: 0, y: 1, rotation: 0 },
            alternatives: [
                { piece: "J", x: 1, y: 1, rotation: 0 },
                { piece: "O", x: 0, y: 2, rotation: 0 }
            ]
        }
    ],

    "full_bag_patterns": [
        {
            name: "Full Bag Early IO",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,1,1,0],
                [1,1,1,1,0]
            ],
            pieces: ["I", "O"],
            solution: { piece: "I", x: 0, y: 2, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 0, rotation: 0 }
            ]
        }
    ],

    "misc_patterns": [
        {
            name: "Misc TL Build",
            board: [
                [0,0,0,0,0],
                [0,1,1,0,0],
                [1,1,0,0,0],
                [1,1,0,0,0]
            ],
            pieces: ["T", "L"],
            solution: { piece: "T", x: 1, y: 1, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 }
            ]
        }
    ],

    "recover_patterns": [
        {
            name: "Recover Pattern 1",
            board: [
                [0,0,0,0,0],
                [0,0,1,0,0],
                [1,1,1,1,0],
                [1,1,1,1,0]
            ],
            pieces: ["I", "L", "J"],
            solution: { piece: "I", x: 0, y: 0, rotation: 1 },
            alternatives: []
        },
        {
            name: "Recover Pattern 2",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,1,1,1,1]
            ],
            pieces: ["T", "O"],
            solution: { piece: "T", x: 1, y: 1, rotation: 0 },
            alternatives: []
        }
    ],

    "tt_patterns": [
        {
            name: "TT Build",
            board: [
                [0,0,0,0,0],
                [0,1,1,0,0],
                [0,1,1,0,0],
                [1,1,1,1,0]
            ],
            pieces: ["T", "T"],
            solution: { piece: "T", x: 1, y: 1, rotation: 0 },
            alternatives: []
        }
    ],

    // Helper function to find matching pattern
    findPattern(board, availablePieces) {
        const allPatterns = [
            ...this["2x4_3x4_build"],
            ...this["3x4_2x4_build"],
            ...this["tspin_patterns"],
            ...this["pco_patterns"],
            ...this["2x4_box_patterns"],
            ...this["3x4_box_patterns"],
            ...this["full_bag_patterns"],
            ...this["misc_patterns"],
            ...this["recover_patterns"],
            ...this["tt_patterns"]
        ];
        
        for (const pattern of allPatterns) {
            // Check if board state matches pattern
            let boardMatches = true;
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 5; c++) {
                    if (pattern.board[r][c] !== board[r][c]) {
                        boardMatches = false;
                        break;
                    }
                }
                if (!boardMatches) break;
            }
            
            // Check if we have required pieces
            if (boardMatches) {
                const hasAllPieces = pattern.pieces.every(piece => 
                    availablePieces.includes(piece)
                );
                if (hasAllPieces) {
                    return pattern;
                }
            }
        }
        
        return null;
    },
    
    // Helper function to find best move for current piece
    findBestMoveForPiece(pattern, currentPiece) {
        // If current piece matches the main solution
        if (pattern.solution.piece === currentPiece) {
            return pattern.solution;
        }
        
        // Check alternatives for current piece
        if (pattern.alternatives) {
            for (const alt of pattern.alternatives) {
                if (alt.piece === currentPiece) {
                    return alt;
                }
            }
        }
        
        // Return main solution as fallback
        return pattern.solution;
    }
};

// Export for browser and Node.js usage
if (typeof window !== 'undefined') {
    window.KonohaPatterns = KonohaPatterns;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = KonohaPatterns;
}
