import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import Logger from "~/utils/logger";
import open from "open";

export const audioTrollCmd = async (): Promise<void> => {
  Logger.log("AUDIO: TROLL");
  await open("https://youtu.be/dQw4w9WgXcQ");
};

export const audioMuteCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MUTED");
  NodeAudioVolumeMixer.muteMaster(true);
};

export const audioMaxCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MAXED");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};
