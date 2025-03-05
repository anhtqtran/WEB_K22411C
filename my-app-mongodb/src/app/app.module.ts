import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FashionComponent } from './fashion/fashion.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FashionAPIService } from './fashion-api.service';

@NgModule({
  declarations: [
    AppComponent,
    FashionComponent,
    FashionDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Cần cho [(ngModel)]
    AppRoutingModule
  ],
  providers: [FashionAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }