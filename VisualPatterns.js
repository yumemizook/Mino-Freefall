/**
 * Visual Pattern Database for Konoha All Clear
 * Based on pattern images from Pattern Images directory
 * Comprehensive collection of setups and solutions
 */

const VisualPatterns = {
    // 2x4 Box Patterns
    "2x4_box": {
        "build_II": {
            name: "2x4 Box - Build II",
            description: "Build 2x4 box with I pieces",
            category: "build",
            pieces: ["I", "I"],
            board: [
                ['I','I','I','I',0],
                ['I','I','I','I',0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "I", x: 0, y: 1, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Build II.png"
        },
        "build_JJ": {
            name: "2x4 Box - Build JJ",
            description: "Build 2x4 box with J pieces",
            category: "build",
            pieces: ["J", "J"],
            board: [
                ['J','J','J',0,0],
                [0,'J',0,0,0],
                ['J','J','J',0,0],
                [0,'J',0,0,0]
            ],
            solution: { piece: "J", x: 0, y: 0, rotation: 1 },
            alternatives: [
                { piece: "J", x: 1, y: 0, rotation: 1 }
            ],
            image: "Pattern Images/2x4 Box/Build JJ.png"
        },
        "build_LL": {
            name: "2x4 Box - Build LL",
            description: "Build 2x4 box with L pieces",
            category: "build",
            pieces: ["L", "L"],
            board: [
                [0,'L',0,0,0],
                ['L','L','L',0,0],
                [0,'L',0,0,0],
                ['L','L','L',0,0]
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 1, y: 0, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Build LL.png"
        },
        "build_OO": {
            name: "2x4 Box - Build OO",
            description: "Build 2x4 box with O pieces",
            category: "build",
            pieces: ["O", "O"],
            board: [
                ['O','O',0,0,0],
                ['O','O',0,0,0],
                ['O','O',0,0,0],
                ['O','O',0,0,0]
            ],
            solution: { piece: "O", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 0, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Build OO.png"
        },
        "solve_LLT": {
            name: "2x4 Box - Solve LLT",
            description: "Solve 2x4 box with L, L, T",
            category: "solve",
            pieces: ["L", "L", "T"],
            board: [
                [0,'L',0,0,'L'],
                ['L','L','L','L','L'],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ],
            image: "Pattern Images/2x4 Box/Solve LLT.png"
        },
        "solve_LTL": {
            name: "2x4 Box - Solve LTL",
            description: "Solve 2x4 box with L, T, L",
            category: "solve",
            pieces: ["L", "T", "L"],
            board: [
                [0,'L',0,'L',0],
                ['L','L','L','L','L'],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ],
            image: "Pattern Images/2x4 Box/Solve LTL.png"
        },
        "solve_LTT": {
            name: "2x4 Box - Solve LTT",
            description: "Solve 2x4 box with L, T, T",
            category: "solve",
            pieces: ["L", "T", "T"],
            board: [
                [0,'L',0,'T',0],
                ['L','L','L','T','T'],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 2, y: 2, rotation: 1 }
            ],
            image: "Pattern Images/2x4 Box/Solve LTT.png"
        },
        "solve_OJL": {
            name: "2x4 Box - Solve OJL",
            description: "Solve 2x4 box with O, J, L",
            category: "solve",
            pieces: ["O", "J", "L"],
            board: [
                ['O','O','J',0,0],
                ['O','O','J','J','J'],
                [0,0,0,'L',0],
                [0,0,'L','L','L']
            ],
            solution: { piece: "J", x: 2, y: 2, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 2, y: 2, rotation: 2 }
            ],
            image: "Pattern Images/2x4 Box/Solve OJL.png"
        },
        "solve_OLJ": {
            name: "2x4 Box - Solve OLJ",
            description: "Solve 2x4 box with O, L, J",
            category: "solve",
            pieces: ["O", "L", "J"],
            board: [
                [0,0,'L','J','J'],
                [0,'O','L','L','J'],
                [0,'O',0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Solve OLJ.png"
        },
        "solve_TLJ": {
            name: "2x4 Box - Solve TLJ",
            description: "Solve 2x4 box with T, L, J",
            category: "solve",
            pieces: ["T", "L", "J"],
            board: [
                [0,'T',0,'J','J'],
                ['L','T','T','T','J'],
                ['L',0,0,0,0],
                ['L','L',0,0,0]
            ],
            solution: { piece: "L", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Solve TLJ.png"
        },
        "solve_TLT": {
            name: "2x4 Box - Solve TLT",
            description: "Solve 2x4 box with T, L, T",
            category: "solve",
            pieces: ["T", "L", "T"],
            board: [
                [0,'T',0,'T',0],
                ['L','T','T','T','T'],
                ['L',0,0,0,0],
                ['L','L',0,0,0]
            ],
            solution: { piece: "L", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "T", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 2, y: 2, rotation: 1 }
            ],
            image: "Pattern Images/2x4 Box/Solve TLT.png"
        },
        "solve_TTL": {
            name: "2x4 Box - Solve TTL",
            description: "Solve 2x4 box with T, T, L",
            category: "solve",
            pieces: ["T", "T", "L"],
            board: [
                [0,0,'T',0,'L'],
                ['T','T','T','L','L'],
                [0,0,0,0,'L'],
                [0,0,0,0,0]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "T", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/2x4 Box/Solve TTL.png"
        }
    },

    // 3x4 Box Patterns
    "3x4_box": {
        "build_LJO": {
            name: "3x4 Box - Build LJO",
            description: "Build 3x4 box with L, J, O",
            category: "build",
            pieces: ["L", "J", "O"],
            board: [
                [0,'L',0,'J',0],
                ['L','L','L','J','J'],
                [0,'O','O',0,'J'],
                [0,'O','O',0,0]
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 2, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Build LJO.png"
        },
        "build_LLO1": {
            name: "3x4 Box - Build LLO1",
            description: "Build 3x4 box with L, L, O",
            category: "build",
            pieces: ["L", "L", "O"],
            board: [
                [0,'L',0,'L',0],
                ['L','L','L','L','L'],
                [0,'O','O',0,0],
                [0,'O','O',0,0]
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 1, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Build LLO1.png"
        },
        "build_LLO2": {
            name: "3x4 Box - Build LLO2",
            description: "Build 3x4 box with L, L, O (variant)",
            category: "build",
            pieces: ["L", "L", "O"],
            board: [
                [0,'L',0,'L',0],
                ['L','L','L','L','L'],
                [0,'O','O',0,0],
                [0,'O','O',0,0]
            ],
            solution: { piece: "L", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Build LLO2.png"
        },
        "build_TTL1": {
            name: "3x4 Box - Build TTL1",
            description: "Build 3x4 box with T, T, L",
            category: "build",
            pieces: ["T", "T", "L"],
            board: [
                [0,'T',0,'T',0],
                ['T','T','T','T','T'],
                [0,'L',0,0,0],
                ['L','L','L',0,0]
            ],
            solution: { piece: "T", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 0, rotation: 0 },
                { piece: "L", x: 2, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Build TTL1.png"
        },
        "build_TTL2": {
            name: "3x4 Bag - Build TTL2",
            description: "Build 3x4 box with T, T, L (variant)",
            category: "build",
            pieces: ["T", "T", "L"],
            board: [
                [0,'T',0,'T',0],
                ['T','T','T','T','T'],
                [0,'L',0,0,0],
                ['L','L','L',0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 0, y: 0, rotation: 0 },
                { piece: "L", x: 2, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Build TTL2.png"
        },
        "solve_stand_LJT": {
            name: "3x4 Box - Solve Stand LJT",
            description: "Solve 3x4 box with standing L, J, T",
            category: "solve",
            pieces: ["L", "J", "T"],
            board: [
                [0,'L',0,'J',0],
                ['L','L','T','J','J'],
                [0,'L',0,'T','J'],
                [0,0,'T','T',0]
            ],
            solution: { piece: "J", x: 2, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 1 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/3x4 Box/Solve Stand LJT.png"
        }
    },

    // Full Bag Patterns
    "full_bag": {
        "early_IO": {
            name: "Full Bag - Early IO",
            description: "Early All Clear with I, O pieces",
            category: "early",
            pieces: ["I", "O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Full Bag/Early IO.png"
        },
        "early_IOT": {
            name: "Full Bag - Early IOT",
            description: "Early All Clear with I, O, T pieces",
            category: "early",
            pieces: ["I", "O", "T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 },
                { piece: "T", x: 1, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/Full Bag/Early IOT.png"
        },
        "early_J": {
            name: "Full Bag - Early J",
            description: "Early All Clear with J piece",
            category: "early",
            pieces: ["J"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "J", x: 1, y: 0, rotation: 0 },
            alternatives: [],
            image: "Pattern Images/Full Bag/Early J.png"
        },
        "early_TO": {
            name: "Full Bag - Early TO",
            description: "Early All Clear with T, O pieces",
            category: "early",
            pieces: ["T", "O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Full Bag/Early TO.png"
        },
        "ILJ": {
            name: "Full Bag - ILJ",
            description: "All Clear with I, L, J pieces",
            category: "standard",
            pieces: ["I", "L", "J"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 1 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Full Bag/ILJ.png"
        }
    },

    // PCO Patterns
    "pco": {
        "build_IOT": {
            name: "PCO - Build IOT",
            description: "Build with I, O, T pieces",
            category: "build",
            pieces: ["I", "O", "T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 3, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/PCO/Build IOT.png"
        },
        "build_JJT": {
            name: "PCO - Build JJT",
            description: "Build with J, J, T pieces",
            category: "build",
            pieces: ["J", "J", "T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            solution: { piece: "J", x: 0, y: 0, rotation: 1 },
            alternatives: [
                { piece: "J", x: 1, y: 0, rotation: 1 },
                { piece: "T", x: 2, y: 3, rotation: 0 }
            ],
            image: "Pattern Images/PCO/Build JJT.png"
        },
        "solve_I": {
            name: "PCO - Solve I",
            description: "Solve with I piece",
            category: "solve",
            pieces: ["I"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [],
            image: "Pattern Images/PCO/Solve I.png"
        },
        "solve_O": {
            name: "PCO - Solve O",
            description: "Solve with O piece",
            category: "solve",
            pieces: ["O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "O", x: 1, y: 0, rotation: 0 },
            alternatives: [],
            image: "Pattern Images/PCO/Solve O.png"
        },
        "solve_T": {
            name: "PCO - Solve T",
            description: "Solve with T piece",
            category: "solve",
            pieces: ["T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [],
            image: "Pattern Images/PCO/Solve T.png"
        }
    },

    // TT Patterns
    "tt": {
        "build": {
            name: "TT - Build",
            description: "Build with T, T pieces",
            category: "build",
            pieces: ["T", "T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 0, rotation: 0 }
            ],
            image: "Pattern Images/TT/Build.png"
        },
        "solve_IJO": {
            name: "TT - Solve IJO",
            description: "Solve with I, J, O pieces",
            category: "solve",
            pieces: ["I", "J", "O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,0,1,0,0],
                [1,0,1,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 2, y: 2, rotation: 0 },
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/TT/Solve IJO.png"
        },
        "solve_ILO": {
            name: "TT - Solve ILO",
            description: "Solve with I, L, O pieces",
            category: "solve",
            pieces: ["I", "L", "O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,0,0,1,0],
                [1,0,0,1,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 2, y: 2, rotation: 2 },
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/TT/Solve ILO.png"
        },
        "solve_ILT": {
            name: "TT - Solve ILT",
            description: "Solve with I, L, T pieces",
            category: "solve",
            pieces: ["I", "L", "T"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,0,1,0,0],
                [1,0,1,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 2, y: 2, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/TT/Solve ILT.png"
        }
    },

    // Recovery Patterns
    "recovery": {
        "recover_1": {
            name: "Recovery - Pattern 1",
            description: "Recovery pattern from difficult board state",
            category: "recovery",
            pieces: ["T", "L", "J"],
            board: [
                [1,0,1,0,0],
                [1,1,1,1,1],
                [1,0,0,1,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 },
                { piece: "J", x: 3, y: 0, rotation: 0 }
            ],
            image: "Pattern Images/Recover/1.png"
        },
        "recover_2": {
            name: "Recovery - Pattern 2",
            description: "Alternative recovery pattern",
            category: "recovery",
            pieces: ["I", "O", "T"],
            board: [
                [1,1,0,0,0],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 2, y: 1, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Recover/2.png"
        }
    },

    // TL Misc Patterns
    "tl_misc": {
        "build": {
            name: "TL Misc - Build",
            description: "TL miscellaneous build pattern",
            category: "build",
            pieces: ["T", "L"],
            board: [
                [1,1,0,0,0],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 }
            ],
            image: "Pattern Images/Misc/TL/Build.png"
        },
        "solve_OJJ": {
            name: "TL Misc - Solve OJJ",
            description: "TL miscellaneous solve with O, J, J",
            category: "solve",
            pieces: ["O", "J", "J"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,1,1],
                [0,0,0,1,1]
            ],
            solution: { piece: "J", x: 2, y: 2, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Misc/TL/Solve OJJ.png"
        },
        "solve_OLJ": {
            name: "TL Misc - Solve OLJ",
            description: "TL miscellaneous solve with O, L, J",
            category: "solve",
            pieces: ["O", "L", "J"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,1,1],
                [0,0,0,1,1]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ],
            image: "Pattern Images/Misc/TL/Solve OLJ.png"
        },
        "solve_OLL": {
            name: "TL Misc - Solve OLL",
            description: "TL miscellaneous solve with O, L, L",
            category: "solve",
            pieces: ["O", "L", "L"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,1,1],
                [0,0,0,1,1]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ],
            image: "Pattern Images/Misc/TL/Solve OLL.png"
        }
    }
};

// Helper functions for pattern matching
const PatternMatcher = {
    /**
     * Find all patterns that match available pieces
     */
    findMatchingPatterns(board, availablePieces, currentPiece = null) {
        const matches = [];

        // Helper to check for board match
        const boardsMatch = (b1, b2) => {
            if (!b1 || !b2 || b1.length !== b2.length) return false;
            for (let i = 0; i < b1.length; i++) {
                if (b1[i].length !== b2[i].length) return false;
                for (let j = 0; j < b1[i].length; j++) {
                    const cell1 = b1[i][j] !== 0 && b1[i][j] !== '0';
                    const cell2 = b2[i][j] !== 0 && b2[i][j] !== '0';
                    if (cell1 !== cell2) return false;
                }
            }
            return true;
        };

        // Helper to check for piece availability with duplicates
        const hasAllPieces = (patternPieces, available) => {
            const availableCopy = [...available];
            for (const requiredPiece of patternPieces) {
                const index = availableCopy.indexOf(requiredPiece);
                if (index === -1) {
                    return false; // Required piece not found
                }
                availableCopy.splice(index, 1); // Remove one instance of the piece
            }
            return true; // All required pieces were found
        };

        for (const category in VisualPatterns) {
            for (const patternId in VisualPatterns[category]) {
                const pattern = VisualPatterns[category][patternId];


                if (hasAllPieces(pattern.pieces, availablePieces)) {
                    const usesCurrentPiece = currentPiece && 
                        (pattern.solution.piece === currentPiece || pattern.alternatives.some(alt => alt.piece === currentPiece));
                    
                    matches.push({
                        ...pattern,
                        category,
                        patternId,
                        usesCurrentPiece: usesCurrentPiece,
                        priority: usesCurrentPiece ? 1 : 0
                    });
                }
            }
        }
        
        // Sort by priority (current piece usage) then by category
        return matches.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            // Prioritize build patterns over solve patterns
            const categoryOrder = { 'build': 0, 'early': 1, 'standard': 2, 'solve': 3, 'recovery': 4 };
            return categoryOrder[a.category] - categoryOrder[b.category];
        });
    },
    
    /**
     * Find best move for current piece from matching patterns
     */
    findBestMoveForCurrentPiece(board, availablePieces, currentPiece, holdPiece) {
        const matches = this.findMatchingPatterns(board, availablePieces, currentPiece);

        if (matches.length === 0) return null;

        const bestMatch = matches[0];

        const findMove = (piece) => {
            if (bestMatch.solution.piece === piece) {
                return bestMatch.solution;
            }
            for (const alt of bestMatch.alternatives) {
                if (alt.piece === piece) {
                    return alt;
                }
            }
            return null;
        };

        if (currentPiece) {
            const move = findMove(currentPiece);
            if (move) return move;
        }

        if (holdPiece) {
            const move = findMove(holdPiece);
            if (move) return move;
        }

        // If neither current nor held piece can be used, do not show a hint
        return null;
    }
};

// Export for browser and Node.js usage
if (typeof window !== 'undefined') {
    window.VisualPatterns = VisualPatterns;
    window.PatternMatcher = PatternMatcher;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VisualPatterns, PatternMatcher };
}
