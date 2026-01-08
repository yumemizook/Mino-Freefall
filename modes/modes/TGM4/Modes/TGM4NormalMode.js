// TGM4 Normal Mode Implementation
// 999-level mode with A of B grading system

class TGM4NormalMode extends TGM4BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 Normal';
        this.description = 'TGM4 Normal mode - 999 levels with A of B grading';
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'tgm1', // Use TGM1 gravity curve
                value: 0,
                curve: null
            },
            das: 16/60,      // TGM1-style DAS
            arr: 1/60,       // TGM1-style ARR
            are: 30/60,      // TGM1-style ARE
            lineAre: 30/60,  // TGM1-style Line ARE
            lockDelay: 0.5,  // TGM1-style lock delay
            lineClearDelay: 41/60, // TGM1-style line clear

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
                extraButton: true, // Enable EXTRA button for TGM Type
                irs180: true,      // Enable 180° IRS
                gradingSystem: 'normal' // TGM4 Normal grading
            }
        };
    }

    // Override to use TGM1 scoring
    calculateScore(baseScore, lines, piece, game) {
        // Use TGM1 scoring system
        let score = 0;
        const level = game.level || 1;

        switch (lines) {
            case 1:
                score = 40 * level;
                break;
            case 2:
                score = 100 * level;
                break;
            case 3:
                score = 300 * level;
                break;
            case 4:
                score = 1200 * level;
                break;
            default:
                score = baseScore * this.getLineClearBonus();
        }

        // Add soft drop points
        if (game.softDropPoints) {
            score += game.softDropPoints;
        }

        return Math.floor(score);
    }

    // Handle level updates with section tracking
    onLevelUpdate(level, oldLevel, updateType, amount) {
        const newSection = this.getCurrentSection(level);
        const oldSection = this.getCurrentSection(oldLevel);
        
        if (newSection !== oldSection) {
            this.currentSection = newSection;
            console.log(`TGM4 Normal: Entered section ${newSection} at level ${level}`);
        }

        return level;
    }

    // Get current grade
    getCurrentGrade(level, score) {
        return this.calculateNormalModeGrade(level, score);
    }

    // Check for level stop requirements (every xx99 needs line clear, except first section 099)
    checkLevelStopRequirement(level, linesCleared) {
        // First section is 000-199 with 099 stop and 100 section cap when below level 100
        if (level < 100) {
            if (level === 99 && linesCleared === 0) {
                return false; // Cannot pass 099 without line clear
            }
        } else {
            if (level % 100 === 99 && linesCleared === 0) {
                return false; // Cannot pass xx99 without line clear
            }
        }
        return true;
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        // Set up TGM4-specific UI elements
        if (gameScene.tetrisCountText) {
            gameScene.tetrisCountText.setText('Tetris: 0');
        }
        if (gameScene.allClearCountText) {
            gameScene.allClearCountText.setText('All Clear: 0');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('Grade: Zero of Zero');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        super.update(gameScene, deltaTime);

        // Update tetris and all clear displays
        if (gameScene.tetrisCountText) {
            gameScene.tetrisCountText.setText(`Tetris: ${this.tetrisCount}`);
        }
        if (gameScene.allClearCountText) {
            gameScene.allClearCountText.setText(`All Clear: ${this.allClearCount}`);
        }

        // Update grade display
        if (gameScene.gradeText && gameScene.game) {
            const grade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score);
            gameScene.gradeText.setText(`Grade: ${grade}`);
        }
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        super.handleLineClear(gameScene, linesCleared, pieceType);

        // Check level stop requirements
        if (gameScene.game) {
            const currentLevel = gameScene.game.level;
            if (!this.checkLevelStopRequirement(currentLevel, linesCleared)) {
                console.log(`TGM4 Normal: Cannot pass level ${currentLevel} without line clear`);
                // Game could implement level stop logic here
            }
        }
    }

    // Handle game over
    onGameOver(gameScene) {
        super.onGameOver(gameScene);
        
        if (gameScene.game) {
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score);
            console.log(`TGM4 Normal Game Over - Final Grade: ${finalGrade}`);
            console.log(`Tetris: ${this.tetrisCount}, All Clear: ${this.allClearCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_normal';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4NormalMode;
}
