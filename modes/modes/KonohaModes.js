// Konoha All-Clear Puzzle Modes
// All-clear challenge modes with different piece sets

// Konoha Easy Mode - 5-piece all-clear challenge
class KonohaEasyMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Konoha Easy';
        this.description = 'Easy all-clear challenge with 5 pieces!';
        this.targetLines = 150;
        this.allClearsRequired = 10;
        this.allClearsAchieved = 0;
        this.piecesAvailable = ['I', 'O', 'T', 'S', 'Z']; // 5 pieces
        this.currentPieceIndex = 0;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'tgm1',
                value: 0,
                curve: null
            },
            das: 16/60,      // Standard DAS
            arr: 1/60,       // Standard ARR
            are: 30/60,      // Standard ARE
            lineAre: 30/60,
            lockDelay: 0.5,  // Standard lock delay
            lineClearDelay: 41/60,
            
            nextPieces: 3,   // Show 3 pieces for planning
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'lines',
            lineClearBonus: 2, // Bonus for all-clears
            gravityLevelCap: 999,
            
            specialMechanics: {
                allClearChallenge: true,
                targetAllClears: 10,
                limitedPieces: true,
                pieceSet: ['I', 'O', 'T', 'S', 'Z'],
                puzzleMode: true,
                easyDifficulty: true
            }
        };
    }

    // Generate next piece from limited set
    generateNextPiece(gameScene) {
        if (!this.piecesAvailable || this.piecesAvailable.length === 0) {
            return 'T'; // Fallback
        }
        
        const piece = this.piecesAvailable[this.currentPieceIndex];
        this.currentPieceIndex = (this.currentPieceIndex + 1) % this.piecesAvailable.length;
        return piece;
    }

    // Check for all clear
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;
        
        // Check if board is completely empty after line clear
        return gameScene.game.board.grid.every(row => row.every(cell => cell === 0));
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        // Check for all clear
        const isAllClear = this.checkAllClear(gameScene);
        
        if (isAllClear) {
            this.allClearsAchieved++;
            console.log(`Konoha Easy: All clear achieved! (${this.allClearsAchieved}/${this.allClearsRequired})`);
            
            // Update UI
            if (gameScene.gradeText) {
                gameScene.gradeText.setText(`All Clears: ${this.allClearsAchieved}/${this.allClearsRequired}`);
            }
            
            // Check victory condition
            if (this.allClearsAchieved >= this.allClearsRequired) {
                console.log('Konoha Easy: Challenge completed!');
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        // Set up Konoha UI
        if (gameScene.levelText) {
            gameScene.levelText.setText('LINES: 0/150');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('All Clears: 0/10');
        }
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('PIECES: I,O,T,S,Z');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            // Update lines display
            if (gameScene.levelText) {
                gameScene.levelText.setText(`LINES: ${gameScene.game.lines}/150`);
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'konoha_easy';
    }
    
    // Reset mode state
    reset() {
        this.allClearsAchieved = 0;
        this.currentPieceIndex = 0;
    }
    
    // Get line clear bonus
    getLineClearBonus() {
        return 2; // Bonus for all-clear challenges
    }
    
    // Get grade points
    getGradePoints() {
        return 0;
    }
}

// Konoha Hard Mode - 7-piece all-clear challenge
class KonohaHardMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Konoha Hard';
        this.description = 'Hard all-clear challenge with all 7 pieces!';
        this.targetLines = 200;
        this.allClearsRequired = 15;
        this.allClearsAchieved = 0;
        this.piecesAvailable = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']; // All 7 pieces
        this.currentPieceIndex = 0;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'tgm1',
                value: 0,
                curve: null
            },
            das: 12/60,      // Faster DAS for harder challenge
            arr: 1/60,
            are: 25/60,      // Slightly faster ARE
            lineAre: 20/60,
            lockDelay: 0.4,  // Faster lock delay
            lineClearDelay: 30/60,
            
            nextPieces: 5,   // Show more pieces for complex planning
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'lines',
            lineClearBonus: 3, // Higher bonus for harder challenge
            gravityLevelCap: 999,
            
            specialMechanics: {
                allClearChallenge: true,
                targetAllClears: 15,
                limitedPieces: true,
                pieceSet: ['I', 'O', 'T', 'S', 'Z', 'J', 'L'],
                puzzleMode: true,
                hardDifficulty: true,
                advancedPlanning: true
            }
        };
    }

    // Generate next piece from limited set
    generateNextPiece(gameScene) {
        if (!this.piecesAvailable || this.piecesAvailable.length === 0) {
            return 'T'; // Fallback
        }
        
        const piece = this.piecesAvailable[this.currentPieceIndex];
        this.currentPieceIndex = (this.currentPieceIndex + 1) % this.piecesAvailable.length;
        return piece;
    }

    // Check for all clear
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;
        
        // Check if board is completely empty after line clear
        return gameScene.game.board.grid.every(row => row.every(cell => cell === 0));
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        // Check for all clear
        const isAllClear = this.checkAllClear(gameScene);
        
        if (isAllClear) {
            this.allClearsAchieved++;
            console.log(`Konoha Hard: All clear achieved! (${this.allClearsAchieved}/${this.allClearsRequired})`);
            
            // Update UI
            if (gameScene.gradeText) {
                gameScene.gradeText.setText(`All Clears: ${this.allClearsAchieved}/${this.allClearsRequired}`);
            }
            
            // Check victory condition
            if (this.allClearsAchieved >= this.allClearsRequired) {
                console.log('Konoha Hard: Challenge completed!');
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        // Set up Konoha Hard UI
        if (gameScene.levelText) {
            gameScene.levelText.setText('LINES: 0/200');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('All Clears: 0/15');
        }
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('PIECES: I,O,T,S,Z,J,L');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            // Update lines display
            if (gameScene.levelText) {
                gameScene.levelText.setText(`LINES: ${gameScene.game.lines}/200`);
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'konoha_hard';
    }
    
    // Reset mode state
    reset() {
        this.allClearsAchieved = 0;
        this.currentPieceIndex = 0;
    }
    
    // Get line clear bonus
    getLineClearBonus() {
        return 3; // Higher bonus for hard challenge
    }
    
    // Get grade points
    getGradePoints() {
        return 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KonohaEasyMode, KonohaHardMode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.KonohaEasyMode = KonohaEasyMode;
    window.KonohaHardMode = KonohaHardMode;
}
