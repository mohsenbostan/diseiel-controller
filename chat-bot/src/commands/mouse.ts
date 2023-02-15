import robot from "robotjs";

export const moveMouseCmd = async (): Promise<void> => {
  console.log("MOUSE: MOVE CURSOR");
  const { x, y } = robot.getMousePos();

  const screenSize = robot.getScreenSize();
  const w = screenSize.width;

  robot.moveMouse(x + w / 2, y - 500);
};

export const leftClickMouseCmd = async (): Promise<void> => {
  console.log("MOUSE: LEFT CLICK");
  robot.mouseClick("left", true);
};

export const rightClickMouseCmd = async (): Promise<void> => {
  console.log("MOUSE: RIGHT CLICK");
  robot.mouseClick("right", true);
};

export const toggleMouseCmd = async (): Promise<void> => {
  console.log("MOUSE: TOGGLED");
  robot.mouseToggle("down");

  setTimeout(function () {
    robot.mouseToggle("up");
  }, 800);
};
