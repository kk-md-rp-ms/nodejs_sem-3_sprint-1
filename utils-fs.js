const { readFile } = require("node:fs/promises");
const { join, sep } = require("node:path");

const fetchFile = async (...args) => {
  const path = join(__dirname, args.join(sep));

  try {
    const data = await readFile(path);
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }

  return data;
};

module.exports = {
  fetchFile,
};
