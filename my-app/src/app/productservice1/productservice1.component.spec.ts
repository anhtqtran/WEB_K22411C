import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productservice1Component } from './productservice1.component';

describe('Productservice1Component', () => {
  let component: Productservice1Component;
  let fixture: ComponentFixture<Productservice1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Productservice1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productservice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
