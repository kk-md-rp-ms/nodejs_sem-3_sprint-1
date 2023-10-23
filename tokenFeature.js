const { createToken } = require("./utils-token");

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
      optionsArr.length == 2 && createToken(optionsArr[1]);
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
