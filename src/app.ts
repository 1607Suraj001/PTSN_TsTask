import express, { Request, Response, Application } from 'express';
import path from 'path';
import { ISkuQuantity } from './constants/interfaces';
import { StockLevels } from './controller/stockLevels';

const app: Application = express();
const port: number = 8080;

app.use(express.static(path.join(__dirname + '/../public')));

app.get('/', (req: Request, res: Response)=>{
    res.sendFile(path.join(__dirname + '/../public'));
});

app.get('/hello', (req: Request, res: Response)=>{
    res.send("hello");
});

app.get('/calculate', async (req: Request, res: Response)=>{
    try{
    if(!req.query || !req.query.sku){
        throw new Error("Please provide sku");
    }

    const sku: string = req.query.sku as string || "";
    const result: ISkuQuantity = await StockLevels.getStockLeveL(sku);

    res.send(result);
    }catch(err: any){
        console.error(err);
        res.json({err: err.message, status: 500});
    }
})
app.listen(port, ()=>{
    console.log("Server running on port : ", port);
});
