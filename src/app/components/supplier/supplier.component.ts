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

  deleteSupplier(id) {
    this.supplierService.deleteSupplier(id).subscribe(
      {
        next: res => alert(res),
        error: error => alert(error.error)
      }
    )
  }

  addSupplier(){
    this.supplierService.addSupplier(this.supplierVo).subscribe(
      {
        next: res => {
          alert(res)
          this.supplierVo = new Supplier()
        },
        error: error => alert(error.error)
      }
      
    )
  }

}
