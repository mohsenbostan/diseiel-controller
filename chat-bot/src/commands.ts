import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import robot from "robotjs";

const moveMouseCmd = async (): Promise<void> => {
  console.log("MOVE MOUSE");
  const { x, y } = robot.getMousePos();

  const screenSize = robot.getScreenSize();
  const w = screenSize.width;

  robot.moveMouse(x + w / 2, y - 500);
};

const leftClickMouseCmd = async (): Promise<void> => {
  console.log("LEFT CLICK MOUSE");
  robot.mouseClick("left", true);
};

const rightClickMouseCmd = async (): Promise<void> => {
  console.log("RIGHT CLICK MOUSE");
  robot.mouseClick("right", true);
};

const toggleMouseCmd = async (): Promise<void> => {
  console.log("TOGGLE MOUSE");
  robot.mouseToggle("down");

  setTimeout(function () {
    robot.mouseToggle("up");
  }, 800);
};

const gameReloadCmd = async (): Promise<void> => {
  console.log("CLICK RELOAD");
  robot.keyTap("r");
};

const gameGun2Cmd = async (): Promise<void> => {
  console.log("CHANGE GUN");
  robot.keyTap("2");
};

const gameGun3Cmd = async (): Promise<void> => {
  console.log("CHANGE GUN");
  robot.keyTap("3");
};

const escCmd = async (): Promise<void> => {
  console.log("CLICK ESC");
  robot.keyTap("escape");
};

const muteCmd = async (): Promise<void> => {
  console.log("MUTED AUDIO");
  NodeAudioVolumeMixer.muteMaster(true);
};

const maxAudioCmd = async (): Promise<void> => {
  console.log("MAX AUDIO");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};

const commands: Record<string, Function> = {
  "+mo-move": moveMouseCmd,
  "+mo-lclick": leftClickMouseCmd,
  "+mo-rclick": rightClickMouseCmd,
  "+mo-toggle": toggleMouseCmd,
  "+kb-esc": escCmd,
  "+au-mute": muteCmd,
  "+au-max": maxAudioCmd,
  "+ga-gun2": gameGun2Cmd,
  "+ga-gun3": gameGun3Cmd,
  "+ga-reload": gameReloadCmd,
};

export default commands;
