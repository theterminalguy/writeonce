export class AppLogger {
  constructor(private readonly name: string) {
    this.name = name;
  }

  isDev: boolean =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";

  warn(...message: Array<string | object>) {
    switch (this.isDev) {
      case true:
        console.warn(`%c${this.name}`, "color: yellow", ...message);
        break;

      default:
        break;
    }
  }
  debug(...message: Array<string | object>) {
    switch (this.isDev) {
      case true:
        console.debug(`%c${this.name}`, "color: brown", ...message);
        break;

      default:
        break;
    }
  }
  info(...message: Array<string | object>) {
    switch (this.isDev) {
      case true:
        console.info(`%c${this.name}`, "color: blue", ...message);
        break;

      default:
        break;
    }
  }
  error(...message: Array<string | object>) {
    switch (this.isDev) {
      case true:
        console.error(`%c${this.name}`, "color: red", ...message);
        break;

      default:
        break;
    }
  }
}
