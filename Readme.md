Let's navigate to an appropriate directory, and create a new template for our application with the 
`npm init` 
command

We can run the program directly with Node from the command line:
`node index.js` (it needs field "main":"index.js" in package.json)
Or we can run it as an npm script:
`npm start`

We can open our humble application in the browser by visiting the address 
http://localhost:3001

You can start the interactive node-repl by typing in 
`node` 
in the command line

If we start working on the project on another computer, we can install all up-to-date dependencies (node_modules folder is marked by .gitignore) of the project defined in package.json with the command:
`npm install`

We can start our application with nodemon like this:
`npm run dev`
Changes to the application code now cause the server to restart automatically. 
These development dependencies are not needed when the application is run in production mode on the production server (e.g. Heroku)