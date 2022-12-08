export interface Product{
    productId : number
    productName : string
    unit : number
    price : number
    supplierId : number
}

export class ProductVo implements Product{
    productId: number
    productName: string
    unit: number
    price: number
    supplierId: number

}