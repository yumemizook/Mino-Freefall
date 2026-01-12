/**
 * Lightweight Pattern-Based Minosa AI for Konoha All Clear Detection
 * Uses comprehensive visual pattern database instead of recursive search
 */

class LightweightMinosa {
    constructor(config) {
        this.rows = config.rows || 10;
        this.cols = config.cols || 5;
        this.pieceSet = config.pieceSet || 'ILJOT';
        
        // Use visual pattern database
        this.patterns = null; // Will use VisualPatterns instead
    }
    
    /**
     * Find All Clear path using visual pattern matching
     */
    findAllClearPath(board, currentPiece, nextQueue, holdPiece, canHold) {
        console.log('[LIGHTWEIGHT MINOSA] Visual pattern matching start');
        console.log('[LIGHTWEIGHT MINOSA] Current:', currentPiece, 'Next:', nextQueue, 'Hold:', holdPiece);
        
        // If board is empty, look for next All Clear setup
        if (this.isBoardEmpty(board)) {
            console.log('[LIGHTWEIGHT MINOSA] Board empty - looking for next All Clear setup');
            return this.findNextAllClearSetup(currentPiece, nextQueue, holdPiece);
        }
        
        // Build available pieces array
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        console.log('[LIGHTWEIGHT MINOSA] Available pieces:', availablePieces);
        
        // Use visual pattern matching if available
        if (typeof PatternMatcher !== 'undefined') {
            const bestMove = PatternMatcher.findBestMoveForCurrentPiece(board, availablePieces, currentPiece, holdPiece);
            if (bestMove && this.validateSolutionMove(bestMove, availablePieces)) {
                console.log('[LIGHTWEIGHT MINOSA] Found visual pattern match');
                return [bestMove];
            }
        }
        
        // Fallback: simple greedy placement if no pattern matches
        console.log('[LIGHTWEIGHT MINOSA] No pattern match, using fallback');
        return this.findGreedySolution(board, availablePieces);
    }
    
    /**
     * Find next All Clear setup when board is empty
     */
    findNextAllClearSetup(currentPiece, nextQueue, holdPiece) {
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        
        // Use visual pattern matching for empty board
        if (typeof PatternMatcher !== 'undefined') {
            // For empty boards, we don't need to pass a board state for matching
            const bestMove = PatternMatcher.findBestMoveForCurrentPiece(null, availablePieces, currentPiece, holdPiece);
            if (bestMove && this.validateSolutionMove(bestMove, availablePieces)) {
                console.log('[LIGHTWEIGHT MINOSA] Found next All Clear setup using current piece:', currentPiece);
                return [bestMove];
            }
        }
        
        console.log('[LIGHTWEIGHT MINOSA] No All Clear setup found with available pieces');
        return null;
    }
    
    /**
     * Build available pieces array
     */
    buildAvailablePieces(currentPiece, nextQueue, holdPiece) {
        const pieces = [];
        
        if (currentPiece) pieces.push(currentPiece);
        if (Array.isArray(nextQueue)) {
            nextQueue.forEach(p => {
                if (p && typeof p === 'string') {
                    pieces.push(p.toUpperCase());
                }
            });
        }
        if (holdPiece) pieces.push(holdPiece);
        
        return pieces;
    }
    
    /**
     * Validate that a solution move is valid
     */
    validateSolutionMove(move, availablePieces) {
        // Check if piece is available
        if (!availablePieces.includes(move.piece)) {
            console.log('[LIGHTWEIGHT MINOSA] Solution piece not available:', move.piece);
            return false;
        }
        
        // Check if move position is within bounds
        const pieceShapes = this.getPieceShapes(move.piece);
        if (!pieceShapes || pieceShapes.length === 0) {
            console.log('[LIGHTWEIGHT MINOSA] No shapes found for solution piece:', move.piece);
            return false;
        }
        
        const shape = pieceShapes[move.rotation];
        if (!shape) {
            console.log('[LIGHTWEIGHT MINOSA] Invalid rotation for solution piece:', move.rotation);
            return false;
        }
        
        // Check if move is within board bounds
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;
        
        if (move.x < 0 || move.x + shapeWidth > this.cols) {
            console.log('[LIGHTWEIGHT MINOSA] Move out of bounds horizontally:', move.x, shapeWidth);
            return false;
        }
        
        if (move.y < 0 || move.y + shapeHeight > this.rows) {
            console.log('[LIGHTWEIGHT MINOSA] Move out of bounds vertically:', move.y, shapeHeight);
            return false;
        }
        
        return true;
    }
    
    /**
     * Fallback greedy solution finder
     */
    findGreedySolution(board, availablePieces) {
        const solution = [];
        
        // Try each piece to clear as many lines as possible
        for (const piece of availablePieces) {
            const bestMove = this.findBestMove(board, piece);
            if (bestMove) {
                solution.push(bestMove);
                board = this.applyMove(board, bestMove, piece);
                if (this.isBoardEmpty(board)) {
                    break;
                }
            }
        }
        
        return solution.length > 0 ? solution : null;
    }
    
