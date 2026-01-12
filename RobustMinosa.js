/**
 * Robust Minosa AI - Safe All Clear Pathfinding
 * Uses Pattern Images as primary detection source
 * Only falls back to recursion when pattern matching fails
 * Prioritizes safety to prevent top-outs
 */

class RobustMinosa {
    constructor(config) {
        this.rows = config.rows || 10;
        this.cols = config.cols || 5;
        this.pieceSet = config.pieceSet || 'ILJOT';
        
        // Safety thresholds
        this.MAX_STACK_HEIGHT = Math.floor(this.rows * 0.7); // 70% of board height
        this.MAX_COLUMN_HEIGHT = Math.floor(this.cols * 0.8); // 80% of column height
        this.SAFETY_MARGIN = 2; // Keep 2 rows clear from top
        
        // Cache for memoization
        this.memo = {};
        
        console.log('[ROBUST MINOSA] Initialized with safety thresholds');
    }
    
    /**
     * Main All Clear pathfinding method
     */
    findAllClearPath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation = 0) {
        console.log('[ROBUST MINOSA] Starting safe All Clear pathfinding');
        
        // Clear memo periodically to prevent memory buildup
        if (Object.keys(this.memo).length > 1000) {
            this.clearMemo();
        }
        
        // Try pattern-based approach first
        const patternPath = this.findPatternBasedPath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation);
        if (patternPath && patternPath.length > 0) {
            console.log('[ROBUST MINOSA] Found safe pattern-based path');
            return patternPath;
        }
        
        // Fall back to iterative approach only if pattern matching fails
        console.log('[ROBUST MINOSA] Pattern matching failed, trying iterative approach');
        return this.findIterativePath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation);
    }
    
    /**
     * Pattern-based pathfinding using Pattern Image Analyzer
     */
    findPatternBasedPath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation) {
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        const path = [];
        let currentBoard = board.map(row => [...row]);
        
        console.log('[ROBUST MINOSA] Pattern-based search with pieces:', availablePieces);
        
        // Use PatternImageAnalyzer as primary source
        if (typeof PatternImageAnalyzer !== 'undefined') {
            const analyzer = PatternImageAnalyzer.getInstance();
            console.log('[ROBUST MINOSA] Using PatternImageAnalyzer instance');
            
            let currentPieceForIteration = currentPiece;
            let availablePiecesForIteration = [...availablePieces];
            
            for (let attempt = 0; attempt < 3; attempt++) {
                console.log('[ROBUST MINOSA] Pattern attempt', attempt + 1);
                
                const bestMove = analyzer.getBestMove(
                    currentBoard, 
                    availablePiecesForIteration, 
                    currentPieceForIteration, 
                    holdPiece, 
                    currentRotation
                );
                
                if (!bestMove) {
                    console.log('[ROBUST MINOSA] Pattern analyzer found no safe move');
                    break;
                }
                
                // Double-check safety
                if (!this.isMoveSafe(currentBoard, bestMove, bestMove.piece)) {
                    console.log('[ROBUST MINOSA] Pattern analyzer move failed safety check');
                    break;
                }
                
                console.log('[ROBUST MINOSA] Adding safe pattern move to path:', bestMove);
                path.push(bestMove);
                currentBoard = this.applyMove(currentBoard, bestMove, bestMove.piece);
                
                // Check if we achieved All Clear
                if (this.isBoardEmpty(currentBoard)) {
                    console.log('[ROBUST MINOSA] Pattern-based All Clear achieved!');
                    return path;
                }
                
                // Update current piece for next iteration
                currentPieceForIteration = this.getNextPiece(availablePiecesForIteration, bestMove.piece);
                currentRotation = 0;
                availablePiecesForIteration = this.updateAvailablePieces(availablePiecesForIteration, bestMove.piece);
            }
        } else {
            console.log('[ROBUST MINOSA] PatternImageAnalyzer not available');
        }
        
        return null;
    }
    
    /**
     * Find the safest pattern move for current board state
     */
    findSafestPatternMove(board, availablePieces, currentPiece, holdPiece, currentRotation) {
        const candidates = [];
        
        // Use PatternMatcher if available
        if (typeof PatternMatcher !== 'undefined') {
            const patternMove = PatternMatcher.findBestMoveForCurrentPiece(
                board, availablePieces, currentPiece, holdPiece, currentRotation
            );
            
            if (patternMove && this.isMoveSafe(board, patternMove, patternMove.piece)) {
                candidates.push(patternMove);
            }
        }
        
        // If no pattern match or unsafe, try safe greedy moves
        if (candidates.length === 0) {
            const greedyMove = this.findSafestGreedyMove(board, availablePieces, currentPiece, currentRotation);
            if (greedyMove) {
                candidates.push(greedyMove);
            }
        }
        
        // Return the safest candidate
        if (candidates.length > 0) {
            return candidates.sort((a, b) => {
                const safetyA = this.calculateMoveSafety(board, a, a.piece);
                const safetyB = this.calculateMoveSafety(board, b, b.piece);
                return safetyB - safetyA; // Higher safety score first
            })[0];
        }
        
        return null;
    }
    
    /**
     * Find safest greedy move when pattern matching fails
     */
    findSafestGreedyMove(board, availablePieces, currentPiece, currentRotation) {
        let bestMove = null;
        let bestSafety = -Infinity;
        
        // Try current piece first
        if (currentPiece && availablePieces.includes(currentPiece)) {
            const moves = this.generateSafeMoves(board, currentPiece);
            for (const move of moves) {
                const safety = this.calculateMoveSafety(board, move, currentPiece);
                if (safety > bestSafety) {
                    bestSafety = safety;
                    bestMove = move;
                }
            }
        }
        
        // Try other pieces if current piece doesn't have safe moves
        if (bestMove === null) {
            for (const piece of availablePieces) {
                if (piece === currentPiece) continue;
                
                const moves = this.generateSafeMoves(board, piece);
                for (const move of moves) {
                    const safety = this.calculateMoveSafety(board, move, piece);
                    if (safety > bestSafety) {
                        bestSafety = safety;
                        bestMove = move;
                    }
                }
            }
        }
        
        return bestMove;
    }
    
    /**
     * Generate only safe moves for a piece
     */
    generateSafeMoves(board, pieceType) {
        const pieceShapes = this.getPieceShapes(pieceType);
        const safeMoves = [];
        
        for (let rotation = 0; rotation < pieceShapes.length; rotation++) {
            const shape = pieceShapes[rotation];
            
            for (let x = 0; x <= this.cols - shape[0].length; x++) {
                // Find landing position
                let y = 0;
                while (this.isValidPosition(board, shape, x, y + 1)) {
                    y++;
                }
                
                if (this.isValidPosition(board, shape, x, y)) {
                    const move = { x, y, rotation, piece: pieceType };
                    
                    // Only add if move is safe
                    if (this.isMoveSafe(board, move, pieceType)) {
                        safeMoves.push(move);
                    }
                }
            }
        }
        
        return safeMoves;
    }
    
    /**
     * Calculate safety score for a move (higher = safer)
     */
    calculateMoveSafety(board, move, pieceType) {
        const pieceShapes = this.getPieceShapes(pieceType);
        const shape = pieceShapes[move.rotation];
        
        // Simulate the move
        const tempBoard = board.map(row => [...row]);
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardY = move.y + r;
                    const boardX = move.x + c;
                    if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
                        tempBoard[boardY][boardX] = 1;
                    }
                }
            }
        }
        
        // Clear lines and check result
        const resultBoard = this.clearLines(tempBoard);
        
        let safetyScore = 0;
        
        // Penalty for high stack height
        let filledRows = 0;
        for (let r = 0; r < this.rows; r++) {
            if (resultBoard[r].some(cell => cell !== 0)) {
                filledRows++;
            }
        }
        
        if (filledRows > this.MAX_STACK_HEIGHT) {
            safetyScore -= 100; // Heavy penalty for too high
        } else {
            safetyScore += (this.MAX_STACK_HEIGHT - filledRows) * 10; // Reward for low height
        }
        
        // Penalty for columns that are too high
        for (let c = 0; c < this.cols; c++) {
            let columnHeight = 0;
            for (let r = 0; r < this.rows; r++) {
                if (resultBoard[r][c] !== 0) {
                    columnHeight++;
                }
            }
            
            if (columnHeight > this.MAX_COLUMN_HEIGHT) {
                safetyScore -= 50; // Penalty for high columns
            } else {
                safetyScore += (this.MAX_COLUMN_HEIGHT - columnHeight) * 5; // Reward for low columns
            }
        }
        
        // Bonus for clearing lines
        const linesCleared = this.countLinesCleared(board, shape, move.x, move.y);
        safetyScore += linesCleared * 20; // Strong bonus for line clears
        
        // Bonus for getting closer to All Clear
        const totalBlocks = this.countBlocks(resultBoard);
        safetyScore += (100 - totalBlocks) * 2; // Reward for fewer blocks
        
        return safetyScore;
    }
    
    /**
     * Check if a move is safe (won't cause top-out)
     */
    isMoveSafe(board, move, pieceType) {
        const pieceShapes = this.getPieceShapes(pieceType);
        const shape = pieceShapes[move.rotation];
        
        // Simulate the move
        const tempBoard = board.map(row => [...row]);
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardY = move.y + r;
                    const boardX = move.x + c;
                    if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
                        tempBoard[boardY][boardX] = 1;
                    }
                }
            }
        }
        
        // Clear lines and check result
        const resultBoard = this.clearLines(tempBoard);
        
        // Check stack height
        let filledRows = 0;
        for (let r = 0; r < this.rows; r++) {
            if (resultBoard[r].some(cell => cell !== 0)) {
                filledRows++;
            }
        }
        
        if (filledRows > this.MAX_STACK_HEIGHT) {
            return false;
        }
        
        // Check column heights
        for (let c = 0; c < this.cols; c++) {
            let columnHeight = 0;
            for (let r = 0; r < this.rows; r++) {
                if (resultBoard[r][c] !== 0) {
                    columnHeight++;
                }
            }
            
            if (columnHeight > this.MAX_COLUMN_HEIGHT) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Fast iterative pathfinding (replaces recursive approach)
     */
    findIterativePath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation) {
        console.log('[ROBUST MINOSA] Starting fast iterative pathfinding');
        
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        const path = [];
        let currentBoard = board.map(row => [...row]);
        
        // Iterative approach - try to find path in limited attempts
        const maxAttempts = Math.min(availablePieces.length, 5); // Limit attempts to prevent lag
        console.log('[ROBUST MINOSA] Max attempts:', maxAttempts);
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            console.log('[ROBUST MINOSA] Iterative attempt', attempt + 1, 'Piece:', currentPiece);
            
            // Find best move for current state
            const bestMove = this.findSafestGreedyMove(currentBoard, availablePieces, currentPiece, currentRotation);
            
            if (!bestMove) {
                console.log('[ROBUST MINOSA] No move found in attempt', attempt + 1);
                continue;
            }
            
            // Safety check
            if (!this.isMoveSafe(currentBoard, bestMove, bestMove.piece)) {
                console.log('[ROUST MINOSA] Move failed safety check in attempt', attempt + 1);
                continue;
            }
            
            // Apply move and update state
            path.push(bestMove);
            currentBoard = this.applyMove(currentBoard, bestMove, bestMove.piece);
            
            // Check if we achieved All Clear
            if (this.isBoardEmpty(currentBoard)) {
                console.log('[ROBUST MINOSA] Iterative All Clear achieved in', attempt + 1, 'moves');
                return path;
            }
            
            // Update for next iteration
            currentPiece = this.getNextPiece(availablePieces, bestMove.piece);
            currentRotation = 0;
            availablePieces = this.updateAvailablePieces(availablePieces, bestMove.piece);
            
            // Early exit if we're making progress
            if (attempt >= 2 && path.length > 1) {
                const blocksRemaining = this.countBlocks(currentBoard);
                if (blocksRemaining <= 5) {
                    console.log('[ROBUST MINOSA] Close to All Clear, returning partial path');
                    return path;
                }
            }
        }
        
        console.log('[ROBUST MINOSA] No complete path found in', maxAttempts, 'attempts');
        return null;
    }
    
    /**
     * Helper methods
     */
    buildAvailablePieces(currentPiece, nextQueue, holdPiece) {
        const pieces = [];
        if (currentPiece) pieces.push(currentPiece);
        if (nextQueue && Array.isArray(nextQueue)) {
            pieces.push(...nextQueue.slice(0, 5));
        }
        if (holdPiece) pieces.push(holdPiece);
        
        // Filter by piece set
        if (this.pieceSet === 'ILJOT') {
            return pieces.filter(p => !['S', 'Z'].includes(p));
        }
        
        return pieces;
    }
    
    getNextPiece(availablePieces, usedPiece) {
        const index = availablePieces.indexOf(usedPiece);
        if (index !== -1) {
            const remaining = [...availablePieces];
            remaining.splice(index, 1);
            return remaining[0] || null;
        }
        return null;
    }
    
    updateAvailablePieces(availablePieces, usedPiece) {
        const index = availablePieces.indexOf(usedPiece);
        if (index !== -1) {
            const remaining = [...availablePieces];
            remaining.splice(index, 1);
            return remaining;
        }
        return availablePieces;
    }
    
    createCacheKey(board, currentPiece, nextQueue, holdPiece, rotation) {
        const boardHash = this.hashBoard(board);
        const piecesStr = [currentPiece, ...(nextQueue || []), holdPiece].filter(p => p).join(',');
        return `${boardHash}|${piecesStr}|${rotation}`;
    }
    
    hashBoard(board) {
        let hash = 0;
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                hash = ((hash << 1) | (board[r][c] & 1)) & 0xFFFFFF;
            }
        }
        return hash.toString(36);
    }
    
    getPieceShapes(pieceType) {
        // Use same shapes as game
        const shapes = {
            I: [
                [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
                [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
                [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
                [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
            ],
            O: [
                [[1, 1], [1, 1]]
            ],
            L: [
                [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
                [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
                [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
                [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
            ],
            J: [
                [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
                [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
                [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
                [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
            ],
            T: [
                [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
                [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
                [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
                [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
            ],
            S: [
                [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
                [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
                [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
                [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
            ],
            Z: [
                [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
                [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
                [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
                [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
            ]
        };
        
        let pieceShapes = shapes[pieceType.toUpperCase()] || [];
        
        // Filter by piece set
        if (this.pieceSet === 'ILJOT') {
            if (pieceType.toUpperCase() === 'S' || pieceType.toUpperCase() === 'Z') {
                pieceShapes = [];
            }
        }
        
        return pieceShapes;
    }
    
    isValidPosition(board, shape, x, y) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardX = x + c;
                    const boardY = y + r;
                    
                    if (boardX < 0 || boardX >= this.cols || 
                        boardY < 0 || boardY >= this.rows ||
                        (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols && board[boardY][boardX] !== 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    applyMove(board, move, pieceType) {
        const pieceShapes = this.getPieceShapes(pieceType);
        const shape = pieceShapes[move.rotation];
        const newBoard = board.map(row => [...row]);
        
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardY = move.y + r;
                    const boardX = move.x + c;
                    if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
                        newBoard[boardY][boardX] = 1;
                    }
                }
            }
        }
        
        return this.clearLines(newBoard);
    }
    
    clearLines(board) {
        const newBoard = [];
        
        for (let r = 0; r < board.length; r++) {
            if (!board[r].every(cell => cell !== 0)) {
                newBoard.push(board[r]);
            }
        }
        
        // Add empty rows at the top
        while (newBoard.length < this.rows) {
            newBoard.unshift(new Array(this.cols).fill(0));
        }
        
        return newBoard;
    }
    
    countLinesCleared(board, shape, x, y) {
        const tempBoard = board.map(row => [...row]);
        
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] === 1) {
                    const boardY = y + r;
                    const boardX = x + c;
                    if (boardY >= 0 && boardY < this.rows && boardX >= 0 && boardX < this.cols) {
                        tempBoard[boardY][boardX] = 1;
                    }
                }
            }
        }
        
        let linesCleared = 0;
        for (let r = 0; r < tempBoard.length; r++) {
            if (tempBoard[r].every(cell => cell !== 0)) {
                linesCleared++;
            }
        }
        
        return linesCleared;
    }
    
    countBlocks(board) {
        let count = 0;
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] !== 0) {
                    count++;
                }
            }
        }
        return count;
    }
    
    isBoardEmpty(board) {
        return board.every(row => row.every(cell => cell === 0));
    }
    
    clearMemo() {
        this.memo = {};
        console.log('[ROBUST MINOSA] Memo cache cleared');
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.RobustMinosa = RobustMinosa;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = RobustMinosa;
}
