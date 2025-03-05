import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProductComponent } from './product/product.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { Productservice1Component } from './productservice1/productservice1.component';
import { ServiceProductImageEventComponent } from './service-product-image-event/service-product-image-event.component';
import { ServiceProductImageEventDetailComponent } from './service-product-image-event-detail/service-product-image-event-detail.component';
import { ServiceProductHttpComponent } from './service-product-http/service-product-http.component';


const routes: Routes = [
  {path: "product-simple", component: ProductComponent},
  {path: "product-search", component: ProductSearchComponent},
  {path: "product-service1", component: Productservice1Component},
  {path: "product-service2", component: ServiceProductHttpComponent},
  {path:'service-product-image-event',
    component:ServiceProductImageEventComponent},
    {path:'service-product-image-event/:id',
    component:ServiceProductImageEventDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
