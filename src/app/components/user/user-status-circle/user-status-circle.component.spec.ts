import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusCircleComponent } from './user-status-circle.component';

describe('UserStatusCircleComponent', () => {
  let component: UserStatusCircleComponent;
  let fixture: ComponentFixture<UserStatusCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatusCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatusCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
