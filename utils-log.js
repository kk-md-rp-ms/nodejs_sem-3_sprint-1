// Import required functions/variables from built-in modules
const { mkdir, appendFile } = require("node:fs/promises");

// Import external packages
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");

// Import required functions/variables from custom modules
const { logFolder, logSubFolder, logFile } = require("./defaults");

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
  } catch ({ name, message, code }) {
    // log directory creation errors
    code != "EEXIST" && console.log(`${name}: ${message}`);
  }

  // Append the log data to the file
  try {
    await appendFile(logFile(), log);
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }
};

module.exports = {
  createLog,
  saveLog,
};
