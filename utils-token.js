// Import required functions/variables from built-in modules
const { basename } = require("node:path");

// Import required functions/variables from npm packages
const crc32 = require("crc/crc32");
const { format } = require("date-fns");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const {
  notFoundMessage,
  tokenHelpFilePath,
  userCfgFilePath,
  tokenCfgFilePath,
  tokenExpiresDays,
  tokenField,
  tokenCreatedField,
  tokenExpiresField,
  tokenFromField,
  allTokensFilePath,
  tokenUpdAliasMap,
  tokenSearchAliasMap,
} = require("./defaults");

const {
  fetchJSONFile,
  fetchTxtFile,
  createFolderWithFile,
} = require("./utils-fs");

// Function to retrieve all tokens from a JSON file
const getAllTokens = async (path) => {
  // Write log to the file
  logEE.logToFile("getAllTokens", "info", "All tokens were requested");

  // Retrieve data from the specified JSON file
  // Initialize an empty array if cannot be assigned
  let dataArr = (await fetchJSONFile(path)) || [];

  // Ensure that the data is an array
  if (!Array.isArray(dataArr)) dataArr = [];
  return dataArr;
};

// Function to get the number of tokens
const getTokensNum = async (path) => {
  // Get all tokens and return the count
  const dataArr = await getAllTokens(path);
  return dataArr.length;
};

// Function to create a new user object from keys and corresponding values
const createNewUserObj = (keysArr, ...args) => {
  const newUserObj = {};

  // Create a new user object by pairing keys from keysArr with values from args
  for (let i = 0; i < args.length; i++) {
    newUserObj[keysArr[i]] = args[i];
  }

  // Write log to the file
  logEE.logToFile("createNewUserObj", "info", "New user object was created");
  return newUserObj;
};

// Function to create a new token
const createToken = (
  tokenField,
  created,
  expires,
  tokenFromField,
  userObj,
  tokenObj,
  ttlDays
) => {
  // Generate a token lifespan
  const ttlArr = getTokenLifeSpan(ttlDays);

  // Generate a new token object
  const newTokenObj = {
    ...userObj,
    ...tokenObj,
  };

  // Calculate and set the token value using the CRC32 hash
  newTokenObj[tokenField] = crc32(userObj[tokenFromField]).toString(16);

  // Set the token creation and expiration date and/or time
  newTokenObj[created] = ttlArr[0];
  newTokenObj[expires] = ttlArr[1];

  // Write log to the file
  logEE.logToFile("createToken", "info", "New token was generated");
  return newTokenObj;
};

// Function to add a new token to an array of tokens
const addToken = (allTokens, tokenField, newToken) => {
  let flagTokenExist = false;

  // Map over the existing tokens and update the matching token if found
  const data = allTokens.map((item) => {
    if (item[tokenField] === newToken[tokenField]) {
      flagTokenExist = true;
      return { ...item, ...newToken };
    }

    return item;
  });

  // Initialize variables to track the status and feedback message
  let logStatusFlag = false;
  let feedbackMessage;

  if (flagTokenExist) {
    feedbackMessage = "Token existed and was updated";
  } else {
    // If the token doesn't exist, add the new token to the array
    data.push(newToken);
    feedbackMessage = "New token was added successfully";

    logStatusFlag = true;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "addToken",
    logStatusFlag ? "success" : "warning",
    feedbackMessage
  );

  return data;
};

// Function to update an existing token's field with new data
const updateToken = (
  allTokens,
  tokenField,
  tokenValue,
  fieldToUpdate,
  newData
) => {
  // Calculate and set the token value using the CRC32 hash
  const token = crc32(tokenValue).toString(16);

  // Map over the existing tokens and update the matching token if found
  let flagUpdateSuccess = false;

  const data = allTokens.map((item) => {
    if (item[tokenField] === token) {
      flagUpdateSuccess = true;
      return { ...item, [fieldToUpdate]: newData };
    }

    return item;
  });

  // Initialize variables to track the status and feedback message
  let logStatusFlag = false;
  let feedbackMessage;

  if (flagUpdateSuccess) {
    feedbackMessage = `"${fieldToUpdate}" successfully updated for "${tokenValue}". The updated value is: "${newData}"`;
    logStatusFlag = true;
  } else {
    feedbackMessage = `"${tokenValue}" not found. Data wasn't updated`;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "updateToken",
    logStatusFlag ? "success" : "warning",
    feedbackMessage
  );

  return data;
};

// Function to save token data to a JSON file
const saveToken = async (path, data) => {
  // Initialize variables to track the status and feedback message
  let logStatusFlag = false;
  let feedbackMessage;

  try {
    // Create folder if it doesn't exist and write data to the file
    createFolderWithFile(path, JSON.stringify(data, null, 2));

    feedbackMessage = `Token was saved succesfully. File: "${basename(
      path
    )}" was rewritten`;

    // Set status flag
    logStatusFlag = true;
  } catch (err) {
    // If an error occurs during folder/file creation, capture the error message
    feedbackMessage = err.message;
  }

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile(
    "saveToken",
    logStatusFlag ? "success" : "error",
    feedbackMessage
  );
};

