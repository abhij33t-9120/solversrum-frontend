import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Supplier } from 'src/app/models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _base = 'http://localhost:8050/api/v1/suppliers'
  private supplierListModified = new Subject<void>()
  constructor(private http : HttpClient) { }

  getSupplierSubject(){
    return this.supplierListModified
  }

  getSuppliers() : Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this._base)
  }

  deleteSupplier(id){
    return this.http.delete(this._base+'/id', {responseType : 'text'}).pipe(
      tap(
        () => this.supplierListModified.next()
      )
    )
  }

  addSupplier(supplier){
    return this.http.post(this._base, {'list' : [supplier]}, {responseType : 'text'}).pipe(
      tap(
        () => this.supplierListModified.next()
      )
    )
  }
}
