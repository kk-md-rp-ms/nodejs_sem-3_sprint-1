const fs = require("fs");
const myArgs = process.argv.slice(2);

// Add logging to the CLI project by using eventLogging
// load the logEE
const logEE = require("./log-emitter");

const { configjson } = require("./template");
const { flagDevMode } = require("./defaults-dev-mode");

function displayConfig() {
  if (flagDevMode) console.log("conigf.displayConfig()");
  fs.readFile(__dirname + "/json/config.json", (error, data) => {
    if (error) throw error; // should write a log event for the error, github issue #12
    console.log(JSON.parse(data));
  });
  logEE.logToFile(
    "config.displayConfig()",
    "INFO",
    "display config.json displayed"
  );
}

function resetConfig() {
  if (flagDevMode) console.log("config.resetConfig()");
  let configdata = JSON.stringify(configjson, null, 2);
  fs.writeFile(__dirname + "/json/config.json", configdata, (error) => {
    if (error) throw error; // issue #12 also applies here
    if (flagDevMode) console.log("Config file reset to original state");
    logEE.logToFile(
      "config.resetConfig()",
      "info",
      "config.json reset to original state."
    );
  });
}

function setConfig() {
  if (flagDevMode) console.log("config.setConfig()");
  if (flagDevMode) console.log(myArgs);

  let match = false;
  fs.readFile(__dirname + "/json/config.json", (error, data) => {
    if (error) throw error;
    if (flagDevMode) console.log(JSON.parse(data));
    let cfg = JSON.parse(data);
    for (let key of Object.keys(cfg)) {
      if (key === myArgs[2]) {
        cfg[key] = myArgs[3];
        match = true;
      }
    }
    if (!match) {
      console.log(`invalid key: ${myArgs[2]}, try another.`);
      logEE.logToFile(
        "config.setConfig()",
        "warning",
        `invalid key: ${myArgs[2]}`
      );
    }
    if (flagDevMode) console.log(cfg);
    data = JSON.stringify(cfg, null, 2);
    // looks like this code is writing the file again even if there is
    fs.writeFile(__dirname + "/json/config.json", data, (error) => {
      if (error) throw error;
      if (flagDevMode) console.log("Config file successfully updated.");
      logEE.logToFile(
        "config.setConfig()",
        "info",
        `config.json "${myArgs[2]}": updated to "${myArgs[3]}"`
      );
    });
  });

  logEE.logToFile(
    "config.setConfig()",
    "info",
    `config.json "${myArgs[2]}": updated to "${myArgs[3]}"`
  );
}

function configApp() {
  if (flagDevMode) console.log("configApp()");

  switch (myArgs[1]) {
    case "--show":
      if (flagDevMode) console.log("--show");
      displayConfig();
      break;
    case "--reset":
      if (flagDevMode) console.log("--reset");
      resetConfig();
      break;
    case "--set":
      if (flagDevMode) console.log("--set");
      setConfig();
      break;
    case "--help":
    case "--h":
    default:
      fs.readFile(__dirname + "/text/config.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
  }
}

module.exports = {
  configApp,
};
