const { join } = require("node:path");

const helpFolder = "txt";
const initHelpFile = "init-help.txt";
const cfgHelpFile = "config-help.txt";
const tokenHelpFile = "token-help.txt";
const initHelpFilePath = join(helpFolder, initHelpFile);
const cfgHelpFilePath = join(helpFolder, cfgHelpFile);
const tokenHelpFilePath = join(helpFolder, tokenHelpFile);

const cfgFolder = "json";
const userCfgFile = "user-config.json";
const tokenCfgFile = "token-config.json";
const userCfgFilePath = join(cfgFolder, userCfgFile);
const tokenCfgFilePath = join(cfgFolder, tokenCfgFile);

const tokenExpiresDays = 3;
const tokenFolder = "json";
const tokenFile = "all-tokens.json";
const tokenFieldName = "token";
const allTokensFilePath = join(tokenFolder, tokenFile);

const tokenUpdAliasMap = new Map([
  ["e", "email"],
  ["p", "phone"],
]);

const tokenSearchAliasMap = new Map([
  ["e", "email"],
  ["p", "phone"],
  ["u", "username"],
]);

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
  tokenUpdAliasMap,
  tokenSearchAliasMap,
};
