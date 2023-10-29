/*************************
 * File Name: init.js
 * Purpose: The routines to initialize the app
 * 
 * Commands:
myapp init --all      creates the folder structure and config file
myapp init --mk       creates the folder structure
myapp init --cat      creates the config file with default settings
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
 * 12 Feb 2022, PJR, added createFiles() for init, config, and token views
 * 13 Oct 2022, PJR, re-hydrated project from the spring
 * 05 Oct 2023, PJR, altered for lecture prep
 *************************/
// Node.js common core global modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Add logging to the CLI project by using eventLogging
// load the logEvents module
const logEE = require("./log-emitter");

const { folders, configjson, usagetxt } = require("./initTemplates");
const { flagDevMode } = require("./defaults-dev-mode");

function createFolders() {
  if (flagDevMode) console.log("init.createFolders()");
  logEE.logToFile(
    "init.createFolders()",
    "info",
    "All folders should be created."
  );
  let mkcount = 0;
  folders.forEach((foldername) => {
    try {
      if (!fs.existsSync(path.join(__dirname, foldername))) {
        fsPromises.mkdir(path.join(__dirname, foldername));
        mkcount++;
      }
    } catch (err) {
      console.log(err);
    }
  });
  if (mkcount === 0) {
    if (flagDevMode) console.log("All folders already exist.");
    logEE.logToFile(
      "init.createFolders()",
      "INFO",
      "All folders already existed."
    );
  } else if (mkcount <= folders.length) {
    if (flagDevMode)
      console.log(mkcount + " of " + folders.length + " folders were created.");
    logEE.logToFile(
      "init.createFolders()",
      "info",
      mkcount + " of " + folders.length + " folders needed to be created."
    );
  } else {
    if (flagDevMode) console.log("All folders successfully created.");
    logEE.logToFile(
      "init.createFolders()",
      "info",
      "All folders successfully created."
    );
  }
}

function createFiles() {
  if (flagDevMode) console.log("init.createFiles()");
  logEE.logToFile("init.createFiles()", "info", "Files should be created.");
  try {
    let configdata = JSON.stringify(configjson, null, 2);
    if (!fs.existsSync(path.join(__dirname, "./json/config.json"))) {
      fs.writeFile("./json/config.json", configdata, (err) => {
        if (err) {
          console.log(err);
          logEE.logToFile(
            "init.createFiles()",
            "error",
            "config.json creation was unsuccessful."
          );
        } else {
          if (flagDevMode) console.log("Data written to config file");
          logEE.logToFile(
            "init.createFiles()",
            "info",
            "config.json successfully created."
          );
        }
      });
    } else {
      logEE.logToFile(
        "init.createFiles()",
        "info",
        "config.json already exists."
      );
    }

    if (!fs.existsSync(path.join(__dirname, "./views/usage.txt"))) {
      fs.writeFile("./views/usage.txt", usagetxt, (err) => {
        if (flagDevMode) console.log("Data written to usage.txt file");
        logEE.logToFile(
          "init.createFiles()",
          "info",
          "./views/usage.txt successfully created."
        );
      });
    } else {
      logEE.logToFile(
        "init.createFiles()",
        "info",
        "./views/usage.txt already exists."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

const myArgs = process.argv.slice(2);
function initializeApp() {
  if (flagDevMode) console.log("initializeApp()");
  logEE.logToFile("initializeApp()", "info", "init feature was called.");

  switch (myArgs[1]) {
    case "--all":
      if (flagDevMode) console.log("--all createFolders() & createFiles()");
      createFolders();
      createFiles();
      logEE.logToFile("init --all", "INFO", "Create all folders and files.");
      break;
    case "--cat":
      if (flagDevMode) console.log("--cat createFiles()");
      // TODO: Do all the folders exist? See issue #6 in github
      createFiles();
      logEE.logToFile("init --cat", "INFO", "Create all files.");
      break;
    case "--mk":
      if (flagDevMode) console.log("--mk createFolders()");
      createFolders();
      logEE.logToFile("init --mk", "INFO", "Create all folders.");
      break;
    case "--help":
    case "--h":
    default:
      fs.readFile(__dirname + "/views/init.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
  }
}

module.exports = {
  initializeApp,
};
