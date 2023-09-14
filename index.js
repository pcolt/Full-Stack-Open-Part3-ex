//console.log('hello world')

require('dotenv').config()
// Node + http
const http = require('http')    // Node has still a different sintax from browser-side import of ES6 modules (i.e. import http from 'http')
// Express
const express = require('express')
const { request } = require('express')
const app = express()
// express json-parser (a middleware)
app.use(express.json())
// to allow cors requests from all origins (another middleware)
const cors = require('cors')
app.use(cors())
// To make express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware
app.use(express.static('build'))
// import module connection to mongodb database with mongogoose library
const Note = require('./models/note')

// now we use a mongodb database
// let notes = [
// 	{
// 		id: 1,
// 		content: 'HTML is esay (old)',
// 		date: '2019-05-30T17:30:31.098Z',
// 		important: true
// 	},
// 	{
// 		id: 2,
// 		content: 'Browser can execute only JavaScript (old)',
// 		date: '2019-05-30T18:39:34.091Z',
// 		important: false
// 	},
// 	{
// 		id: 3,
// 		content: 'GET and POST are the most important methods of HTTP protocol (old)',
// 		date: '2019-05-30T19:20:14.298Z',
// 		important: true
// 	}
// ]


// // a server with only Node and http module
// const app = http.createServer((request, response) => {
//     // response.writeHead(200, {'Content-Type': 'text/plain'})
//     // response.end('Hello world!!')
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// Middleware are functions that can be used for handling request and response objects
const requestLogger = (request, response, next) => {
    console.log('Method:',request.method);
    console.log('Path:',request.path);
    console.log('Body:',request.body);
    console.log('---');
    next()
}
app.use(requestLogger)

// a server using Express 
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // //console.log('id:',id);
    // //console.log('notes:',notes);
    // const note = notes.find(note => note.id === id)
    // //console.log('note:',note);

    // if (note) {
    //     response.json(note)
    // } else {
    //     response.statusMessage = "The note number searched was not found";
    //     response.status(404).end()
    // }

    // with mongodb
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        // .catch(error => {
        //     console.log('Error:', error)
        //     response.status(400).send({ error: 'malformed id' })
        // })
        // If the next function is called with a parameter, then the execution will continue
        // to the error handler middleware
        .catch(error => next(error))    
        // If next was called without a parameter, then the execution would simply move onto 
        // the next route or middleware. 
})

app.delete('/api/notes/:id', (request, response) => {
    // const id = Number(request.params.id)
    // notes = notes.filter(note => note.id !== id)
    //console.log('notes:',notes);
    // response.status(204).end()

    // with mongodb and mongoose
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
    const body = request.body
    //console.log('note:',note);

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // with mongodb
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    // notes = notes.concat(note)
    //console.log('notes:',notes);
    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))

    // response.json(note)
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

// another middleware after the routes that handle call to a different endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malfomed id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}
// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
// const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
