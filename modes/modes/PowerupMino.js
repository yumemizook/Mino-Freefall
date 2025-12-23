// PowerupMino class - Extends existing Piece system with special powerup mechanics
// Powerup minos spawn like normal pieces but activate unique effects when their lines are cleared

class PowerupMino extends Piece {
    constructor(type, powerupType = null, rotationSystem = 'SRS', initialRotation = 0) {
        // Initialize as regular piece first
        super(type, rotationSystem, initialRotation);
        
        // Store powerup type
        this.powerupType = powerupType;
        this.isPowerup = true;
        
        // Visual distinction for powerup pieces
        this.powerupColors = {
            'del_even': 0xFF00FF,  // Magenta for row deletion
            'free_fall': 0x00FF80 // Green for gravity burst
        };
        
        // Apply powerup color if specified
        if (this.powerupType && this.powerupColors[this.powerupType]) {
            this.color = this.powerupColors[this.powerupType];
        }
        
        // Store original color for restoration if needed
        this.originalColor = this.color;
        
        // Powerup-specific properties
        this.powerupData = {
            // Row deletion powerup settings
            'del_even': {
                deletePattern: 'every_other', // 'every_other', 'every_third', etc.
                preserveTopRows: true, // Don't delete top 2 rows
                preserveBottomRows: true // Don't delete bottom 2 rows
            },
            // Gravity burst powerup settings
            'free_fall': {
                forceToBottom: true, // All pieces fall to bottom
                clearFilledLines: true, // Clear lines that become complete
                maxIterations: 10 // Prevent infinite loops
            }
        };
    }
    
    // Override draw method to add visual indicator for powerup pieces
    draw(scene, offsetX, offsetY, cellSize, ghost = false, alpha = 1) {
        const finalAlpha = ghost ? 0.3 : alpha;
        
        // Draw the base piece
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
                        
                        // Add powerup indicator overlay
                        this.drawPowerupIndicator(sprite, cellSize);
                    }
                }
            }
        }
    }
    
    // Draw small indicator to show this is a powerup piece
    drawPowerupIndicator(sprite, cellSize) {
        if (!this.powerupType) return;
        
        // Create a small indicator in the corner of the piece
        const indicatorSize = Math.max(2, Math.floor(cellSize * 0.2));
        const indicatorX = sprite.x - cellSize/2 + indicatorSize/2 + 1;
        const indicatorY = sprite.y - cellSize/2 + indicatorSize/2 + 1;
        
        // Use graphics to draw the indicator
        const graphics = sprite.scene.add.graphics();
        
        // Draw background circle
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillCircle(indicatorX, indicatorY, indicatorSize/2);
        
        // Draw powerup-specific symbol
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.strokeCircle(indicatorX, indicatorY, indicatorSize/2 - 1);
        
        // Draw powerup symbol based on type
        switch (this.powerupType) {
            case 'del_even':
                // Draw "X" symbol for deletion
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.beginPath();
                graphics.moveTo(indicatorX - 2, indicatorY - 2);
                graphics.lineTo(indicatorX + 2, indicatorY + 2);
                graphics.moveTo(indicatorX + 2, indicatorY - 2);
                graphics.lineTo(indicatorX - 2, indicatorY + 2);
                graphics.strokePath();
                break;

            case 'free_fall':
                // Draw downward arrow for gravity
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.beginPath();
                graphics.moveTo(indicatorX, indicatorY - 3);
                graphics.lineTo(indicatorX, indicatorY + 3);
                graphics.moveTo(indicatorX - 2, indicatorY + 1);
                graphics.lineTo(indicatorX, indicatorY + 3);
                graphics.lineTo(indicatorX + 2, indicatorY + 1);
                graphics.strokePath();
                break;
        }
        
        // Add to game group for cleanup
        sprite.scene.gameGroup.add(graphics);
    }
    
    // Get powerup effect data
    getPowerupData() {
        return this.powerupData[this.powerupType] || null;
    }
    
    // Check if this piece contains powerup minos (for line clear detection)
    containsPowerupCells() {
        return this.isPowerup && this.powerupType !== null;
    }
    
    // Get the positions of powerup cells in this piece
    getPowerupCellPositions() {
        if (!this.isPowerup || !this.powerupType) return [];
        
        const positions = [];
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    positions.push({
                        x: this.x + c,
                        y: this.y + r,
                        boardX: this.x + c,
                        boardY: this.y + r,
                        powerupType: this.powerupType
                    });
                }
            }
        }
        return positions;
    }
    
    // Create a regular powerup piece (for spawning)
    static createRandomPowerupPiece(rotationSystem = 'SRS', powerupType = null) {
        // Choose powerup type if not specified
        if (!powerupType) {
            const powerupTypes = ['del_even', 'free_fall'];
            powerupType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
        }
        
        // Choose random piece type
        const pieceTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
        
        // Create and return powerup piece
        return new PowerupMino(randomType, powerupType, rotationSystem);
    }
    
    // Create a specific powerup piece
    static createPowerupPiece(type, powerupType, rotationSystem = 'SRS') {
        return new PowerupMino(type, powerupType, rotationSystem);
    }
    
    // Check if piece should be a powerup (based on spawn rate)
    static shouldBePowerup(spawnRate = 0.05) {
        return Math.random() < spawnRate;
    }
}

