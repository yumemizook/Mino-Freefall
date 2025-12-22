// GameMode.js - Base class for all game modes
// Provides common functionality and defines the interface for mode implementations

const { Board, Piece } = require('./GameEngine.js');

class GameMode {
    constructor(config, gameScene) {
        this.config = config;
        this.gameScene = gameScene;
        
        // Core game state
        this.board = new Board();
        this.currentPiece = null;
        this.nextPieces = [];
        this.holdPiece = null;
        this.canHold = true;
        
        // Game progress
        this.level = 0;
        this.score = 0;
        this.lines = 0;
        this.grade = '9';
        
        // Timing systems
        this.gravityTimer = 0;
        this.lockDelay = 0;
        this.isGrounded = false;
        this.areTimer = 0;
        this.areActive = false;
        
        // Input handling
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;
        this.leftTimer = 0;
        this.rightTimer = 0;
        this.leftInRepeat = false;
        this.rightInRepeat = false;
        
        // Game state
        this.gameOver = false;
        this.completed = false;
        this.piecesPlaced = 0;
        
        // Initialize mode-specific settings
        this.initializeMode();
    }

    // Abstract methods that subclasses must implement
    initializeMode() {
        // Override in subclasses for mode-specific initialization
        this.generateNextPieces();
        this.spawnPiece();
    }

    update(deltaTime) {
        if (this.gameOver || this.completed) return;
        
        // Update timing-based values from configuration
        this.updateTimingFromConfig();
        
        // Handle input
        this.handleInput(deltaTime);
        
        // Update game logic
        if (!this.areActive) {
            this.updatePieceMovement(deltaTime);
            this.updateGravity(deltaTime);
            this.updateLockDelay(deltaTime);
        } else {
            this.updateARE(deltaTime);
        }
        
        // Check completion conditions
        this.checkCompletion();
        
        // Update scoring and level
        this.updateProgress();
    }

    // Configuration-driven timing updates
    updateTimingFromConfig() {
        if (this.currentPiece) {
            // Update current timing values based on current level
            this.dasDelay = this.config.getDAS(this.level);
            this.arrDelay = this.config.getARR(this.level);
            this.areDelay = this.config.getARE(this.level);
            this.lockDelayMax = this.config.getLockDelay(this.level);
        }
    }

    // Input handling (to be overridden for mode-specific controls)
    handleInput(deltaTime) {
        // Basic input handling - can be overridden by modes
        this.handleDAS(deltaTime);
    }

    handleDAS(deltaTime) {
        const leftDown = this.gameScene.cursors.left.isDown || this.gameScene.keys.z.isDown;
        const rightDown = this.gameScene.cursors.right.isDown || this.gameScene.keys.c.isDown;
        
        // Left movement
        if (leftDown && !this.leftKeyPressed) {
            this.leftKeyPressed = true;
            this.leftTimer = 0;
            this.leftInRepeat = false;
            if (this.currentPiece && this.currentPiece.move(this.board, -1, 0)) {
                this.resetLockDelay();
            }
        }
        
        if (this.leftKeyPressed && leftDown) {
            this.leftTimer += deltaTime;
            if (!this.leftInRepeat) {
                if (this.leftTimer >= this.dasDelay) {
                    this.leftInRepeat = true;
                    this.leftTimer = 0;
                    if (this.currentPiece && this.currentPiece.move(this.board, -1, 0)) {
                        this.resetLockDelay();
                    }
                }
            } else if (this.leftTimer >= this.arrDelay) {
                this.leftTimer = 0;
                if (this.currentPiece && this.currentPiece.move(this.board, -1, 0)) {
                    this.resetLockDelay();
                }
            }
        }
        
        if (!leftDown && this.leftKeyPressed) {
            this.leftKeyPressed = false;
            this.leftTimer = 0;
            this.leftInRepeat = false;
        }
        
        // Right movement (similar logic)
        if (rightDown && !this.rightKeyPressed) {
            this.rightKeyPressed = true;
            this.rightTimer = 0;
            this.rightInRepeat = false;
            if (this.currentPiece && this.currentPiece.move(this.board, 1, 0)) {
                this.resetLockDelay();
            }
        }
        
        if (this.rightKeyPressed && rightDown) {
            this.rightTimer += deltaTime;
            if (!this.rightInRepeat) {
                if (this.rightTimer >= this.dasDelay) {
                    this.rightInRepeat = true;
                    this.rightTimer = 0;
                    if (this.currentPiece && this.currentPiece.move(this.board, 1, 0)) {
                        this.resetLockDelay();
                    }
                }
            } else if (this.rightTimer >= this.arrDelay) {
                this.rightTimer = 0;
                if (this.currentPiece && this.currentPiece.move(this.board, 1, 0)) {
                    this.resetLockDelay();
                }
            }
        }
        
        if (!rightDown && this.rightKeyPressed) {
            this.rightKeyPressed = false;
            this.rightTimer = 0;
            this.rightInRepeat = false;
        }
    }

