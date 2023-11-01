// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { cfgHelpFilePath, fileContentMap } = require("./defaults");
const { createFolderWithFile } = require("./utils-fs");

const {
  processCfgShow,
  processCfgReset,
  processCfgSet,
  processCfgHelp,
} = require("./utils-config");

// Define a function to handle the config feature based on provided options
const configFeature = async (optionsArr) => {
  // Create the config help folder and file as soon as the configFeature is accessed
  try {
    await createFolderWithFile(
      cfgHelpFilePath,
      fileContentMap.get(cfgHelpFilePath)
    );
  } catch (err) {
    // Handle and log any errors that occur during folder/file creation
    logEE.logToFile("configFeature", "error", err.message);
  }

  switch (optionsArr[0]) {
    case "--show":
      // Write log to the file
      logEE.logToFile("configFeature", "info", `Access to the "--show" option`);

      // Display a list of the current config settings
      await processCfgShow(optionsArr.slice(1));
      break;
    case "--reset":
      // Write log to the file
      logEE.logToFile(
        "configFeature",
        "info",
        `Access to the "--reset" option`
      );

      // Reset the current config settings to default values
      await processCfgReset(optionsArr.slice(1));
      break;
    case "--set":
      // Write log to the file
      logEE.logToFile("configFeature", "info", `Access to the "--set" option`);

      // Set the provided fields to the specified values
      await processCfgSet(optionsArr.slice(1));
      break;
    case "--help":
    default:
      // Write log to the file
      logEE.logToFile("configFeature", "info", `Access to the "--help" option`);

      // Display help for the config command
      await processCfgHelp(optionsArr.slice(1));
      break;
  }
};

// Export all the defined variables for use in other modules
module.exports = {
  configFeature,
};
