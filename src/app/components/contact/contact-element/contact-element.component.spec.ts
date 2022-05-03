import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactElementComponent } from './contact-element.component';

describe('ContactElementComponent', () => {
  let component: ContactElementComponent;
  let fixture: ComponentFixture<ContactElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
