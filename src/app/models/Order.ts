import { Product } from "./Product"

export class Order{
    orderDate : string
    customerId : number
    shipperId : number
    orderDetailsVo : OrderDetails[]
    customer : any
    shipper : any
    orderId : number
    total : number
}


export class OrderDetails{
    quantity : number
    productId : number
    productVo : Product
    orderDetailsId : number
}