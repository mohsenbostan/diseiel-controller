import robot from "robotjs";

export const escCmd = async (): Promise<void> => {
  console.log("CLICK ESC");
  robot.keyTap("escape");
};
