import { spawn } from "child_process";
import Logger from "~/utils/logger";

export const systemLogoutCmd = async (): Promise<void> => {
  Logger.log("SYSTEM: LOGOUT");
  spawn("shutdown", ["-1", "-t", "30"]);
};
