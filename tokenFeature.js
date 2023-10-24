const { createToken, createNewUserObj } = require("./utils-token");
const { tokenTemplate, userTemplate } = require("./template");
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
      const newTokenOptionsArr = optionsArr.slice(1);
      const newUserObjKeysArr = Object.keys(userTemplate);
      // console.log(
      //   "FUNCTION: generates a token for a given username, saves tokens to the json file"
      // );

      if (
        newTokenOptionsArr.length == 0 ||
        newTokenOptionsArr.length > newUserObjKeysArr.length
      ) {
        console.log("Invalid syntax");
        return;
      }

      const newUserObj = createNewUserObj(
        newUserObjKeysArr,
        ...newTokenOptionsArr
      );

      const newTokenObj = createToken(
        newUserObj,
        tokenTemplate,
        tokenExpiresDays
      );
      console.log(newTokenObj);
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
