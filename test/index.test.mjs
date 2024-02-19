// index.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect, use } = chai;
import * as appModule from '../index.cjs';

use(chaiHttp);

describe('GET /get', () => {
  let server;

  before(async () => {
    const { app, server: srv } = appModule;
    server = srv;
  });

  after(async () => {
    server.close();
  });

  it('should return the content of data.json', async () => {
    const res = await chai.request(appModule.app).get('/get');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    // Add more assertions based on the structure of your data.json
  });
});
