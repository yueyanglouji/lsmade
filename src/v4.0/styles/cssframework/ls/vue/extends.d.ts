declare global{
    // @ts-ignore
    export interface Array<T> {
        contains(val: any): boolean
    }
}
export function lsExtends(): void