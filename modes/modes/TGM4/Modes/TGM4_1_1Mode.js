// TGM4 1.1 Mode Implementation
// Recreation of TGM1 Normal mode

class TGM4_1_1Mode extends TGM4BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 1.1';
        this.description = 'TGM4 1.1 mode - TGM1 Normal recreation';
        this.gradePoints = 0;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'tgm1', // Use TGM1 gravity curve exactly
                value: 0,
                curve: null
            },
            das: 16/60,      // TGM1 DAS
            arr: 1/60,       // TGM1 ARR
            are: 30/60,      // TGM1 ARE
            lineAre: 30/60,  // TGM1 Line ARE
            lockDelay: 0.5,  // TGM1 lock delay
            lineClearDelay: 41/60, // TGM1 line clear

            nextPieces: 1,   // TGM1 only shows 1 next piece
            holdEnabled: false, // TGM1 has no hold
            ghostEnabled: false, // TGM1 has no ghost piece
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

        // Add soft drop points (1 point per cell)
        if (game.softDropPoints) {
            score += game.softDropPoints;
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
        if (this.checkGMRequirements(level, score, this.tetrisCount)) {
            return 'GM';
        }
        return this.calculateTGM1Grade(score, level);
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        // Set up TGM1-style UI
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('GRADE: 9');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        super.update(gameScene, deltaTime);

        if (gameScene.game) {
            // Update grade display
            if (gameScene.gradeText) {
                const grade = this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
                gameScene.gradeText.setText(`GRADE: ${grade}`);
            }
        }
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        super.handleLineClear(gameScene, linesCleared, pieceType);

        // TGM1-specific line clear handling
        if (gameScene.game && linesCleared === 4) {
            console.log(`TGM4 1.1: Tetris #${this.tetrisCount}`);
        }
    }

    // Handle game over
    onGameOver(gameScene) {
        super.onGameOver(gameScene);
        
        if (gameScene.game) {
            const finalGrade = this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            console.log(`TGM4 1.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Score: ${gameScene.game.score}, Level: ${gameScene.game.level}`);
            console.log(`Tetris: ${this.tetrisCount}`);
            
            if (finalGrade === 'GM') {
                console.log('Congratulations! Grand Master achieved!');
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_1_1';
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
