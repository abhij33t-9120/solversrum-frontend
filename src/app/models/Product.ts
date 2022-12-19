export interface Product{
    productId : number
    productName : string
    unit : number
    price : number
    supplierId : number
    addBtnState : boolean
}

export class ProductVo implements Product{
    addBtnState: boolean = false
    productId: number
    productName: string
    unit: number
    price: number
    supplierId: number
}