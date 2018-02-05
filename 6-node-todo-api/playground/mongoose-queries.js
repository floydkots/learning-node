const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// let id = '5a782c68c076e34a6f19644311';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({_id: id})
//   .then((todos) => {
//     console.log('Todos', todos);
//   });
//
// Todo.findOne({_id: id})
//   .then((todo) => {
//     console.log('Todo', todo);
//   });

// Todo.findById(id)
// .then((todo) => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo by Id', todo);
// })
//   .catch((error) => console.log(error));


const userId = '5a780520b60ee35b48a1c0c4';

if (!ObjectID.isValid(userId)) {
  console.log('Id is not valid');
}

User.findById(userId)
  .then((todo) => {
    if (!todo) {
      return console.log('User not found');
    }
    console.log('User ', todo)
  })
  .catch((error) => console.log(error));


