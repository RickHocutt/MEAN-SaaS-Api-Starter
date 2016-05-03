# sass-api-starter
A starter API with Node, Express, MongoDB, JWT tokens, Angular 2, TypeScript and Bootstrap 3 that allows authentication and user management and can be used to start your app.

## Install
Run `npm install` in /api and /client directories.

## Configure
The API endpoint is defined for the client in /client/app/config.ts, and the Client endpoint is defined for the API in /api/config.js as `clientUrl`. That same file contains a `secret` used to sign the JWT tokens used by your app along with some other self-explanatory settings for JWT. To successfully send email, you will need to visit http://www.sendgrid.com to request an API key and configure your free account.

## Run
To start the API, run `node index` in the /api directory.
To start the client run `npm start` in the /client directory.


