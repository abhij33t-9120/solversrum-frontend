import { Component, OnInit } from '@angular/core';
import { Product, ProductVo } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: ProductVo[];
  addBtnState: boolean = false;
  editBtnState: boolean = false;
  range: number = 0;
  productVo: ProductVo = new ProductVo();
  cartList : Product[]
  

  constructor(private productService: ProductsService) {

  }

  async ngOnInit() {
    this.getProducts()
    this.productService.productListModified.subscribe(res => {
      this.getProducts()
    })  
  }

  getProducts() : any{
    this.productService.getProducts()
      .subscribe(res => {
        this.products = []
        res.forEach(p => {
          p.addBtnState = false
          this.products.push(p)
        })
        this.cartList = this.productService.cartList
        this.checkCartBtnState()
        console.log(this.products)
      })
      
      
  }

  addProducts() {
    console.log(this.productVo)
    this.changeAddBtnState()
    this.productService.addProducts(this.productVo)
      .subscribe(res => {
        alert(res)
      },
        (error: any) => {
          console.log(error)
          alert(error.error)
        });
    this.productVo = new ProductVo();
  }

  checkCartBtnState(){
    for(let i=0; i<this.products.length; i++){
      if(this.productService.cartListSet.has(this.products[i].productId)){
        this.products[i].addBtnState = true;
      }
    }
  }

  changeAddBtnState() {
    this.addBtnState = !this.addBtnState
  }
  
  changeEditBtnState(){
    this.editBtnState = !this.editBtnState
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        alert(res)
      })
  }

  editProduct() {
    this.changeEditBtnState()
    this.productService.editProduct(this.productVo)
    .subscribe(res => {
      alert(res)
    })
    this.productVo = new ProductVo()
  }

  setEditProductId(product){
    this.changeEditBtnState()
    this.productVo.productId = product.productId
    this.productVo.supplierId = product.supplierId
  }

  addToCart(product: Product, i){
    this.productService.cartList.push(product)
    this.productService.addCartList(product.productId)
    this.products[i].addBtnState = true
    console.log(this.products[i])
    console.log(this.productService.cartListSet)
  }

}
