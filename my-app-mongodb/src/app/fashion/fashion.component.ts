import { Component, OnInit } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {
  fashions: any[] = [];
  searchId: string = '';
  selectedStyle: string = '';
  errMessage: string = ''; // Thêm nếu cần hiển thị lỗi

  constructor(private fashionService: FashionAPIService) {}

  ngOnInit(): void {
    this.getAllFashions();
  }

  getAllFashions(): void {
    this.fashionService.getFashions('').subscribe({
      next: (data) => {
        this.fashions = data;
      },
      error: (err) => {
        console.error('Error fetching fashions:', err);
        this.errMessage = 'Lỗi khi lấy danh sách Fashion';
      }
    });
  }

  onSearch(): void {
    if (this.searchId) {
      this.fashionService.getFashionById(this.searchId).subscribe({
        next: (data) => {
          this.fashions = [data];
          this.selectedStyle = ''; // Reset style khi tìm kiếm bằng ID
        },
        error: (err) => {
          console.error('Error searching fashion:', err);
          this.errMessage = 'Không tìm thấy Fashion với ID này';
        }
      });
    } else {
      this.filterByStyle(); // Nếu không có ID, lọc theo style hoặc lấy tất cả
    }
  }

  // Hàm lọc theo style
  filterByStyle(): void {
    if (this.selectedStyle) {
      this.fashionService.getFashions('').subscribe({
        next: (data) => {
          this.fashions = data.filter(fashion => fashion.style === this.selectedStyle);
          this.errMessage = this.fashions.length ? '' : 'Không tìm thấy Fashion với style này';
        },
        error: (err) => {
          console.error('Error fetching fashions:', err);
          this.errMessage = 'Lỗi khi lấy danh sách Fashion';
        }
      });
    } else {
      this.getAllFashions();
    }
  }
}