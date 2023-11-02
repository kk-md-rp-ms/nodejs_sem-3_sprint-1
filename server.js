// Import required functions/variables from built-in modules
const { existsSync } = require("node:fs");
const { join } = require("node:path");

// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
const logEE = require("./log-emitter");
const { processTokenNew, getTokensNum } = require("./utils-token");

const {
  tokenField,
  tokenCreatedField,
  tokenExpiresField,
  allTokensFilePath,
} = require("./defaults");

const {
  notFoundPageTemplate,
  limitedPageTemplate,
  createNewTokenPageTemplate,
  createTokenCountPageTemplate,
  tokenErrorPageTemplate,
} = require("./template");

// Assign express app and other required constants
const app = express();
const PORT = 3000;
const isExist = existsSync(join(__dirname, "views"));

// Add middleware to serve static files from the public folder
app.use(express.static("public"));

// Add middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Define the root URL
app.get("^/$|^/home(.html)?$", (req, res) => {
  if (!isExist) {
    res.send(limitedPageTemplate);

    // Write log to the file
    logEE.logToFile(
      "Server",
      res.statusCode == 200 ? "success" : "warning",
      `Limited Website Version. Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
    );
  } else {
    res.sendFile(join(__dirname, "views", "index.html"), (err) => {
      if (err) {
        // Handle errors, such as file not found
        res.status(404).send(notFoundPageTemplate);
      }
    });

    // Write log to the file
    logEE.logToFile(
      "Server",
      res.statusCode == 200 ? "success" : "warning",
      `Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
    );
  }
});

app.get("^/token-count(.html)?$", async (req, res) => {
  if (!isExist) {
    res.status(404).send(notFoundPageTemplate);
  } else {
    const currentTokenCount = await getTokensNum(allTokensFilePath);
    res.send(createTokenCountPageTemplate(currentTokenCount));
  }

  // Write log to the file
  logEE.logToFile(
    "Server",
    res.statusCode == 200 ? "success" : "warning",
    `Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
  );
});

app.get("^/token(.html)?$", (req, res) => {
  if (!isExist) {
    res.status(404).send(notFoundPageTemplate);
  } else {
    res.sendFile(join(__dirname, "views", "token.html"), (err) => {
      if (err) {
        // Handle errors, such as file not found
        res.status(404).send(notFoundPageTemplate);
      }
    });
  }

  // issue: #91
  // res.statusMessage shows "undefined" on statusCode == 200
  // res.statusMessage shows 404: "Not Found" only in case (!isExist)

  // Write log to the file
  logEE.logToFile(
    "Server",
    res.statusCode == 200 ? "success" : "warning",
    `Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
  );
});

app.post("^/token(.html)?$", async (req, res) => {
  if (req.body.username.trim() !== "") {
    const tokenObj = await processTokenNew([req.body.username]);
    const token = tokenObj[tokenField];
    const tokenCreated = tokenObj[tokenCreatedField];
    const tokenExpires = tokenObj[tokenExpiresField];
    res.send(
      createNewTokenPageTemplate(
        req.body.username,
        token,
        tokenCreated,
        tokenExpires
      )
    );
  } else {
    res.status(400).send(tokenErrorPageTemplate);
  }

  // Write log to the file
  logEE.logToFile(
    "Server",
    res.statusCode == 200 ? "success" : "warning",
    `Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
  );
});

app.get("/*", (req, res) => {
  res.status(404).send(notFoundPageTemplate);

  // Write log to the file
  logEE.logToFile(
    "Server",
    "warning",
    `Method: \"${req.method}\", url: \"${req.url}\", code: \"${res.statusCode}\", message: \"${res.statusMessage}\"`
  );
});

// Start the server
app.listen(PORT, () => {
  const feedbackMessage = `Server is running on port ${PORT}`;

  // Provide feedback
  console.log(feedbackMessage);

  // Write log to the file
  logEE.logToFile("Server", "info", feedbackMessage);
});
