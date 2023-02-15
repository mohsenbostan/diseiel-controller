import chalk from "chalk";

class Logger {
  static log(...text: Array<unknown>): void {
    console.log(chalk.whiteBright.bold(...text));
  }

  static warning(...text: Array<unknown>): void {
    console.log(chalk.blackBright.bgYellow(...text));
  }

  static info(...text: Array<unknown>): void {
    console.log(chalk.whiteBright.bgCyan(...text));
  }

  static error(...text: Array<unknown>): void {
    console.log(chalk.redBright(...text));
  }
}

export default Logger;
