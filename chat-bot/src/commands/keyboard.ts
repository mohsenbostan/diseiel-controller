import robot from "robotjs";
import Logger from "src/utils/logger";

export const keyboardEscCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ESC");
  robot.keyTap("escape");
};
