const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });


Todo.findOneAndRemove({_id: '5a786575dc384adb869f2790'})
  .then((todo) => {
    console.log(todo)
  });


// Todo.findByIdAndRemove('5a786575dc384adb869f2790')
//   .then((todo) => {
//     console.log(todo);
//   });


