// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { notFoundMessage, initHelpFilePath } = require("./defaults");

const {
  fetchJSONFile,
  fetchTxtFile,
  createFolder,
  createFile,
} = require("./utils-fs");

// Functions to process the init option "--help"
const processInitHelp = async (optionsArr) => {
  // Check if there are extra arguments after "--help"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processInitHelp", "warning", "Invalid syntax");
    return;
  }

  // Read the help text from the specified file
  const data = (await fetchTxtFile(initHelpFilePath)) || notFoundMessage;

  // Display result
  console.log(data);

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile("processInitHelp", "success", `"help" file was displayed`)
    : logEE.logToFile("processInitHelp", "error", `"help" file not found`);
};

module.exports = {
  processInitHelp,
};
