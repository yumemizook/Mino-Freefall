// TGM4 3.1 Mode Implementation
// Recreation of Shirase mode - extends TGM3ShiraseMode with TGM4-specific differences

class TGM4_3_1Mode extends TGM3ShiraseMode {
    // Define getTimingForLevel method BEFORE constructor so it's available during super() call
    getTimingForLevel(level) {
        // Use TGM4 3.1 specific timing phases if available, otherwise fall back to parent
        if (this.timingPhases && this.timingPhases.length > 0) {
            const phase = this.timingPhases.find(p => level >= p.minLevel && level <= p.maxLevel);
            if (phase) {
                return {
                    are: phase.are / 60,
                    lineAre: phase.lineAre / 60,
                    das: phase.das / 60,
                    arr: phase.arr / 60,
                    lockDelay: phase.lock / 60,
                    lineClearDelay: phase.lineClear / 60
                };
            }
        }
        
        // Fall back to parent method if timingPhases not available yet
        return super.getTimingForLevel(level);
    }

    constructor() {
        // MUST call super() first in JavaScript
        super();
        
        // Now initialize TGM4 3.1 specific properties
        this.modeName = 'TGM4 3.1';
        this.modeId = 'tgm4_3_1';
        this.description = 'TGM4 3.1 mode - Shirase recreation to 2000';
        
        // Override TGM3 Shirase values with TGM4 3.1 specific values
        this.gravityLevelCap = 2000; // Goes to 2000 instead of 1300
        
        // TGM4 3.1 specific torikans (no torikan at level 500)
        this.torikans = [
            { level: 1000, time: 241000, grade: 'S10' },  // 4:01
            { level: 1300, time: 270000, grade: 'S13' },  // 4:30  
            { level: 2000, time: 406000, grade: 'S20' }   // 6:46
        ];
        
        // Override grade ladder to go to S20
        this.gradeLadder = [
            ' ', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 
            'S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17', 'S18', 'S19', 'S20'
        ];
        
        // TGM4 3.1 timing phases (2 frames shorter DAS than Ti)
        this.timingPhases = [
            { minLevel: 0,   maxLevel: 99,  are: 12, lineAre: 8, das: 8, arr: 1, lock: 18, lineClear: 6 },
            { minLevel: 100, maxLevel: 199, are: 12, lineAre: 7, das: 6, arr: 1, lock: 18, lineClear: 5 },
            { minLevel: 200, maxLevel: 299, are: 12, lineAre: 6, das: 6, arr: 1, lock: 17, lineClear: 4 },
            { minLevel: 300, maxLevel: 499, are: 6, lineAre: 6, das: 6, arr: 1, lock: 15, lineClear: 4 },
            { minLevel: 500, maxLevel: 599, are: 6, lineAre: 5, das: 4, arr: 1, lock: 13, lineClear: 3 },
            { minLevel: 600, maxLevel: 1099, are: 6, lineAre: 5, das: 4, arr: 1, lock: 12, lineClear: 3 },
            { minLevel: 1100, maxLevel: 1199, are: 6, lineAre: 5, das: 4, arr: 1, lock: 10, lineClear: 3 },
            { minLevel: 1200, maxLevel: 1999, are: 6, lineAre: 5, das: 4, arr: 1, lock: 8, lineClear: 3 },
            { minLevel: 2000, maxLevel: 2000, are: 12, lineAre: 6, das: 6, arr: 1, lock: 17, lineClear: 4 }
        ];
        
        // Garbage system (same as Shirase but goes to 2000)
        this.garbageCounter = 0;
        this.garbageQuotas = {
            500: 20, 600: 18, 700: 10, 800: 9, 900: 8,
            1400: 20, 1500: 18, 1600: 10, 1700: 9, 1800: 8, 1900: 2
        };
        
        // Update current timing now that timingPhases is initialized
        this.currentTiming = this.getTimingForLevel(0);
    }

