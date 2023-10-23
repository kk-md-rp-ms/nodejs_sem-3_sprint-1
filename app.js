const { argv } = require("process");

const { tokenFeature } = require("./utils-token");

const commandsArr = argv.slice(2);
const feature = commandsArr[0];
const featureOptions = commandsArr.slice(1);

switch (feature) {
  case "token":
  case "t":
    tokenFeature();
}

module.exports = {
  featureOptions,
};
