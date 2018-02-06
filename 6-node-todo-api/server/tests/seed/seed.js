const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userOnePayload = {_id: userOneId, access: 'auth'};

const users = [{
  _id: userOneId,
  email: 'floyd@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign(userOnePayload, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'kots@example.com',
  password: 'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: new Date().getTime()
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  })
    .then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  })
    .then(() => done());
};


module.exports = { todos, populateTodos, users, populateUsers };