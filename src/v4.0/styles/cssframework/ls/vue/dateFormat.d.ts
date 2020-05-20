
export interface LsDateFormat {
    /** Show an info message */
    (date: Date, fmt:string): string
}

declare module 'vue/types/vue' {
    interface Vue {
        /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
        $dateFormat: LsDateFormat
    }
}