# Multi-Mode Tetris Architecture

A comprehensive architecture for implementing multiple Tetris game modes with varying mechanics, timing systems, and special features.

## Overview

This architecture provides a scalable, maintainable system for implementing multiple Tetris modes with:

- **Dynamic timing systems** (DAS/ARE, lock delays, gravity curves)
- **Configurable piece mechanics** (next queue, hold systems, randomizers)
- **Flexible completion conditions** (lines, levels, scores, time)
- **Mode-specific special mechanics** (frozen pieces, global timers, etc.)
- **BGM management** with section-based switching and early stopping
- **Configuration-driven behavior** for easy mode creation

## Architecture Components

### Core Files

```
modes/
├── base/
│   ├── GameEngine.js      # Core game logic and common systems
│   ├── GameMode.js        # Base class for mode implementations
│   ├── ModeConfig.js      # Configuration loading and management
│   └── ModeLoader.js      # Dynamic mode loading and initialization
├── configs/
│   ├── tgm1.json         # TGM1 mode configuration
│   ├── marathon.json     # Marathon mode configuration
│   ├── sprint_40.json    # Sprint 40L mode configuration
│   └── zen.json          # Zen mode configuration
├── modes/
│   └── TGM1Mode.js       # TGM1-specific implementation
└── IntegrationExample.js # Example integration with Phaser scenes
```

### Key Features

#### 1. GameEngine.js
- **Universal Tetris Logic**: Board, Piece, rotation systems (SRS/ARS)
- **Core Mechanics**: Line clearing, collision detection, piece movement
- **Rotation Systems**: Both SRS and ARS implementations
- **Audio Integration**: Sound effect and BGM management
- **Rendering**: Board and piece drawing with visual effects

#### 2. ModeConfig.js
- **Dynamic Timing**: Static values, level curves, function-based calculations
- **Gravity Systems**: Multiple gravity types (static, curve, function)
- **Audio Configuration**: BGM sections with automatic switching
- **Completion Logic**: Multiple completion types (lines, levels, scores, time)
- **Validation**: Configuration validation and error handling

#### 3. GameMode.js
- **Base Interface**: Common functionality for all modes
- **Update Loop**: Standardized game loop with mode-specific hooks
- **Input Handling**: Configurable input systems
- **State Management**: Game state tracking and UI integration
- **Extension Points**: Abstract methods for mode-specific behavior

#### 4. ModeLoader.js
- **Dynamic Loading**: On-demand mode loading and caching
- **Instance Management**: Mode instance lifecycle management
- **Memory Optimization**: Unloading unused modes
- **Error Handling**: Graceful fallback for missing implementations

## Configuration System

### Timing Configuration

```json
{
  "timing": {
    "das": { "type": "static", "value": 0.2666666667 },
    "arr": { "type": "static", "value": 0.0166666667 },
    "are": { "type": "static", "value": 0.5 },
    "lockDelay": {
      "type": "curve",
      "values": [
        { "level": 0, "value": 0.5 },
        { "level": 100, "value": 0.3 },
        { "level": 999, "value": 0.2 }
      ]
    }
  }
}
```

### Gravity Configuration

```json
{
  "gravity": {
    "type": "function",
    "formula": "this.getTGM1Gravity(level)"
  }
}
```

### BGM Configuration

```json
{
  "audio": {
    "bgm": {
      "sections": [
        {
          "name": "Stage 1",
          "startLevel": 0,
          "endLevel": 490,
          "track": "stage1"
        },
        {
          "name": "Stage 2",
          "startLevel": 500,
          "endLevel": 998,
          "track": "stage2"
        }
      ]
    }
  }
}
```

### Completion Configuration

```json
{
  "completion": {
    "type": "lines",
    "target": 40
  }
}
```

## Mode Implementation Example

### TGM1 Mode Implementation

The `TGM1Mode.js` demonstrates a complete mode implementation with:

- **TGM1 Gravity Curves**: Official internal gravity system
- **Section Stops**: Level progression with stop levels
- **GM Grading System**: Complete grade progression with time requirements
- **TGM1 Randomizer**: 4-piece history system
- **IRS (Initial Rotation System)**: ARE-based piece prerotation
- **Special Mechanics**: Level 999 completion, credits system

```javascript
class TGM1Mode extends GameMode {
    update(deltaTime) {
        // TGM1-specific update logic
        this.updateGravityTGM1(deltaTime);
        this.handleInputTGM1(deltaTime);
        this.checkGMConditions();
        // ... more TGM1 logic
    }
    
    updateGravityTGM1(deltaTime) {
        const internalGravity = this.config.getGravity(this.level);
        // TGM1 gravity implementation
    }
}
```

## Usage Examples

### Basic Mode Loading

```javascript
const modeLoader = new ModeLoader();

// Load a mode configuration
const modeConfig = await ModeConfig.loadConfig('tgm1.json');

// Create a mode instance
const gameMode = await modeLoader.createModeInstance('tgm1.json', gameScene);

// Update the mode each frame
gameMode.update(deltaTime);
```

