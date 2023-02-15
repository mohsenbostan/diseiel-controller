import robot from "robotjs";

export const gameReloadCmd = async (): Promise<void> => {
  console.log("GAME: RELOAD");
  robot.keyTap("r");
};

export const gameGun2Cmd = async (): Promise<void> => {
  console.log("GAME: SWITCH TO GUN 2");
  robot.keyTap("2");
};

export const gameGun3Cmd = async (): Promise<void> => {
  console.log("GAME: SWITCH TO GUN 3");
  robot.keyTap("3");
};
