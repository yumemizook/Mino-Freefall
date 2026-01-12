// Color-coded pattern arrays based on Pattern Images
// Each pattern uses piece letters instead of 1s to show which pieces go where

const ColorCodedPatterns = {
    "2x4_Box": {
        "build_II": {
            name: "2x4 Box - Build II",
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
            ]
        },
        "build_JJ": {
            name: "2x4 Box - Build JJ",
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
            ]
        },
        "build_LL": {
            name: "2x4 Box - Build LL",
            category: "build",
            pieces: ["L", "L"],
            board: [
                [0,0,'L',0,0],
                ['L','L','L',0,0],
                [0,0,'L',0,0],
                ['L','L','L',0,0]
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 1, y: 0, rotation: 0 }
            ]
        },
        "build_OO": {
            name: "2x4 Box - Build OO",
            category: "build",
            pieces: ["O", "O"],
            board: [
                ['O','O',0,0,0],
                ['O','O',0,0,0],
                ['O','O',0,0,0],
                ['O','O',0,0,0]
            ],
            solution: { piece: "O", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 }
            ]
        },
        "solve_LLT": {
            name: "2x4 Box - Solve LLT",
            category: "solve",
            pieces: ["L", "L", "T"],
            board: [
                [0,0,0,0,0],
                ['L','L','L','T',0],
                [0,'L',0,'T','T'],
                [0,'L',0,'T',0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ]
        },
        "solve_LTL": {
            name: "2x4 Box - Solve LTL",
            category: "solve",
            pieces: ["L", "T", "L"],
            board: [
                [0,0,0,0,0],
                ['L','L','L',0,0],
                [0,'L','T','T',0],
                [0,'L','T',0,0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ]
        },
        "solve_LTT": {
            name: "2x4 Box - Solve LTT",
            category: "solve",
            pieces: ["L", "T", "T"],
            board: [
                [0,0,0,0,0],
                ['L','L','L',0,0],
                [0,'L','T','T',0],
                [0,'L',0,'T',0]
            ],
            solution: { piece: "T", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 2, y: 2, rotation: 1 }
            ]
        },
        "solve_OJL": {
            name: "2x4 Box - Solve OJL",
            category: "solve",
            pieces: ["O", "J", "L"],
            board: [
                [0,0,0,0,'L'],
                [0,0,0,'L','L'],
                ['O','O','J','J',0],
                ['O','O',0,'J',0]
            ],
            solution: { piece: "J", x: 2, y: 2, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 2, y: 2, rotation: 2 }
            ]
        },
        "solve_OLJ": {
            name: "2x4 Box - Solve OLJ",
            category: "solve",
            pieces: ["O", "L", "J"],
            board: [
                [0,0,'J',0,0],
                [0,0,'J','J',0],
                ['O','O','L','L',0],
                ['O','O',0,'L',0]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ]
        },
        "solve_TLJ": {
            name: "2x4 Box - Solve TLJ",
            category: "solve",
            pieces: ["T", "L", "J"],
            board: [
                ['J',0,0,0,0],
                ['J','J','L',0,0],
                ['T','T','L','L',0],
                [0,'T',0,'L',0]
            ],
            solution: { piece: "L", x: 1, y: 2, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ]
        },
        "solve_TLT": {
            name: "2x4 Box - Solve TLT",
            category: "solve",
            pieces: ["T", "L", "T"],
            board: [
                [0,0,0,0,0],
                ['T','T','L',0,0],
                [0,'T','L','L',0],
                [0,0,0,'L',0]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "T", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ]
        },
        "solve_TTL": {
            name: "2x4 Box - Solve TTL",
            category: "solve",
            pieces: ["T", "T", "L"],
            board: [
                [0,0,0,0,0],
                ['T','T','L',0,0],
                [0,'T','L','L',0],
                [0,0,0,'L',0]
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "T", x: 0, y: 2, rotation: 0 },
                { piece: "T", x: 1, y: 2, rotation: 0 }
            ]
        }
    },
    
    "3x4_Box": {
        "build_LJO": {
            name: "3x4 Box - Build LJO",
            category: "build",
            pieces: ["L", "J", "O"],
            board: [
                [0,'O','O','J',0],
                [0,'O','O','J','J'],
                ['L','L','L','J',0],
                [0,'L',0,0,0]
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 2, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ]
        },
        "build_LOO": {
            name: "3x4 Box - Build LOO",
            category: "build",
            pieces: ["L", "O", "O"],
            board: [
                [0,'O','O',0,0],
                [0,'O','O',0,0],
                ['L','L','L','O','O'],
                [0,'L',0,'O','O']
            ],
            solution: { piece: "L", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 1, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ]
        },
        "build_OOL": {
            name: "3x4 Box - Build OOL",
            category: "build",
            pieces: ["O", "O", "L"],
            board: [
                ['O','O',0,0,0],
                ['O','O',0,0,0],
                ['O','O','L','L','L'],
                ['O','O',0,'L',0]
            ],
            solution: { piece: "L", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 },
                { piece: "O", x: 1, y: 3, rotation: 0 }
            ]
        },
        "build_TLL": {
            name: "3x4 Box - Build TLL",
            category: "build",
            pieces: ["T", "L", "L"],
            board: [
                [0,'L',0,0,0],
                ['L','L','L',0,0],
                ['T','T','T','L',0],
                [0,'T',0,'L',0]
            ],
            solution: { piece: "T", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 0, rotation: 0 },
                { piece: "L", x: 2, y: 3, rotation: 0 }
            ]
        },
        "build_TLO": {
            name: "3x4 Box - Build TLO",
            category: "build",
            pieces: ["T", "L", "O"],
            board: [
                [0,'L',0,'O','O'],
                ['L','L','L','O','O'],
                ['T','T','T','O','O'],
                [0,'T',0,0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 0, y: 0, rotation: 0 },
                { piece: "L", x: 2, y: 3, rotation: 0 }
            ]
        },
        "build_TOL": {
            name: "3x4 Box - Build TOL",
            category: "build",
            pieces: ["T", "O", "L"],
            board: [
                ['O','O',0,'L',0],
                ['O','O',0,'L','L'],
                ['T','T','T','L',0],
                [0,'T',0,0,0]
            ],
            solution: { piece: "T", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "T", x: 1, y: 0, rotation: 0 },
                { piece: "L", x: 2, y: 3, rotation: 0 }
            ]
        }
    },
    
    "Full_Bag": {
        "early_I": {
            name: "Full Bag - Early I",
            category: "early",
            pieces: ["I"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                ['I','I','I','I',0]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ]
        },
        "early_J": {
            name: "Full Bag - Early J",
            category: "early",
            pieces: ["J"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                ['J','J','J',0,0],
                [0,'J',0,0,0]
            ],
            solution: { piece: "J", x: 1, y: 0, rotation: 0 },
            alternatives: []
        },
        "early_T": {
            name: "Full Bag - Early T",
            category: "early",
            pieces: ["T"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,'T',0,0,0],
                ['T','T','T',0,0]
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ]
        },
        "ILJ": {
            name: "Full Bag - ILJ",
            category: "standard",
            pieces: ["I", "L", "J"],
            board: [
                ['I','I','I','I',0],
                ['I','I','I','I',0],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 2, rotation: 1 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ]
        },
        "PCO_I": {
            name: "Full Bag - PCO I",
            category: "solve",
            pieces: ["I"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: []
        }
    },
    
    "PCO": {
        "build_JJT": {
            name: "PCO - Build JJT",
            category: "build",
            pieces: ["J", "J", "T"],
            board: [
                ['J','J','J',0,'T'],
                [0,'J',0,'T','T'],
                ['J','J','J','T',0],
                [0,'J',0,'T',0]
            ],
            solution: { piece: "J", x: 0, y: 0, rotation: 1 },
            alternatives: [
                { piece: "J", x: 1, y: 0, rotation: 1 },
                { piece: "T", x: 2, y: 3, rotation: 0 }
            ]
        },
        "solve_I": {
            name: "PCO - Solve I",
            category: "solve",
            pieces: ["I"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: []
        },
        "solve_O": {
            name: "PCO - Solve O",
            category: "solve",
            pieces: ["O"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ],
            solution: { piece: "O", x: 1, y: 0, rotation: 0 },
            alternatives: []
        }
    },
    
    "TT": {
        "solve_IJO": {
            name: "TT - Solve IJO",
            category: "solve",
            pieces: ["I", "J", "O"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                ['I','I','I','I',0],
                [0,0,0,0,0],
                [0,'O','O','J',0],
                [0,'O','O','J','J']
            ],
            solution: { piece: "I", x: 0, y: 0, rotation: 0 },
            alternatives: [
                { piece: "J", x: 2, y: 2, rotation: 0 },
                { piece: "O", x: 1, y: 2, rotation: 0 }
            ]
        }
    },
    
    "Recover": {
        "recover_1": {
            name: "Recover - Pattern 1",
            category: "recovery",
            pieces: ["T", "L", "J"],
            board: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,'T',0,0,0],
                ['T','T','T','L',0],
                [0,'T',0,'L','L']
            ],
            solution: { piece: "T", x: 1, y: 0, rotation: 0 },
            alternatives: [
                { piece: "L", x: 0, y: 0, rotation: 0 },
                { piece: "J", x: 3, y: 0, rotation: 0 }
            ]
        }
    },
    
    "Misc": {
        "solve_OJJ": {
            name: "TL Misc - Solve OJJ",
            category: "solve",
            pieces: ["O", "J", "J"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,'J','J'],
                [0,0,0,'J','J']
            ],
            solution: { piece: "J", x: 2, y: 2, rotation: 0 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ]
        },
        "solve_OLJ": {
            name: "TL Misc - Solve OLJ",
            category: "solve",
            pieces: ["O", "L", "J"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,'L','L'],
                [0,0,0,'L','L']
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "J", x: 3, y: 2, rotation: 0 }
            ]
        },
        "solve_OLL": {
            name: "TL Misc - Solve OLL",
            category: "solve",
            pieces: ["O", "L", "L"],
            board: [
                [1,1,1,1,1],
                [1,1,1,1,1],
                [0,0,0,'L','L'],
                [0,0,0,'L','L']
            ],
            solution: { piece: "L", x: 2, y: 2, rotation: 2 },
            alternatives: [
                { piece: "O", x: 0, y: 2, rotation: 0 },
                { piece: "L", x: 3, y: 2, rotation: 2 }
            ]
        }
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.ColorCodedPatterns = ColorCodedPatterns;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorCodedPatterns;
}
