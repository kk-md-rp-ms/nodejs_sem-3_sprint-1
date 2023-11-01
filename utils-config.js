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
  let data = (await fetchJSONFile(appCfgFilePath)) || notFoundMessage;
  data = data !== notFoundMessage ? JSON.stringify(data, null, 2) : data;

  // Display result
  console.log(data);

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
  // Check if the arguments for the reset option are valid
  if (optionsArr.length != 1 || !cfgOptionPathMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");
    // Write log to the file
    logEE.logToFile("processCfgReset", "warning", "Invalid syntax");
    return;
  }

  // Set the path variable
  const path = cfgOptionPathMap.get(optionsArr[0]);

  // Initialize variables to track the status of folder and file creation and feedback message
  let logStatusFlag = false;
  let feedbackMessage;

  // Create the config folder and file specified by the given path
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

// Function to process the config option "--set"
const processCfgSet = async (optionsArr) => {
  // Check if the arguments for the set option are valid
  if (optionsArr.length != 3 || !cfgOptionPathMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processCfgSet", "warning", "Invalid syntax");
    return;
  }

  // Set the path variable
  const path = cfgOptionPathMap.get(optionsArr[0]);

  // Read the config text from the specified file
  let data = (await fetchJSONFile(path)) || notFoundMessage;

  if (data === notFoundMessage) {
    // Provide feedback
    console.log(data);

    // Write log to the file
    logEE.logToFile("processCfgSet", "error", `"config" file not found`);
    return;
  }

  // Initialize variables to track the status of the data update action and feedback message
  let updateDataFlag = false;
  let feedbackMessage;

  // Iterate through the keys in the "data" object
  for (const key in data) {
    // Check if the current key (case-insensitive) matches the target field specified in "optionsArr[1]"
    if (key.toLowerCase() === optionsArr[1].toLowerCase()) {
      // If a match is found, update the data
      data[key] = optionsArr[2];

      // Set the feedback message and the flag to "true" to indicate success
      feedbackMessage = `Success. Data in field \"${key}\" was updated to \"${data[key]}\"`;
      updateDataFlag = true;
      break;
    }
  }

  // Exit the function if data wasn't updated
  if (!updateDataFlag) {
    // Set the feedback message
    feedbackMessage = `There is no field like \"${optionsArr[1]}\". Data wasn't updated`;

    // Provide feedback
    console.log(feedbackMessage);

    // Write log to the file
    logEE.logToFile("processCfgSet", "warning", feedbackMessage);
    return;
  }

  // Initialize variable to track the status of folder and file creation
  let logStatusFlag = false;

  // Create the config folder and file specified by the given path
  try {
    await createFolderWithFile(path, JSON.stringify(data, null, 2));

    logStatusFlag = true;
  } catch (err) {
    // If an error occurs during folder creation, capture the error message
    feedbackMessage = err.message;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "processCfgSet",
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
  processCfgSet,
  processCfgHelp,
};
