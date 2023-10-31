// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  processInitHelp,
  processInitFiles,
  processInitFolders,
} = require("./utils-init");

// Define a function to handle the init feature based on provided options
const initFeature = async (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      // Write log to the file
      logEE.logToFile("initFeature", "info", `Access to the "--help" option`);

      // displays help for the init command
      await processInitHelp(optionsArr.slice(1));
      break;
  }
};

// Export the "initFeature" function for use in other modules
module.exports = {
  initFeature,
};
