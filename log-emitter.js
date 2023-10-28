// Import required built-in modules
const EventEmitter = require("node:events");

// Import functions from custom module
const { createLog, saveLog } = require("./utils-log");

// Create a custom LogEmitter class
class LogEmitter extends EventEmitter {
  // create a method to trigger an event
  logFile(event, level, message) {
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
});

// Export the LogEmitter instance
module.exports = logEE;
