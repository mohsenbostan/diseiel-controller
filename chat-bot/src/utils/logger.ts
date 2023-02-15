import chalk from "chalk";

class Logger {
  static log(...text: Array<unknown>): void {
    console.log(chalk.bgWhite(...text));
  }

  static warning(...text: Array<unknown>): void {
    console.log(chalk.bgYellow(...text));
  }

  static info(...text: Array<unknown>): void {
    console.log(chalk.bgCyan(...text));
  }

  static error(...text: Array<unknown>): void {
    console.log(chalk.bgRedBright(...text));
  }
}

export default Logger;
