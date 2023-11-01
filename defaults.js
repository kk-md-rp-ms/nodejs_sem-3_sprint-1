// Import required functions/variables from built-in modules
const { join } = require("node:path");

// Import external packages
const { format } = require("date-fns");

// Import required functions/variables from built-in modules
const {
  helpAppFeature,
  helpInitFeature,
  helpCfgFeature,
  helpTokenFeature,
  userTemplate,
  tokenTemplate,
  allTokensTemplate,
} = require("./template.js");

// Define and initialize various file paths, folders, and configuration values
const notFoundMessage = "File not found";

// Folder and files for the help options
const helpFolder = "txt";
const appHelpFile = "app-help.txt";
const initHelpFile = "init-help.txt";
const cfgHelpFile = "config-help.txt";
const tokenHelpFile = "token-help.txt";

// Create full file paths by joining folder and file names
const appHelpFilePath = join(helpFolder, appHelpFile);
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

// Folder for logs
const logFolder = "logs";
const logSubFolder = () => {
  return join(logFolder, format(new Date(), "MM-yyyy"));
};
const logFile = () => {
  return join(logSubFolder(), format(new Date(), "dd-MM-yyyy") + ".log");
};

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

// Map to connect file names with its content
const fileContentMap = new Map([
  [appHelpFilePath, helpAppFeature],
  [initHelpFilePath, helpInitFeature],
  [cfgHelpFilePath, helpCfgFeature],
  [tokenHelpFilePath, helpTokenFeature],
  [userCfgFilePath, userTemplate],
  [tokenCfgFilePath, tokenTemplate],
  [allTokensFilePath, allTokensTemplate],
]);

// Folder structure for "init" feature
const folderStructureSet = new Set([
  "views",
  logFolder,
  cfgFolder,
  tokenFolder,
  helpFolder,
]);

// Export all the defined variables for use in other modules
module.exports = {
  notFoundMessage,
  appHelpFilePath,
  initHelpFilePath,
  cfgHelpFilePath,
  tokenHelpFilePath,
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  tokenField,
  tokenFromField,
  allTokensFilePath,
  logFolder,
  logSubFolder,
  logFile,
  tokenUpdAliasMap,
  tokenSearchAliasMap,
  fileContentMap,
  folderStructureSet,
};
