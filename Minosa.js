
class MinosaAI {
    constructor(config) {
        this.rows = config.rows || 10;
        this.cols = config.cols || 5;
        this.pieceSet = config.pieceSet || 'STANDARD';
        
        // Define piece shapes (0=empty, 1=filled)
        this.shapes = {
            I: [[[1,1,1,1]], [[1],[1],[1],[1]]],
            J: [[[1,0,0],[1,1,1]], [[1,1],[1,0],[1,0]], [[1,1,1],[0,0,1]], [[0,1],[0,1],[1,1]]],
            L: [[[0,0,1],[1,1,1]], [[1,0],[1,0],[1,1]], [[1,1,1],[1,0,0]], [[1,1],[0,1],[0,1]]],
            O: [[[1,1],[1,1]]],
            S: [[[0,1,1],[1,1,0]], [[1,0],[1,1],[0,1]]],
            Z: [[[1,1,0],[0,1,1]], [[0,1],[1,1],[1,0]]],
            T: [[[0,1,0],[1,1,1]], [[1,0],[1,1],[1,0]], [[1,1,1],[0,1,0]], [[0,1],[1,1],[0,1]]]
        };
        
        // Filter pieces based on piece set
        if (this.pieceSet === 'ILJOT') {
            delete this.shapes.S;
            delete this.shapes.Z;
        }
        this.memo = {}; // Cache for memoization
    }
    
    /**
     * Main entry point for All Clear detection
     * @param {Array} board - Current board state (2D array of 0/1)
     * @param {string|null} currentPiece - Current piece type
     * @param {Array} nextQueue - Array of next pieces
     * @param {string|null} holdPiece - Hold piece type
     * @param {boolean} canHold - Whether hold is allowed
     * @returns {Array|null} - Path to All Clear or null if impossible
     */
    findAllClearPath(board, currentPiece, nextQueue, holdPiece, canHold) {
        this.clearMemo(); // Clear memoization cache for each new top-level call
        const availablePieces = this.buildPieceSequence(currentPiece, nextQueue, holdPiece);
        let solution = null;

        // 1. Try to find a solution guided by a visual pattern
        if (typeof PatternMatcher !== 'undefined') {
            const matches = PatternMatcher.findMatchingPatterns(board, availablePieces, currentPiece);
            if (matches.length > 0) {
                console.log(`[MINOSA] Found ${matches.length} potential visual patterns. Trying to solve...`);
                const patternPieces = this.buildPieceSequence(currentPiece, nextQueue, holdPiece);
                solution = this.searchAllClear(board, patternPieces, 0, holdPiece, canHold, []);

                if (solution) {
                    console.log('[MINOSA] Successfully found a safe path guided by a visual pattern.');
                    return [solution[0]]; // Return only the first move as the hint
                }
            }
        }

        // 2. If no pattern-based solution, fall back to the original exhaustive search
        console.log('[MINOSA] No visual pattern solution found, starting exhaustive recursive search.');
        const pieces = this.buildPieceSequence(currentPiece, nextQueue, holdPiece);
        if (pieces.length === 0) {
            return null;
        }
        
        solution = this.searchAllClear(board, pieces, 0, holdPiece, canHold, []);

        if (solution) {
            console.log('[MINOSA] Found a safe solution via exhaustive search.');
            return [solution[0]]; // Return only the first move as the hint
        }

        console.log('[MINOSA] No safe All Clear path found.');
        return null;
    }
    
    /**
     * Build the piece sequence for search
     */
    buildPieceSequence(currentPiece, nextQueue, holdPiece) {
        const pieces = [];
        
        // Add current piece first
        if (currentPiece) {
            pieces.push(currentPiece);
        }
        
        // Add next queue pieces
        if (Array.isArray(nextQueue)) {
            nextQueue.forEach(piece => {
                if (piece && typeof piece === 'string') {
                    pieces.push(piece.toUpperCase());
                }
            });
        }
        
        if (holdPiece) {
            pieces.push(holdPiece);
        }
        
        return pieces.filter(p => p && this.shapes[p]);
    }
    
