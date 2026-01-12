/**
 * Pattern Image Analyzer
 * Converts Pattern Images to usable board states
 * Provides safe pattern detection based on actual images
 */

class PatternImageAnalyzer {
    constructor() {
        if (!PatternImageAnalyzer.instance) {
            PatternImageAnalyzer.instance = this;
            this.patternDatabase = this.buildPatternDatabase();
            this.cols = 5; // Standard Konoha board width
            console.log('[PATTERN ANALYZER] Initialized with', Object.keys(this.patternDatabase).length, 'patterns');
        } else {
            console.log('[PATTERN ANALYZER] Using existing instance');
        }
        return PatternImageAnalyzer.instance;
    }
    
    static getInstance() {
        if (!PatternImageAnalyzer.instance) {
            PatternImageAnalyzer.instance = new PatternImageAnalyzer();
        }
        return PatternImageAnalyzer.instance;
    }
    
    /**
     * Build pattern database from Pattern Images directory structure
     * Merged with ColorCodedPatterns for comprehensive coverage
     */
    buildPatternDatabase() {
        return {
            // 2x4 Box Patterns - Safe and reliable
            '2x4_build_II': {
                category: 'build',
                pieces: ['I', 'I'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'I', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            '2x4_build_JJ': {
                category: 'build',
                pieces: ['J', 'J'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'J', x: 0, y: 2, rotation: 1 },
                safety: 'high'
            },
            '2x4_build_LL': {
                category: 'build',
                pieces: ['L', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            '2x4_build_OO': {
                category: 'build',
                pieces: ['O', 'O'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'O', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_LLT': {
                category: 'solve',
                pieces: ['L', 'L', 'T'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'T', x: 1, y: 4, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_LTL': {
                category: 'solve',
                pieces: ['L', 'T', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'T', x: 1, y: 4, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_LTT': {
                category: 'solve',
                pieces: ['L', 'T', 'T'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'T', x: 1, y: 4, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_OJL': {
                category: 'solve',
                pieces: ['O', 'J', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 0],
                    [1, 1, 0, 1, 1],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'J', x: 2, y: 5, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_OLJ': {
                category: 'solve',
                pieces: ['O', 'L', 'J'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 1, y: 5, rotation: 2 },
                safety: 'high'
            },
            '2x4_solve_TLJ': {
                category: 'solve',
                pieces: ['T', 'L', 'J'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 1, 1],
                    [1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 0, y: 5, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_TLT': {
                category: 'solve',
                pieces: ['T', 'L', 'T'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 1, 1],
                    [1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 0, y: 5, rotation: 0 },
                safety: 'high'
            },
            '2x4_solve_TTL': {
                category: 'solve',
                pieces: ['T', 'T', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 1, 1],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 2, y: 5, rotation: 2 },
                safety: 'high'
            },
            
            // 3x4 Box Patterns
            '3x4_build_LJO': {
                category: 'build',
                pieces: ['L', 'J', 'O'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            '3x4_build_LLO': {
                category: 'build',
                pieces: ['L', 'L', 'O'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'L', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            '3x4_build_TTL': {
                category: 'build',
                pieces: ['T', 'T', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0],
                    [1, 1, 1, 1, 0],
                    [0, 1, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'T', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            
            // Full Bag Patterns - Early All Clears
            'full_early_I': {
                category: 'early',
                pieces: ['I'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0]
                ],
                solution: { piece: 'I', x: 0, y: 9, rotation: 0 },
                safety: 'high'
            },
            'full_early_J': {
                category: 'early',
                pieces: ['J'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [0, 1, 0, 0, 0]
                ],
                solution: { piece: 'J', x: 0, y: 8, rotation: 0 },
                safety: 'high'
            },
            'full_early_T': {
                category: 'early',
                pieces: ['T'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [1, 1, 1, 0, 0]
                ],
                solution: { piece: 'T', x: 0, y: 8, rotation: 0 },
                safety: 'high'
            },
            'full_ILJ': {
                category: 'standard',
                pieces: ['I', 'L', 'J'],
                board: [
                    [1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 0],
                    [1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'I', x: 0, y: 0, rotation: 0 },
                safety: 'medium'
            },
            
            // PCO (Perfect Clear Opportunity) Patterns
            'pco_solve_I': {
                category: 'solve',
                pieces: ['I'],
                board: [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ],
                solution: { piece: 'I', x: 0, y: 0, rotation: 0 },
                safety: 'medium'
            },
            'pco_solve_O': {
                category: 'solve',
                pieces: ['O'],
                board: [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ],
                solution: { piece: 'O', x: 0, y: 0, rotation: 0 },
                safety: 'medium'
            },
            'pco_solve_T': {
                category: 'solve',
                pieces: ['T'],
                board: [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ],
                solution: { piece: 'T', x: 0, y: 0, rotation: 0 },
                safety: 'medium'
            },
            
            // TT Patterns
            'tt_solve_IJO': {
                category: 'solve',
                pieces: ['I', 'J', 'O'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'I', x: 0, y: 2, rotation: 0 },
                safety: 'high'
            },
            
            // Recovery Patterns - For difficult situations
            'recover_basic': {
                category: 'recovery',
                pieces: ['T', 'L'],
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [1, 1, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                solution: { piece: 'T', x: 0, y: 1, rotation: 0 },
                safety: 'medium'
            }
        };
    }
    
    /**
     * Find matching patterns for current board state
     */
    findMatchingPatterns(board, availablePieces, currentPiece, currentRotation) {
        const matches = [];
        
        console.log('[PATTERN ANALYZER] Searching for safe patterns');
        console.log('[PATTERN ANALYZER] Available pieces:', availablePieces);
        console.log('[PATTERN ANALYZER] Current piece:', currentPiece);
        
        for (const [patternId, pattern] of Object.entries(this.patternDatabase)) {
            // Check if pattern has required pieces
            if (!this.hasRequiredPieces(pattern.pieces, availablePieces)) {
                continue;
            }
            
            // Check if pattern is safe for current board state
            const matchScore = this.calculatePatternMatch(board, pattern);
            if (matchScore > 0.5) { // 50% match threshold
                const adjustedSolution = this.adjustSolutionForBoard(pattern.solution, board);
                
                matches.push({
                    patternId,
                    ...pattern,
                    matchScore,
                    adjustedSolution,
                    usesCurrentPiece: currentPiece && pattern.pieces.includes(currentPiece)
                });
                
                console.log('[PATTERN ANALYZER] Found match:', patternId, 'Score:', matchScore.toFixed(2));
            }
        }
        
        // Sort by safety and match score
        return matches.sort((a, b) => {
            // Prioritize safety
            const safetyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            const safetyDiff = safetyOrder[b.safety] - safetyOrder[a.safety];
            if (safetyDiff !== 0) return safetyDiff;
            
            // Then by match score
            return b.matchScore - a.matchScore;
        });
    }
    
    /**
     * Calculate how well a pattern matches the current board
     */
    calculatePatternMatch(board, pattern) {
        let matchingCells = 0;
        let totalPatternCells = 0;
        let extraBoardCells = 0;
        
        for (let r = 0; r < Math.min(board.length, pattern.board.length); r++) {
            for (let c = 0; c < Math.min(board[r].length, pattern.board[r].length); c++) {
                const boardCell = board[r][c] !== 0;
                const patternCell = pattern.board[r][c] !== 0;
                
                if (patternCell) {
                    totalPatternCells++;
                    if (boardCell) {
                        matchingCells++;
                    }
                } else if (boardCell) {
                    extraBoardCells++;
                }
            }
        }
        
        if (totalPatternCells === 0) return 0;
        
        const matchRatio = matchingCells / totalPatternCells;
        const extraPenalty = extraBoardCells / totalPatternCells;
        
        return Math.max(0, matchRatio - extraPenalty * 0.5);
    }
    
    /**
     * Check if we have the required pieces for a pattern
     */
    hasRequiredPieces(requiredPieces, availablePieces) {
        const availableCopy = [...availablePieces];
        
        for (const piece of requiredPieces) {
            const index = availableCopy.indexOf(piece);
            if (index === -1) {
                return false;
            }
            availableCopy.splice(index, 1);
        }
        
        return true;
    }
    
    /**
     * Adjust solution position to match current board state
     */
    adjustSolutionForBoard(solution, board) {
        // Find the leftmost filled column in pattern
        let patternLeftmost = solution.x;
        
        // Find the leftmost filled column in actual board
        let boardLeftmost = this.cols;
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < board.length; r++) {
                if (board[r][c] !== 0) {
                    boardLeftmost = Math.min(boardLeftmost, c);
                    break;
                }
            }
        }
        
        // Adjust position
        const adjustedX = solution.x + (boardLeftmost - patternLeftmost);
        
        return {
            ...solution,
            x: Math.max(0, Math.min(adjustedX, this.cols - 1))
        };
    }
    
    /**
     * Get best move for current piece
     */
    getBestMove(board, availablePieces, currentPiece, holdPiece, currentRotation) {
        console.log('[PATTERN ANALYZER] Getting best move for:', currentPiece, 'Available:', availablePieces);
        console.log('[PATTERN ANALYZER] Board state:', board ? 'Provided' : 'None');
        
        const matches = this.findMatchingPatterns(board, availablePieces, currentPiece, currentRotation);
        
        console.log('[PATTERN ANALYZER] Found', matches.length, 'matching patterns');
        
        if (matches.length === 0) {
            console.log('[PATTERN ANALYZER] No matching patterns found');
            return null;
        }
        
        const bestMatch = matches[0];
        console.log('[PATTERN ANALYZER] Best match:', bestMatch.patternId, 'Safety:', bestMatch.safety, 'Score:', bestMatch.matchScore.toFixed(2));
        
        // Only return moves from high safety patterns
        if (bestMatch.safety === 'high') {
            console.log('[PATTERN ANALYZER] Returning high safety move:', bestMatch.adjustedSolution);
            return bestMatch.adjustedSolution;
        }
        
        console.log('[PATTERN ANALYZER] Best match is not high safety, returning null');
        return null;
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.PatternImageAnalyzer = PatternImageAnalyzer;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = PatternImageAnalyzer;
}
