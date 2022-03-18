import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';

import User from '../database/models/User';/* 
import { describe } from 'mocha'; */
import userMock from '../mock/model/userMock';

import { Response, Request } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mock = [
  {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin',
  },
  {
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
      password: 'secret_user',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Quando o login é feito com sucesso", async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      username: mock[0].username,
      password: mock[0].password
    });
    /* .end(async function (err, res) {
      expect(res).to.have.status(200)    }); */
    console.log(chaiHttpResponse);
    

    expect(chaiHttpResponse).to.be.eq(404);
  })

  it("Quando o email ou senha é invalido", async ()=> {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      username: mock[1].username,
      password: mock[1].password
    })
    .end( function (err, response) {
      expect(response).to.have.status(401)
      expect('/home')    });

   /*  expect(chaiHttpResponse).to.be.eq(401); */
  })


})