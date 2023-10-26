// Import required functions/variables from built-in modules
const { join } = require("node:path");

// Define and initialize various file paths, folders, and configuration values

// Folder and files for the help options
const helpFolder = "txt";
const initHelpFile = "init-help.txt";
const cfgHelpFile = "config-help.txt";
const tokenHelpFile = "token-help.txt";

// Create full file paths by joining folder and file names
const initHelpFilePath = join(helpFolder, initHelpFile);
const cfgHelpFilePath = join(helpFolder, cfgHelpFile);
const tokenHelpFilePath = join(helpFolder, tokenHelpFile);

// Folder and files for configuration feature
const cfgFolder = "json";
const userCfgFile = "user-config.json";
const tokenCfgFile = "token-config.json";

// Create full file paths by joining folder and file names
const userCfgFilePath = join(cfgFolder, userCfgFile);
const tokenCfgFilePath = join(cfgFolder, tokenCfgFile);

// Folder, files and variables related to token feature
const tokenExpiresDays = 3;
const tokenFolder = "json";
const tokenFile = "all-tokens.json";
const tokenField = "token";
const tokenFromField = "username";

// Create full file paths by joining folder and file names
const allTokensFilePath = join(tokenFolder, tokenFile);

// Map to define aliases for updating token fields
const tokenUpdAliasMap = new Map([
  ["e", "email"],
  ["p", "phone"],
]);

// Map to define aliases for searching tokens
const tokenSearchAliasMap = new Map([
  ["e", "email"],
  ["p", "phone"],
  ["u", "username"],
]);

// Export all the defined variables for use in other modules
module.exports = {
  initHelpFilePath,
  cfgHelpFilePath,
  tokenHelpFilePath,
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  tokenField,
  tokenFromField,
  allTokensFilePath,
  tokenUpdAliasMap,
  tokenSearchAliasMap,
};
