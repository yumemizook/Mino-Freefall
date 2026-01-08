// TGM4 Base Mode
// Implements TGM4 grading mechanics with A part grading system

class TGM4Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 Base';
        this.description = 'TGM4 base mode with A part grading';
        
        // TGM4 A part grading tracking
        this.aPartPoints = 0;
        this.aGradeCount = 0;
        this.currentSectionPoints = 0;
        this.sectionAPoints = [];
        this.tetrisCount = 0;
        this.allClearCount = 0;
    }

    getModeConfig() {
        return {
            gravity: { type: 'tgm1' },
            das: 16/60,
            arr: 1/60,
            are: 30/60,
            lineAre: 30/60,
            lockDelay: 30/60,
            lineClearDelay: 30/60,
            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            specialMechanics: {
                aPartGrading: true, // Enable A part grading
                pushdownPoints: true // TGM4 has pushdown points like guideline
            }
        };
    }

    // TGM4 A part grading: 175 points per Tetris, 350 per All clear
    // 1000 points in a section = 1 A grade, cannot be deducted from All clears
    updateAPartGrading(gameScene, linesCleared, isAllClear = false) {
        if (linesCleared === 4) { // Tetris
            this.currentSectionPoints += 175;
            this.aPartPoints += 175;
            this.tetrisCount++;
        }
        
        if (isAllClear) {
            this.currentSectionPoints += 350;
            this.aPartPoints += 350;
            this.allClearCount++;
            
            // All clears cannot deduct A grades
            // Ensure we don't lose A grades from all clears
            const potentialAGrades = Math.floor(this.aPartPoints / 1000);
            if (potentialAGrades > this.aGradeCount) {
                this.aGradeCount = potentialAGrades;
            }
        }
        
        // Check for A grade achievement in current section
        if (this.currentSectionPoints >= 1000) {
            this.aGradeCount++;
            this.currentSectionPoints = 0; // Reset section points
            
            console.log(`TGM4: A grade achieved! Total A grades: ${this.aGradeCount}`);
            
            // Update grade display
            this.updateGradeDisplay(gameScene);
        }
        
        // Track section points for A part grading
        const currentSection = Math.floor(gameScene.game.level / 100);
        if (!this.sectionAPoints[currentSection]) {
            this.sectionAPoints[currentSection] = 0;
        }
        this.sectionAPoints[currentSection] = this.currentSectionPoints;
    }
    
    // Update grade display to show A grades
    updateGradeDisplay(gameScene) {
        const gradeDisplay = this.aGradeCount > 0 ? `A${this.aGradeCount}` : 'Zero of Zero';
        if (gameScene.gradeText) {
            gameScene.gradeText.setText(`Grade: ${gradeDisplay}`);
        }
    }
    
    // Check for all clear
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;
        
        // Check if board is completely empty after line clear
        return gameScene.game.board.grid.every(row => row.every(cell => cell === 0));
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        // Update A part grading
        const isAllClear = this.checkAllClear(gameScene);
        this.updateAPartGrading(gameScene, linesCleared, isAllClear);
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
        // Update tetris and all clear displays
        if (gameScene.tetrisCountText) {
            gameScene.tetrisCountText.setText(`Tetris: ${this.tetrisCount}`);
        }
        if (gameScene.allClearCountText) {
            gameScene.allClearCountText.setText(`All Clear: ${this.allClearCount}`);
        }

        // Update grade display
        this.updateGradeDisplay(gameScene);
    }

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene.game) {
            console.log(`TGM4 Game Over - Final A grades: ${this.aGradeCount}`);
            console.log(`Tetris: ${this.tetrisCount}, All Clear: ${this.allClearCount}`);
        }
    }

    // Reset mode state
    reset() {
        // Reset A part grading
        this.aPartPoints = 0;
        this.aGradeCount = 0;
        this.currentSectionPoints = 0;
        this.sectionAPoints = [];
        this.tetrisCount = 0;
        this.allClearCount = 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4Mode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4Mode = TGM4Mode;
}