    /**
     * Find best move for a piece (max lines cleared)
     */
    findBestMove(board, pieceType) {
        const pieceShapes = this.getPieceShapes(pieceType);
        let bestMove = null;
        let maxLinesCleared = -1;
        
        for (let rotation = 0; rotation < pieceShapes.length; rotation++) {
            const shape = pieceShapes[rotation];
            const shapeHeight = shape.length;
            const shapeWidth = shape[0].length;
            
            for (let x = 0; x <= this.cols - shapeWidth; x++) {
                // Find landing position
                let y = 0;
                while (this.isValidPosition(board, shape, x, y + 1)) {
                    y++;
                }
                
                if (this.isValidPosition(board, shape, x, y)) {
                    const linesCleared = this.countLinesCleared(board, shape, x, y);
                    if (linesCleared > maxLinesCleared) {
                        maxLinesCleared = linesCleared;
                        bestMove = { x, y, rotation, piece: pieceType };
                    }
                }
            }
        }
        
        return bestMove;
    }
    
    /**
     * Get piece shapes for current piece set
     */
    getPieceShapes(pieceType) {
        const standardShapes = {
            I: [
                [[1,1,1,1]],
                [[1],[1],[1],[1]],
                [[1,1,1,1]],
                [[1],[1],[1],[1]]
            ],
            O: [
                [[1,1],[1,1]]
            ],
            L: [
                [[0,0,1],[1,1,1]],
                [[1,0],[1,0],[1,1]],
                [[1,1,1],[1,0,0]],
                [[0,1],[1,1],[0,1]]
            ],
            J: [
                [[1,1,0],[0,0,1]],
                [[0,1],[1,1,1]],
                [[1,1,1],[0,1,0]],
                [[0,1],[0,1],[1,1]]
            ],
            T: [
                [[0,1,0],[1,1,1]],
                [[1,0],[1,1],[0,1]],
                [[1,1,1],[0,1,0]],
                [[0,1],[1,1],[0,1]]
            ],
            S: [
                [[0,1,1],[1,1,0]],
                [[1,0,0],[1,1,1]],
                [[0,0,1],[1,1,1]]
            ],
            Z: [
                [[1,1,0],[0,1,1]],
                [[0,1,1],[1,0,0]],
                [[1,1,1],[1,0,0]]
            ]
        };
        
        // Filter based on piece set
        if (this.pieceSet === 'ILJOT') {
            delete standardShapes.S;
            delete standardShapes.Z;
        }
        
        return standardShapes[pieceType] || [];
    }
    
    /**
     * Check if position is valid
     */
    isValidPosition(board, shape, x, y) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardX = x + c;
                    const boardY = y + r;
                    
                    // Check bounds
                    if (boardX < 0 || boardX >= this.cols || 
                        boardY < 0 || boardY >= this.rows) {
                        return false;
                    }
                    
                    // Check collision
                    if (board[boardY][boardX] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    /**
     * Count lines cleared by placing piece
     */
    countLinesCleared(board, shape, x, y) {
        // Create temporary board with piece placed
        const tempBoard = board.map(row => [...row]);
        
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    tempBoard[y + r][x + c] = 1;
                }
            }
        }
        
        // Count full lines
        let linesCleared = 0;
        for (let r = 0; r < this.rows; r++) {
            if (tempBoard[r].every(cell => cell !== 0)) {
                linesCleared++;
            }
        }
        
        return linesCleared;
    }
    
    /**
     * Apply a move to the board and return new board state
     */
    applyMove(board, move, pieceType) {
        const shape = this.getPieceShapes(pieceType)[move.rotation];
        const newBoard = board.map(row => [...row]);
        
        // Place the piece
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    newBoard[move.y + r][move.x + c] = 1;
                }
            }
        }
        
        // Clear full lines and apply gravity
        const finalBoard = this.clearLines(newBoard);

        return finalBoard;
    }
    
    /**
     * Clear full lines from board
     */
    clearLines(board) {
        // Keep only non-full rows
        const survivingRows = board.filter(row => 
            !row.every(cell => cell !== 0)
        );
        
        // Add empty rows at top
        while (survivingRows.length < this.rows) {
            survivingRows.unshift(new Array(this.cols).fill(0));
        }
        
        return survivingRows;
    }
    
    /**
     * Check if board is completely empty
     */
    isBoardEmpty(board) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                // A cell is not empty if it's not 0 (for numeric boards) or if it's a non-empty string (for color-coded boards)
                if (board[r][c] !== 0 && board[r][c] !== null && board[r][c] !== undefined) return false;
            }
        }
        return true;
    }
}

// Export for browser usage
if (typeof window !== 'undefined') {
    window.LightweightMinosa = LightweightMinosa;
}
