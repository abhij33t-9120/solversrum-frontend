import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/Supplier';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  suppliers : Supplier[]
  supplierVo = new Supplier()
  toastState: boolean = false;
  message: string = '';

  constructor(private supplierService: SupplierService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.getSuppliers()
    this.supplierService.getSupplierSubject().subscribe({
      next : () => this.getSuppliers()
    }
    )
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(
      {
        next: res => { 
          this.suppliers = res
        },
        error: error => alert(error.error)
      }
    )
  }

  deleteSupplier(id:number) {
    this.supplierService.deleteSupplier(id).subscribe(
      {
        next: res => {
          this.message = res;
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)
        },
        error: error => {
          this.message = error.error
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        }
      }
    )
  }

  addSupplier(){
    this.supplierService.addSupplier(this.supplierVo).subscribe(
      {
        next: res => {
          this.message = res
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
          
        },
        error: error => {
          this.message = error.error
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        },
        complete : () => this.supplierVo = new Supplier() 
        
      }
      
    )
  }

}
