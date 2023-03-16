import robot from "robotjs";
import Logger from "~/utils/logger";

export const keyboardEscCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ESC");
  robot.keyTap("escape");
};

export const keyboardSpaceCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: SPACE");
  robot.keyTap("space");
};

export const keyboardFCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: F");
  robot.keyTap("f");
};

export const keyboardCCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: C");
  robot.keyTap("c");
};

export const keyboardXCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: X");
  robot.keyTap("x");
};

export const keyboardYCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: Y");
  robot.keyTap("y");
};

export const keyboardQCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: Q");
  robot.keyTap("q");
};

export const keyboardECmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: E");
  robot.keyTap("e");
};

export const keyboardGCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: G");
  robot.keyTap("g");
};

export const keyboardAltCmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ALT");
  robot.keyToggle("alt", "down");

  setTimeout(() => {
    robot.keyToggle("alt", "up");
  }, 400);
};

export const keyboardAltF4Cmd = async (): Promise<void> => {
  Logger.log("KEYBOARD: ALT+F4");
  robot.keyToggle("alt", "down");
  robot.keyTap("f4");
  robot.keyTap("enter");

  setTimeout(() => {
    robot.keyToggle("alt", "up");
  }, 200);
};
