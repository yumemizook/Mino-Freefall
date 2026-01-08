// TGM4 2.1 Mode Implementation
// Recreation of T.A. Death mode - 20G fixed with M and GM grades

class TGM4_2_1Mode extends TGM4BaseMode {
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
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static', // Fixed 20G
                value: 5120,    // 20G value
                curve: null
            },
            das: 14/60,      // Faster DAS than TGM1
            arr: 1/60,       // Fast ARR
            are: 25/60,      // Slower ARE pre-500
            lineAre: 25/60,  // Slower Line ARE pre-500
            lockDelay: 0.4,  // Slightly faster lock delay
            lineClearDelay: 30/60, // Faster line clear

            nextPieces: 3,   // Show 3 next pieces
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            
            specialMechanics: {
                movementLimitation: true,
                maxMoveResets: 8,
                maxRotationResets: 2,
                diagonalInput: false,
                extraButton: true,
                irs180: true,
                gradingSystem: 'death', // T.A. Death grading
                torikan: true // Enable torikan time limits
            }
        };
    }

    // Override timing based on level
    getARE() {
        if (this.getCurrentLevel() < 500) {
            return 25/60; // Slower ARE pre-500
        }
        return 12/60; // Faster ARE post-500
    }

    getLineARE() {
        if (this.getCurrentLevel() < 500) {
            return 25/60; // Slower Line ARE pre-500
        }
        return 12/60; // Faster Line ARE post-500
    }

    getLineClearDelay() {
        if (this.getCurrentLevel() < 500) {
            return 30/60; // Slower line clear pre-500
        }
        return 20/60; // Faster line clear post-500
    }

    getCurrentLevel() {
        // This should be overridden by the game scene to get current level
        return 0;
    }

    // TGM2 scoring system
    calculateScore(baseScore, lines, piece, game) {
        let score = 0;
        const level = game.level || 1;

        switch (lines) {
            case 1:
                score = 100 * level;
                break;
            case 2:
                score = 300 * level;
                break;
            case 3:
                score = 500 * level;
                break;
            case 4:
                score = 800 * level;
                break;
            default:
                score = baseScore * this.getLineClearBonus();
        }

        // Add soft drop points (1 point per cell)
        if (game.softDropPoints) {
            score += game.softDropPoints;
        }

        // Add hard drop points (2 points per cell)
        if (game.hardDropPoints) {
            score += game.hardDropPoints;
        }

        return Math.floor(score);
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
        if (level >= 999) {
            if (this.checkGMRequirements(level, score, elapsedTime, this.tetrisCount)) {
                return 'GM';
            }
            return 'M'; // Master grade for reaching 999
        }
        
        // Check torikan status
        const torikanResult = this.checkTorikan(level, elapsedTime);
        if (torikanResult === 'torikan') {
            return 'No Grade';
        } else if (torikanResult === 'master') {
            return 'M';
        }
        
        return 'In Progress';
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        this.gradeAchieved = false;
        
        // Set up T.A. Death UI
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('GRADE: ---');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 0:00.00');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        super.update(gameScene, deltaTime);

        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            const minutes = Math.floor(elapsedTime / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);
            
            // Update time display
            if (gameScene.timeText) {
                gameScene.timeText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`);
            }
            
            // Update grade display
            if (gameScene.gradeText) {
                const grade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score, elapsedTime);
                gameScene.gradeText.setText(`GRADE: ${grade}`);
            }
            
            // Check torikan
            if (gameScene.game.level >= 500 && !this.gradeAchieved) {
                const torikanResult = this.checkTorikan(gameScene.game.level, elapsedTime);
                if (torikanResult === 'torikan') {
                    console.log('TGM4 2.1: Torikan failed - Congratulations!');
                    // Game should end here
                }
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
        super.onGameOver(gameScene);
        
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score, elapsedTime);
            
            console.log(`TGM4 2.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Score: ${gameScene.game.score}, Level: ${gameScene.game.level}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
            
            if (finalGrade === 'GM') {
                console.log('Congratulations! Grand Master achieved!');
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_2_1';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4_2_1Mode;
}
