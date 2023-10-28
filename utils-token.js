// Import required functions/variables from built-in modules
const { basename, dirname } = require("node:path");

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
  tokenFromField,
  allTokensFilePath,
  tokenUpdAliasMap,
  tokenSearchAliasMap,
} = require("./defaults");

const {
  fetchJSONFile,
  fetchTxtFile,
  createFolder,
  createFile,
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
  // Write log to the file
  logEE.logToFile("getTokensNum", "info", "Tokens current count was requested");

  // Get all tokens and return the count
  const dataArr = await getAllTokens(path);
  return `The current count of tokens is: ${dataArr.length}`;
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
  newTokenObj.created = ttlArr[0];
  newTokenObj.expires = ttlArr[1];

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

  if (flagTokenExist) {
    // Write log to the file
    logEE.logToFile("addToken", "warning", "Token existed and was updated");
  } else {
    // If the token doesn't exist, add the new token to the array
    data.push(newToken);

    // Write log to the file
    logEE.logToFile("addToken", "info", "New token was added");
  }

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

  let flagUpdateSuccess = false;

  // Map over the existing tokens and update the matching token if found
  const data = allTokens.map((item) => {
    if (item[tokenField] === token) {
      flagUpdateSuccess = true;
      return { ...item, [fieldToUpdate]: newData };
    }

    return item;
  });

  // Provide feedback based on whether the update was successful
  if (flagUpdateSuccess) {
    console.log(
      `"${fieldToUpdate}" successfully updated for "${tokenValue}". The updated value is: "${newData}"`
    );
    // Write log to the file
    logEE.logToFile(
      "updateToken",
      "info",
      `"${fieldToUpdate}" successfully updated for "${tokenValue}". The updated value is: "${newData}"`
    );
  } else {
    console.log(`"${tokenValue}" not found. Data wasn't updated`);

    // Write log to the file
    logEE.logToFile(
      "updateToken",
      "warning",
      `"${tokenValue}" not found. Data wasn't updated`
    );
  }

  return data;
};

// Function to save token data to a JSON file
const saveToken = async (path, data) => {
  // Create the folder if it doesn't exist
  await createFolder(dirname(path));

  // Write the data to a JSON file
  await createFile(JSON.stringify(data, null, 2), path);

  // Write log to the file
  logEE.logToFile(
    "saveToken",
    "success",
    `Token was saved succesfully. File: "${basename(path)}" was rewritten`
  );
};

// Function to search for a token with a specific field and value
const searchToken = (data, field, value) => {
  // Filter tokens based on the specified field and value
  const result = data.filter((item) => item[field] === value);

  // Return the filtered data
  // Provide feedback if no matching tokens are found
  if (result.length) {
    // Write log to the file
    logEE.logToFile("searchToken", "success", "The search result was returned");
    return result;
  } else {
    // Write log to the file
    logEE.logToFile(
      "searchToken",
      "warning",
      `The data wasn't found. There is no "${field}" like "${value}"`
    );
    return `There is no "${field}" like "${value}"`;
  }
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

// Functions to process the token option "--help"
const processTokenHelp = async (optionsArr) => {
  // Check if there are extra arguments after "--help"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenHelp", "warning", "Invalid syntax");
    return;
  }

  // Read and display the help text from the specified file
  const data = (await fetchTxtFile(tokenHelpFilePath)) || notFoundMessage;

  console.log(data);

  // Write log to the file
  data !== notFoundMessage
    ? logEE.logToFile(
        "processTokenHelp",
        "success",
        `"help" file was displayed`
      )
    : logEE.logToFile("processTokenHelp", "error", `"help" file not found`);
};

// Functions to process the token option "--count"
const processTokenCount = async (optionsArr) => {
  // Check if there are extra arguments after "--count"
  if (optionsArr.length) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenCount", "warning", "Invalid syntax");
    return;
  }
  // Get the count of tokens from the specified file and display it
  console.log(await getTokensNum(allTokensFilePath));

  // Write log to the file
  logEE.logToFile(
    "processTokenCount",
    "success",
    "The current count of tokens was displayed"
  );
};

// Functions to process the token option "--new"
const processTokenCreate = async (optionsArr) => {
  try {
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
        "processTokenCreate",
        "error",
        "User configuration file not found"
      );
      return;
    } else if (
      !optionsArr.length ||
      optionsArr.length > userTemplateKeysArr.length
    ) {
      // Provide feedback
      console.log("Invalid syntax");

      // Write log to the file
      logEE.logToFile("processTokenCreate", "warning", "Invalid syntax");
      return;
    }

    // Create a new user object
    const newUserObj = createNewUserObj(userTemplateKeysArr, ...optionsArr);

    // Create a new token from user object
    const newTokenObj = createToken(
      tokenField,
      tokenFromField,
      newUserObj,
      tokenTemplate,
      tokenExpiresDays
    );

    // Read the existing tokens
    const dataArr = await getAllTokens(allTokensFilePath);

    // Add new token to the existed tokens
    const updatedDataArr = addToken(dataArr, tokenField, newTokenObj);

    // Save tokens back to the file
    await saveToken(allTokensFilePath, updatedDataArr);
  } catch ({ message }) {
    // Handle and log any errors that occurs
    logEE.logToFile("processTokenCreate", "error", `${message}`);
  }
};

// Functions to process the token option "--upd"
const processTokenUpdate = async (optionsArr) => {
  // Check if the arguments for updating a token are valid
  if (optionsArr.length != 3 || !tokenUpdAliasMap.has(optionsArr[0])) {
    // Provide feedback
    console.log("Invalid syntax");

    // Write log to the file
    logEE.logToFile("processTokenUpdate", "warning", "Invalid syntax");
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

// Functions to process the token option "--search"
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

  // Display the token data
  console.log(filteredData);
};

// Export the functions for use in other modules
module.exports = {
  processTokenHelp,
  processTokenCount,
  processTokenCreate,
  processTokenUpdate,
  processTokenSearch,
};
