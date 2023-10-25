const { join } = require("node:path");

const tokenExpiresDays = 3;
const cfgFolder = "json";
const userCfgFile = "user-config.json";
const tokenCfgFile = "token-config.json";
const userCfgFilePath = join(cfgFolder, userCfgFile);
const tokenCfgFilePath = join(cfgFolder, tokenCfgFile);
const tokenFolder = "json";
const tokenFile = "all-tokens.json";
const tokenFieldName = "token";
const allTokensFilePath = join(tokenFolder, tokenFile);

module.exports = {
  tokenExpiresDays,
  cfgFolder,
  userCfgFile,
  tokenCfgFile,
  userCfgFilePath,
  tokenCfgFilePath,
  tokenFolder,
  tokenFile,
  tokenFieldName,
  allTokensFilePath,
};
