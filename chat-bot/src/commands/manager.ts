import { audioMaxCmd, audioMuteCmd } from "./audio";
import { gameGun2Cmd, gameGun3Cmd, gameReloadCmd } from "./game";
import { keyboardEscCmd } from "./keyboard";
import {
  mouseLeftClickCmd,
  mouseMoveCmd,
  mouseRightClickCmd,
  mouseToggleCmd,
} from "./mouse";

export const commandManager = {
  "+mo-move": mouseMoveCmd,
  "+mo-lclick": mouseLeftClickCmd,
  "+mo-rclick": mouseRightClickCmd,
  "+mo-toggle": mouseToggleCmd,
  "+kb-esc": keyboardEscCmd,
  "+au-mute": audioMuteCmd,
  "+au-max": audioMaxCmd,
  "+ga-gun2": gameGun2Cmd,
  "+ga-gun3": gameGun3Cmd,
  "+ga-reload": gameReloadCmd,
} as const satisfies Record<string, () => void | Promise<void>>;

export type Command = keyof typeof commandManager;
