import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MyComponentComponent } from './Ex78/my-component/my-component.component';
import { BindingPropertyComponentComponent } from './Ex79/binding-property-component/binding-property-component.component';
import { ProductComponent } from './product/product.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { Productservice1Component } from './productservice1/productservice1.component';
import { ServiceProductImageEventComponent } from './service-product-image-event/service-product-image-event.component';
import { ServiceProductImageEventDetailComponent } from './service-product-image-event-detail/service-product-image-event-detail.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { ServiceProductHttpComponent } from './service-product-http/service-product-http.component'

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    MyComponentComponent,
    BindingPropertyComponentComponent,
    ProductComponent,
    ProductSearchComponent,
    Productservice1Component,
    ServiceProductImageEventComponent,
    ServiceProductImageEventDetailComponent,
    ServiceProductHttpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