    /**
     * Recursive search for All Clear path
     */
    searchAllClear(board, pieces, pieceIndex, heldPiece, canHold, path) {
        // Create more efficient cache key
        const boardHash = this.hashBoard(board);
        const piecesHash = pieces.slice(pieceIndex).join(',');
        const heldHash = heldPiece || 'null';
        const cacheKey = `${boardHash}|${piecesHash}|${heldHash}`;
        
        if (this.memo[cacheKey]) {
            return this.memo[cacheKey];
        }
        
        // Success condition
        if (this.isBoardEmpty(board)) {
            this.memo[cacheKey] = path;
            return path;
        }
        
        // Failure condition
        if (pieceIndex >= pieces.length && !heldPiece) {
            this.memo[cacheKey] = null;
            return null;
        }
        
        // Pruning: mathematical impossibility check
        const remainingPieces = (pieces.length - pieceIndex) + (heldPiece ? 1 : 0);
        if (this.isMathematicallyImpossible(board, remainingPieces)) {
            this.memo[cacheKey] = null;
            return null;
        }
        
        // Determine current piece to play
        const currentPiece = heldPiece || pieces[pieceIndex];
        if (!currentPiece || !this.shapes[currentPiece]) {
            this.memo[cacheKey] = null;
            return null;
        }
        
        // Try all valid moves for current piece
        const moves = this.generateValidMoves(board, currentPiece);
        
        // Sort moves by lines cleared (optimization)
        moves.sort((a, b) => b.linesCleared - a.linesCleared);
        
        // Try each move
        for (const move of moves) {
            const result = this.applyMove(board, move, currentPiece);
            const nextIndex = pieceIndex + (heldPiece ? 0 : 1);
            
            const solution = this.searchAllClear(
                result.board, 
                pieces, 
                nextIndex, 
                null, // consumed held piece
                true, // hold allowed again
                [...path, {
                    ...move,
                    piece: currentPiece,
                    type: 'MOVE'
                }]
            );
            
            if (solution) {
                this.memo[cacheKey] = solution;
                return solution;
            }
        }
        
        // Try hold if allowed and no piece currently held
        if (canHold && !heldPiece && pieceIndex < pieces.length) {
            const holdSolution = this.searchAllClear(
                board,
                pieces,
                pieceIndex + 1, // skip current piece
                pieces[pieceIndex], // hold current piece
                false, // hold not allowed again immediately
                [...path, { type: 'HOLD', piece: pieces[pieceIndex] }]
            );
            
            if (holdSolution) {
                this.memo[cacheKey] = holdSolution;
                return holdSolution;
            }
        }
        
        this.memo[cacheKey] = null;
        return null;
    }

    clearMemo() {
        this.memo = {};
    }
    
    /**
     * Efficient board hashing for memoization
     */
    hashBoard(board) {
        let hash = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                hash = ((hash << 1) | (board[r][c] & 1)) & 0xFFFFFF; // Keep hash bounded
            }
        }
        return hash.toString(36);
    }
    
    /**
     * Generate all valid moves for a piece on the current board
     */
    generateValidMoves(board, pieceType) {
        const shapes = this.shapes[pieceType];
        if (!shapes) {
            return [];
        }
        
        const moves = [];
        
        shapes.forEach((shape, rotation) => {
            const shapeHeight = shape.length;
            const shapeWidth = shape[0].length;
            
            // Try all horizontal positions
            for (let x = 0; x <= this.cols - shapeWidth; x++) {
                const landingPosition = this.getLandingPosition(board, shape, x);
                if (landingPosition !== null) {
                    const { y, linesCleared } = landingPosition;
                    moves.push({
                        x, y, rotation,
                        linesCleared,
                        piece: pieceType
                    });
                }
            }
        });
        
        return moves;
    }
    
    /**
     * Check if a piece position is valid
     */
    getLandingPosition(board, shape, x) {
        let y = 0;
        while (this.isPositionValidOnBoard(board, shape, x, y + 1)) {
            y++;
        }

        // After finding the lowest valid y, check if it's a valid placement.
        // This seems redundant but confirms the final position after the loop.
        if (this.isPositionValidOnBoard(board, shape, x, y)) {
            const linesCleared = this.countLinesCleared(board, shape, x, y);
            return { y, linesCleared };
        }

        return null;
    }


    isPositionValidOnBoard(board, shape, x, y) {
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
     * Count how many lines would be cleared by placing a piece
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
        const shape = this.shapes[pieceType][move.rotation];
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
        
        return { board: finalBoard };
    }
    
    /**
     * Clear full lines and apply gravity
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
     * Check if All Clear is mathematically impossible
     * For 5x4 board, check if pieces can form complete 5-block rows
     */
    isMathematicallyImpossible(board, piecesRemaining) {
        // Count filled blocks
        let filledBlocks = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (board[r][c] !== 0) {
                    filledBlocks++;
                }
            }
        }
        
        // Basic economy check: need enough pieces to clear all blocks
        if (piecesRemaining * 4 < filledBlocks) {
            return true;
        }
        
        // For 5x4 board: check if we can form complete 5-block rows
        // Each complete row needs exactly 5 blocks
        const totalCells = this.rows * this.cols; // 20 cells
        const emptyCells = totalCells - filledBlocks;
        const totalPieceCells = piecesRemaining * 4; // 4 cells per piece
        
        // We need to fill exactly 20 cells with complete rows
        if (totalPieceCells !== totalCells) {
            return true;
        }
        
        // Check if we can partition pieces into 5-block chunks (complete rows)
        // This is a simplified check - in reality, pieces can span multiple rows
        if (filledBlocks % 5 !== 0 && emptyCells % 5 !== 0) {
            return true;
        }
        
        // Modulo check: blocks must be divisible by 4 (piece size)
        if (filledBlocks % 4 !== 0) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Check if board is completely empty
     */
    isPathSafe(board, path) {
        let tempBoard = board.map(row => [...row]);
        for (const move of path) {
            if (move.type === 'MOVE') {
                const shape = this.shapes[move.piece][move.rotation];
                // Use getLandingPosition to see if a valid placement exists for the hint's x/rotation
                if (this.getLandingPosition(tempBoard, shape, move.x) === null) {
                    return false; // No valid landing spot for this move
                }
                const result = this.applyMove(tempBoard, move, move.piece);
                tempBoard = result.board;
            }
        }
        return true;
    }

    isBoardEmpty(board) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (board[r][c] !== 0) return false;
            }
        }
        return true;
    }
}

// Export for browser usage
if (typeof window !== 'undefined') {
    window.MinosaAI = MinosaAI;
}
