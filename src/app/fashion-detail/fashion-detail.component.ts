import { Component } from '@angular/core';
import { FashionApiService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion-detail',
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent {
  fashionObject:any
  errMessage:string=''
  constructor(private _service: FashionApiService){
  }
  searchFashion(fashionId:string)
  {
    this._service.getFashion(fashionId).subscribe({
    next:(data)=>{this.fashionObject=data},
    error:(err)=>{this.errMessage=err}
  })
  }
}
