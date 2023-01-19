export interface ISkuQuantity {
    sku: string,
    qty: number
}

export interface IStock {
    sku: string,
    stock: number
}

export interface ITransaction {
    sku: string,
    type: string,
    qty: number
}