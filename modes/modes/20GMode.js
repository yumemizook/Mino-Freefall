// 20GMode.js - 20G Mode implementation
// Maximum gravity from the start!

const GameMode = require('../base/GameMode.js');

class TwentyGMode extends GameMode {
    constructor(config, gameScene) {
        super(config, gameScene);
        
        // 20G-specific state
        this.sectionCap = 99;
        this.sectionTransition = false;
        this.sectionMessage = null;
        this.sectionMessageTimer = 0;
        
        // Scoring system
        this.comboCount = -1;
        this.backToBack = false;
        this.totalLines = 0;
        this.lastClearType = null;
        this.isTSpin = false;
        this.softDropRows = 0;
        this.hardDropRows = 0;
        
        // Piece active time tracking
        this.pieceActiveTime = 0;
        this.pieceSpawnTime = 0;
        
        // Time tracking
        this.startTime = Date.now();
        this.currentTime = 0;
        this.totalPausedTime = 0;
        
        // PPS tracking
        this.totalPiecesPlaced = 0;
        this.activeTime = 0;
        this.areTime = 0;
        this.conventionalPPS = 0;
        this.rawPPS = 0;
        
        // GM grade tracking
        this.gmConditions = {
            level300: { achieved: false, time: 0, score: 0 },
            level500: { achieved: false, time: 0, score: 0 },
            level999: { achieved: false, time: 0, score: 0 }
        };
        
        // IRS tracking
        this.areRotationDirection = 0;
        this.areRotationKeys = { k: false, space: false, l: false };
        this.irsActivated = false;
        
        // TGM1 randomizer (used for 20G mode)
        this.pieceHistory = ['Z', 'Z', 'S', 'S'];
        this.pieceHistoryIndex = 0;
        this.firstPiece = true;
        this.isFirstSpawn = true;
        
        // 20G mode uses TGM1 piece generation
        this.generateNextPieces = this.generateNextPiecesTGM1;
    }

    initializeMode() {
        // 20G starts at level 0 with maximum gravity
        this.level = 0;
        this.validatePieceHistory();
        this.generateNextPiecesTGM1();
        this.spawnPiece();
    }

    update(deltaTime) {
        if (this.gameOver || this.completed) return;
        
        // Update timing from config
        this.updateTimingFromConfig();
        
        // Track time for PPS calculation
        if (!this.areActive) {
            this.activeTime += deltaTime;
        } else {
            this.areTime += deltaTime;
        }
        
        // Update current time
        this.currentTime = (Date.now() - this.startTime) / 1000;
        
        // Handle input with TGM1-specific rotation
        this.handleInputTGM1(deltaTime);
        
        // Update game logic
        if (!this.areActive) {
            this.updatePieceMovementTGM1(deltaTime);
            this.updateGravity20G(deltaTime);
            this.updateLockDelay(deltaTime);
        } else {
            this.updateARETGM1(deltaTime);
        }
        
        // Check completion conditions
        this.checkCompletionTGM1();
        
        // Update progress
        this.updateProgressTGM1();
    }

