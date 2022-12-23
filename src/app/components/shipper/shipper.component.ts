import { Component, OnInit } from '@angular/core';
import { Shipper, ShipperVo } from 'src/app/models/Shipper';
import { ShipperService } from 'src/app/services/shipper.service';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  shippers : Shipper[]
  addBtnState : boolean = false
  shipperData : ShipperVo = new ShipperVo()
  constructor(private shipperService : ShipperService ) {}

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
    this.shipperService.deleteShipper(id).subscribe(
      res => alert(res)
    )
  }

  addShipper(){
    this.shipperService.addShipper(this.shipperData).subscribe(res => {
      alert(res)
    },
    (error : any) => {
      alert(error.error)
    })
  }
  
  changeAddBtnState(){
    this.addBtnState = !this.addBtnState
  }
}
