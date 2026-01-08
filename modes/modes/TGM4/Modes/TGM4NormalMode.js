// TGM4 Normal Mode Implementation
// 999-level mode with A of B grading system

class TGM4NormalMode extends BaseMode {
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

            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
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
                gradingSystem: 'normal', // TGM4 Normal grading
                aPartGrading: true, // Enable A part grading
                pushdownPoints: true // TGM4 has pushdown points like guideline
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

    // Calculate TGM4 Normal mode grade based on score and level
    calculateNormalModeGrade(level, score) {
        // TGM4 Normal uses A part grading system
        // Display A grades if achieved, otherwise show "Zero of Zero"
        if (this.aGradeCount > 0) {
            return `A${this.aGradeCount}`;
        }
        return 'Zero of Zero';
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

    // Handle game over
    onGameOver(gameScene) {
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
    
    // Reset mode state
    reset() {
        this.aPartPoints = 0;
        this.aGradeCount = 0;
        this.currentSectionPoints = 0;
        this.sectionAPoints = [];
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
    module.exports = TGM4NormalMode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4NormalMode = TGM4NormalMode;
}
