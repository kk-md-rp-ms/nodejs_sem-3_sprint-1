const { dirname } = require("node:path");

const crc32 = require("crc/crc32");
const { format } = require("date-fns");

const { tokenFieldName } = require("./defaults");
const { fetchFile, createFolder, createFile } = require("./utils-fs");

const createNewUserObj = (keysArr, ...args) => {
  const newUserObj = {};

  for (let i = 0; i < args.length; i++) {
    newUserObj[keysArr[i]] = args[i];
  }

  return newUserObj;
};

const createToken = (userObj, tokenObj, ttlDays) => {
  const ttlArr = getTokenLifeSpan(ttlDays);

  const newTokenObj = {
    ...userObj,
    ...tokenObj,
  };

  newTokenObj[tokenFieldName] = crc32(userObj.username);
  newTokenObj.created = ttlArr[0];
  newTokenObj.expires = ttlArr[1];

  return newTokenObj;
};

const saveToken = async (tokenObj, path) => {
  let dataArr = (await fetchFile(path)) || [];

  if (!Array.isArray(dataArr)) {
    try {
      dataArr = JSON.parse(dataArr);
    } catch (err) {
      dataArr = [];
      console.log(err);
    }
  }

  dataArr = updateTokensData(dataArr, tokenObj, tokenFieldName);

  await createFolder(dirname(path));
  await createFile(JSON.stringify(dataArr, null, 2), path);
};

const updateTokensData = (allTokens, newToken, tokenFieldName) => {
  let flagTokenExist = false;

  data = allTokens.map((item) => {
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
  saveToken,
};
