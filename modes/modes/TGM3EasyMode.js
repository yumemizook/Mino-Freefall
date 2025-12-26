// TGM3EasyMode - Ti Easy approximation
// Key points: 3 previews, Hold enabled, modest gravity ramp, short level cap (200) then credit roll

class TGM3EasyMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM3 Easy';
        this.modeId = 'tgm3_easy';
        this.config = this.getModeConfig();
        this.hanabi = 0;
        this.comboSize = 0;
        this.framesSinceLastClear = 0;
        this.pieceActiveFrames = 0;
        this.thirtySecondBonus = false;
        this.elapsedTime = 0;
        this.nextThirtyTrigger = 30;
        this.spinDuringGround = false;
    }

    getModeConfig() {
        return {
            gravity: { type: 'custom', curve: level => this.getGravitySpeed(level) },
            das: 16/60,
            arr: 1/60,
            are: 48/60,
            lineAre: 25/60,
            lockDelay: 30/60,
            lineClearDelay: 40/60,
            nextPieces: 3,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 200,
            hasGrading: false,
            specialMechanics: {
                hanabi: true
            }
        };
    }

    getName() { return this.modeName; }
    getModeId() { return this.modeId; }

    onLevelUpdate(level, oldLevel, type, amount) {
        // Stop at 99: do not increment beyond 99
        let next = oldLevel;
        if (type === 'piece' || type === 'lines') {
            next = Math.min(99, oldLevel + (type === 'lines' ? amount : 1));
        }
        return next;
    }

    onPieceSpawn(gameScene) {
        this.pieceActiveFrames = 0;
        this.spinDuringGround = false;
    }

    initializeForGameScene(gameScene) {
        if (super.initializeForGameScene) super.initializeForGameScene(gameScene);
        this.hanabi = 0;
        this.comboSize = 0;
        this.framesSinceLastClear = 0;
        this.pieceActiveFrames = 0;
        this.thirtySecondBonus = false;
        this.elapsedTime = 0;
        this.nextThirtyTrigger = 30;
        this.spinDuringGround = false;
    }

    update(gameScene, deltaTime) {
        // Track frames for timing-sensitive bonuses
        const frames = deltaTime * 60;
        this.framesSinceLastClear += frames;
        this.pieceActiveFrames += frames;

        // 30s bonus trigger from main stopwatch
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.nextThirtyTrigger) {
            this.thirtySecondBonus = true;
            this.nextThirtyTrigger += 30;
        }
    }

    onRotateWhileGrounded(gameScene) {
        this.spinDuringGround = true;
    }

    handleLineClear(gameScene, linesCleared, pieceType = null) {
        if (linesCleared <= 0) return;

        // Base line clear values
        const baseTable = { 1: 1.0, 2: 2.9, 3: 3.8, 4: 4.7 };
        const base = baseTable[Math.min(linesCleared, 4)] || 1.0;

        // Combo handling: singles maintain; doubles+ increment; cap 9
        if (linesCleared >= 2) {
            this.comboSize = Math.min(9, this.comboSize + 1);
        } // singles keep size

        const comboTable = {
            0: 1.0, 1: 1.0, 2: 1.5, 3: 1.9, 4: 2.2,
            5: 2.9, 6: 3.5, 7: 3.9, 8: 4.2, 9: 4.5
        };
        const comboMult = comboTable[this.comboSize] || 1.0;

        // Lucky level bonus (before clear)
        const luckyLevels = new Set([25, 50, 75, 125, 150, 175, 199]);
        const lucky = luckyLevels.has(gameScene.level) ? 1.3 : 1.0;

        // Split bonus: if non-contiguous clears (simple check using board rows cleared)
        const clearedRows = gameScene.clearedLines || [];
        let splitMult = 1.0;
        if (clearedRows.length > 1) {
            const diffs = clearedRows.slice(1).map((r, i) => r - clearedRows[i]);
            const nonContig = diffs.some(d => d > 1);
            if (nonContig) splitMult = 1.4;
        }

        // 30-second bonus (flag-based; user-provided timer not implemented, so keep manual flag)
        const thirtyMult = this.thirtySecondBonus ? 1.4 : 1.0;
        this.thirtySecondBonus = false;

        // Variable speed combo bonus: (levelAfter - framesSinceLastClear)/100 if >100
        const levelAfter = gameScene.level + linesCleared;
        const varSpeedDelta = levelAfter - this.framesSinceLastClear;
        const varSpeedMult = varSpeedDelta > 100 ? (varSpeedDelta / 100) : 1.0;

        // Variable finesse bonus: (levelAfter - pieceActiveFrames)/120 if >120
        const varFinDelta = levelAfter - this.pieceActiveFrames;
        const varFinMult = varFinDelta > 120 ? (varFinDelta / 120) : 1.0;

        // Spin bonus: if rotation happened while grounded
        let spinMult = 1.0;
        if (this.spinDuringGround) {
            if (pieceType === 'T') {
                spinMult = linesCleared >= 3 ? 4.0 : 3.0;
            } else if (pieceType !== 'O') {
                spinMult = 2.0;
            }
        }
        this.spinDuringGround = false;

        // Fixed speed combo bonus (combo stream active if comboSize > 0)
        const fixedComboMult = this.comboSize > 0 ? 1.3 : 1.0;

        // Aggregate
        let awarded = base * comboMult * splitMult * lucky * thirtyMult * varSpeedMult * varFinMult * spinMult * fixedComboMult;

        // Bravos: +6 flat if all cleared (simplified detection)
        const isBravo = clearedRows.length > 0 && gameScene.board && gameScene.board.grid.every(row => row.every(cell => cell === 0));
        if (isBravo && gameScene.level < 200) {
            awarded += 6;
        }

        this.hanabi += Math.floor(awarded);
        console.log(
            `[Hanabi] +${Math.floor(awarded)} | total=${this.hanabi} | lines=${linesCleared} piece=${pieceType || "?"} combo=${this.comboSize}`,
        );

        // Fireworks trigger (lightweight)
        if (gameScene && typeof gameScene.spawnHanabiBurst === 'function') {
            gameScene.spawnHanabiBurst(Math.max(1, Math.floor(awarded)));
        }

        // Reset timers for next piece/clear context
        this.framesSinceLastClear = 0;
        this.pieceActiveFrames = 0;
    }

    // Simplified Ti Easy gravity table (1/256G units converted)
    getGravitySpeed(level) {
        if (level < 8) return 4;
        if (level < 19) return 5;
        if (level < 35) return 6;
        if (level < 40) return 8;
        if (level < 50) return 10;
        if (level < 60) return 12;
        if (level < 70) return 16;
        if (level < 80) return 32;
        if (level < 90) return 48;
        if (level < 101) return 64;
        if (level < 112) return 16;
        if (level < 121) return 48;
        if (level < 132) return 80;
        if (level < 144) return 128;
        if (level < 156) return 112;
        if (level < 167) return 144;
        if (level < 177) return 176;
        if (level < 200) return 192;
        return 5120; // 20G during roll
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM3EasyMode };
}
if (typeof window !== 'undefined') {
    window.TGM3EasyMode = TGM3EasyMode;
}
