// Import required functions/variables from built-in modules
const { argv } = require("node:process");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { initFeature } = require("./initFeature");
const { tokenFeature } = require("./tokenFeature");
const { configFeature } = require("./configFeature");

// Get command-line arguments, excluding the first two elements (node executable and script filename)
const commandsArr = argv.slice(2);

// Extract the feature name from the command-line arguments
const feature = commandsArr[0];

// Extract feature-specific options from the command-line arguments
const featureOptions = commandsArr.slice(1);

// Use a switch statement to execute code based on the specified feature
switch (feature) {
  case "init":
  case "i":
    // Write log to the file
    logEE.logToFile("cli-init", "info", `Access to the "init" feature`);

    // If the feature is "init" or "i", call the "initFeature" function and pass the options
    (async () => {
      await initFeature(featureOptions);
    })();
    break;
  case "config":
  case "c":
    // Write log to the file
    logEE.logToFile("cli-config", "info", `Access to the "config" feature`);

    // If the feature is "config" or "c", call the "configFeature" function and pass the options
    (async () => {
      await configFeature(featureOptions);
    })();
    break;
  case "token":
  case "t":
    // Write log to the file
    logEE.logToFile("cli-token", "info", `Access to the "token" feature`);

    // If the feature is "token" or "t", call the "tokenFeature" function and pass the options
    (async () => {
      await tokenFeature(featureOptions);
    })();
    break;
  // Other cases will be added soon
}
