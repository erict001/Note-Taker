const express = require("express");
const fs = require("fs")
const path = require("path")
var app = express();

var PORT = process.env.PORT || 3000;

const allNotes = require('./Develop/db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// GET Route for homepage
app.get("/api/notes" , (req, res) => {
  res.json(allNotes.slice(1));
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

//build api routes
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
  notesArray = [];

  if (notesArray.length === 0)
  notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  FileSystem.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  )
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, allNotes);
  res.json(newNote);
});

// The below code effectively "starts" our server
app.listen(PORT, function () {
	console.log("App listening on PORT: " + PORT);
});