# Plan to Reimplement Minosa AI in Minosa.js

## Overview
This plan outlines the steps to reimplement Minosa AI in `Minosa.js`, focusing on creating an All Clear path finder for Konoha Easy. The implementation will use the patterns database from `KonohaEasyBravoDatabase.md`, separating Build and Solve patterns for 3x4 and 2x4 box patterns. The pattern sequence will be calculated based on the next piece queue and the hold piece, and hints will be displayed according to the current/held piece.

## Analysis of Requirements

### Key Components
1. **Pattern Database**: Use `KonohaEasyBravoDatabase.md` to extract Build and Solve patterns for 3x4 and 2x4 box patterns.
2. **Pattern Sequence Calculation**: Calculate the sequence based on the next piece queue and the hold piece.
3. **Hint Display**: Display hints based on the current/held piece.

### Separation of Patterns
- **Build Patterns**: Patterns used to set up the board for solving.
- **Solve Patterns**: Patterns used to solve the board and achieve an All Clear.

### Interchangeability
- Ensure Solve patterns are interchangeable for 3x4 and 2x4 box patterns.

## Implementation Steps

### Step 1: Extract and Organize Patterns
- **Action**: Parse `KonohaEasyBravoDatabase.md` to extract Build and Solve patterns.
- **Details**:
  - Identify and separate Build patterns for 3x4 and 2x4 box patterns.
  - Identify and separate Solve patterns for 3x4 and 2x4 box patterns.
  - Ensure Solve patterns are interchangeable.

### Step 2: Design Pattern Sequence Calculation Logic
- **Action**: Design logic to calculate the pattern sequence based on the next piece queue and hold piece.
- **Details**:
  - Use the next piece queue to determine the sequence of pieces.
  - Incorporate the hold piece to adjust the sequence if necessary.
  - Ensure the logic is flexible to handle different scenarios.

### Step 3: Implement Hint Display Logic
- **Action**: Implement logic to display hints based on the current/held piece.
- **Details**:
  - Use the current piece and held piece to determine the appropriate hint.
  - Ensure hints are displayed in a user-friendly manner.

### Step 4: Draft the Plan for Minosa.js Implementation
- **Action**: Draft a detailed plan for implementing Minosa.js.
- **Details**:
  - Outline the structure of `Minosa.js`.
  - Define the functions and methods required for the implementation.
  - Include error handling and edge cases.

## Detailed Plan for Minosa.js

### File Structure
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

### Functions and Methods

#### PatternDatabase
- **BuildPatterns**:
  - `getBuildPatternsFor3x4Box()`: Returns Build patterns for 3x4 box.
  - `getBuildPatternsFor2x4Box()`: Returns Build patterns for 2x4 box.

- **SolvePatterns**:
  - `getSolvePatternsFor3x4Box()`: Returns Solve patterns for 3x4 box.
  - `getSolvePatternsFor2x4Box()`: Returns Solve patterns for 2x4 box.

#### PatternSequenceCalculator
- **calculateSequence(nextPieceQueue, holdPiece)**:
  - Input: `nextPieceQueue` (array of next pieces), `holdPiece` (current hold piece).
  - Output: Sequence of patterns to achieve All Clear.
  - Logic:
    - Use the next piece queue to determine the sequence.
    - Adjust the sequence based on the hold piece.

- **adjustForHoldPiece(sequence, holdPiece)**:
  - Input: `sequence` (current sequence), `holdPiece` (current hold piece).
  - Output: Adjusted sequence considering the hold piece.
  - Logic:
    - If the hold piece can improve the sequence, adjust accordingly.

#### HintDisplay
- **getHintForCurrentPiece(currentPiece, sequence)**:
  - Input: `currentPiece` (current piece), `sequence` (current sequence).
  - Output: Hint for the current piece.
  - Logic:
    - Use the current piece to determine the appropriate hint from the sequence.

- **Kita Logic**:
  - Returns a fox emoji if an All Clear path is found.
  - Add a tick next to the emoji if an All Clear is achieved. (display for 2s)
  - Add a cross next to the emoji if an All Clear cannot be achieved for 1.5s.

- **getHintForHeldPiece(heldPiece, sequence)**:
  - Input: `heldPiece` (held piece), `sequence` (current sequence).
  - Output: Hint for the held piece.
  - Logic:
    - Use the held piece to determine the appropriate hint from the sequence.

### Error Handling and Edge Cases
- **Invalid Patterns**: Handle cases where patterns are invalid or not found.
- **Empty Queue**: Handle cases where the next piece queue is empty.
- **No Hold Piece**: Handle cases where there is no hold piece.

## Conclusion
This plan outlines the steps to reimplement Minosa AI in `Minosa.js`, focusing on creating an All Clear path finder for Konoha Easy. The implementation will use the patterns database from `KonohaEasyBravoDatabase.md`, separating Build and Solve patterns for 3x4 and 2x4 box patterns. The pattern sequence will be calculated based on the next piece queue and the hold piece, and hints will be displayed according to the current/held piece.