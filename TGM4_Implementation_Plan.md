# TGM4 (Absolute Eye) Implementation Plan

## Overview

This document outlines the implementation plan for Tetris The Grand Master 4: Absolute Eye modes in the Mino-Freefall project. TGM4 introduces significant new mechanics and game modes that build upon the foundation of previous TGM titles.

## Core TGM4 Features

### New Gameplay Mechanics

1. **180° Initial Rotation System (IRS)**
   - Allow 180° rotation by pressing two rotation buttons of same direction
   - Integration with existing IRS system

2. **EXTRA Button (TGM Type/ARS only)**
   - Sonic Drop becomes Hard Drop when held
   - Soft Lock becomes Soft Drop (no lock on land)
   - ARE reduced to 7 frames when held

3. **Diagonal Movement Support**
   - Optional diagonal input recognition
   - Preserves DAS for diagonal directions

4. **Piece Movement Limitation**
   - 8 move resets and 2 rotation resets per piece
   - Switches to step reset when limits reached
   - Not applicable in Asuka modes

5. **Dual Rotation Systems**
   - Standard Type: SRS (like TGM3 World)
   - TGM Type: ARS (like TGM3 Classic)

## Game Modes Implementation

### 1. Marathon Mode (Standard Type only)
- **Objective**: Score-based mode, 150 lines maximum
- **Submodes**: Sprint (40 lines), Ultra (3 minutes)
- **Features**: Progressive gravity, no grading system
- **File**: `TGM4MarathonMode.js`

### 2. Normal Mode (TGM Type only)
- **Objective**: 999-level progression mode
- **Grading**: A of B format (e.g., Five of Eight)
- **Speed Timings**: Similar to TGM1
- **File**: `TGM4NormalMode.js`

### 3. x.1 Modes (TGM Type only)
- **1.1 Mode**: TGM1 Normal recreation
- **2.1 Mode**: T.A. Death recreation (20G fixed)
- **3.1 Mode**: Shirase recreation (20G fixed, 2000 levels)
- **Files**: `TGM4_1_1Mode.js`, `TGM4_2_1Mode.js`, `TGM4_3_1Mode.js`

### 4. Asuka Mode
- **Objective**: 20G stacking with time limits
- **Submodes**: Easy (1000 levels), Normal (1300 levels), Hard
- **Special Mechanics**:
  - Kita system (Tetris/TST/All Clear requirements)
  - Rewind mechanic (61 frames animation)
  - Infinity (no lock delay limit)
  - Vanish phase (fading/invisible pieces)
- **Files**: `TGM4AsukaMode.js`, `TGM4AsukaEasyMode.js`, `TGM4AsukaHardMode.js`

### 5. Master Mode
- **Objective**: Ultimate skill test, 2600 levels
- **Special Mechanics**:
  - Medal system with gameplay effects
  - Pikii sections (300-399, 500-599)
  - Pikii-2 sections (700-999)
  - Cyclone section (1000+, randomized rotations)
  - Master Pikii section (1300+, piece freezing)
  - END GAME section (65-second rewind challenge)
- **File**: `TGM4MasterMode.js`

### 6. Konoha Mode
- **Objective**: Big block All Clear challenges
- **Submodes**: Easy (L,J,I,T,O pieces, 110 clears), Hard (all pieces, endless)
- **Special Mechanics**:
  - Kita Kitsune assistant
  - Time-based gameplay with extensions
  - Assist mode (outlines for All Clears)
  - Character illustration unlocks
- **Files**: `TGM4KonohaMode.js`, `TGM4KonohaEasyMode.js`, `TGM4KonohaHardMode.js`

### 7. Shiranui Mode
- **Objective**: Standard Versus CPU battles
- **Features**: Best-of-3 rounds, 2-minute time limits
- **Progression**: Tier-based CPU opponents (0-104)
- **Special Tiers**: Tier 0 (player-based), Tier 101-104 (exhibition)
- **File**: `TGM4ShiranuiMode.js`

## Scoring Systems

### Standard Type Scoring
- Follows Guideline scoring conventions
- Used in Marathon, Sprint, Ultra modes
- **File**: `TGM4StandardScoring.js`

### TGM Type Scoring
- Enhanced scoring with pushdown points
- Soft drop: 1 point per cell
- Sonic/Hard drop: 2 points per cell
- Used in Normal, x.1 modes
- **File**: `TGM4TGMScoring.js`

## Grading and Title Systems

### Master Titles
- Silver: Standard Type completion
- Bronze: TGM Type completion
- Gold: Both types completion
- **File**: `TGM4TitleSystem.js`

### Mode-Specific Grading
- Normal: A of B format
- Asuka: Ae X format (Easy), Am (Normal), AGm (Hard)
- Master: Gm, Rounds grades
- Konoha: Km (Hard)
- Shiranui: Sm (Tier 101)
- **File**: `TGM4GradingSystem.js`

