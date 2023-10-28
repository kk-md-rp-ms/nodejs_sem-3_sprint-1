// Import required functions/variables from built-in modules
const { mkdir, appendFile } = require("node:fs/promises");

// Import external packages
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");

// Import required functions/variables from custom modules
const { logFolder, logSubFolder, logFile } = require("./defaults");
const {
  flagDevMode,
  logEvent,
  logLevelError,
  logLevelWarning,
  logLevelSuccess,
  logLevel,
  logMessage,
} = require("./defaults-dev-mode");

// Create a developer log entry
const createDevLog = (event, level, message) => {
  return `${logEvent(event)} - ${
    level == "error"
      ? logLevelError(level)
      : level == "warning"
      ? logLevelWarning(level)
      : level == "success"
      ? logLevelSuccess(level)
      : logLevel(level)
  }\t[${["error", "warning"].includes(level) ? message : logMessage(message)}]`;
};

// Create a log entry
const createLog = (event, level, message) => {
  return `${format(
    new Date(),
    "dd/MM/yyyy HH:mm:ss"
  )}\t[${event} - "${level.toUpperCase()}"]\t${uuidv4()}\t[${message}]\n`;
};

// Save a log entry
const saveLog = async (log) => {
  try {
    // Create the log root directory if it doesn't exist
    await mkdir(logFolder);

    // Create the sub directory if it doesn't exist
    await mkdir(logSubFolder(), { recursive: true });

    // Display log entry in the console if developer mode is active
    flagDevMode &&
      console.log(
        createDevLog(
          "saveLog",
          "success",
          `Folder: ${logSubFolder()} was created successfully`
        )
      );
  } catch ({ message, code }) {
    // Display log entry in the console if developer mode is active
    if (flagDevMode) {
      code == "EEXIST"
        ? console.log(createDevLog("saveLog", "warning", `${message}`))
        : console.log(createDevLog("saveLog", "error", `${message}`));
    }
  }

  // Append the log data to the file
  try {
    await appendFile(logFile(), log);

    // Display log entry in the console if developer mode is active
    flagDevMode &&
      console.log(
        createDevLog(
          "saveLog",
          "success",
          `log was successfully written to the ${logFile()}`
        )
      );
  } catch ({ message }) {
    // Display log entry in the console if developer mode is active
    flagDevMode && console.log(createDevLog("saveLog", "error", `${message}`));
  }
};

module.exports = {
  createDevLog,
  createLog,
  saveLog,
};
