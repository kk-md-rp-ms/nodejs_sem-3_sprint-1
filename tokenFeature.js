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
      // displays help for the token command
      logEE.logFile("tokenFeature", "info", `Access to the "--help" option`);
      await processTokenHelp(optionsArr.slice(1));
      break;
    case "--count":
      // displays a count of the tokens created
      logEE.logFile("tokenFeature", "info", `Access to the "--count" option`);
      await processTokenCount(optionsArr.slice(1));
      break;
    case "--new":
      // generates a token for a given data, saves tokens to the json file
      logEE.logFile("tokenFeature", "info", `Access to the "--new" option`);
      await processTokenCreate(optionsArr.slice(1));
      break;
    case "--upd":
      // updates the json entry with...options...
      logEE.logFile("tokenFeature", "info", `Access to the "--upd" option`);
      await processTokenUpdate(optionsArr.slice(1));
      break;
    case "--search":
      // fetches a token for a given...options...
      logEE.logFile("tokenFeature", "info", `Access to the "--search" option`);
      await processTokenSearch(optionsArr.slice(1));
      break;
  }
};

// Export the "tokenFeature" function for use in other modules
module.exports = {
  tokenFeature,
};
