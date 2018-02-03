const express = require('express');

let app = express();

app.get('/', (request, response) => {
  response.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});


app.get('/users', (request, response) => {
  response.send([
    {name: 'Floyd', age: 24},
    {name: 'Kots', age: 25}
  ]);
});


app.listen(3000);

module.exports.app = app;
