import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import Logger from "~/utils/logger";

export const audioBeepCmd = async (): Promise<void> => {
  Logger.log("AUDIO: BEEP");
  process.stderr.on("\007");
};

export const audioMuteCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MUTED");
  NodeAudioVolumeMixer.muteMaster(true);
};

export const audioMaxCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MAXED");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};
