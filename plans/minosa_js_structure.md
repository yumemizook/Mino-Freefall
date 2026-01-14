# Structure for Minosa.js

Based on the plan in `plans/reimplement_minosa_ai.md`, the structure for `Minosa.js` will be as follows:

## Overview
The implementation will focus on creating an All Clear path finder for Konoha Easy. The system will use patterns from `KonohaEasyBravoDatabase.md`, separating Build and Solve patterns for 3x4 and 2x4 box patterns. The pattern sequence will be calculated based on the next piece queue and the hold piece, and hints will be displayed according to the current/held piece.

## File Structure
```
Minosa.js
├── PatternDatabase
│   ├── BuildPatterns
│   │   ├── 3x4Box
│   │   └── 2x4Box
│   └── SolvePatterns
│       ├── 3x4Box
│       └── 2x4Box
├── PatternSequenceCalculator
│   ├── calculateSequence
│   └── adjustForHoldPiece
└── HintDisplay
    ├── getHintForCurrentPiece
    └── getHintForHeldPiece
```

## Modules

### PatternDatabase
This module will handle the extraction and organization of patterns from `KonohaEasyBravoDatabase.md`.

#### Functions:
- `getBuildPatternsFor3x4Box()`: Returns Build patterns for 3x4 box.
- `getBuildPatternsFor2x4Box()`: Returns Build patterns for 2x4 box.
- `getSolvePatternsFor3x4Box()`: Returns Solve patterns for 3x4 box.
- `getSolvePatternsFor2x4Box()`: Returns Solve patterns for 2x4 box.

### PatternSequenceCalculator
This module will calculate the sequence of patterns based on the next piece queue and the hold piece.

#### Functions:
- `calculateSequence(nextPieceQueue, holdPiece)`: Returns the sequence of patterns to achieve All Clear.
- `adjustForHoldPiece(sequence, holdPiece)`: Adjusts the sequence based on the hold piece.

### HintDisplay
This module will display hints based on the current or held piece.

#### Functions:
- `getHintForCurrentPiece(currentPiece, sequence)`: Returns a hint for the current piece.
- `getHintForHeldPiece(heldPiece, sequence)`: Returns a hint for the held piece.

## Implementation Details

### PatternDatabase
- **Build Patterns**: Patterns used to set up the board for solving.
- **Solve Patterns**: Patterns used to solve the board and achieve an All Clear.

### PatternSequenceCalculator
- **Input**: `nextPieceQueue` (array of next pieces), `holdPiece` (current hold piece).
- **Output**: Sequence of patterns to achieve All Clear.
- **Logic**:
  - Use the next piece queue to determine the sequence.
  - Adjust the sequence based on the hold piece.

### HintDisplay
- **Input**: `currentPiece` (current piece), `sequence` (current sequence).
- **Output**: Hint for the current piece.
- **Logic**:
  - Use the current piece to determine the appropriate hint from the sequence.

## Error Handling and Edge Cases
- **Invalid Patterns**: Handle cases where patterns are invalid or not found.
- **Empty Queue**: Handle cases where the next piece queue is empty.
- **No Hold Piece**: Handle cases where there is no hold piece.

## Next Steps
1. Implement the PatternDatabase module.
2. Implement the PatternSequenceCalculator module.
3. Implement the HintDisplay module.
4. Integrate the modules into `Minosa.js`.
5. Test the implementation.