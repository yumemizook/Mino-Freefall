// Master TGM4 Mode Implementation
// 20G Master variant with unique mechanics and enhanced grading

class MasterTGM4Mode extends TGM4Mode {
    constructor() {
        super();
        this.modeName = 'Master TGM4';
        this.modeId = 'master20g';
        this.description = 'TGM4 Master - 20G with unique mechanics and enhanced grading';
        
        // Master-specific mechanics
        this.masterMechanicsActive = false;
        this.activationLevel = 100; // Activate at level 100
        this.speedBonusMultiplier = 1.0;
        this.comboCount = 0;
        this.maxCombo = 0;
        this.perfectClears = 0;
        
        // Enhanced grading
        this.masterGradePoints = 0;
        this.masterGradeThresholds = {
            'M': 1000,
            'MK': 2000,
            'MV': 3000,
            'MO': 4000,
            'MM': 5000,
            'GM': 6000
        };
        this.currentMasterGrade = 'M';
    }

    getModeConfig() {
        const config = super.getModeConfig();
        return {
            ...config,
            gravity: { type: 'fixed_20g' }, // Fixed 20G
            das: 8/60,       // Master DAS (8/60 for most sections)
            arr: 0/60,       // Instant ARR
            are: 10/60,      // Faster ARE
            lineAre: 6/60,   // Faster Line ARE
            lockDelay: 15/60, // Faster lock delay
            lineClearDelay: 5/60, // Faster line clear
            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            description: 'TGM4 Master - 20G with unique mechanics and enhanced grading',
            specialMechanics: {
                ...config.specialMechanics,
                masterMode: true,
                uniqueMechanics: true,
                enhancedGrading: true,
                speedBonuses: true,
                comboSystem: true,
                perfectClearBonus: true
            }
        };
    }

    // Handle level progression with Master mechanics activation
    onLevelUpdate(level, oldLevel, updateType, amount) {
        let nextLevel = level;
        
        if (updateType === 'piece') {
            nextLevel = Math.min(level + 1, 999);
        } else if (updateType === 'lines') {
            const inc = Math.max(amount || 0, 0);
            // Master mode gives bonus levels for multi-line clears
            let bonus = 0;
            if (inc === 2) bonus = 1;
            else if (inc === 3) bonus = 2;
            else if (inc === 4) bonus = 3;
            
            nextLevel = Math.min(level + inc + bonus, 999);
        }
        
        // Activate Master mechanics at level 100
        if (nextLevel >= this.activationLevel && !this.masterMechanicsActive) {
            this.masterMechanicsActive = true;
            console.log('Master TGM4: Unique mechanics activated at level 100');
            
            // Apply visual/audio effects for activation
            if (this.gameScene && typeof this.gameScene.showMasterActivation === 'function') {
                this.gameScene.showMasterActivation();
            }
        }
        
        // Update Master grading
        this.updateMasterGrading();
        
        return nextLevel;
    }

    // Enhanced scoring for Master mode
    calculateScore(baseScore, lines, piece, game) {
        let score = super.calculateScore(baseScore, lines, piece, game);
        
        if (!this.masterMechanicsActive) {
            return score;
        }
        
        const level = game.level || 1;
        
        // Apply speed bonus multiplier
        score = Math.floor(score * this.speedBonusMultiplier);
        
        // Combo system
        if (lines > 0) {
            this.comboCount++;
            this.maxCombo = Math.max(this.maxCombo, this.comboCount);
            
            // Combo bonus: 50 points per combo level per line cleared
            const comboBonus = this.comboCount * 50 * lines;
            score += comboBonus;
        } else {
            this.comboCount = 0; // Reset combo on no line clear
        }
        
        // Perfect clear bonus
        if (this.checkPerfectClear(game)) {
            this.perfectClears++;
            const perfectClearBonus = 10000 * level; // Scaled by level
            score += perfectClearBonus;
            console.log(`Master TGM4: Perfect clear! +${perfectClearBonus} points`);
        }
        
        // Speed bonus calculation based on clear speed
        this.updateSpeedBonus(lines, game);
        
        return Math.floor(score);
    }

    // Check for perfect clear (board completely empty)
    checkPerfectClear(game) {
        if (!game || !game.board || !game.board.grid) return false;
        
        return game.board.grid.every(row => row.every(cell => cell === 0));
    }

    // Update speed bonus based on clear speed
    updateSpeedBonus(lines, game) {
        // This would typically track time between piece placements
        // For now, we'll use a simple system based on lines cleared
        if (lines === 4) { // Tetris gives biggest speed bonus
            this.speedBonusMultiplier = Math.min(this.speedBonusMultiplier + 0.1, 2.0);
        } else if (lines > 0) {
            this.speedBonusMultiplier = Math.min(this.speedBonusMultiplier + 0.05, 2.0);
        }
        
        // Decay speed bonus over time (simplified)
        if (Math.random() < 0.1) { // 10% chance to decay slightly
            this.speedBonusMultiplier = Math.max(this.speedBonusMultiplier - 0.02, 1.0);
        }
    }

