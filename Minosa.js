// Minosa AI - All Clear Pathfinding System for Konoha Easy Mode
// Provides intelligent hints and All Clear possibility detection

class MinosaAI {
    constructor() {
        this.boardWidth = 5;
        this.boardHeight = 10;
        this.allClearDatabase = this.buildAllClearDatabase();
        this.currentStatus = 'unknown'; // 'possible', 'impossible', 'achieved'
        this.currentHint = null;
        this.kitaDisplay = '🦊'; // Default fox emoji
        this._isAnalyzing = false; // Prevent recursive calls
    }

    // Build 5x4 array database from KonohaEasyBravoDatabase.md patterns
    buildAllClearDatabase() {
        const database = {};

        // Full 5-bag patterns
        database.fullBag = {
            earlyJ: {
                name: 'Early J',
                pattern: [
                    ['I', 'O', 'O', 'L', 'L'],
                    ['I', 'O', 'O', 'T', 'L'],
                    ['I', 'J', 'T', 'T', 'T'],
                    ['I', 'J', 'J', 'J', 'L']
                ],
                requiredPieces: ['I', 'O', 'L', 'J', 'T'],
                difficulty: 'easy'
            },
            earlyJ_mirrored: {
                name: 'Early J (Mirrored)',
                pattern: [
                    ['J', 'J', 'O', 'O', 'I'],
                    ['J', 'T', 'O', 'O', 'I'],
                    ['T', 'T', 'T', 'L', 'I'],
                    ['J', 'L', 'L', 'L', 'I']
                ],
                requiredPieces: ['I', 'O', 'L', 'J', 'T'],
                difficulty: 'easy'
            },
            earlyTO: {
                name: 'Early TO',
                pattern: [
                    ['J', 'J', 'J', 'L', 'L'],
                    ['I', 'I', 'I', 'I', 'L'],
                    ['O', 'O', 'J', 'T', 'L'],
                    ['O', 'O', 'T', 'T', 'T']
                ],
                requiredPieces: ['J', 'L', 'I', 'O', 'T'],
                difficulty: 'easy'
            },
            earlyTO_mirrored: {
                name: 'Early TO (Mirrored)',
                pattern: [
                    ['J', 'J', 'L', 'L', 'L'],
                    ['J', 'I', 'I', 'I', 'I'],
                    ['J', 'T', 'L', 'O', 'O'],
                    ['T', 'T', 'T', 'O', 'O']
                ],
                requiredPieces: ['J', 'L', 'I', 'O', 'T'],
                difficulty: 'easy'
            },
            earlyIO: {
                name: 'Early IO',
                pattern: [
                    ['J', 'J', 'T', 'T', 'T'],
                    ['J', 'O', 'O', 'L', 'L'],
                    ['J', 'O', 'O', 'T', 'L'],
                    ['I', 'I', 'I', 'I', 'L']
                ],
                requiredPieces: ['J', 'T', 'O', 'L', 'I'],
                difficulty: 'easy'
            },
            earlyIO_mirrored: {
                name: 'Early IO (Mirrored)',
                pattern: [
                    ['T', 'T', 'T', 'L', 'L'],
                    ['J', 'J', 'O', 'O', 'L'],
                    ['J', 'T', 'O', 'O', 'L'],
                    ['J', 'I', 'I', 'I', 'I']
                ],
                requiredPieces: ['J', 'T', 'O', 'L', 'I'],
                difficulty: 'easy'
            },
            ilj: {
                name: 'ILJ',
                pattern: [
                    ['O', 'O', 'T', 'T', 'T'],
                    ['J', 'J', 'J', 'L', 'L'],
                    ['O', 'O', 'J', 'T', 'L'],
                    ['I', 'I', 'I', 'I', 'L']
                ],
                requiredPieces: ['O', 'T', 'J', 'L', 'I'],
                difficulty: 'easy'
            },
            ilj_mirrored: {
                name: 'ILJ (Mirrored)',
                pattern: [
                    ['T', 'T', 'T', 'O', 'O'],
                    ['J', 'J', 'L', 'L', 'L'],
                    ['J', 'T', 'L', 'O', 'O'],
                    ['J', 'I', 'I', 'I', 'I']
                ],
                requiredPieces: ['O', 'T', 'J', 'L', 'I'],
                difficulty: 'easy'
            }
        };

        // 3x4 Box patterns - Universal solutions
        database.box3x4 = {
            // Universal solutions for any 3x4 setup
            solutions: {
                ljoSolution: {
                    name: 'LJO Solution',
                    solve: [
                        ['L', 'L', null, null, null],
                        ['J', 'J', null, null, null],
                        ['J', 'L', null, null, null],
                        ['J', 'L', null, null, null]
                    ],
                    requiredPieces: ['L', 'J'],
                    difficulty: 'medium'
                },
                ljoSolution_mirrored: {
                    name: 'LJO Solution (Mirrored)',
                    solve: [
                        [null, null, null, 'J', 'J'],
                        [null, null, null, 'L', 'L'],
                        [null, null, null, 'L', 'J'],
                        [null, null, null, 'L', 'J']
                    ],
                    requiredPieces: ['L', 'J'],
                    difficulty: 'medium'
                },
                lloSolution: {
                    name: 'LLO Solution',
                    solve: [
                        [null, null, null, 'J', 'J'],
                        [null, null, null, 'J', 'T'],
                        [null, null, null, 'T', 'T'],
                        [null, null, null, 'J', 'T']
                    ],
                    requiredPieces: ['J', 'T'],
                    difficulty: 'medium'
                },
                lloSolution_mirrored: {
                    name: 'LLO Solution (Mirrored)',
                    solve: [
                        ['L', 'L', null, null, null],
                        ['T', 'L', null, null, null],
                        ['T', 'T', null, null, null],
                        ['T', 'L', null, null, null]
                    ],
                    requiredPieces: ['L', 'T'],
                    difficulty: 'medium'
                },
                ttlSolution: {
                    name: 'TTL Solution',
                    solve: [
                        [null, null, 'L', 'L', null],
                        [null, null, 'L', 'L', null],
                        [null, null, 'L', 'L', null],
                        [null, null, 'L', 'L', null]
                    ],
                    requiredPieces: ['T', 'L'],
                    difficulty: 'medium'
                },
                ttlSolution_mirrored: {
                    name: 'TTL Solution (Mirrored)',
                    solve: [
                        [null, null, 'J', 'J', null],
                        [null, null, 'J', 'J', null],
                        [null, null, 'J', 'J', null],
                        [null, null, 'J', 'J', null]
                    ],
                    requiredPieces: ['T', 'J'],
                    difficulty: 'medium'
                }
            },
            // 3x4 setups (all use universal solutions)
            ljo: {
                name: 'LJO',
                setup: [
                    [null, null, 'J', 'J', 'J'],
                    [null, null, 'O', 'O', 'J'],
                    [null, null, 'O', 'O', 'L'],
                    [null, null, 'L', 'L', 'L']
                ],
                requiredPieces: ['L', 'O', 'J'],
                difficulty: 'medium'
            },
            ljo_mirrored: {
                name: 'LJO (Mirrored)',
                setup: [
                    ['L', 'L', 'L', null, null],
                    ['L', 'O', 'O', null, null],
                    ['J', 'O', 'O', null, null],
                    ['J', 'J', 'J', null, null]
                ],
                requiredPieces: ['L', 'O', 'J'],
                difficulty: 'medium'
            },
            llo: {
                name: 'LLO',
                setup: [
                    ['L', 'O', 'O', null, null],
                    ['L', 'O', 'O', null, null],
                    ['L', 'L', 'L', null, null],
                    ['L', 'L', 'L', null, null]
                ],
                requiredPieces: ['L', 'O'],
                difficulty: 'medium'
            },
            llo_mirrored: {
                name: 'LLO (Mirrored)',
                setup: [
                    [null, null, 'O', 'O', 'J'],
                    [null, null, 'O', 'O', 'J'],
                    [null, null, 'J', 'J', 'J'],
                    [null, null, 'J', 'J', 'J']
                ],
                requiredPieces: ['J', 'O'],
                difficulty: 'medium'
            },
            ttl: {
                name: 'TTL',
                setup: [
                    [null, null, 'J', 'J', 'T'],
                    [null, null, 'J', 'T', 'T'],
                    [null, null, 'J', 'T', 'T'],
                    [null, null, 'T', 'T', 'T']
                ],
                requiredPieces: ['T', 'J'],
                difficulty: 'medium'
            },
            ttl_mirrored: {
                name: 'TTL (Mirrored)',
                setup: [
                    ['T', 'T', 'T', null, null],
                    ['T', 'T', 'L', null, null],
                    ['T', 'T', 'L', null, null],
                    ['T', 'L', 'L', null, null]
                ],
                requiredPieces: ['T', 'L'],
                difficulty: 'medium'
            }
        };

        // 2x4 Box patterns
        database.box2x4 = {
            olj: {
                name: 'OLJ',
                solve: [
                    [null, null, 'J', 'L', 'L'],
                    [null, null, 'J', 'J', 'J'],
                    [null, null, 'O', 'O', 'L'],
                    [null, null, 'O', 'O', 'L']
                ],
                requiredPieces: ['J', 'L', 'O'],
                difficulty: 'medium'
            },
            olj_mirrored: {
                name: 'OLJ (Mirrored)',
                solve: [
                    ['J', 'J', 'L', null, null],
                    ['L', 'L', 'L', null, null],
                    ['J', 'O', 'O', null, null],
                    ['J', 'O', 'O', null, null]
                ],
                requiredPieces: ['J', 'L', 'O'],
                difficulty: 'medium'
            },
            ojl: {
                name: 'OJL',
                solve: [
                    [null, null, 'J', 'J', 'L'],
                    [null, null, 'L', 'L', 'L'],
                    [null, null, 'J', 'O', 'O'],
                    [null, null, 'J', 'O', 'O']
                ],
                requiredPieces: ['J', 'L', 'O'],
                difficulty: 'medium'
            },
            ojl_mirrored: {
                name: 'OJL (Mirrored)',
                solve: [
                    ['J', 'L', 'L', null, null],
                    ['J', 'J', 'J', null, null],
                    ['O', 'O', 'L', null, null],
                    ['O', 'O', 'L', null, null]
                ],
                requiredPieces: ['J', 'L', 'O'],
                difficulty: 'medium'
            },
            tlj: {
                name: 'TLJ',
                solve: [
                    [null, null, 'J', 'J', 'J'],
                    [null, null, 'L', 'L', 'L'],
                    [null, null, 'L', 'T', 'J'],
                    [null, null, 'T', 'T', 'T']
                ],
                requiredPieces: ['J', 'L', 'T'],
                difficulty: 'medium'
            },
            tlj_mirrored: {
                name: 'TLJ (Mirrored)',
                solve: [
                    ['L', 'L', 'L', null, null],
                    ['J', 'J', 'J', null, null],
                    ['L', 'T', 'J', null, null],
                    ['T', 'T', 'T', null, null]
                ],
                requiredPieces: ['J', 'L', 'T'],
                difficulty: 'medium'
            },
            ltl: {
                name: 'LTL',
                solve: [
                    [null, null, 'L', 'L', 'L'],
                    [null, null, 'T', 'T', 'T'],
                    [null, null, 'L', 'T', 'L'],
                    [null, null, 'L', 'L', 'L']
                ],
                requiredPieces: ['L', 'T'],
                difficulty: 'medium'
            },
            ltl_mirrored: {
                name: 'LTL (Mirrored)',
                solve: [
                    ['J', 'J', 'J', null, null],
                    ['T', 'T', 'T', null, null],
                    ['J', 'T', 'J', null, null],
                    ['J', 'J', 'J', null, null]
                ],
                requiredPieces: ['J', 'T'],
                difficulty: 'medium'
            },
            llt: {
                name: 'LLT',
                solve: [
                    [null, null, 'T', 'T', 'T'],
                    [null, null, 'L', 'L', 'L'],
                    [null, null, 'L', 'T', 'L'],
                    [null, null, 'L', 'L', 'L']
                ],
                requiredPieces: ['L', 'T'],
                difficulty: 'medium'
            },
            llt_mirrored: {
                name: 'LLT (Mirrored)',
                solve: [
                    ['T', 'T', 'T', null, null],
                    ['J', 'J', 'J', null, null],
                    ['J', 'T', 'J', null, null],
                    ['J', 'J', 'J', null, null]
                ],
                requiredPieces: ['J', 'T'],
                difficulty: 'medium'
            },
            ltt: {
                name: 'LTT',
                solve: [
                    [null, null, 'T', 'T', 'T'],
                    [null, null, 'L', 'T', 'T'],
                    [null, null, 'L', 'T', 'T'],
                    [null, null, 'L', 'L', 'T']
                ],
                requiredPieces: ['L', 'T'],
                difficulty: 'medium'
            },
            ltt_mirrored: {
                name: 'LTT (Mirrored)',
                solve: [
                    ['T', 'T', 'T', null, null],
                    ['T', 'T', 'J', null, null],
                    ['T', 'T', 'J', null, null],
                    ['T', 'J', 'J', null, null]
                ],
                requiredPieces: ['J', 'T'],
                difficulty: 'medium'
            },
            ltt_variant2: {
                name: 'LTT Variant 2',
                solve: [
                    [null, null, 'T', 'T', 'T'],
                    [null, null, 'T', 'L', 'L'],
                    [null, null, 'T', 'T', 'L'],
                    [null, null, 'T', 'T', 'L']
                ],
                requiredPieces: ['L', 'T'],
                difficulty: 'medium'
            },
            ltt_variant2_mirrored: {
                name: 'LTT Variant 2 (Mirrored)',
                solve: [
                    ['T', 'T', 'T', null, null],
                    ['J', 'J', 'T', null, null],
                    ['J', 'T', 'T', null, null],
                    ['J', 'T', 'T', null, null]
                ],
                requiredPieces: ['J', 'T'],
                difficulty: 'medium'
            },
            ltt_variant3: {
                name: 'LTT Variant 3',
                solve: [
                    [null, null, 'T', 'L', 'L'],
                    [null, null, 'T', 'T', 'L'],
                    [null, null, 'T', 'T', 'L'],
                    [null, null, 'L', 'L', 'T']
                ],
                requiredPieces: ['L', 'T'],
                difficulty: 'medium'
            },
            ltt_variant3_mirrored: {
                name: 'LTT Variant 3 (Mirrored)',
                solve: [
                    ['J', 'J', 'T', null, null],
                    ['J', 'T', 'T', null, null],
                    ['J', 'T', 'T', null, null],
                    ['T', 'T', 'T', null, null]
                ],
                requiredPieces: ['J', 'T'],
                difficulty: 'medium'
            }

        };

        // Double T patterns
        database.doubleT = {
            ilt: {
                name: 'ILT',
                solve: [
                    [null, 'T', 'T', 'T', 'I'],
                    [null, null, 'L', 'L', 'I'],
                    [null, null, 'T', 'L', 'I'],
                    [null, null, null, 'L', 'I']
                ],
                requiredPieces: ['T', 'I', 'L'],
                difficulty: 'hard'
            },
            ilt_mirrored: {
                name: 'ILT (Mirrored)',
                solve: [
                    ['I', 'T', 'T', 'T', null],
                    ['I', 'J', 'J', null, null],
                    ['I', 'J', 'T', null, null],
                    ['I', 'J', null, null, null]
                ],
                requiredPieces: ['T', 'I', 'L'],
                difficulty: 'hard'
            },
            ilo: {
                name: 'ILO',
                solve: [
                    [null, 'I', 'I', 'I', 'I'],
                    [null, null, 'L', 'L', 'L'],
                    [null, null, 'L', 'O', 'O'],
                    [null, null, null, 'O', 'O']
                ],
                requiredPieces: ['I', 'L', 'O'],
                difficulty: 'hard'
            },
            ilo_mirrored: {
                name: 'ILO (Mirrored)',
                solve: [
                    ['I', 'I', 'I', 'I', null],
                    ['J', 'J', 'J', null, null],
                    ['O', 'O', 'J', null, null],
                    ['O', 'O', null, null, null]
                ],
                requiredPieces: ['I', 'L', 'O'],
                difficulty: 'hard'
            },
            ijo: {
                name: 'IJO',
                solve: [
                    [null, 'I', 'I', 'I', 'I'],
                    [null, null, 'J', 'O', 'O'],
                    [null, null, 'J', 'J', 'J'],
                    [null, null, null, 'O', 'O']
                ],
                requiredPieces: ['I', 'J', 'O'],
                difficulty: 'hard'
            },
            ijo_mirrored: {
                name: 'IJO (Mirrored)',
                solve: [
                    ['I', 'I', 'I', 'I', null],
                    ['O', 'O', 'L', null, null],
                    ['L', 'L', 'L', null, null],
                    ['O', 'O', null, null, null]
                ],
                requiredPieces: ['I', 'J', 'O'],
                difficulty: 'hard'
            }
        };

        // IOT/JJT patterns
        database.iotJjt = {
            lt: {
                name: 'LT',
                solve: [
                    [null, null, null, null, null],
                    ['T', 'T', 'T', 'L', null],
                    [null, 'L', 'L', 'L', null],
                    [null, 'T', null, null, null]
                ],
                requiredPieces: ['T', 'L'],
                difficulty: 'hard'
            },
            lt_mirrored: {
                name: 'LT (Mirrored)',
                solve: [
                    [null, null, null, null, null],
                    [null, 'J', 'T', 'T', 'T'],
                    [null, 'J', 'J', 'J', null],
                    [null, null, null, 'T', null]
                ],
                requiredPieces: ['T', 'L'],
                difficulty: 'hard'
            },
            lo: {
                name: 'LO',
                solve: [
                    [null, null, null, null, null],
                    ['L', 'L', 'O', 'O', null],
                    [null, 'L', 'O', 'O', null],
                    [null, 'L', null, null, null]
                ],
                requiredPieces: ['L', 'O'],
                difficulty: 'hard'
            },
            lo_mirrored: {
                name: 'LO (Mirrored)',
                solve: [
                    [null, null, null, null, null],
                    [null, 'O', 'O', 'J', 'J'],
                    [null, 'O', 'O', 'J', null],
                    [null, null, null, 'J', null]
                ],
                requiredPieces: ['L', 'O'],
                difficulty: 'hard'
            },
            li: {
                name: 'LI',
                solve: [
                    [null, null, null, null, null],
                    ['I', 'I', 'I', 'I', null],
                    [null, 'L', 'L', 'L', null],
                    [null, 'L', null, null, null]
                ],
                requiredPieces: ['I', 'L'],
                difficulty: 'hard'
            },
            li_mirrored: {
                name: 'LI (Mirrored)',
                solve: [
                    [null, null, null, null, null],
                    [null, 'I', 'I', 'I', 'I'],
                    [null, 'J', 'J', 'J', null],
                    [null, null, null, 'J', null]
                ],
                requiredPieces: ['I', 'L'],
                difficulty: 'hard'
            }
        };

        // // TL patterns
        // database.tl = {
        //     ojj: {
        //         name: 'OJJ',
        //         solve: [
        //             ['O', 'O', 'J', 'J', null],
        //             ['O', 'O', 'J', null, null],
        //             [null, 'J', 'J', null, null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['O', 'J'],
        //         difficulty: 'hard'
        //     },
        //     ojj_mirrored: {
        //         name: 'OJJ (Mirrored)',
        //         solve: [
        //             [null, 'J', 'J', 'O', 'O'],
        //             [null, null, 'J', 'O', 'O'],
        //             [null, null, 'J', 'J', null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['O', 'J'],
        //         difficulty: 'hard'
        //     },
        //     oll: {
        //         name: 'OLL',
        //         solve: [
        //             ['O', 'O', 'L', 'L', 'L'],
        //             ['O', 'O', 'L', null, null],
        //             [null, 'L', 'L', 'L', null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['O', 'L'],
        //         difficulty: 'hard'
        //     },
        //     oll_mirrored: {
        //         name: 'OLL (Mirrored)',
        //         solve: [
        //             [null, 'L', 'L', 'L', 'O'],
        //             [null, null, 'L', 'O', 'O'],
        //             [null, 'L', 'L', 'L', null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['O', 'L'],
        //         difficulty: 'hard'
        //     },
        //     olj: {
        //         name: 'OLJ',
        //         solve: [
        //             ['L', 'L', 'L', 'J', 'J'],
        //             ['L', 'O', 'O', 'J', null],
        //             [null, 'O', 'O', 'J', null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['L', 'O', 'J'],
        //         difficulty: 'hard'
        //     },
        //     olj_mirrored: {
        //         name: 'OLJ (Mirrored)',
        //         solve: [
        //             [null, 'J', 'J', 'L', 'L'],
        //             [null, 'J', 'O', 'O', 'L'],
        //             [null, 'J', 'O', 'O', null],
        //             [null, null, null, null, null]
        //         ],
        //         requiredPieces: ['L', 'O', 'J'],
        //         difficulty: 'hard'
        //     }
        // };

        return database;
    }

