const mongoose = require('mongoose')

// const url = `mongodb+srv://fullstack:<password>@cluster0.ck2n2.mongodb.net/note-app?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to url:',url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})

// One way to format the objects returned by Mongoose is to modify the toJSON method 
// of the schema, which is used on all instances of the models produced with that schema
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// In the Note model definition, the first "Note" parameter is the singular 
// name of the model. The name of the collection will be the lowercased plural notes,
// because the Mongoose convention is to automatically name collections as the plural 
// (e.g. notes) when the schema refers to them in the singular (e.g. Note).
const Note = mongoose.model('Note', noteSchema)

module.exports = mongoose.model('Note', noteSchema)