    // Enhanced Master grading system
    updateMasterGrading() {
        if (!this.masterMechanicsActive) return;
        
        // Calculate Master grade points based on performance
        let points = 0;
        
        // Points from A part grading (Tetris and All Clears)
        points += this.aPartPoints * 0.5; // Convert A part points to Master points
        
        // Points from performance metrics
        points += this.maxCombo * 100; // Combo performance
        points += this.perfectClears * 500; // Perfect clear performance
        points += (this.speedBonusMultiplier - 1) * 1000; // Speed performance
        
        this.masterGradePoints = Math.floor(points);
        
        // Determine Master grade
        let newGrade = 'M';
        for (const [grade, threshold] of Object.entries(this.masterGradeThresholds)) {
            if (this.masterGradePoints >= threshold) {
                newGrade = grade;
            }
        }
        
        if (newGrade !== this.currentMasterGrade) {
            this.currentMasterGrade = newGrade;
            console.log(`Master TGM4: Grade advanced to ${newGrade} (${this.masterGradePoints} points)`);
            
            // Update grade display
            this.updateGradeDisplay(this.gameScene);
        }
    }

    // Override grade display for Master mode
    updateGradeDisplay(gameScene) {
        if (!gameScene || !gameScene.gradeText) return;
        
        let displayText;
        if (this.masterMechanicsActive) {
            // Show Master grade with A grade count
            const aGradeText = this.aGradeCount > 0 ? `A${this.aGradeCount}` : '';
            displayText = aGradeText ? `${this.currentMasterGrade} (${aGradeText})` : this.currentMasterGrade;
        } else {
            // Show regular A part grading before activation
            displayText = this.aGradeCount > 0 ? `A${this.aGradeCount}` : 'Zero of Zero';
        }
        
        gameScene.gradeText.setText(`Grade: ${displayText}`);
    }

    // Handle line clear events with Master mechanics
    handleLineClear(gameScene, linesCleared, pieceType) {
        super.handleLineClear(gameScene, linesCleared, pieceType);
        
        if (this.masterMechanicsActive) {
            // Master-specific effects for line clears
            if (linesCleared === 4) {
                // Special effect for Tetris in Master mode
                if (gameScene && typeof gameScene.showMasterTetrisEffect === 'function') {
                    gameScene.showMasterTetrisEffect();
                }
            }
            
            // Update Master grading after line clear
            this.updateMasterGrading();
        }
    }

    // Initialize for game scene with Master mode setup
    initializeForGameScene(gameScene) {
        super.initializeForGameScene(gameScene);
        this.gameScene = gameScene;
        
        // Set up Master-specific UI elements
        if (gameScene.comboText) {
            gameScene.comboText.setText('Combo: 0');
        }
        if (gameScene.speedBonusText) {
            gameScene.speedBonusText.setText('Speed: 1.0x');
        }
        if (gameScene.masterGradeText) {
            gameScene.masterGradeText.setText('Master: ---');
        }
        
        console.log('Master TGM4: Initialized - Unique mechanics will activate at level 100');
    }

    // Update UI elements with Master mode information
    update(gameScene, deltaTime) {
        super.update(gameScene, deltaTime);
        
        if (this.masterMechanicsActive) {
            // Update Master-specific UI
            if (gameScene.comboText) {
                gameScene.comboText.setText(`Combo: ${this.comboCount}`);
            }
            if (gameScene.speedBonusText) {
                gameScene.speedBonusText.setText(`Speed: ${this.speedBonusMultiplier.toFixed(1)}x`);
            }
            if (gameScene.masterGradeText) {
                gameScene.masterGradeText.setText(`Master: ${this.currentMasterGrade}`);
            }
        }
    }

    // Handle game over with Master mode statistics
    onGameOver(gameScene) {
        super.onGameOver(gameScene);
        
        if (gameScene && gameScene.game) {
            console.log('Master TGM4 Game Over Statistics:');
            console.log(`- Final Master Grade: ${this.currentMasterGrade}`);
            console.log(`- Master Grade Points: ${this.masterGradePoints}`);
            console.log(`- Max Combo: ${this.maxCombo}`);
            console.log(`- Perfect Clears: ${this.perfectClears}`);
            console.log(`- A Grades: ${this.aGradeCount}`);
            console.log(`- Tetris Count: ${this.tetrisCount}`);
            console.log(`- All Clear Count: ${this.allClearCount}`);
            
            // Check for GM requirements
            if (this.currentMasterGrade === 'GM') {
                console.log('Congratulations! Grand Master achieved in Master TGM4!');
            }
        }
    }

    // Reset Master mode state
    reset() {
        super.reset();
        
        // Reset Master-specific tracking
        this.masterMechanicsActive = false;
        this.speedBonusMultiplier = 1.0;
        this.comboCount = 0;
        this.maxCombo = 0;
        this.perfectClears = 0;
        this.masterGradePoints = 0;
        this.currentMasterGrade = 'M';
        this.gameScene = null;
    }

    // Get Master mode statistics
    getMasterStats() {
        return {
            masterGrade: this.currentMasterGrade,
            masterGradePoints: this.masterGradePoints,
            maxCombo: this.maxCombo,
            perfectClears: this.perfectClears,
            speedBonusMultiplier: this.speedBonusMultiplier,
            mechanicsActive: this.masterMechanicsActive
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasterTGM4Mode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.MasterTGM4Mode = MasterTGM4Mode;
}