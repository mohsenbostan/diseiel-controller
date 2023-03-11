import * as fs from "fs/promises";
import { Command } from "./commands/manager";
import Logger from "./utils/logger";

export type Alias = {
  channel: string;
  name: string;
  combo: Command[];
};

export async function addAlias({ channel, name, combo }: Alias) {
  if (await getAlias(name, channel)) return;

  Logger.log(`COMBO ADDED: ${name}`);
  await fs.appendFile(
    "db",
    JSON.stringify({
      channel,
      name,
      combo,
    }) + "\n",
  );
}

export async function getAlias(
  name: string,
  channel: string,
): Promise<Command[] | undefined> {
  try {
    await fs.stat("db");
  } catch (err) {
    await fs.writeFile("db", "");
  }

  const data = (
    await fs.readFile("db", {
      encoding: "utf-8",
    })
  )
    .split("\n")
    .filter(Boolean)
    .map((x) => JSON.parse(x) as Alias)
    .find((x) => {
      return x.name === name && x.channel === channel;
    });

  if (!data) return;

  Logger.log(`COMBO USED: ${name}`);
  return data.combo;
}
