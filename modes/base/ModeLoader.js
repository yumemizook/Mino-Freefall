// ModeLoader.js - Dynamic mode loading and initialization
// Handles loading and initializing game modes based on configuration

const { ModeConfig } = require('./ModeConfig.js');

class ModeLoader {
    constructor() {
        this.loadedModes = new Map();
        this.modeInstances = new Map();
    }

    async loadMode(configFileName) {
        try {
            // Check if mode is already loaded
            if (this.loadedModes.has(configFileName)) {
                return this.loadedModes.get(configFileName);
            }

            // Load configuration
            const modeConfig = await ModeConfig.loadConfig(configFileName);
            
            // Load the mode implementation based on config
            const modeImplementation = await this.loadModeImplementation(modeConfig);
            
            // Cache the loaded mode
            this.loadedModes.set(configFileName, {
                config: modeConfig,
                implementation: modeImplementation
            });

            return this.loadedModes.get(configFileName);
        } catch (error) {
            console.error(`Failed to load mode ${configFileName}:`, error);
            throw new Error(`Mode loading failed: ${configFileName}`);
        }
    }

    async loadModeImplementation(modeConfig) {
        const modeId = modeConfig.getId();
        
        // Built-in mode implementations - in a real implementation, these would be dynamically imported
        const builtInModes = {
            'tgm1': () => require('../modes/TGM1Mode.js'),
            'tgm2': () => require('../modes/TGM2Mode.js'),
            'tgm3': () => require('../modes/TGM3Mode.js'),
            '20g': () => require('../modes/20GMode.js'),
            'marathon': () => require('../modes/MarathonMode.js'),
            'sprint_40': () => require('../modes/SprintMode.js'),
            'zen': () => require('../modes/ZenMode.js')
        };

        if (builtInModes[modeId]) {
            try {
                const modeModule = builtInModes[modeId]();
                return modeModule.default || modeModule;
            } catch (error) {
                console.warn(`Could not load mode implementation for ${modeId}, using base mode:`, error);
                return require('./GameMode.js').default;
            }
        }

        // Fallback to base mode
        console.warn(`Unknown mode ID: ${modeId}, using base GameMode`);
        return require('./GameMode.js').default;
    }

    async createModeInstance(configFileName, gameScene) {
        try {
            const modeData = await this.loadMode(configFileName);
            const { config, implementation: ModeClass } = modeData;

            // Check if instance already exists for this scene
            const instanceKey = `${configFileName}_${gameScene.scene.key}`;
            if (this.modeInstances.has(instanceKey)) {
                return this.modeInstances.get(instanceKey);
            }

            // Create new instance
            const modeInstance = new ModeClass(config, gameScene);
            
            // Cache the instance
            this.modeInstances.set(instanceKey, modeInstance);

            return modeInstance;
        } catch (error) {
            console.error(`Failed to create mode instance for ${configFileName}:`, error);
            throw new Error(`Mode instance creation failed: ${configFileName}`);
        }
    }

    // Get list of available modes
    getAvailableModes() {
        return [
            'tgm1.json',
            'tgm2.json',
            'tgm3.json',
            '20g.json',
            'marathon.json', 
            'sprint_40.json',
            'zen.json'
        ];
    }

    // Get mode information without loading the full implementation
    async getModeInfo(configFileName) {
        try {
            const modeConfig = await ModeConfig.loadConfig(configFileName);
            return {
                id: modeConfig.getId(),
                name: modeConfig.getName(),
                description: modeConfig.getDescription(),
                completionType: modeConfig.getCompletionType(),
                completionTarget: modeConfig.getCompletionTarget(),
                hasHold: modeConfig.isHoldEnabled(),
                nextCount: modeConfig.getNextCount(),
                hasGradeSystem: modeConfig.hasGradeSystem()
            };
        } catch (error) {
            console.error(`Failed to get mode info for ${configFileName}:`, error);
            return null;
        }
    }

    // Preload multiple modes for faster switching
    async preloadModes(configFileNames) {
        const promises = configFileNames.map(async (fileName) => {
            try {
                await this.loadMode(fileName);
                console.log(`Preloaded mode: ${fileName}`);
            } catch (error) {
                console.warn(`Failed to preload mode ${fileName}:`, error);
            }
        });

        await Promise.all(promises);
        console.log(`Completed preloading ${promises.length} modes`);
    }

    // Unload mode from cache to free memory
    unloadMode(configFileName) {
        if (this.loadedModes.has(configFileName)) {
            this.loadedModes.delete(configFileName);
            console.log(`Unloaded mode: ${configFileName}`);
        }

        // Clean up instances
        const keysToRemove = [];
        for (const [key, instance] of this.modeInstances) {
            if (key.startsWith(configFileName + '_')) {
                // Call cleanup if available
                if (instance.cleanup) {
                    instance.cleanup();
                }
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => this.modeInstances.delete(key));
    }

    // Get memory usage statistics
    getMemoryStats() {
        return {
            loadedModes: this.loadedModes.size,
            activeInstances: this.modeInstances.size,
            modeNames: Array.from(this.loadedModes.keys()),
            instanceKeys: Array.from(this.modeInstances.keys())
        };
    }

    // Validate mode configuration
    async validateMode(configFileName) {
        try {
            const modeConfig = await ModeConfig.loadConfig(configFileName);
            const modeData = await this.loadModeImplementation(modeConfig);
            
            return {
                valid: true,
                config: {
                    id: modeConfig.getId(),
                    name: modeConfig.getName(),
                    hasRequiredFields: true
                },
                implementation: {
                    available: !!modeData,
                    hasRequiredMethods: this.validateModeImplementation(modeData)
                }
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message
            };
        }
    }

    validateModeImplementation(ModeClass) {
        if (!ModeClass) return false;

        const requiredMethods = ['constructor', 'initialize', 'update', 'cleanup'];
        const missingMethods = requiredMethods.filter(method => 
            typeof ModeClass.prototype[method] !== 'function'
        );

        return missingMethods.length === 0;
    }

    // Get best score for a mode
    getBestScore(modeId) {
        const key = `bestScore_${modeId}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        return { score: 0, level: 0, grade: '9', time: '0:00.00' };
    }

    // Save best score for a mode
    saveBestScore(modeId, scoreData) {
        const key = `bestScore_${modeId}`;
        const currentBest = this.getBestScore(modeId);
        
        // Update if better score, or same score but higher level, or same level but better grade
        if (scoreData.score > currentBest.score ||
            (scoreData.score === currentBest.score && scoreData.level > currentBest.level) ||
            (scoreData.score === currentBest.score && scoreData.level === currentBest.level && 
             this.getGradeValue(scoreData.grade) > this.getGradeValue(currentBest.grade))) {
            localStorage.setItem(key, JSON.stringify(scoreData));
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

    // Clean up all loaded modes
    cleanup() {
        this.loadedModes.clear();
        
        for (const [key, instance] of this.modeInstances) {
            if (instance.cleanup) {
                instance.cleanup();
            }
        }
        this.modeInstances.clear();
        
        console.log('ModeLoader cleanup completed');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModeLoader;
}