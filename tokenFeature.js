// Import required functions/variables from custom modules
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
      await processTokenHelp(optionsArr.slice(1));
      break;
    case "--count":
      // displays a count of the tokens created
      await processTokenCount(optionsArr.slice(1));
      break;
    case "--new":
      // generates a token for a given data, saves tokens to the json file
      await processTokenCreate(optionsArr.slice(1));
      break;
    case "--upd":
      // updates the json entry with...options...
      await processTokenUpdate(optionsArr.slice(1));
      break;
    case "--search":
      // fetches a token for a given...options...
      await processTokenSearch(optionsArr.slice(1));
      break;
  }
};

// Export the "tokenFeature" function for use in other modules
module.exports = {
  tokenFeature,
};