// Function to search for a token with a specific field and value
const searchToken = (data, field, value) => {
  // Filter tokens based on the specified field and value
  const result = data.filter((item) => item[field] === value);

  // Write log to the file
  if (result.length) {
    logEE.logToFile("searchToken", "success", "The search result was returned");
  } else {
    logEE.logToFile(
      "searchToken",
      "warning",
      `The data wasn't found. There is no "${field}" like "${value}"`
    );
  }

  // Return the filtered data
  return result;
};

// Function to calculate the token lifespan
const getTokenLifeSpan = (ttlDays) => {
  const createdDate = Date.now();
  const expiresDate = new Date();

  expiresDate.setDate(expiresDate.getDate() + ttlDays);

  // Write log to the file
  logEE.logToFile("getTokenLifeSpan", "info", "Token life span was set");

  // Format and return the creation and expiration date and/or time
  return [createdDate, expiresDate].map((item) =>
    format(item, "yyyy-MM-dd HH:mm:ss")
  );
};

// Function to process the token option "--help"
const processTokenHelp = async (optionsArr) => {
  // Check if there are extra arguments after "--help"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenHelp", "warning", "Invalid syntax");
    return;
  }

  // Read the help text from the specified file
  const data = (await fetchTxtFile(tokenHelpFilePath)) || notFoundMessage;

  // Display result
  console.log(data);

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile(
        "processTokenHelp",
        "success",
        `"${basename(tokenHelpFilePath)}" file was displayed`
      )
    : logEE.logToFile(
        "processTokenHelp",
        "error",
        `"${basename(tokenHelpFilePath)}" file not found`
      );
};

// Function to process the token option "--count"
const processTokenCount = async (optionsArr) => {
  // Check if there are extra arguments after "--count"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenCount", "warning", "Invalid syntax");
    return;
  }

  // Get the count of tokens from the specified file
  // Set the feedbackMessage
  feedbackMessage = `The current count of tokens is ${await getTokensNum(
    allTokensFilePath
  )}`;

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile("processTokenCount", "success", feedbackMessage);
};

// Function to process the token option "--new"
const processTokenNew = async (optionsArr) => {
  // Fetch configured templates for creating a new token from the specified files
  // issue-#23: add functionality if "user-config.json" and "token-config.json" weren't initialized
  const userTemplate = (await fetchJSONFile(userCfgFilePath)) || {};
  const tokenTemplate = (await fetchJSONFile(tokenCfgFilePath)) || {};

  // Create an array with the keys from fetched template file
  const userTemplateKeysArr = Object.keys(userTemplate);

  // Check if the provided arguments are valid for generating a new token
  if (!userTemplateKeysArr.length) {
    // Provide feedback
    console.log("User configuration file not found");

    // Write log to the file
    logEE.logToFile(
      "processTokenNew",
      "error",
      "User configuration file not found"
    );
    return;
  }

  if (!optionsArr.length || optionsArr.length > userTemplateKeysArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenNew", "warning", "Invalid syntax");
    return;
  }

  // Create a new user object
  const newUserObj = createNewUserObj(userTemplateKeysArr, ...optionsArr);

  // Create a new token from user object
  const newTokenObj = createToken(
    tokenField,
    tokenCreatedField,
    tokenExpiresField,
    tokenFromField,
    newUserObj,
    tokenTemplate,
    tokenExpiresDays
  );

  // Read the existing tokens
  const dataArr = await getAllTokens(allTokensFilePath);

  // Add a new token to the existing tokens or update the creation and expiration dates if the token already exists
  const updatedDataArr = addToken(dataArr, tokenField, newTokenObj);

  // Save tokens back to the file
  await saveToken(allTokensFilePath, updatedDataArr);

  return newTokenObj;
};

// Function to process the token option "--upd"
const processTokenUpd = async (optionsArr) => {
  // Check if the arguments for updating a token are valid
  if (optionsArr.length != 3 || !tokenUpdAliasMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenUpd", "warning", "Invalid syntax");
    return;
  }

  // Read the existing tokens
  const dataArr = await getAllTokens(allTokensFilePath);

  // Update the specified token field
  const updatedDataArr = updateToken(
    dataArr,
    tokenField,
    optionsArr[1],
    tokenUpdAliasMap.get(optionsArr[0]),
    optionsArr[2]
  );

  // Save tokens back to the file
  await saveToken(allTokensFilePath, updatedDataArr);
};

// Function to process the token option "--search"
const processTokenSearch = async (optionsArr) => {
  // Check if the arguments for searching a token are valid
  if (optionsArr.length != 2 || !tokenSearchAliasMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenSearch", "warning", "Invalid syntax");
    return;
  }

  // Read the existing tokens
  const dataArr = await getAllTokens(allTokensFilePath);

  // Filter token based on the search criteria
  const filteredData = searchToken(
    dataArr,
    tokenSearchAliasMap.get(optionsArr[0]),
    optionsArr[1]
  );

  // Provide the feedback
  console.log(
    filteredData.length
      ? JSON.stringify(filteredData, null, 2)
      : `There is no "${tokenSearchAliasMap.get(optionsArr[0])}" like "${
          optionsArr[1]
        }"`
  );
};

// Export the functions for use in other modules
module.exports = {
  getTokensNum,
  processTokenHelp,
  processTokenCount,
  processTokenNew,
  processTokenUpd,
  processTokenSearch,
};