    getModeConfig() {
        // Start with TGM3 Shirase config and override TGM4 3.1 differences
        const baseConfig = super.getModeConfig();
        
        return {
            ...baseConfig,
            gravityLevelCap: 2000, // Override: goes to 2000 instead of 1300
            nextPieces: 6, // TGM4 shows 6 pieces (vs 3 in Shirase)
            description: 'TGM4 3.1 - Shirase recreation to 2000',
            specialMechanics: {
                ...baseConfig.specialMechanics,
                // TGM4 3.1 specific mechanics
                noTorikanAt500: true, // No torikan at level 500 (unlike Shirase)
                bgmStopThresholds: [490, 990, 1290], // Stop BGM 10 levels before phase end
                torikans: [
                    { level: 1000, time: 241000, grade: 'S10' },  // 4:01
                    { level: 1300, time: 270000, grade: 'S13' },  // 4:30
                    { level: 2000, time: 406000, grade: 'S20' }   // 6:46
                ],
                // TGM4 specific mechanics
                monochromeAfter1000: true, // Bone blocks after level 1000
                garbageAfter500: true, // Rising garbage system
                bigRollAfter2000: true, // Big roll at 2000 (vs 1300 in Shirase)
                noRegrets: true, // No REGRET grades like Ti
                // BGM system
                bgmTracks: {
                    0: 'bgm/tm2_4.mp3', // Initial BGM
                    500: 'bgm/tm3_4.mp3', // BGM changes at level 500
                    1000: 'bgm/tm1_2.mp3', // BGM changes at level 1000
                    1300: 'bgm/tm3_6.mp3'  // BGM changes at level 1300  
                },
                // Credit roll specifics
                creditRoll: {
                    level: 2000,
                    duration: 60, // 60 seconds (xx seconds as mentioned in docs)
                    bigTetris: true,
                    music: 'bgm/tm1_endroll.mp3' // Use correct end roll music
                }
            }
        };
    }

    // Get garbage quota for current section
    getGarbageQuota(section) {
        // Official TGM4 3.1 garbage quotas
        const quotas = {
            5: 20,  // 500-599
            6: 18,  // 600-699
            7: 10,  // 700-799
            8: 9,   // 800-899
            9: 8,   // 900-999
            10: 20, // 1000-1099
            11: 18, // 1100-1199
            12: 10, // 1200-1299
            13: 9,  // 1300-1399
            14: 8,  // 1400-1499
            15: 20, // 1500-1599
            16: 18, // 1600-1699
            17: 10, // 1700-1799
            18: 9,  // 1800-1899
            19: 8,  // 1900-1999
            20: 2   // 2000+
        };
        return quotas[section] || 20;
    }

    // Handle garbage system (extends Shirase with TGM4 3.1 specific quotas)
    onPieceSpawn(piece, game) {
        // Call parent garbage handling first
        super.onPieceSpawn(piece, game);
        
        // TGM4 3.1 specific garbage handling
        const section = Math.floor(game.level / 100);
        const quota = this.getGarbageQuota(section);
        
        // Check if garbage should be sent during ARE
        if (game.level >= 500 && this.garbageCounter >= quota) {
            this.garbageCounter = 0;
            this.sendGarbageLine(game);
            console.log(`TGM4 3.1: Sending garbage line (quota: ${quota}) at level ${game.level}`);
        }
        
        return piece;
    }

    onLineClear(lines, game) {
        // Call parent line clear handling first
        const result = super.onLineClear(game, lines);
        
        // TGM4 3.1 specific: decrement garbage counter for each line cleared
        this.garbageCounter = Math.max(0, this.garbageCounter - lines);
        
        return result;
    }

    // Override BGM handling to use TGM4 3.1 specific tracks
    updateBGM(level) {
        // TGM4 3.1 specific BGM changes - handle this first
        const config = this.getModeConfig();
        const bgmTracks = config.specialMechanics.bgmTracks;
        
        if (!bgmTracks || !this.gameScene) return;
        
        // Check if level matches BGM change thresholds
        for (const [thresholdLevel, trackName] of Object.entries(bgmTracks)) {
            if (level === thresholdLevel) {
                this.playBGM(trackName);
                break;
            }
        }
        
        // Stop BGM at TGM4 3.1 specific thresholds
        const stopThresholds = config.specialMechanics.bgmStopThresholds || [];
        for (const threshold of stopThresholds) {
            if (level === threshold) {
                this.stopBGM();
                break;
            }
        }
        
        // Call parent BGM handling last (won't override TGM4 3.1 specific tracks)
        if (super.updateBGM) {
            super.updateBGM(level);
        }
    }

    // Override BGM playing to use TGM4 3.1 specific tracks
    playBGM(trackName) {
        this.currentBGMTrack = trackName;
        console.log(`TGM4 3.1: Playing BGM track: ${trackName}`);
        
        // In a real implementation, this would trigger the game's audio system
        if (this.gameScene && typeof this.gameScene.playBGM === 'function') {
            this.gameScene.playBGM(trackName);
        }
    }
    
    // Override BGM stopping to handle TGM4 3.1 specifics
    stopBGM() {
        console.log(`TGM4 3.1: Stopping BGM at threshold level`);
        this.currentBGMTrack = null;
        
        // In a real implementation, this would stop the current BGM
        if (this.gameScene && typeof this.gameScene.stopBGM === 'function') {
            this.gameScene.stopBGM();
        }
    }

    // Check torikans
    checkTorikans(level, elapsedTime) {
        const config = this.getModeConfig();
        const torikans = config.specialMechanics.torikans;
        
        for (const torikan of torikans) {
            if (level >= torikan.level && elapsedTime > torikan.time * 1000) {
                return torikan.grade;
            }
        }
        return null;
    }

