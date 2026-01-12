// Konoha All-Clear Puzzle Modes
// All-clear challenge modes with different piece sets

// Konoha Easy Mode - 5-piece all-clear challenge
class KonohaEasyMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Konoha Easy';
        this.description = 'Timed Big all-clear challenge with 5 pieces!';
        this.allClearsTarget = 110;
        this.allClearsAchieved = 0;
        this.piecesAvailable = ['L', 'J', 'I', 'T', 'O'];
        this.startTime = null;
        this.totalTime = 120;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'static',
                value: 4
            },
            das: 18/60,
            arr: 1/60,
            are: 27/60,
            lineAre: 27/60,
            lockDelay: 60/60,
            lineClearDelay: 25/60,
            
            nextPieces: 6,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'lines',
            lineClearBonus: 1,
            gravityLevelCap: 9999,
            
            specialMechanics: {
                allClearChallenge: true,
                limitedPieces: true,
                pieceSet: ['L', 'J', 'I', 'T', 'O'],
                easyDifficulty: true,
                doubleSizedPieces: true,
                boardWidth: 5,
                boardHeight: 10,
                countdownTimer: true
            }
        };
    }

    // Generate next piece using TGM2 randomization with no-S/Z criteria for Easy mode
    generateNextPiece(gameScene) {
        if (gameScene && typeof gameScene.generate7BagPiece === 'function') {
            let piece;
            do {
                piece = gameScene.generate7BagPiece();
            } while (!this.piecesAvailable.includes(piece));
            return piece;
        }
        return this.piecesAvailable[Math.floor(Math.random() * this.piecesAvailable.length)];
    }

    // Check for all clear
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;
        
        // Check if board is completely empty after line clear
        const isBoardClear = gameScene.game.board.grid.every(row => row.every(cell => cell === 0));
        
        if (!isBoardClear) return false;
        
        // All Clear logic: check if available pieces can potentially solve the empty board
        // Since board is empty, any piece can be placed, so All Clear is always possible
        // This is more accurate than complex sequence prediction
        return true;
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        const isAllClear = this.checkAllClear(gameScene);

        if (this.startTime === null && gameScene && typeof gameScene.currentTime === 'number') {
            this.startTime = gameScene.currentTime;
        }

        const level = gameScene && typeof gameScene.level === 'number' ? gameScene.level : 0;
        const inPost1000 = level >= 1000;
        const bonusSeconds = this.getTimeBonusSeconds(linesCleared, isAllClear, inPost1000);
        if (bonusSeconds > 0) {
            this.totalTime = Math.min(300, this.totalTime + bonusSeconds);
        }

        if (isAllClear) {
            // Don't increment here - already handled in main game loop
            // this.allClearsAchieved++;
            if (this.allClearsAchieved >= this.allClearsTarget) {
                if (typeof gameScene.victory === 'function') {
                    gameScene.victory();
                }
            }
        }
        
        // Update Bravo counter display (will be implemented in separate UI element)
        if (gameScene.updateBravoCounter && typeof gameScene.updateBravoCounter === 'function') {
            gameScene.updateBravoCounter(this.allClearsAchieved, this.allClearsTarget);
        }
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = null;
        const rotationSystem = gameScene && gameScene.rotationSystem ? gameScene.rotationSystem : 'srs';
        this.totalTime = rotationSystem === 'ARS' ? 250 : 120;
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        // Grade display is handled by updateGradeUIVisibility in Konoha modes
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (!gameScene || typeof gameScene.currentTime !== 'number') return;
        if (this.startTime === null && gameScene.currentPiece) {
            this.startTime = gameScene.currentTime;
        }
        if (this.startTime !== null) {
            const elapsed = gameScene.currentTime - this.startTime;
            this.elapsedActiveTime = elapsed;
            const remaining = Math.max(0, this.totalTime - elapsed);
            if (remaining <= 0) {
                if (typeof gameScene.showGameOverScreen === 'function') {
                    gameScene.showGameOverScreen();
                }
            }
        }
    }

    onLevelUpdate(level, oldLevel, updateType, amount) {
        if (updateType === 'piece') return level + 1;
        if (updateType !== 'lines') return oldLevel;
        const inc = Math.min(Math.max(amount || 0, 0), 4);
        if (inc === 1) return level + 2;
        if (inc === 2) return level + 4;
        if (inc === 3) return level + 6;
        if (inc === 4) return level + 12;
        return level;
    }

    getTimeBonusSeconds(linesCleared, isAllClear, inPost1000) {
        const lc = Math.min(Math.max(linesCleared || 0, 0), 4);
        if (lc <= 0) return 0;
        if (!inPost1000) {
            if (isAllClear) {
                if (lc === 1) return 300 / 60;
                if (lc === 2) return 480 / 60;
                if (lc === 3) return 660 / 60;
                if (lc === 4) return 900 / 60;
            } else {
                if (lc === 1) return 1 / 60;
                if (lc === 2) return 2 / 60;
                if (lc === 3) return 5 / 60;
                if (lc === 4) return 11 / 60;
            }
            return 0;
        }
        if (lc === 4) {
            return 60 / 60;
        }
        return 0;
    }

    // Get mode ID
    getModeId() {
        return 'konoha_easy';
    }
    
    // Reset mode state
    reset() {
        this.allClearsAchieved = 0;
        this.startTime = null;
        this.totalTime = 120;
    }
    
    // Get line clear bonus
    getLineClearBonus() {
        return 1;
    }
    
    // Get grade points
    getGradePoints() {
        return 0;
    }

    getDisplayedGrade() {
        return `BRAVO: ${this.allClearsAchieved}`;
    }
}

