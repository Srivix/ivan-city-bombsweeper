import { IMode, ModesEnum } from "@/types/ModeSelector.types";

export const selectorModes: IMode[] = [
    {mode: ModesEnum.EASY, maxCol: 8, maxRow: 8, maxBombs: 10},
    {mode: ModesEnum.MEDIUM, maxCol: 16, maxRow: 16, maxBombs: 40},
    {mode: ModesEnum.HARD, maxCol: 16, maxRow: 30, maxBombs: 99},
]