### Dynamic Mode Switching

```javascript
// Preload multiple modes
const modeFiles = ['tgm1.json', 'marathon.json', 'sprint_40.json'];
await modeLoader.preloadModes(modeFiles);

// Switch between modes
const marathonMode = await modeLoader.createModeInstance('marathon.json', gameScene);

// Unload unused modes to free memory
modeLoader.unloadMode('tgm1.json');
```

### Configuration-Driven Behavior

```javascript
// Timing values automatically adapt to current level
const dasDelay = modeConfig.getDAS(currentLevel);
const gravity = modeConfig.getGravity(currentLevel);

// Audio automatically switches based on level
const currentTrack = modeConfig.getBGMTrackForLevel(level);
const shouldStop = modeConfig.shouldStopBGM(level);
```

## Supported Mode Types

### 1. Sprint Modes
- **Target**: Clear N lines as fast as possible
- **Gravity**: Usually high (20G)
- **Timing**: Fast DAS/ARE for quick gameplay
- **Example**: Sprint 40L, Sprint 100L

### 2. Marathon Modes
- **Target**: Clear fixed number of lines (usually 150)
- **Gravity**: Progressive difficulty increase
- **Features**: Hold system, larger next queue
- **Example**: Standard Tetris marathon

### 3. TGM-Style Modes
- **Target**: Reach level 999
- **Gravity**: Complex internal gravity curves
- **Features**: Section stops, GM grading, IRS
- **Example**: TGM1, TGM2, TGM3

### 4. Zen/Endless Modes
- **Target**: No completion (endless play)
- **Gravity**: Gentle, relaxing pace
- **Features**: Extended lock delays, calm gameplay
- **Example**: Zen mode, chill mode

### 5. Time Attack Modes
- **Target**: Score as many points as possible in time limit
- **Features**: Timer-based gameplay
- **Example**: 2-minute attack, 5-minute challenge

## Benefits

### For Developers

1. **Maintainability**: Clear separation between engine and mode logic
2. **Scalability**: Easy to add new modes through configuration
3. **Reusability**: Core engine works across all modes
4. **Testing**: Modes can be developed and tested independently
5. **Performance**: Only load required mode code

### For Players

1. **Variety**: Multiple gameplay styles in one game
2. **Progression**: Different challenges and skill requirements
3. **Familiarity**: Standard Tetris conventions maintained
4. **Innovation**: Unique modes with special mechanics

## Integration with Existing Game

### Step 1: Replace GameScene

```javascript
// Old GameScene
class GameScene extends Phaser.Scene {
    update() {
        // Direct game logic
    }
}

// New GameSceneWithModes
class GameSceneWithModes extends Phaser.Scene {
    async create() {
        this.currentMode = await this.modeLoader.createModeInstance(
            this.selectedModeConfig, this
        );
    }
    
    update() {
        this.currentMode.update(deltaTime);
        // UI and rendering handled by base classes
    }
}
```

### Step 2: Update Menu System

```javascript
class MenuSceneWithModes extends Phaser.Scene {
    async create() {
        const availableModes = this.modeLoader.getAvailableModes();
        
        // Create dynamic mode buttons
        for (const modeFile of availableModes) {
            const modeInfo = await this.modeLoader.getModeInfo(modeFile);
            this.createModeButton(modeInfo, modeFile);
        }
    }
}
```

### Step 3: Migrate Existing Logic

1. **Extract Core Logic**: Move universal mechanics to GameEngine.js
2. **Create Mode Configurations**: Define existing modes in JSON
3. **Implement Mode-Specific Logic**: Create mode classes for unique behaviors
4. **Update UI**: Adapt UI to work with configuration system

## Future Enhancements

### Potential Additions

1. **Online Mode Support**: Share custom modes, leaderboards
2. **Mode Editor**: Visual configuration tool for creating new modes
3. **Mod Support**: Community-created modes and modifications
4. **Tournament Mode**: Special mode for competitive play
5. **Adaptive Difficulty**: AI-driven difficulty adjustment

### Special Mechanics Framework

The architecture supports easy addition of unique mechanics:

```javascript
class CustomMode extends GameMode {
    initializeMode() {
        super.initializeMode();
        this.setupSpecialMechanic();
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.updateSpecialMechanic(deltaTime);
    }
    
    setupSpecialMechanic() {
        // Initialize special mechanics
        this.frozenPieces = [];
        this.globalTimer = 300; // 5 minutes
    }
}
```

## Conclusion

This multi-mode architecture provides a robust foundation for implementing diverse Tetris experiences while maintaining code quality, performance, and maintainability. The configuration-driven approach allows for rapid iteration and experimentation with different gameplay concepts while the modular design ensures long-term scalability.

The system successfully addresses the challenges of:
- Managing complex timing variations across modes
- Supporting both simple configuration and complex custom mechanics
- Maintaining performance with dynamic loading
- Providing a consistent player experience across different modes
- Enabling easy addition of new modes without affecting existing ones