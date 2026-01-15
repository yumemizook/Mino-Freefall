// PowerupMino - Special item blocks for TGM2 Normal mode
// Implements FREE FALL (level 100) and DEL EVEN (level 200) powerups

class PowerupMino {
    static createPowerupPiece(pieceType, powerupType, rotationSystem) {
        // Create a regular piece first
        const piece = new Piece(pieceType, rotationSystem);
        
        // Add powerup properties
        piece.powerupType = powerupType;
        piece.isPowerup = true;
        
        // Set powerup colors (no tinting - use standard piece colors)
        piece.baseColor = piece.color; // Store original color
        piece.powerupFillColor = piece.color; // Use normal piece color (no tint)
        piece.powerupColors = {
            'free_fall': piece.color, // Use normal piece color
            'del_even': piece.color   // Use normal piece color
        };
        
        return piece;
    }
    
    static applyPowerupEffect(gameScene, powerupType) {
        switch (powerupType) {
            case 'free_fall':
                // FREE FALL: Instantly drop all pieces in the stack to the bottom
                this.applyFreeFall(gameScene);
                break;
            case 'del_even':
                // DEL EVEN: Delete all even-numbered rows from the stack
                this.applyDelEven(gameScene);
                break;
        }
    }
    
    static applyFreeFall(gameScene) {
        console.log('Applying FREE FALL effect');
        
        // Move all pieces down to fill any gaps
        const board = gameScene.board;
        const rows = board.rows;
        const cols = board.cols;
        
        // Compress the board downward
        for (let col = 0; col < cols; col++) {
            let writePos = rows - 1;
            
            // Scan from bottom to top
            for (let row = rows - 1; row >= 0; row--) {
                if (board.grid[row][col] !== 0) {
                    if (row !== writePos) {
                        board.grid[writePos][col] = board.grid[row][col];
                        board.grid[row][col] = 0;
                    }
                    writePos--;
                }
            }
        }
        
        // Update visual display
        // Visual display is updated automatically by the game engine
        
        // Play effect sound
        gameScene.playSfx('powerup', 0.8);
    }
    
    static applyDelEven(gameScene) {
        console.log('Applying DEL EVEN effect');
        
        // Delete all even-numbered rows (0-indexed, so rows 1, 3, 5, etc.)
        const board = gameScene.board;
        const rows = board.rows;
        const cols = board.cols;
        
        // Count deleted rows for scoring
        let deletedRows = 0;
        
        // Delete even rows and compress board
        for (let row = 1; row < rows; row += 2) {
            // Clear the even row
            for (let col = 0; col < cols; col++) {
                if (board.grid[row][col] !== 0) {
                    board.grid[row][col] = 0;
                    deletedRows++;
                }
            }
        }
        
        // Compress the board downward to fill gaps
        for (let col = 0; col < cols; col++) {
            let writePos = rows - 1;
            
            for (let row = rows - 1; row >= 0; row--) {
                if (board.grid[row][col] !== 0) {
                    if (row !== writePos) {
                        board.grid[writePos][col] = board.grid[row][col];
                        board.grid[row][col] = 0;
                    }
                    writePos--;
                }
            }
        }
        
        // Update visual display
        // Visual display is updated automatically by the game engine
        
        // Award score for deleted lines
        if (deletedRows > 0 && gameScene.gameMode && gameScene.gameMode.handleLineClear) {
            const linesCleared = Math.floor(deletedRows / cols);
            gameScene.gameMode.handleLineClear(gameScene, linesCleared, 'powerup');
        }
        
        // Play effect sound
        gameScene.playSfx('powerup', 0.8);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PowerupMino };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.PowerupMino = PowerupMino;
}
