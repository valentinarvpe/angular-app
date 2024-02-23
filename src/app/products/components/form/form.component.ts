import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  //product: Product = new Product();
  @Input() product: Product = {
    id: 0, nombre: '', descripcion: '', precio: 0
  };

  /*
  ?Este es un decorador para indicar que vamos a emitir o transferir
  ? Información al padre
  */
  @Output() newProducEvent = new EventEmitter();

  onSubmit(productForm: NgForm): void {
    if (productForm.valid) {
      this.newProducEvent.emit(this.product) 
    }
    productForm.reset();
    productForm.resetForm();
  }
  
  clean(): void {
    this.product = new Product();
  }


}
