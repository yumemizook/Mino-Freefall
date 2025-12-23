// ModeConfig.js - Configuration loading and management system
// Handles JSON-based mode configurations with dynamic timing calculations

class ModeConfig {
    constructor(configData) {
        this.config = configData;
        this.validateConfig();
    }

    static async loadConfig(configFileName) {
        try {
            // In a real implementation, this would fetch the JSON file
            // For now, we'll use a mock implementation that returns built-in configs
            return await this.loadBuiltInConfig(configFileName);
        } catch (error) {
            console.error(`Failed to load config ${configFileName}:`, error);
            throw new Error(`Configuration file not found: ${configFileName}`);
        }
    }

    static async loadBuiltInConfig(configFileName) {
        // Built-in configurations - in a real implementation, these would be loaded from files
        const builtInConfigs = {
            'tgm1.json': {
                id: 'tgm1',
                name: 'Tetris Grand Master',
                description: 'Classic TGM1 experience with section stops and GM grading',
                timing: {
                    das: { type: 'static', value: 16/60 },
                    arr: { type: 'static', value: 1/60 },
                    are: { type: 'static', value: 30/60 },
                    lockDelay: { type: 'static', value: 0.5 }
                },
                pieces: {
                    nextCount: 1,
                    holdEnabled: false,
                    randomizer: 'tgm1'
                },
                gravity: {
                    type: 'function',
                    formula: 'this.getTGM1Gravity(level)'
                },
                scoring: {
                    type: 'tgm1',
                    gradeSystem: true
                },
                completion: {
                    type: 'level',
                    target: 999
                },
                rules: {
                    sectionStop: true,
                    levelCap: 999
                },
                audio: {
                    enabled: true,
                    bgm: {
                        sections: [
                            {
                                name: 'Stage 1',
                                startLevel: 0,
                                endLevel: 490,
                                track: 'stage1'
                            },
                            {
                                name: 'Stage 2',
                                startLevel: 500,
                                endLevel: 998,
                                track: 'stage2'
                            },
                            {
                                name: 'Final',
                                startLevel: 999,
                                endLevel: 999,
                                track: 'credits'
                            }
                        ],
                        volume: 0.5
                    },
                    sfx: {
                        enabled: true,
                        volume: 0.7
                    }
                }
            },
            'marathon.json': {
                id: 'marathon',
                name: 'Marathon',
                description: 'Standard marathon mode with progressive difficulty',
                timing: {
                    das: { type: 'static', value: 16/60 },
                    arr: { type: 'static', value: 1/60 },
                    are: { type: 'static', value: 30/60 },
                    lockDelay: { type: 'static', value: 0.5 }
                },
                pieces: {
                    nextCount: 5,
                    holdEnabled: true,
                    randomizer: '7bag'
                },
                gravity: {
                    type: 'curve',
                    values: [
                        { level: 0, value: 4 },
                        { level: 100, value: 256 },
                        { level: 200, value: 512 },
                        { level: 300, value: 1024 },
                        { level: 999, value: 5120 }
                    ]
                },
                scoring: {
                    type: 'standard',
                    gradeSystem: false
                },
                completion: {
                    type: 'lines',
                    target: 150
                },
                rules: {
                    sectionStop: false,
                    levelCap: 999
                },
                audio: {
                    enabled: true,
                    bgm: {
                        sections: [
                            {
                                name: 'Marathon Theme',
                                startLevel: 0,
                                endLevel: 999,
                                track: 'stage1'
                            }
                        ],
                        volume: 0.5
                    },
                    sfx: {
                        enabled: true,
                        volume: 0.7
                    }
                }
            },
            'sprint_40.json': {
                id: 'sprint_40',
                name: 'Sprint 40 Lines',
                description: 'Clear 40 lines as fast as possible',
                timing: {
                    das: { type: 'static', value: 10/60 },
                    arr: { type: 'static', value: 1/60 },
                    are: { type: 'static', value: 20/60 },
                    lockDelay: { type: 'static', value: 0.3 }
                },
                pieces: {
                    nextCount: 5,
                    holdEnabled: true,
                    randomizer: '7bag'
                },
                gravity: {
                    type: 'static',
                    value: 5120 // 20G
                },
                scoring: {
                    type: 'standard',
                    gradeSystem: false
                },
                completion: {
                    type: 'lines',
                    target: 40
                },
                rules: {
                    sectionStop: false,
                    levelCap: 99
                },
                audio: {
                    enabled: false,
                    sfx: {
                        enabled: true,
                        volume: 0.7
                    }
                }
            },
            'zen.json': {
                id: 'zen',
                name: 'Zen Mode',
                description: 'Relaxing endless mode with longer lock delays',
                timing: {
                    das: { type: 'static', value: 12/60 },
                    arr: { type: 'static', value: 2/60 },
                    are: { type: 'static', value: 20/60 },
                    lockDelay: { type: 'static', value: 2.0 }
                },
                pieces: {
                    nextCount: 5,
                    holdEnabled: true,
                    randomizer: '7bag'
                },
                gravity: {
                    type: 'static',
                    value: 128 // Gentle gravity
                },
                scoring: {
                    type: 'zen',
                    gradeSystem: false
                },
                completion: {
                    type: 'none',
                    target: null
                },
                rules: {
                    sectionStop: false,
                    levelCap: null
                },
                audio: {
                    enabled: true,
                    bgm: {
                        sections: [
                            {
                                name: 'Zen Theme',
                                startLevel: 0,
                                endLevel: 999,
                                track: 'stage1'
                            }
                        ],
                        volume: 0.3
                    },
                    sfx: {
                        enabled: true,
                        volume: 0.5
                    }
                }
            },
            '20g.json': {
                id: '20g',
                name: '20G',
                description: 'Maximum gravity from the start! Good luck!',
                timing: {
                    das: { type: 'static', value: 8/60 }, // Faster DAS for 20G
                    arr: { type: 'static', value: 1/60 },
                    are: { type: 'static', value: 0.5 },
                    lockDelay: { type: 'static', value: 0.5 }
                },
                pieces: {
                    nextCount: 1,
                    holdEnabled: false,
                    randomizer: 'tgm1'
                },
                gravity: {
                    type: 'static',
                    value: 5120 // 20G (20 rows per frame)
                },
                scoring: {
                    type: 'tgm1',
                    gradeSystem: true
                },
                completion: {
                    type: 'level',
                    target: 999
                },
                rules: {
                    sectionStop: true,
                    levelCap: 999
                },
                audio: {
                    enabled: true,
                    bgm: {
                        sections: [
                            {
                                name: 'Stage 1',
                                startLevel: 0,
                                endLevel: 490,
                                track: 'stage1'
                            },
                            {
                                name: 'Stage 2',
                                startLevel: 500,
                                endLevel: 998,
                                track: 'stage2'
                            },
                            {
                                name: 'Final',
                                startLevel: 999,
                                endLevel: 999,
                                track: 'credits'
                            }
                        ],
                        volume: 0.5
                    },
                    sfx: {
                        enabled: true,
                        volume: 0.7
                    }
                }
            }
        };

        return new ModeConfig(builtInConfigs[configFileName]);
    }

