/**
 * Konoha All Clear Pattern Database
 * Correctly interpreted from KonohaEasyBravoDatabase.md
 * Each pattern represents a specific board state and piece sequence for All Clear
 */

const KonohaPatterns = {
    
    // Full 5-bag patterns - these represent complete sequences that clear the board
    "full_bag_patterns": [
        {
            name: "Early J",
            // Board state after some pieces placed (represents the setup before final clear)
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["I", "O", "O", "L", "L"],
            // This represents the sequence: I-O-O-L-L to achieve all clear
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 0, rotation: 0 },
                { piece: "L", x: 3, y: 0, rotation: 0 }
            ]
        },
        {
            name: "Early TO", 
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["T", "O", "J", "T", "L"],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 0, rotation: 0 },
                { piece: "J", x: 0, y: 0, rotation: 0 },
                { piece: "L", x: 3, y: 0, rotation: 0 }
            ]
        },
        {
            name: "Early IO",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["I", "O", "J", "T", "T"],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 0, rotation: 0 },
                { piece: "J", x: 0, y: 0, rotation: 0 },
                { piece: "T", x: 1, y: 0, rotation: 0 }
            ]
        },
        {
            name: "ILJ",
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["I", "L", "J"],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 3, y: 0, rotation: 0 },
                { piece: "J", x: 0, y: 0, rotation: 0 }
            ]
        }
    ],

    // 3x4 Box patterns - actual setup states from database
    "3x4_box_patterns": [
        {
            name: "3x4 Box LJO Setup",
            // This represents the LJO setup from the database
            board: [
                [1,1,1,0,0],  // LLL
                [1,0,0,0,0],  // LOO  
                [0,0,0,0,0],  // JOO
                [0,0,0,0,0]   // JJJ
            ],
            pieces: ["L", "J", "O"],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 0, y: 2, rotation: 0 },
                { piece: "O", x: 1, y: 1, rotation: 0 }
            ]
        }
    ],

    // 2x4 Box patterns - actual setup states from database  
    "2x4_box_patterns": [
        {
            name: "2x4 Box II Setup",
            // II setup from database
            board: [
                [1,1,1,1,0],  // II
                [1,1,1,1,0],  // II
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["I", "I"],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: []
        },
        {
            name: "2x4 Box OO Setup", 
            // OO setup from database
            board: [
                [0,1,1,0,0],  // OO
                [0,1,1,0,0],  // OO
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            pieces: ["O", "O"],
            solution: { piece: "O", x: 1, y: 0, rotation: 0 },
            alternatives: []
        }
    ],

    // Double T patterns
    "tt_patterns": [
        {
            name: "Double T Setup",
            // Double T build from database
            board: [
                [0,1,1,0,0],  // X....
                [0,1,1,0,0],  // XX...
                [0,0,1,0,0],  // XT...
                [1,1,1,1,0]   // TTT..
            ],
            pieces: ["T", "T"],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: []
        }
    ],

    // IOT/JJT patterns
    "iot_patterns": [
        {
            name: "IOT Build",
            // IOT build from database
            board: [
                [0,0,0,1,0],  // ....I
                [0,1,1,0,0],  // T...I
                [1,1,0,0,0],  // TTOOI
                [1,0,0,0,0]   // T.OOI
            ],
            pieces: ["I", "O", "T"],
            solution: { piece: "I", x: 3, y: 0, rotation: 1 },
            alternatives: [
                { piece: "O", x: 1, y: 1, rotation: 0 },
                { piece: "T", x: 0, y: 1, rotation: 3 }
            ]
        },
        {
            name: "JJT Build",
            // JJT build from database  
            board: [
                [0,0,0,0,0],  // ....X
                [0,1,1,0,0],  // T...X
                [1,1,0,0,0],  // TTJXX
                [1,0,0,0,0]   // T.JJJ
            ],
            pieces: ["J", "J", "T"],
            solution: { piece: "J", x: 0, y: 1, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 1, rotation: 1 }
            ]
        }
    ],

    // TL patterns
    "tl_patterns": [
        {
            name: "TL Build",
            // TL build from database
            board: [
                [0,0,0,0,0],  // .....
                [0,0,0,1,0],  // ....T
                [1,1,1,0,0],  // LLLTT
                [1,0,0,1,0]   // L...T
            ],
            pieces: ["T", "L"],
            solution: { piece: "T", x: 3, y: 1, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 }
            ]
        }
    ],

    // Helper function to mirror a board horizontally
    mirrorBoard(board) {
        return board.map(row => [...row].reverse());
    },
    
    // Helper function to mirror piece types (J↔L)
    mirrorPiece(piece) {
        switch(piece) {
            case 'J': return 'L';
            case 'L': return 'J';
            default: return piece; // I, O, T, S, Z remain the same
        }
    },
    
    // Helper function to mirror a pattern solution
    mirrorSolution(solution, boardWidth = 5) {
        if (!solution) return null;
        return {
            piece: this.mirrorPiece(solution.piece),
            x: boardWidth - 1 - solution.x - (this.getPieceWidth(solution.piece) - 1),
            y: solution.y,
            rotation: this.mirrorRotation(solution.piece, solution.rotation),
            usedHold: solution.usedHold || false
        };
    },
    
    // Helper function to get piece width for mirroring calculations
    getPieceWidth(piece) {
        switch(piece) {
            case 'O': return 2;
            case 'I': return 4;
            default: return 3; // J, L, T, S, Z
        }
    },
    
    // Helper function to mirror rotation
    mirrorRotation(piece, rotation) {
        // For simplicity, keep same rotation but piece will be mirrored
        return rotation;
    },
    
    // Helper function to mirror all pieces in an array
    mirrorPieces(pieces) {
        return pieces.map(piece => this.mirrorPiece(piece));
    },
    
    // Helper function to mirror a complete pattern
    mirrorPattern(pattern) {
        if (!pattern) return null;
        return {
            name: pattern.name + " (Mirrored)",
            board: this.mirrorBoard(pattern.board),
            pieces: this.mirrorPieces(pattern.pieces),
            solution: this.mirrorSolution(pattern.solution),
            alternatives: pattern.alternatives ? pattern.alternatives.map(alt => this.mirrorSolution(alt)) : []
        };
    },

    findPattern(board, availablePieces) {
        console.log('[KONOHAPATTERNS] Looking for patterns with pieces:', availablePieces);
        
        // For Konoha Easy mode, we need to match specific board states
        // Try different extraction strategies for different pattern types
        const bottomRows = board.length >= 4 ? board.slice(-4) : board;
        const middleRows = board.length >= 6 ? board.slice(-6, -2) : board;
        const topRows = board.length >= 8 ? board.slice(-8) : board;
        
        const allPatterns = [
            ...this["full_bag_patterns"],
            ...this["2x4_box_patterns"],
            ...this["3x4_box_patterns"],
            ...this["tt_patterns"],
            ...this["iot_patterns"],
            ...this["tl_patterns"]
        ];
        
        console.log('[KONOHAPATTERNS] Pattern matching - board rows:', board.length, 'extracting bottom 4, middle 4, top 4');
        
        // Try matching with different row ranges
        const rowRanges = [
            { rows: bottomRows, name: 'bottom4' },
            { rows: middleRows, name: 'middle4' },
            { rows: topRows, name: 'top4' }
        ];
        
        for (const range of rowRanges) {
            console.log('[KONOHAPATTERNS] Trying range:', range.name, 'board:', range.rows.map(r => r.join('')).join('|'));
            
            for (const pattern of allPatterns) {
                // Check if board state matches pattern
                let boardMatches = true;
                for (let r = 0; r < Math.min(range.rows.length, pattern.board.length); r++) {
                    for (let c = 0; c < 5; c++) {
                        const patternValue = pattern.board[r][c];
                        const boardValue = range.rows[r][c];
                        
                        // For empty board patterns (all zeros), only match if board is also empty
                        if (patternValue === 0 && boardValue === 0) {
                            continue; // Empty matches empty
                        } else if (patternValue === 1 && boardValue > 0) {
                            continue; // Filled matches filled
                        } else {
                            boardMatches = false;
                            break;
                        }
                    }
                    if (!boardMatches) break;
                }
                
                // Check if we have required pieces
                if (boardMatches) {
                    const allAvailablePieces = [...availablePieces];
                    
                    const hasAllPieces = pattern.pieces.every(piece => 
                        allAvailablePieces.includes(piece)
                    );
                    
                    if (hasAllPieces) {
                        console.log('[KONOHAPATTERNS] Found pattern:', pattern.name, 'with range:', range.name);
                        
                        // For empty board patterns, calculate proper placement
                        const adjustedPattern = {
                            ...pattern,
                            solution: {
                                ...pattern.solution,
                                y: this.calculatePlacementY(pattern, pattern.solution, range.rows)
                            },
                            alternatives: pattern.alternatives ? pattern.alternatives.map(alt => ({
                                ...alt,
                                y: this.calculatePlacementY(pattern, alt, range.rows)
                            })) : []
                        };
                        
                        return { ...adjustedPattern, matchedRange: range.name };
                    } else {
                        console.log('[KONOHAPATTERNS] Pattern', pattern.name, 'missing pieces. Have:', allAvailablePieces, 'Need:', pattern.pieces);
                    }
                }
            }
        }
        
        return null;
    },
    
    // Calculate proper Y coordinate for piece placement
    calculatePlacementY(pattern, solution, currentBoard) {
        // Find the lowest row where piece can be placed without overlapping
        let targetY = 0;
        
        // For empty board patterns, place pieces at bottom to avoid topping out
        const isBoardEmpty = currentBoard.every(row => row.every(cell => cell === 0));
        
        if (isBoardEmpty) {
            // Place pieces near the bottom of the visible area
            targetY = Math.max(0, currentBoard.length - 2);
        } else {
            // Find the highest occupied row and place above it
            let highestOccupied = -1;
            for (let r = 0; r < currentBoard.length; r++) {
                for (let c = 0; c < 5; c++) {
                    if (currentBoard[r][c] > 0) {
                        highestOccupied = Math.max(highestOccupied, r);
                    }
                }
            }
            
            if (highestOccupied >= 0) {
                targetY = Math.max(0, highestOccupied - 1);
            }
        }
        
        console.log('[KONOHAPATTERNS] Calculated Y position:', targetY, 'for piece:', solution.piece);
        return targetY;
    },
    
    // Helper function to check if hold is required for pattern
    isHoldRequired(pattern, availablePieces, holdPiece) {
        if (!pattern || !holdPiece) return false;
        
        const allPieces = [...availablePieces];
        if (!allPieces.includes(holdPiece)) {
            allPieces.push(holdPiece);
        }
        
        const missingPieces = pattern.pieces.filter(piece => !allPieces.includes(piece));
        const canCompleteWithHold = missingPieces.length === 1 && missingPieces[0] === holdPiece;
        
        return canCompleteWithHold;
    },
    
    // Helper function to get missing pieces for pattern
    getMissingPieces(pattern, availablePieces, holdPiece) {
        const allPieces = [...availablePieces];
        if (holdPiece && !allPieces.includes(holdPiece)) {
            allPieces.push(holdPiece);
        }
        
        return pattern.pieces.filter(piece => !allPieces.includes(piece));
    },
    
    findBestMoveForPiece(pattern, currentPiece) {
        // Check if pattern is valid
        if (!pattern || !pattern.solution) {
            console.warn('[KONOHAPATTERNS] Invalid pattern passed to findBestMoveForPiece');
            return null;
        }
        
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