## Special Mechanics Implementation

### 1. Movement Limitation System
- Track move/rotation resets per piece
- Implement step reset fallback
- **File**: `TGM4MovementSystem.js`

### 2. Rewind System
- Piece placement history tracking
- 61-frame rewind animation
- Section boundary restrictions
- **File**: `TGM4RewindSystem.js`

### 3. Vanish/Fading System
- Piece visibility timers
- Level-based visibility rules
- **File**: `TGM4VanishSystem.js`

### 4. Pikii System
- Frozen line management
- Section-based freezing/unfreezing
- Medal effects on freeze times
- **File**: `TGM4PikiiSystem.js`

### 5. Cyclone System
- Randomized piece rotation
- Next piece rotation preview
- IRS/Hold interaction
- **File**: `TGM4CycloneSystem.js`

### 6. Kita System
- Tetris/TST/All Clear tracking
- Section progression requirements
- Visual feedback system
- **File**: `TGM4KitaSystem.js`

## File Structure

```
modes/modes/
├── TGM4/
│   ├── Core/
│   │   ├── TGM4BaseMode.js
│   │   ├── TGM4MovementSystem.js
│   │   ├── TGM4RewindSystem.js
│   │   ├── TGM4VanishSystem.js
│   │   ├── TGM4PikiiSystem.js
│   │   ├── TGM4CycloneSystem.js
│   │   └── TGM4KitaSystem.js
│   ├── Modes/
│   │   ├── TGM4MarathonMode.js
│   │   ├── TGM4NormalMode.js
│   │   ├── TGM4_1_1Mode.js
│   │   ├── TGM4_2_1Mode.js
│   │   ├── TGM4_3_1Mode.js
│   │   ├── TGM4AsukaMode.js
│   │   ├── TGM4AsukaEasyMode.js
│   │   ├── TGM4AsukaHardMode.js
│   │   ├── TGM4MasterMode.js
│   │   ├── TGM4KonohaMode.js
│   │   ├── TGM4KonohaEasyMode.js
│   │   ├── TGM4KonohaHardMode.js
│   │   └── TGM4ShiranuiMode.js
│   ├── Systems/
│   │   ├── TGM4StandardScoring.js
│   │   ├── TGM4TGMScoring.js
│   │   ├── TGM4GradingSystem.js
│   │   └── TGM4TitleSystem.js
│   └── TGM4ModeManager.js
```

## Implementation Phases

### Phase 1: Core Infrastructure
1. Create TGM4BaseMode extending BaseMode
2. Implement core mechanics (180° IRS, EXTRA button, movement limits)
3. Create TGM4ModeManager
4. Implement basic scoring systems

### Phase 2: Basic Modes
1. Implement Marathon mode and submodes
2. Implement Normal mode
3. Implement x.1 modes (1.1, 2.1, 3.1)
4. Test basic functionality

### Phase 3: Advanced Modes
1. Implement Asuka mode and submodes
2. Implement Konoha mode and submodes
3. Implement Shiranui mode
4. Test advanced mechanics

### Phase 4: Master Mode
1. Implement Master mode core mechanics
2. Implement Pikii systems
3. Implement Cyclone and Master Pikii
4. Implement END GAME mechanics
5. Complete testing

### Phase 5: Polish and Integration
1. Implement grading and title systems
2. Add visual effects and UI elements
3. Performance optimization
4. Documentation and final testing

## Technical Considerations

### Performance
- Efficient piece history tracking for rewind
- Optimized frozen line management
- Smooth animation handling

### Memory Management
- Piece state caching
- History buffer management
- Section-based data cleanup

### Compatibility
- Integration with existing BaseMode system
- Compatibility with current input handling
- Mode manager integration

## Testing Strategy

### Unit Testing
- Individual mechanic testing
- Scoring calculation verification
- Grading system validation

### Integration Testing
- Mode switching functionality
- Cross-mode compatibility
- Performance under load

### User Acceptance Testing
- Gameplay accuracy verification
- Timing precision testing
- Visual effect validation

## Dependencies

### Existing Systems
- BaseMode class
- ModeManager
- Input handling system
- Rendering system

### New Requirements
- Enhanced input detection (180° IRS, EXTRA button)
- Piece state management
- Advanced timing systems
- Visual effect systems

## Conclusion

This implementation plan provides a comprehensive roadmap for adding TGM4 modes to the Mino-Freefall project. The phased approach allows for incremental development and testing, ensuring each component is properly validated before proceeding to the next phase.

The modular design ensures maintainability and extensibility, while the clear separation of concerns allows for focused development on specific mechanics and modes.
