// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { tokenHelpFilePath, fileContentMap } = require("./defaults");
const { createFolderWithFile } = require("./utils-fs");

const {
  processTokenCount,
  processTokenNew,
  processTokenUpd,
  processTokenSearch,
  processTokenHelp,
} = require("./utils-token");

// Define a function to handle the token feature based on provided options
const tokenFeature = async (optionsArr) => {
  // Create the token help folder and file as soon as the tokenFeature is accessed
  await createFolderWithFile(
    tokenHelpFilePath,
    fileContentMap.get(tokenHelpFilePath)
  );

  switch (optionsArr[0]) {
    case "--count":
      // Write log to the file
      logEE.logToFile("tokenFeature", "info", `Access to the "--count" option`);

      // displays a count of the tokens created
      await processTokenCount(optionsArr.slice(1));
      break;
    case "--new":
      // Write log to the file
      logEE.logToFile("tokenFeature", "info", `Access to the "--new" option`);

      // generates a token for a given data, saves tokens to the json file
      await processTokenNew(optionsArr.slice(1));
      break;
    case "--upd":
      // Write log to the file
      logEE.logToFile("tokenFeature", "info", `Access to the "--upd" option`);

      // updates the json entry with...options...
      await processTokenUpd(optionsArr.slice(1));
      break;
    case "--search":
      // Write log to the file
      logEE.logToFile(
        "tokenFeature",
        "info",
        `Access to the "--search" option`
      );

      // fetches a token for a given...options...
      await processTokenSearch(optionsArr.slice(1));
      break;
    case "--help":
    default:
      // Write log to the file
      logEE.logToFile("tokenFeature", "info", `Access to the "--help" option`);

      // Display help for the token command
      await processTokenHelp(optionsArr.slice(1));
      break;
  }
};

// Export the "tokenFeature" function for use in other modules
module.exports = {
  tokenFeature,
};
