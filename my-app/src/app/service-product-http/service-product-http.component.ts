import { Component } from '@angular/core';
import { ProductHttpService } from '../product-http.service';

@Component({
  selector: 'app-service-product-http',
  standalone: false,
  templateUrl: './service-product-http.component.html',
  styleUrl: './service-product-http.component.css'
})
export class ServiceProductHttpComponent {
  products:any;
  constructor(private _service: ProductHttpService){
  this._service.getProducts().subscribe({
  next:(data)=>{this.products=data}
  })
  }
  }