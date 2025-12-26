// TGM2NormalMode - Normal mode from TGM2: 300 levels with item blocks
// Features: Special items at levels 100 ("Free Fall") and 200 ("Del Even"), fixed timings

class TGM2NormalMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM2 Normal';
        this.modeId = 'tgm2_normal';

        // TGM2 Normal mode configuration
        this.config = {
            gravity: { type: 'tgm2_normal' },
            das: 16/60,                    // TGM2 Normal DAS (16 frames)
            arr: 1/60,                     // ARR is always 1/60
            are: 27/60,                    // TGM2 Normal ARE (27 frames)
            lineAre: 27/60,                // Line ARE mirrors ARE (official table lacks separate value)
            lockDelay: 30/60,              // Lock delay (30 frames)
            lineClearDelay: 40/60,         // Line clear delay (40 frames)
            nextPieces: 1,                 // Standard next queue
            holdEnabled: false,            // TGM2 supports hold
            ghostEnabled: true,            // Ghost piece enabled
            levelUpType: 'piece',          // Level up per piece
            lineClearBonus: 1,
            gravityLevelCap: 300,          // TGM2 Normal caps at 300
            specialMechanics: {
                itemBlocks: true,          // Enable item blocks at 100/200
                sectionStops: [99, 199, 299] // Level stops, but 99/199 are bypassed by items
            }
        };

        // TGM2 scoring (no grading)
        this.tgm2Score = 0;
        this.finishTimeBonusApplied = false;
        this.finishTimeBonus = 0;
        
        // Item block system
        this.itemBlockSpawned = {
            free_fall: false,    // Level 100 item
            del_even: false      // Level 200 item
        };
        this.itemBlockActive = null; // Currently active item block
        this.itemBlockQueue = [];    // Queue of item blocks to spawn
        this.itemAnimationActive = false; // Flag for active item animation
        
        // Game progression tracking
        this.creditsStarted = false;
        this.creditsTimer = 0;
        this.creditsDuration = 30; // 30s credits roll per spec
        
    }
    
    // Get mode configuration
    getModeConfig() {
        return {
            gravity: { type: 'tgm2_normal' },
            das: 14/60,                    // TGM2 Normal DAS (14 frames)
            arr: 1/60,                     // ARR is always 1/60
            are: 25/60,                    // TGM2 Normal ARE (25 frames)
            lineAre: 25/60,                // Mirror ARE (table lacks line ARE column)
            lockDelay: 30/60,              // Lock delay (30 frames)
            nextPieces: 1,                 // Standard next queue
            holdEnabled: false,            // TGM2 supports hold
            ghostEnabled: true,            // Ghost piece enabled
            levelUpType: 'piece',          // Level up per piece
            lineClearBonus: 1,
            gravityLevelCap: 300,          // TGM2 Normal caps at 300
            hasGrading: false,
            specialMechanics: {
                itemBlocks: true,          // Enable item blocks at 100/200
                sectionStops: [99, 199, 299] // Level stops, but 99/199 are bypassed by items
            }
        };
    }

    // Get mode configuration
    getConfig() {
        return {
            ...this.getDefaultConfig(),
            ...this.getModeConfig()
        };
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
    }
    
    // Handle level progression and item block spawning
    onLevelUpdate(level, oldLevel, updateType, amount) {
        // Normal mode: only stop at 299 (cap 300). +1 per piece spawn (except first piece handled by caller),
        // +1 per cleared line (up to 4).
        const atStopLevel = level === 299 || level >= 300;
        let newLevel = level;

        if (updateType === 'piece') {
            if (!atStopLevel) {
                newLevel = Math.min(level + 1, 300);
            }
        } else if (updateType === 'lines') {
            const lineIncrement = Math.min(Math.max(amount || 0, 0), 4);
            newLevel = Math.min(level + lineIncrement, 300);
        }

        // Check for item block spawning
        if (!this.itemBlockSpawned.free_fall && newLevel >= 100) {
            this.queueItemBlock('free_fall');
            this.itemBlockSpawned.free_fall = true;
        }

        if (!this.itemBlockSpawned.del_even && newLevel >= 200) {
            this.queueItemBlock('del_even');
            this.itemBlockSpawned.del_even = true;
        }

        return newLevel;
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
    
    // Handle line clear with item block effects
    handleLineClear(gameScene, linesCleared, pieceType = null) {
        // Check if the cleared piece was an item block
        if (gameScene.currentPiece && gameScene.currentPiece.isItemBlock) {
            this.activateItemBlock(gameScene.currentPiece.itemType, gameScene);
        }

        // Handle TGM2 scoring
        this.updateTGM2Score(gameScene, linesCleared, pieceType);

        // Check for credit roll start
        this.checkCreditRoll(gameScene);
    }
    
    
    // Activate item block effect
    activateItemBlock(itemType, gameScene) {
        console.log(`TGM2 Normal: Activated ${itemType} item block`);

        // Set animation active flag
        this.itemAnimationActive = true;

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

        // Show item activation message (2 seconds)
        this.showItemMessage(gameScene, itemType);
    }
    
    // Free Fall: Eliminates all holes with animation
    activateFreeFall(gameScene) {
        console.log('TGM2 Normal: Free Fall activated - eliminating holes');

        // First, shake the matrix up and down twice
        this.shakeMatrix(gameScene, () => {
            // After shake, apply gravity animation
            this.animateFreeFall(gameScene);
        });
    }

    // Shake the matrix up and down twice
    shakeMatrix(gameScene, callback) {
        const shakeAmount = 10;
        const shakeDuration = 100; // ms per shake

        // First shake down
        gameScene.tweens.add({
            targets: gameScene.gameGroup,
            y: shakeAmount,
            duration: shakeDuration,
            ease: 'Power2',
            yoyo: true,
            onComplete: () => {
                // Second shake down
                gameScene.tweens.add({
                    targets: gameScene.gameGroup,
                    y: shakeAmount,
                    duration: shakeDuration,
                    ease: 'Power2',
                    yoyo: true,
                    onComplete: callback
                });
            }
        });
    }

    // Animate the free fall effect
    animateFreeFall(gameScene) {
        const rows = gameScene.board.rows;
        const cols = gameScene.board.cols;

        // Create a copy of the current board state
        const originalGrid = gameScene.board.grid.map(row => [...row]);

        // Calculate new positions for each mino
        const animations = [];

        for (let col = 0; col < cols; col++) {
            // Extract column
            const column = [];
            for (let row = 0; row < rows; row++) {
                column.push(originalGrid[row][col]);
            }

            // Remove empty spaces (gravity)
            const compactedColumn = column.filter(cell => cell !== 0);

            // Track which minos need to move and how far
            let compactedIndex = 0;
            for (let row = rows - 1; row >= 0; row--) {
                if (originalGrid[row][col] !== 0) {
                    const newRow = rows - 1 - compactedIndex;
                    const distance = row - newRow;

                    if (distance > 0) {
                        // This mino needs to fall
                        animations.push({
                            col: col,
                            fromRow: row,
                            toRow: newRow,
                            color: originalGrid[row][col]
                        });
                    }
                    compactedIndex++;
                }
            }
        }

        // Apply gravity to board immediately
        for (let col = 0; col < cols; col++) {
            const column = [];
            for (let row = 0; row < rows; row++) {
                column.push(originalGrid[row][col]);
            }

            const compactedColumn = column.filter(cell => cell !== 0);
            const newColumn = Array(rows).fill(0);
            for (let i = 0; i < compactedColumn.length; i++) {
                newColumn[rows - 1 - i] = compactedColumn[compactedColumn.length - 1 - i];
            }

            for (let row = 0; row < rows; row++) {
                gameScene.board.grid[row][col] = newColumn[row];
            }
        }

        // Animate the falling minos
        if (animations.length > 0) {
            const fallDuration = 500; // 0.5 seconds
            const cellSize = gameScene.cellSize;
            const matrixOffsetX = gameScene.matrixOffsetX;
            const matrixOffsetY = gameScene.matrixOffsetY;

            animations.forEach(anim => {
                const textureKey = gameScene.rotationSystem === 'ARS' ? 'mino_ars' : 'mino_srs';
                const texture = gameScene.textures ? gameScene.textures.get(textureKey) : null;
                const textureSource = texture && texture.source ? texture.source[0] : null;
                const hasValidTextureSource = !!texture && !!textureSource && !!textureSource.image;

                const startX = matrixOffsetX + anim.col * cellSize;
                const startY = matrixOffsetY + (anim.fromRow - 2) * cellSize;
                const endY = matrixOffsetY + (anim.toRow - 2) * cellSize;

                if (hasValidTextureSource) {
                    const sprite = gameScene.add.sprite(startX, startY, textureKey);
                    sprite.setDisplaySize(cellSize, cellSize);
                    sprite.setTint(anim.color);

                    gameScene.tweens.add({
                        targets: sprite,
                        y: endY,
                        duration: fallDuration,
                        ease: 'Power2',
                        onComplete: () => {
                            sprite.destroy();
                        }
                    });
                } else {
                    const graphics = gameScene.add.graphics();
                    graphics.fillStyle(anim.color);
                    graphics.fillRect(startX - cellSize / 2, startY - cellSize / 2, cellSize, cellSize);

                    gameScene.tweens.add({
                        targets: graphics,
                        y: endY - startY,
                        duration: fallDuration,
                        ease: 'Power2',
                        onComplete: () => {
                            graphics.destroy();
                        }
                    });
                }
            });
        }
    }
    
    // Del Even: Clears every other row with animation
    activateDelEven(gameScene) {
        console.log('TGM2 Normal: Del Even activated - clearing every other row');

        const rowsToDelete = [];
        const rows = gameScene.board.rows;

        // Identify every other row (even-numbered rows)
        for (let r = 0; r < rows; r++) {
            if (r % 2 === 0) { // Delete even rows
                rowsToDelete.push(r);
            }
        }

        if (rowsToDelete.length > 0) {
            this.animateDelEven(gameScene, rowsToDelete);
        }
    }

    // Animate DEL EVEN effect - fade rows one by one
    animateDelEven(gameScene, rowsToDelete) {
        const cellSize = gameScene.cellSize;
        const matrixOffsetX = gameScene.matrixOffsetX;
        const matrixOffsetY = gameScene.matrixOffsetY;
        const fadeDuration = 300; // ms per row
        const delayBetweenRows = 100; // ms delay between starting each row's fade

        let currentIndex = 0;

        const fadeNextRow = () => {
            if (currentIndex >= rowsToDelete.length) {
                // All rows faded, now delete them
                this.deleteRows(gameScene, rowsToDelete);
                return;
            }

            const row = rowsToDelete[currentIndex];
            const sprites = [];

            // Create sprites for all minos in this row
            for (let col = 0; col < gameScene.board.cols; col++) {
                if (gameScene.board.grid[row][col] !== 0) {
                    const textureKey = gameScene.rotationSystem === 'ARS' ? 'mino_ars' : 'mino_srs';
                    const texture = gameScene.textures ? gameScene.textures.get(textureKey) : null;
                    const textureSource = texture && texture.source ? texture.source[0] : null;
                    const hasValidTextureSource = !!texture && !!textureSource && !!textureSource.image;
                    if (hasValidTextureSource) {
                        const sprite = gameScene.add.sprite(
                            matrixOffsetX + col * cellSize,
                            matrixOffsetY + (row - 2) * cellSize,
                            textureKey
                        );
                        sprite.setDisplaySize(cellSize, cellSize);
                        sprite.setTint(gameScene.board.grid[row][col]);
                        sprites.push(sprite);
                    } else {
                        const graphics = gameScene.add.graphics();
                        graphics.fillStyle(gameScene.board.grid[row][col]);
                        graphics.fillRect(
                            matrixOffsetX + col * cellSize - cellSize / 2,
                            matrixOffsetY + (row - 2) * cellSize - cellSize / 2,
                            cellSize,
                            cellSize,
                        );
                        sprites.push(graphics);
                    }
                }
            }

            // Fade all sprites in this row
            if (sprites.length > 0) {
                gameScene.tweens.add({
                    targets: sprites,
                    alpha: 0,
                    duration: fadeDuration,
                    ease: 'Power2',
                    onComplete: () => {
                        // Destroy sprites after fade
                        sprites.forEach(sprite => sprite.destroy());
                        currentIndex++;
                        // Schedule next row after delay
                        gameScene.time.delayedCall(delayBetweenRows, fadeNextRow);
                    }
                });
            } else {
                // No sprites in this row, move to next
                currentIndex++;
                gameScene.time.delayedCall(delayBetweenRows, fadeNextRow);
            }
        };

        // Start fading the first row
        fadeNextRow();
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
            
            // Fade out after 2 seconds and end animation
            gameScene.time.delayedCall(2000, () => {
                itemText.destroy();
                this.itemAnimationActive = false;
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
        
        const lineScore = (base + soft + (2 * sonic)) * linesCleared * combo * bravo;
        const lineScoreWithMultiplier = lineScore * 6; // Normal mode multiplies line clear score by 6
        const totalScore = lineScoreWithMultiplier + levelBonus + speedBonus;
        
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
            // Apply finish time bonus at roll start (once)
            this.applyFinishTimeBonus(gameScene);
            
            // Start slow 20G credit roll
            gameScene.startCredits(30);
            
            console.log('TGM2 Normal: Started slow 20G credit roll');
        }
    }
    
    
    // Update method (called every frame)
    update(gameScene, deltaTime) {
        // Handle credit roll
        if (this.creditsStarted) {
            this.creditsTimer += deltaTime;

            if (this.creditsTimer >= this.creditsDuration) {
                this.creditsStarted = false;
                gameScene.showGameOverScreen();
            }
        }
    }
    
    
    // Handle game over
    onGameOver(gameScene) {
        // Apply Normal mode finish time bonus before recording score
        this.applyFinishTimeBonus(gameScene);

        // Check for final rankings
        this.checkFinalRankings(gameScene);
        
        // Save best score
        this.saveBestScore(gameScene);
    }
    
    // Apply the Normal mode finish time bonus (up to 300 seconds)
    applyFinishTimeBonus(gameScene) {
        if (this.finishTimeBonusApplied) {
            return;
        }

        const seconds = Math.max(0, gameScene.currentTime || 0);
        const remaining = Math.max(0, Math.ceil(300 - seconds));
        this.finishTimeBonus = 1253 * remaining;
        this.tgm2Score += this.finishTimeBonus;
        this.finishTimeBonusApplied = true;

        if (gameScene.scoreText) {
            gameScene.scoreText.setText(this.tgm2Score.toString());
        }
    }

    // Check final rankings
    checkFinalRankings(gameScene) {
        const finalGrade = this.displayedGrade;
        const rankingType = this.creditsStarted ? 'credit_roll' : 'regular';
        
        console.log(`TGM2 Normal Final Ranking: ${finalGrade} (${rankingType})`);
    }
    
    // Save best score for TGM2 Normal mode
    saveBestScore(gameScene) {
        const entry = {
            score: this.tgm2Score,
            level: gameScene.level,
            time: `${Math.floor(gameScene.currentTime / 60)}:${Math.floor(gameScene.currentTime % 60).toString().padStart(2, '0')}.${Math.floor((gameScene.currentTime % 1) * 100).toString().padStart(2, '0')}`,
            pps: gameScene.conventionalPPS != null ? Number(gameScene.conventionalPPS.toFixed(2)) : undefined
        };
        if (typeof gameScene.saveLeaderboardEntry === 'function') {
            gameScene.saveLeaderboardEntry(this.modeId, entry);
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
            time: '0:00.00'
        };
    }
    
    // Reset mode state for new game
    reset() {
        super.reset();

        this.tgm2Score = 0;

        // Reset item block system
        this.itemBlockSpawned.free_fall = false;
        this.itemBlockSpawned.del_even = false;
        this.itemBlockActive = null;
        this.itemBlockQueue = [];
        this.itemAnimationActive = false;

        // Reset credit roll
        this.creditsStarted = false;
        this.creditsTimer = 0;
        this.finishTimeBonusApplied = false;
        this.finishTimeBonus = 0;
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