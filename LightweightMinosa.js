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
    findAllClearPath(board, currentPiece, nextQueue, holdPiece, canHold, currentRotation = 0) {
        console.log('[LIGHTWEIGHT MINOSA] Visual pattern matching start');
        console.log('[LIGHTWEIGHT MINOSA] Current:', currentPiece, 'Rotation:', currentRotation, 'Next:', nextQueue, 'Hold:', holdPiece);
        
        // If board is empty, look for next All Clear setup
        if (this.isBoardEmpty(board)) {
            console.log('[LIGHTWEIGHT MINOSA] Board empty - looking for next All Clear setup');
            return this.findNextAllClearSetup(currentPiece, nextQueue, holdPiece, currentRotation);
        }
        
        // Build available pieces array
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        console.log('[LIGHTWEIGHT MINOSA] Available pieces:', availablePieces);
        
        // Use visual pattern matching if available
        if (typeof PatternMatcher !== 'undefined') {
            const allClearPath = this.findCompleteAllClearPath(board, availablePieces, currentPiece, holdPiece, currentRotation);
            if (allClearPath && allClearPath.length > 0) {
                console.log('[LIGHTWEIGHT MINOSA] Found complete All Clear path with', allClearPath.length, 'moves');
                return allClearPath;
            }
        }
        
        // Fallback: simple greedy placement if no pattern matches
        console.log('[LIGHTWEIGHT MINOSA] No pattern match, using fallback');
        return this.findGreedySolution(board, availablePieces, currentPiece, currentRotation);
    }
    
    /**
     * Find complete All Clear path using pattern matching
     */
    findCompleteAllClearPath(board, availablePieces, currentPiece, holdPiece, currentRotation) {
        const path = [];
        let currentBoard = board.map(row => [...row]); // Deep copy
        let remainingPieces = [...availablePieces];
        
        // Try to find a complete All Clear solution
        for (let moveIndex = 0; moveIndex < remainingPieces.length; moveIndex++) {
            const pieceToUse = moveIndex === 0 ? currentPiece : remainingPieces[moveIndex];
            const rotationToUse = moveIndex === 0 ? currentRotation : 0;
            
            if (!pieceToUse) continue;
            
            console.log('[LIGHTWEIGHT MINOSA] Finding move for piece', pieceToUse, 'at move index', moveIndex);
            
            // Find best move for current board state and piece
            const bestMove = PatternMatcher.findBestMoveForCurrentPiece(
                currentBoard, 
                remainingPieces.slice(moveIndex), 
                pieceToUse, 
                holdPiece, 
                rotationToUse
            );
            
            if (!bestMove) {
                console.log('[LIGHTWEIGHT MINOSA] No move found for piece', pieceToUse);
                return null; // Can't complete All Clear
            }
            
            // Validate the move
            if (!this.validateSolutionMove(bestMove, remainingPieces.slice(moveIndex))) {
                console.log('[LIGHTWEIGHT MINOSA] Move validation failed for piece', pieceToUse);
                return null;
            }
            
            // Safety check
            if (!this.isSafeMove(currentBoard, bestMove, pieceToUse)) {
                console.log('[LIGHTWEIGHT MINOSA] Move safety check failed for piece', pieceToUse);
                return null;
            }
            
            // Add move to path
            path.push(bestMove);
            console.log('[LIGHTWEIGHT MINOSA] Added move to path:', bestMove);
            
            // Apply move to board
            currentBoard = this.applyMove(currentBoard, bestMove, pieceToUse);
            
            // Check if board is empty (All Clear achieved)
            if (this.isBoardEmpty(currentBoard)) {
                console.log('[LIGHTWEIGHT MINOSA] All Clear achieved with', path.length, 'moves');
                return path;
            }
        }
        
        console.log('[LIGHTWEIGHT MINOSA] Could not achieve All Clear with available pieces');
        return null;
    }
    
    /**
     * Find next All Clear setup when board is empty
     */
    findNextAllClearSetup(currentPiece, nextQueue, holdPiece, currentRotation = 0) {
        const availablePieces = this.buildAvailablePieces(currentPiece, nextQueue, holdPiece);
        
        // Use visual pattern matching for empty board
        if (typeof PatternMatcher !== 'undefined') {
            // For empty boards, we don't need to pass a board state for matching
            const bestMove = PatternMatcher.findBestMoveForCurrentPiece(null, availablePieces, currentPiece, holdPiece, currentRotation);
            if (bestMove && this.validateSolutionMove(bestMove, availablePieces)) {
                console.log('[LIGHTWEIGHT MINOSA] Found next All Clear setup using current piece:', currentPiece, 'rotation:', currentRotation);
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
        // Check if move object is valid
        if (!move || typeof move !== 'object') {
            console.log('[LIGHTWEIGHT MINOSA] Invalid move object');
            return false;
        }
        
        // Check if piece is specified and available
        if (!move.piece || !availablePieces.includes(move.piece)) {
            console.log('[LIGHTWEIGHT MINOSA] Solution piece not available:', move.piece);
            return false;
        }
        
        // Check if move position is within bounds
        const pieceShapes = this.getPieceShapes(move.piece);
        if (!pieceShapes || pieceShapes.length === 0) {
            console.log('[LIGHTWEIGHT MINOSA] No shapes found for solution piece:', move.piece);
            return false;
        }
        
        const rotation = move.rotation || 0;
        if (rotation < 0 || rotation >= pieceShapes.length) {
            console.log('[LIGHTWEIGHT MINOSA] Invalid rotation for solution piece:', rotation);
            return false;
        }
        
        const shape = pieceShapes[rotation];
        if (!shape) {
            console.log('[LIGHTWEIGHT MINOSA] Invalid shape for solution piece at rotation:', rotation);
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
     * Check if a move is safe (won't cause top out)
     */
    isSafeMove(board, move, pieceType) {
        try {
            // Get the piece shape
            const pieceShapes = this.getPieceShapes(pieceType);
            if (!pieceShapes || pieceShapes.length === 0) return false;
            
            const rotation = move.rotation || 0;
            if (rotation < 0 || rotation >= pieceShapes.length) return false;
            
            const shape = pieceShapes[rotation];
            if (!shape) return false;
            
            // Simulate placing the piece
            const tempBoard = board.map(row => [...row]);
            
            // Place the piece at the suggested position
            for (let r = 0; r < shape.length; r++) {
                for (let c = 0; c < shape[r].length; c++) {
                    if (shape[r][c] === 1) {
                        const boardY = move.y + r;
                        const boardX = move.x + c;
                        
                        // Check if placement is valid
                        if (boardX < 0 || boardX >= this.cols || 
                            boardY < 0 || boardY >= this.rows ||
                            tempBoard[boardY][boardX] !== 0) {
                            return false;
                        }
                        
                        tempBoard[boardY][boardX] = 1;
                    }
                }
            }
            
            // Clear lines and check result
            const resultBoard = this.clearLines(tempBoard);
            
            // Check if the result board has dangerous stack height
            // For a 10-row board, leaving more than 6 rows filled is dangerous
            let filledRows = 0;
            for (let r = 0; r < this.rows; r++) {
                if (resultBoard[r].some(cell => cell !== 0)) {
                    filledRows++;
                }
            }
            
            // If more than 60% of the board is filled, it's too risky
            if (filledRows > this.rows * 0.6) {
                console.log('[LIGHTWEIGHT MINOSA] Move too risky: would fill', filledRows, 'rows');
                return false;
            }
            
            // Check for columns that are too high (risk of top out)
            for (let c = 0; c < this.cols; c++) {
                let columnHeight = 0;
                for (let r = 0; r < this.rows; r++) {
                    if (resultBoard[r][c] !== 0) {
                        columnHeight++;
                    }
                }
                // If any column is more than 80% full, it's dangerous
                if (columnHeight > this.rows * 0.8) {
                    console.log('[LIGHTWEIGHT MINOSA] Move too risky: column', c, 'height', columnHeight);
                    return false;
                }
            }
            
            return true;
            
        } catch (error) {
            console.warn('[LIGHTWEIGHT MINOSA] Error checking move safety:', error);
            return false;
        }
    }
    
    /**
     * Fallback greedy solution finder
     */
    findGreedySolution(board, availablePieces, currentPiece = null, currentRotation = 0) {
        const solution = [];
        
        // Try current piece first with its current rotation
        if (currentPiece && availablePieces.includes(currentPiece)) {
            const bestMove = this.findBestMoveForRotation(board, currentPiece, currentRotation);
            if (bestMove) {
                solution.push(bestMove);
                board = this.applyMove(board, bestMove, currentPiece);
                if (this.isBoardEmpty(board)) {
                    return solution;
                }
            }
        }
        
        // Try each piece to clear as many lines as possible
        for (const piece of availablePieces) {
            if (piece === currentPiece) continue; // Already tried current piece
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
     * Find best move for a specific rotation of a piece
     */
    findBestMoveForRotation(board, pieceType, preferredRotation) {
        const pieceShapes = this.getPieceShapes(pieceType);
        if (!pieceShapes || pieceShapes.length === 0) return null;
        
        // First try the preferred rotation
        const preferredShape = pieceShapes[preferredRotation % pieceShapes.length];
        if (preferredShape) {
            const move = this.findBestMoveForShape(board, pieceType, preferredShape, preferredRotation);
            if (move) return move;
        }
        
        // If preferred rotation doesn't work, try other rotations
        for (let rotation = 0; rotation < pieceShapes.length; rotation++) {
            if (rotation === preferredRotation) continue;
            const shape = pieceShapes[rotation];
            const move = this.findBestMoveForShape(board, pieceType, shape, rotation);
            if (move) return move;
        }
        
        return null;
    }
    
    /**
     * Find best move for a specific shape
     */
    findBestMoveForShape(board, pieceType, shape, rotation) {
        const shapeHeight = shape.length;
        const shapeWidth = shape[0].length;
        let bestMove = null;
        let maxLinesCleared = -1;
        
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
        
        return bestMove;
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
        if (!pieceType || typeof pieceType !== 'string') {
            return [];
        }
        
        // Use exact same shapes as the game's TETROMINOES
        const gameShapes = {
            I: [
                [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // Rotation 0
                [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], // Rotation 1
                [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], // Rotation 2
                [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]  // Rotation 3
            ],
            O: [
                [[1, 1], [1, 1]], // All rotations same for O
                [[1, 1], [1, 1]],
                [[1, 1], [1, 1]],
                [[1, 1], [1, 1]]
            ],
            L: [
                [[0, 0, 1], [1, 1, 1], [0, 0, 0]], // Rotation 0
                [[1, 1, 0], [0, 1, 0], [0, 1, 0]], // Rotation 1
                [[0, 0, 0], [1, 1, 1], [1, 0, 0]], // Rotation 2
                [[0, 1, 0], [0, 1, 0], [0, 1, 1]]  // Rotation 3
            ],
            J: [
                [[1, 0, 0], [1, 1, 1], [0, 0, 0]], // Rotation 0
                [[0, 1, 1], [0, 1, 0], [0, 1, 0]], // Rotation 1
                [[0, 0, 0], [1, 1, 1], [0, 0, 1]], // Rotation 2
                [[0, 1, 0], [0, 1, 0], [1, 1, 0]]  // Rotation 3
            ],
            T: [
                [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // Rotation 0
                [[0, 1, 0], [0, 1, 1], [0, 1, 0]], // Rotation 1
                [[0, 0, 0], [1, 1, 1], [0, 1, 0]], // Rotation 2
                [[0, 1, 0], [1, 1, 0], [0, 1, 0]]  // Rotation 3
            ],
            S: [
                [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // Rotation 0
                [[0, 1, 0], [0, 1, 1], [0, 0, 1]], // Rotation 1
                [[0, 0, 0], [0, 1, 1], [1, 1, 0]], // Rotation 2
                [[1, 0, 0], [1, 1, 0], [0, 1, 0]]  // Rotation 3
            ],
            Z: [
                [[1, 1, 0], [0, 1, 1], [0, 0, 0]], // Rotation 0
                [[0, 0, 1], [0, 1, 1], [0, 1, 0]], // Rotation 1
                [[0, 0, 0], [1, 1, 0], [0, 1, 1]], // Rotation 2
                [[0, 1, 0], [1, 1, 0], [1, 0, 0]]  // Rotation 3
            ]
        };
        
        // Filter based on piece set
        let shapes = gameShapes[pieceType.toUpperCase()] || [];
        if (this.pieceSet === 'ILJOT') {
            if (pieceType.toUpperCase() === 'S' || pieceType.toUpperCase() === 'Z') {
                shapes = [];
            }
        }
        
        return shapes;
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
