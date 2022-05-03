import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGuestFormComponent } from './register-guest-form.component';

describe('RegisterGuestFormComponent', () => {
  let component: RegisterGuestFormComponent;
  let fixture: ComponentFixture<RegisterGuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGuestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
