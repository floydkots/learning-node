const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  //   });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  //   })

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false})
  //   .then((result) => {
  //     console.log(result);
  //   })

  // Challenge #1: deleteMany
  db.collection('Users').deleteMany({name: 'Floyd'})
    .then((result) => {
      console.log(result);
    });

  // Challenge #2: findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a76ce9abb478d2b19418ab8')})
    .then((result) => {
      console.log(result);
    })

  // db.close();
});