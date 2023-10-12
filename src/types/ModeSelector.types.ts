export interface IMode {
    mode: ModesEnum
    maxCol: number
    maxRow: number
    maxBombs: number
}

export const enum ModesEnum {
    EASY = 'Fácil',
    MEDIUM = 'Medio',
    HARD = 'Difícil'
}