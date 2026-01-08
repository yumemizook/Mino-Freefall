// TGM4 3.1 Mode Implementation
// Recreation of Shirase mode - 20G with 2000 levels and SX grading

class TGM4_3_1Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 3.1';
        this.description = 'TGM4 3.1 mode - Shirase recreation';
        this.startTime = null;
        this.garbageCounter = 0;
        this.currentSection = 0;
        this.currentBGMTrack = null;
        this.gameScene = null;
        this.torikans = [
            { level: 1000, time: 241000, grade: 'S10' },  // 4:01
            { level: 1300, time: 270000, grade: 'S13' },  // 4:30
            { level: 2000, time: 406000, grade: 'S20' }   // 6:46
        ];
        
        // Initialize tracking variables
        this.tetrisCount = 0;
        this.allClearCount = 0;
        this.displayedGrade = '1';
        this.currentTimingPhase = 1; // 1-8 phases based on level
        this.timingPhases = [
            { minLevel: 0,   maxLevel: 99,  are: 12/60, lineAre: 8/60, das: 8/60, arr: 1/60, lock: 18/60, lineClear: 6/60 },
            { minLevel: 100, maxLevel: 199, are: 12/60, lineAre: 7/60, das: 6/60, arr: 1/60, lock: 18/60, lineClear: 5/60 },
            { minLevel: 200, maxLevel: 299, are: 12/60, lineAre: 6/60, das: 6/60, arr: 1/60, lock: 17/60, lineClear: 4/60 },
            { minLevel: 300, maxLevel: 499, are: 6/60, lineAre: 6/60, das: 6/60, arr: 1/60, lock: 15/60, lineClear: 4/60 },
            { minLevel: 500, maxLevel: 599, are: 6/60, lineAre: 5/60, das: 4/60, arr: 1/60, lock: 13/60, lineClear: 3/60 },
            { minLevel: 600, maxLevel: 1099, are: 6/60, lineAre: 5/60, das: 4/60, arr: 1/60, lock: 12/60, lineClear: 3/60 },
            { minLevel: 1100, maxLevel: 1199, are: 6/60, lineAre: 5/60, das: 4/60, arr: 1/60, lock: 10/60, lineClear: 3/60 },
            { minLevel: 1200, maxLevel: 1999, are: 6/60, lineAre: 5/60, das: 4/60, arr: 1/60, lock: 8/60, lineClear: 3/60 },
            { minLevel: 2000, maxLevel: 2000, are: 12/60, lineAre: 6/60, das: 6/60, arr: 1/60, lock: 17/60, lineClear: 4/60 }
        ];
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'fixed_20g', // Fixed 20G gravity
                value: 5120,    // 20G value
                curve: null
            },
            das: 10/60,      // 2 frames shorter than Ti
            arr: 1/60,       // Fast ARR
            are: 12/60,      // Fast ARE
            lineAre: 8/60,   // Fast Line ARE
            lockDelay: 18/60, // Fast lock delay
            lineClearDelay: 6/60, // Fast line clear

            nextPieces: 6,   // TGM4 shows 6 pieces
            holdEnabled: true, // TGM4 has hold
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 2000, // Extended to 2000 levels
            
            specialMechanics: {
                movementLimitation: true,
                maxMoveResets: 8,
                maxRotationResets: 2,
                diagonalInput: false,
                extraButton: true,
                irs180: true,
                gradingSystem: 'shirase', // Shirase-style grading
                garbageSystem: true, // Enable garbage system
                torikans: true, // Enable multiple torikans
                bgmSystem: true, // Enable BGM system
                bgmTracks: {
                    level500_999: 'bgm/tm3_4.mp3',
                    level1000_1299: 'bgm/tm2_3.mp3',
                    level1300_plus: 'bgm/tm3_6.mp3'
                },
                bgmStopThresholds: [999, 1299, 1999] // Stop BGM at these levels
            }
        };
    }

    // Get garbage quota for current section
    getGarbageQuota(section) {
        // Garbage quotas by section (simplified version)
        const quotas = {
            5: 4,   // 500-599
            6: 4,   // 600-699
            7: 5,   // 700-799
            8: 5,   // 800-899
            9: 6,   // 900-999
            10: 6,  // 1000-1099
            11: 7,  // 1100-1199
            12: 7,  // 1200-1299
            13: 8,  // 1300-1399
            14: 8,  // 1400-1499
            15: 9,  // 1500-1599
            16: 9,  // 1600-1699
            17: 10, // 1700-1799
            18: 10, // 1800-1899
            19: 11, // 1900-1999
            20: 11  // 2000+
        };
        return quotas[section] || 4;
    }

    // Handle garbage system
    onPieceSpawn(piece, game) {
        // Increment garbage counter for each piece
        this.garbageCounter++;
        
        // Add garbage after level 500
        if (game.level >= 500 && this.garbageCounter >= 4) {
            this.garbageCounter = 0;
            // Add garbage line logic would go here
            console.log('TGM4 3.1: Adding garbage line');
        }
        
        return piece;
    }

    onLineClear(lines, game) {
        // Decrement garbage counter for each line cleared
        this.garbageCounter = Math.max(0, this.garbageCounter - lines);
        
        return lines;
    }

    // Check if garbage should be sent
    checkGarbageSend(level) {
        const section = Math.floor(level / 100);
        const quota = this.getGarbageQuota(section);
        
        if (this.garbageCounter >= quota) {
            this.garbageCounter = 0;
            return true;
        }
        return false;
    }

    // Send garbage line
    sendGarbageLine(game) {
        // Shift all rows up
        for (let y = 1; y < game.playfield.length; y++) {
            game.playfield[y - 1] = [...game.playfield[y]];
        }
        
        // Add garbage row at bottom with one hole
        const garbageRow = new Array(game.playfield[0].length).fill(8); // 8 = garbage block
        const holePosition = Math.floor(Math.random() * garbageRow.length);
        garbageRow[holePosition] = 0;
        game.playfield[game.playfield.length - 1] = garbageRow;
        
        console.log('TGM4 3.1: Garbage line sent');
    }

    // Check torikans
    checkTorikans(level, elapsedTime) {
        for (const torikan of this.torikans) {
            if (level >= torikan.level && elapsedTime > torikan.time) {
                return torikan.grade;
            }
        }
        return null;
    }

    // Calculate SX grade
    calculateSXGrade(level) {
        // When the game ends, the player is awarded SX, where X is the number of sections passed
        const sectionsPassed = Math.floor(level / 100);
        return `S${sectionsPassed}`;
    }

    // Get current grade
    getCurrentGrade(level, elapsedTime) {
        // Check torikans first
        const torikanGrade = this.checkTorikans(level, elapsedTime);
        if (torikanGrade) {
            return torikanGrade;
        }
        
        // Otherwise show current SX grade
        return this.calculateSXGrade(level);
    }

    // Shirase scoring system (same as TGM3)
    calculateScore(baseScore, lines, piece, game) {
        if (lines === 0) return baseScore;

        // TGM3/TAP scoring: 100/300/500/800 × level
        const level = game.level || 1;
        let score = 0;

        switch (lines) {
            case 1:
                score = 100 * level;
                break;
            case 2:
                score = 300 * level;
                break;
            case 3:
                score = 500 * level;
                break;
            case 4:
                score = 800 * level;
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

        return Math.floor(score);
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        this.garbageCounter = 0;
        this.gameScene = gameScene;
        
        // Set up Shirase UI (grade moved down to TGM3 position)
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            // Move grade display down to match TGM3 position
            gameScene.gradeText.setY(gameScene.gradeText.y + 20); // Move down by 20 pixels
            gameScene.gradeText.setText('GRADE: S0');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 0:00.00');
        }
        
        // Start initial BGM if level is appropriate
        if (gameScene && gameScene.level >= 500) {
            this.updateBGM(gameScene.level);
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            const minutes = Math.floor(elapsedTime / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10);
            
            // Update time display
            if (gameScene.timeText) {
                gameScene.timeText.setText(`TIME: ${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`);
            }
            
            // Update grade display
            if (gameScene.gradeText) {
                const grade = this.calculateSXGrade(gameScene.game.level);
                gameScene.gradeText.setText(`GRADE: ${grade}`);
            }
            
            // Check torikans
            const torikanGrade = this.checkTorikans(gameScene.game.level, elapsedTime);
            if (torikanGrade) {
                console.log(`TGM4 3.1: Torikan reached - Grade: ${torikanGrade}`);
                // Game should end here
            }
        }
    }

    // Handle level updates
    onLevelUpdate(level, oldLevel, updateType, amount) {
        const newSection = Math.floor(level / 100);
        const oldSection = Math.floor(oldLevel / 100);
        
        if (newSection !== oldSection) {
            this.currentSection = newSection;
            console.log(`TGM4 3.1: Entered section ${newSection} at level ${level}`);
        }
        
        // Check for garbage send during ARE
        if (this.checkGarbageSend(level)) {
            // This would be called during ARE in the actual game
            console.log(`TGM4 3.1: Sending garbage at level ${level}`);
        }
        
        // Handle BGM changes based on level
        this.updateBGM(level);
        
        return level;
    }
    
    // Update BGM based on current level
    updateBGM(level) {
        const config = this.getModeConfig();
        const bgmTracks = config.specialMechanics.bgmTracks;
        const bgmStopThresholds = config.specialMechanics.bgmStopThresholds;
        
        if (!bgmTracks || !bgmStopThresholds) return;
        
        let newTrack = null;
        
        // Determine which BGM should play based on level
        if (level >= 500 && level <= 999) {
            newTrack = bgmTracks.level500_999;
        } else if (level >= 1000 && level <= 1299) {
            newTrack = bgmTracks.level1000_1299;
        } else if (level >= 1300) {
            newTrack = bgmTracks.level1300_plus;
        }
        
        // Check if we should stop BGM at threshold levels
        const shouldStop = bgmStopThresholds.includes(level);
        
        if (shouldStop) {
            this.stopBGM();
        } else if (newTrack && newTrack !== this.currentBGMTrack) {
            this.playBGM(newTrack);
        }
    }
    
    // Play BGM track
    playBGM(trackPath) {
        // This would integrate with the game's audio system
        console.log(`TGM4 3.1: Playing BGM track: ${trackPath}`);
        this.currentBGMTrack = trackPath;
        
        // In a real implementation, this would trigger the game's audio system
        // to play the specified track
        if (this.gameScene && typeof this.gameScene.playBGM === 'function') {
            this.gameScene.playBGM(trackPath);
        }
    }
    
    // Stop BGM
    stopBGM() {
        console.log('TGM4 3.1: Stopping BGM at threshold level');
        this.currentBGMTrack = null;
        
        // In a real implementation, this would stop the current BGM
        if (this.gameScene && typeof this.gameScene.stopBGM === 'function') {
            this.gameScene.stopBGM();
        }
    }

    // Handle game over
    onGameOver(gameScene) {
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            console.log(`TGM4 3.1 Game Over - Time: ${Math.floor(elapsedTime / 1000)}s`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_3_1';
    }
    
    // Reset mode state
    reset() {
        this.startTime = null;
        this.garbageCounter = 0;
        this.currentSection = 0;
        this.currentBGMTrack = null;
        this.gameScene = null;
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
    module.exports = TGM4_3_1Mode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM4_3_1Mode = TGM4_3_1Mode;
}