// Konoha Hard Mode - 7-piece all-clear challenge
class KonohaHardMode extends BaseMode {
    constructor() {
        super();
        this.modeName = 'Konoha Hard';
        this.description = 'Timed Big all-clear challenge with all 7 pieces!';
        this.allClearsTargetForTitle = 110;
        this.allClearsAchieved = 0;
        this.piecesAvailable = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        this.startTime = null;
        this.totalTime = 120;
    }

    getModeConfig() {
        return {
            gravity: {
                type: 'custom',
                value: 4,
                curve: (level) => {
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
                    return 5376;
                }
            },
            das: 18/60,
            arr: 1/60,
            are: 27/60,
            lineAre: 27/60,
            lockDelay: 60/60,
            lineClearDelay: 25/60,
            
            nextPieces: 5,
            holdEnabled: true,
            ghostEnabled: true,
            levelUpType: 'lines',
            lineClearBonus: 1,
            gravityLevelCap: 9999,
            
            specialMechanics: {
                allClearChallenge: true,
                limitedPieces: true,
                pieceSet: ['I', 'O', 'T', 'S', 'Z', 'J', 'L'],
                hardDifficulty: true,
                doubleSizedPieces: true,
                boardWidth: 5,
                boardHeight: 10,
                countdownTimer: true
            }
        };
    }

    // Generate next piece using TGM2 randomization for Konoha modes
    generateNextPiece(gameScene) {
        if (gameScene && typeof gameScene.generate7BagPiece === 'function') {
            return gameScene.generate7BagPiece();
        }
        return this.piecesAvailable[Math.floor(Math.random() * this.piecesAvailable.length)];
    }

    // Check for all clear using a backtracking algorithm
    checkAllClear(gameScene) {
        if (!gameScene || !gameScene.game || !gameScene.game.board) return false;

        const board = gameScene.game.board.grid;
        const availablePieces = [...gameScene.game.nextPieces.queue, gameScene.game.holdPiece].filter(p => p);

        // Helper function to get piece shape
        const getPieceShape = (pieceType, rotation) => {
            // This needs to be implemented based on how piece shapes are defined in your game
            // Placeholder implementation:
            const shapes = {
                'I': [[1, 1, 1, 1]],
                'O': [[1, 1], [1, 1]],
                'T': [[0, 1, 0], [1, 1, 1]],
                'S': [[0, 1, 1], [1, 1, 0]],
                'Z': [[1, 1, 0], [0, 1, 1]],
                'J': [[1, 0, 0], [1, 1, 1]],
                'L': [[0, 0, 1], [1, 1, 1]]
            };
            // This is a simplified representation. A real implementation would handle rotations.
            return shapes[pieceType] || [];
        };

        // Helper function to check if a piece can be placed at a given position
        const canPlace = (pieceType, x, y, rotation) => {
            const shape = getPieceShape(pieceType, rotation);
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col] !== 0) {
                        const boardX = x + col;
                        const boardY = y + row;
                        if (boardY >= board.length || boardX >= board[0].length || board[boardY][boardX] !== 0) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        // Recursive solver
        const solve = (currentBoard, pieces) => {
            if (currentBoard.every(row => row.every(cell => cell === 0))) {
                return true; // Solved
            }

            if (pieces.length === 0) {
                return false; // No more pieces, but board is not clear
            }

            const pieceType = pieces[0];
            const remainingPieces = pieces.slice(1);

            for (let r = 0; r < 4; r++) { // All 4 rotations
                for (let y = 0; y < currentBoard.length; y++) {
                    for (let x = 0; x < currentBoard[0].length; x++) {
                        if (canPlace(pieceType, x, y, r)) {
                            const newBoard = JSON.parse(JSON.stringify(currentBoard)); // Deep copy
                            const shape = getPieceShape(pieceType, r);
                            for (let row = 0; row < shape.length; row++) {
                                for (let col = 0; col < shape[row].length; col++) {
                                    if (shape[row][col] !== 0) {
                                        newBoard[y + row][x + col] = 1;
                                    }
                                }
                            }

                            if (solve(newBoard, remainingPieces)) {
                                return true;
                            }
                        }
                    }
                }
            }

            return false;
        };

        return solve(board, availablePieces.map(p => p.type));
    }

