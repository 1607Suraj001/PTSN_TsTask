import "reflect-metadata";
import path from 'path';
import { readFileSync } from 'fs';
import { inject } from 'inversify';
import { Calculate } from '../service/calculate';
import { ISkuQuantity, IStock, ITransaction } from '../constants/interfaces';
import { TransactionTypes } from '../constants/Transaction';
import { Errors } from "../constants/Errors";


const stockPath: string = path.join(__dirname + '/../../src/records/stock.json');
const transactionsPath: string = path.join(__dirname + '/../../src/records/transactions.json');

const stocks = JSON.parse(readFileSync(stockPath,'utf8'));
const transactions = JSON.parse(readFileSync(transactionsPath,'utf8'));

export class StockLevels{
    constructor(
      @inject(Calculate) private calculateService: Calculate
    )
    {}

    public static async getStockLeveL(sku_input: string): Promise<ISkuQuantity>{
        try{
            let skuStock = stocks.find((_: IStock)=> _.sku === sku_input);
            const skuTransaction: Array<ITransaction> = transactions.filter((_: ITransaction) => _.sku === sku_input);

            if(!skuStock && !skuTransaction.length){
                throw new Error(JSON.stringify({ERR: Errors.INVALID_SKU_PASSED, MESSAGE: Errors.INVALID_SKU_PASSED_ERR}));
            }
        
            if(!skuStock && skuTransaction.length){
                skuStock = {};
                skuStock.sku = sku_input;
                skuStock.stock = 0;
            }

            let diffs = 0;
            skuTransaction.forEach(_ => { diffs += _.type === TransactionTypes.ORDER? -_.qty: _.qty});
            return { sku: sku_input, qty: skuStock.stock + diffs};
        }catch(err: any){
            console.error(err);
            throw err;
        }
    } 
}