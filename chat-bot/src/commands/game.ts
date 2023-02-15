import robot from "robotjs";

export const gameReloadCmd = async (): Promise<void> => {
  console.log("CLICK RELOAD");
  robot.keyTap("r");
};

export const gameGun2Cmd = async (): Promise<void> => {
  console.log("CHANGE GUN");
  robot.keyTap("2");
};

export const gameGun3Cmd = async (): Promise<void> => {
  console.log("CHANGE GUN");
  robot.keyTap("3");
};
