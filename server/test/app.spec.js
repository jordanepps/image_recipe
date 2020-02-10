const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Image Recipe Server"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Image Recipe Server');
  });
});
