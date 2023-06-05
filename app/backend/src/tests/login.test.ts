import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import * as auth from '../utils/auth';

import { Response } from 'superagent';
import loginIdMock from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Service', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(loginIdMock as UserModel);
  });

  afterEach(()=>{
      sinon.restore();
    })

    it('Verifica se loga', async () => {
        sinon
          .stub(auth, "generateToken")
          .returns('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1OTkxNDIxLCJleHAiOjE2ODg1ODM0MjF9.VSoZZBCCSbpSQVUDEUpD6NHoywkrTSfYsy7HqtF9O3w');

        const user = {
            email: 'admin@admin.com',
            password: 'secret_admin'
          };
        
        chaiHttpResponse = await chai
         .request(app).post('/login').send({ ...user });
        expect(chaiHttpResponse).to.have.status(200);
    });

    it('Verifica se não loga ao não passar email', async () => {
        const invalidUser = {
            password: 'secret_admin'
          };
        
        chaiHttpResponse = await chai
         .request(app).post('/login').send({ ...invalidUser });
        expect(chaiHttpResponse).to.have.status(400);
    });

    it('Verifica se não loga ao passar email com formato errado', async () => {
        const invalidUser = {
            email: 'adminadmin.com',
            password: 'secret_admin'
          };
        
        chaiHttpResponse = await chai
         .request(app).post('/login').send({ ...invalidUser });
        expect(chaiHttpResponse).to.have.status(401);
    });

    it('Verifica se não loga ao passar password com formato errado', async () => {
        const invalidUser = {
            email: 'admin@admin.com',
            password: 'se'
          };
        
        chaiHttpResponse = await chai
         .request(app).post('/login').send({ ...invalidUser });
        expect(chaiHttpResponse).to.have.status(401);
    });

    it('Verifica o cargo ao logar', async () => {
        sinon
          .stub(auth, "validateToken")
          .returns(loginIdMock);
        
        chaiHttpResponse = await chai
         .request(app).get('/login/role').set('Authorization',
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg1OTkxNDIxLCJleHAiOjE2ODg1ODM0MjF9.VSoZZBCCSbpSQVUDEUpD6NHoywkrTSfYsy7HqtF9O3w');
        expect(chaiHttpResponse).to.have.status(200);
    });

    it('Verifica se não é possível logar sem um token', async () => {
        chaiHttpResponse = await chai
         .request(app).get('/login/role').set('Authorization', '');
        expect(chaiHttpResponse).to.have.status(401);
    });

    it('Verifica se não é possível logar sem um token válido', async () => {
      chaiHttpResponse = await chai
       .request(app).get('/login/role').set('Authorization', '1233');
      expect(chaiHttpResponse).to.have.status(401);
  });
});
