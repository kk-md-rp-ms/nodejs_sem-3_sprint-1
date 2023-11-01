// Import required functions/variables from built-in modules
const { basename } = require("node:path");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { notFoundMessage, appHelpFilePath } = require("./defaults");
const { fetchTxtFile } = require("./utils-fs");

// Function to process "--help"
const helpFeature = async (optionsArr) => {
  // Check if there are extra arguments after "--help"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("helpFeature", "warning", "Invalid syntax");
    return;
  }

  // Read the help text from the specified file
  const data = (await fetchTxtFile(appHelpFilePath)) || notFoundMessage;

  // Display result
  console.log(data);

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile(
        "helpFeature",
        "success",
        `"${basename(appHelpFilePath)}" file was displayed`
      )
    : logEE.logToFile(
        "helpFeature",
        "error",
        `"${basename(appHelpFilePath)}" file not found`
      );
};

// Export all the defined variables for use in other modules
module.exports = {
  helpFeature,
};
