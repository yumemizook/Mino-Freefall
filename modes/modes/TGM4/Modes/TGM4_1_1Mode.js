// TGM4 1.1 Mode Implementation
// Recreation of TGM1 Normal mode

class TGM4_1_1Mode extends TGM4BaseMode {
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
            ...this.getDefaultConfig(),
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
            lowestGrade: '9',
            specialMechanics: {
                ...this.getDefaultConfig().specialMechanics,
                movementLimitation: false, // TGM1 has no movement limitation
                extraButton: false, // TGM1 has no EXTRA button
                irs180: false, // TGM1 has no 180° IRS
                gradingSystem: 'tgm1', // TGM1-style grading
                gradeThresholds: {
                    '9': 0, '8': 400, '7': 800, '6': 1400, '5': 2000, '4': 3500, '3': 5500, '2': 8000, '1': 12000,
                    'S1': 16000, 'S2': 22000, 'S3': 30000, 'S4': 40000, 'S5': 52000, 'S6': 66000, 'S7': 82000, 'S8': 100000, 'S9': 120000,
                    'GM': 126000
                },
                gmRequirements: {
                    level999: { score: 280000, time: 535 } // 8:55 for GM
                }
            }
        };
    }

    // TGM1 scoring system - using official formula
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

        // Apply combo and bravo multipliers
        const combo = game.comboCount > 0 ? (game.comboCount + 1) : 1;
        const bravo = this.checkBravo(game) ? 4 : 1;
        
        return Math.floor(score * combo * bravo);
    }

    // Check for bravo (perfect clear)
    checkBravo(game) {
        if (!game || !game.board || !game.board.grid) return false;
        
        // Bravo occurs when board is completely full before clearing
        return game.board.grid.every(row => row.every(cell => cell !== 0));
    }

    // TGM1 grade calculation based on score
    getCurrentGrade(score, level) {
        const config = this.getModeConfig();
        const thresholds = config.specialMechanics.gradeThresholds;
        
        // Find highest grade achieved
        for (const [grade, threshold] of Object.entries(thresholds)) {
            if (score >= threshold) {
                return grade;
            }
        }
        
        return '9'; // Default grade
    }

    // Check for GM requirements
    checkGMRequirements(level, score, elapsedTime, tetrisCount) {
        const config = this.getModeConfig();
        const gmReq = config.specialMechanics.gmRequirements;
        
        if (level >= 999 && 
            score >= gmReq.level999.score && 
            elapsedTime <= gmReq.level999.time && 
            tetrisCount >= 6) {
            return true;
        }
        return false;
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
        if (gameScene && gameScene.game) {
            const elapsedTime = gameScene.game.startTime ? Date.now() - gameScene.game.startTime : 0;
            const finalGrade = this.checkGMRequirements(gameScene.game.level, gameScene.game.score, elapsedTime, this.tetrisCount) ? 'GM' : this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            console.log(`TGM4 1.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
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
