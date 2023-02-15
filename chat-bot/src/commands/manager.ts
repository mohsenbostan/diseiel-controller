import { audioMaxCmd, audioMuteCmd } from "./audio";
import { gameGun2Cmd, gameGun3Cmd, gameReloadCmd } from "./game";
import { keyboardAltF4Cmd, keyboardEscCmd } from "./keyboard";
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
  "-kb-altf4": keyboardAltF4Cmd,
  "-au-mute": audioMuteCmd,
  "-au-max": audioMaxCmd,
  "+ga-gun2": gameGun2Cmd,
  "+ga-gun3": gameGun3Cmd,
  "+ga-reload": gameReloadCmd,
} as const satisfies Record<string, () => void | Promise<void>>;

export type ChannelPointCommand = `-{string}`;
export type Command = Exclude<keyof typeof commandManager, ChannelPointCommand>;

export const isChannelPoint = (cmd: string) => cmd.charAt(0) === "-";
