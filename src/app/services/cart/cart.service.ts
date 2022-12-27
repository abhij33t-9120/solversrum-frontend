import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cart } from '../../models/Cart';
import { Order } from '../../models/Order';
import { ProductsService } from '../product/products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _base = 'http://localhost:8050/api/v1'
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
      y.push(temp)
      console.log(y)
    })
    return y
    
  }

  getShippers(){
    return this.http.get(this._base+'/shippers')
  }

  order(order : Order) : Observable<any>{
    return this.http.post(this._base+'/orders',order, {responseType : 'text'})
  }
}
