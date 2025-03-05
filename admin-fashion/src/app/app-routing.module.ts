import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FashionListComponent } from './fashion-list/fashion-list.component';

const routes: Routes = [
  { path: '', component: FashionListComponent },
  { path: 'fashion/:id', component: FashionDetailComponent }, // Xem chi tiết hoặc sửa
  { path: 'fashion/add', component: FashionDetailComponent } // Thêm mới
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
