// Import required built-in modules
const EventEmitter = require("node:events");

// Import functions from custom module
const { createDevLog, createLog, saveLog } = require("./utils-log");
const { flagDevMode } = require("./defaults-dev-mode");

// Create a custom LogEmitter class
class LogEmitter extends EventEmitter {
  // create a method to trigger an event
  logToFile(event, level, message) {
    this.emit("logFile", event, level, message);
  }
}

// Create an instance of the LogEmitter class
const logEE = new LogEmitter();

// Define an event listener for the "logFile" event
logEE.on("logFile", async (event, level, message) => {
  // Create a log entry
  const log = createLog(event, level, message);

  // Save log entry to the log file
  await saveLog(log);

  // Display log entry in the console if developer mode is active
  flagDevMode && console.log(createDevLog(event, level, message));
});

// Export the LogEmitter instance
module.exports = logEE;
