// TGM4 3.1 Mode Implementation
// Recreation of Shirase mode - 20G with 2000 levels and SX grading

class TGM4_3_1Mode extends TGM4BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 3.1';
        this.description = 'TGM4 3.1 mode - Shirase recreation';
        this.startTime = null;
        this.garbageCounter = 0;
        this.currentSection = 0;
        this.torikans = [
            { level: 1000, time: 241000, grade: 'S10' },  // 4:01
            { level: 1300, time: 270000, grade: 'S13' },  // 4:30
            { level: 2000, time: 406000, grade: 'S20' }   // 6:46
        ];
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static', // Fixed 20G
                value: 5120,    // 20G value
                curve: null
            },
            das: 12/60,      // 2 frames shorter than Ti
            arr: 1/60,       // Fast ARR
            are: 12/60,      // Fast ARE
            lineAre: 12/60,  // Fast Line ARE
            lockDelay: 0.3,  // Fast lock delay
            lineClearDelay: 20/60, // Fast line clear

            nextPieces: 3,   // Show 3 next pieces
            holdEnabled: true,
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
                torikans: true // Enable multiple torikans
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
        super.onPieceSpawn(piece, game);
        
        // Increment garbage counter for each piece
        this.garbageCounter++;
        
        return piece;
    }

    onLineClear(lines, game) {
        super.onLineClear(lines, game);
        
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
        const sectionsPassed = Math.floor(level / 100);
        return `S${sectionsPassed}`;
    }

    // TGM3 scoring system
    calculateScore(baseScore, lines, piece, game) {
        let score = 0;
        const level = game.level || 1;

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

        // Add soft drop points
        if (game.softDropPoints) {
            score += game.softDropPoints;
        }

        // Add hard drop points
        if (game.hardDropPoints) {
            score += game.hardDropPoints;
        }

        return Math.floor(score);
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = Date.now();
        this.garbageCounter = 0;
        
        // Set up Shirase UI
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('SCORE: 0');
        }
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        if (gameScene.gradeText) {
            gameScene.gradeText.setText('GRADE: S0');
        }
        if (gameScene.timeText) {
            gameScene.timeText.setText('TIME: 0:00.00');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        super.update(gameScene, deltaTime);

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
        
        return level;
    }

    // Handle game over
    onGameOver(gameScene) {
        super.onGameOver(gameScene);
        
        if (gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            const finalGrade = this.calculateSXGrade(gameScene.game.level);
            
            // Check if game ended due to torikan
            const torikanGrade = this.checkTorikans(gameScene.game.level, elapsedTime);
            const displayGrade = torikanGrade || finalGrade;
            
            console.log(`TGM4 3.1 Game Over - Final Grade: ${displayGrade}`);
            console.log(`Score: ${gameScene.game.score}, Level: ${gameScene.game.level}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Tetris: ${this.tetrisCount}`);
        }
    }

    // Get mode ID
    getModeId() {
        return 'tgm4_3_1';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4_3_1Mode;
}
