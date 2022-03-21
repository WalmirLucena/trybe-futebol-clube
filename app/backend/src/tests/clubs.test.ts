import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import Clubs from '../database/models/Clubs';
import clubMock from '../mock/model/clubMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;



describe('Testando a Rota /clubs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Clubs, 'findAll').resolves(clubMock as Clubs[]);
  });

  after(() => {
    (User.findAll as sinon.SinonStub).restore();
  });

  it("Verifica se o status é o correto", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/clubs');

    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Verifica se o retorno correto possui todos os times necessárias", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/clubs');

    expect(chaiHttpResponse.body).to.have.length(15);

  })

  it("Verifica se a resposta tem as propriedades necessárias", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/clubs');

    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('clubName');
  })

})


describe('Testando a Rota /clubs/:id', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon.stub(Clubs, 'findOne').resolves(clubMock[0] as Clubs);
    });
  
    after(() => {
      (User.findAll as sinon.SinonStub).restore();
    });
  
    it("Quando o login é feito com sucesso, verifica se o status é o correto", async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1');
  
      expect(chaiHttpResponse).to.have.status(200);
    })
  
    it("Verifica se o retorno correto possui o time com o id definido", async ()=> {
      chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1');
  
      expect(chaiHttpResponse.body.id).to.equal(clubMock[0].id);
  
    })
  })
  
  
