import robot from "robotjs";

export const escCmd = async (): Promise<void> => {
  console.log("KEYBOARD: ESC");
  robot.keyTap("escape");
};
