const request = require('supertest');
const expect = require('expect');
const app = require('./server').app;

it('should return hello world', (done) => {
  request(app)
    .get('/')
    .expect(404)
    .expect((response) => {
      expect(response.body).toInclude({
        error: 'Page not found.'
      })
    })
    .end(done);
});

it('should return an array of users', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((response) => {
      expect(response.body).toInclude(
        { name: 'Floyd', age: 24 }
      )
        .toInclude(
          { name: 'Kots', age: 25 }
        )
    })
    .end(done)
});
