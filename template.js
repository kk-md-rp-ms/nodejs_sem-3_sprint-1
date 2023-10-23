const appAllFeatures = `

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
    --upd p <username> <phone>  
                                updates the json entry with a new phone number
    --upd e <username> <email>  
                                updates the json entry with a new email

    --search u <username>       fetches a token for a given username
    --search e <email>          fetches a token for a given email
    --search p <phone>          fetches a token for a given phone number

`;

const appInitFeature = `

Name:                       init

Description:                feature for initializing the app

Synopsis:                   app init <option>

The options are as follows:

  --help                    displays help for the init command
  --all                     creates the folder structure and the config and help files
  --mk                      creates the folder structure
  --cat                     creates the config file with default settings and the help files

`;

const appConfigFeature = `

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

const tokenFeature = `

Name:                       token

Description:                feature for generating and managing tokens

Synopsis:                   app token <option>

The options are as follows:

  --help                    displays help for the token command
  --count                   displays a count of the tokens created

  --new <username>            
                            generates a token for a given username, saves tokens to the json file
                            
  --upd p <username> <phone>  
                            updates the json entry with a new phone number

  --upd e <username> <email>  
                            updates the json entry with a new email

  --search u <username>     fetches a token for a given username
  --search e <email>        fetches a token for a given email
  --search p <phone>        fetches a token for a given phone number

`;
