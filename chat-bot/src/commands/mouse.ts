import robot from "robotjs";
import Logger from "~/utils/logger";

export const mouseMoveCmd = async (): Promise<void> => {
  Logger.log("MOUSE: MOVE CURSOR");
  const { x, y } = robot.getMousePos();

  const screenSize = robot.getScreenSize();
  const w = screenSize.width;

  robot.moveMouse(x + w / 2, y - 500);
};

export const mouseLeftClickCmd = async (): Promise<void> => {
  Logger.log("MOUSE: LEFT CLICK");
  robot.mouseClick("left", true);
};

export const mouseRightClickCmd = async (): Promise<void> => {
  Logger.log("MOUSE: RIGHT CLICK");
  robot.mouseClick("right", true);
};

export const mouseToggleCmd = async (): Promise<void> => {
  Logger.log("MOUSE: TOGGLED");
  robot.mouseToggle("down");

  setTimeout(function () {
    robot.mouseToggle("up");
  }, 800);
};
