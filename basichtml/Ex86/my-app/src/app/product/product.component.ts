import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product = {
    id: 123,
    name: 'Thuốc Trị Xàm',
    price: 300,
    image: 'assets/images/1.png' 
  };
}
