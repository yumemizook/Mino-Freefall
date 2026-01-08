// TGM4 1.1 Mode Implementation
// Recreation of TGM1 Normal mode

class TGM4_1_1Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 1.1';
        this.description = 'TGM4 1.1 mode - TGM1 Normal recreation';
        this.gradePoints = 0;
        
        // Initialize tracking variables
        this.tetrisCount = 0;
        this.allClearCount = 0;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'tgm1', // Use TGM1 gravity curve
                value: 0,
                curve: null
            },
            das: 14/60,      // TGM1: 14 frames DAS
            arr: 1/60,       // TGM1: 1 frame ARR
            are: 27/60,      // TGM1: 27 frames ARE
            lineAre: 27/60,  // TGM1: 27 frames Line ARE
            lockDelay: 30/60,  // TGM1: 30 frames lock delay
            lineClearDelay: 40/60, // TGM1: 40 frames line clear

            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
            ghostEnabled: true, // TGM4 has ghost piece
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            
            specialMechanics: {
                movementLimitation: false, // TGM1 has no movement limitation
                diagonalInput: false,
                extraButton: false, // TGM1 has no EXTRA button
                irs180: false, // TGM1 has no 180° IRS
                gradingSystem: 'tgm1' // TGM1-style grading
            }
        };
    }

    // TGM1 scoring system
    calculateScore(baseScore, lines, piece, game) {
        if (lines === 0) return baseScore;

        // TGM1 official scoring: 40/100/300/1200 × level
        const level = game.level || 1;
        let score = 0;

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

        // Add soft drop points (1 point per cell)
        if (game.softDropPoints) {
            score += game.softDropPoints;
        }

        // Add hard drop points (2 points per cell)
        if (game.hardDropPoints) {
            score += game.hardDropPoints * 2;
        }

        return Math.floor(score);
    }

    // TGM1 grade calculation based on score
    calculateTGM1Grade(score, level) {
        if (score >= 126000) return 'GM';
        if (score >= 112000) return 'S9';
        if (score >= 98000) return 'S8';
        if (score >= 84000) return 'S7';
        if (score >= 70000) return 'S6';
        if (score >= 56000) return 'S5';
        if (score >= 42000) return 'S4';
        if (score >= 28000) return 'S3';
        if (score >= 14000) return 'S2';
        if (score >= 7000) return 'S1';
        if (score >= 5600) return '1';
        if (score >= 4200) return '2';
        if (score >= 2800) return '3';
        if (score >= 1400) return '4';
        if (score >= 700) return '5';
        if (score >= 350) return '6';
        if (score >= 120) return '7';
        if (score >= 50) return '8';
        return '9';
    }

    // Check for GM requirements
    checkGMRequirements(level, score, tetrisCount) {
        if (level >= 999 && score >= 126000 && tetrisCount >= 6) {
            return true;
        }
        return false;
    }

    // Get current grade
    getCurrentGrade(score, level) {
        // In 1.1, grade is entirely determined by score
        return this.calculateTGM1Grade(score, level);
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        // Set up TGM1-style UI (grade moved down to TGM3 position)
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            // Move grade display down to match TGM3 position
            gameScene.gradeText.setY(gameScene.gradeText.y + 20); // Move down by 20 pixels
            gameScene.gradeText.setText('GRADE: 9');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            // Update grade display
            const grade = this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            if (gameScene.gradeText) {
                gameScene.gradeText.setText(`Grade: ${grade}`);
            }
        }
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        // TGM1-specific line clear handling
        if (gameScene.game && linesCleared === 4) {
            console.log('TGM4 1.1: Tetris cleared!');
        }
    }

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene.game) {
            const finalGrade = this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            console.log(`TGM4 1.1 Game Over - Final Grade: ${finalGrade}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_1_1';
    }
    
    // Reset mode state
    reset() {
        this.gradePoints = 0;
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

    // Override piece generation to use TGM1 randomizer
    generateNextPiece(gameScene) {
        return gameScene.generateTGM1Piece();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4_1_1Mode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4_1_1Mode = TGM4_1_1Mode;
}
