const utils = require("../utils");

const actionConfig = {
  interval: 300000,
  randomInterval: [-30000, 30000],
};

const plsDepAll = (config, cache) => {
  const channel = cache.get("channel");

  if (cache.get("running")) {
    console.log("pls dep all");
    channel.send("Pls dep all");

    const interval =
      actionConfig.interval + utils.randomInt(...actionConfig.randomInterval);

    console.log(`should wait ${interval} ms for pls dep all`);

    const timeout = setTimeout(() => plsDepAll(config, cache), interval);
    const currentTimeouts = cache.get("timeouts");
    cache.set("timeouts", [...currentTimeouts, timeout]);
  }
};

module.exports = plsDepAll;