    // Analyze current game state and determine All Clear possibilities
    analyzeGameState(currentPiece, nextPieces, holdPiece, boardState) {
        // Prevent recursive calls
        if (this._isAnalyzing) {
            console.log('[MINOSA] Already analyzing, skipping recursive call');
            return {
                status: 'busy',
                kitaDisplay: '⏳',
                hint: null,
                message: 'Analyzing...'
            };
        }
        
        this._isAnalyzing = true;
        
        try {
            console.log('[MINOSA] Analyzing game state...');
            console.log('[MINOSA] Current piece:', currentPiece);
            console.log('[MINOSA] Next pieces:', nextPieces);
            console.log('[MINOSA] Hold piece:', holdPiece);
            
            // Clear previous analysis to prevent stale hints
            this._currentHint = null;
            this._currentStatus = 'no_solution';
            
            // Build available pieces array with current piece first
            const availablePieces = [];
            if (currentPiece) {
                availablePieces.push(currentPiece.toUpperCase());
                console.log('[MINOSA] Added current piece to available:', currentPiece.toUpperCase());
            }
            if (Array.isArray(nextPieces)) {
                nextPieces.forEach(piece => {
                    if (piece && typeof piece === 'string') {
                        availablePieces.push(piece.toUpperCase());
                    }
                });
            }
            if (holdPiece) {
                availablePieces.push(holdPiece.toUpperCase());
            }
            
            console.log('[MINOSA] Available pieces:', availablePieces);
            
            // Check if board is already clear
            if (this.isBoardClear(boardState)) {
                console.log('[MINOSA] Board is already clear!');
                this._currentStatus = 'already_clear';
                return {
                    status: 'already_clear',
                    hint: null,
                    message: 'Board is already clear!'
                };
            }
            
            // Find All Clear solutions
            const solutions = this.findAllClearSolutions(availablePieces, boardState);
            
            if (solutions.length > 0) {
                console.log('[MINOSA] Found solutions:', solutions.length);
                this._currentStatus = 'possible';
                
                // Select best solution
                const bestSolution = this.selectBestSolution(solutions, availablePieces);
                console.log('[MINOSA] Best solution:', bestSolution);
                
                // Generate hint for the best solution
                this._currentHint = this.generateHint(bestSolution, availablePieces);
                console.log('[MINOSA] Generated hint:', this._currentHint);
                
                return {
                    status: 'possible',
                    hint: this._currentHint,
                    message: `Found ${solutions.length} All Clear solutions`
                };
            } else {
                console.log('[MINOSA] No solutions found');
                this._currentStatus = 'impossible';
                return {
                    status: 'impossible',
                    hint: null,
                    message: 'No All Clear solutions available'
                };
            }
        } finally {
            this._isAnalyzing = false;
        }
    }

