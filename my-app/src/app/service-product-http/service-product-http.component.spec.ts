import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductHttpComponent } from './service-product-http.component';

describe('ServiceProductHttpComponent', () => {
  let component: ServiceProductHttpComponent;
  let fixture: ComponentFixture<ServiceProductHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProductHttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