    validateConfig() {
        const required = ['id', 'name', 'timing', 'pieces', 'gravity', 'scoring', 'completion'];
        for (const field of required) {
            if (!this.config[field]) {
                throw new Error(`Missing required field in mode config: ${field}`);
            }
        }
    }

    // Timing getters with dynamic calculation support
    getDAS(currentLevel = 0) {
        return this.calculateTimingValue(this.config.timing.das, currentLevel);
    }

    getARR(currentLevel = 0) {
        return this.calculateTimingValue(this.config.timing.arr, currentLevel);
    }

    getARE(currentLevel = 0) {
        return this.calculateTimingValue(this.config.timing.are, currentLevel);
    }

    getLockDelay(currentLevel = 0) {
        return this.calculateTimingValue(this.config.timing.lockDelay, currentLevel);
    }

    calculateTimingValue(timingConfig, currentLevel) {
        if (!timingConfig) return 0;

        switch (timingConfig.type) {
            case 'static':
                return timingConfig.value;
            
            case 'curve':
                return this.interpolateCurve(timingConfig.values, currentLevel);
            
            case 'function':
                return this.evaluateFunction(timingConfig.formula, currentLevel);
            
            default:
                console.warn(`Unknown timing type: ${timingConfig.type}`);
                return timingConfig.value || 0;
        }
    }

    interpolateCurve(values, currentLevel) {
        if (!values || values.length === 0) return 0;
        if (values.length === 1) return values[0].value;

        // Find the two points to interpolate between
        let lower = values[0];
        let upper = values[values.length - 1];

        for (let i = 0; i < values.length - 1; i++) {
            if (currentLevel >= values[i].level && currentLevel <= values[i + 1].level) {
                lower = values[i];
                upper = values[i + 1];
                break;
            }
        }

        // Linear interpolation
        if (currentLevel <= lower.level) return lower.value;
        if (currentLevel >= upper.level) return upper.value;

        const ratio = (currentLevel - lower.level) / (upper.level - lower.level);
        return lower.value + (upper.value - lower.value) * ratio;
    }

    evaluateFunction(formula, currentLevel) {
        try {
            // Create a safe evaluation context
            const context = { level: currentLevel, Math: Math };
            
            // Simple function evaluation - in production, use a proper expression parser
            // For now, we'll handle some common patterns
            if (formula.includes('getTGM1Gravity')) {
                return this.getTGM1Gravity(currentLevel);
            }
            
            // Fallback: try to evaluate simple expressions
            const processedFormula = formula.replace(/level/g, currentLevel.toString());
            return eval(processedFormula);
        } catch (error) {
            console.error('Error evaluating timing function:', error);
            return 0;
        }
    }

    // Gravity calculation methods
    getTGM1Gravity(level) {
        // Official TGM1 Internal Gravity system
        let internalGravity;

        if (level < 30) internalGravity = 4; 
        else if (level < 35) internalGravity = 6;
        else if (level < 40) internalGravity = 8;
        else if (level < 50) internalGravity = 10;
        else if (level < 60) internalGravity = 12;
        else if (level < 70) internalGravity = 16;
        else if (level < 80) internalGravity = 32;
        else if (level < 90) internalGravity = 48;
        else if (level < 100) internalGravity = 64;
        else if (level < 120) internalGravity = 80;
        else if (level < 140) internalGravity = 96;
        else if (level < 160) internalGravity = 112;
        else if (level < 170) internalGravity = 128;
        else if (level < 200) internalGravity = 144;
        else if (level < 220) internalGravity = 4;
        else if (level < 230) internalGravity = 32;
        else if (level < 233) internalGravity = 64;
        else if (level < 236) internalGravity = 96;
        else if (level < 239) internalGravity = 128;
        else if (level < 243) internalGravity = 160;
        else if (level < 247) internalGravity = 192;
        else if (level < 251) internalGravity = 224;
        else if (level < 300) internalGravity = 256; // 1G
        else if (level < 330) internalGravity = 512; // 2G
        else if (level < 360) internalGravity = 768; // 3G
        else if (level < 400) internalGravity = 1024; // 4G
        else if (level < 420) internalGravity = 1280; // 5G
        else if (level < 450) internalGravity = 1024; // 4G
        else if (level < 500) internalGravity = 768; // 3G
        else internalGravity = 5120; // 20G

        return internalGravity;
    }

    getGravity(currentLevel = 0) {
        if (!this.config.gravity) return 256; // Default 1G

        switch (this.config.gravity.type) {
            case 'static':
                return this.config.gravity.value;
            
            case 'curve':
                return this.interpolateCurve(this.config.gravity.values, currentLevel);
            
            case 'function':
                return this.evaluateFunction(this.config.gravity.formula, currentLevel);
            
            default:
                console.warn(`Unknown gravity type: ${this.config.gravity.type}`);
                return this.config.gravity.value || 256;
        }
    }

    // Piece system getters
    getNextCount() {
        return this.config.pieces.nextCount || 1;
    }

    isHoldEnabled() {
        return this.config.pieces.holdEnabled || false;
    }

    getRandomizer() {
        return this.config.pieces.randomizer || '7bag';
    }

    // Audio system getters
    isAudioEnabled() {
        return this.config.audio?.enabled !== false;
    }

    getBGMVolume() {
        return this.config.audio?.bgm?.volume || 0.5;
    }

    getSFXVolume() {
        return this.config.audio?.sfx?.volume || 0.7;
    }

    getBGMTrackForLevel(level) {
        if (!this.config.audio?.bgm?.sections) return null;

        for (const section of this.config.audio.bgm.sections) {
            if (level >= section.startLevel && level <= section.endLevel) {
                return section.track;
            }
        }

        return this.config.audio.bm.sections[0]?.track || null;
    }

    shouldStopBGM(level) {
        if (!this.config.audio?.bgm?.sections) return false;

        // Check if we're in the last section
        const lastSection = this.config.audio.bgm.sections[this.config.audio.bgm.sections.length - 1];
        if (level >= lastSection.startLevel) {
            return false; // Never stop BGM in the final section
        }

        // Check if we're 10 levels before the end of a section
        for (let i = 0; i < this.config.audio.bgm.sections.length - 1; i++) {
            const section = this.config.audio.bgm.sections[i];
            if (level >= section.startLevel && level <= section.endLevel) {
                return (level >= section.endLevel - 10);
            }
        }

        return false;
    }

    // Completion condition getters
    getCompletionType() {
        return this.config.completion.type;
    }

    getCompletionTarget() {
        return this.config.completion.target;
    }

    // Rules getters
    hasSectionStop() {
        return this.config.rules?.sectionStop || false;
    }

    getLevelCap() {
        return this.config.rules?.levelCap;
    }

    // Utility getters
    getId() {
        return this.config.id;
    }

    getName() {
        return this.config.name;
    }

    getDescription() {
        return this.config.description;
    }

    getScoringType() {
        return this.config.scoring.type;
    }

    hasGradeSystem() {
        return this.config.scoring.gradeSystem || false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModeConfig;
}