// Powerup effect handler
class PowerupEffectHandler {
    constructor(gameScene) {
        this.gameScene = gameScene;
        this.activeEffects = [];
    }
    
    // Process powerup effects when lines are cleared
    processPowerupEffects(clearedLines, powerupCells) {
        if (!powerupCells || powerupCells.length === 0) {
            return; // No powerup minos in cleared lines
        }
        
        // Group powerup cells by type
        const powerupsByType = {};
        powerupCells.forEach(cell => {
            if (!powerupsByType[cell.powerupType]) {
                powerupsByType[cell.powerupType] = [];
            }
            powerupsByType[cell.powerupType].push(cell);
        });
        
        // Execute each type of powerup
        Object.keys(powerupsByType).forEach(powerupType => {
            this.executePowerup(powerupType, powerupsByType[powerupType]);
        });
    }
    
    // Execute specific powerup effect
    executePowerup(powerupType, powerupCells) {
        switch (powerupType) {
            case 'del_even':
                this.executeDeleteRowsEffect(powerupCells);
                break;
            case 'free_fall':
                this.executeGravityBurstEffect(powerupCells);
                break;
        }
    }
    
    // Delete every other row effect
    executeDeleteRowsEffect(powerupCells) {
        const config = {
            preserveTopRows: 2,  // Don't delete top 2 rows
            preserveBottomRows: 2, // Don't delete bottom 2 rows
            deletePattern: 'every_other' // Pattern: 'every_other', 'every_third'
        };
        
        const rowsToDelete = [];
        const rows = this.gameScene.board.rows;
        const cols = this.gameScene.board.cols;
        
        // Determine which rows to delete based on pattern
        for (let r = config.preserveTopRows; r < rows - config.preserveBottomRows; r++) {
            // Skip rows that were just cleared by normal line clear
            if (this.gameScene.clearedLines.includes(r)) continue;
            
            // Apply deletion pattern
            if (config.deletePattern === 'every_other') {
                // Delete every other row (alternating pattern)
                if (r % 2 === 0) { // Delete even rows
                    rowsToDelete.push(r);
                }
            }
            // Add more patterns as needed (every_third, etc.)
        }
        
        // Execute row deletions
        if (rowsToDelete.length > 0) {
            this.deleteRows(rowsToDelete);
            this.playPowerupEffectSound('del_even');
        }
    }
    
    // Gravity burst effect - force all pieces to fall to bottom
    executeGravityBurstEffect(powerupCells) {
        const config = {
            clearFilledLines: true,
            maxIterations: 10
        };
        
        let iteration = 0;
        let linesCleared = 0;
        
        do {
            iteration++;
            // Apply gravity to all columns independently
            this.applyColumnGravity();
            
            // Check for new filled lines and clear them
            if (config.clearFilledLines) {
                const newLines = this.findFilledLines();
                if (newLines.length > 0) {
                    this.clearLines(newLines);
                    linesCleared += newLines.length;
                }
            }
            
        } while (iteration < config.maxIterations);
        
        if (linesCleared > 0) {
            this.playPowerupEffectSound('free_fall');
        }
    }
    
