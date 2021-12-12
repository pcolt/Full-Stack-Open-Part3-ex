# Deploy and see the app with Heroku

To deploy this backend part3 together with React frontend run 
**`npm run deploy:full`** 
command (see 'deploy:full' in *package.json* for the full command)

To see the application in production visit https://secure-ridge-67129.herokuapp.com/
To see the json notes on the backend visit https://secure-ridge-67129.herokuapp.com/api/notes

To deploy manually on heroku run from the command line:
**`heroku login`** 
and then after have commited and pushed all the changes to the repository on github run:
**`git push heroku`**.
If any issue occurs print out the logs with:
**`heroku logs -t`**.
You can see now the back-end application visiting https://secure-ridge-67129.herokuapp.com/api/notes 


# Watch the app locally

We can run locally the program directly with Node from the command line:
**`node index.js`** (it needs field "main":"index.js" in package.json)
Or we can run it as an npm script:
**`npm start`**

We can now open locally our application in the browser by visiting the address 
http://localhost:3001


# Other notes

You can start the interactive node-repl by typing in 
`node` 
in the command line

If we start working on the project on another computer, we can install all up-to-date dependencies (node_modules folder is marked by .gitignore) of the project defined in package.json with the command:
`npm install`

We can start our application with nodemon like this:
`npm run dev`
Changes to the application code now cause the server to restart automatically. 
These development dependencies are not needed when the application is run in production mode on the production server (e.g. Heroku)

