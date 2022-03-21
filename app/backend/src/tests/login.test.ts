import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import userMock from '../mock/model/userMock';

import { Response } from 'superagent';

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
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it("Quando o login é feito com sucesso, verifica se o status é o correto", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: userMock[0].email,
      password: userMock[0].password
    });

    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Verifica se o retorno correto possui todas as propriedades necessárias", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: userMock[0].email,
      password: userMock[0].password
    });

    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body).to.have.property('token');


  })

  it("Quando o email ou senha é invalido", async ()=> {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: userMock[1].email,
      password: userMock[1].password
    });

    expect(chaiHttpResponse).to.have.status(401);
  })


})

describe("Testando a rota /login/validate", ()=> {
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


  it("Quando o login é feito com sucesso, verifica se o status é o correto", async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: userMock[0].email,
      password: userMock[0].password
    });

    chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('Authorization', login.body.token)
    

    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Verifica se o role é o correto", async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: userMock[0].email,
      password: userMock[0].password
    });

    chaiHttpResponse = await chai
    .request(app)
    .post('/login/validate')
    .set('Authorization', login.body.token)
    

    expect(chaiHttpResponse.body).to.be.equal('user');
  })
})