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

// Define basic HTML templates for different pages
const metaAndLink = `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="/css/index.css" />`;

exports.notFoundPageTemplate = `<head>
    ${metaAndLink}
    <title>Not Found</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3">404: Page <span class="text--c--accent-1">Not Found</span></h1>
    </main>
  </body>`;

exports.limitedPageTemplate = `<head>
    ${metaAndLink}
    <title>Home</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3">Website is running with <span class="text--c--accent-1">limited functionality</span></h1>
      <p class="text--c--white fs--4xl">Initialize the App first</p>
    </main>
  </body>`;

exports.indexPageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    ${metaAndLink}
    <title>Home</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3">Home</h1>
      <div>
        <a class="d-block" href="token">Generate Token</a>
        <a class="d-block" href="token-count">See current number of Tokens</a>      
      </div>
    </main>
  </body>
</html>`;

exports.tokenPageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    ${metaAndLink}
    <title>Token</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3">Token</h1>
      <form action="token" method="POST">
        <input class="bg--c--accent-1" type="text" name="username" />
        <input class="btn--submit" type="submit" />
      </form>
    </main>
  </body>
</html>`;

exports.createNewTokenPageTemplate = (
  tokenField,
  token,
  tokenCreated,
  tokenExpires
) => {
  return `<head>
    ${metaAndLink}
    <title>New Token</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3"><span class="text--c--accent-1">Success.</span> Token is created</h1>
      <div class="text--white">
        <p><span class="text--c--accent-1">\"${tokenField}\"</span> token is: <span class="fs--3xl text--c--accent-1">${token}</span></p>
        <p>Token creation date: <span class="fs--m text--c--accent-1">${tokenCreated}</span></p>
        <p>Token expiry date: <span class="fs--m text--c--accent-1">${tokenExpires}</span></p>
      </div>
    </main>
  </body>`;
};

exports.createTokenCountPageTemplate = (count) => {
  return `<head>
    ${metaAndLink}
    <title>Token Count</title>
  </head>
  <body>
    <main class="container container--pall">
      <h1 class="mb--3"><span class="text--c--accent-1">Token</span> Count</h1>
      <p>Current count of tokens: <span class="fs--3xl text--c--accent-1">${count}</span></p>
    </main>
  </body>`;
};
