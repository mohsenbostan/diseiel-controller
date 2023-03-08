import { NodeAudioVolumeMixer } from "node-audio-volume-mixer";
import Logger from "~/utils/logger";
import playSound from "play-sound";
import * as path from "path";

export const audioTrollCmd = async (): Promise<void> => {
  Logger.log("AUDIO: TROLL");

  const player = playSound();
  player.play(path.resolve("../../static/sample.mp3"), {}, function (err) {
    if (err) Logger.error("Sadge no troll");
  });
};

export const audioMuteCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MUTED");
  NodeAudioVolumeMixer.muteMaster(true);
};

export const audioMaxCmd = async (): Promise<void> => {
  Logger.log("AUDIO: MAXED");
  NodeAudioVolumeMixer.setMasterVolumeLevelScalar(1);
};
