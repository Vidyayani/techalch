# Task 2
> A simple Node.js express app.

`node version : 16.0.0`
`npm version : 7.10.0`

Rest APIs curated from open source news and weather forecast APIs.

## Installation

Run routine install dependencies and start command as follows, this will start the services

```sh
npm install 
npm run start
```

## Usage example

_Please find postman file to try out the  apis that are built._

## Development details

1. Used JWT token for authentication
2. Used a generic crypting module "bcrypt" for encrypting password and comparing encryption for validation
3. Dev dependencies - eslint and nodemon
4. IDE - VScode

## Project Structure

* /models
    * consists of one file, user data object model script
* /routes
    * consists of routes categorized by auth, news or weather
* middleware.js
    * to generate and verify jwt tokens
* server.js
    * Entry point for the application

## Scope

1. Using [logger] with [INFO], [DEBUG], [ERROR] modes 
2. Use properties/json file to fetch values like APIKeys,urls,etc
3. Better structure of APIs to segregate data, requests and routers
4. Adding unit testing

<!-- Markdown link & img dfn's -->
[logger]: [https://www.npmjs.com/package/logger]
