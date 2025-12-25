// TGM2Mode - TGM2 implementation with powerup mino support
// Combines TGM2's internal grade point system with powerup mino mechanics

class TGM2Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM2';
        this.modeId = 'tgm2';
        
        // Initialize TGM2 grading system
        this.tgm2Grading = new TGM2GradingSystem();
        
        // Powerup mino system
        this.powerupHandler = null; // Will be set when game scene is available
        this.powerupSpawnRate = 0.05; // 5% chance for powerup minos
        this.powerupTypes = ['del_even', 'free_fall'];
        
        // TGM2-specific configuration
        this.config = {
            gravity: { type: 'tgm2' }, // Use TGM2 gravity curve
            das: 16/60,                    // TGM2 DAS (16 frames)
            arr: 1/60,                     // ARR is always 1/60
            are: 27/60,                    // TGM2 ARE timing (27 frames)
            lineAre: 27/60,                // Line ARE matches ARE per tgm2modes.md
            lockDelay: 30/60,              // Lock delay (30 frames)
            lineClearDelay: 40/60,         // Line clear delay (40 frames)
            nextPieces: 4,                 // Standard next queue
            holdEnabled: true,             // TGM2 supports hold
            ghostEnabled: true,            // Ghost piece enabled
            levelUpType: 'piece',          // Level up per piece
            lineClearBonus: 1,
            gravityLevelCap: 999,
            specialMechanics: {
                powerupMinios: false,      // Disable powerup minos (only in TGM2 Normal)
                tgm2Grading: true,         // Use TGM2 grading system
                sectionStops: true,        // TGM2 has section stops
                gradePointSystem: true     // Use grade points instead of score
            }
        };
        
        // TGM2 grade display (different from TGM1)
        this.displayedGrade = '9';
        
        // TGM2 scoring (separate from grading system)
        this.tgm2Score = 0;
        
        // TGM2-specific gameplay tracking
        this.sectionStops = [99, 199, 299, 399, 499, 599, 699, 799, 899, 998, 999];
        this.currentSection = 0;
        
        // Credit roll system
        this.creditsActive = false;
        this.creditsTimer = 0;
        this.creditsDuration = 61.60; // Same as TGM1
        this.level999Reached = false;
        
        // M-Roll and Fading Roll tracking for highest rankings
        this.mRollUnlocked = false;
        this.fadingRollActive = false;
        this.linesClearedInMRoll = 0;
    }
    
    // Get mode configuration
    getConfig() {
        return this.config;
    }

    // Timing getter methods
    getDAS() { return this.config.das; }
    getARR() { return this.config.arr; }
    getARE() { return this.config.are; }
    getLineARE() { return this.config.lineAre; }
    getLockDelay() { return this.config.lockDelay; }
    getLineClearDelay() { return this.config.lineClearDelay; }
    
    // Get mode name
    getName() {
        return this.modeName;
    }
    
    // Get mode ID
    getModeId() {
        return this.modeId;
    }
    
    // Get gravity speed using TGM2 curve
    getGravitySpeed(level) {
        // TGM2 has a different gravity curve than TGM1
        // Implementation based on TGM2 internal gravity specifications
        
        let internalGravity;
        
        if (level < 30) internalGravity = 4;
        else if (level < 35) internalGravity = 6;
        else if (level < 40) internalGravity = 8;
        else if (level < 50) internalGravity = 10;
        else if (level < 60) internalGravity = 12;
        else if (level < 70) internalGravity = 16;
        else if (level < 80) internalGravity = 32;
        else if (level < 90) internalGravity = 48;
        else if (level < 100) internalGravity = 64;
        else if (level < 120) internalGravity = 80;
        else if (level < 140) internalGravity = 96;
        else if (level < 160) internalGravity = 112;
        else if (level < 170) internalGravity = 128;
        else if (level < 200) internalGravity = 144;
        else if (level < 220) internalGravity = 4;
        else if (level < 230) internalGravity = 32;
        else if (level < 233) internalGravity = 64;
        else if (level < 236) internalGravity = 96;
        else if (level < 239) internalGravity = 128;
        else if (level < 243) internalGravity = 160;
        else if (level < 247) internalGravity = 192;
        else if (level < 251) internalGravity = 224;
        else if (level < 300) internalGravity = 256; // 1G
        else if (level < 330) internalGravity = 512; // 2G
        else if (level < 360) internalGravity = 768; // 3G
        else if (level < 400) internalGravity = 1024; // 4G
        else if (level < 420) internalGravity = 1280; // 5G
        else if (level < 450) internalGravity = 1024; // 4G
        else if (level < 500) internalGravity = 768; // 3G
        else internalGravity = 5120; // 20G
        
        return internalGravity;
    }
    
    // Initialize mode for game scene
    initializeForGameScene(gameScene) {
        super.initializeForGameScene(gameScene);

        // Initialize powerup handler
        if (typeof PowerupEffectHandler !== 'undefined') {
            this.powerupHandler = new PowerupEffectHandler(gameScene);
        }

        // Initialize TGM2 grading system level
        this.tgm2Grading.setLevel(gameScene.level);

        console.log('TGM2 Mode initialized with TGM2 grading system (no powerup minos)');
    }

    // Handle level progression with section stops
    onLevelUpdate(level, oldLevel, updateType, amount) {
        const atStopLevel = (level % 100 === 99) || level === 998 || level === 999;

        if (updateType === 'piece') {
            if (!atStopLevel && level < 999) {
                return level + 1;
            }
            return level; // Stay at stop level
        } else if (updateType === 'lines') {
            const lineIncrement = Math.min(amount || 0, 4);
            if (oldLevel === 998 && lineIncrement > 0) {
                return 999;
            }
            return Math.min(level + lineIncrement, 999);
        }
        return level;
    }
    
    // Handle piece spawning with powerup support
    shouldSpawnPowerupPiece() {
        if (!this.config.specialMechanics.powerupMinios) {
            return false;
        }
        
        return Math.random() < this.powerupSpawnRate;
    }
    
    // Generate next piece (supports powerup minos)
    generateNextPiece(gameScene) {
        if (this.shouldSpawnPowerupPiece() && typeof PowerupMino !== 'undefined') {
            // 50/50 chance between powerup types
            const powerupType = this.powerupTypes[Math.floor(Math.random() * this.powerupTypes.length)];
            return PowerupMino.createRandomPowerupPiece(gameScene.rotationSystem, powerupType);
        } else {
            // Generate regular piece using game's existing system
            return gameScene.generateTGM1Piece();
        }
    }
    
    // Handle line clear with TGM2 grading and powerup effects
    handleLineClear(gameScene, linesCleared, pieceType = null) {
        // Handle powerup effects first
        if (this.powerupHandler && this.config.specialMechanics.powerupMinios) {
            // Check if the locked piece was a powerup piece
            if (gameScene.currentPiece && gameScene.currentPiece.isPowerup) {
                const powerupCells = gameScene.currentPiece.getPowerupCellPositions();
                if (powerupCells.length > 0) {
                    // Create a mock cleared lines array for powerup processing
                    const clearedLines = [];
                    for (let i = 0; i < linesCleared; i++) {
                        clearedLines.push(gameScene.board.rows - 1 - i);
                    }
                    
                    this.powerupHandler.processPowerupEffects(clearedLines, powerupCells);
                }
            }
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
        
        // Handle TGM2 scoring (separate from grading)
        this.updateTGM2Score(gameScene, linesCleared, pieceType);
        
        // Handle section transitions
        this.handleSectionTransitions(gameScene);
        
        // Check for credits roll
        this.checkCreditsRoll(gameScene);
    }
    

    

    
    // Calculate TGM2 combo size
    calculateTGM2ComboSize(gameScene) {
        if (gameScene.comboCount === -1) {
            return 1; // No combo active
        }
        
        // TGM2 combo is based on consecutive non-single clears
        // This is different from TGM1's combo system
        return Math.max(1, gameScene.comboCount + 1);
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
    
    // Get score multiplier for TGM2
    getScoreMultiplier(linesCleared, level) {
        // TGM2 has level-based score multipliers
        if (level >= 500) return 4;
        if (level >= 300) return 3;
        if (level >= 100) return 2;
        return 1;
    }
    
    // Handle section transitions for TGM2
    handleSectionTransitions(gameScene) {
        const oldSection = this.currentSection;
        const newSection = Math.floor(gameScene.level / 100);
        
        if (newSection > oldSection && gameScene.level < 999) {
            this.currentSection = newSection;
            
            // Play section change sound
            if (gameScene.sound) {
                const sectionSound = gameScene.sound.add('sectionchange', { volume: 0.6 });
                sectionSound.play();
            }
            
            console.log(`TGM2: Entered section ${newSection * 100}-${Math.min((newSection + 1) * 100 - 1, 999)}`);
        }
    }
    
    // Check for credits roll activation
    checkCreditsRoll(gameScene) {
        if (gameScene.level >= 999 && !this.level999Reached) {
            this.level999Reached = true;
            
            // Start credits
            gameScene.startCredits();
            
            // Check for M-Roll unlock
            this.checkMRollConditions(gameScene);
        }
    }
    
    // Check M-Roll unlock conditions
    checkMRollConditions(gameScene) {
        // M-Roll unlocks at level 999 with certain time requirements
        const currentTime = gameScene.currentTime;
        
        if (currentTime <= 525) { // 8:45.00
            this.mRollUnlocked = true;
            console.log('TGM2: M-Roll unlocked!');
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
        
        // Handle credits roll
        if (this.creditsActive) {
            this.creditsTimer += deltaTime;
            
            if (this.creditsTimer >= this.creditsDuration) {
                this.creditsActive = false;
                gameScene.showGameOverScreen();
            }
        }
    }
    
    // Get TGM2 grading progress for UI display
    getGradingProgress() {
        if (!this.config.specialMechanics.tgm2Grading) {
            return null;
        }
        
        return this.tgm2Grading.getGradeProgress();
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
    
    // Check final rankings including M-Roll and Fading Roll
    checkFinalRankings(gameScene) {
        let finalGrade = this.displayedGrade;
        let rankingType = 'regular'; // 'regular', 'fading', 'm_roll'
        
        // Check for Fading Roll completion
        if (this.fadingRollActive && this.creditsCompleted) {
            finalGrade = 'M';
            rankingType = 'fading';
        }
        // Check for M-Roll completion
        else if (this.mRollUnlocked && this.creditsCompleted) {
            if (this.linesClearedInMRoll >= 32) {
                finalGrade = 'GM';
                rankingType = 'm_roll_orange';
            } else {
                finalGrade = 'M';
                rankingType = 'm_roll_green';
            }
        }
        
        console.log(`TGM2 Final Ranking: ${finalGrade} (${rankingType})`);
    }
    
    // Save best score for TGM2 mode
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
        
        // Update if better score, or same score but higher level, or same level but better grade
        if (newScore.score > currentBest.score ||
            (newScore.score === currentBest.score && newScore.level > currentBest.level) ||
            (newScore.score === currentBest.score && newScore.level === currentBest.level && 
             this.tgm2Grading.getGradeValue(newScore.grade) > this.tgm2Grading.getGradeValue(currentBest.grade))) {
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
        this.currentSection = 0;
        this.creditsActive = false;
        this.creditsTimer = 0;
        this.level999Reached = false;
        this.mRollUnlocked = false;
        this.fadingRollActive = false;
        this.linesClearedInMRoll = 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM2Mode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM2Mode = TGM2Mode;
}