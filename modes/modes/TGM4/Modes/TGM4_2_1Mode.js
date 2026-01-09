// TGM4 2.1 Mode Implementation
// Recreation of T.A. Death mode - extends TADeathMode with TGM4 features

class TGM4_2_1Mode extends TADeathMode {
    constructor() {
        super();
        this.modeName = 'TGM4 2.1';
        this.modeId = 'tgm4_2_1';
        this.description = 'TGM4 2.1 mode - T.A. Death recreation';
        
        // TGM4 specific overrides
        this.gravityLevelCap = 999; // T.A. Death goes to 999
        
        // Override TADeath with TGM4 features
        this.nextPieces = 6; // TGM4 shows 6 pieces (vs TADeath's 3)
    }

    getModeConfig() {
        // Start with TADeath config and override with TGM4 2.1 specifics
        const baseConfig = super.getModeConfig();
        
        return {
            ...baseConfig,
            // TGM4 specific overrides
            nextPieces: 6, // TGM4 shows 6 pieces (vs TADeath's 3)
            description: 'TGM4 2.1 - T.A. Death recreation with TGM4 features',
            specialMechanics: {
                ...baseConfig.specialMechanics,
                // TGM4 specific mechanics
                tgm4Features: true,
                extendedNextPieces: true,
                // TGM4 2.1 specific torikan and GM requirements
                torikan: {
                    level500: { time: 192000, grade: 'M' }, // 3:20 for Master
                    level999: { time: 300000, score: 260000, tetrises: 8, grade: 'GM' } // 5:00, 260k score, 8 tetrises for GM
                }
            }
        };
    }

    // Override timing based on level
    getARE() {
        const phase = this.getCurrentTimingPhase();
        return phase.are;
    }

    getLineARE() {
        const phase = this.getCurrentTimingPhase();
        return phase.lineAre;
    }

    getDAS() {
        const phase = this.getCurrentTimingPhase();
        return phase.das;
    }

    getARR() {
        const phase = this.getCurrentTimingPhase();
        return phase.arr;
    }

    getLockDelay() {
        const phase = this.getCurrentTimingPhase();
        return phase.lock;
    }

    getLineClearDelay() {
        const phase = this.getCurrentTimingPhase();
        return phase.lineClear;
    }

    getCurrentTimingPhase() {
        const level = this.getCurrentLevel();
        return this.timingPhases.find(phase => 
            level >= phase.minLevel && level <= phase.maxLevel
        ) || this.timingPhases[0];
    }

    // TAP scoring system - official formula
    calculateScore(baseScore, lines, piece, game) {
        if (lines === 0) return baseScore;

        // Official TGM2 (TAP) scoring formula: 
        // Score = (⌈(Level + Lines) / 4⌉ + Soft + (2 × Sonic)) × Lines × Combo × Bravo + ⌈(Level After Clear) / 2⌉ + (Speed × 7)
        const levelBeforeClear = game.level || 1;
        const levelAfterClear = game.level || 1; // Simplified - would need proper tracking
        const base = Math.ceil((levelBeforeClear + lines) / 4);
        const soft = game.softDropPoints || 0;
        const sonic = game.hardDropPoints || 0;
        const combo = game.comboCount > 0 ? (game.comboCount + 1) : 1;
        const bravo = this.checkBravo(game) ? 4 : 1; // Bravo = 4x multiplier for all clear
        const levelBonus = Math.ceil(levelAfterClear / 2);
        
        // Speed bonus calculation (simplified - would need actual active time tracking)
        const lockDelay = 15/60; // Would need actual active time
        const activeTime = 0; // Would need actual piece active time
        const speed = Math.max(0, lockDelay - activeTime);
        const speedBonus = speed * 7;
        
        const totalScore = (base + soft + (2 * sonic)) * lines * combo * bravo + levelBonus + speedBonus;
        
        return Math.floor(totalScore);
    }

    // Check for bravo (perfect clear)
    checkBravo(game) {
        if (!game || !game.board || !game.board.grid) return false;
        
        // Bravo occurs when board is completely full before clearing
        return game.board.grid.every(row => row.every(cell => cell !== 0));
    }

    // Check torikan at level 500
    checkTorikan(level, elapsedTime) {
        const config = this.getModeConfig();
        const gmReq = config.specialMechanics.gmRequirements;
        
        if (level >= 500 && !this.gradeAchieved) {
            if (elapsedTime > gmReq.level500.time * 1000) {
                return 'torikan'; // Failed torikan
            } else {
                this.gradeAchieved = true;
                return 'master'; // Achieved Master grade
            }
        }
        return 'continue';
    }

    // Check GM requirements at level 999
    checkGMRequirements(level, score, elapsedTime, tetrisCount) {
        const config = this.getModeConfig();
        const gmReq = config.specialMechanics.gmRequirements;
        
        if (level >= 999 && 
            score >= gmReq.level999.score && 
            elapsedTime <= gmReq.level999.time * 1000 && 
            tetrisCount >= gmReq.level999.tetris) {
            return true;
        }
        return false;
    }

    // Get current grade
    getCurrentGrade(level, score, elapsedTime) {
        // Only two grades are achievable: M and GM
        
        // Check torikan at level 500
        if (level >= 500 && !this.gradeAchieved) {
            const torikanResult = this.checkTorikan(level, elapsedTime);
            if (torikanResult === 'torikan') {
                return ''; // Failed torikan - no grade
            } else if (torikanResult === 'master') {
                this.gradeAchieved = true;
                // Continue to level 999, will get M grade
            }
        }
        
        // At level 999, check GM requirements
        if (level >= 999) {
            if (this.checkGMRequirements(level, score, elapsedTime, this.tetrisCount)) {
                return 'GM';
            }
            return 'M'; // Master grade for reaching 999
        }
        
        // Before level 500, no grade shown
        if (level < 500) {
            return '';
        }
        
        // Between 500-999, show M if torikan passed
        return this.gradeAchieved ? 'M' : '';
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        this.gradeAchieved = false;
        
        // Set up T.A. Death UI (grade moved down to TGM3 position)
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            // Move grade display down to match TGM3 position
            gameScene.gradeText.setY(gameScene.gradeText.y + 20); // Move down by 20 pixels
            gameScene.gradeText.setText('GRADE: ---');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 0:00.00');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            if (gameScene.gradeText) {
                gameScene.gradeText.setText(this.displayedGrade || '');
            }
        }
    }

    // Handle level updates
    onLevelUpdate(level, oldLevel, updateType, amount) {
        const elapsedTime = Date.now() - this.startTime;
        
        // Check for torikan at level 500
        if (level >= 500 && oldLevel < 500 && !this.gradeAchieved) {
            const torikanResult = this.checkTorikan(level, elapsedTime);
            if (torikanResult === 'torikan') {
                console.log('TGM4 2.1: Torikan failed at level 500');
            } else if (torikanResult === 'master') {
                console.log('TGM4 2.1: Master grade achieved!');
            }
        }
        
        return level;
    }

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene && gameScene.game) {
            const elapsedTime = gameScene.game.startTime ? Date.now() - gameScene.game.startTime : 0;
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score, elapsedTime);
            console.log(`TGM4 2.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_2_1';
    }
    
    // Reset mode state
    reset() {
        super.reset();
        this.startTime = null;
        this.gradeAchieved = false;
        this.displayedGrade = '';
    }
    
    // Get line clear bonus
    getLineClearBonus() {
        return 1;
    }
    
    // Get grade points
    getGradePoints() {
        return 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4_2_1Mode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4_2_1Mode = TGM4_2_1Mode;
}
