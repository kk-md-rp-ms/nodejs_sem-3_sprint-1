// Import required functions/variables from built-in modules
const { dirname } = require("node:path");

// Import required functions/variables from npm packages
const crc32 = require("crc/crc32");
const { format } = require("date-fns");

// Import required functions/variables from custom modules
const { fetchJSONFile, createFolder, createFile } = require("./utils-fs");

// Function to retrieve all tokens from a JSON file
const getAllTokens = async (path) => {
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
  return `The current count of tokens is: ${dataArr.length}`;
};

// Function to create a new user object from keys and corresponding values
const createNewUserObj = (keysArr, ...args) => {
  const newUserObj = {};

  // Create a new user object by pairing keys from keysArr with values from args
  for (let i = 0; i < args.length; i++) {
    newUserObj[keysArr[i]] = args[i];
  }

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

  // If the token doesn't exist, add the new token to the array
  !flagTokenExist && data.push(newToken);
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
  if (!flagUpdateSuccess) {
    console.log(`"${tokenValue}" not found. Data wasn't updated`);
  } else {
    console.log(
      `"${fieldToUpdate}" successfully updated for "${tokenValue}". The updated value is: "${newData}"`
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
};

// Function to search for a token with a specific field and value
const searchToken = (data, field, value) => {
  // Filter tokens based on the specified field and value
  const result = data.filter((item) => item[field] === value);

  // Return the filtered data
  // Provide feedback if no matching tokens are found
  return result.length > 0 ? result : `There is no "${field}" like "${value}"`;
};

// Function to calculate the token lifespan
const getTokenLifeSpan = (ttlDays) => {
  const createdDate = Date.now();
  const expiresDate = new Date();

  expiresDate.setDate(expiresDate.getDate() + ttlDays);

  // Format and return the creation and expiration date and/or time
  return [createdDate, expiresDate].map((item) =>
    format(item, "yyyy-MM-dd HH:mm:ss")
  );
};

// Export the functions for use in other modules
module.exports = {
  createToken,
  createNewUserObj,
  getAllTokens,
  getTokensNum,
  addToken,
  saveToken,
  updateToken,
  searchToken,
};
