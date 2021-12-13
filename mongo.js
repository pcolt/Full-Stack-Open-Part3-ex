const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Usage: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ck2n2.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

// In the Note model definition, the first "Note" parameter is the singular 
// name of the model. The name of the collection will be the lowercased plural notes,
// because the Mongoose convention is to automatically name collections as the plural 
// (e.g. notes) when the schema refers to them in the singular (e.g. Note).
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'A note',
    date: new Date(),
    important: true
})

// add a new note
// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// retrieve all the notes from db
Note.find({}).then(result => {
    result.forEach(note => {
        console.log('note:',note)
    })
    mongoose.connection.close()
})

