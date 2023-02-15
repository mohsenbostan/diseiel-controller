import { maxAudioCmd, muteAudioCmd } from "./audio";
import { gameGun2Cmd, gameGun3Cmd, gameReloadCmd } from "./game";
import { escCmd } from "./keyboard";
import {
  leftClickMouseCmd,
  moveMouseCmd,
  rightClickMouseCmd,
  toggleMouseCmd,
} from "./mouse";

export const commandManager: Record<string, Function> = {
  "+mo-move": moveMouseCmd,
  "+mo-lclick": leftClickMouseCmd,
  "+mo-rclick": rightClickMouseCmd,
  "+mo-toggle": toggleMouseCmd,
  "+kb-esc": escCmd,
  "+au-mute": muteAudioCmd,
  "+au-max": maxAudioCmd,
  "+ga-gun2": gameGun2Cmd,
  "+ga-gun3": gameGun3Cmd,
  "+ga-reload": gameReloadCmd,
};
