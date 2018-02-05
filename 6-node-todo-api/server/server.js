const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  let todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  })
});

app.get('/todos', (request, response) => {
  Todo.find()
    .then((todos) => {
      response.send({ todos });
    }, (error) => {
      response.status(400).send(error);
    })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = { app };