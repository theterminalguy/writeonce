export class AppLogger {
  constructor(private readonly name: string) {
    this.name = name;
  }

  log(...message: unknown[]) {
    console.log(`\x1b[1m${this.name}\x1b[0m:`, ...message);
  }
  warn(...message: unknown[]) {
    console.warn(`%c${this.name}`, "color: yellow", ...message);
  }
  debug(...message: unknown[]) {
    console.debug(`%c${this.name}`, "color: brown", ...message);
  }
  info(...message: unknown[]) {
    console.info(`%c${this.name}`, "color: blue", ...message);
  }
  error(...message: unknown[]) {
    console.error(`%c${this.name}`, "color: red", ...message);
  }
}
