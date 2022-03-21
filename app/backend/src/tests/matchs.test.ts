import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import clubMock from '../mock/model/clubMock';
import matchsMock from '../mock/model/matchsMock';

import { Response } from 'superagent';
import Matchs from '../database/models/Matchs';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a Rota GET /matchs', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Matchs, 'findAll').resolves(matchsMock as any[]);
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  });

  it("Verifica se o status é o correto", async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matchs');

    expect(chaiHttpResponse).to.have.status(200);
  })

  it("Verifica se o retorno correto possui todos as partidas necessárias", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matchs');

    expect(chaiHttpResponse.body).to.have.length(3);

  })

  it("Verifica se a resposta tem as propriedades necessárias", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matchs');

    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');

  })

  it("Verifica se passando a query inProgress=true a resposta é a esperada", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matchs?inProgress=true');

    expect(chaiHttpResponse.body).to.have.length(1);

  })


  it("Verifica se passando a query inProgress=false a resposta é a esperada", async ()=> {
    chaiHttpResponse = await chai
    .request(app)
    .get('/matchs?inProgress=false');

    expect(chaiHttpResponse.body).to.have.length(1);

  })



})

describe("Testando a Rota Post /matchs", () => {
    let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Matchs, 'create').resolves({
        id: 4,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true} as Matchs);
  });

  after(() => {
    (Matchs.create as sinon.SinonStub).restore();
  });


    it("Verifica se é possível criar uma nova partida", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(matchsMock[0])
    
        expect(chaiHttpResponse).to.have.status(200);
    
      });

      it("Verifica se as propriedades necessárias são retornadas", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(matchsMock[0])
    
        expect(chaiHttpResponse).to.have.property('id');
        expect(chaiHttpResponse).to.have.property('homeTeam');
        expect(chaiHttpResponse).to.have.property('homeTeamGoals');
        expect(chaiHttpResponse).to.have.property('awayTeam');
        expect(chaiHttpResponse).to.have.property('awayTeamGoals');
        expect(chaiHttpResponse).to.have.property('inProgress');


    
      })
})

describe("Testando a Rota Patch /matchs", () => {
    let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Matchs, 'update');
  });

  after(() => {
    (Matchs.update as sinon.SinonStub).restore();
  });


    it("Verifica se o status é o correto", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/1/finish');

        expect(chaiHttpResponse).to.have.status(200);
    
      });

})
  

