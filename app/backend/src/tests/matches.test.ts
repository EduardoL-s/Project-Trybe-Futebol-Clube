import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import * as auth from '../utils/auth';

import { Response } from 'superagent';
import matchesMock from './mocks/matches.mock';
import matchIdMock from './mocks/matchId.mock';
import loginIdMock from './mocks/login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Service', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(matchesMock as MatchesModel[]);
      sinon
        .stub(MatchesModel, "findByPk")
        .resolves(matchIdMock as MatchesModel);
    });
  
    afterEach(()=>{
        sinon.restore();
      })
  
      it('Verifica o retorno das partidas', async () => {
          chaiHttpResponse = await chai
           .request(app).get('/matches');
          expect(chaiHttpResponse).to.have.status(200)
      });

      it('Verifica se no retorno das partidas, não tem nenhum em progresso', async () => {
        chaiHttpResponse = await chai
         .request(app).get('/matches?inProgress=false');
        expect(chaiHttpResponse).to.have.status(200)
      });

      it('Verifica se no retorno das partidas, não tem nenhuma já finalizada', async () => {
        chaiHttpResponse = await chai
         .request(app).get('/matches?inProgress=true');
        expect(chaiHttpResponse).to.have.status(200)
      });

      it('Verifica se não é possível finalizar uma partida sem um token', async () => {
        const id = 1;
        chaiHttpResponse = await chai
         .request(app).patch(`/matches/${id}/finish`)
         .set('Authorization', '');
        expect(chaiHttpResponse).to.have.status(401)
      });

      it('Verifica se não é possível finalizar uma partida com um token inválido', async () => {
        const id = 1;
        chaiHttpResponse = await chai
         .request(app).patch(`/matches/${id}/finish`)
         .set('Authorization', '123');
        expect(chaiHttpResponse).to.have.status(401)
      });

      it('Verifica se é possível finalizar uma partida', async () => {
        sinon
          .stub(auth, "validateToken")
          .returns(loginIdMock);

        const id = 1;
        chaiHttpResponse = await chai
         .request(app).patch(`/matches/${id}/finish`).set('Authorization',
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1OTkxNDIxLCJleHAiOjE2ODg1ODM0MjF9.VSoZZBCCSbpSQVUDEUpD6NHoywkrTSfYsy7HqtF9O3w');
        expect(chaiHttpResponse).to.have.status(200)
      });

      it('Verifica se é possível atualizar o placar de uma partida', async () => {
        const id = 1;
        chaiHttpResponse = await chai
         .request(app).patch(`/matches/${id}`).set('Authorization',
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1OTkxNDIxLCJleHAiOjE2ODg1ODM0MjF9.VSoZZBCCSbpSQVUDEUpD6NHoywkrTSfYsy7HqtF9O3w')
         .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
        expect(chaiHttpResponse.body.message).to.be.equal('malisjdlasd')
      });
  });
  