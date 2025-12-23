// Marathon Mode Implementation
// Progressive difficulty with increasing gravity

class MarathonMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Marathon';
        this.description = 'Clear 150 lines with progressive difficulty';
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'custom',
                value: 0,
                curve: (level) => {
                    // Progressive gravity curve for Marathon
                    if (level < 50) return 128;   // 0.5G start
                    if (level < 100) return 256;  // 1G
                    if (level < 150) return 512;  // 2G
                    if (level < 200) return 1024; // 4G
                    return 2048;                  // 8G max for Marathon
                }
            },
            das: 16/60,      // Standard DAS
            arr: 1/60,       // Standard ARR
            are: 30/60,      // Standard ARE
            lockDelay: 0.5,  // Standard lock delay
            nextPieces: 3,   // Show 3 next pieces
            holdEnabled: true, // Hold mechanics enabled
            ghostEnabled: true, // Ghost piece always on
            levelUpType: 'lines',  // Level up by lines cleared
            lineClearBonus: 1,
            gravityLevelCap: 999,
            specialMechanics: {
                targetLines: 150,
                progressiveScoring: true,
                comboBonus: true
            }
        };
    }

    // Marathon progression: gentler start, gradual increase
    onLevelUpdate(level, oldLevel, updateType, amount) {
        if (updateType === 'lines') {
            // Marathon: 10 lines = 1 level
            const newLevel = Math.floor((level + amount) / 10);
            return Math.min(newLevel * 10, 999);
        }
        return level;
    }

    // Marathon: enhanced combo scoring
    calculateScore(baseScore, lines, piece, game) {
        let score = baseScore;
        
        // Combo bonus for Marathon
        if (game.comboCount > 0) {
            const comboBonus = 1 + (game.comboCount * 0.1); // 10% per combo level
            score *= comboBonus;
        }
        
        return Math.floor(score);
    }

    // Check Marathon completion (150 lines)
    checkCompletion(game) {
        return game.totalLines >= 150;
    }
}

// Sprint 40 Mode Implementation
// Speed-focused: clear 40 lines as fast as possible

class Sprint40Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Sprint 40L';
        this.description = 'Clear 40 lines as fast as possible';
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static',
                value: 5120, // 20G for speed
                curve: null
            },
            das: 8/60,       // Very fast DAS for speed
            arr: 1/60,       // Standard ARR
            are: 15/60,      // Very short ARE
            lockDelay: 0.2,  // Short lock delay
            nextPieces: 6,   // Show lots of next pieces
            holdEnabled: true, // Hold crucial for speed
            ghostEnabled: false, // No ghost (too fast)
            levelUpType: 'lines',  // Fast level progression
            lineClearBonus: 2,     // Double points for speed
            gravityLevelCap: 999,
            specialMechanics: {
                targetLines: 40,
                timeAttack: true,
                speedBonus: true
            }
        };
    }

    // Always 20G for Sprint
    getGravitySpeed(level) {
        return 5120; // 20G
    }

    // Sprint: instant hard drop on spawn
    onPieceSpawn(piece, game) {
        piece.hardDrop(game.board);
        game.isGrounded = true;
        game.lockDelay = game.deltaTime;
        return piece;
    }

    // Sprint: faster level progression
    onLevelUpdate(level, oldLevel, updateType, amount) {
        if (updateType === 'lines') {
            // Sprint: 5 lines = 1 level for quick progression
            return Math.min(level + (amount * 2), 999);
        }
        return level;
    }

    // Sprint: speed-based scoring
    calculateScore(baseScore, lines, piece, game) {
        let score = baseScore * 2; // Double base score
        
        // Speed bonus
        const speedBonus = Math.max(0, 60 - game.pieceActiveTime); // 60 frames max
        score += speedBonus * 5;
        
        // Perfect clear bonus
        if (lines > 0 && game.board.grid.every(row => row.every(cell => cell !== 0))) {
            score *= 3; // Triple score for bravo
        }
        
        return Math.floor(score);
    }

    // Check Sprint completion
    checkCompletion(game) {
        return game.totalLines >= 40;
    }
}

// Zen Mode Implementation
// Relaxed gameplay with gentle mechanics

class ZenMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Zen';
        this.description = 'Endless relaxed play with gentle mechanics';
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static',
                value: 64,    // Very gentle gravity (0.25G)
                curve: null
            },
            das: 20/60,      // Slower DAS for relaxed play
            arr: 2/60,       // Slower ARR
            are: 40/60,      // Longer ARE for thinking time
            lockDelay: 2.0,  // Very long lock delay
            nextPieces: 7,   // Show lots of next pieces
            holdEnabled: true, // Hold always available
            ghostEnabled: true, // Ghost piece on
            levelUpType: 'piece',  // Gentle progression
            lineClearBonus: 1,
            gravityLevelCap: 999,
            specialMechanics: {
                endless: true,
                noLevelCap: true,
                calmingMusic: true,
                extendedLockDelay: true
            }
        };
    }

    // Zen: always gentle gravity
    getGravitySpeed(level) {
        return 64; // 0.25G constant
    }

    // Zen: no level progression pressure
    onLevelUpdate(level, oldLevel, updateType, amount) {
        // Zen mode has very slow progression
        if (updateType === 'piece') {
            return level + 0.1; // Very slow level increase
        } else if (updateType === 'lines') {
            return level + (amount * 0.5);
        }
        return level;
    }

    // Zen: peaceful scoring without pressure
    calculateScore(baseScore, lines, piece, game) {
        // Zen mode gives points just for playing, no pressure
        let score = baseScore;
        
        // Gentle combo bonus
        if (game.comboCount > 0) {
            score *= 1.05; // Small combo bonus
        }
        
        // Beauty bonus for nice clears
        if (lines === 4) {
            score += 1000; // Tetris bonus
        }
        
        return Math.floor(score);
    }

    // Zen mode never ends
    checkCompletion(game) {
        return false; // Endless mode
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarathonMode, Sprint40Mode, ZenMode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.MarathonMode = MarathonMode;
    window.Sprint40Mode = Sprint40Mode;
    window.ZenMode = ZenMode;
}