import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationElementComponent } from './conversation-element.component';

describe('ConversationElementComponent', () => {
  let component: ConversationElementComponent;
  let fixture: ComponentFixture<ConversationElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
