import { ITransaction } from '../constants/interfaces';
import { TransactionTypes } from '../constants/Transaction';

export class Calculate{
    public skuQuantity(skuTransaction: Array<ITransaction>): number{
        let diffs = 0
        skuTransaction.forEach(_ => { diffs += _.type === TransactionTypes.ORDER? -_.qty: _.qty});
        return diffs;
    }
} 