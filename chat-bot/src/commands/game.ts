import robot from "robotjs";
import Logger from "~/utils/logger";

export const gameReloadCmd = async (): Promise<void> => {
  Logger.log("GAME: RELOAD");
  robot.keyTap("r");
};

export const gameChatCmd = async (): Promise<void> => {
  Logger.log("GAME: CHAT");
  robot.keyToggle("shift", "down");
  robot.keyTap("enter");
  robot.keyToggle("shift", "up");

  robot.typeStringDelayed("nt", 450);

  robot.keyTap("enter");
};

export const gameProneCmd = async (): Promise<void> => {
  Logger.log("GAME: PRONE");
  robot.keyTap("z");
};

export const gameTabCmd = async (): Promise<void> => {
  Logger.log("GAME: TAB");
  robot.keyToggle("tab", "down");

  setTimeout(() => robot.keyToggle("tab", "up"), 1500);
};

export const gameMapCmd = async (): Promise<void> => {
  Logger.log("GAME: MAP");
  robot.keyTap("m");
};

export const gameGun1Cmd = async (): Promise<void> => {
  Logger.log("GAME: SWITCH TO GUN 1");
  robot.keyTap("1");
};

export const gameGun2Cmd = async (): Promise<void> => {
  Logger.log("GAME: SWITCH TO GUN 2");
  robot.keyTap("2");
};

export const gameGun3Cmd = async (): Promise<void> => {
  Logger.log("GAME: SWITCH TO GUN 3");
  robot.keyTap("3");
};
