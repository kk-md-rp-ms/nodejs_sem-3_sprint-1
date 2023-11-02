// Import required functions/variables from built-in modules
const { existsSync } = require("node:fs");
const { join } = require("node:path");

// Import external packages
const express = require("express");

// Import required functions/variables from custom modules
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
} = require("./template");
const { processTokenNew, getTokensNum } = require("./utils-token");

// Assign express app and other required constants
const app = express();
const PORT = 3000;
const isExist = existsSync(join(__dirname, "views"));

// Add middleware to serve static files from the public folder
app.use(express.static("public"));

// Add middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Define the root URL
app.get("^/$|^/home(.html)?$", (_, res) => {
  if (!isExist) {
    res.send(limitedPageTemplate);
  } else {
    res.sendFile(join(__dirname, "views", "index.html"), (err) => {
      if (err) {
        // Handle errors, such as file not found
        res.status(404).send(notFoundPageTemplate);
      }
    });
  }
});

app.get("^/token-count(.html)?$", async (_, res) => {
  if (!isExist) {
    res.status(404).send(notFoundPageTemplate);
  } else {
    const currentTokenCount = await getTokensNum(allTokensFilePath);
    res.send(createTokenCountPageTemplate(currentTokenCount));
  }
});

app.get("^/token(.html)?$", (_, res) => {
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
});

app.post("^/token(.html)?$", async (req, res) => {
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
});

app.get("/*", (_, res) => {
  res.send(notFoundPageTemplate);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
