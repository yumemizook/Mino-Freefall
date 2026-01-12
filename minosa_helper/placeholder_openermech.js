import { OpenerLogic } from './OpenerLogic.js';
import { OpenerVisuals } from './OpenerVisuals.js';

// --- DATA DEFINITION EXAMPLE (DT CANNON) ---
// You need a helper function in your game to calculate "expectedCells"
// based on x, y, rotation and shape type. 
// For this example, I'm mocking the cell data.
const DT_CANNON_DATA = [
    // BAG 1
    [
        { type: 'L', x: 2, y: 17, r: 1, expectedCells: [{x:2,y:17}, {x:2,y:16}, {x:2,y:15}, {x:3,y:17}] }, 
        { type: 'J', x: 7, y: 17, r: 3, expectedCells: [{x:7,y:17}, {x:7,y:16}, {x:7,y:15}, {x:6,y:17}] },
        // ... rest of bag 1 pieces ...
    ],
    // BAG 2
    [
        { type: 'I', x: 9, y: 16, r: 1, expectedCells: [{x:9,y:14}, {x:9,y:15}, {x:9,y:16}, {x:9,y:17}] },
        // ... rest of bag 2 pieces ...
    ]
];

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // 1. Initialize Logic
        this.openerLogic = new OpenerLogic(DT_CANNON_DATA);

        // 2. Initialize Visuals
        // (Assuming board is at 50,50 and blocks are 30px)
        this.openerVisuals = new OpenerVisuals(this, 50, 50, 30);

        // 3. Initial Render
        this.updateOpenerVisuals();

        // --- SIMULATING GAME EVENTS ---
        
        // Listen for your game's "Piece Locked" event
        // This is where you hook into your existing Tetris engine
        this.events.on('pieceLocked', (lockedPiece) => {
            this.handlePieceLock(lockedPiece);
        });
    }

    updateOpenerVisuals() {
        if (this.openerLogic.isOpenerFinished()) {
            this.openerVisuals.graphics.clear(); // Clear ghosts
            return;
        }

        const ghostsToDraw = this.openerLogic.getCurrentGhosts();
        this.openerVisuals.renderGhosts(ghostsToDraw);
    }

    handlePieceLock(lockedPiece) {
        // If the opener is already done, ignore
        if (this.openerLogic.isOpenerFinished()) return;

        // 1. Validate the placement
        const result = this.openerLogic.validatePlacement(lockedPiece);

        // 2. Handle Result
        if (result.status === 'PERFECT') {
            this.openerVisuals.playSuccessEffect();
            console.log(result.message);
        } 
        else if (result.status === 'SOFT_MATCH') {
            // It was a weird placement, but it filled the right holes
            this.openerVisuals.playSuccessEffect(); // Or a slightly different "OK" effect
            console.log(result.message);
        } 
        else {
            // Failure
            this.openerVisuals.playWarningEffect('FAIL');
            console.warn(result.message);
            
            // Optional: Reset opener or fail game
            // this.openerLogic.reset();
        }

        // 3. Check Bag Progress
        const bagFinished = this.openerLogic.checkBagProgress();
        if (bagFinished) {
            console.log("Bag Complete! Advancing...");
        }

        // 4. Update the visual ghosts for the next turn
        this.updateOpenerVisuals();
    }
}