    // Check GM requirements at level 2000
    checkGMRequirements(level, score, elapsedTime, rollPoints) {
        const config = this.getModeConfig();
        const gmReq = config.specialMechanics.gmRequirements;
        
        if (level >= 2000 && 
            elapsedTime <= gmReq.level2000.time * 1000 && 
            rollPoints >= gmReq.level2000.rollPoints) {
            return true;
        }
        return false;
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

    // Calculate SX grade
    calculateSXGrade(level) {
        // When the game ends, the player is awarded SX, where X is the number of sections passed
        const sectionsPassed = Math.floor(level / 100);
        return `S${sectionsPassed}`;
    }

    // TAP/Shirase scoring system
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

        // Apply combo and bravo multipliers
        const combo = game.comboCount > 0 ? (game.comboCount + 1) : 1;
        const bravo = this.checkBravo(game) ? 4 : 1;
        
        return Math.floor(score * combo * bravo);
    }

    // Check for bravo (perfect clear)
    checkBravo(game) {
        if (!game || !game.board || !game.board.grid) return false;
        
        // Bravo occurs when board is completely full before clearing
        return game.board.grid.every(row => row.every(cell => cell !== 0));
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        super.initializeForGameScene(gameScene);
        this.startTime = Date.now();
        this.gameScene = gameScene;
        console.log('TGM4 3.1: Initialized - extends Shirase with 2000 level cap');
        
        // Play initial BGM track (level 0)
        this.updateBGM(0);
    }

    // Override torikan checking for TGM4 3.1 specific torikans
    checkTorikan(level, elapsedTime) {
        for (const torikan of this.torikans) {
            if (level >= torikan.level && elapsedTime > torikan.time) {
                return torikan.grade;
            }
        }
        return null;
    }

    // Override grade calculation for TGM4 3.1 (no REGRETs, SX grading)
    getCurrentGrade(level, score, elapsedTime) {
        if (level >= 2000) {
            // Check for GM qualification
            if (elapsedTime <= 406000) { // 6:46
                return 'GM'; // Would need roll points check in real implementation
            }
            return 'S20';
        }
        
        // SX grading based on sections passed (no REGRETs)
        const sectionsPassed = Math.floor(level / 100);
        const gradeIndex = Math.min(sectionsPassed, this.gradeLadder.length - 1);
        return this.gradeLadder[gradeIndex];
    }

    // Handle garbage system (same as Shirase but extended to 2000)
    handleGarbageSend(level) {
        if (level >= 500 && level < 1000) {
            const quota = this.garbageQuotas[level] || 8;
            if (this.garbageCounter >= quota) {
                this.sendGarbageLine();
                this.garbageCounter = 0;
                console.log(`TGM4 3.1: Garbage line sent at level ${level}`);
            }
        } else if (level >= 1400 && level < 2000) {
            const quota = this.garbageQuotas[level] || 2;
            if (this.garbageCounter >= quota) {
                this.sendGarbageLine();
                this.garbageCounter = 0;
                console.log(`TGM4 3.1: Garbage line sent at level ${level}`);
            }
        }
    }

    sendGarbageLine() {
        // Implementation would add garbage line to playfield
        console.log('TGM4 3.1: Sending garbage line');
    }

    // Override level progression to extend Shirase behavior with TGM4 3.1 specifics
    onLevelUpdate(level, oldLevel, updateType, amount) {
        // Call parent level update first (handles Shirase mechanics)
        const result = super.onLevelUpdate(level, oldLevel, updateType, amount);
        
        // TGM4 3.1 specific additions
        this.updateBGM(level);
        
        // Check TGM4 3.1 specific torikans
        if (this.gameScene && this.gameScene.game) {
            const elapsedTime = Date.now() - this.startTime;
            const torikanGrade = this.checkTorikan(level, elapsedTime);
            if (torikanGrade) {
                console.log(`TGM4 3.1: Torikan reached - Grade: ${torikanGrade}`);
                // Game should end here
                return result;
            }
        }

        // Update timing
        this.currentTiming = this.getTimingForLevel(level);
        
        return result;
    }

    // Override game over handling for TGM4 3.1
    onGameOver(gameScene) {
        if (gameScene && gameScene.game) {
            const elapsedTime = gameScene.game.startTime ? Date.now() - gameScene.game.startTime : 0;
            const finalGrade = this.getCurrentGrade(gameScene.game.level, gameScene.game.score, elapsedTime);
            console.log(`TGM4 3.1 Game Over - Final Grade: ${finalGrade}`);
            console.log(`Time: ${Math.floor(elapsedTime / 1000)}s, Level: ${gameScene.game.level}`);
        }
    }

    // Reset mode state
    reset() {
        super.reset();
        this.garbageCounter = 0;
        this.startTime = null;
        this.gameScene = null;
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
