// TGM3Mode - Core Master-style mode for TGM3 (Ti)
// Notes:
// - Uses 3 next previews and Hold
// - Approximate timing/phases inspired by Ti Master (simplified)
// - Gravity curve reuses Ti-styled early ramp and 20G after 500

class TGM3Mode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'TGM3 Master';
        this.modeId = 'tgm3_master';

        this.config = this.getModeConfig();

        // Internal timing phase pointer
        this.currentTimingPhase = 1;
        this.timingPhases = [
            // Simplified Ti-like phases (frames @60fps)
            { minLevel: 0, maxLevel: 499, are: 27/60, lineAre: 27/60, das: 16/60, arr: 1/60, lock: 30/60, lineClear: 40/60 },
            { minLevel: 500, maxLevel: 599, are: 27/60, lineAre: 27/60, das: 10/60, arr: 1/60, lock: 30/60, lineClear: 25/60 },
            { minLevel: 600, maxLevel: 699, are: 27/60, lineAre: 18/60, das: 10/60, arr: 1/60, lock: 30/60, lineClear: 16/60 },
            { minLevel: 700, maxLevel: 799, are: 18/60, lineAre: 14/60, das: 10/60, arr: 1/60, lock: 30/60, lineClear: 12/60 },
            { minLevel: 800, maxLevel: 899, are: 14/60, lineAre: 8/60,  das: 10/60, arr: 1/60, lock: 30/60, lineClear: 6/60 },
            { minLevel: 900, maxLevel: 999, are: 14/60, lineAre: 8/60,  das: 8/60,  arr: 1/60, lock: 17/60, lineClear: 6/60 },
            { minLevel: 1000, maxLevel: 1200, are: 8/60, lineAre: 8/60,  das: 8/60,  arr: 1/60, lock: 17/60, lineClear: 6/60 },
            { minLevel: 1201, maxLevel: 1500, are: 6/60, lineAre: 6/60,  das: 8/60,  arr: 1/60, lock: 15/60, lineClear: 6/60 },
        ];
    }

    getModeConfig() {
        return {
            gravity: { type: 'custom', curve: level => this.getGravitySpeed(level) },
            das: 16/60,
            arr: 1/60,
            are: 27/60,
            lineAre: 27/60,
            lockDelay: 30/60,
            lineClearDelay: 40/60,
            nextPieces: 3,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 1500,
            hasGrading: false,
            specialMechanics: {
                coolRegret: true,
                staffRoll: true
            }
        };
    }

    getConfig() {
        return {
            ...this.getDefaultConfig(),
            ...this.getModeConfig()
        };
    }

    getName() {
        return this.modeName;
    }

    getModeId() {
        return this.modeId;
    }

    // Gravity curve derived from Ti table (values divided by 256 to map to existing engine units)
    getGravitySpeed(level) {
        let internal;
        if (level < 30) internal = 1024/256;       // 4
        else if (level < 35) internal = 1536/256;  // 6
        else if (level < 40) internal = 2048/256;  // 8
        else if (level < 50) internal = 2560/256;  // 10
        else if (level < 60) internal = 3072/256;  // 12
        else if (level < 70) internal = 4096/256;  // 16
        else if (level < 80) internal = 8192/256;  // 32
        else if (level < 90) internal = 12288/256; // 48
        else if (level < 100) internal = 16384/256; // 64
        else if (level < 120) internal = 20480/256; // 80
        else if (level < 140) internal = 24576/256; // 96
        else if (level < 160) internal = 28672/256; // 112
        else if (level < 170) internal = 32768/256; // 128
        else if (level < 200) internal = 36864/256; // 144
        else if (level < 220) internal = 1024/256;  // 4 (speed reset)
        else if (level < 230) internal = 8192/256;  // 32
        else if (level < 233) internal = 16384/256; // 64
        else if (level < 236) internal = 24576/256; // 96
        else if (level < 239) internal = 32768/256; // 128
        else if (level < 243) internal = 40960/256; // 160
        else if (level < 247) internal = 49152/256; // 192
        else if (level < 251) internal = 57344/256; // 224
        else if (level < 300) internal = 65536/256; // 256 (1G)
        else if (level < 330) internal = 131072/256; // 512 (2G)
        else if (level < 360) internal = 196608/256; // 768 (3G)
        else if (level < 400) internal = 262144/256; // 1024 (4G)
        else if (level < 420) internal = 327680/256; // 1280 (5G)
        else if (level < 450) internal = 262144/256; // 1024
        else if (level < 500) internal = 196608/256; // 768
        else internal = 5120; // Force 20G
        return internal;
    }

    getDAS() { return this.getCurrentTiming().das; }
    getARR() { return this.getCurrentTiming().arr; }
    getARE() { return this.getCurrentTiming().are; }
    getLineARE() { return this.getCurrentTiming().lineAre; }
    getLockDelay() { return this.getCurrentTiming().lock; }
    getLineClearDelay() { return this.getCurrentTiming().lineClear; }

    getCurrentTiming() {
        return this.timingPhases[this.currentTimingPhase - 1] || this.timingPhases[0];
    }

    updateTimingPhase(level) {
        const old = this.currentTimingPhase;
        for (let i = this.timingPhases.length - 1; i >= 0; i--) {
            const phase = this.timingPhases[i];
            if (level >= phase.minLevel && level <= phase.maxLevel) {
                this.currentTimingPhase = i + 1;
                break;
            }
        }
        if (old !== this.currentTimingPhase) {
            console.log(`TGM3: timing phase ${old} -> ${this.currentTimingPhase}`);
        }
    }

    onLevelUpdate(level, oldLevel, updateType, amount) {
        let nextLevel = level;
        if (updateType === 'piece') {
            nextLevel = Math.min(level + 1, this.config.gravityLevelCap);
        } else if (updateType === 'lines') {
            const inc = Math.min(Math.max(amount || 0, 0), 4);
            nextLevel = Math.min(level + inc, this.config.gravityLevelCap);
        }
        this.updateTimingPhase(nextLevel);
        return nextLevel;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM3Mode };
}
if (typeof window !== 'undefined') {
    window.TGM3Mode = TGM3Mode;
}
