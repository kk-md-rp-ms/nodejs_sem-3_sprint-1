// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { cfgHelpFilePath, fileContentMap } = require("./defaults");
const { createFolderWithFile } = require("./utils-fs");

const { processCfgHelp } = require("./utils-config");

// Define a function to handle the config feature based on provided options
const configFeature = async (optionsArr) => {
  // Create the config help folder and file as soon as the configFeature is accessed
  createFolderWithFile(cfgHelpFilePath, fileContentMap.get(cfgHelpFilePath));

  switch (optionsArr[0]) {
    case "--help":
    default:
      // Write log to the file
      logEE.logToFile("configFeature", "info", `Access to the "--help" option`);

      // Display help for the config command
      await processCfgHelp(optionsArr.slice(1));
      break;
  }
};

module.exports = {
  configFeature,
};
