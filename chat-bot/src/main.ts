import * as dotenv from "dotenv";
import tmi from "tmi.js";
import { z } from "zod";
import commands from "./commands";

// Process Config
dotenv.config();

const configSchema = z.object({
  TWITCH_CHANNELS: z.string(),
});

const config = configSchema.parse(process.env);

(async () => {
  let lastUsed = Date.now();
  const twitchClient = new tmi.Client({
    channels: config.TWITCH_CHANNELS.split(","),
  });

  await twitchClient.connect().catch(console.error);
  console.info("Twitch Bot Connected...");

  twitchClient.on("message", async (_channel, tags, message, _self) => {
    if ((Date.now() - lastUsed) / 1000 >= 15 && (tags.mod || tags.subscriber)) {
      if (!(message in commands)) return;

      lastUsed = Date.now();
      await commands[message]!();
    }
  });
})();
