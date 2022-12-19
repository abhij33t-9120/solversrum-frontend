import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/Product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private productService : ProductsService) { }

  getCartList(){
    return this.productService.cartList
  }
}
