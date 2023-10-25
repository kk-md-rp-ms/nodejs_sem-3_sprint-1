const { createToken, createNewUserObj, saveToken } = require("./utils-token");
const { fetchFile } = require("./utils-fs");
const {
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  allTokensFilePath,
} = require("./defaults");

const tokenFeature = (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      console.log("displays help for the token command");
      break;
    case "--count":
      console.log("displays a count of the tokens created");
      break;
    case "--new":
      // generates a token for a given username, saves tokens to the json file

      const newTokenOptionsArr = optionsArr.slice(1);

      (async () => {
        try {
          // issue-#23: add functionality if "user-config.json" and "token-config.json" weren't initialized
          const userTemplate = JSON.parse(await fetchFile(userCfgFilePath));
          const tokenTemplate = JSON.parse(await fetchFile(tokenCfgFilePath));
          const userTemplateKeysArr = Object.keys(userTemplate);

          if (
            newTokenOptionsArr.length == 0 ||
            newTokenOptionsArr.length > userTemplateKeysArr.length
          ) {
            console.log("Invalid syntax");
            return;
          }

          const newUserObj = createNewUserObj(
            userTemplateKeysArr,
            ...newTokenOptionsArr
          );

          const newTokenObj = createToken(
            newUserObj,
            tokenTemplate,
            tokenExpiresDays
          );

          saveToken(newTokenObj, allTokensFilePath);
        } catch ({ name, message }) {
          console.log(`${name}: ${message}`);
        }
      })();
      break;
    case "--upd":
      console.log("FUNCTION: updates the json entry with...options...");
      break;
    case "--search":
      console.log("FUNCTION: fetches a token for a given...options...");
      break;
  }
};

module.exports = {
  tokenFeature,
};
