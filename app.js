// Import required functions/variables from built-in modules
const { argv } = require("node:process");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { appHelpFilePath, fileContentMap } = require("./defaults");
const { createFolderWithFile } = require("./utils-fs");
const { initFeature } = require("./initFeature");
const { tokenFeature } = require("./tokenFeature");
const { configFeature } = require("./configFeature");
const { helpFeature } = require("./helpFeature");

// Get command-line arguments, excluding the first two elements (node executable and script filename)
const commandsArr = argv.slice(2);

// Extract the feature name from the command-line arguments
const feature = commandsArr[0];

// Extract feature-specific options from the command-line arguments
const featureOptions = commandsArr.slice(1);

(async () => {
  // Write log to the file
  logEE.logToFile(
    "cli-app",
    "info",
    `Application is accessed and running successfully`
  );

  // Create the app help folder and file as soon as the app is run
  await createFolderWithFile(
    appHelpFilePath,
    fileContentMap.get(appHelpFilePath)
  );

  // Use a switch statement to execute code based on the specified feature
  switch (feature) {
    case "init":
    case "i":
      // Write log to the file
      logEE.logToFile("app-init", "info", `Access to the "init" feature`);

      // If the feature is "init" or "i", call the "initFeature" function and pass the options
      await initFeature(featureOptions);
      break;
    case "config":
    case "c":
      // Write log to the file
      logEE.logToFile("app-config", "info", `Access to the "config" feature`);

      // If the feature is "config" or "c", call the "configFeature" function and pass the options
      await configFeature(featureOptions);
      break;
    case "token":
    case "t":
      // Write log to the file
      logEE.logToFile("app-token", "info", `Access to the "token" feature`);

      // If the feature is "token" or "t", call the "tokenFeature" function and pass the options
      await tokenFeature(featureOptions);
      break;
    case "--help":
    case "-h":
    default:
      // Write log to the file
      logEE.logToFile("app-help", "info", `Access to the "--help" feature`);

      // If the feature is "--help" or "-h", call the "helpFeature" function and pass the options
      await helpFeature(featureOptions);
      break;
  }
})();
