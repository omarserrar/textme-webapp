import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLastActiveComponent } from './user-last-active.component';

describe('UserLastActiveComponent', () => {
  let component: UserLastActiveComponent;
  let fixture: ComponentFixture<UserLastActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLastActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLastActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
