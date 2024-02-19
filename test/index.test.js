// index.test.js
const request = require('supertest');
const { app, server } = require('../index');

afterAll((done) => {
  server.close(done);
});

describe('GET /get', () => {
  it('should return the content of data.json', async () => {
    const response = await request(app).get('/get');
    
    expect(response.status).toBe(200);
    response.body.forEach(item => {
        expect(item).toEqual(expect.objectContaining({
          name: expect.any(String),
          age: expect.any(Number),
          city: expect.any(String),
          interests: expect.any(Array),
          isStudent: expect.any(Boolean),
            address: expect.objectContaining({
         street: expect.any(String),
         zipCode: expect.any(String),
         country: expect.any(String),
        }),
        }));
      });
    // expect(response.body).toEqual(expect.objectContaining({
    //   name: expect.any(String),
    //   age: expect.any(Number),
    //   city: expect.any(String),
    //   interests: expect.any(Array),
    //   isStudent: expect.any(Boolean),
    //   address: expect.objectContaining({
    //     street: expect.any(String),
    //     zipCode: expect.any(String),
    //     country: expect.any(String),
    //   }),
    // }));
  });

  it('should handle errors when reading data.json', async () => {
    // Mocking the fs.readFile function to simulate an error
    jest.spyOn(require('fs').promises, 'readFile').mockRejectedValue(new Error('File read error'));

    const response = await request(app).get('/get');

    expect(response.status).toBe(500);
    expect(response.text).toContain('Internal Server Error');
  });
});
