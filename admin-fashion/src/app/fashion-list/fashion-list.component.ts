import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.css'
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  isAdding = false;
  isEditing = false;
  currentFashion: Fashion = new Fashion();
  errorMessage: string = ''; // Thêm biến để hiển thị lỗi

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this.http.get<Fashion[]>('http://localhost:4000/api/fashions')
      .subscribe(data => this.fashions = data, error => {
        this.errorMessage = 'Không thể tải danh sách Fashion: ' + error.message;
      });
  }

  viewDetail(fashion: Fashion) {
    this.router.navigate(['/fashion', fashion._id]);
}
  
  editFashion(fashion: Fashion) {
    this.router.navigate(['/fashion', fashion._id], { queryParams: { edit: true } });
}

  addNewFashion() {
    this.router.navigate(['/fashion/add']);
    this.isAdding = true;
    this.isEditing = false;
  }

  saveFashion() {
    const method = this.isEditing ? 'put' : 'post';
    const url = this.isEditing ? `http://localhost:4000/api/fashions/${this.currentFashion._id}` : 'http://localhost:4000/api/fashions';

    this.http.request(method, url, { body: this.currentFashion })
      .subscribe({
        next: () => {
          this.loadFashions();
          this.cancel();
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error.errors ? err.error.errors.map((e: any) => e.msg).join(', ') : 'Lỗi khi lưu Fashion';
        }
      });
  }

  deleteFashion(id: string) {
    if (confirm('Bạn có chắc muốn xóa Fashion này?')) {
      this.http.delete(`http://localhost:4000/api/fashions/${id}`).subscribe({
        next: () => this.loadFashions(),
        error: (err) => (this.errorMessage = 'Lỗi khi xóa Fashion: ' + err.message)
      });
    }
  }
  cancel() {
    if (this.isEditing) {
        this.isEditing = false;
        console.log('Hủy chỉnh sửa');
    } else {
        this.router.navigate(['/']);
        console.log('Quay lại danh sách');
    }
}
}