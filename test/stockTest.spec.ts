import 'reflect-metadata';
import app from '../src/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET - gets the current stock value for the provided sku", function async(){

      it('should return response on call', () => {
        return chai.request(app).get('/')
          .then(res => {
            chai.expect(res.text).to.eql("hello");
          })
      })
})