    // Handle line clear events
    handleLineClear(gameScene, linesCleared, pieceType) {
        const isAllClear = this.checkAllClear(gameScene);

        if (this.startTime === null && gameScene && typeof gameScene.currentTime === 'number') {
            this.startTime = gameScene.currentTime;
        }

        const level = gameScene && typeof gameScene.level === 'number' ? gameScene.level : 0;
        const inPost1000 = level >= 1000;
        const bonusSeconds = this.getTimeBonusSeconds(linesCleared, isAllClear, inPost1000);
        if (bonusSeconds > 0) {
            this.totalTime = Math.min(300, this.totalTime + bonusSeconds);
        }

        if (isAllClear) {
            // Don't increment here - already handled in main game loop
            // this.allClearsAchieved++;
        }
        
        // Update Bravo counter display (will be implemented in separate UI element)
        if (gameScene.updateBravoCounter && typeof gameScene.updateBravoCounter === 'function') {
            gameScene.updateBravoCounter(this.allClearsAchieved, null);
        }
    }

    // Initialize for game scene
    initializeForGameScene(gameScene) {
        this.startTime = null;
        const rotationSystem = gameScene && gameScene.rotationSystem ? gameScene.rotationSystem : 'srs';
        this.totalTime = rotationSystem === 'ARS' ? 250 : 120;
        if (gameScene.levelText) {
            gameScene.levelText.setText('LEVEL: 0');
        }
        // Grade display is handled by updateGradeUIVisibility in Konoha modes
        if (gameScene.scoreText) {
            gameScene.scoreText.setText('');
        }
    }

    // Update UI elements
    update(gameScene, deltaTime) {
        if (!gameScene || typeof gameScene.currentTime !== 'number') return;
        if (this.startTime === null && gameScene.currentPiece) {
            this.startTime = gameScene.currentTime;
        }
        if (this.startTime !== null) {
            const elapsed = gameScene.currentTime - this.startTime;
            this.elapsedActiveTime = elapsed;
            const remaining = Math.max(0, this.totalTime - elapsed);
            if (remaining <= 0) {
                if (typeof gameScene.showGameOverScreen === 'function') {
                    gameScene.showGameOverScreen();
                }
            }
        }
    }

    onLevelUpdate(level, oldLevel, updateType, amount) {
        if (updateType === 'piece') return level + 1;
        if (updateType !== 'lines') return oldLevel;
        const inc = Math.min(Math.max(amount || 0, 0), 4);
        if (inc === 1) return level + 2;
        if (inc === 2) return level + 4;
        if (inc === 3) return level + 6;
        if (inc === 4) return level + 12;
        return level;
    }

    getTimeBonusSeconds(linesCleared, isAllClear, inPost1000) {
        const lc = Math.min(Math.max(linesCleared || 0, 0), 4);
        if (lc <= 0) return 0;
        if (!inPost1000) {
            if (isAllClear) {
                if (lc === 1) return 300 / 60;
                if (lc === 2) return 480 / 60;
                if (lc === 3) return 660 / 60;
                if (lc === 4) return 900 / 60;
            } else {
                if (lc === 1) return 1 / 60;
                if (lc === 2) return 2 / 60;
                if (lc === 3) return 5 / 60;
                if (lc === 4) return 11 / 60;
            }
            return 0;
        }
        if (lc === 4) {
            return 60 / 60;
        }
        return 0;
    }

    // Get mode ID
    getModeId() {
        return 'konoha_hard';
    }
    
    // Reset mode state
    reset() {
        this.allClearsAchieved = 0;
        this.startTime = null;
        this.totalTime = 120;
    }
    
    // Get line clear bonus
    getLineClearBonus() {
        return 1;
    }
    
    // Get grade points
    getGradePoints() {
        return 0;
    }

    getDisplayedGrade() {
        return `BRAVO: ${this.allClearsAchieved}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KonohaEasyMode, KonohaHardMode };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.KonohaEasyMode = KonohaEasyMode;
    window.KonohaHardMode = KonohaHardMode;
}
