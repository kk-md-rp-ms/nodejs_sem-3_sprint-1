// Folder structure created by "init" feature
exports.folderStructure = ["views", "logs", "json", "text"];

// User template used to generate a new token
exports.userTemplate = {
  username: null,
  phone: null,
  email: null,
};

// Token template used to generate a new token
exports.tokenTemplate = {
  token: null,
  created: null,
  expires: null,
};

// Define variables for "--help" option.
// Variables will be used by "init" feature to create help files in "txt" folder

exports.helpAllFeatures = `

App for managing tokens associated with user accounts

  app --help                     displays help

Description:

    App provides various commands for initializing the app, configuring settings, 
    and performing actions related to tokens, such as generating, updating, 
    and searching for tokens based on usernames, emails, or phone numbers.

Initialization Commands: 

  app init <option>

    --help                     displays help for the init command
    --all                      creates the folder structure and the config and help files
    --mk                       creates the folder structure
    --cat                      creates the config file with default settings and the help files

Configuration Commands:

  app config <option>

    --help                     displays help for the config command
    --show                     displays a list of the current config settings
    --reset                    resets the config file with default settings
    --set <option> <value>
                               sets a specific config setting

Token Management Commands:

  app token <option>

    --help                      displays help for the token command
    --count                     displays a count of the tokens created

    --new <username>            
                                generates a token for a given username, saves tokens to the json file
    --new <username> <phone>           
                                generates a token for a given username, saves tokens to the json file

    --new <username> <phone> <email>         
                                generates a token for a given username, saves tokens to the json file
    
    --upd p <username> <phone>  
                                updates the json entry with a new phone number
    
    --upd e <username> <email>  
                                updates the json entry with a new email

    --search u <username>       fetches a token for a given username
    --search e <email>          fetches a token for a given email
    --search p <phone>          fetches a token for a given phone number

`;

exports.helpInitFeature = `

Name:                       init

Description:                feature for initializing the app

Synopsis:                   app init <option>

The options are as follows:

  --help                    displays help for the init command
  --all                     creates the folder structure and the config and help files
  --mk                      creates the folder structure
  --cat                     creates the config file with default settings and the help files

`;

exports.helpCfgFeature = `

Name:                       config

Description:                feature for configuring settings

Synopsis:                   app config <option>

The options are as follows:

  --help                    displays help for the config command
  --show                    displays a list of the current config settings
  --reset                   resets the config file with default settings
  --set <option> <value>
                            sets a specific config setting

`;

exports.helpTokenFeature = `

Name:                       token

Description:                feature for generating and managing tokens

Synopsis:                   app token <option>

The options are as follows:

  --help                    displays help for the token command
  --count                   displays a count of the tokens created

  --new <username>            
                            generates a token for a given username, saves tokens to the json file
  --new <username> <phone>           
                            generates a token for a given username, saves tokens to the json file

  --new <username> <phone> <email>         
                            generates a token for a given username, saves tokens to the json file

  --upd p <username> <phone>  
                            updates the json entry with a new phone number

  --upd e <username> <email>  
                            updates the json entry with a new email

  --search u <username>     fetches a token for a given username
  --search e <email>        fetches a token for a given email
  --search p <phone>        fetches a token for a given phone number

`;

exports.configjson = {
  name: "AppConfigCLI",
  version: "1.0.0",
  description: "The Command Line Interface (CLI) for the App.",
  main: "app.js",
  superuser: "adm1n",
  database: "exampledb",
};

exports.usagetxt = `

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
