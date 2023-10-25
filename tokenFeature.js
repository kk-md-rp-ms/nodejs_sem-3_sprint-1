const {
  createToken,
  createNewUserObj,
  getAllTokensArr,
  getTokensNum,
  addToken,
  saveToken,
  updateToken,
} = require("./utils-token");
const { fetchFile } = require("./utils-fs");
const {
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  tokenFieldName,
  allTokensFilePath,
  tokenUpdAliasMap,
  // tokenSearchAliasMap,
} = require("./defaults");

const tokenFeature = (optionsArr) => {
  switch (optionsArr[0]) {
    case "--help":
      console.log("displays help for the token command");

      break;
    case "--count":
      // displays a count of the tokens created
      (async () => {
        console.log(await getTokensNum(allTokensFilePath));
      })();
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
            tokenFieldName,
            newUserObj,
            tokenTemplate,
            tokenExpiresDays
          );

          const dataArr = await getAllTokensArr(allTokensFilePath);
          const updatedDataArr = addToken(dataArr, tokenFieldName, newTokenObj);

          await saveToken(allTokensFilePath, updatedDataArr);
        } catch ({ name, message }) {
          console.log(`${name}: ${message}`);
        }
      })();
      break;
    case "--upd":
      // updates the json entry with...options...
      const updTokenOptionsArr = optionsArr.slice(1);

      if (
        updTokenOptionsArr.length <= 1 ||
        updTokenOptionsArr.length > 3 ||
        !tokenUpdAliasMap.has(updTokenOptionsArr[0])
      ) {
        console.log("Invalid syntax");
        return;
      }

      (async () => {
        const dataArr = await getAllTokensArr(allTokensFilePath);

        const updatedDataArr = updateToken(
          dataArr,
          tokenFieldName,
          updTokenOptionsArr[1],
          tokenUpdAliasMap.get(updTokenOptionsArr[0]),
          updTokenOptionsArr[2]
        );

        await saveToken(allTokensFilePath, updatedDataArr);
      })();
      break;
    case "--search":
      console.log("FUNCTION: fetches a token for a given...options...");
      break;
  }
};

module.exports = {
  tokenFeature,
};
