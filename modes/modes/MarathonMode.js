// Marathon Mode - Standard Tetris Marathon with 150 line goal
// Based on standardtimings.md specifications

class MarathonMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Marathon';
        this.description = 'Clear 150 lines with progressive gravity';
        this.targetLines = 150;
        this.linesCleared = 0;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'custom',
                curve: this.getMarathonGravity.bind(this)
            },
            das: 9/60,      // 9 frames
            arr: 1/60,       // 1 frame
            are: 7/60,       // 7 frames
            lockDelay: 30/60, // 30 frames
            nextPieces: 6,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'lines',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            hasGrading: false,
            specialMechanics: {
                targetLines: 150,
                progressiveGravity: true
            }
        };
    }

    // Timing getter methods
    getDAS() { return this.getModeConfig().das; }
    getARR() { return this.getModeConfig().arr; }
    getARE() { return this.getModeConfig().are; }
    getLineARE() { return this.getModeConfig().are; } // Same as ARE for Marathon
    getLockDelay() { return this.getModeConfig().lockDelay; }
    getLineClearDelay() { return this.getModeConfig().are; } // Use ARE for line clear delay

    // Marathon gravity curve based on standardtimings.md
    getMarathonGravity(level) {
        // Convert level to internal gravity units (1/65536 G)
        let internalGravity;

        if (level < 1) internalGravity = 1092;
        else if (level < 2) internalGravity = 1377;
        else if (level < 3) internalGravity = 1767;
        else if (level < 4) internalGravity = 2309;
        else if (level < 5) internalGravity = 3076;
        else if (level < 6) internalGravity = 4168;
        else if (level < 7) internalGravity = 5748;
        else if (level < 8) internalGravity = 8090;
        else if (level < 9) internalGravity = 11619;
        else if (level < 10) internalGravity = 17066;
        else if (level < 11) internalGravity = 25401;
        else if (level < 12) internalGravity = 39009;
        else if (level < 13) internalGravity = 60681; // ~0.9G
        else if (level < 14) internalGravity = 99296;  // ~1.5G
        else if (level < 15) internalGravity = 156038; // ~2.4G
        else internalGravity = 5120; // 20G cap

        return internalGravity;
    }

    onLevelUpdate(level, oldLevel, updateType, amount) {
        if (updateType === 'lines') {
            this.linesCleared += amount;
            // Level increases by number of lines cleared
            return oldLevel + amount;
        }
        return level;
    }

    handleLineClear(gameScene, linesCleared, pieceType) {
        this.linesCleared += linesCleared;

        // Check for marathon completion
        if (this.linesCleared >= this.targetLines) {
            gameScene.showGameOverScreen();
        }
    }

    update(gameScene, deltaTime) {
        // Update any marathon-specific logic
        // Could add time bonuses or other mechanics here
    }

    onGameOver(gameScene) {
        // Save score with lines cleared
        const key = `bestScore_marathon`;
        const currentBest = gameScene.getBestScore('marathon');
        const newScore = {
            score: gameScene.score,
            level: this.linesCleared,
            grade: 'N/A',
            time: `${Math.floor(gameScene.currentTime / 60)}:${Math.floor(gameScene.currentTime % 60).toString().padStart(2, '0')}.${Math.floor((gameScene.currentTime % 1) * 100).toString().padStart(2, '0')}`
        };

        if (newScore.score > currentBest.score ||
            (newScore.score === currentBest.score && newScore.level > currentBest.level)) {
            localStorage.setItem(key, JSON.stringify(newScore));
        }
    }

    reset() {
        this.linesCleared = 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarathonMode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.MarathonMode = MarathonMode;
}