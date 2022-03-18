import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import userMock from '../mock/model/userMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mock = [
  {
    id: 1,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: 'secret_user',
  },
  {
    id:3,
    username: 'Rubao',
    role: 'rubao',
    email: 'rubao@user.com',
    password: 'boladao',
  },
];


describe('Testando a Rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Quando o login é feito com sucesso", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: mock[0].email,
      password: mock[0].password
    });

    console.log(chaiHttpResponse);
    

    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Quando o email ou senha é invalido", async ()=> {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: mock[1].email,
      password: mock[1].password
    });

    expect(chaiHttpResponse).to.have.status(401);
  })


})