    handleInputTGM1(deltaTime) {
        // TGM1 has specific input handling for rotation
        const kKeyDown = this.gameScene.keys.k.isDown;
        const spaceKeyDown = this.gameScene.keys.space.isDown;
        const lKeyDown = this.gameScene.keys.l.isDown;
        const xKeyDown = this.gameScene.keys.x.isDown;
        
        // Track rotation keys for immediate response
        this.kKeyPressed = this.kKeyPressed || false;
        this.spaceKeyPressed = this.spaceKeyPressed || false;
        this.lKeyPressed = this.lKeyPressed || false;
        this.xKeyPressed = this.xKeyPressed || false;

        // K key for clockwise rotation - immediate response
        if (kKeyDown && !this.kKeyPressed) {
            this.kKeyPressed = true;
            if (this.currentPiece && this.currentPiece.rotate(this.board, 1, this.gameScene.rotationSystem)) {
                this.resetLockDelay();
            } else if (this.currentPiece) {
                this.isGrounded = !this.currentPiece.canMoveDown(this.board);
            }
        } else if (!kKeyDown && this.kKeyPressed) {
            this.kKeyPressed = false;
        }

        // Space key for counter-clockwise rotation - immediate response
        if (spaceKeyDown && !this.spaceKeyPressed) {
            this.spaceKeyPressed = true;
            if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.gameScene.rotationSystem)) {
                this.resetLockDelay();
            } else if (this.currentPiece) {
                this.isGrounded = !this.currentPiece.canMoveDown(this.board);
            }
        } else if (!spaceKeyDown && this.spaceKeyPressed) {
            this.spaceKeyPressed = false;
        }

        // L key for counter-clockwise rotation - immediate response
        if (lKeyDown && !this.lKeyPressed) {
            this.lKeyPressed = true;
            if (this.currentPiece && this.currentPiece.rotate(this.board, -1, this.gameScene.rotationSystem)) {
                this.resetLockDelay();
            } else if (this.currentPiece) {
                this.isGrounded = !this.currentPiece.canMoveDown(this.board);
            }
        } else if (!lKeyDown && this.lKeyPressed) {
            this.lKeyPressed = false;
        }

        // X key for hard drop - immediate response
        if (xKeyDown && !this.xKeyPressed) {
            this.xKeyPressed = true;
            if (this.currentPiece) {
                const ghost = this.currentPiece.getGhostPosition(this.board);
                this.hardDropRows = ghost.y - this.currentPiece.y;
                this.currentPiece.hardDrop(this.board);
                this.lockPiece();
            }
        } else if (!xKeyDown && this.xKeyPressed) {
            this.xKeyPressed = false;
        }
        
        // Handle DAS (Delayed Auto Shift)
        this.handleDAS(deltaTime);
    }

    updatePieceMovementTGM1(deltaTime) {
        if (!this.currentPiece) return;
        
        const downDown = this.gameScene.cursors.down.isDown || this.gameScene.keys.s.isDown;
        
        // Soft drop handling
        if (downDown) {
            if (this.currentPiece.move(this.board, 0, 1)) {
                this.resetLockDelay();
                this.softDropRows += 1;
            } else if (!this.isGrounded) {
                this.isGrounded = true;
                this.lockDelay = 0;
            }
        }
        
        // Single step down
        if (Phaser.Input.Keyboard.JustDown(this.gameScene.cursors.down)) {
            if (this.currentPiece.move(this.board, 0, 1)) {
                this.resetLockDelay();
            } else if (!this.isGrounded) {
                this.isGrounded = true;
                this.lockDelay = 0;
            }
        }
    }

    updateGravity20G(deltaTime) {
        if (!this.currentPiece || this.areActive) return;
        
        // 20G mode: Always 20G gravity (5120 internal gravity = 20 rows per frame)
        const internalGravity = 5120;
        
        // High gravity system: rows per frame
        const rowsPerFrame = Math.max(1, Math.floor(internalGravity / 256));
        
        let moved = false;
        for (let i = 0; i < rowsPerFrame; i++) {
            if (this.currentPiece.move(this.board, 0, 1)) {
                moved = true;
            } else {
                if (!this.isGrounded) {
                    this.isGrounded = true;
                    this.lockDelay = 0;
                    this.currentPiece.playGroundSound(this.gameScene);
                }
                break;
            }
        }
        
        if (moved) {
            this.isGrounded = false;
            this.resetLockDelay();
        }
    }

    updateARETGM1(deltaTime) {
        this.areTimer += deltaTime;
        
        // Track IRS inputs during ARE
        this.areRotationKeys.k = this.gameScene.keys.k.isDown;
        this.areRotationKeys.space = this.gameScene.keys.space.isDown;
        this.areRotationKeys.l = this.gameScene.keys.l.isDown;
        
        // Determine rotation direction
        if (this.gameScene.keys.k.isDown) {
            this.areRotationDirection = 1;
        } else if (this.gameScene.keys.space.isDown || this.gameScene.keys.l.isDown) {
            this.areRotationDirection = -1;
        } else {
            this.areRotationDirection = 0;
        }
        
        this.irsActivated = this.areRotationDirection !== 0;
        
        if (this.areTimer >= this.areDelay) {
            this.areActive = false;
            this.spawnPiece();
        }
    }

    spawnPiece() {
        if (this.nextPieces.length < this.config.getNextCount()) {
            this.generateNextPiecesTGM1();
        }
        
        if (this.nextPieces.length === 0) {
            this.gameOver = true;
            return;
        }
        
        const pieceType = this.nextPieces.shift();
        
        // Determine initial rotation based on IRS
        let initialRotation = 0;
        if (this.areRotationDirection === 1) {
            initialRotation = 1;
        } else if (this.areRotationDirection === -1) {
            initialRotation = 3;
        }
        
        this.currentPiece = new Piece(pieceType, this.gameScene.rotationSystem, initialRotation);
        
        // Play IRS sound if piece is prerotated
        if (initialRotation !== 0 && this.gameScene.sound) {
            const irsSound = this.gameScene.sound.add('IRS', { volume: 0.5 });
            irsSound.play();
        }
        
        // Handle spawn validation with TGM1 shifting
        if (!this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            if (initialRotation !== 0) {
                let shifted = false;
                for (let shiftY = -1; shiftY >= -3; shiftY--) {
                    if (this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y + shiftY)) {
                        this.currentPiece.y += shiftY;
                        shifted = true;
                        break;
                    }
                }
                if (!shifted) {
                    this.gameOver = true;
                    return;
                }
            } else {
                this.gameOver = true;
                return;
            }
        }
        
        // 20G gravity: immediately hard drop the piece
        // In 20G, pieces fall instantly to the ground/stack
        if (this.currentPiece) {
            this.currentPiece.hardDrop(this.board);
            this.isGrounded = true;
            this.lockDelay = 0;
        }
        
        // Track piece spawn time
        this.pieceSpawnTime = this.time ? this.time.now : Date.now();
        this.pieceActiveTime = 0;
        
        // Reset IRS tracking
        this.areRotationDirection = 0;
        
        // Update level on first spawn
        if (this.isFirstSpawn) {
            this.isFirstSpawn = false;
        } else {
            this.updateLevelTGM1('piece');
        }
        
        this.totalPiecesPlaced++;
    }

    lockPiece() {
        if (this.gameScene.sound) {
            const lockSound = this.gameScene.sound.add('lock', { volume: 0.6 });
            lockSound.play();
        }
        
        // Track T-spin before clearing lines
        this.isTSpin = this.detectTSpin(this.currentPiece, this.board);
        
        // Place piece on board
        this.board.placePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
        
        // Check for cleared lines
        const linesCleared = this.board.clearLines();
        this.lines += linesCleared;
        this.totalLines += linesCleared;
        
        // Update score with TGM1 system
        this.updateScoreTGM1(linesCleared, this.currentPiece.type, this.isTSpin);
        
        // Update level
        this.updateLevelTGM1('lines', linesCleared);
        
        // Start ARE
        this.areActive = true;
        this.areTimer = 0;
        this.currentPiece = null;
        this.canHold = false;
        
        if (linesCleared > 0 && this.gameScene.sound) {
            const clearSound = this.gameScene.sound.add('clear', { volume: 0.7 });
            clearSound.play();
        }
    }

    updateScoreTGM1(lines, pieceType = null, isTSpin = false) {
        let points = 0;
        let clearType = null;
        
        // Calculate combo
        let combo = 1;
        if (lines > 0) {
            this.comboCount = (this.comboCount === -1) ? 0 : this.comboCount;
            this.comboCount += (2 * lines) - 2;
            combo = Math.max(1, this.comboCount + 1);
        } else {
            this.comboCount = -1;
        }
        
        // Calculate bravo bonus
        let bravo = 1;
        if (lines > 0) {
            const boardIsFull = this.board.grid.every(row => row.every(cell => cell !== 0));
            if (boardIsFull) {
                bravo = 4;
                clearType = 'bravo';
            }
        }
        
        // Main scoring formula
        if (lines > 0) {
            const baseScore = Math.ceil((this.level + lines) / 4 + this.softDropRows + (2 * this.hardDropRows));
            points = baseScore * lines * combo * bravo;
        }
        
        // Reset drop counters
        this.softDropRows = 0;
        this.hardDropRows = 0;
        
        this.score += points;
        this.lastClearType = clearType;
        this.lastPieceType = pieceType;
    }

    updateLevelTGM1(type, amount = 1) {
        const oldLevel = this.level;
        
        if (type === 'piece') {
            this.piecesPlaced++;
            
            const currentIsStopLevel = (this.level % 100 === 99) || 
                                     (this.level === 998) ||
                                     (this.level === 999);
            if (!currentIsStopLevel && this.level < 999) {
                this.level += 1;
            }
        } else if (type === 'lines') {
            let newLevel = this.level + amount;
            
            if (oldLevel === 998 && amount > 0) {
                this.level = 999;
            } else if (newLevel > 999) {
                this.level = 999;
            } else {
                this.level = newLevel;
            }
        }
        
        // Check for section transitions
        const oldSection = Math.floor(oldLevel / 100);
        const newSection = Math.floor(this.level / 100);
        
        if (newSection > oldSection && this.level < 999) {
            this.handleSectionTransitionTGM1(newSection);
        }
        
        // Check for GM conditions
        this.checkGMConditions();
    }

    handleSectionTransitionTGM1(section) {
        this.sectionTransition = true;
        
        if (this.gameScene.sound) {
            const sectionChangeSound = this.gameScene.sound.add('sectionchange', { volume: 0.6 });
            sectionChangeSound.play();
        }
        
        this.sectionCap = (section + 1) * 100;
        if (section >= 9) {
            this.sectionCap = 999;
        }
    }

    checkGMConditions() {
        if (this.level >= 300 && this.score >= 12000 && this.currentTime <= 4 * 60 + 15) {
            this.gmConditions.level300.achieved = true;
            this.gmConditions.level300.time = this.currentTime;
            this.gmConditions.level300.score = this.score;
        }
        
        if (this.level >= 500 && this.score >= 40000 && this.currentTime <= 7 * 60 + 30) {
            this.gmConditions.level500.achieved = true;
            this.gmConditions.level500.time = this.currentTime;
            this.gmConditions.level500.score = this.score;
        }
        
        if (this.level >= 999 && this.score >= 126000 && this.currentTime <= 13 * 60 + 30) {
            this.gmConditions.level999.achieved = true;
            this.gmConditions.level999.time = this.currentTime;
            this.gmConditions.level999.score = this.score;
        }
    }

    updateProgressTGM1() {
        this.updateGradeTGM1();
        this.updatePPSTGM1();
        this.updateBGMTGM1();
        
        if (this.level === 999 && this.level !== this.lastLevel) {
            this.onLevel999Reached();
        }
        
        this.lastLevel = this.level;
    }

    updateGradeTGM1() {
        let newGrade = '9';
        
        if (this.gmConditions.level300.achieved && 
            this.gmConditions.level500.achieved && 
            this.gmConditions.level999.achieved) {
            newGrade = 'GM';
        } else if (this.score >= 120000) newGrade = 'S9';
        else if (this.score >= 100000) newGrade = 'S8';
        else if (this.score >= 82000) newGrade = 'S7';
        else if (this.score >= 66000) newGrade = 'S6';
        else if (this.score >= 52000) newGrade = 'S5';
        else if (this.score >= 40000) newGrade = 'S4';
        else if (this.score >= 30000) newGrade = 'S3';
        else if (this.score >= 22000) newGrade = 'S2';
        else if (this.score >= 16000) newGrade = 'S1';
        else if (this.score >= 12000) newGrade = '1';
        else if (this.score >= 8000) newGrade = '2';
        else if (this.score >= 5500) newGrade = '3';
        else if (this.score >= 3500) newGrade = '4';
        else if (this.score >= 2000) newGrade = '5';
        else if (this.score >= 1400) newGrade = '6';
        else if (this.score >= 800) newGrade = '7';
        else if (this.score >= 400) newGrade = '8';
        
        if (this.getGradeValue(newGrade) > this.getGradeValue(this.grade)) {
            this.grade = newGrade;
            if (this.gameScene.sound) {
                const gradeUpSound = this.gameScene.sound.add('gradeup', { volume: 0.6 });
                gradeUpSound.play();
            }
        }
    }

    updatePPSTGM1() {
        const totalTime = this.activeTime + this.areTime;
        this.conventionalPPS = totalTime > 0 ? this.totalPiecesPlaced / totalTime : 0;
        this.rawPPS = this.activeTime > 0 ? this.totalPiecesPlaced / this.activeTime : 0;
    }

    updateBGMTGM1() {
        super.updateBGM();
    }

    onLevel999Reached() {
        if (this.gameScene.startCredits) {
            this.gameScene.startCredits();
        }
    }

    generateNextPiecesTGM1() {
        for (let i = 0; i < 6; i++) {
            this.nextPieces.push(this.generateTGM1Piece());
        }
    }

    generateTGM1Piece() {
        const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        let generatedPiece;
        let attempts = 0;
        
        if (this.firstPiece) {
            const firstPieceTypes = ['I', 'J', 'L', 'T'];
            generatedPiece = firstPieceTypes[Math.floor(Math.random() * firstPieceTypes.length)];
            this.firstPiece = false;
        } else {
            do {
                generatedPiece = types[Math.floor(Math.random() * types.length)];
                attempts++;
            } while (this.pieceHistory.includes(generatedPiece) && attempts < 6);
        }
        
        this.pieceHistory.shift();
        this.pieceHistory.push(generatedPiece);
        
        return generatedPiece;
    }

    validatePieceHistory() {
        if (!this.pieceHistory || this.pieceHistory.length !== 4) {
            this.pieceHistory = ['Z', 'Z', 'S', 'S'];
        }
        
        const validPieces = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        this.pieceHistory = this.pieceHistory.filter(piece => 
            piece && validPieces.includes(piece)
        );
        
        while (this.pieceHistory.length < 4) {
            this.pieceHistory.push('Z');
        }
        
        if (this.pieceHistory.length > 4) {
            this.pieceHistory = this.pieceHistory.slice(-4);
        }
    }

    detectTSpin(piece, board) {
        if (piece.type !== 'T') return false;
        
        const corners = [
            { x: piece.x - 1, y: piece.y - 1 },
            { x: piece.x + 1, y: piece.y - 1 },
            { x: piece.x - 1, y: piece.y + 1 },
            { x: piece.x + 1, y: piece.y + 1 }
        ];
        
        let filledCorners = 0;
        corners.forEach(corner => {
            if (corner.x < 0 || corner.x >= board.cols || corner.y >= board.rows || 
                (corner.y >= 0 && board.grid[corner.y][corner.x])) {
                filledCorners++;
            }
        });
        
        return filledCorners >= 3;
    }

    checkCompletionTGM1() {
        if (this.level >= 999) {
            this.completed = true;
        }
    }

    getGradeValue(grade) {
        const gradeValues = {
            '9': 0, '8': 1, '7': 2, '6': 3, '5': 4, '4': 5, '3': 6, '2': 7, '1': 8,
            'S1': 9, 'S2': 10, 'S3': 11, 'S4': 12, 'S5': 13, 'S6': 14, 'S7': 15, 'S8': 16, 'S9': 17,
            'M': 18, 'GM': 19
        };
        return gradeValues[grade] || 0;
    }

    getGameState() {
        const baseState = super.getGameState();
        return {
            ...baseState,
            conventionalPPS: this.conventionalPPS,
            rawPPS: this.rawPPS,
            gmConditions: this.gmConditions,
            sectionCap: this.sectionCap,
            currentTime: this.currentTime,
            pieceActiveTime: this.pieceActiveTime
        };
    }

    cleanup() {
        super.cleanup();
        this.gmConditions = null;
        this.pieceHistory = null;
    }
}

module.exports = TwentyGMode;
