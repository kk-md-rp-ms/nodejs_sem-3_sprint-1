// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  processTokenHelp,
  processTokenCount,
  processTokenCreate,
  processTokenUpdate,
  processTokenSearch,
} = require("./utils-token");

// Define a function to handle the token feature based on provided options
const tokenFeature = async (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      // Write log to the file
      logEE.logFile("tokenFeature", "info", `Access to the "--help" option`);

      // displays help for the token command
      await processTokenHelp(optionsArr.slice(1));
      break;
    case "--count":
      // Write log to the file
      logEE.logFile("tokenFeature", "info", `Access to the "--count" option`);

      // displays a count of the tokens created
      await processTokenCount(optionsArr.slice(1));
      break;
    case "--new":
      // Write log to the file
      logEE.logFile("tokenFeature", "info", `Access to the "--new" option`);

      // generates a token for a given data, saves tokens to the json file
      await processTokenCreate(optionsArr.slice(1));
      break;
    case "--upd":
      // Write log to the file
      logEE.logFile("tokenFeature", "info", `Access to the "--upd" option`);

      // updates the json entry with...options...
      await processTokenUpdate(optionsArr.slice(1));
      break;
    case "--search":
      // Write log to the file
      logEE.logFile("tokenFeature", "info", `Access to the "--search" option`);

      // fetches a token for a given...options...
      await processTokenSearch(optionsArr.slice(1));
      break;
  }
};

// Export the "tokenFeature" function for use in other modules
module.exports = {
  tokenFeature,
};
