// Import required functions/variables from custom modules

const {
  createToken,
  createNewUserObj,
  getAllTokens,
  getTokensNum,
  addToken,
  saveToken,
  updateToken,
  searchToken,
} = require("./utils-token");
const {
  tokenHelpFilePath,
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  tokenField,
  tokenFromField,
  allTokensFilePath,
  tokenUpdAliasMap,
  tokenSearchAliasMap,
} = require("./defaults");
const { fetchJSONFile, fetchTxtFile } = require("./utils-fs");

// Define a function to handle the token feature based on provided options
const tokenFeature = (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      // displays help for the token command

      // Check if there are extra arguments after "--help"
      const helpTokenOptionsArr = optionsArr.slice(1);
      if (helpTokenOptionsArr.length) {
        console.log("Invalid syntax");
        return;
      }

      (async () => {
        // Read and display the help text from the specified file
        const data = await fetchTxtFile(tokenHelpFilePath);
        console.log(data);
      })();

      break;
    case "--count":
      // displays a count of the tokens created

      // Check if there are extra arguments after "--count"
      const countTokenOptionsArr = optionsArr.slice(1);
      if (countTokenOptionsArr.length) {
        console.log("Invalid syntax");
        return;
      }

      (async () => {
        // Get the count of tokens from the specified file and display it
        console.log(await getTokensNum(allTokensFilePath));
      })();
      break;
    case "--new":
      // generates a token for a given username, saves tokens to the json file
      const newTokenOptionsArr = optionsArr.slice(1);

      (async () => {
        try {
          // Fetch configured templates for creating a new token from the specified files
          // issue-#23: add functionality if "user-config.json" and "token-config.json" weren't initialized
          const userTemplate = await fetchJSONFile(userCfgFilePath);
          const tokenTemplate = await fetchJSONFile(tokenCfgFilePath);

          // Create an array with the keys from fetched template file
          const userTemplateKeysArr = Object.keys(userTemplate);

          // Check if the provided arguments are valid for generating a new token
          if (
            !newTokenOptionsArr.length ||
            newTokenOptionsArr.length > userTemplateKeysArr.length
          ) {
            console.log("Invalid syntax");
            return;
          }

          // Create a new user object
          const newUserObj = createNewUserObj(
            userTemplateKeysArr,
            ...newTokenOptionsArr
          );

          // Create a new token from user object
          const newTokenObj = createToken(
            tokenField,
            tokenFromField,
            newUserObj,
            tokenTemplate,
            tokenExpiresDays
          );

          // Read the existing tokens
          const dataArr = await getAllTokens(allTokensFilePath);

          // Add new token to the existed tokens
          const updatedDataArr = addToken(dataArr, tokenField, newTokenObj);

          // Save tokens back to the file
          await saveToken(allTokensFilePath, updatedDataArr);
        } catch ({ name, message }) {
          // Handle and display errors
          console.log(`${name}: ${message}`);
        }
      })();
      break;
    case "--upd":
      // updates the json entry with...options...
      const updTokenOptionsArr = optionsArr.slice(1);

      // Check if the arguments for updating a token are valid
      if (
        updTokenOptionsArr.length != 3 ||
        !tokenUpdAliasMap.has(updTokenOptionsArr[0])
      ) {
        console.log("Invalid syntax");
        return;
      }

      (async () => {
        // Read the existing tokens
        const dataArr = await getAllTokens(allTokensFilePath);

        // Update the specified token field
        const updatedDataArr = updateToken(
          dataArr,
          tokenField,
          updTokenOptionsArr[1],
          tokenUpdAliasMap.get(updTokenOptionsArr[0]),
          updTokenOptionsArr[2]
        );

        // Save tokens back to the file
        await saveToken(allTokensFilePath, updatedDataArr);
      })();
      break;
    case "--search":
      // fetches a token for a given...options...
      const searchTokenOptionsArr = optionsArr.slice(1);

      // Check if the arguments for searching a token are valid
      if (
        searchTokenOptionsArr.length != 2 ||
        !tokenSearchAliasMap.has(searchTokenOptionsArr[0])
      ) {
        console.log("Invalid syntax");
        return;
      }

      (async () => {
        // Read the existing tokens
        const dataArr = await getAllTokens(allTokensFilePath);

        // Filter token based on the search criteria
        const filteredData = searchToken(
          dataArr,
          tokenSearchAliasMap.get(searchTokenOptionsArr[0]),
          searchTokenOptionsArr[1]
        );

        // Display the token data
        console.log(filteredData);
      })();

      break;
  }
};

// Export the "tokenFeature" function for use in other modules
module.exports = {
  tokenFeature,
};
