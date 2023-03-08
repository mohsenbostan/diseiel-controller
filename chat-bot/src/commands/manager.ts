import { audioMaxCmd, audioMuteCmd } from "~/commands/audio";
import {
  gameGun2Cmd,
  gameGun3Cmd,
  gameMapCmd,
  gameProneCmd,
  gameReloadCmd,
  gameTabCmd,
} from "~/commands/game";
import {
  keyboardAltCmd,
  keyboardAltF4Cmd,
  keyboardCCmd,
  keyboardECmd,
  keyboardEscCmd,
  keyboardFCmd,
  keyboardGCmd,
  keyboardQCmd,
  keyboardSpaceCmd,
  keyboardXCmd,
  keyboardYCmd,
} from "~/commands/keyboard";
import {
  mouseLeftClickCmd,
  mouseMoveCmd,
  mouseRightClickCmd,
  mouseToggleCmd,
} from "~/commands/mouse";
import { systemLogoutCmd } from "./system";

export const commandManager = {
  "+mo-move": mouseMoveCmd,
  "+mo-lclick": mouseLeftClickCmd,
  "+mo-rclick": mouseRightClickCmd,
  "+mo-toggle": mouseToggleCmd,
  "+kb-esc": keyboardEscCmd,
  "+kb-f": keyboardFCmd,
  "+kb-e": keyboardECmd,
  "+kb-x": keyboardXCmd,
  "+kb-c": keyboardCCmd,
  "+kb-q": keyboardQCmd,
  "+kb-y": keyboardYCmd,
  "+kb-g": keyboardGCmd,
  "+kb-space": keyboardSpaceCmd,
  "-kb-altf4": keyboardAltF4Cmd,
  "+kb-alt": keyboardAltCmd,
  "-au-mute": audioMuteCmd,
  "-au-max": audioMaxCmd,
  "+ga-map": gameMapCmd,
  "+ga-tab": gameTabCmd,
  "+ga-prone": gameProneCmd,
  "+ga-gun2": gameGun2Cmd,
  "+ga-gun3": gameGun3Cmd,
  "+ga-reload": gameReloadCmd,
  "-sy-logout": systemLogoutCmd,
} as const satisfies Record<string, () => void | Promise<void>>;

export type ChannelPointCommand = `-${string}`;
export type Command = Exclude<keyof typeof commandManager, ChannelPointCommand>;

export const isChannelPoint = (cmd: string) => cmd.charAt(0) === "-";
