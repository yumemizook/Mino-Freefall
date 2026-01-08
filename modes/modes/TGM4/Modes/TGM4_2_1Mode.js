// TGM4 2.1 Mode Implementation
// Recreation of T.A. Death mode - 20G fixed with M and GM grades

class TGM4_2_1Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 2.1';
        this.description = 'TGM4 2.1 mode - T.A. Death recreation';
        this.startTime = null;
        this.gradeAchieved = false;
        this.torikanTime = 192000; // 3:20 in milliseconds
        this.gmTimeLimit = 300000; // 5:00 in milliseconds
        this.gmScoreRequirement = 260000;
        this.gmTetrisRequirement = 8;
        
        // Initialize tracking variables
        this.tetrisCount = 0;
        this.allClearCount = 0;
        this.displayedGrade = '';
        
        // Progressive timing system (5 phases) - TGM4 2.1 official timings
        this.currentTimingPhase = 1; // 1-5 phases based on level
        this.timingPhases = [
            { minLevel: 0,   maxLevel: 99,  are: 18/60, lineAre: 14/60, das: 10/60, arr: 1/60, lock: 30/60, lineClear: 12/60 },
            { minLevel: 100, maxLevel: 199, are: 14/60, lineAre: 8/60, das: 10/60, arr: 1/60, lock: 26/60, lineClear: 6/60 },
            { minLevel: 200, maxLevel: 299, are: 14/60, lineAre: 8/60, das: 9/60, arr: 1/60, lock: 22/60, lineClear: 6/60 },
            { minLevel: 300, maxLevel: 399, are: 12/60, lineAre: 8/60, das: 8/60, arr: 1/60, lock: 20/60, lineClear: 6/60 },
            { minLevel: 400, maxLevel: 499, are: 10/60, lineAre: 6/60, das: 6/60, arr: 1/60, lock: 18/60, lineClear: 5/60 },
            { minLevel: 500, maxLevel: 999, are: 6/60, lineAre: 5/60, das: 6/60, arr: 1/60, lock: 15/60, lineClear: 4/60 }
        ];
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'fixed_20g', // Fixed 20G gravity
                value: 5120,
                curve: null
            },
            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
            ghostEnabled: true, // TGM4 has ghost piece
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            lowestGrade: ' ',
            specialMechanics: {
                fixed20G: true,
                progressiveTimings: true, // 5 timing phases
                torikanLimit: true, // Time limit at level 500
                minimalGrading: true, // Only M and GM grades
                deathMechanics: true
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

    // T.A. Death scoring system
    calculateScore(baseScore, lines, piece, game) {
        if (lines === 0) return baseScore;

        // Official TGM2 (TAP) scoring formula: Score = (⌈(Level + Lines) / 4⌉ + Soft + (2 × Sonic)) × Lines × Combo × Bravo + ⌈(Level After Clear) / 2⌉ + (Speed × 7)
        const levelBeforeClear = game.level || 1;
        const levelAfterClear = game.level || 1; // Simplified - would need proper tracking
        const base = Math.ceil((levelBeforeClear + lines) / 4);
        const soft = game.softDropPoints || 0;
        const sonic = game.hardDropPoints || 0;
        const combo = game.comboCount > 0 ? (game.comboCount + 1) : 1;
        const bravo = this.checkBravo(game) ? 4 : 1; // Bravo = 4x multiplier for all clear
        const levelBonus = Math.ceil(levelAfterClear / 2);
        
        // Speed bonus calculation (simplified)
        const lockDelay = 15/60; // Would need actual active time tracking
        const activeTime = 0; // Would need actual piece active time
        const speed = Math.max(0, lockDelay - activeTime);
        const speedBonus = speed * 7;
        
        const totalScore = (base + soft + (2 * sonic)) * lines * combo * bravo + levelBonus + speedBonus;
        
        return Math.floor(totalScore);
    }

    // Check torikan at level 500
    checkTorikan(level, elapsedTime) {
        if (level >= 500 && !this.gradeAchieved) {
            if (elapsedTime > this.torikanTime) {
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
        if (level >= 999 && 
            score >= this.gmScoreRequirement && 
            elapsedTime <= this.gmTimeLimit && 
            tetrisCount >= this.gmTetrisRequirement) {
            return true;
        }
        return false;
    }

    // Get current grade
    getCurrentGrade(level, score, elapsedTime) {
        // Only two grades are achievable: M and GM
        
        // Check torikan at level 500
        if (level >= 500 && !this.gradeAchieved) {
            if (elapsedTime > this.torikanTime) {
                return ''; // Failed torikan - no grade
            } else {
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
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            console.log(`TGM4 2.1 Game Over - Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_2_1';
    }
    
    // Reset mode state
    reset() {
        this.startTime = null;
        this.gradeAchieved = false;
        this.tetrisCount = 0;
        this.allClearCount = 0;
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
