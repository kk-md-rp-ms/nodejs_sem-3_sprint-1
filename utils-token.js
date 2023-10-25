const { dirname } = require("node:path");

const crc32 = require("crc/crc32");
const { format } = require("date-fns");

const { fetchFile, createFolder, createFile } = require("./utils-fs");

const createNewUserObj = (keysArr, ...args) => {
  const newUserObj = {};

  for (let i = 0; i < args.length; i++) {
    newUserObj[keysArr[i]] = args[i];
  }

  return newUserObj;
};

const createToken = (tokenFieldName, userObj, tokenObj, ttlDays) => {
  const ttlArr = getTokenLifeSpan(ttlDays);

  const newTokenObj = {
    ...userObj,
    ...tokenObj,
  };

  newTokenObj[tokenFieldName] = crc32(userObj.username).toString(16);
  newTokenObj.created = ttlArr[0];
  newTokenObj.expires = ttlArr[1];

  return newTokenObj;
};

const getAllTokensArr = async (path) => {
  let dataArr = (await fetchFile(path)) || [];

  if (!Array.isArray(dataArr)) {
    try {
      dataArr = JSON.parse(dataArr);
    } catch (err) {
      dataArr = [];
      console.log(err);
    }
  }

  return dataArr;
};

const getTokensNum = async (path) => {
  const dataArr = await getAllTokensArr(path);
  return `The current count of tokens is: ${dataArr.length}`;
};

const saveToken = async (path, data) => {
  await createFolder(dirname(path));
  await createFile(JSON.stringify(data, null, 2), path);
};

const updateToken = (
  allTokens,
  tokenFieldName,
  tokenValue,
  fieldToUpdate,
  newData
) => {
  const token = crc32(tokenValue).toString(16);

  console.log(allTokens);

  let flagUpdateSuccess = false;
  const data = allTokens.map((item) => {
    if (item[tokenFieldName] === token) {
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

  console.log(data);
  return data;
};

const addToken = (allTokens, tokenFieldName, newToken) => {
  let flagTokenExist = false;

  const data = allTokens.map((item) => {
    if (item[tokenFieldName] === newToken[tokenFieldName]) {
      flagTokenExist = true;
      return { ...item, ...newToken };
    }

    return item;
  });

  !flagTokenExist && data.push(newToken);
  return data;
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
  getAllTokensArr,
  getTokensNum,
  addToken,
  saveToken,
  updateToken,
};
