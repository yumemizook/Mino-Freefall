// Base class for TGM4 modes
// Extends BaseMode with TGM4-specific functionality

class TGM4BaseMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM4 Base Mode';
        this.description = 'Base mode for TGM4 implementations';
        
        // TGM4-specific state
        this.tetrisCount = 0;
        this.allClearCount = 0;
        this.currentSection = 0;
        this.pieceHistory = [];
        this.moveResetCount = 0;
        this.rotationResetCount = 0;
        this.isStepReset = false;
    }

    // Override to provide TGM4-specific defaults
    getDefaultConfig() {
        return {
            ...super.getDefaultConfig(),
            // TGM4 defaults
            nextPieces: 3,
            holdEnabled: true,
            // rotationSystem: 'ARS', // Allow user choice - don't force ARS
            gravityLevelCap: 999,
            specialMechanics: {
                movementLimitation: true,
                maxMoveResets: 8,
                maxRotationResets: 2,
                diagonalInput: false,
                extraButton: false,
                irs180: false
            }
        };
    }

    // TGM4 movement limitation system
    onPieceMove(piece, game) {
        if (!this.getConfig().specialMechanics.movementLimitation) {
            return true;
        }

        if (!this.isStepReset) {
            this.moveResetCount++;
            if (this.moveResetCount >= this.getConfig().specialMechanics.maxMoveResets) {
                this.isStepReset = true;
            }
        }
        return true;
    }

    onPieceRotate(piece, game) {
        if (!this.getConfig().specialMechanics.movementLimitation) {
            return true;
        }

        if (!this.isStepReset) {
            this.rotationResetCount++;
            if (this.rotationResetCount >= this.getConfig().specialMechanics.maxRotationResets) {
                this.isStepReset = true;
            }
        }
        return true;
    }

    onPieceLock(piece, game) {
        // Reset movement counters when piece locks
        this.moveResetCount = 0;
        this.rotationResetCount = 0;
        this.isStepReset = false;

        // Store piece for rewind functionality
        this.pieceHistory.push({
            piece: piece,
            level: game.level,
            score: game.score,
            timestamp: Date.now()
        });

        // Limit history size
        if (this.pieceHistory.length > 1000) {
            this.pieceHistory.shift();
        }

        return true;
    }

    onLineClear(lines, game) {
        // Track tetris and all clear counts for grading
        if (lines === 4) {
            this.tetrisCount++;
        }
        
        // Check for all clear
        if (this.isAllClear(game)) {
            this.allClearCount++;
        }

        return lines;
    }

    isAllClear(game) {
        // Check if playfield is completely empty after line clear
        for (let y = 0; y < game.playfield.length; y++) {
            for (let x = 0; x < game.playfield[y].length; x++) {
                if (game.playfield[y][x] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // Calculate TGM4 Normal mode grade (A of B format)
    calculateNormalModeGrade(level, score) {
        // B part: based on level progression
        let bPart = Math.floor(level / 111);
        if (level >= 999) {
            bPart = 10; // Ten if credits are passed
        } else if (bPart > 9) {
            bPart = 9;
        }

        // A part: 6 tetris = 1 point, each all clear = -1 point
        let aPart = Math.floor(this.tetrisCount / 6) - this.allClearCount;
        aPart = Math.max(0, Math.min(10, aPart)); // Clamp between 0-10

        const gradeNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
        return `${gradeNames[aPart]} of ${gradeNames[bPart]}`;
    }

    // Get current section based on level
    getCurrentSection(level) {
        return Math.floor(level / 100);
    }

    // Reset TGM4-specific state
    reset() {
        super.reset();
        this.tetrisCount = 0;
        this.allClearCount = 0;
        this.currentSection = 0;
        this.pieceHistory = [];
        this.moveResetCount = 0;
        this.rotationResetCount = 0;
        this.isStepReset = false;
    }

    // Get piece history for rewind functionality
    getPieceHistory() {
        return this.pieceHistory;
    }

    // Get current movement limitation state
    getMovementState() {
        return {
            moveResetCount: this.moveResetCount,
            rotationResetCount: this.rotationResetCount,
            isStepReset: this.isStepReset,
            maxMoveResets: this.getConfig().specialMechanics.maxMoveResets,
            maxRotationResets: this.getConfig().specialMechanics.maxRotationResets
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TGM4BaseMode;
}
