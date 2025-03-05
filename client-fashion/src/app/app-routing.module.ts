import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

const routes: Routes = [
  { 
    path: '', 
    component: FashionListComponent // Route mặc định hiển thị danh sách
  },
  { 
    path: 'fashion/:id', 
    component: FashionDetailComponent // Route cho chi tiết fashion với tham số id
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' // Redirect về trang chính nếu route không khớp
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }