import { StaticAuthProvider } from "@twurple/auth";
import { PubSubClient } from "@twurple/pubsub";
import * as dotenv from "dotenv";
import tmi from "tmi.js";
import { z } from "zod";
import "zx/globals";
import { Command, commandManager, isChannelPoint } from "~/commands";
import Logger from "~/utils/logger";
import { addAlias, getAlias } from "./db";

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
  const strictedCommands: Command[] = ["+kb-alt", "+ga-chat", "+au-troll"];
  let isActive = true;

  const twitchClient = new tmi.Client({
    channels: config.TWITCH_CHANNELS.split(","),
  });

  await twitchClient.connect().catch(Logger.error);
  Logger.info("Twitch Bot Connected...");

  twitchClient.on("message", async (channel, tags, message) => {
    if (
      message.indexOf("#enable") &&
      (tags.mod || tags.username === channel.replace("#", ""))
    ) {
      Logger.error("BOT ENABLED");
      isActive = true;
    }

    if (
      message.indexOf("#disable") &&
      (tags.mod || tags.username === channel.replace("#", ""))
    ) {
      Logger.error("BOT DISABLED");
      isActive = false;
    }

    if (
      (tags.username === channel.replace("#", "") ||
        tags.mod ||
        tags.subscriber) &&
      isActive
    ) {
      if (isChannelPoint(message)) return;

      if (tags.mod && message.indexOf("#add-als") === 0) {
        const addAliasMessage = message.split(" ").filter(Boolean);
        addAliasMessage.shift();
        const alias = addAliasMessage[0]
          ?.split("|")
          .filter(Boolean)
          .map((x) => x.trim());

        if (alias && alias.length > 1) {
          const name = alias.shift() as string;
          if (
            name.charAt(0) === "#" &&
            name !== "#add-als" &&
            name.charAt(1) === channel.charAt(1) &&
            alias.length <= 4
          ) {
            await addAlias({
              channel,
              name,
              combo: alias as Command[],
            });
          }
        }
      }

      let THROTTLE = tags.username?.toLowerCase() === "homelessdev" ? 0 : 35;

      let cmdChain: Command[] | undefined = [];

      if (message.charAt(0) === "#") {
        cmdChain = await getAlias(message, channel);
      } else {
        cmdChain = message
          .split("|")
          .slice(0, 4)
          .map((x) => x.trim()) as Command[];
      }

      if (cmdChain && cmdChain.length > 0) {
        await Promise.all(
          cmdChain.map(async (cmd) => {
            if (!(cmd in commandManager)) return;

            if (strictedCommands.includes(cmd as Command)) {
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
      if (strictedCommands.includes(cmd)) {
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
