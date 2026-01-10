// TGM4 1.1 Mode Implementation
// Recreation of TGM1 Normal mode - extends TGM1Mode with TGM4 features

class TGM4_1_1Mode extends TGM1Mode {
    constructor() {
        super();
        this.modeName = 'TGM4 1.1';
        this.modeId = 'tgm4_1_1';
        this.description = 'TGM4 1.1 mode - TGM1 Normal recreation';
        
        // TGM4 specific overrides
        this.gravityLevelCap = 999; // TGM1 goes to 999
    }

    getModeConfig() {
        // Use TGM1 scoring system and grade thresholds from tgm4modes.md 1.1 spec
        const baseConfig = super.getModeConfig();
        return {
            ...baseConfig,
            // TGM4 1.1 specific overrides
            nextPieces: 6, // TGM4 shows 6 pieces
            description: 'TGM4 1.1 - TGM1 Normal recreation with TGM4 features',
            specialMechanics: {
                ...baseConfig.specialMechanics,
                // TGM4 specific mechanics
                tgm4Features: true,
                extendedNextPieces: true,
                // 1.1 grade thresholds from tgm4modes.md
                gradeThresholds: {
                    '9': 0,
                    '8': 14000,
                    '7': 28000,
                    '6': 41000,
                    '5': 55000,
                    '4': 69000,
                    '3': 83000,
                    '2': 97000,
                    '1': 111000,
                    'S1': 140000,
                    'S2': 148000,
                    'S3': 157000,
                    'S4': 166000,
                    'S5': 176000,
                    'S6': 187000,
                    'S7': 199000,
                    'S8': 213000,
                    'S9': 230000,
                    'GM': 280000
                },
                // GM requirements from tgm4modes.md 1.1
                gmRequirements: {
                    level999: { score: 280000, time: 535 } // 8:55 for GM
                }
            }
        };
    }

    // Override piece generation based on rotation system
    generateNextPiece(gameScene) {
        // Check if game scene has rotation system preference
        const rotationSystem = gameScene.rotationSystem || 'srs'; // Default to SRS
        
        if (rotationSystem === 'srs') {
            // Use 7-bag randomizer with SRS
            return gameScene.generate7BagPiece ? gameScene.generate7BagPiece() : gameScene.generateNextPiece();
        } else {
            // Use TGM2 randomization with ARS
            return gameScene.generateTGM2Piece ? gameScene.generateTGM2Piece() : gameScene.generateNextPiece();
        }
    }

    // Check for bravo (perfect clear)
    checkBravo(game) {
        if (!game || !game.board || !game.board.grid) return false;
        
        // Bravo occurs when board is completely full before clearing
        return game.board.grid.every(row => row.every(cell => cell !== 0));
    }

    // Use TGM1 scoring system (inherited) and grade thresholds from 1.1 spec
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

    // Get next grade requirement for UI display
    getNextGradeRequirement(currentGrade, currentScore) {
        const config = this.getModeConfig();
        const thresholds = config.specialMechanics.gradeThresholds;
        
        const gradeOrder = ['9', '8', '7', '6', '5', '4', '3', '2', '1', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'GM'];
        const currentIndex = gradeOrder.indexOf(currentGrade);
        
        if (currentIndex === -1 || currentIndex === gradeOrder.length - 1) {
            return null; // Already at highest grade
        }
        
        const nextGrade = gradeOrder[currentIndex + 1];
        const requiredScore = thresholds[nextGrade];
        
        return {
            grade: nextGrade,
            score: requiredScore,
            pointsNeeded: Math.max(0, requiredScore - currentScore)
        };
    }

    // Check for GM requirements (1.1 spec)
    checkGMRequirements(level, score, elapsedTime, tetrisCount) {
        const config = this.getModeConfig();
        const gmReq = config.specialMechanics.gmRequirements;
        
        return (
            level >= 999 &&
            score >= gmReq.level999.score &&
            elapsedTime <= gmReq.level999.time &&
            tetrisCount >= 6
        );
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

    // Update UI elements with next-grade display
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            // Update grade display
            const grade = this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            if (gameScene.gradeText) {
                const next = this.getNextGradeRequirement(grade, gameScene.game.score);
                const nextText = next ? ` (${next.pointsNeeded})` : '';
                gameScene.gradeText.setText(`${grade}${nextText}`);
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

    // Handle game over with GM check
    onGameOver(gameScene) {
        if (gameScene && gameScene.game) {
            const elapsedTime = gameScene.game.startTime ? Date.now() - gameScene.game.startTime : 0;
            const isGM = this.checkGMRequirements(gameScene.game.level, gameScene.game.score, elapsedTime, this.tetrisCount || 0);
            const finalGrade = isGM ? 'GM' : this.getCurrentGrade(gameScene.game.score, gameScene.game.level);
            console.log(`TGM4 1.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount || 0}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_1_1';
    }
    
    // Reset mode state
    reset() {
        super.reset();
        // Reset TGM4 1.1 specific variables
        this.tetrisCount = 0;
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
