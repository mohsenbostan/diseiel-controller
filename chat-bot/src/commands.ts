import robot from "robotjs";

const moveMouseCmd = async (): Promise<void> => {
  console.log("MOVE MOUSE");
  const { x, y } = robot.getMousePos();
  robot.moveMouse(x + 30, y - 50);
};

const clickMouseCmd = async (): Promise<void> => {
  console.log("CLICK MOUSE");
  robot.mouseClick();
};

const commands: Record<string, Function> = {
  "+mouse": moveMouseCmd,
  "+click": clickMouseCmd,
};

export default commands;
