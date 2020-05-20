export interface ThenFunc {
    ():void
}

export interface CatchFunc {
    ():void
}

export class DownloadEx {
    constructor(status: boolean)
    then(func: ThenFunc): DownloadEx
    catch(func: CatchFunc): DownloadEx
}

export interface Download {
    (url: string, param: object, filename: string) : DownloadEx
}

declare module 'vue/types/vue' {
    interface Vue {
        /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
        $download: Download
    }
}