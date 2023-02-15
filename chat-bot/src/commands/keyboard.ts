import robot from "robotjs";
import Logger from "src/utils/logger";

export const keyboardEscCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ESC");
  robot.keyTap("escape");
};

export const keyboardSpaceCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: SPACE");
  robot.keyTap("space");
};

export const keyboardAltF4Cmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ALT+F4");
  robot.keyToggle("alt", "down");
  robot.keyTap("f4");

  setTimeout(() => {
    robot.keyToggle("alt", "up");
  }, 200);
};