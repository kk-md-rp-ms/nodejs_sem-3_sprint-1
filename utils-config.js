// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  notFoundMessage,
  cfgHelpFilePath,
  appCfgFilePath,
} = require("./defaults");

const { fetchJSONFile, fetchTxtFile } = require("./utils-fs");

// Function to process the config option "--show"
const processCfgShow = async (optionsArr) => {
  // Check if there are extra arguments after "--show"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processCfgShow", "warning", "Invalid syntax");
    return;
  }

  // Read the config text from the specified file
  const data = (await fetchJSONFile(appCfgFilePath)) || notFoundMessage;

  // Display result
  console.log(JSON.stringify(data, null, 2));

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile(
        "processCfgShow",
        "success",
        `"config" file was displayed`
      )
    : logEE.logToFile("processCfgShow", "error", `"config" file not found`);
};

// Function to process the config option "--help"
const processCfgHelp = async (optionsArr) => {
  // Check if there are extra arguments after "--help"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processCfgHelp", "warning", "Invalid syntax");
    return;
  }

  // Read the help text from the specified file
  const data = (await fetchTxtFile(cfgHelpFilePath)) || notFoundMessage;

  // Display result
  console.log(data);

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile("processCfgHelp", "success", `"help" file was displayed`)
    : logEE.logToFile("processCfgHelp", "error", `"help" file not found`);
};

// Export all the defined variables for use in other modules
module.exports = {
  processCfgShow,
  processCfgHelp,
};
