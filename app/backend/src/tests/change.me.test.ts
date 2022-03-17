import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { describe } from 'mocha';
import userMock from '../mock/model/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a Rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Quando o login é feito com sucesso", async ()=> {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      username: userMock[0].username,
      password: userMock[0].password
    });

    expect(chaiHttpResponse).to.be.eq(200);
  })

  it("Quando o email ou senha é invalido", async ()=> {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      username: userMock[1].username,
      password: userMock[1].password
    });

    expect(chaiHttpResponse).to.be.eq(401);
  })


})