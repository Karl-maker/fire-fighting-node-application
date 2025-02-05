import { Logger } from "./interface.logging";

export class ConsoleLogger implements Logger {
    log(...args: any[]): void {
        console.log("[LOG]", ...args);
    }

    debug(...args: any[]): void {
        console.log("[DEBUG]", ...args);
    }

    info(...args: any[]): void {
        console.info("[INFO]", ...args);
    }

    warn(...args: any[]): void {
        console.warn("[WARN]", ...args);
    }

    error(...args: any[]): void {
        console.error("[ERROR]", ...args);
    }
}
