const fs = require('fs');

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return []
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {title, body};
  let duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  for (const note of fetchNotes()) {
    console.log(logNote(note))
  }
};

const getNote = (title) => {
  let notes = fetchNotes();
  return notes.find(note => note.title === title);
};

const removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length
};

const logNote = (note) => {
  debugger;
  return `Title: ${note.title}, Body: ${note.body}`
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};