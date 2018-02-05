const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a77dd16dc384adb869f13cb')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // })
  //   .then((result) => {
  //     console.log(result);
  //   })

  db.collection('Users').findOneAndUpdate(
    {
      name: 'Kots'
    }, {
      $set: {name: 'Floyd Kots'},
      $inc: {age: 1}
    }, {
      returnOriginal: false
    })
    .then((result) => {
      console.log(result);
    })


  // db.close();
});