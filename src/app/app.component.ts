import { Component, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/product/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solversrum-frontend';
  cartSize : number = 0
  constructor(private productService : ProductsService){
    this.cartSize = this.productService.cartListSet.size
    this.productService.cartListModified.subscribe(()=>{
      this.cartSize = this.productService.cartListSet.size
    })
  }
}
