// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  folderStructure,
  notFoundMessage,
  initHelpFilePath,
} = require("./defaults");

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

// Functions to process the init option "--all"
const processInitAll = async (optionsArr) => {
  // Check if there are extra arguments after "--all"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processInitAll", "warning", "Invalid syntax");
    return;
  }

  await processInitMk([]);
  // await processInitCat([]);
};

// Functions to process the init option "--mk"
const processInitMk = async (optionsArr) => {
  // Check if there are extra arguments after "--mk"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processInitMk", "warning", "Invalid syntax");
    return;
  }

  // Initialize variables to track the status of folder creation and feedback message
  let logStatusFlag = false;
  let feedbackMessage;

  try {
    // Counter to keep track of the number of folders created
    let folderCount = 0;

    // Iterate over the `folderStructure` array to create folders
    for (const item of folderStructure) {
      await createFolder(item);
      folderCount++;
    }

    // Set the feedbackMessage and logStatusFlag
    feedbackMessage = `Success. All ${folderCount} (of ${folderStructure.length}) folders are ready to be used`;
    logStatusFlag = true;
  } catch (err) {
    // If an error occurs during folder creation, capture the error message
    feedbackMessage = err.message;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "processInitMk",
    logStatusFlag ? "success" : "error",
    feedbackMessage
  );
};

// Functions to process the init option "--cat"
const processInitCat = async (optionsArr) => {
  // Check if there are extra arguments after "--cat"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processInitCat", "warning", "Invalid syntax");
    return;
  }

  console.log("--Cat accessed");
};

module.exports = {
  processInitHelp,
  processInitAll,
  processInitCat,
  processInitMk,
};
