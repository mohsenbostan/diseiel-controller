import robot from "robotjs";

const moveMouseCmd = async (): Promise<void> => {
  console.log("MOVE MOUSE");
  const { x, y } = robot.getMousePos();

  const screenSize = robot.getScreenSize();
  const w = screenSize.width;

  robot.moveMouse(x + w / 2, y - 500);
};

const clickMouseCmd = async (): Promise<void> => {
  console.log("CLICK MOUSE");
  robot.mouseClick("left", true);
};

const toggleMouseCmd = async (): Promise<void> => {
  console.log("TOGGLE MOUSE");
  robot.mouseToggle("down");

  setTimeout(function () {
    robot.mouseToggle("up");
  }, 800);
};

const reloadCmd = async (): Promise<void> => {
  console.log("CLICK RELOAD");
  robot.keyTap("r");
};

const escCmd = async (): Promise<void> => {
  console.log("CLICK ESC");
  robot.keyTap("escape");
};

const commands: Record<string, Function> = {
  "+mouse": moveMouseCmd,
  "+click": clickMouseCmd,
  "+reload": reloadCmd,
  "+esc": escCmd,
  "+toggle": toggleMouseCmd,
};

export default commands;
