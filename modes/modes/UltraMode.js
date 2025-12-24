// Ultra Mode - 2-minute score attack
// Based on standardtimings.md specifications

class UltraMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Ultra';
        this.description = '2-minute score attack';
        this.timeLimit = 120; // 2 minutes in seconds
        this.startTime = null;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static',
                value: 5120 // 20G
            },
            das: 9/60,      // 9 frames
            arr: 1/60,       // 1 frame
            are: 7/60,       // 7 frames
            lockDelay: 10/60, // 10 frames
            nextPieces: 6,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'piece',
            lineClearBonus: 1,
            gravityLevelCap: 999,
            hasGrading: false,
            specialMechanics: {
                timeLimit: 120,
                scoreAttack: true
            }
        };
    }

    // Timing getter methods
    getDAS() { return this.getModeConfig().das; }
    getARR() { return this.getModeConfig().arr; }
    getARE() { return this.getModeConfig().are; }
    getLineARE() { return this.getModeConfig().are; } // Same as ARE for Ultra
    getLockDelay() { return this.getModeConfig().lockDelay; }
    getLineClearDelay() { return this.getModeConfig().are; } // Use ARE for line clear delay

    initializeForGameScene(gameScene) {
        this.startTime = null;
    }

    update(gameScene, deltaTime) {
        // Track start time
        if (!this.startTime && gameScene.currentPiece) {
            this.startTime = gameScene.currentTime;
        }

        // Check time limit
        if (this.startTime !== null && gameScene.currentTime - this.startTime >= this.timeLimit) {
            gameScene.showGameOverScreen();
        }
    }

    onGameOver(gameScene) {
        // Save score
        const key = `bestScore_ultra`;
        const currentBest = gameScene.getBestScore('ultra');
        const timeString = `${Math.floor(this.timeLimit / 60)}:${Math.floor(this.timeLimit % 60).toString().padStart(2, '0')}.00`;

        if (gameScene.score > currentBest.score) {
            const newScore = {
                score: gameScene.score,
                level: gameScene.level,
                grade: 'N/A',
                time: timeString
            };
            localStorage.setItem(key, JSON.stringify(newScore));
        }
    }

    reset() {
        this.startTime = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UltraMode;
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.UltraMode = UltraMode;
}