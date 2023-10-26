const { dirname } = require("node:path");

const crc32 = require("crc/crc32");
const { format } = require("date-fns");

const { fetchJSONFile, createFolder, createFile } = require("./utils-fs");

const getAllTokens = async (path) => {
  let dataArr = (await fetchJSONFile(path)) || [];

  if (!Array.isArray(dataArr)) dataArr = [];

  return dataArr;
};

const getTokensNum = async (path) => {
  const dataArr = await getAllTokens(path);
  return `The current count of tokens is: ${dataArr.length}`;
};

const createNewUserObj = (keysArr, ...args) => {
  const newUserObj = {};

  for (let i = 0; i < args.length; i++) {
    newUserObj[keysArr[i]] = args[i];
  }

  return newUserObj;
};

const createToken = (
  tokenField,
  tokenFromField,
  userObj,
  tokenObj,
  ttlDays
) => {
  const ttlArr = getTokenLifeSpan(ttlDays);

  const newTokenObj = {
    ...userObj,
    ...tokenObj,
  };

  newTokenObj[tokenField] = crc32(userObj[tokenFromField]).toString(16);
  newTokenObj.created = ttlArr[0];
  newTokenObj.expires = ttlArr[1];

  return newTokenObj;
};

const addToken = (allTokens, tokenField, newToken) => {
  let flagTokenExist = false;

  const data = allTokens.map((item) => {
    if (item[tokenField] === newToken[tokenField]) {
      flagTokenExist = true;
      return { ...item, ...newToken };
    }

    return item;
  });

  !flagTokenExist && data.push(newToken);
  return data;
};

const updateToken = (
  allTokens,
  tokenField,
  tokenValue,
  fieldToUpdate,
  newData
) => {
  const token = crc32(tokenValue).toString(16);

  let flagUpdateSuccess = false;
  const data = allTokens.map((item) => {
    if (item[tokenField] === token) {
      flagUpdateSuccess = true;
      return { ...item, [fieldToUpdate]: newData };
    }

    return item;
  });

  if (!flagUpdateSuccess) {
    console.log(`"${tokenValue}" not found. Data wasn't updated`);
  } else {
    console.log(
      `"${fieldToUpdate}" successfully updated for "${tokenValue}". The updated value is: "${newData}"`
    );
  }

  return data;
};

const saveToken = async (path, data) => {
  await createFolder(dirname(path));
  await createFile(JSON.stringify(data, null, 2), path);
};

const searchToken = (data, field, value) => {
  const result = data.filter((item) => item[field] === value);

  return result.length > 0 ? result : `There is no "${field}" like "${value}"`;
};

const getTokenLifeSpan = (ttlDays) => {
  const createdDate = Date.now();
  const expiresDate = new Date();

  expiresDate.setDate(expiresDate.getDate() + ttlDays);
  return [createdDate, expiresDate].map((item) =>
    format(item, "yyyy-MM-dd HH:mm:ss")
  );
};

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
