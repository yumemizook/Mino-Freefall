/**
 * Visual Pattern Database for Konoha All Clear
 * Based on pattern images from Pattern Images directory
 * Comprehensive collection of setups and solutions
 */

// Use color-coded patterns instead of the original ones
const VisualPatterns = typeof ColorCodedPatterns !== 'undefined' ? ColorCodedPatterns : {};

// Helper functions for pattern matching
const PatternMatcher = {
    /**
     * Find all patterns that match available pieces
     */
    findMatchingPatterns(board, availablePieces, currentPiece = null, currentRotation = 0) {
        const matches = [];
        
        console.log('[PATTERN MATCHER] Starting pattern matching');
        console.log('[PATTERN MATCHER] Available pieces:', availablePieces);
        console.log('[PATTERN MATCHER] Current piece:', currentPiece, 'Rotation:', currentRotation);
        console.log('[PATTERN MATCHER] Board state:', board ? 'Provided' : 'None');

        // Helper to check for board match with flexible matching
        const boardsMatch = (b1, b2) => {
            if (!b1 || !b2 || b1.length !== b2.length) {
                console.log('[PATTERN MATCHER] Board size mismatch or missing boards');
                return false;
            }
            
            let filledCellsMatch = 0;
            let totalPatternCells = 0;
            let totalBoardCells = 0;
            let pieceSpecificMatches = {};
            
            for (let i = 0; i < b1.length; i++) {
                if (b1[i].length !== b2[i].length) return false;
                for (let j = 0; j < b1[i].length; j++) {
                    // Convert pattern board to boolean (filled vs empty) and track piece types
                    const patternCell = b2[i][j] !== 0 && b2[i][j] !== '0' && b2[i][j] !== null && b2[i][j] !== undefined;
                    const patternPiece = patternCell ? b2[i][j] : null;
                    // Convert game board to boolean (filled vs empty)
                    const boardCell = b1[i][j] !== 0 && b1[i][j] !== '0' && b1[i][j] !== null && b1[i][j] !== undefined;
                    
                    // Count pattern cells
                    if (patternCell) {
                        totalPatternCells++;
                        if (!pieceSpecificMatches[patternPiece]) {
                            pieceSpecificMatches[patternPiece] = { matched: 0, total: 0 };
                        }
                        pieceSpecificMatches[patternPiece].total++;
                    }
                    if (boardCell) totalBoardCells++;
                    
                    // Check if pattern expects a filled cell and board has it
                    if (patternCell && boardCell) {
                        filledCellsMatch++;
                        if (patternPiece) {
                            pieceSpecificMatches[patternPiece].matched++;
                        }
                    }
                    // If pattern expects empty but board is filled, this is a mismatch
                    else if (!patternCell && boardCell) {
                        return false;
                    }
                }
            }
            
            // For a good match, at least 70% of pattern filled cells should match
            // and board shouldn't have significantly more filled cells than pattern
            if (totalPatternCells === 0) return true; // Empty pattern matches any empty-ish board
            
            const matchRatio = filledCellsMatch / totalPatternCells;
            const boardExtraRatio = (totalBoardCells - filledCellsMatch) / totalPatternCells;
            
            console.log('[PATTERN MATCHER] Board match analysis:', {
                filledCellsMatch, totalPatternCells, totalBoardCells,
                matchRatio: matchRatio.toFixed(2), boardExtraRatio: boardExtraRatio.toFixed(2),
                pieceSpecificMatches
            });
            
            // Require good match ratio and limit extra cells
            const result = matchRatio >= 0.7 && boardExtraRatio <= 0.3;
            console.log('[PATTERN MATCHER] Board match result:', result);
            return result;
        };

        // Helper to check for piece availability with duplicates
        const hasAllPieces = (patternPieces, available) => {
            const availableCopy = [...available];
            for (const requiredPiece of patternPieces) {
                const index = availableCopy.indexOf(requiredPiece);
                if (index === -1) {
                    return false; // Required piece not found
                }
                availableCopy.splice(index, 1); // Remove one instance of the piece
            }
            return true; // All required pieces were found
        };

        let totalPatterns = 0;
        let boardMatchedPatterns = 0;
        let pieceMatchedPatterns = 0;

        for (const category in VisualPatterns) {
            for (const patternId in VisualPatterns[category]) {
                totalPatterns++;
                const pattern = VisualPatterns[category][patternId];

                console.log('[PATTERN MATCHER] Checking pattern:', patternId, 'Category:', category);
                console.log('[PATTERN MATCHER] Pattern pieces:', pattern.pieces);

                // Check if board state matches pattern (only if board is provided)
                let boardMatches = true;
                if (board) {
                    boardMatches = boardsMatch(board, pattern.board);
                    if (!boardMatches) {
                        console.log('[PATTERN MATCHER] Board does not match pattern, trying lenient match');
                        // Try a more lenient match - just check if pattern pieces could work with current board
                        boardMatches = this.lenientBoardMatch(board, pattern.board);
                        if (!boardMatches) {
                            console.log('[PATTERN MATCHER] Even lenient board match failed');
                            continue;
                        }
                    }
                    boardMatchedPatterns++;
                    console.log('[PATTERN MATCHER] Board matches pattern!');
                }

                if (hasAllPieces(pattern.pieces, availablePieces)) {
                    pieceMatchedPatterns++;
                    console.log('[PATTERN MATCHER] Pieces match pattern!');
                    
                    const usesCurrentPiece = currentPiece && 
                        (pattern.solution.piece === currentPiece || pattern.alternatives.some(alt => alt.piece === currentPiece));
                    
                    console.log('[PATTERN MATCHER] Uses current piece:', usesCurrentPiece);
                    
                    // Check if current rotation matches the pattern solution
                    const usesCurrentRotation = usesCurrentPiece && currentRotation !== undefined;
                    let rotationMatch = true;
                    
                    if (usesCurrentRotation) {
                        // Check if solution rotation matches current rotation
                        if (pattern.solution.piece === currentPiece) {
                            rotationMatch = pattern.solution.rotation === currentRotation;
                        } else {
                            // Check if any alternative has matching piece and rotation
                            const matchingAlt = pattern.alternatives.find(alt => 
                                alt.piece === currentPiece && alt.rotation === currentRotation
                            );
                            rotationMatch = !!matchingAlt;
                        }
                        console.log('[PATTERN MATCHER] Rotation match:', rotationMatch, 'Current rotation:', currentRotation);
                    }
                    
                    matches.push({
                        ...pattern,
                        category,
                        patternId,
                        usesCurrentPiece: usesCurrentPiece,
                        usesCurrentRotation: usesCurrentRotation && rotationMatch,
                        rotationMatch: rotationMatch,
                        priority: usesCurrentPiece && rotationMatch ? 2 : (usesCurrentPiece ? 1 : 0),
                        boardMatch: board ? this.calculateBoardMatch(board, pattern.board) : 1.0
                    });
                    
                    console.log('[PATTERN MATCHER] Pattern added to matches! Priority:', usesCurrentPiece && rotationMatch ? 2 : (usesCurrentPiece ? 1 : 0));
                } else {
                    console.log('[PATTERN MATCHER] Pieces do not match pattern');
                }
            }
        }
        
        console.log('[PATTERN MATCHER] Pattern matching summary:');
        console.log('[PATTERN MATCHER] Total patterns checked:', totalPatterns);
        console.log('[PATTERN MATCHER] Board matched patterns:', boardMatchedPatterns);
        console.log('[PATTERN MATCHER] Piece matched patterns:', pieceMatchedPatterns);
        console.log('[PATTERN MATCHER] Final matches:', matches.length);
        
        // Sort by priority, then by board match quality, then by category
        return matches.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            if (a.boardMatch !== b.boardMatch) {
                return b.boardMatch - a.boardMatch; // Better board match first
            }
            // Prioritize build patterns over solve patterns
            const categoryOrder = { 'build': 0, 'early': 1, 'standard': 2, 'solve': 3, 'recovery': 4 };
            return categoryOrder[a.category] - categoryOrder[b.category];
        });
    },
    
    /**
     * Lenient board match - checks if pattern could work with current board state
     */
    lenientBoardMatch(board, patternBoard) {
        if (!board || !patternBoard) return true;
        
        // Count filled cells in both boards
        let boardFilledCells = 0;
        let patternFilledCells = 0;
        
        for (let i = 0; i < Math.min(board.length, patternBoard.length); i++) {
            for (let j = 0; j < Math.min(board[i].length, patternBoard[i].length); j++) {
                const boardCell = board[i][j] !== 0 && board[i][j] !== '0' && board[i][j] !== null && board[i][j] !== undefined;
                const patternCell = patternBoard[i][j] !== 0 && patternBoard[i][j] !== '0' && patternBoard[i][j] !== null && patternBoard[i][j] !== undefined;
                
                if (boardCell) boardFilledCells++;
                if (patternCell) patternFilledCells++;
            }
        }
        
        console.log('[PATTERN MATCHER] Lenient match - Board filled:', boardFilledCells, 'Pattern filled:', patternFilledCells);
        
        // If board is empty, only match empty patterns
        if (boardFilledCells === 0) {
            return patternFilledCells === 0;
        }
        
        // If pattern is empty, only match if board has minimal filled cells
        if (patternFilledCells === 0) {
            return boardFilledCells <= 5; // Allow some flexibility for empty patterns
        }
        
        // For non-empty boards and patterns, check if they're in the same ballpark
        const ratio = Math.min(boardFilledCells, patternFilledCells) / Math.max(boardFilledCells, patternFilledCells);
        const result = ratio >= 0.3; // At least 30% similarity
        
        console.log('[PATTERN MATCHER] Lenient match ratio:', ratio.toFixed(2), 'Result:', result);
        return result;
    },
    
    /**
     * Calculate board match quality (0-1 scale)
     */
    calculateBoardMatch(board, patternBoard) {
        if (!board || !patternBoard) return 0;
        
        let filledCellsMatch = 0;
        let totalPatternCells = 0;
        let totalBoardCells = 0;
        
        for (let i = 0; i < board.length && i < patternBoard.length; i++) {
            for (let j = 0; j < board[i].length && j < patternBoard[i].length; j++) {
                const patternCell = patternBoard[i][j] !== 0 && patternBoard[i][j] !== '0' && patternBoard[i][j] !== null && patternBoard[i][j] !== undefined;
                const boardCell = board[i][j] !== 0 && board[i][j] !== '0' && board[i][j] !== null && board[i][j] !== undefined;
                
                if (patternCell) totalPatternCells++;
                if (boardCell) totalBoardCells++;
                
                if (patternCell && boardCell) {
                    filledCellsMatch++;
                }
            }
        }
        
        if (totalPatternCells === 0) return 1.0;
        return filledCellsMatch / totalPatternCells;
    },
    
    /**
     * Adjust move position based on actual board state vs pattern board
     */
    adjustMoveForBoard(move, actualBoard, patternBoard) {
        if (!move || !actualBoard || !patternBoard) {
            console.log('[PATTERN MATCHER] Position adjustment - missing data, returning original move');
            return move;
        }
        
        console.log('[PATTERN MATCHER] Original move:', move);
        
        // Find the leftmost filled column in the pattern
        let patternLeftmostCol = patternBoard[0].length;
        let patternRightmostCol = -1;
        let patternFilledCells = [];
        
        for (let col = 0; col < patternBoard[0].length; col++) {
            for (let row = 0; row < patternBoard.length; row++) {
                const patternCell = patternBoard[row][col] !== 0 && patternBoard[row][col] !== '0' && patternBoard[row][col] !== null && patternBoard[row][col] !== undefined;
                if (patternCell) {
                    patternLeftmostCol = Math.min(patternLeftmostCol, col);
                    patternRightmostCol = Math.max(patternRightmostCol, col);
                    patternFilledCells.push({row, col});
                }
            }
        }
        
        // Find the leftmost filled column in the actual board
        let boardLeftmostCol = actualBoard[0].length;
        let boardRightmostCol = -1;
        let boardFilledCells = [];
        
        for (let col = 0; col < actualBoard[0].length; col++) {
            for (let row = 0; row < actualBoard.length; row++) {
                const boardCell = actualBoard[row][col] !== 0 && actualBoard[row][col] !== '0' && actualBoard[row][col] !== null && actualBoard[row][col] !== undefined;
                if (boardCell) {
                    boardLeftmostCol = Math.min(boardLeftmostCol, col);
                    boardRightmostCol = Math.max(boardRightmostCol, col);
                    boardFilledCells.push({row, col});
                }
            }
        }
        
        console.log('[PATTERN MATCHER] Position analysis:');
        console.log('[PATTERN MATCHER] Pattern bounds:', patternLeftmostCol, 'to', patternRightmostCol);
        console.log('[PATTERN MATCHER] Board bounds:', boardLeftmostCol, 'to', boardRightmostCol);
        
        // If no filled cells found in pattern or board, return original move
        if (patternRightmostCol === -1 || boardRightmostCol === -1) {
            console.log('[PATTERN MATCHER] No filled cells found, returning original move');
            return move;
        }
        
        // Calculate the offset needed to align the pattern with the actual board
        const offset = boardLeftmostCol - patternLeftmostCol;
        
        // Create adjusted move with new position
        const adjustedMove = {
            ...move,
            x: move.x + offset
        };
        
        console.log('[PATTERN MATCHER] Adjusted move position from', move.x, 'to', adjustedMove.x, '(offset:', offset, ')');
        
        // Validate the adjusted move is within bounds
        if (adjustedMove.x < 0 || adjustedMove.x >= 5) {
            console.log('[PATTERN MATCHER] Adjusted move out of bounds, using original');
            return move;
        }
        
        return adjustedMove;
    },
    
    /**
     * Find best move for current piece from matching patterns
     */
    findBestMoveForCurrentPiece(board, availablePieces, currentPiece, holdPiece, currentRotation = 0) {
        console.log('[PATTERN MATCHER] Finding best move for current piece');
        const matches = this.findMatchingPatterns(board, availablePieces, currentPiece, currentRotation);

        console.log('[PATTERN MATCHER] Found', matches.length, 'matching patterns');
        if (matches.length === 0) {
            console.log('[PATTERN MATCHER] No matches found, returning null');
            return null;
        }

        const bestMatch = matches[0];
        console.log('[PATTERN MATCHER] Best match:', bestMatch.patternId, 'Priority:', bestMatch.priority);
        console.log('[PATTERN MATCHER] Best match solution:', bestMatch.solution);
        console.log('[PATTERN MATCHER] Best match alternatives:', bestMatch.alternatives);

        const findMove = (piece, rotation) => {
            console.log('[PATTERN MATCHER] Looking for move with piece:', piece, 'rotation:', rotation);
            
            // First try to find exact piece + rotation match in solution
            if (bestMatch.solution.piece === piece && bestMatch.solution.rotation === rotation) {
                console.log('[PATTERN MATCHER] Found exact match in solution');
                const adjustedMove = this.adjustMoveForBoard(bestMatch.solution, board, bestMatch.board);
                return adjustedMove;
            }
            
            // Then try alternatives for exact rotation match
            for (const alt of bestMatch.alternatives) {
                if (alt.piece === piece && alt.rotation === rotation) {
                    console.log('[PATTERN MATCHER] Found exact match in alternatives');
                    const adjustedMove = this.adjustMoveForBoard(alt, board, bestMatch.board);
                    return adjustedMove;
                }
            }
            
            // If no exact rotation match, fall back to any rotation of the piece
            if (bestMatch.solution.piece === piece) {
                console.log('[PATTERN MATCHER] Found piece match (any rotation) in solution');
                const adjustedMove = this.adjustMoveForBoard(bestMatch.solution, board, bestMatch.board);
                return adjustedMove;
            }
            for (const alt of bestMatch.alternatives) {
                if (alt.piece === piece) {
                    console.log('[PATTERN MATCHER] Found piece match (any rotation) in alternatives');
                    const adjustedMove = this.adjustMoveForBoard(alt, board, bestMatch.board);
                    return adjustedMove;
                }
            }
            
            console.log('[PATTERN MATCHER] No move found for piece:', piece, 'rotation:', rotation);
            return null;
        };

        if (currentPiece) {
            console.log('[PATTERN MATCHER] Trying current piece:', currentPiece);
            const move = findMove(currentPiece, currentRotation);
            if (move) {
                console.log('[PATTERN MATCHER] Returning move for current piece:', move);
                return move;
            }
        }

        if (holdPiece) {
            console.log('[PATTERN MATCHER] Trying hold piece:', holdPiece);
            const move = findMove(holdPiece, 0); // Hold piece usually starts in rotation 0
            if (move) {
                console.log('[PATTERN MATCHER] Returning move for hold piece:', move);
                return move;
            }
        }

        console.log('[PATTERN MATCHER] No suitable move found, returning null');
        return null;
    }
};

// Export for browser and Node.js usage
if (typeof window !== 'undefined') {
    window.VisualPatterns = VisualPatterns;
    window.PatternMatcher = PatternMatcher;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VisualPatterns, PatternMatcher };
}
