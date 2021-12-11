//console.log('hello world')

const http = require('http')    // Node has still a different sintax from browser-side import of ES6 modules (i.e. import http from 'http')
const express = require('express')
const app = express()

const notes = [
	{
		id: 1,
		content: 'HTML is esay (old)',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript (old)',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol (old)',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	}
]

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

// a server using Express 
app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log('id:',id);
    //console.log('notes:',notes);
    const note = notes.find(note => note.id === id)
    //console.log('note:',note);

    if (note) {
        response.json(note)
    } else {
        response.statusMessage = "The note number searched was not found";
        response.status(404).end()()
    }
    
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
