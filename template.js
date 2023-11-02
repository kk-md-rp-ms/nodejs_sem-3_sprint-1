// Config template
exports.configTemplate = {
  name: "AppConfigCLI",
  version: "1.0.0",
  description: "The Command Line Interface (CLI) for the App",
  main: "app.js",
  superuser: "admin",
  database: "exampledb",
};

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

exports.allTokensTemplate = [];

// Define variables for "--help" option.
// Variables will be used by "init" feature to create help files in "txt" folder

exports.helpAppFeature = `

App for managing tokens associated with user accounts

  app --help                        displays help

Description:

    App provides various commands for initializing the app, configuring settings, 
    and performing actions related to tokens, such as generating, updating, 
    and searching for tokens based on usernames, emails, or phone numbers.

Initialization Commands: 

  app init <option>

    --help                          displays help for the init command
    --all                           creates the folder structure and the config and help files
    --mk                            creates the folder structure
    --cat                           creates the config file with default settings and the help files

Configuration Commands:

  app config <option>

    --help                          displays help for the config command
    --show                          displays a list of the current config settings
  
    --new c <key> <value>           adds a new attributes to the app config file
    --new t <key> <value>           adds a new attributes to the token config file
    --new u <key> <value>           adds a new attributes to the user config file

    --reset c                       resets the app config file with default settings
    --reset t                       resets the token config file with default settings
    --reset u                       resets the user config file with default settings
  
    --set c <key> <value>           sets a specific config setting for app config file
    --set t <key> <value>           sets a specific config setting for token config file
    --set u <key> <value>           sets a specific config setting for user config file

Token Management Commands:

  app token <option>

    --help                          displays help for the token command
    --count                         displays a count of the tokens created

    --new <username>                generates a token for a given username, saves tokens to the json file
    --new <username> <phone>        generates a token for a given username, saves tokens to the json file

    --new <username> <phone> <email> 
                                    generates a token for a given username, saves tokens to the json file
    
    --upd e <username> <email>      updates the json entry with a new email
    --upd p <username> <phone>      updates the json entry with a new phone number

    --search e <email>              fetches a token for a given email
    --search p <phone>              fetches a token for a given phone number
    --search u <username>           fetches a token for a given username

`;

exports.helpInitFeature = `

Name: init

Description:                    feature for initializing the app

Synopsis:                       app init <option>

The options are as follows:

  --help                        displays help for the init command
  --all                         creates the folder structure and the config and help files
  --mk                          creates the folder structure
  --cat                         creates the config file with default settings and the help files

`;

exports.helpCfgFeature = `

Name: config

Description:                    feature for configuring settings

Synopsis:                       app config <option>

The options are as follows:

  --help                        displays help for the config command
  --show                        displays a list of the current config settings
  
  --new c <key> <value>         adds a new attributes to the app config file
  --new t <key> <value>         adds a new attributes to the token config file
  --new u <key> <value>         adds a new attributes to the user config file
  
  --reset c                     resets the app config file with default settings
  --reset t                     resets the token config file with default settings
  --reset u                     resets the user config file with default settings

  --set c <key> <value>         sets a specific config setting for app config file
  --set t <key> <value>         sets a specific config setting for token config file
  --set u <key> <value>         sets a specific config setting for user config file

`;

exports.helpTokenFeature = `

Name: token

Description:                    feature for generating and managing tokens

Synopsis:                       app token <option>

The options are as follows:

  --help                        displays help for the token command
  --count                       displays a count of the tokens created

  --new <username>              generates a token for a given username, saves tokens to the json file
  --new <username> <phone>      generates a token for a given username, saves tokens to the json file

  --new <username> <phone> <email>         
                                generates a token for a given username, saves tokens to the json file

  --upd e <username> <email>    updates the json entry with a new email
  --upd p <username> <phone>    updates the json entry with a new phone number

  --search e <email>            fetches a token for a given email
  --search p <phone>            fetches a token for a given phone number
  --search u <username>         fetches a token for a given username

`;

// Define basic HTML templates for different cases
exports.notFoundPageTemplate = `  
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Not Found</title>
  </head>
  <body>
    <main>
      <h1>404: Page Not Found</h1>
    </main>
  </body>
`;

exports.limitedPageTemplate = `
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home</title>
</head>
<body>
  <main>
    <h1>Website is running with limited functionality</h1>
    <p>Initialize the App first</p>
  </main>
</body>
`;

exports.indexPageTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
  </head>
  <body>
    <main>
      <h1>Home</h1>
      <a href="./token">Generate Token</a>
      <a href="./token-count">See current number of Tokens</a>
    </main>
  </body>
</html>
`;

exports.tokenPageTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Token</title>
  </head>
  <body>
    <main>
      <h1>Token</h1>
      <form action="token" method="POST">
        <input type="text" name="username" />
        <input type="submit" />
      </form>
    </main>
  </body>
</html>
`;
