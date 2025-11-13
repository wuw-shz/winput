export declare abstract class ListenerBase<EventMap extends Record<string, any>> {
    protected listeners: Map<keyof EventMap, Set<(ev: any) => void>>;
    isRunning: boolean;
    on<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    off<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    once<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    protected _emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void;
    start(interval?: number): Promise<void>;
    stop(): void;
    protected abstract run(interval: number): Promise<void>;
}
//# sourceMappingURL=listener.d.ts.map