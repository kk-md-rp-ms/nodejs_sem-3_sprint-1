// Import required functions/variables from built-in modules
const { readFile, writeFile, mkdir } = require("node:fs/promises");
const { join } = require("node:path");

// Define a function to fetch and parse JSON files
const fetchJSONFile = async (...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Read the JSON file and parse its content
    const data = JSON.parse(await readFile(path));
    // Return the resulting data
    return data;
  } catch ({ name, message }) {
    // Handle and log any errors that occur during file reading or parsing
    console.log(`${name}: ${message}`);
  }
};

// Define a function to fetch text files
const fetchTxtFile = async (...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Read the text file with UTF-8 encoding and return its content
    const data = await readFile(path, { encoding: "utf-8" });
    // Return the resulting data
    return data;
  } catch ({ name, message }) {
    // Handle and log any errors that occur during file reading
    console.log(`${name}: ${message}`);
  }
};

// Define a function to create a folder
const createFolder = async (...pathArgs) => {
  // Generate the full folder path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Create the directory, and if it already exists, handle it gracefully
    await mkdir(path);
  } catch ({ name, message, code }) {
    // If the directory already exists, log a message
    // Handle and log other directory creation errors
    code == "EEXIST"
      ? console.log("folder already exist")
      : console.log(`${name}: ${message}`);
  }
};

// Define a function to create a text file with content
const createFile = async (content, ...pathArgs) => {
  // Generate the full file path by joining the arguments with the current directory
  const path = join(__dirname, ...pathArgs);

  try {
    // Write the specified content to the file
    await writeFile(path, content);
  } catch ({ name, message }) {
    // Handle and log any errors that occur during file writing
    console.log(`${name}: ${message}`);
  }
};

// Export the functions for use in other modules
module.exports = {
  fetchJSONFile,
  fetchTxtFile,
  createFolder,
  createFile,
};
