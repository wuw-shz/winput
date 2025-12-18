/**
 * Abstract base class for event listeners.
 * Provides a typed event emitter pattern with start/stop lifecycle management.
 *
 * @template EventMap - Record mapping event names to their payload types
 */
export abstract class ListenerBase<EventMap extends Record<string, any>> {
   protected listeners = new Map<keyof EventMap, Set<(ev: any) => void>>()
   /** Whether the listener is currently running */
   public isRunning = false
   private startPromise: Promise<void> | null = null

   /**
    * Register an event handler.
    * @param event - Event name to listen for
    * @param cb - Callback function to invoke when event fires
    */
   on<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void) {
      if (!this.listeners.has(event)) {
         this.listeners.set(event, new Set())
      }
      this.listeners.get(event)!.add(cb as (ev: any) => void)
   }

   /**
    * Remove an event handler.
    * @param event - Event name to stop listening for
    * @param cb - Callback function to remove
    */
   off<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void) {
      this.listeners.get(event)?.delete(cb as (ev: any) => void)
   }

   /**
    * Register a one-time event handler (automatically removed after first call).
    * @param event - Event name to listen for
    * @param cb - Callback function to invoke once
    */
   once<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void) {
      const wrapper = (ev: EventMap[K]) => {
         try {
            cb(ev)
         } finally {
            this.off(event, wrapper)
         }
      }
      this.on(event, wrapper)
   }

   /**
    * Emit an event to all registered handlers.
    * @param event - Event name to emit
    * @param data - Event payload data
    * @internal
    */
   protected _emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
      this.listeners.get(event)?.forEach((fn) => {
         try {
            fn(data)
         } catch (err) {
            console.error(`Listener error [${String(event)}]:`, err)
         }
      })
   }

   /**
    * Start the listener loop (non-blocking, runs in background).
    * @param interval - Polling interval in milliseconds (default: 8)
    * @returns Promise that resolves when listener stops
    */
   async start(interval = 8): Promise<void> {
      if (this.isRunning) {
         console.warn('Listener already running')
         return this.startPromise ?? Promise.resolve()
      }

      this.isRunning = true
      this.startPromise = (async () => {
         try {
            await this.run(interval)
         } catch (err) {
            console.error('Listener run error:', err)
         } finally {
            this.isRunning = false
            this.startPromise = null
         }
      })()

      return this.startPromise
   }

   /**
    * Stop the listener loop.
    * @returns Promise that resolves when listener has fully stopped
    */
   async stop(): Promise<void> {
      this.isRunning = false
      if (this.startPromise) {
         await this.startPromise
      }
   }

   /**
    * Abstract method to implement the polling loop.
    * @param interval - Polling interval in milliseconds
    * @internal
    */
   protected abstract run(interval: number): Promise<void>
}

