import { Component, OnInit } from '@angular/core';
import { Shipper, ShipperVo } from 'src/app/models/Shipper';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ShipperService } from 'src/app/services/shipper/shipper.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  shippers : Shipper[]
  shipperData : ShipperVo = new ShipperVo()
  toastState : boolean = false
  message : string = ''
  constructor(private shipperService : ShipperService, public modalService : ModalService ) {}

  ngOnInit(): void {
    this.getShippers()
    this.shipperService.getShipperSubject().subscribe(() =>{
      this.getShippers()
    })
  }

  getShippers(){
    this.shipperService.getShippers().subscribe((res) =>{
        this.shippers = res
    })
  }

  deleteShipper(id){
    this.shipperService.deleteShipper(id).subscribe({
      next : res => {this.message = res;
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)},
      error : error => {this.message = error.error
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)

      }
  })
  }

  addShipper(){
    this.shipperService.addShipper(this.shipperData).subscribe({
      next : (res) =>  {this.message = res;
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)},
      error : (error) => {this.message = error.error
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)}
    })
  }

}
