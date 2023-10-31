// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  processInitHelp,
  processInitAll,
  processInitMk,
  processInitCat,
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
    case "--all":
      // Write log to the file
      logEE.logToFile("initFeature", "info", `Access to the "--all" option`);

      // Run the function to initialize required folders and files
      await processInitAll(optionsArr.slice(1));
      break;
    case "--mk":
      // Write log to the file
      logEE.logToFile("initFeature", "info", `Access to the "--mk" option`);

      // Run the function to initialize required folders
      await processInitMk(optionsArr.slice(1));
      break;
    case "--cat":
      // Write log to the file
      logEE.logToFile("initFeature", "info", `Access to the "--cat" option`);

      // Run the function to initialize required files
      await processInitCat(optionsArr.slice(1));
      break;
  }
};

// Export the "initFeature" function for use in other modules
module.exports = {
  initFeature,
};
