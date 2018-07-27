import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileChatOpComponent } from './mobile-chat.component';

describe('MobileChatComponent', () => {
  let component: MobileChatOpComponent;
  let fixture: ComponentFixture<MobileChatOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileChatOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileChatOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
