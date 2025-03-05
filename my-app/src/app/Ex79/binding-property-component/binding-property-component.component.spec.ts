import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingPropertyComponentComponent } from './binding-property-component.component';

describe('BindingPropertyComponentComponent', () => {
  let component: BindingPropertyComponentComponent;
  let fixture: ComponentFixture<BindingPropertyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BindingPropertyComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BindingPropertyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
