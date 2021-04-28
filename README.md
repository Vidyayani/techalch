# Task 2
> A simple Node.js express app.

`node version : 16.0.0`
`npm version : 7.10.0`

Rest APIs curated from open source news and weather forecast APIs.

## Installation

Run routine install dependencies and start command as follows to start the service

```sh
npm install 
npm run start
```

For unit test cases, run routine command

```sh
npm run test
```

## Usage example

_Please use the postman collection link shared, to try out the apis._

_Use import option in collections and use this link <https://www.getpostman.com/collections/35f4b5ef73ab4cbe80b6>_

## Development details

1. Used JWT token for authentication
2. Used a generic crypting module "bcrypt" for encrypting password and comparing encryption for validation
3. Dev dependencies - eslint and nodemon
4. IDE - VScode
5. All values have been mostly hardcoded
6. Used mocha and chai for unit testing
7. To keep the application simple used data harcoded in JS file instead of using any DB

## Project Structure

* /models
    * consists of one file, user data object model script
    * user.js consists of some cardcoded (user,password) values which can be used as new user info gets saved only in runtime memory
* /routes
    * consists of routes categorized into different files by auth, news or weather
    * auth.js - login and signup with encryption and jwt token generation
    * news.js - jwt verification and fetches top 20 stories by search string
    * weather.js - fetch 5 day forecast by picking a consistent time of the day 
* middleware.js
    * to generate and verify jwt tokens
* server.js
    * Entry point for the application

## Scope

1. Using [logger] with [INFO], [DEBUG], [ERROR] modes 
2. Use properties/json file to fetch values like APIKeys,urls,etc
3. Better structure of APIs to segregate data, requests and routers
4. ~~Adding unit testing~~

<!-- Markdown link & img dfn's -->
[logger]: https://www.npmjs.com/package/logger
