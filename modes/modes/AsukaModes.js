// Asuka Race Modes
// 20G speed attack modes with different difficulty levels

// Asuka Easy Mode - Introduction to 20G stacking
class AsukaEasyMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Asuka Easy';
        this.description = '20G Tetris stacking introduction';
        this.targetLevel = 300; // Easy target
        this.timeLimit = 300000; // 5 minutes in milliseconds
        this.startTime = null;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'fixed_20g',
                value: 5120,
                curve: null
            },
            das: 16/60,      // More forgiving DAS
            arr: 2/60,       // Slower ARR for beginners
            are: 20/60,      // Reasonable ARE
            lineAre: 16/60,
            lockDelay: 0.5,  // Generous lock delay
            lineClearDelay: 30/60,
            
            nextPieces: 6,   // Show 6 pieces for planning
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 300,
            
            specialMechanics: {
                raceMode: true,
                targetLevel: 300,
                timeLimit: 300000, // 5 minutes
                beginnerFriendly: true,
                generousTiming: true
            }
        };
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        
        // Set up Asuka UI
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0/300');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 5:00');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('TARGET: 300');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game && this.startTime) {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.timeLimit - elapsed);
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            // Update time display
            if (gameScene.timeText) {
                gameScene.timeText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
            
            // Update level display
            if (gameScene.levelText) {
                gameScene.levelText.setText(`LEVEL: ${gameScene.game.level}/300`);
            }
            
            // Check time limit
            if (remaining <= 0 && gameScene.game.level < this.targetLevel) {
                console.log('Asuka Easy: Time limit reached!');
                if (typeof gameScene.gameOver === 'function') {
                    gameScene.gameOver();
                }
            }
            
            // Check victory condition
            if (gameScene.game.level >= this.targetLevel) {
                const completionTime = elapsed / 1000;
                console.log(`Asuka Easy: Completed in ${completionTime.toFixed(2)} seconds!`);
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'asuka_easy';
    }
    
    // Reset mode state
    reset() {
        this.startTime = null;
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

// Asuka Normal Mode - Standard race to 1300
class AsukaNormalMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Asuka';
        this.description = 'Race mode. Finish 1300 levels in 7 minutes.';
        this.targetLevel = 1300;
        this.timeLimit = 420000; // 7 minutes in milliseconds
        this.startTime = null;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'fixed_20g',
                value: 5120,
                curve: null
            },
            das: 12/60,      // T.A. Death DAS
            arr: 1/60,       // Fast ARR
            are: 16/60,      // Standard ARE
            lineAre: 12/60,
            lockDelay: 0.3,  // Standard lock delay
            lineClearDelay: 12/60,
            
            nextPieces: 6,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 1300,
            
            specialMechanics: {
                raceMode: true,
                targetLevel: 1300,
                timeLimit: 420000, // 7 minutes
                standard20G: true,
                competitiveTiming: true
            }
        };
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        
        // Set up Asuka UI
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0/1300');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 7:00');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('TARGET: 1300');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game && this.startTime) {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.timeLimit - elapsed);
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            // Update time display
            if (gameScene.timeText) {
                gameScene.timeText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
            
            // Update level display
            if (gameScene.levelText) {
                gameScene.levelText.setText(`LEVEL: ${gameScene.game.level}/1300`);
            }
            
            // Check time limit
            if (remaining <= 0 && gameScene.game.level < this.targetLevel) {
                console.log('Asuka Normal: Time limit reached!');
                if (typeof gameScene.gameOver === 'function') {
                    gameScene.gameOver();
                }
            }
            
            // Check victory condition
            if (gameScene.game.level >= this.targetLevel) {
                const completionTime = elapsed / 1000;
                console.log(`Asuka Normal: Completed in ${completionTime.toFixed(2)} seconds!`);
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'asuka_normal';
    }
    
    // Reset mode state
    reset() {
        this.startTime = null;
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

// Asuka Hard Mode - Expert challenge
class AsukaHardMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Asuka Hard';
        this.description = 'The true test of skill and speed!';
        this.targetLevel = 1300;
        this.timeLimit = 300000; // 5 minutes in milliseconds
        this.startTime = null;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'fixed_20g',
                value: 5120,
                curve: null
            },
            das: 8/60,       // Very fast DAS
            arr: 0/60,       // Instant ARR
            are: 12/60,      // Fast ARE
            lineAre: 8/60,
            lockDelay: 0.2,  // Very fast lock delay
            lineClearDelay: 12/60,
            
            nextPieces: 6,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 1300,
            
            specialMechanics: {
                raceMode: true,
                targetLevel: 1300,
                timeLimit: 300000, // 5 minutes
                expertChallenge: true,
                extremeTiming: true,
                noForgiveness: true
            }
        };
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        
        // Set up Asuka Hard UI
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0/1300');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 5:00');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('TARGET: 1300');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game && this.startTime) {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.timeLimit - elapsed);
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            // Update time display
            if (gameScene.timeText) {
                gameScene.timeText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
            
            // Update level display
            if (gameScene.levelText) {
                gameScene.levelText.setText(`LEVEL: ${gameScene.game.level}/1300`);
            }
            
            // Check time limit
            if (remaining <= 0 && gameScene.game.level < this.targetLevel) {
                console.log('Asuka Hard: Time limit reached!');
                if (typeof gameScene.gameOver === 'function') {
                    gameScene.gameOver();
                }
            }
            
            // Check victory condition
            if (gameScene.game.level >= this.targetLevel) {
                const completionTime = elapsed / 1000;
                console.log(`Asuka Hard: Completed in ${completionTime.toFixed(2)} seconds!`);
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
    }

    // Get mode ID
    getModeId() {
        return 'asuka_hard';
    }
    
    // Reset mode state
    reset() {
        this.startTime = null;
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
    module.exports = { AsukaEasyMode, AsukaNormalMode, AsukaHardMode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.AsukaEasyMode = AsukaEasyMode;
    window.AsukaNormalMode = AsukaNormalMode;
    window.AsukaHardMode = AsukaHardMode;
}
