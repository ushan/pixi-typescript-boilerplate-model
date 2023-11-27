const GAME_CONFIG = {
    speeds: {
        '30': {speed: 1.6},
        '60': {speed: 1.4},
        '90': {speed: 1.2},
        '120': {speed: 1},
        '150': {speed: 0.9},
        '180': {speed: 0.8},
        '210': {speed: 0.7},
        '240': {speed: 0.6},
        '270': {speed: 0.5},
        '300': {speed: 0.4},
        'infinity': {speed: 0.3}
    },
    itemsInRow: {
        '60': {row0: 30, row1: 30, row2: 40, row3: 0},
        '120': {row0: 25, row1: 30, row2: 40, row3: 5},
        '180': {row0: 25, row1: 25, row2: 40, row3: 10},
        '240': {row0: 20, row1: 25, row2: 40, row3: 15},
        '300': {row0: 15, row1: 25, row2: 45, row3: 15},
        '330': {row0: 15, row1: 20, row2: 45, row3: 20},
        '360': {row0: 10, row1: 20, row2: 50, row3: 20},
        '390': {row0: 5, row1: 20, row2: 50, row3: 25},
        '420': {row0: 0, row1: 20, row2: 50, row3: 30},
        '450': {row0: 0, row1: 15, row2: 55, row3: 30},
        '480': {row0: 0, row1: 10, row2: 60, row3: 30},
        '510': {row0: 0, row1: 5, row2: 60, row3: 35},
        '540': {row0: 0, row1: 5, row2: 55, row3: 40},
        '570': {row0: 0, row1: 0, row2: 60, row3: 40},
        '600': {row0: 0, row1: 0, row2: 55, row3: 45},
        'infinity': {row0: 0, row1: 0, row2: 50, row3: 50}
    },
    itemKinds: {
        '60': {plus10: 0.5, plus20: 0.3, minus10: 0, minusNseconds: 0, minusNseconds: 0.1, magnet: 0.05, speedUp: 0.05},
        '120': {plus10: 0.5, plus20: 0.29, minus10: 0, minusNseconds: 0.01, minusNseconds: 0.1, magnet: 0.05, speedUp: 0.05},
        '180': {plus10: 0.45, plus20: 0.28, minus10: 0.05, minusNseconds: 0.02, minusNseconds: 0.1, magnet: 0.05, speedUp: 0.05},
        '240': {plus10: 0.45, plus20: 0.27, minus10: 0.05, minusNseconds: 0.03, minusNseconds: 0.1, magnet: 0.05, speedUp: 0.05},
        '300': {plus10: 0.4, plus20: 0.26, minus10: 0.1, minusNseconds: 0.04, minusNseconds: 0.1, magnet: 0.05, speedUp: 0.05},
        '330': {plus10: 0.41, plus20: 0.25, minus10: 0.1, minusNseconds: 0.05, minusNseconds: 0.1, magnet: 0.04, speedUp: 0.05},
        '360': {plus10: 0.36, plus20: 0.24, minus10: 0.15, minusNseconds: 0.06, minusNseconds: 0.1, magnet: 0.04, speedUp: 0.05},
        '390': {plus10: 0.36, plus20: 0.23, minus10: 0.15, minusNseconds: 0.07, minusNseconds: 0.1, magnet: 0.04, speedUp: 0.05},
        '420': {plus10: 0.32, plus20: 0.22, minus10: 0.2, minusNseconds: 0.07, minusNseconds: 0.1, magnet: 0.03, speedUp: 0.05},
        '450': {plus10: 0.32, plus20: 0.21, minus10: 0.2, minusNseconds: 0.08, minusNseconds: 0.1, magnet: 0.03, speedUp: 0.05},
        '480': {plus10: 0.27, plus20: 0.2, minus10: 0.25, minusNseconds: 0.09, minusNseconds: 0.1, magnet: 0.03, speedUp: 0.05},
        '510': {plus10: 0.28, plus20: 0.19, minus10: 0.25, minusNseconds: 0.1, minusNseconds: 0.1, magnet: 0.02, speedUp: 0.05},
        '540': {plus10: 0.23, plus20: 0.18, minus10: 0.3, minusNseconds: 0.11, minusNseconds: 0.1, magnet: 0.02, speedUp: 0.05},
        '570': {plus10: 0.23, plus20: 0.17, minus10: 0.3, minusNseconds: 0.12, minusNseconds: 0.1, magnet: 0.02, speedUp: 0.05},
        '600': {plus10: 0.19, plus20: 0.16, minus10: 0.35, minusNseconds: 0.13, minusNseconds: 0.1, magnet: 0.01, speedUp: 0.05},
        'infinity': {plus10: 0.19, plus20: 0.16, minus10: 0.35, minusNseconds: 0.13, minusNseconds: 0.1, magnet: 0.01, speedUp: 0.05},
    }

};


export default GAME_CONFIG;