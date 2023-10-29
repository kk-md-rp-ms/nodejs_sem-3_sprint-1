const folders = ["models", "views", "routes", "logs", "json"];

const configjson = {
  name: "AppConfigCLI",
  version: "1.0.0",
  description: "The Command Line Interface (CLI) for the App.",
  main: "app.js",
  superuser: "adm1n",
  database: "exampledb",
};

const usagetxt = `

app <command> <option>

Usage:

app --help                            displays help
app init --all                        creates the folder structure and config file
app init --mk                         creates the folder structure
app init --cat                        creates the config file with default settings
app config --show                     displays a list of the current config settings
app config --reset                    resets the config file with default settings
app config --set                      sets a specific config setting
app token --count                     displays a count of the tokens created
app token --list                      list all the usernames with tokens
app token --new <username>            generates a token for a given username, saves tokens to the json file
app token --upd p <username> <phone>  updates the json entry with phone number
app token --upd e <username> <email>  updates the json entry with email
app token --fetch <username>          fetches a user record for a given username
app token --search u <username>       searches a token for a given username
app token --search e <email>          searches a token for a given email
app token --search p <phone>          searches a token for a given phone number

`;

const inittxt = `

app init <command> <option>

Usage:

app init --all          creates the folder structure and config file
app init --mk           creates the folder structure
app init --cat          creates the config file with default settings

`;

const configtxt = `

app <command> <option>

Usage:

app config --show     displays a list of the current config settings
app config --reset    resets the config file with default settings
app config --set      sets a specific config setting

`;

module.exports = {
  folders,
  configjson,
  usagetxt,
  inittxt,
  configtxt,
};
