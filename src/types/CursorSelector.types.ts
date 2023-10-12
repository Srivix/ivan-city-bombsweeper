export interface ICursor {
    cursor: CursorEnum
    icon: string
}

export const enum CursorEnum {
    OPEN = 'open',
    FLAG = 'flag',
    DOUBT = 'doubt',
}