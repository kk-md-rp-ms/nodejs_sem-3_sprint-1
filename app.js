// Import required functions/variables from built-in modules
const { argv } = require("node:process");

// Import required functions/variables from custom modules
const { tokenFeature } = require("./tokenFeature");

// Get command-line arguments, excluding the first two elements (node executable and script filename)
const commandsArr = argv.slice(2);

// Extract the feature name from the command-line arguments
const feature = commandsArr[0];

// Extract feature-specific options from the command-line arguments
const featureOptions = commandsArr.slice(1);

// Use a switch statement to execute code based on the specified feature
switch (feature) {
  case "token":
  case "t":
    // If the feature is "token" or "t", call the "tokenFeature" function and pass the options
    tokenFeature(featureOptions);
    break;
  // Other cases will be add soon
}
