import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matchs from '../database/models/Matchs';
import leaderboardService from '../database/services/leaderboardService';
import leaderboardMock from '../mock/service/leaderboard.Mock';
import ILeaderboard from '../database/interfaces/leaderboardInterface';

chai.use(chaiHttp);

const { expect } = chai;


describe("Testando a Rota GET /leaderboard/home", () => {
    let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(leaderboardService, 'generateLeaderboardHome').resolves(leaderboardMock as ILeaderboard[] );
  });

  after(() => {
    (leaderboardService.generateLeaderboardHome as sinon.SinonStub).restore();
  });


    it("Verifica se o status é o correto", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

        expect(chaiHttpResponse).to.have.status(200);
    
      });

      it("Verifica se o tamanho da resposta é o correto", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

        expect(chaiHttpResponse.body).to.have.length(16);
    
      });

      it("Verifica se a resposta possui todas as propriedades necessárias", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

        expect(chaiHttpResponse.body[0]).to.have.property("name");
        expect(chaiHttpResponse.body[0]).to.have.property("totalPoints");
        expect(chaiHttpResponse.body[0]).to.have.property("totalGames");
        expect(chaiHttpResponse.body[0]).to.have.property("totalVictories");
        expect(chaiHttpResponse.body[0]).to.have.property("totalDraws");
        expect(chaiHttpResponse.body[0]).to.have.property("totalLosses");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsFavor");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsOwn");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsBalance");
        expect(chaiHttpResponse.body[0]).to.have.property("efficiency");









    
      });

})

describe("Testando a Rota GET /leaderboard/away", () => {
    let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(leaderboardService, 'generateLeaderboardAway').resolves(leaderboardMock as ILeaderboard[] );
  });

  after(() => {
    (leaderboardService.generateLeaderboardAway as sinon.SinonStub).restore();
  });


    it("Verifica se o status é o correto", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

        expect(chaiHttpResponse).to.have.status(200);
    
      });

      it("Verifica se o tamanho da resposta é o correto", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

        expect(chaiHttpResponse.body).to.have.length(16);
    
      });

      it("Verifica se a resposta possui todas as propriedades necessárias", async ()=> {
        chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

        expect(chaiHttpResponse.body[0]).to.have.property("name");
        expect(chaiHttpResponse.body[0]).to.have.property("totalPoints");
        expect(chaiHttpResponse.body[0]).to.have.property("totalGames");
        expect(chaiHttpResponse.body[0]).to.have.property("totalVictories");
        expect(chaiHttpResponse.body[0]).to.have.property("totalDraws");
        expect(chaiHttpResponse.body[0]).to.have.property("totalLosses");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsFavor");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsOwn");
        expect(chaiHttpResponse.body[0]).to.have.property("goalsBalance");
        expect(chaiHttpResponse.body[0]).to.have.property("efficiency");









    
      });

}) 
  
  

