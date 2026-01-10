// TGM4 Normal Mode Implementation
// 999-level mode with A of B grading system

class TGM4NormalMode extends TGM4BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 Normal';
        this.description = 'TGM4 Normal mode - 999 levels with A of B grading';
        
        // TGM4 A part grading
        this.aPartPoints = 0;
        this.aGradeCount = 0;
        this.currentSectionPoints = 0;
        this.sectionAPoints = [];
        
        // Initialize tracking variables
        this.tetrisCount = 0;
        this.allClearCount = 0;
        this.currentSection = 0;
    }

    getModeConfig() {
        return {
            ...this.getDefaultConfig(),
            gravity: {
                type: 'tgm1', // Use TGM1 gravity curve
                value: 0,
                curve: null
            },
            das: 16/60,      // TGM1-style DAS
            arr: 1/60,       // TGM1-style ARR
            are: 32/60,      // TGM1-style ARE (32 frames)
            lineAre: 32/60,  // TGM1-style Line ARE (32 frames)
            lockDelay: 30/60,  // TGM1-style lock delay (30 frames)
            lineClearDelay: 40/60, // TGM1-style line clear (40 frames)
            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            specialMechanics: {
                ...this.getDefaultConfig().specialMechanics,
                movementLimitation: true,
                maxMoveResets: 8,
                maxRotationResets: 2,
                extraButton: true, // Enable EXTRA button for TGM Type
                irs180: true,      // Enable 180° IRS
                gradingSystem: 'normal', // TGM4 Normal grading
                aPartGrading: true, // Enable A part grading
                pushdownPoints: true // TGM4 has pushdown points like guideline
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

    // Calculate TGM4 Normal mode grade based on score and level
    calculateNormalModeGrade(level, score) {
        // TGM4 Normal uses A of B grading system
        // B part: based on level progression (every 111 levels = 1 B grade)
        let bPart = Math.floor(level / 111);
        if (level >= 999) {
            bPart = 10; // Ten if credits are passed
        } else if (bPart > 9) {
            bPart = 9;
        }

        // A part: based on section performance (6 tetrises = 1 point, all clear = -1 point)
        let aPart = Math.floor(this.tetrisCount / 6) - this.allClearCount;
        aPart = Math.max(0, Math.min(10, aPart)); // Clamp between 0-10

        const gradeNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
        return `${gradeNames[aPart]} of ${gradeNames[bPart]}`;
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
        // Set up TGM4-specific UI elements (grade moved down to TGM3 position)
        if (gameScene.tetrisCountText) {
            gameScene.tetrisCountText.setText('Tetris: 0');
        }
        if (gameScene.allClearCountText) {
            gameScene.allClearCountText.setText('All Clear: 0');
        }
        if (gameScene.gradeText) {
            // Move grade display down to match TGM3 position
            gameScene.gradeText.setY(gameScene.gradeText.y + 20); // Move down by 20 pixels
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
        if (gameScene.gradeText && gameScene.game) {
            const grade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score);
            gameScene.gradeText.setText(`Grade: ${grade}`);
        }
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        // Check level stop requirements
        if (gameScene.game) {
            const currentLevel = gameScene.game.level;
            if (!this.checkLevelStopRequirement(currentLevel, linesCleared)) {
                console.log(`TGM4 Normal: Cannot pass level ${currentLevel} without line clear`);
                // Game could implement level stop logic here
            }
        }
        
        // Update A part grading
        const isAllClear = this.checkAllClear(gameScene);
        this.updateAPartGrading(gameScene, linesCleared, isAllClear);
    }
    
    // TGM4 A part grading: 175 points per Tetris, 350 per All clear
    // 1000 points in a section = 1 A grade, cannot be deducted from All clears
    updateAPartGrading(gameScene, linesCleared, isAllClear = false) {
        if (linesCleared === 4) { // Tetris
            this.currentSectionPoints += 175;
            this.aPartPoints += 175;
        }
        
        if (isAllClear) {
            this.currentSectionPoints += 350;
            this.aPartPoints += 350;
            
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
            
            console.log(`TGM4 Normal: A grade achieved! Total A grades: ${this.aGradeCount}`);
            
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
    
    // Update grade display to show A of B grading
    updateGradeDisplay(gameScene) {
        if (gameScene.gradeText && gameScene.game) {
            const grade = this.calculateNormalModeGrade(gameScene.game.level, gameScene.game.score);
            gameScene.gradeText.setText(`Grade: ${grade}`);
        }
    }
    
    // Check for all clear
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;
        
        // Check if board is completely empty after line clear
        return gameScene.game.board.grid.every(row => row.every(cell => cell === 0));
    }

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene && gameScene.game) {
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score);
            console.log(`TGM4 Normal Game Over - Final Grade: ${finalGrade}`);
            console.log(`Tetris: ${this.tetrisCount}, All Clear: ${this.allClearCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_normal';
    }
    
    // Reset mode state
    reset() {
        super.reset();
        this.aPartPoints = 0;
        this.aGradeCount = 0;
        this.currentSectionPoints = 0;
        this.sectionAPoints = [];
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
    module.exports = TGM4NormalMode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4NormalMode = TGM4NormalMode;
}
