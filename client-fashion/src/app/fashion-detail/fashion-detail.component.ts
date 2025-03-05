import { Component, OnInit } from '@angular/core';
import { FashionService } from '../fashion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: any = null;

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFashionDetail();
  }

  loadFashionDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashionById(id).subscribe(
        (data) => {
          this.fashion = data;
        },
        (error) => {
          console.error('Error loading fashion detail:', error);
          this.router.navigate(['/']); // Quay về danh sách nếu lỗi
        }
      );
    }
  }

  closeModal() {
    this.router.navigate(['/']); // Quay về danh sách khi đóng
  }
}