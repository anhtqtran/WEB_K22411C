import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FashionService } from '../fashion.service';
import { Router } from '@angular/router';

export interface Fashion {
  _id: string;
  style: string;
  fashion_image: string;
  fashion_subject: string;
  fashion_detail?: string;
}

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  groupedFashions: { [key: string]: Fashion[] } = {};
  styles: string[] = [];
  allStyles: string[] = [];
  selectedStyle: string = '';
  searchStyle: string = '';
  errMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fashionService: FashionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this.isLoading = true;
    this.errMessage = '';
    this.fashionService.getAllFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.groupByStyle();
        this.styles = Object.keys(this.groupedFashions);
        if (!this.allStyles.length) {
          this.allStyles = [...this.styles];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading fashions:', error);
        this.errMessage = 'Lỗi khi tải danh sách Fashion';
        this.isLoading = false;
      }
    });
  }

  groupByStyle() {
    this.groupedFashions = this.fashions.reduce((acc: { [key: string]: Fashion[] }, fashion) => {
      if (!acc[fashion.style]) {
        acc[fashion.style] = [];
      }
      acc[fashion.style].push(fashion);
      return acc;
    }, {});
  }

  filterByStyle(): void {
    this.isLoading = true;
    this.errMessage = '';
    const filterStyle = this.searchStyle.trim() || this.selectedStyle;

    if (filterStyle) {
      this.fashionService.getAllFashions().subscribe({
        next: (data) => {
          this.fashions = data.filter(fashion => 
            fashion.style.toLowerCase().includes(filterStyle.toLowerCase())
          );
          this.groupByStyle();
          this.styles = Object.keys(this.groupedFashions);
          this.errMessage = this.fashions.length ? '' : 'Không tìm thấy Fashion với style này';
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching fashions:', err);
          this.errMessage = 'Lỗi khi lấy danh sách Fashion';
          this.isLoading = false;
        }
      });
    } else {
      this.loadFashions();
    }
  }

  showDetail(fashion: Fashion) {
    if (!fashion || !fashion._id) {
      console.error('Invalid fashion object or missing _id:', fashion);
      return;
    }
    this.router.navigate(['/fashion', fashion._id]);
  }
}