    // Apply gravity column by column
    applyColumnGravity() {
        const rows = this.gameScene.board.rows;
        const cols = this.gameScene.board.cols;
        
        for (let col = 0; col < cols; col++) {
            // Extract column
            const column = [];
            for (let row = 0; row < rows; row++) {
                column.push(this.gameScene.board.grid[row][col]);
            }
            
            // Remove empty spaces (gravity)
            const compactedColumn = column.filter(cell => cell !== 0);
            
            // Fill column from bottom
            const newColumn = Array(rows).fill(0);
            for (let i = 0; i < compactedColumn.length; i++) {
                newColumn[rows - 1 - i] = compactedColumn[compactedColumn.length - 1 - i];
            }
            
            // Put column back
            for (let row = 0; row < rows; row++) {
                this.gameScene.board.grid[row][col] = newColumn[row];
            }
        }
    }
    
    // Find all filled lines in the board
    findFilledLines() {
        const filledLines = [];
        for (let r = 0; r < this.gameScene.board.rows; r++) {
            if (this.gameScene.board.grid[r].every(cell => cell !== 0)) {
                filledLines.push(r);
            }
        }
        return filledLines;
    }
    
    // Delete specific rows
    deleteRows(rowsToDelete) {
        const newGrid = [];
        const clearedSet = new Set(rowsToDelete);
        
        // Add all non-deleted rows to new grid
        for (let r = 0; r < this.gameScene.board.rows; r++) {
            if (!clearedSet.has(r)) {
                newGrid.push(this.gameScene.board.grid[r]);
            }
        }
        
        // Add empty rows at the top to maintain grid size
        const emptyRowsNeeded = rowsToDelete.length;
        for (let i = 0; i < emptyRowsNeeded; i++) {
            newGrid.unshift(Array(this.gameScene.board.cols).fill(0));
        }
        
        // Replace the entire grid
        this.gameScene.board.grid = newGrid;
    }
    
    // Clear specific lines (similar to existing clear logic)
    clearLines(linesToClear) {
        const newGrid = [];
        const clearedSet = new Set(linesToClear);
        
        // Add all non-cleared rows to new grid
        for (let r = 0; r < this.gameScene.board.rows; r++) {
            if (!clearedSet.has(r)) {
                newGrid.push(this.gameScene.board.grid[r]);
            }
        }
        
        // Add empty rows at the top to maintain grid size
        const emptyRowsNeeded = linesToClear.length;
        for (let i = 0; i < emptyRowsNeeded; i++) {
            newGrid.unshift(Array(this.gameScene.board.cols).fill(0));
        }
        
        this.gameScene.board.grid = newGrid;
    }
    
    // Play powerup-specific sound effects
    playPowerupEffectSound(powerupType) {
        if (!this.gameScene.sound) return;
        
        // Create different sound effects for each powerup type
        const soundKey = `powerup_${powerupType}`;
        let sound;
        
        try {
            // Try to load custom powerup sound, fallback to existing sounds
            if (this.gameScene.sound.get(soundKey)) {
                sound = this.gameScene.sound.add(soundKey, { volume: 0.8 });
            } else {
                // Fallback to existing sounds
                switch (powerupType) {
                    case 'del_even':
                        sound = this.gameScene.sound.add('clear', { volume: 0.8 });
                        break;
                    case 'free_fall':
                        sound = this.gameScene.sound.add('fall', { volume: 0.8 });
                        break;
                }
            }
            
            if (sound) {
                sound.play();
            }
        } catch (error) {
            console.warn(`Powerup sound effect failed for ${powerupType}:`, error);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PowerupMino, PowerupEffectHandler };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.PowerupMino = PowerupMino;
    window.PowerupEffectHandler = PowerupEffectHandler;
}