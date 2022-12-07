import { Component } from '@angular/core';
import { Product } from 'src/models/Product';
import { ProductsService } from 'src/services/products.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'solversrum-frontend';
  products : Product[];
  constructor(productService : ProductsService){
    productService.getProducts()
    .subscribe(res =>{
      this.products = res;
    });
  }
}
