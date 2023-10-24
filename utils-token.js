const crc32 = require("crc/crc32");
const { format } = require("date-fns");

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

const getTokenLifeSpan = (ttlDays) => {
  const createdDate = Date.now();
  const expiresDate = new Date();

  expiresDate.setDate(expiresDate.getDate() + ttlDays);
  return [createdDate, expiresDate].map((item) => format(item, "dd/MM/yyyy"));
};

module.exports = {
  createToken,
  createNewUserObj,
};
