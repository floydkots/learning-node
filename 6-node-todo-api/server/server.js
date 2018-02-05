let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

let newUser = new User({
  email: 'floydkots@gmail.com'
});

newUser.save().then((user) => {
  console.log(user);
}, (error) => {
  console.log(error);
});

// let newTodo = Todo({text: ' Edit this video '});
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (error) => {
//   console.log('Unable to save todo', error);
// });
