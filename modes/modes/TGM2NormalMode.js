// TGM2NormalMode - Normal mode from TGM2: 300 levels with item blocks
// Features: Special items at levels 100 ("Free Fall") and 200 ("Del Even"), fixed timings

class TGM2NormalMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM2 Normal';
        this.modeId = 'tgm2_normal';
        
        // Normal mode configuration
        this.config = {
            gravity: { type: 'tgm2_normal' }, // Use TGM2 Normal gravity curve
            das: 16/60,                    // Standard TGM2 Normal DAS
            arr: 2/60,                     // Standard TGM2 Normal ARR  
            are: 27/60,                    // TGM2 Normal ARE timing
            lineAre: 27/60,                // Line clear ARE
            lockDelay: 30/60,              // TGM2 Normal lock delay
            lineClearDelay: 40/60,         // Line clear delay
            nextPieces: 4,                 // Standard next queue
            holdEnabled: true,             // TGM2 supports hold
            ghostEnabled: true,            // Ghost piece enabled
            levelUpType: 'piece',          // Level up per piece
            lineClearBonus: 1,
            gravityLevelCap: 300,          // Cap at level 300
            specialMechanics: {
                itemBlocks: true,          // Enable item block system
                tgm2Grading: true,         // Use TGM2 grading system
                creditRoll: true,          // Credit roll at end
                slowCreditRoll: true       // Slow 20G credit roll
            }
        };
        
        // TGM2 grade display
        this.displayedGrade = '9';
        
        // TGM2 scoring
        this.tgm2Score = 0;
        
        // Item block system
        this.itemBlockSpawned = {
            free_fall: false,    // Level 100 item
            del_even: false      // Level 200 item
        };
        this.itemBlockActive = null; // Currently active item block
        this.itemBlockQueue = [];    // Queue of item blocks to spawn
        
        // Game progression tracking
        this.creditsStarted = false;
        this.creditsTimer = 0;
        this.creditsDuration = 61.60; // Same as other TGM2 modes
        
        // Initialize TGM2 grading system
        this.tgm2Grading = new TGM2GradingSystem();
    }
    
    // Get mode configuration
    getConfig() {
        return this.config;
    }
    
    // Get mode name
    getName() {
        return this.modeName;
    }
    
    // Get mode ID
    getModeId() {
        return this.modeId;
    }
    
    // Get gravity speed using TGM2 Normal curve (0-300)
    getGravitySpeed(level) {
        // TGM2 Normal mode gravity curve based on tgm2modes.md specifications
        let internalGravity;
        
        if (level < 8) internalGravity = 4;
        else if (level < 19) internalGravity = 5;
        else if (level < 35) internalGravity = 6;
        else if (level < 40) internalGravity = 8;
        else if (level < 50) internalGravity = 10;
        else if (level < 60) internalGravity = 12;
        else if (level < 70) internalGravity = 16;
        else if (level < 80) internalGravity = 32;
        else if (level < 90) internalGravity = 48;
        else if (level < 100) internalGravity = 64;
        else if (level < 108) internalGravity = 4;
        else if (level < 119) internalGravity = 5;
        else if (level < 125) internalGravity = 6;
        else if (level < 131) internalGravity = 8;
        else if (level < 139) internalGravity = 12;
        else if (level < 149) internalGravity = 32;
        else if (level < 156) internalGravity = 48;
        else if (level < 164) internalGravity = 80;
        else if (level < 174) internalGravity = 112;
        else if (level < 180) internalGravity = 128;
        else if (level < 200) internalGravity = 144;
        else if (level < 212) internalGravity = 16;
        else if (level < 221) internalGravity = 48;
        else if (level < 232) internalGravity = 80;
        else if (level < 244) internalGravity = 112;
        else if (level < 256) internalGravity = 144;
        else if (level < 267) internalGravity = 176;
        else if (level < 277) internalGravity = 192;
        else if (level < 287) internalGravity = 208;
        else if (level < 295) internalGravity = 224;
        else if (level < 300) internalGravity = 240;
        else internalGravity = 5120; // 20G for credit roll
        
        return internalGravity;
    }
    
    // Get timing values (fixed for Normal mode)
    getDAS() {
        return this.config.das;
    }
    
    getARR() {
        return this.config.arr;
    }
    
    getARE() {
        return this.config.are;
    }
    
    getLineARE() {
        return this.config.lineAre;
    }
    
    getLockDelay() {
        return this.config.lockDelay;
    }
    
    getLineClearDelay() {
        return this.config.lineClearDelay;
    }
    
    // Initialize mode for game scene
    initializeForGameScene(gameScene) {
        super.initializeForGameScene(gameScene);
        
        // Initialize TGM2 grading system level
        this.tgm2Grading.setLevel(gameScene.level);
        
        console.log('TGM2 Normal Mode initialized with item block system');
    }
    
    // Handle level progression and item block spawning
    onLevelUpdate(level, oldLevel, updateType, amount) {
        // Check for item block spawning
        if (!this.itemBlockSpawned.free_fall && level >= 100) {
            this.queueItemBlock('free_fall');
            this.itemBlockSpawned.free_fall = true;
        }

        if (!this.itemBlockSpawned.del_even && level >= 200) {
            this.queueItemBlock('del_even');
            this.itemBlockSpawned.del_even = true;
        }
        
        return level;
    }
    
    // Queue item block for spawning
    queueItemBlock(itemType) {
        this.itemBlockQueue.push(itemType);
        console.log(`TGM2 Normal: Queued ${itemType} item block for spawning`);
    }
    
    // Generate next piece (supports item blocks)
    generateNextPiece(gameScene) {
        // Check if we have item blocks to spawn
        if (this.itemBlockQueue.length > 0) {
            const itemType = this.itemBlockQueue.shift();
            return this.createItemBlockPiece(itemType, gameScene.rotationSystem);
        }
        
        // Generate regular piece using game's existing system
        return gameScene.generateTGM1Piece();
    }
    
    // Create item block piece
    createItemBlockPiece(itemType, rotationSystem) {
        // Item blocks are special pieces that activate when cleared
        const piece = new PowerupMino('O', itemType, rotationSystem); // Use O piece for item blocks
        
        // Set custom colors for item blocks
        switch (itemType) {
            case 'free_fall':
                piece.color = 0x00FFFF; // Cyan for "Free Fall"
                break;
            case 'del_even':
                piece.color = 0xFF8000; // Orange for "Del Even"
                break;
        }
        
        piece.isItemBlock = true;
        piece.itemType = itemType;
        
        return piece;
    }
    
    // Handle line clear with TGM2 grading and item block effects
    handleLineClear(gameScene, linesCleared, pieceType = null) {
        // Check if the cleared piece was an item block
        if (gameScene.currentPiece && gameScene.currentPiece.isItemBlock) {
            this.activateItemBlock(gameScene.currentPiece.itemType, gameScene);
        }
        
        // Handle TGM2 grading system
        if (this.config.specialMechanics.tgm2Grading) {
            // Update level in grading system
            this.tgm2Grading.setLevel(gameScene.level);
            
            // Calculate combo size for TGM2
            const comboSize = this.calculateTGM2ComboSize(gameScene);
            
            // Check if this was a Tetris
            const isTetris = linesCleared === 4;
            
            // Award grade points
            const gradePoints = this.tgm2Grading.awardPoints(linesCleared, comboSize, gameScene.level, isTetris);
            
            // Update displayed grade
            this.displayedGrade = this.tgm2Grading.getDisplayedGrade();
            
            // Update grade display in game
            if (gameScene.gradeText) {
                gameScene.gradeText.setText(this.displayedGrade);
            }
            
            // Trigger grade up animation if needed
            if (this.tgm2Grading.getGradeUpAnimationState()) {
                this.triggerGradeUpAnimation(gameScene);
            }
        }
        
        // Handle TGM2 scoring
        this.updateTGM2Score(gameScene, linesCleared, pieceType);
        
        // Check for credit roll start
        this.checkCreditRoll(gameScene);
    }
    
    // Calculate TGM2 combo size
    calculateTGM2ComboSize(gameScene) {
        if (gameScene.comboCount === -1) {
            return 1; // No combo active
        }
        
        // TGM2 combo is based on consecutive non-single clears
        return Math.max(1, gameScene.comboCount + 1);
    }
    
    // Activate item block effect
    activateItemBlock(itemType, gameScene) {
        console.log(`TGM2 Normal: Activated ${itemType} item block`);
        
        switch (itemType) {
            case 'free_fall':
                this.activateFreeFall(gameScene);
                break;
            case 'del_even':
                this.activateDelEven(gameScene);
                break;
        }
        
        // Play item activation sound
        if (gameScene.sound) {
            const itemSound = gameScene.sound.add('gradeup', { volume: 0.8 });
            itemSound.play();
        }
        
        // Show item activation message
        this.showItemMessage(gameScene, itemType);
    }
    
    // Free Fall: Eliminates all holes
    activateFreeFall(gameScene) {
        console.log('TGM2 Normal: Free Fall activated - eliminating holes');
        
        // Apply gravity to all columns to eliminate holes
        const rows = gameScene.board.rows;
        const cols = gameScene.board.cols;
        
        for (let col = 0; col < cols; col++) {
            // Extract column
            const column = [];
            for (let row = 0; row < rows; row++) {
                column.push(gameScene.board.grid[row][col]);
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
                gameScene.board.grid[row][col] = newColumn[row];
            }
        }
    }
    
    // Del Even: Clears every other row
    activateDelEven(gameScene) {
        console.log('TGM2 Normal: Del Even activated - clearing every other row');
        
        const rowsToDelete = [];
        const rows = gameScene.board.rows;
        
        // Delete every other row (even-numbered rows)
        for (let r = 0; r < rows; r++) {
            if (r % 2 === 0) { // Delete even rows
                rowsToDelete.push(r);
            }
        }
        
        if (rowsToDelete.length > 0) {
            this.deleteRows(gameScene, rowsToDelete);
        }
    }
    
    // Delete specific rows
    deleteRows(gameScene, rowsToDelete) {
        const newGrid = [];
        const clearedSet = new Set(rowsToDelete);
        
        // Add all non-deleted rows to new grid
        for (let r = 0; r < gameScene.board.rows; r++) {
            if (!clearedSet.has(r)) {
                newGrid.push(gameScene.board.grid[r]);
            }
        }
        
        // Add empty rows at the top to maintain grid size
        const emptyRowsNeeded = rowsToDelete.length;
        for (let i = 0; i < emptyRowsNeeded; i++) {
            newGrid.unshift(Array(gameScene.board.cols).fill(0));
        }
        
        // Replace the entire grid
        gameScene.board.grid = newGrid;
    }
    
    // Show item activation message
    showItemMessage(gameScene, itemType) {
        let message = '';
        switch (itemType) {
            case 'free_fall':
                message = 'FREE FALL!';
                break;
            case 'del_even':
                message = 'DEL EVEN!';
                break;
        }
        
        if (message && gameScene.add) {
            const itemText = gameScene.add.text(gameScene.windowWidth / 2, gameScene.windowHeight / 3, message, {
                fontSize: '48px',
                fill: '#ffff00',
                stroke: '#000',
                strokeThickness: 3,
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            
            gameScene.gameGroup.add(itemText);
            
            // Fade out after 2 seconds
            gameScene.time.delayedCall(2000, () => {
                itemText.destroy();
            });
        }
    }
    
    // Update TGM2 score using official TGM2 (TAP) scoring formula
    updateTGM2Score(gameScene, linesCleared, pieceType) {
        if (linesCleared === 0) return;
        
        // Official TGM2 (TAP) scoring formula: Score = (⌈(Level + Lines) / 4⌉ + Soft + (2 × Sonic)) × Lines × Combo × Bravo + ⌈(Level After Clear) / 2⌉ + (Speed × 7)
        const levelBeforeClear = gameScene.level; // Level just before line clear
        const levelAfterClear = gameScene.level; // Level just after line clear
        const base = Math.ceil((levelBeforeClear + linesCleared) / 4);
        const soft = gameScene.softDropFrames || 0; // Cumulative frames of Down held during piece's active time
        const sonic = gameScene.maxSonicDrop || 0; // Single greatest sonic drop during piece's active time
        
        // Calculate combo (reset to 1 if previous piece cleared no lines)
        let combo;
        if (gameScene.comboCount <= 0) {
            combo = 1;
        } else {
            combo = gameScene.comboCount + (2 * linesCleared) - 2;
        }
        
        const bravo = this.isPerfectClear(gameScene) ? 4 : 1; // 4 for perfect clear, otherwise 1
        
        // Calculate level bonus after clear
        const levelBonus = Math.ceil(levelAfterClear / 2);
        
        // Calculate speed bonus
        const lockDelay = Math.round(this.getLockDelay() * 60); // Convert to frames
        const activeTime = this.getActiveTime(gameScene) || 1; // Minimum 1 frame
        const speed = Math.max(0, lockDelay - activeTime);
        const speedBonus = speed * 7;
        
        const baseScore = (base + soft + (2 * sonic)) * linesCleared * combo * bravo;
        const totalScore = baseScore + levelBonus + speedBonus;
        
        this.tgm2Score += totalScore;
        
        // Update score display
        if (gameScene.scoreText) {
            gameScene.scoreText.setText(this.tgm2Score.toString());
        }
    }
    
    // Get active time for speed calculation
    getActiveTime(gameScene) {
        // This would track the number of frames the piece was active
        // For now, return a default value that would be tracked in the game
        return gameScene.currentPieceActiveTime || 10; // Default 10 frames
    }
    
    // Check if last line clear was a perfect clear
    isPerfectClear(gameScene) {
        // Check if the playfield is completely empty after line clear
        // This would require access to the board state after clear
        // For now, return false as perfect clear detection is complex
        return false;
    }
    

    
    // Check for credit roll start
    checkCreditRoll(gameScene) {
        if (gameScene.level >= 300 && !this.creditsStarted) {
            this.creditsStarted = true;
            
            // Start slow 20G credit roll
            gameScene.startCredits();
            
            console.log('TGM2 Normal: Started slow 20G credit roll');
        }
    }
    
    // Trigger grade up animation
    triggerGradeUpAnimation(gameScene) {
        if (gameScene.sound) {
            const gradeUpSound = gameScene.sound.add('gradeup', { volume: 0.6 });
            gradeUpSound.play();
        }
        
        // Flash grade text
        if (gameScene.gradeText) {
            gameScene.gradeText.setTint(0xffff00);
            gameScene.time.delayedCall(200, () => {
                gameScene.gradeText.setTint(0xffffff);
            });
        }
    }
    
    // Update TGM2 grading system decay (called every frame)
    update(gameScene, deltaTime) {
        if (this.config.specialMechanics.tgm2Grading) {
            // Update TGM2 grading system decay
            this.tgm2Grading.update(deltaTime);
            
            // Update game state for decay control
            const hasControl = !gameScene.areActive;
            const hasActiveCombo = gameScene.comboCount >= 1 && gameScene.lastClearType !== 'single';
            this.tgm2Grading.setGameState(hasControl, hasActiveCombo);
            
            // Update level in grading system
            this.tgm2Grading.setLevel(gameScene.level);
        }
        
        // Handle credit roll
        if (this.creditsStarted) {
            this.creditsTimer += deltaTime;
            
            if (this.creditsTimer >= this.creditsDuration) {
                this.creditsStarted = false;
                gameScene.showGameOverScreen();
            }
        }
    }
    
    // Get current displayed grade
    getDisplayedGrade() {
        return this.displayedGrade;
    }
    
    // Handle game over
    onGameOver(gameScene) {
        // Check for final rankings
        this.checkFinalRankings(gameScene);
        
        // Save best score
        this.saveBestScore(gameScene);
    }
    
    // Check final rankings
    checkFinalRankings(gameScene) {
        const finalGrade = this.displayedGrade;
        const rankingType = this.creditsStarted ? 'credit_roll' : 'regular';
        
        console.log(`TGM2 Normal Final Ranking: ${finalGrade} (${rankingType})`);
    }
    
    // Save best score for TGM2 Normal mode
    saveBestScore(gameScene) {
        const key = `bestScore_${this.modeId}`;
        const currentBest = this.getBestScore(this.modeId);
        const newScore = {
            score: this.tgm2Score,
            level: gameScene.level,
            grade: this.displayedGrade,
            time: `${Math.floor(gameScene.currentTime / 60)}:${Math.floor(gameScene.currentTime % 60).toString().padStart(2, '0')}.${Math.floor((gameScene.currentTime % 1) * 100).toString().padStart(2, '0')}`,
            gradePoints: this.tgm2Grading.totalGradePoints,
            internalGrade: this.tgm2Grading.internalGrade
        };
        
        // Update if better score
        if (newScore.score > currentBest.score) {
            localStorage.setItem(key, JSON.stringify(newScore));
        }
    }
    
    // Get best score for this mode
    getBestScore(modeId) {
        const key = `bestScore_${modeId}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return { 
            score: 0, 
            level: 0, 
            grade: '9', 
            time: '0:00.00',
            gradePoints: 0,
            internalGrade: 0
        };
    }
    
    // Reset mode state for new game
    reset() {
        super.reset();
        
        // Reset TGM2 grading system
        this.tgm2Grading.reset();
        this.displayedGrade = '9';
        this.tgm2Score = 0;
        
        // Reset item block system
        this.itemBlockSpawned.free_fall = false;
        this.itemBlockSpawned.del_even = false;
        this.itemBlockActive = null;
        this.itemBlockQueue = [];
        
        // Reset credit roll
        this.creditsStarted = false;
        this.creditsTimer = 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM2NormalMode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM2NormalMode = TGM2NormalMode;
}