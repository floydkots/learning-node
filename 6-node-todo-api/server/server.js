require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Todo Routes
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

app.get('/todos/:id', (request, response) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return response.status(404).send()
      }
      response.send({todo});
    })
    .catch((error) => {
      return response.status(400).send()
    })
});

app.delete('/todos/:id', (request, response) => {
  const id = request.params.id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return response.status(404).send()
      }
      return response.send({ todo })
    })
    .catch((error) => {
      return response.status(400).send();
    })
});

app.patch('/todos/:id', (request, response) => {
  const id = request.params.id;
  let body = _.pick(request.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return response.status(404).send();
      }
      response.send({ todo });
    })
    .catch((error) => {
      return response.status(400).send();
    })
});


// User Routes
app.post('/users', (request, response) => {
  let body = _.pick(request.body, ['email', 'password']);
  let user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      response.header('x-auth', token).send({ user })
    })
    .catch((error) => {
      response.status(400).send({error});
    })
});


app.get('/users/me', authenticate, (request, response) => {
  response.send({ user: request.user })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = { app };