// TGM3ShiraseMode - Shirase (Ti) approximation
// Fixed 20G, 3 previews, Hold enabled. Simplified timings and torikan notes left as TODO hooks.

class TGM3ShiraseMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Shirase';
        this.modeId = 'tgm3_shirase';
        this.config = this.getModeConfig();
        this.sectionTimes = {};
        this.sectionGrades = {};
        this.rollReached = false;
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
            lowestGrade: '',
            gravityLevelCap: 1300,
            hasGrading: false,
            specialMechanics: {
                torikan: true,
                torikanTimes: {
                    classic: { level500: 148, level1000: 296 }, // 2:28, 4:56
                    world: { level500: 183, level1000: 366 },   // 3:03, 6:06
                },
                monochromeAfter1000: true,
                garbageAfter500: true,
                bigRollAfter1300: true
            }
        };
    }

    getName() { return this.modeName; }
    getModeId() { return this.modeId; }

    onLineClear(gameScene, linesCleared) {
        if (linesCleared > 0) {
            gameScene.garbageCountdown = 0; // reset garbage timer on clear
        }
    }

    onLevelUpdate(level, oldLevel, updateType = 'piece', amount = 1) {
        const max = this.config.gravityLevelCap || 1300;
        let nextLevel = level;

        if (updateType === 'piece') {
            nextLevel = Math.min(level + 1, max);
        } else if (updateType === 'lines') {
            const inc = Math.max(amount || 0, 0);
            const bonus = inc === 3 ? 1 : inc === 4 ? 2 : 0;
            nextLevel = Math.min(level + inc + bonus, max);
        }

        if (nextLevel >= max) {
            this.rollReached = true;
        }

        return nextLevel;
    }

    onSectionComplete(gameScene, sectionIndex, sectionTimeSec) {
        // S-grade per section: S1..S13
        this.sectionTimes[sectionIndex] = sectionTimeSec;
        // S-grade per section: S1..S13
        this.sectionGrades[sectionIndex] = "S" + (sectionIndex + 1);
        // REGRET if slower than thresholds (Ti): ≤60s early, 50s later
        const regretTimes = [
            60, 60, 60, 60, 60, 60, 50, 50, 50, 50, 50, 50, 50,
        ];
        if (sectionIndex < regretTimes.length && sectionTimeSec > regretTimes[sectionIndex]) {
            this.sectionGrades[sectionIndex] = "REGRET";
        }
        if (gameScene) {
            gameScene.sectionPerformance = gameScene.sectionPerformance || [];
            gameScene.sectionPerformance[sectionIndex] = this.sectionGrades[sectionIndex];
        }
    }

    getARE() { return this.config.are; }
    getLineARE() { return this.config.lineAre; }
    getDAS() { return this.config.das; }
    getARR() { return this.config.arr; }
    getLockDelay() { return this.config.lockDelay; }
    getLineClearDelay() { return this.config.lineClearDelay; }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM3ShiraseMode };
}
if (typeof window !== 'undefined') {
    window.TGM3ShiraseMode = TGM3ShiraseMode;
}
