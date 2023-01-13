import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Api } from 'src/app/api/api';
import { Supplier } from 'src/app/models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private supplierListModified = new Subject<void>()
  constructor(private http : HttpClient) { }

  getSupplierSubject(){
    return this.supplierListModified
  }

  getSuppliers() : Observable<Supplier[]>{
    return this.http.get<Supplier[]>(Api.supplierApi)
  }

  deleteSupplier(id:number){
    return this.http.delete(Api.supplierApi+'/'+id, {responseType : 'text'}).pipe(
      tap(
        () => this.supplierListModified.next()
      )
    )
  }

  addSupplier(supplier){
    return this.http.post(Api.supplierApi, {'list' : [supplier]}, {responseType : 'text'}).pipe(
      tap(
        () => this.supplierListModified.next()
      )
    )
  }
}
