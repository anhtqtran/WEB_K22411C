import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productservice1',
  standalone: false,
  templateUrl: './productservice1.component.html',
  styleUrl: './productservice1.component.css'
})
export class Productservice1Component {
  public products: any
  constructor(private ps:ProductService) {
    this.products = ps.gen_product()
      
    }

  }

