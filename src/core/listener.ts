export abstract class ListenerBase<EventMap extends Record<string, any>> {
   protected listeners = new Map<keyof EventMap, Set<(ev: any) => void>>()
   public isRunning = false
   private startPromise: Promise<void> | null = null

   on<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void) {
      if (!this.listeners.has(event)) {
         this.listeners.set(event, new Set())
      }
      this.listeners.get(event)!.add(cb as (ev: any) => void)
   }

   off<K extends keyof EventMap>(event: K, cb: (ev: EventMap[K]) => void) {
      this.listeners.get(event)?.delete(cb as (ev: any) => void)
   }

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

   protected _emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
      this.listeners.get(event)?.forEach((fn) => {
         try {
            fn(data)
         } catch (err) {
            console.error(`Listener error [${String(event)}]:`, err)
         }
      })
   }

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

   async stop(): Promise<void> {
      this.isRunning = false
      if (this.startPromise) {
         await this.startPromise
      }
   }

   protected abstract run(interval: number): Promise<void>
}
