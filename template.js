const tokenFeature = `

Name:                       token
                            feature for generating and managing tokens

Synopsis:                   app token <option>

The options are as follows:

--help                      displays help for the token command
--count                     displays a count of the tokens created

--new <username>            generates a token for a given username, saves tokens to the json file
--upd p <username> <phone>  updates the json entry with a new phone number
--upd e <username> <email>  updates the json entry with a new email

--search u <username>       fetches a token for a given username
--search e <email>          fetches a token for a given email
--search p <phone>          fetches a token for a given phone number

`;
