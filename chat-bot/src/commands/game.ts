import robot from "robotjs";
import Logger from "~/utils/logger";

export const gameReloadCmd = async (): Promise<void> => {
  Logger.log("GAME: RELOAD");
  robot.keyTap("r");
};

export const gameGun2Cmd = async (): Promise<void> => {
  Logger.log("GAME: SWITCH TO GUN 2");
  robot.keyTap("2");
};

export const gameGun3Cmd = async (): Promise<void> => {
  Logger.log("GAME: SWITCH TO GUN 3");
  robot.keyTap("3");
};
