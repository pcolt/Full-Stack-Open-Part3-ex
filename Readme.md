From Helsinki University's [FullStackOpen Part 3](https://fullstackopen.com/en/part3) : Experimenting with Node and Express writing a server that will be connected to the React app developed in Part2 

# Install

`git clone <repo-url>` (both server-Part3 and client-Part2 as two separate projects)
Then in part3 root folder run `npm install`   

# Deploy with Fly.io

### Watch the app
https://fulstackopen-part-3-2.fly.dev/

### Install Fly.io
Read the [guide](https://fly.io/docs/hands-on/install-flyctl/)

### Deploy

Located in the root of the app part-3, run in the command line:   
`fly auth login` - to login     
`fly launch` - to choose the name and launch the app   
`fly deploy` - to deploy   
`fly open` - to open   
`fly scale show` - to check how many machinies have been deploed, if under COUNT there is number 2, also run the following command: `fly scale count 1`   
`fly logs` - to watch server logs

# Database

### Login
 
Go to https://www.mongodb.com/


# Watch the app locally (dev)

To deploy the UI (a React frontend application developed in part 2) run:   

`npm run build:ui`   

We can run locally the program directly with Node from the command line:   

`node index.js`

(it needs field "main":"index.js" in package.json)   

Or we can run it as an npm script:   

`npm start`

We can now open locally our application in the browser by visiting the address   

http://localhost:3001   

To check other endpoints from backend and db visit (or rather open Insomnia):<br>
http://localhost:3001/api/notes <br>
http://localhost:3001/api/notes/61b75f9ea298f022768cfbbe   

We can also start our application with nodemon like this:   

`npm run dev`

Changes to the application code now cause the server to restart automatically.   
These development dependencies are not needed when the application is run in production mode on the production server (e.g. Heroku)   


# Other notes

You can start the interactive node-repl by typing in the command line:   
`node`   


# (NOT WORKING ANYMORE) Deploy with Heroku (production)

To build and copy the React frontend part2 to the backend part3 folder, and then to commit and push all the app to the repository on github and to deploy on Heroku run (see 'deploy:full' in *package.json* for the full command):

### npm run deploy:full 

We defined the environment variables for development in file .env, but the environment variable that defines the database URL in production should be set to Heroku with the heroku config:set command:

#### `heroku config:set MONGODB_URI='mongodb+srv://fullstack:secretpasswordhere@cluster0.ck2n2.mongodb.net/note-app?retryWrites=true&w=majority'`

To see the application running on Heroku visit:

### https://secure-ridge-67129.herokuapp.com/ 

To see the json notes on the backend visit: https://secure-ridge-67129.herokuapp.com/api/notes <br>

To deploy manually on heroku run from the command line **`heroku login`** and then after have commited and pushed all the changes to the repository on github run **`git push heroku`**.

If any issue occurs print out the logs with:
**`heroku logs -t`**. You can see now the back-end application visiting https://secure-ridge-67129.herokuapp.com/api/notes 

