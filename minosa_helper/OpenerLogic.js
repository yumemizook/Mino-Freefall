/**
 * OpenerLogic.js
 * Handles the state of the opener, bag progression, and validation logic.
 */

export class OpenerLogic {
    constructor(openerSequence) {
        this.fullSequence = openerSequence; // Array of Bags
        this.currentBagIndex = 0;
        this.currentBag = this.fullSequence[0] ? [...this.fullSequence[0]] : [];
        
        // Track which pieces in the current bag have been satisfied
        // We track by index of the move in the bag array
        this.satisfiedMoves = []; 
    }

    /**
     * @param {object} lockedPiece - The piece object from your game engine
     * @param {string} lockedPiece.type - 'T', 'I', 'L', 'J', 'S', 'Z', 'O'
     * @param {number} lockedPiece.x - Grid X coordinate
     * @param {number} lockedPiece.y - Grid Y coordinate
     * @param {number} lockedPiece.rotation - 0, 1, 2, 3 (SRS)
     * @param {Array} lockedPiece.cells - Array of {x, y} objects representing absolute grid positions of the minos
     */
    validatePlacement(lockedPiece) {
        // 1. Find potential matches in the current bag for this piece type
        // that haven't been filled yet.
        const potentialMoves = this.currentBag
            .map((move, index) => ({ move, index }))
            .filter(item => 
                item.move.type === lockedPiece.type && 
                !this.satisfiedMoves.includes(item.index)
            );

        if (potentialMoves.length === 0) {
            return { status: 'FAIL', reason: 'WRONG_PIECE', message: "Piece not needed in this bag!" };
        }

        // 2. Check for matches
        let matchResult = { status: 'FAIL', reason: 'MISPLACEMENT', message: "Incorrect position!" };

        for (let item of potentialMoves) {
            const target = item.move;
            
            // CHECK A: Hard Validation (Exact inputs)
            const isExactMatch = (
                lockedPiece.x === target.x &&
                lockedPiece.y === target.y &&
                lockedPiece.rotation === target.r
            );

            if (isExactMatch) {
                this._markMoveComplete(item.index);
                return { status: 'PERFECT', message: "Perfect!" };
            }

            // CHECK B: Soft Validation (Target Cells Match)
            // If the player used a weird spin or rotation, but the blocks ended up 
            // in the exact same physical grid cells, we count it.
            // Note: You must provide a helper to get target cells from the move definition.
            if (this._doCellsMatch(lockedPiece.cells, target.expectedCells)) {
                this._markMoveComplete(item.index);
                return { status: 'SOFT_MATCH', message: "Good recovery!" };
            }
        }

        return matchResult;
    }

    _markMoveComplete(index) {
        this.satisfiedMoves.push(index);
    }

    _doCellsMatch(playerCells, targetCells) {
        if (!targetCells || playerCells.length !== targetCells.length) return false;
        
        // Simple overlap check
        let matchCount = 0;
        for (let pCell of playerCells) {
            const match = targetCells.find(tCell => tCell.x === pCell.x && tCell.y === pCell.y);
            if (match) matchCount++;
        }
        return matchCount === playerCells.length;
    }

    checkBagProgress() {
        // If all moves in current bag are satisfied
        if (this.satisfiedMoves.length >= this.currentBag.length) {
            this._advanceBag();
            return true; // Bag completed
        }
        return false;
    }

    _advanceBag() {
        this.currentBagIndex++;
        this.satisfiedMoves = []; // Reset for next bag
        
        if (this.currentBagIndex < this.fullSequence.length) {
            this.currentBag = this.fullSequence[this.currentBagIndex];
        } else {
            this.currentBag = []; // Opener finished
        }
    }

    getCurrentGhosts() {
        // Returns only the moves that haven't been completed yet
        if (!this.currentBag) return [];
        return this.currentBag.filter((_, index) => !this.satisfiedMoves.includes(index));
    }

    isOpenerFinished() {
        return this.currentBagIndex >= this.fullSequence.length;
    }
}