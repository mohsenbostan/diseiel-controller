import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";

export const muteAudioCmd = async (): Promise<void> => {
  console.log("MUTED AUDIO");
  NodeAudioVolumeMixer.muteMaster(true);
};

export const maxAudioCmd = async (): Promise<void> => {
  console.log("MAX AUDIO");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};
