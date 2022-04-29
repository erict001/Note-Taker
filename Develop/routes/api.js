const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// get /api/notes to read db.json and return saved notes
router.get('/', (req, res) => {
    // read file
    fs.readFile("./db/db.json", "utf-8", (err,data) =>{
        if (err){
            throw err
        } else {
            // if successful, parse data
            const notes = JSON.parse(data)
            // respond with parsed data
            res.json(notes);
        }   
    })
})

// post /api/notes to receive a new note and save it to db.json, retu
router.post('/', (req, res) => {
    // read file 
    fs.readFile("./db/db.json", "utf-8", (err,data) =>{
        if (err){
            throw err
        } else {
            // is successful, parse data
            const notes = JSON.parse(data)
            // obtain body of user input and save as new note
            const newNote = req.body;
            // append  new note with an id randomly generated fron uuid npm package
            newNote.id = uuidv4();
            // add new note to array of notes in db file
            notes.push(newNote)
            // write db file with new array of notes, containing the addition
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err, data) => {
                if (err){
                    throw err
                } else {
                    res.json(notes)
                }
            })
        }   
    })
})

// identify note to delete based on unique id
router.delete('/:id', (req, res) => {
    // read the database file
    fs.readFile("./db/db.json", "utf-8", (err,data) =>{
        if (err){
            throw err
        } else {
            // parse the data
            let notes = JSON.parse(data)
            // identify selected note based on it's id
            const requestedNote = notes.some(note => note.id == req.params.id);
            // if that note exists
            if (requestedNote) {
            // create array with selected note filtered OUT
            const remainingNotes = notes.filter(note => note.id != req.params.id);
            // set our notes array equal to the remaining notes
            notes = remainingNotes;
            // write database file
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err, data) => {
                if (err){
                    throw err
                } else {
                    res.json(notes)
                }
            })
            }
        }   
    })
})

module.exports = router;