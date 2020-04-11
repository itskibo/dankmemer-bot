const utils = require("../utils");

const actionConfig = {
  interval: 40000,
  randomInterval: [1000, 3000],
};

const plsFish = (config, cache) => {
  const channel = cache.get("channel");

  if (cache.get("running")) {
    console.log("pls fish");
    channel.send("Pls fish");

    const interval =
      actionConfig.interval + utils.randomInt(...actionConfig.randomInterval);

    console.log(`should wait ${interval} ms for pls fish`);

    const timeout = setTimeout(() => plsFish(config, cache), interval);
    const currentTimeouts = cache.get("timeouts");
    cache.set("timeouts", [...currentTimeouts, timeout]);
  }
};

module.exports = plsFish;
