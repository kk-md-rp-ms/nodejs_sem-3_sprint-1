// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  notFoundMessage,
  cfgHelpFilePath,
  appCfgFilePath,
  cfgOptionPathMap,
  fileContentMap,
} = require("./defaults");

const {
  fetchJSONFile,
  fetchTxtFile,
  createFolderWithFile,
} = require("./utils-fs");

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

// Function to process the config option "--reset"
const processCfgReset = async (optionsArr) => {
  // Check if the arguments for reset option are valid
  if (optionsArr.length != 1 || !cfgOptionPathMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");
    // Write log to the file
    logEE.logToFile("processCfgReset", "warning", "Invalid syntax");
    return;
  }

  // Initialize variables to track the status of reset and feedback message
  const path = cfgOptionPathMap.get(optionsArr[0]);
  let logStatusFlag = false;
  let feedbackMessage;

  // Create the config folder and file specified by given path
  try {
    await createFolderWithFile(
      path,
      JSON.stringify(fileContentMap.get(path), null, 2)
    );

    // Set the feedbackMessage and logStatusFlag
    feedbackMessage = `Success. Settings are back to default again`;
    logStatusFlag = true;
  } catch (err) {
    // If an error occurs during folder creation, capture the error message
    feedbackMessage = err.message;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "processCfgReset",
    logStatusFlag ? "success" : "error",
    feedbackMessage
  );
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
  processCfgReset,
  processCfgHelp,
};
