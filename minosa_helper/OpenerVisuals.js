/**
 * OpenerVisuals.js
 * Handles Phaser 3 rendering for ghosts, warnings, and success effects.
 */

export class OpenerVisuals {
    constructor(scene, gridOffsetX, gridOffsetY, blockSize) {
        this.scene = scene;
        this.offsetX = gridOffsetX;
        this.offsetY = gridOffsetY;
        this.blockSize = blockSize;

        // Graphics container for the ghost pieces
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(5); // Behind active piece (usually depth 10), above board (depth 0)

        // Setup a pulsing tween for the ghosts to distinguish them from hard-drop ghosts
        this.scene.tweens.add({
            targets: this.graphics,
            alpha: { from: 0.6, to: 0.3 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * Renders the ghost pieces for the current state
     * @param {Array} ghostMoves - Array of move objects {type, x, y, r, expectedCells}
     */
    renderGhosts(ghostMoves) {
        this.graphics.clear();

        if (!ghostMoves || ghostMoves.length === 0) return;

        ghostMoves.forEach(move => {
            const color = this._getPieceColor(move.type);
            
            // 1. Draw Fill (Low Opacity)
            this.graphics.fillStyle(color, 1.0); // Alpha handled by tween
            
            // 2. Draw Outline (Higher Visibility)
            this.graphics.lineStyle(2, color, 0.8);

            // Draw the blocks based on the pre-calculated expectedCells
            if (move.expectedCells) {
                move.expectedCells.forEach(cell => {
                    const px = this.offsetX + (cell.x * this.blockSize);
                    const py = this.offsetY + (cell.y * this.blockSize);
                    
                    this.graphics.fillRect(px, py, this.blockSize, this.blockSize);
                    this.graphics.strokeRect(px, py, this.blockSize, this.blockSize);
                });
            }
        });
    }

    /**
     * Visual feedback for a successful placement
     */
    playSuccessEffect(x, y) {
        // Green tint flash on the board area
        const flash = this.scene.add.rectangle(
            this.offsetX + 150, this.offsetY + 300, // Approx center
            300, 600, 
            0x00ff00
        );
        flash.setBlendMode(Phaser.BlendModes.ADD);
        flash.alpha = 0.3;
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 300,
            onComplete: () => flash.destroy()
        });
    }

    /**
     * Visual feedback for a mistake
     * @param {string} type - 'FAIL' or 'SOFT_WARNING'
     */
    playWarningEffect(type) {
        const color = type === 'FAIL' ? 0xff0000 : 0xffaa00;
        const intensity = type === 'FAIL' ? 0.02 : 0.01;

        // 1. Camera Shake
        this.scene.cameras.main.shake(200, intensity);

        // 2. Red/Orange Flash
        const flash = this.scene.add.rectangle(
            0, 0, 
            this.scene.scale.width, this.scene.scale.height, 
            color
        ).setOrigin(0,0);
        
        flash.alpha = 0.4;

        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 400,
            onComplete: () => flash.destroy()
        });

        // 3. Text Warning (Optional)
        const text = this.scene.add.text(
            this.scene.scale.width / 2, 
            this.scene.scale.height / 3, 
            type === 'FAIL' ? "MISPLACED!" : "CHECK!", 
            { fontSize: '32px', fontStyle: 'bold', color: type === 'FAIL' ? '#ff0000' : '#ffaa00' }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 50,
            alpha: 0,
            duration: 800,
            onComplete: () => text.destroy()
        });
    }

    _getPieceColor(type) {
        const colors = {
            'T': 0x800080, // Purple
            'I': 0x00FFFF, // Cyan
            'O': 0xFFFF00, // Yellow
            'L': 0xFFA500, // Orange
            'J': 0x0000FF, // Blue
            'S': 0x00FF00, // Green
            'Z': 0xFF0000  // Red
        };
        return colors[type] || 0xFFFFFF;
    }
}