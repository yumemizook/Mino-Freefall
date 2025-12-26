// TGM3ShiraseMode - Shirase (Ti) approximation
// Fixed 20G, 3 previews, Hold enabled. Simplified timings and torikan notes left as TODO hooks.

class TGM3ShiraseMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Shirase';
        this.modeId = 'tgm3_shirase';
        this.config = this.getModeConfig();
    }

    getModeConfig() {
        return {
            gravity: { type: 'static', value: 5120 }, // 20G
            das: 12/60,
            arr: 1/60,
            are: 12/60,
            lineAre: 8/60,
            lockDelay: 18/60,
            lineClearDelay: 6/60,
            nextPieces: 3,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 1300,
            hasGrading: false,
            specialMechanics: {
                torikan: true,
                monochromeAfter1000: true,
                garbageAfter500: true
            }
        };
    }

    getName() { return this.modeName; }
    getModeId() { return this.modeId; }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM3ShiraseMode };
}
if (typeof window !== 'undefined') {
    window.TGM3ShiraseMode = TGM3ShiraseMode;
}
