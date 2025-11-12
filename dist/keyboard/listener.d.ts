import { KeyboardEvents, KeyEvent } from '../types/keyboard';
export declare class Listener {
    private listeners;
    isRunning: boolean;
    on<K extends keyof KeyboardEvents>(event: K, callback: (eventData: KeyboardEvents[K]) => void): void;
    off<K extends keyof KeyboardEvents>(event: K, callback: (eventData: KeyboardEvents[K]) => void): void;
    once<K extends keyof KeyboardEvents>(event: K, callback: (eventData: KeyboardEvents[K]) => void): void;
    listen(callback: (eventData: KeyEvent) => void): void;
    private _emit;
    startListener(interval?: number): Promise<void>;
    stopListener(): void;
}
//# sourceMappingURL=listener.d.ts.map