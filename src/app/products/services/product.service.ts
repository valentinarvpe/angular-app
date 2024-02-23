import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {id:1, nombre: 'mesa', descripcion: "mesa 1", precio: 10000},
    {id:2, nombre: 'mesa', descripcion: "mesa 2", precio: 10000},
  ];

  private url: string = "http://localhost:8080/productos"; 
  constructor(private http:HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get(this.url).pipe(
      map((response:any) => response._embedded.products as Product[])
    );
    //return of(this.products);
  }

  create(product:Product) : Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }
  
  update(product:Product) : Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  remove(id:number) : Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
