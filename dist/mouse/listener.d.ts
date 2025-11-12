import { MouseEvents } from '../types/mouse';
export declare class Listener {
    private listeners;
    isRunning: boolean;
    on<K extends keyof MouseEvents>(event: K, callback: (eventData: MouseEvents[K]) => void): void;
    off<K extends keyof MouseEvents>(event: K, callback: (eventData: MouseEvents[K]) => void): void;
    once<K extends keyof MouseEvents>(event: K, callback: (eventData: MouseEvents[K]) => void): void;
    listen(callback: (eventData: MouseEvents[keyof MouseEvents]) => void): void;
    private _emit;
    startListener(interval?: number): Promise<void>;
    stopListener(): void;
}
//# sourceMappingURL=listener.d.ts.map