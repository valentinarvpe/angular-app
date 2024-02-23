import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productSelected: Product = new Product();

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(products => {
      this.products = products;
    })
  };

  addProduct(product: Product): void {    
    if (product.id > 0) {
      this.service.update(product).subscribe( prodUpdated => {
        this.products = this.products.map( prod => {
          if (prod.id == product.id ) {
            //? Se clona o se crea la nueva instancia con los nuevos datos
            return { ...prodUpdated };
          } 
            return prod;
        })
      });
    } else {
      this.service.create(product).subscribe(prod => {
       //* Opción Mutable
      //product.id = new Date().getTime();
      //this.products.push(product);
      //* Opción valida , Forma Inmutable
        this.products = [...this.products, { ...prod }];
      });
    }
    this.productSelected = new Product();
  }

  onRemoveProduct(id:number):void {
    this.service.remove(id).subscribe(() => {
      this.products =  this.products.filter(product => product.id != id)
    })
  }

  onUpdateProduct(productRow: Product):void {
    this.productSelected = {... productRow};
  }

}