    // Get the current hint for display
    getCurrentHint() {
        console.log('[MINOSA] Getting current hint:', this._currentHint);
        return this._currentHint;
    }

    // Get the current status for display
    getCurrentStatus() {
        return this._currentStatus || 'no_solution';
    }

    // Get the Kita display character
    getKitaDisplay() {
        switch (this._currentStatus) {
            case 'possible': return '🦊';
            case 'already_clear': return '🦊✓';
            case 'impossible': return '✗';
            case 'busy': return '⏳';
            default: return '';
        }
    }

    // Check if board is completely clear
    isBoardClear(boardState) {
        if (!boardState || !boardState.grid) {
            return false;
        }
        
        return boardState.grid.every(row => 
            row.every(cell => cell === 0 || cell === null)
        );
    }

    // Find all All Clear solutions available with current pieces
    findAllClearSolutions(availablePieces, boardState) {
        console.log('[MINOSA] Finding all clear solutions...');
        
        try {
            const solutions = [];
            
            // Check each pattern category
            for (const [category, patterns] of Object.entries(this.allClearDatabase)) {
                // Special handling for 3x4 box patterns
                if (category === 'box3x4') {
                    const box3x4Solutions = this.findBox3x4Solutions(patterns, availablePieces, boardState);
                    solutions.push(...box3x4Solutions);
                    continue;
                }
                
                for (const [patternId, pattern] of Object.entries(patterns)) {
                    if (this.canSolvePattern(pattern, availablePieces, boardState)) {
                        console.log('[MINOSA] Found solution:', pattern.name);
                        solutions.push({
                            category,
                            patternId,
                            name: pattern.name,
                            difficulty: pattern.difficulty,
                            pattern: pattern.pattern || pattern.solve,
                            requiredPieces: pattern.requiredPieces,
                            hint: this.generateHint(pattern, availablePieces)
                        });
                    }
                }
            }
            
            console.log('[MINOSA] Total solutions found:', solutions.length);
            
            // Sort by difficulty (easy first) and then by piece availability
            return solutions.sort((a, b) => {
                const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
                if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                }
                return b.requiredPieces.length - a.requiredPieces.length;
            });
        } catch (error) {
            console.error('[MINOSA] Error in findAllClearSolutions:', error);
            return [];
        }
    }

    // Find 3x4 box solutions using universal solutions
    findBox3x4Solutions(patterns, availablePieces, boardState) {
        console.log('[MINOSA] Finding 3x4 box solutions...');
        const solutions = [];
        const universalSolutions = patterns.solutions;
        const setups = { ...patterns };
        delete setups.solutions; // Remove solutions from setups
        
        console.log('[MINOSA] Universal solutions:', Object.keys(universalSolutions));
        console.log('[MINOSA] Setups:', Object.keys(setups));
        
        // Check each setup to see if it's compatible with board state
        for (const [setupId, setup] of Object.entries(setups)) {
            console.log('[MINOSA] Checking setup:', setupId);
            
            if (!this.isSetupCompatible(setup.setup, boardState)) {
                console.log('[MINOSA] Setup not compatible:', setupId);
                continue;
            }
            
            console.log('[MINOSA] Setup is compatible:', setupId);
            
            // For each compatible setup, find the best universal solution
            for (const [solutionId, solution] of Object.entries(universalSolutions)) {
                console.log('[MINOSA] Checking solution:', solutionId);
                if (this.canSolvePattern(solution, availablePieces, boardState)) {
                    console.log('[MINOSA] Solution works:', solutionId);
                    solutions.push({
                        category: 'box3x4',
                        patternId: setupId,
                        name: `${setup.name} - ${solution.name}`,
                        difficulty: solution.difficulty,
                        pattern: solution.solve,
                        requiredPieces: solution.requiredPieces,
                        hint: this.generateHint(solution, availablePieces),
                        setupName: setup.name,
                        solutionName: solution.name
                    });
                } else {
                    console.log('[MINOSA] Solution does not work:', solutionId);
                }
            }
        }
        
        console.log('[MINOSA] 3x4 solutions found:', solutions.length);
        return solutions;
    }

    // Check if a pattern can be solved with available pieces
    canSolvePattern(pattern, availablePieces, boardState) {
        // Check if we have all required pieces
        const requiredPieces = pattern.requiredPieces || [];
        const availableSet = new Set(availablePieces);
        
        for (const piece of requiredPieces) {
            if (!availableSet.has(piece)) {
                return false;
            }
        }
        
        // For patterns with setup requirements, check if board state is compatible
        if (pattern.setup && boardState) {
            return this.isSetupCompatible(pattern.setup, boardState);
        }
        
        return true;
    }

    // Check if setup pattern is compatible with current board state
    isSetupCompatible(setup, boardState) {
        // If no board state, assume compatible
        if (!boardState || !boardState.grid) {
            return true;
        }
        
        // Count filled cells
        const filledCells = boardState.grid.flat().filter(cell => cell !== 0 && cell !== null).length;
        
        // If board is completely empty, allow any setup
        if (filledCells === 0) {
            return true;
        }
        
        // For boards with some pieces, be more lenient with the threshold
        // Allow up to 30 filled cells for setup compatibility
        return filledCells < 30;
    }

    // Select the best solution from available options
    selectBestSolution(solutions, availablePieces) {
        if (solutions.length === 0) return null;
        
        // Prefer easier patterns and those using more immediately available pieces
        return solutions[0];
    }

    // Generate hint for a specific pattern
    generateHint(pattern, availablePieces) {
        console.log('[MINOSA] Generating hint for pattern:', pattern.name);
        console.log('[MINOSA] Available pieces:', availablePieces);
        
        const hint = {
            nextPiece: null,
            holdSuggestion: null,
            patternName: pattern.name,
            difficulty: pattern.difficulty,
            steps: [],
            pieceShape: null,
            position: null,
            rotation: 0
        };

        // Prioritize current piece (first in availablePieces array)
        if (availablePieces.length > 0) {
            const currentPiece = availablePieces[0];
            
            // Check if current piece is in the required pieces
            if (pattern.requiredPieces && pattern.requiredPieces.includes(currentPiece)) {
                hint.nextPiece = currentPiece;
                console.log('[MINOSA] Using current piece:', currentPiece);
            } else {
                // Find the first required piece that's available
                for (const piece of pattern.requiredPieces) {
                    if (availablePieces.includes(piece)) {
                        hint.nextPiece = piece;
                        console.log('[MINOSA] Selected next piece:', piece, '(current piece not in pattern)');
                        break;
                    }
                }
            }
            
            // Suggest hold if current piece doesn't match pattern
            if (!hint.nextPiece || hint.nextPiece !== currentPiece) {
                hint.holdSuggestion = currentPiece;
                console.log('[MINOSA] Suggesting to hold current piece:', currentPiece);
            }
        }

        // Generate piece shape, position, and rotation from the pattern
        if (pattern.solve && pattern.solve.length > 0 && hint.nextPiece) {
            console.log('[MINOSA] Looking for piece position in solve pattern...');
            console.log('[MINOSA] Solve pattern:', pattern.solve);
            console.log('[MINOSA] Looking for piece:', hint.nextPiece);
            
            // Find all occurrences of the piece in the solve pattern
            const piecePositions = [];
            for (let row = 0; row < pattern.solve.length; row++) {
                for (let col = 0; col < pattern.solve[row].length; col++) {
                    if (pattern.solve[row][col] === hint.nextPiece) {
                        piecePositions.push({ x: col, y: row });
                        console.log('[MINOSA] Found piece at:', { x: col, y: row });
                    }
                }
            }
            
            console.log('[MINOSA] All piece positions found:', piecePositions);
            
            if (piecePositions.length > 0) {
                // Use the first position found (could be improved to find optimal position)
                hint.position = piecePositions[0];
                hint.pieceShape = hint.nextPiece;
                
                // Determine required rotation from the pattern
                hint.rotation = this.determineRequiredRotation(hint.nextPiece, hint.position, pattern);
                console.log('[MINOSA] Found hint position for', hint.nextPiece, 'at', hint.position, 'rotation:', hint.rotation);
            } else {
                console.log('[MINOSA] ERROR: No piece positions found in solve pattern!');
                // Fallback: create a default position
                hint.position = { x: 2, y: 0 };
                hint.pieceShape = hint.nextPiece;
                hint.rotation = 0;
                console.log('[MINOSA] Using fallback position:', hint.position);
            }
        } else {
            console.log('[MINOSA] ERROR: No solve pattern or next piece available!');
            console.log('[MINOSA] pattern.solve:', pattern.solve);
            console.log('[MINOSA] hint.nextPiece:', hint.nextPiece);
            // Fallback: create a default position
            hint.position = { x: 2, y: 0 };
            hint.pieceShape = hint.nextPiece || 'I';
            hint.rotation = 0;
            console.log('[MINOSA] Using emergency fallback position:', hint.position);
        }

        console.log('[MINOSA] Generated hint:', hint);

        // Generate basic step hints
        hint.steps = this.generateStepHints(pattern);
        
        return hint;
    }

    // Determine the required rotation for a piece based on the solve pattern
    determineRequiredRotation(pieceType, position, pattern) {
        console.log('[MINOSA] Determining rotation for', pieceType, 'at position', position);
        
        // For now, we'll implement a basic approach
        // In a full implementation, this would analyze the pattern to determine the exact rotation needed
        
        // Check if the pattern has rotation information
        if (pattern.solve && pattern.solve.length > 0) {
            // Look at the shape around the piece position to infer rotation
            const pieceArea = this.extractPieceArea(pattern.solve, position, pieceType);
            console.log('[MINOSA] Extracted piece area:', pieceArea);
            
            // Compare with known rotations to find the best match
            const bestRotation = this.findBestRotationMatch(pieceType, pieceArea);
            console.log('[MINOSA] Best rotation match:', bestRotation);
            
            return bestRotation;
        }
        
        return 0; // Default rotation if we can't determine it
    }

    // Extract the area around a piece position to analyze its shape
    extractPieceArea(solvePattern, position, pieceType) {
        const area = [];
        const pieceSize = pieceType === 'I' ? 4 : 3; // I-piece is 4x1, others are 3x3 max
        
        // Extract a small area around the piece position
        for (let row = Math.max(0, position.y - 1); row < Math.min(solvePattern.length, position.y + pieceSize); row++) {
            const areaRow = [];
            for (let col = Math.max(0, position.x - 1); col < Math.min(solvePattern[row].length, position.x + pieceSize); col++) {
                areaRow.push(solvePattern[row][col]);
            }
            area.push(areaRow);
        }
        
        return area;
    }

    // Find the best rotation match for a piece based on the extracted area
    findBestRotationMatch(pieceType, pieceArea) {
        // This is a simplified implementation
        // In a full implementation, this would compare the area with all known rotations
        
        // For now, return rotation 0 as default
        // TODO: Implement proper rotation matching based on piece area analysis
        return 0;
    }

    // Generate step-by-step hints for pattern
    generateStepHints(pattern) {
        const steps = [];
        
        if (pattern.difficulty === 'easy') {
            steps.push(`Start with ${pattern.requiredPieces[0]} piece`);
            steps.push(`Follow the ${pattern.name} pattern`);
            steps.push('Complete the All Clear!');
        } else if (pattern.difficulty === 'medium') {
            steps.push(`Build the setup for ${pattern.name}`);
            steps.push('Place pieces carefully');
            steps.push('Execute the final solve');
        } else {
            steps.push(`Complex ${pattern.name} pattern`);
            steps.push('Requires precise placement');
            steps.push('Advanced technique needed');
        }
        
        return steps;
    }

    // Reset AI state for new game
    reset() {
        this._currentStatus = 'unknown';
        this._currentHint = null;
        console.log('[MINOSA] AI state reset');
    }
}

// Export for browser and Node.js usage
if (typeof window !== 'undefined') {
    window.MinosaAI = MinosaAI;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = MinosaAI;
}
