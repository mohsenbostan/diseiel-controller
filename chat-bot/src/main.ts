import * as dotenv from "dotenv";
import tmi from "tmi.js";
import { z } from "zod";
import { Command, commandManager } from "./commands";
import Logger from "./utils/logger";

async function main() {

// Process Config
  dotenv.config();

  const configSchema = z.object({
    TWITCH_CHANNELS: z.string(),
  });
  const config = configSchema.parse(process.env);
  const THROTTLE = 15;

  // State
  const usageMap = new Map<Command, number>();

  const twitchClient = new tmi.Client({
    channels: config.TWITCH_CHANNELS.split(","),
  });

  await twitchClient.connect().catch(Logger.error);
  Logger.info("Twitch Bot Connected...");

  twitchClient.on("message", async (channel, tags, message, _self) => {
    if (
      tags.username === channel.replace("#", "") ||
      tags.mod ||
      tags.subscriber
    ) {
      if (!(message in commandManager)) return;

      const cmd = message as Command;

      if (!usageMap.has(cmd)) usageMap.set(cmd, Date.now() - THROTTLE * 1000);

      const lastUsed = usageMap.get(cmd) || Date.now() - THROTTLE * 1000;

      if ((Date.now() - lastUsed) / 1000 >= THROTTLE) {
        await commandManager[cmd]!();
      }
    }
  });
};

main().catch(Logger.error);