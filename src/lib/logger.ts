export class AppLogger {
  constructor(private readonly name: string) {
    this.name = name;
  }

  log(...message: any[]) {
    console.log(`\x1b[1m${this.name}\x1b[0m:`, ...message);
  }
}
