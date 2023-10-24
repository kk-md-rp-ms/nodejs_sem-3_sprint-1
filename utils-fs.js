const { readFile } = require("node:fs/promises");
const { join } = require("node:path");

const fetchFile = async (...args) => {
  const path = join(__dirname, ...args);

  try {
    const data = await readFile(path);
    return data;
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }
};

module.exports = {
  fetchFile,
};
