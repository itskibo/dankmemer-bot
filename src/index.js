const Discord = require("discord.js");
const plsBegAction = require("./actions/pls-beg");
const plsDepAllAction = require("./actions/pls-dep-all");
const plsFishAction = require("./actions/pls-fish");
const utils = require("./utils");

const actions = new Set([plsBegAction, plsFishAction, plsDepAllAction]);

const config = new Map([
  [
    "token",
    "YOUR_TOKEN_HERE",
  ],
  ["guildId", "YOUR_GUILD_ID_HERE"],
  ["channelId", "YOUR_CHANNEL_ID_HERE"],
  ["ownerId", "YOUR_USER_ID_HERE"],
]);

const cache = new Map([
  ["actions", actions],
  ["running", false],
  ["timeouts", []],
]);

const client = new Discord.Client({});

client.once("ready", () => {
  console.log(`Logged in with ${client.user.discriminator}`);

  const guild = client.guilds.find((g) => g.id === config.get("guildId"));
  const channel = guild.channels.find((c) => c.id === config.get("channelId"));
  cache.set("guild", guild).set("channel", channel);
});

client.on("message", async (message) => {
  if (message.author.id !== config.get("ownerId")) {
    return;
  }

  if (message.cleanContent.startsWith("~")) {
    command = message.cleanContent.slice(1);

    switch (command) {
      case "start": {
        console.log("Starting");
        cache.set("running", true);

        for (let i = 0; i < actions.size; ++i) {
          Array.from(actions)[i](config, cache);
          await utils.sleep(utils.randomInt(1000, 3000));
        }

        console.log("Started");
        break;
      }
      case "stop": {
        console.log("Stopping");
        cache.get("timeouts").forEach((timeout) => clearTimeout(timeout));
        cache.set("running", false);
        console.log("Stopped");
        break;
      }
    }
  }
});

client.login(config.get("token"));
