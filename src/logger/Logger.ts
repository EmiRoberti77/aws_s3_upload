export enum Level {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export class Logger {
  public static log(out: string, level: Level = Level.INFO): void {
    const timestamp = new Date().toISOString();
    const logout = `[${timestamp}]-[${level}]-${out}`;
    console.log(logout);
  }
}
