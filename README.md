# SaaS-Api-Starter
A starter API with Node, Express, MongoDB, JWT tokens, Angular 2, TypeScript and Bootstrap 3 that allows authentication and user management and can be used to start your app.

## Install
Run `npm install` in /api and /client directories.

### Dependencies
This project requires MongoDB and Angular2. You will need to [install MongoDB]. 
You may also need to do some extra work to get Angular2 working on your system, but in theory, NPM install should take care of that dependency.

### Configure
The API endpoint is defined for the client in `/client/app/config.ts`.

The client endpoint is defined for the API in `/api/config.js` as `clientUrl`. That same file contains a `secret` used to sign the JWT tokens used by your app along with some other self-explanatory settings for JWT. 

To successfully send email, you will need to visit http://www.sendgrid.com to request an API key and configure your free account. Enter the key in `/api/config.js` `sendgridKey`.

The MongoDB connection also must be configured in `/api/config.js` using the `database` property.

### Run
To start the API, run `node index` in the /api directory.
To start the client run `npm start` in the /client directory.

#### First Run
Point your browser to your api setup route (out of the box, it will run at [localhost:8080/api/setup]) which will install an admin user for you to test.
[localhost:8080/api/setup]: http://localhost:8080/api/setup

After running the first run script, visit your client (out of the box at [localhost:8180] and log in with the user the setup script returns.
[localhost:8180]: http://localhost:8180
![homeImage][]
[homeImage]: https://raw.githubusercontent.com/harveyramer/sass-api-starter/master/home-page.png

[install MongoDB]: https://docs.mongodb.org/manual/installation/

Please let me know if you have problems with installation at harvey[at]harveyramer[dot]com.
