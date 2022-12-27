import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductVo } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/product/products.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: ProductVo[];
  editBtnState: boolean = false;
  range: number = 0;
  productVo: ProductVo = new ProductVo();
  cartList : Product[]
  message : string = '';
  @ViewChild('message_modal') messageModal;
  @ViewChild('addModal') addModal;
  constructor(private productService: ProductsService, public modalService : ModalService) {

  }

  ngOnInit() {
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

  addOrEditProduct(){
    if(this.editBtnState)
      this.editProduct()
    else
      this.addProducts()
  }

  setFormValue(){
    this.editBtnState = false
    this.productVo = new ProductVo()
  }

  addProducts() {
    console.log(this.productVo)
    this.productService.addProducts(this.productVo)
      .subscribe(res => {
        this.message = res;
        this.modalService.open(this.messageModal)
        setTimeout(()=>this.modalService.modalService.dismissAll(),2000)
      },
        (error: any) => {
          this.message = error.error
          this.modalService.open(this.messageModal)
          setTimeout(()=>this.modalService.modalService.dismissAll(),2000)
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


  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        this.message = res
        this.modalService.open(this.messageModal)
        setTimeout(()=>this.modalService.modalService.dismissAll(),2000)
      },
      (error) => {
        this.message = error.error
        this.modalService.open(this.messageModal)
        setTimeout(()=>this.modalService.modalService.dismissAll(),2000)
      }
      
      )
  }

  editProduct() {
    this.productService.editProduct(this.productVo)
    .subscribe(res => {
      this.message = res;
      this.modalService.open(this.messageModal)
      setTimeout(()=>this.modalService.modalService.dismissAll(),2000) 
    },(error: any) => {
      this.message = error.error
      this.modalService.open(this.messageModal)
      setTimeout(()=>this.modalService.modalService.dismissAll(),2000)
    });
    this.productVo = new ProductVo()
  }

  setEditProductId(product){
    this.editBtnState = true;
    this.productVo = product
    this.modalService.open(this.addModal)
  }

  addToCart(product: Product, i){
    this.productService.cartList.push(product)
    this.productService.addCartList(product.productId)
    this.products[i].addBtnState = true
    this.productService.cartListModified.next()
  }

}
