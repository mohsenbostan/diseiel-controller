import { StaticAuthProvider } from "@twurple/auth";
import { PubSubClient } from "@twurple/pubsub";
import * as dotenv from "dotenv";
import tmi from "tmi.js";
import { z } from "zod";
import "zx/globals";
import { Command, commandManager, isChannelPoint } from "~/commands";
import Logger from "~/utils/logger";

setInterval(async () => {
  const hasChanged = await $`git pull`;
  if (!hasChanged.stdout.includes("Already up to date.")) {
    await $`yarn pull`;
    process.exit(0);
  }
}, 10000);

async function main() {
  // Process Config
  dotenv.config();

  Logger.info("Docs: https://diseiel-controller.vercel.app");
  Logger.info("Support [Discord]: HomelessDev#0001");

  const configSchema = z.object({
    TWITCH_CHANNELS: z.string(),
    TWITCH_CLIENT_ID: z.string(),
    TWITCH_ACCESS: z.string(),
    TWITCH_USER_ID: z.string(),
  });
  const config = configSchema.parse(process.env);

  // State
  const usageMap = new Map<string, number>();
  const strictCommands: Command[] = ["+kb-alt", "+ga-chat", "+au-troll"];

  const twitchClient = new tmi.Client({
    channels: config.TWITCH_CHANNELS.split(","),
  });

  await twitchClient.connect().catch(Logger.error);
  Logger.info("Twitch Bot Connected...");

  twitchClient.on("message", async (channel, tags, message) => {
    if (
      tags.username === channel.replace("#", "") ||
      tags.mod ||
      tags.subscriber
    ) {
      if (isChannelPoint(message)) return;

      let THROTTLE = tags.username?.toLowerCase() === "homelessdev" ? 0 : 35;

      const cmdChain = message.split("|").slice(0, 4);
      if (cmdChain.length > 0) {
        await Promise.all(
          cmdChain.map(async (cmd) => {
            cmd = cmd.trim();

            if (!(cmd in commandManager)) return;

            if (strictCommands.includes(cmd as Command)) {
              THROTTLE += 15;
            }

            if (!usageMap.has(cmd))
              usageMap.set(cmd, Date.now() - THROTTLE * 1000);

            const lastUsed = usageMap.get(cmd) as number;

            if ((Date.now() - lastUsed) / 1000 >= THROTTLE) {
              await commandManager[cmd as Command]();
              usageMap.set(cmd, Date.now());
            }
          }),
        );
        return;
      }
      if (!(message in commandManager)) return;

      const cmd = message as Command;
      if (strictCommands.includes(cmd)) {
        THROTTLE += 15;
      }

      if (!usageMap.has(cmd)) usageMap.set(cmd, Date.now() - THROTTLE * 1000);

      const lastUsed = usageMap.get(cmd) as number;

      if ((Date.now() - lastUsed) / 1000 >= THROTTLE) {
        await commandManager[cmd]();
        usageMap.set(cmd, Date.now());
      }
    }
  });

  // Channel Redemptions
  const authProvider = new StaticAuthProvider(
    config.TWITCH_CLIENT_ID,
    config.TWITCH_ACCESS,
  );

  const pubSubClient = new PubSubClient();
  await pubSubClient.registerUserListener(authProvider);

  await pubSubClient.onRedemption(config.TWITCH_USER_ID, async (message) => {
    const title = message.rewardTitle.toLowerCase();

    if (title === "ctrl: max audio") {
      await commandManager["-au-max"]();
    }

    if (title === "ctrl: mute audio") {
      await commandManager["-au-mute"]();
    }

    if (title === "ctrl: exit") {
      await commandManager["-kb-altf4"]();
    }

    if (title === "ctrl: logout pc") {
      await commandManager["-sy-logout"]();
    }
  });
}

main().catch(Logger.error);
