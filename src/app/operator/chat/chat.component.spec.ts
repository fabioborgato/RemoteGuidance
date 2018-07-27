import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOperatorComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatOperatorComponent;
  let fixture: ComponentFixture<ChatOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
