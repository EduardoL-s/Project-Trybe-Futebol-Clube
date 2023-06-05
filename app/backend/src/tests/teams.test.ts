import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mock';
import teamIdMock from './mocks/teamId.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Service', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsMock as TeamModel[]);
    
    sinon
      .stub(TeamModel, "findOne")
      .resolves(teamIdMock as TeamModel);
  });

  afterEach(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
      (TeamModel.findOne as sinon.SinonStub).restore();
    })

    it('Verifica o retorno dos times', async () => {
        chaiHttpResponse = await chai
         .request(app).get('/teams');
        expect(chaiHttpResponse).to.have.status(200)
    });

    it('Verifica o retorno de um time pelo id', async () => {
        const id = 1;
        chaiHttpResponse = await chai
         .request(app).get(`/teams/${id}`);
        expect(chaiHttpResponse).to.have.status(200)
    });
});
