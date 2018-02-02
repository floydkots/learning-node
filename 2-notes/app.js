const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const params = {
  title: {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
  }
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: params.title,
    body: params.body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: params.title,
  })
  .command('remove', 'Remove note', {
    title: params.title
  })
  .help()
  .argv;
const command = process.argv[2];


if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note created! ${notes.logNote(note)}`)
  } else {
    console.log('The note title is already in use.')
  }
} else if (command === 'read') {
  note = notes.getNote(argv.title);
  if (note) {
    console.log(`Note read! ${notes.logNote(note)}`);
  } else {
    console.log('The note was not found');
  }
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else if (command === 'list') {
  notes.getAll();
} else {
  console.log('Command not recognized')
}
