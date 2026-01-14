// Test script for Minosa.js

const Minosa = require('./Minosa.js');

// Test PatternDatabase module
console.log("Testing PatternDatabase module:");
console.log("3x4 Box Build Patterns:", Minosa.PatternDatabase.getBuildPatternsFor3x4Box());
console.log("2x4 Box Build Patterns:", Minosa.PatternDatabase.getBuildPatternsFor2x4Box());
console.log("3x4 Box Solve Patterns:", Minosa.PatternDatabase.getSolvePatternsFor3x4Box());
console.log("2x4 Box Solve Patterns:", Minosa.PatternDatabase.getSolvePatternsFor2x4Box());

// Test PatternSequenceCalculator module
console.log("\nTesting PatternSequenceCalculator module:");
const nextPieceQueue = ['I', 'O', 'T', 'L'];
const holdPiece = 'J';
const sequence = Minosa.PatternSequenceCalculator.calculateSequence(nextPieceQueue, holdPiece);
console.log("Calculated Sequence:", sequence);

const adjustedSequence = Minosa.PatternSequenceCalculator.adjustForHoldPiece(sequence, holdPiece);
console.log("Adjusted Sequence:", adjustedSequence);

// Test HintDisplay module
console.log("\nTesting HintDisplay module:");
const currentPiece = 'I';
const currentHint = Minosa.HintDisplay.getHintForCurrentPiece(currentPiece, adjustedSequence);
console.log("Hint for Current Piece:", currentHint);

const heldHint = Minosa.HintDisplay.getHintForHeldPiece(holdPiece, adjustedSequence);
console.log("Hint for Held Piece:", heldHint);

// Test findAllClearPath function
console.log("\nTesting findAllClearPath function:");
const result = Minosa.findAllClearPath(nextPieceQueue, holdPiece, currentPiece);
console.log("Result:", result);