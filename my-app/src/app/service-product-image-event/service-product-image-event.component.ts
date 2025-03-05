import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product88Service } from '../product88.service';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './service-product-image-event.component.html',
  styleUrl: './service-product-image-event.component.css'
})
export class ServiceProductImageEventComponent {
  public products:any
  constructor(pservice: Product88Service,private router:Router){
  this.products=pservice.getProductsWithImages()
  }
  viewDetail(f:any)
  {
  this.router.navigate(['service-product-image-event',f.ProductId])
  }
  
}
