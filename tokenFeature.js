const { createToken, createNewUserObj } = require("./utils-token");
const { fetchFile } = require("./utils-fs");
const { tokenExpiresDays } = require("./defaults");

const tokenFeature = (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      console.log("displays help for the token command");
      break;
    case "--count":
      console.log("displays a count of the tokens created");
      break;
    case "--new":
      // console.log(
      //   "FUNCTION: generates a token for a given username, saves tokens to the json file"
      // );
      const newTokenOptionsArr = optionsArr.slice(1);

      (async () => {
        try {
          const userTemplate = JSON.parse(
            await fetchFile("json", "user-config.json")
          );

          const tokenTemplate = JSON.parse(
            await fetchFile("json", "token-config.json")
          );

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
          console.log(newTokenObj);
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
