const { readFile, writeFile, mkdir } = require("node:fs/promises");
const { join } = require("node:path");

const fetchJSONFile = async (...pathArgs) => {
  const path = join(__dirname, ...pathArgs);

  try {
    const data = JSON.parse(await readFile(path));
    return data;
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }
};

const fetchTxtFile = async (...pathArgs) => {
  const path = join(__dirname, ...pathArgs);

  try {
    const data = await readFile(path, { encoding: "utf-8" });
    return data;
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }
};

const createFolder = async (...pathArgs) => {
  const path = join(__dirname, ...pathArgs);

  try {
    await mkdir(path);
  } catch ({ name, message, code }) {
    code == "EEXIST"
      ? console.log("folder already exist")
      : console.log(`${name}: ${message}`);
  }
};

const createFile = async (content, ...pathArgs) => {
  const path = join(__dirname, ...pathArgs);

  try {
    await writeFile(path, content);
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`);
  }
};

module.exports = {
  fetchJSONFile,
  fetchTxtFile,
  createFolder,
  createFile,
};
