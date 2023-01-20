import 'reflect-metadata';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import axios from "axios";
import { stat } from 'fs';

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET - gets the current stock value for the provided sku", function async(){

      it('should throw error when sku is not provided', async () => {
        const res = await axios.get(`http://localhost:8080/calculate`);
        const { err, status } = res.data;
        expect(err).to.equal("Please provide sku")
        &&  expect(status).to.equal(500); 
      }).timeout(10000);

      it('should throw error for the invalid `LTV719449/39/30000` sku which is not in stock and transactions', async ()=> {
        const res = await axios.get(`http://localhost:8080/calculate?sku=LTV719449/39/30000`);
        const { err, status } = res.data;
        const { ERR, MESSAGE } = JSON.parse(err);
        expect(status).to.equal(500)
        && expect(ERR).to.equal("INVALID_SKU_PASSED") 
        && expect(MESSAGE).to.equal("Please enter valid sku");
      }).timeout(10000);

      it('should return current stock value for `LTV719449/39/3999` sku which is not in stock but exists in transactions', async ()=> {
        const res = await axios.get(`http://localhost:8080/calculate?sku=LTV719449/39/3999`);
        const { sku, qty } = res.data;
        expect(sku).to.equal("LTV719449/39/3999")
        && expect(qty).to.equal(-7);
      }).timeout(10000);

      it('should return current stock value for `LTV719449/39/39` sku', async () => {
        const res = await axios.get(`http://localhost:8080/calculate?sku=LTV719449/39/39`);
        const { sku, qty } = res.data;
        expect(sku).to.equal("LTV719449/39/39")
        &&  expect(qty).to.equal(8510); 
      }).timeout(10000);
})