    updatePieceMovement(deltaTime) {
        if (!this.currentPiece) return;
        
        const downDown = this.gameScene.cursors.down.isDown || this.gameScene.keys.s.isDown;
        
        // Soft drop
        if (downDown) {
            if (this.currentPiece.move(this.board, 0, 1)) {
                this.resetLockDelay();
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

    updateGravity(deltaTime) {
        if (!this.currentPiece || this.areActive) return;
        
        const gravity = this.config.getGravity(this.level);
        
        if (gravity >= 256) {
            // High gravity - move multiple rows per frame
            const rowsPerFrame = Math.max(1, Math.floor(gravity / 256));
            for (let i = 0; i < rowsPerFrame; i++) {
                if (this.currentPiece.move(this.board, 0, 1)) {
                    this.isGrounded = false;
                } else {
                    if (!this.isGrounded) {
                        this.isGrounded = true;
                        this.lockDelay = 0;
                    }
                    break;
                }
            }
        } else {
            // Low gravity - timer-based
            this.gravityTimer += 1;
            const framesPerRow = Math.ceil(256 / gravity);
            if (this.gravityTimer >= framesPerRow) {
                if (this.currentPiece.move(this.board, 0, 1)) {
                    this.isGrounded = false;
                    this.resetLockDelay();
                } else {
                    if (!this.isGrounded) {
                        this.isGrounded = true;
                        this.lockDelay = 0;
                    }
                }
                this.gravityTimer = 0;
            }
        }
    }

    updateLockDelay(deltaTime) {
        if (this.isGrounded && this.lockDelayMax > 0) {
            this.lockDelay += deltaTime;
            if (this.lockDelay >= this.lockDelayMax) {
                this.lockPiece();
            }
        }
    }

    updateARE(deltaTime) {
        this.areTimer += deltaTime;
        if (this.areTimer >= this.areDelay) {
            this.areActive = false;
            this.spawnPiece();
        }
    }

    resetLockDelay() {
        this.lockDelay = 0;
        this.isGrounded = false;
    }

    spawnPiece() {
        if (this.nextPieces.length < this.config.getNextCount()) {
            this.generateNextPieces();
        }
        
        if (this.nextPieces.length === 0) {
            this.gameOver = true;
            return;
        }
        
        const pieceType = this.nextPieces.shift();
        this.currentPiece = new Piece(pieceType, this.gameScene.rotationSystem);
        
        if (!this.board.isValidPosition(this.currentPiece, this.currentPiece.x, this.currentPiece.y)) {
            this.gameOver = true;
            return;
        }
        
        this.canHold = this.config.isHoldEnabled();
        this.piecesPlaced++;
    }

    generateNextPieces() {
        const randomizer = this.config.getRandomizer();
        const count = this.config.getNextCount() + 5; // Generate extra pieces
        
        for (let i = 0; i < count; i++) {
            this.nextPieces.push(this.generateRandomPiece(randomizer));
        }
    }

    generateRandomPiece(randomizer) {
        const pieces = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        
        switch (randomizer) {
            case '7bag':
                return this.generate7BagPiece();
            case 'tgm1':
                return this.generateTGM1Piece();
            default:
                return pieces[Math.floor(Math.random() * pieces.length)];
        }
    }

    generate7BagPiece() {
        // Simple 7-bag randomizer
        if (!this.bag || this.bag.length === 0) {
            this.bag = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
            // Shuffle bag
            for (let i = this.bag.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
            }
        }
        return this.bag.pop();
    }

    generateTGM1Piece() {
        // TGM1 randomizer - simplified version
        const pieces = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        return pieces[Math.floor(Math.random() * pieces.length)];
    }

    lockPiece() {
        this.board.placePiece(this.currentPiece, this.currentPiece.x, this.currentPiece.y);
        
        const linesCleared = this.board.clearLines();
        this.lines += linesCleared;
        
        // Update score
        this.updateScore(linesCleared);
        
        // Update level based on mode rules
        this.updateLevel();
        
        // Start ARE
        this.areActive = true;
        this.areTimer = 0;
        this.currentPiece = null;
        
        // Play lock sound
        if (this.gameScene.sound) {
            const lockSound = this.gameScene.sound.add('lock', { volume: 0.6 });
            lockSound.play();
        }
    }

    updateScore(linesCleared) {
        // Base scoring - can be overridden by modes
        const basePoints = [0, 100, 300, 500, 800]; // 0, 1, 2, 3, 4 lines
        const points = basePoints[linesCleared] * (this.level + 1);
        this.score += points;
    }

    updateLevel() {
        // Base level progression - can be overridden by modes
        const completionType = this.config.getCompletionType();
        
        if (completionType === 'lines') {
            // Level increases every 10 lines
            const newLevel = Math.floor(this.lines / 10);
            if (newLevel > this.level) {
                this.level = newLevel;
            }
        } else if (completionType === 'piece') {
            // Level increases every piece
            this.level = Math.floor(this.piecesPlaced / 10);
        }
        // Level-based modes handle level updates differently
    }

    updateProgress() {
        // Update grade system if enabled
        if (this.config.hasGradeSystem()) {
            this.updateGrade();
        }
        
        // Update BGM
        this.updateBGM();
    }

    updateGrade() {
        // Basic grade system - can be overridden by modes
        if (this.score >= 12000) this.grade = '1';
        else if (this.score >= 8000) this.grade = '2';
        else if (this.score >= 5500) this.grade = '3';
        else if (this.score >= 3500) this.grade = '4';
        else if (this.score >= 2000) this.grade = '5';
        else if (this.score >= 1400) this.grade = '6';
        else if (this.score >= 800) this.grade = '7';
        else if (this.score >= 400) this.grade = '8';
    }

    updateBGM() {
        if (!this.config.isAudioEnabled()) return;
        
        const currentTrack = this.config.getBGMTrackForLevel(this.level);
        const shouldStop = this.config.shouldStopBGM(this.level);
        
        if (shouldStop && this.gameScene.currentBGM) {
            this.gameScene.currentBGM.stop();
            this.gameScene.currentBGM = null;
        }
        
        // Handle track switching logic here
        // This would integrate with the existing BGM system
    }

    checkCompletion() {
        const completionType = this.config.getCompletionType();
        const target = this.config.getCompletionTarget();
        
        if (!target) return; // No completion target (endless mode)
        
        switch (completionType) {
            case 'lines':
                if (this.lines >= target) {
                    this.completed = true;
                }
                break;
            case 'level':
                if (this.level >= target) {
                    this.completed = true;
                }
                break;
            case 'score':
                if (this.score >= target) {
                    this.completed = true;
                }
                break;
            case 'time':
                // Time-based completion would be handled in update()
                break;
        }
    }

    // Public getters for game state
    getGameState() {
        return {
            level: this.level,
            score: this.score,
            lines: this.lines,
            grade: this.grade,
            gameOver: this.gameOver,
            completed: this.completed,
            currentPiece: this.currentPiece,
            nextPieces: this.nextPieces.slice(0, this.config.getNextCount()),
            holdPiece: this.holdPiece,
            canHold: this.canHold
        };
    }

    // Mode-specific methods that can be overridden
    handleSpecialInput(keyCode) {
        // Override in modes that need special input handling
    }

    getCustomUI() {
        // Override in modes that need custom UI elements
        return null;
    }

    onModeEvent(eventType, data) {
        // Override in modes that need to respond to specific events
    }

    // Cleanup method
    cleanup() {
        // Override in modes that need cleanup
        this.board = null;
        this.currentPiece = null;
        this.nextPieces = [];
        this.holdPiece = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameMode;
}