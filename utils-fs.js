// Import required functions/variables from built-in modules
const { readFile, writeFile, mkdir } = require("node:fs/promises");
const { join, basename } = require("node:path");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");

// Define a function to fetch and parse JSON files
const fetchJSONFile = async (...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Read the JSON file and parse its content
    const data = JSON.parse(await readFile(path));

    // Write log to the file
    logEE.logToFile(
      "fetchJSONFile",
      "info",
      `"${basename(path)}" was fetched successfully`
    );

    // Return the resulting data
    return data;
  } catch (err) {
    // Handle and log any errors that occur during file reading or parsing
    logEE.logToFile("fetchJSONFile", "error", err.message);
  }
};

// Define a function to fetch text files
const fetchTxtFile = async (...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Read the text file with UTF-8 encoding and return its content
    const data = await readFile(path, { encoding: "utf-8" });

    // Write log to the file
    logEE.logToFile(
      "fetchTxtFile",
      "info",
      `"${basename(path)}" was fetched successfully`
    );
    // Return the resulting data
    return data;
  } catch (err) {
    // Handle and log any errors that occur during file reading
    logEE.logToFile("fetchTxtFile", "error", err.message);
  }
};

// Define a function to create a folder
const createFolder = async (...pathArgs) => {
  // Generate the full folder path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);
  let creationResultValue = 0;

  try {
    // Create the directory, and if it already exists, handle it gracefully
    await mkdir(path);

    // Write log to the file
    logEE.logToFile(
      "createFolder",
      "success",
      `Folder: "${basename(path)}" was created successfully`
    );

    creationResultValue = 1;
  } catch (err) {
    // If the directory already exists, log a message
    if (err.code == "EEXIST") {
      logEE.logToFile(
        "createFolder",
        "info",
        `Folder: "${basename(path)}" already exist`
      );
    } else {
      // Handle and log other directory creation errors
      logEE.logToFile("createFolder", "error", err.message);

      // re-throw an error if occured
      throw err;
    }
  } finally {
    return creationResultValue;
  }
};

// Define a function to create a text file with content
const createFile = async (content, ...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Write the specified content to the file
    await writeFile(path, content);

    // Write log to the file
    logEE.logToFile(
      "createFile",
      "success",
      `File: "${basename(path)}" was created successfully`
    );
  } catch (err) {
    // Handle and log any errors that occur during file writing
    logEE.logToFile("createFile", "error", `${err.message}`);

    // re-throw an error if occured
    throw err;
  }
};

// Export the functions for use in other modules
module.exports = {
  fetchJSONFile,
  fetchTxtFile,
  createFolder,
  createFile,
};
