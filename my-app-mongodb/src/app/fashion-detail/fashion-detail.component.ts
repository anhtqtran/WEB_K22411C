import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashionObject: any = null;
  errMessage: string = '';

  constructor(
    private _service: FashionAPIService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getFashionDetail();
  }

  getFashionDetail(): void {
    const fashionId = this._route.snapshot.paramMap.get('id');
    if (fashionId) {
      this._service.getFashionById(fashionId).subscribe({
        next: (data) => {
          this.fashionObject = data;
        },
        error: (err) => {
          this.errMessage = `Lỗi khi lấy chi tiết Fashion: ${err.message || 'Không tìm thấy'}`;
        }
      });
    } else {
      this.errMessage = 'Không tìm thấy ID Fashion';
    }
  }
}