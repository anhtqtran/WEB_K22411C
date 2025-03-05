import { Component } from '@angular/core';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {
  public products=this.gen_product()
  public minprice:any
  public maxprice:any

  searchProduct(){
    let dataset = this.gen_product()
    // chỗ này kiểm tra data trong min và max
    this.products=dataset.filter(x=>x.price>=this.minprice && 
      x.price<=this.maxprice)
}
  gen_product(){
    return [
      {"id":"p1","name":"Product 1", "price": 100, "image": "1.png"},
      {"id":"p2","name":"Product 2", "price": 200, "image": "1.png"},
      {"id":"p3","name":"Product 3", "price": 300, "image": "1.png"},
      {"id":"p4","name":"Product 4", "price": 400, "image": "1.png"},
      {"id":"p5","name":"Product 5", "price": 500, "image": "1.png"},
    ]
  }
}
