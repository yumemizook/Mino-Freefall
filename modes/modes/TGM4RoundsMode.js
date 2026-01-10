// TGM4 Master Mode Implementation
// Based on TGM4 Master mode documentation - ultimate test of Tetris skill

class TGM4RoundsMode extends TGM4BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 Rounds';
        this.modeId = 'tgm4_rounds';
        this.description = 'TGM4 Master - The ultimate test of Tetris skill';
        
        // TGM4 Master mechanics
        this.currentSection = '';
        this.medals = {
            allClear: 0,
            tetris: 0,
            tspin: 0,
            pikii: 0
        };
        this.masterGradeAchieved = false;
        this.cycloneActive = false;
        this.masterPikiiActive = false;
        this.pikiiActive = false;
        this.pikii2Active = false;
        this.endGameActive = false;
        this.rewindTime = 65000; // 65 seconds in milliseconds
        this.torikanTime = 435000; // 7:15 in milliseconds
        this.levelAtEndGameStart = 0;
        this.piecesInLast65Seconds = [];
        this.startTime = null;
        this.frozenLines = [];
        this.masterPikiiFreezeTime = 2; // starts at 2 frames
    }

    getModeConfig() {
        return {
            ...this.getDefaultConfig(),
            gravity: { type: 'fixed_20g' }, // Fixed 20G
            das: 10/60,      // Standard DAS (12 frames for most sections)
            arr: 0/60,       // Instant ARR
            are: 12/60,      // ARE (varies by section)
            lineAre: 8/60,   // Line ARE (varies by section)
            lockDelay: 20/60, // Lock delay (varies by section)
            lineClearDelay: 6/60, // Line clear delay (varies by section)
            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 2600, // TGM4 Master goes to 2600
            specialMechanics: {
                ...this.getDefaultConfig().specialMechanics,
                masterMode: true,
                medals: true,
                pikii: true,
                cyclone: true,
                masterPikii: true,
                endGame: true,
                pieceMovementLimitation: true
            }
        };
    }

    // Get timing based on level (from TGM4 Master documentation)
    getARE() {
        const level = this.getCurrentLevel();
        if (level >= 1000 && level <= 1799) return 12/60;
        if (level >= 1800 && level <= 1899) return 12/60;
        if (level >= 1900 && level <= 1999) return 12/60;
        if (level >= 2000 && level <= 2300) return 12/60;
        if (level >= 2301) return 12/60;
        
        // Standard timings
        if (level >= 900 && level <= 999) return 6/60;
        if (level >= 800 && level <= 899) return 7/60;
        if (level >= 700 && level <= 799) return 7/60;
        if (level >= 600 && level <= 699) return 7/60;
        if (level >= 500 && level <= 599) return 8/60;
        if (level >= 400 && level <= 499) return 9/60;
        if (level >= 300 && level <= 399) return 10/60;
        if (level >= 200 && level <= 299) return 12/60;
        if (level >= 100 && level <= 199) return 12/60;
        if (level >= 0 && level <= 99) return 12/60;
        
        return 12/60; // default
    }

    getLineARE() {
        const level = this.getCurrentLevel();
        if (level >= 1000) return 10/60;
        if (level >= 900 && level <= 999) return 5/60;
        if (level >= 800 && level <= 899) return 5/60;
        if (level >= 700 && level <= 799) return 5/60;
        if (level >= 600 && level <= 699) return 5/60;
        if (level >= 500 && level <= 599) return 5/60;
        if (level >= 400 && level <= 499) return 6/60;
        if (level >= 300 && level <= 399) return 6/60;
        if (level >= 200 && level <= 299) return 6/60;
        if (level >= 100 && level <= 199) return 7/60;
        if (level >= 0 && level <= 99) return 8/60;
        
        return 8/60; // default
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

    getDAS() {
        const level = this.getCurrentLevel();
        if (level >= 2301) return 4/60; // TGM DAS
        if (level >= 1000) return 8/60; // Standard DAS
        if (level >= 800 && level <= 899) return 8/60;
        if (level >= 600 && level <= 799) return 10/60;
        if (level >= 300 && level <= 599) return 12/60;
        if (level >= 0 && level <= 299) return 12/60;
        
        return 12/60; // default
    }

    getLockDelay() {
        const level = this.getCurrentLevel();
        if (level >= 1000 && level <= 1799) return 16/60;
        if (level >= 1800 && level <= 1899) return 14/60;
        if (level >= 1900 && level <= 1999) return 12/60;
        if (level >= 2000) return 10/60;
        if (level >= 900 && level <= 999) return 10/60;
        if (level >= 800) return 12/60;
        if (level >= 600 && level <= 799) return 16/60;
        if (level >= 400 && level <= 599) return 19/60;
        if (level >= 200 && level <= 399) return 20/60;
        if (level >= 0 && level <= 199) return 20/60;
        
        return 20/60; // default
    }

    getLineClearDelay() {
        const level = this.getCurrentLevel();
        if (level >= 1000) return 3/60;
        if (level >= 0 && level <= 99) return 6/60;
        if (level >= 100 && level <= 199) return 5/60;
        if (level >= 200 && level <= 999) return 4/60;
        
        return 4/60; // default
    }

    getCurrentLevel() {
        // This should be overridden by the game scene to get the actual level
        return 0;
    }

    // Handle level progression with section mechanics
    onLevelUpdate(level, oldLevel, updateType, amount) {
        let nextLevel = level;
        
        // Update section mechanics
        this.updateSectionMechanics(nextLevel);
        
        // Check for Master grade achievement at level 1100
        if (nextLevel >= 1100 && !this.masterGradeAchieved) {
            this.masterGradeAchieved = true;
            console.log('TGM4 Rounds: Master grade achieved at level 1100');
        }
        
        // Check for torikan at level 2600
        if (nextLevel >= 2600 && !this.endGameActive) {
            const elapsedTime = Date.now() - this.startTime;
            if (elapsedTime > this.torikanTime) {
                console.log('TGM4 Rounds: Torikan - time exceeded 7:15');
                return 'torikan';
            } else {
                this.startEndGame();
            }
        }
        
        return nextLevel;
    }

    updateSectionMechanics(level) {
        // Pikii sections (300-399, 500-599)
        if ((level >= 300 && level <= 399) || (level >= 500 && level <= 599)) {
            if (!this.pikiiActive) {
                this.pikiiActive = true;
                this.pikii2Active = false;
                console.log(`TGM4 Rounds: Pikii section activated at level ${level}`);
            }
        }
        // Pikii-2 sections (700-999)
        else if (level >= 700 && level <= 999) {
            if (!this.pikii2Active) {
                this.pikiiActive = true;
                this.pikii2Active = true;
                console.log(`TGM4 Rounds: Pikii-2 section activated at level ${level}`);
            }
        }
        // Cyclone section (1000+)
        else if (level >= 1000 && !this.cycloneActive) {
            this.cycloneActive = true;
            this.pikiiActive = false;
            this.pikii2Active = false;
            console.log(`TGM4 Rounds: Cyclone section activated at level ${level}`);
        }
        // Master Pikii section (1300+)
        else if (level >= 1300 && !this.masterPikiiActive) {
            this.masterPikiiActive = true;
            console.log(`TGM4 Rounds: Master Pikii section activated at level ${level}`);
        }
        // Clear sections
        else if (level < 300 || (level >= 400 && level <= 499) || (level >= 600 && level <= 699)) {
            this.pikiiActive = false;
            this.pikii2Active = false;
        }
    }

    startEndGame() {
        this.endGameActive = true;
        this.levelAtEndGameStart = this.getCurrentLevel();
        console.log(`TGM4 Rounds: END GAME section started at level ${this.levelAtEndGameStart}`);
        
        // In a real implementation, this would trigger the rewind mechanics
        // For now, we'll just log it
        if (this.gameScene && typeof this.gameScene.showEndGame === 'function') {
            this.gameScene.showEndGame();
        }
    }

    // Handle line clears with medal system
    onLineClear(lines, game) {
        // Check for medals
        if (lines === 4) {
            this.medals.tetris++;
            console.log(`TGM4 Rounds: Tetris medal earned! Total: ${this.medals.tetris}`);
        }
        
        // Check for all clear
        if (this.isAllClear(game)) {
            this.medals.allClear++;
            console.log(`TGM4 Rounds: All Clear medal earned! Total: ${this.medals.allClear}`);
        }
        
        // Handle Pikii mechanics
        if (this.pikiiActive || this.pikii2Active) {
            this.handlePikiiLineClear(lines, game);
        }
        
        // Handle Master Pikii mechanics
        if (this.masterPikiiActive) {
            this.handleMasterPikiiLineClear(lines, game);
        }
        
        return lines;
    }

    handlePikiiLineClear(lines, game) {
        // In Pikii sections, line clears in frozen area don't clear immediately
        // This is a simplified implementation
        console.log(`TGM4 Rounds: Pikii line clear - ${lines} lines`);
    }

    handleMasterPikiiLineClear(lines, game) {
        // In Master Pikii, pieces freeze after a certain time
        // Tetris clears bottom row
        if (lines === 4) {
            console.log(`TGM4 Rounds: Tetris in Master Pikii - clearing bottom row`);
            // Implementation would clear bottom row here
        }
    }

    // Calculate Master Pikii freeze time based on medals
    getMasterPikiiFreezeTime() {
        let freezeTime = 2; // starts at 2 frames
        
        // Add time based on medals
        freezeTime += Math.floor(this.medals.allClear * 2.5);
        freezeTime += Math.floor(this.medals.tetris * 1);
        freezeTime += Math.floor(this.medals.tspin * 1);
        freezeTime += Math.floor(this.medals.pikii * 3);
        
        return freezeTime / 60; // convert to seconds
    }

    // Handle piece placement with mechanics
    onPieceLock(piece, game) {
        // Track pieces for rewind mechanics
        if (this.endGameActive) {
            this.piecesInLast65Seconds.push({
                piece: piece,
                timestamp: Date.now(),
                level: game.level
            });
            
            // Keep only last 65 seconds of pieces
            const cutoffTime = Date.now() - this.rewindTime;
            this.piecesInLast65Seconds = this.piecesInLast65Seconds.filter(p => p.timestamp > cutoffTime);
        }
        
        return true;
    }

    // Get current grade
    getCurrentGrade(level, score) {
        if (this.endGameActive) {
            return 'GRAND-MASTER! Rounds';
        } else if (level >= 2600) {
            const elapsedTime = Date.now() - this.startTime;
            if (elapsedTime <= this.torikanTime) {
                return 'GRAND-MASTER! Rounds';
            } else {
                return 'GRAND-MASTER';
            }
        } else if (this.masterGradeAchieved) {
            return 'Master';
        } else {
            return this.calculateNormalModeGrade(level, score);
        }
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        this.gameScene = gameScene;
        
        // Set up TGM4-specific UI elements
        if (gameScene.tetrisCountText) {
            gameScene.tetrisCountText.setText('Tetris: 0');
        }
        if (gameScene.allClearCountText) {
            gameScene.allClearCountText.setText('All Clear: 0');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('Grade: ---');
        }
        
        console.log('TGM4 Rounds: Initialized - Master mechanics will activate progressively');
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

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene && gameScene.game) {
            const elapsedTime = gameScene.game.startTime ? Date.now() - gameScene.game.startTime : 0;
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score);
            console.log(`TGM4 Rounds Game Over - Final Grade: ${finalGrade}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
            console.log(`Medals - All Clear: ${this.medals.allClear}, Tetris: ${this.medals.tetris}, T-Spin: ${this.medals.tspin}, Pikii: ${this.medals.pikii}`);
        }
    }

    // Reset mode state
    reset() {
        super.reset();
        
        // Reset Master-specific tracking
        this.currentSection = '';
        this.medals = {
            allClear: 0,
            tetris: 0,
            tspin: 0,
            pikii: 0
        };
        this.masterGradeAchieved = false;
        this.cycloneActive = false;
        this.masterPikiiActive = false;
        this.pikiiActive = false;
        this.pikii2Active = false;
        this.endGameActive = false;
        this.levelAtEndGameStart = 0;
        this.piecesInLast65Seconds = [];
        this.startTime = null;
        this.frozenLines = [];
        this.gameScene = null;
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_rounds';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4RoundsMode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4RoundsMode = TGM4RoundsMode;
}
