import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";

export const muteAudioCmd = async (): Promise<void> => {
  console.log("AUDIO: MUTED");
  NodeAudioVolumeMixer.muteMaster(true);
};

export const maxAudioCmd = async (): Promise<void> => {
  console.log("AUDIO: MAXED");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};
