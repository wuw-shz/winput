type OnEventProxy<EventMap extends Record<string, any>> = {
    readonly [K in keyof EventMap]: (callback: (ev: EventMap[K]) => void) => void;
};
type OffEventProxy<EventMap extends Record<string, any>> = {
    readonly [K in keyof EventMap]: (callback: (ev: EventMap[K]) => void) => void;
};
type OnceEventProxy<EventMap extends Record<string, any>> = {
    readonly [K in keyof EventMap]: (callback: (ev: EventMap[K]) => void) => void;
};
type ListenProxy<EventMap extends Record<string, any>> = {
    (callback: (ev: EventMap[keyof EventMap]) => void): void;
};
/**
 * Abstract base class for event listeners.
 * Provides a typed event emitter pattern with start/stop lifecycle management.
 * Supports fluent property-based API with function call syntax.
 *
 * @template EventMap - Record mapping event names to their payload types
 *
 * @example
 * // Fluent API - Function call (recommended)
 * listener.on.eventname((ev) => console.log(ev))
 * listener.off.eventname(callback)
 * listener.once.eventname((ev) => console.log(ev))
 */
export declare abstract class ListenerBase<EventMap extends Record<string, any>> {
    protected listeners: Map<keyof EventMap, Set<(ev: any) => void>>;
    /** Whether the listener is currently running */
    isRunning: boolean;
    private startPromise;
    private _onProxy;
    private _offProxy;
    private _onceProxy;
    private _listenProxy;
    /**
     * Fluent API for registering event handlers.
     * @example listener.on.down((ev) => console.log(ev))
     */
    get on(): OnEventProxy<EventMap>;
    /**
     * Fluent API for removing event handlers.
     * @example listener.off.down(callback)
     */
    get off(): OffEventProxy<EventMap>;
    /**
     * Fluent API for registering one-time event handlers.
     * @example listener.once.down((ev) => console.log(ev))
     */
    get once(): OnceEventProxy<EventMap>;
    /**
     * Register a general event handler that receives all events.
     * @example listener.listen((ev) => console.log(ev.event, ev))
     */
    get listen(): ListenProxy<EventMap>;
    /**
     * Remove a general event handler.
     * @example listener.unlisten(callback)
     */
    unlisten(callback: (ev: EventMap[keyof EventMap]) => void): void;
    /**
     * Internal method to register an event handler.
     */
    private _on;
    /**
     * Internal method to remove an event handler.
     */
    private _off;
    /**
     * Internal method to register a one-time event handler.
     */
    private _once;
    /**
     * Start the listener loop (non-blocking, runs in background).
     * @param interval - Polling interval in milliseconds (default: 8)
     * @returns Promise that resolves when listener stops
     */
    start(interval?: number): Promise<void>;
    /**
     * Stop the listener loop.
     * @returns Promise that resolves when listener has fully stopped
     */
    stop(): Promise<void>;
    protected _emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void;
    protected abstract run(interval: number): Promise<void>;
}
export {};
//# sourceMappingURL=listener.d.ts.map