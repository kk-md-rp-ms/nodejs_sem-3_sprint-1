// Import external packages
const chalk = require("chalk");

// Define a variable for enabling or disabling developer mode
// (controls the display of logs in the console)
const flagDevMode = true;

// Create functions/variables for log formatting in developer mode
const logEvent = chalk.dim.cyan;
const logLevelError = chalk.red;
const logLevelWarning = chalk.yellow;
const logLevelSuccess = chalk.green;
const logLevel = chalk.dim;
const logMessage = chalk.dim;

// Export all the defined variables for use in other modules
module.exports = {
  flagDevMode,
  logEvent,
  logLevelError,
  logLevelWarning,
  logLevelSuccess,
  logLevel,
  logMessage,
};
