/**
 * Abstract base class for event listeners.
 * Provides a typed event emitter pattern with start/stop lifecycle management.
 *
 * @template EventMap - Record mapping event names to their payload types
 */
export declare abstract class ListenerBase<EventMap extends Record<string, any>> {
    protected listeners: Map<keyof EventMap, Set<(ev: any) => void>>;
    /** Whether the listener is currently running */
    isRunning: boolean;
    private startPromise;
    /**
     * Register an event handler.
     * @param event - Event name to listen for
     * @param cb - Callback function to invoke when event fires
     */
    on<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    /**
     * Remove an event handler.
     * @param event - Event name to stop listening for
     * @param cb - Callback function to remove
     */
    off<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    /**
     * Register a one-time event handler (automatically removed after first call).
     * @param event - Event name to listen for
     * @param cb - Callback function to invoke once
     */
    once<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void): void;
    /**
     * Emit an event to all registered handlers.
     * @param event - Event name to emit
     * @param data - Event payload data
     * @internal
     */
    protected _emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void;
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
    /**
     * Abstract method to implement the polling loop.
     * @param interval - Polling interval in milliseconds
     * @internal
     */
    protected abstract run(interval: number): Promise<void>;
}
//# sourceMappingURL=listener.d.ts.map