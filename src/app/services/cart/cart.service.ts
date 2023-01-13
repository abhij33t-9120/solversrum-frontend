import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/api/api';
import { Cart } from '../../models/Cart';
import { Order } from '../../models/Order';
import { ProductsService } from '../product/products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private productService : ProductsService, private http : HttpClient) { }

  getCartList(){
    let x =  this.productService.cartList
    let y : Cart[] = []
    x.forEach((p) =>{
      let temp = new Cart();
      temp.productId = p.productId
      temp.productName = p.productName
      temp.quantity = 1;
      temp.supplierId = p.supplier.supplierId
      temp.price = p.price
      temp.unit = p.unit
      temp.imgUrl = p.imgUrl
      y.push(temp)
      console.log(y)
    })
    return y
    
  }

  getShippers(){
    return this.http.get(Api.shipperApi)
  }

  order(order : Order) : Observable<any>{
    return this.http.post(Api.orderApi,order, {responseType : 'text'})
  }
}
