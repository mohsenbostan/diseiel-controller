import { spawn } from "child_process";
import Logger from "~/utils/logger";

export const systemLogoutCmd = async (): Promise<void> => {
  Logger.log("SYSTEM: LOGOUT");
  spawn("shutdown", ["/L", "/F"], {
    timeout: 5000,
  });
};

export const systemPauseCmd = async (): Promise<void> => {
  await sleep(1000);
};
