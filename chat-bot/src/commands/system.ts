import { spawn } from "child_process";
import robot from "robotjs";
import Logger from "~/utils/logger";

export const systemTaskManagerCmd = async (): Promise<void> => {
  // #DISABLED
  return;
  Logger.log("KEYBOARD: TASK MANAGER");
  robot.keyToggle("control", "down");
  robot.keyToggle("shift", "down");
  robot.keyToggle("escape", "down");
  robot.keyToggle("control", "up");
  robot.keyToggle("shift", "up");
  robot.keyToggle("escape", "up");
};

export const systemLogoutCmd = async (): Promise<void> => {
  Logger.log("SYSTEM: LOGOUT");
  spawn("shutdown", ["-1", "-t", "30"]);
};
