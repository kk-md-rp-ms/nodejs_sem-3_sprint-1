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

const createToken = (userObj, tokenObj, ttlDays) => {
  const ttlArr = getTokenLifeSpan(ttlDays);

  const newTokenObj = {
    ...userObj,
    ...tokenObj,
  };

  newTokenObj.token = crc32(userObj.username);
  newTokenObj.created = ttlArr[0];
  newTokenObj.expires = ttlArr[1];

  return newTokenObj;
};

const saveToken = async (tokenObj, folder, fileName) => {
  let dataArr = (await fetchFile(folder, fileName)) || [];

  if (!Array.isArray(dataArr)) {
    try {
      dataArr = JSON.parse(dataArr);
    } catch (err) {
      dataArr = [];
      console.log(err);
    }
  }

  dataArr.push(tokenObj);
  await createFolder(folder);
  await createFile(JSON.stringify(dataArr, null, 2), folder, fileName);
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
