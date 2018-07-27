import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventiComponent } from './interventi.component';

describe('InterventiComponent', () => {
  let component: InterventiComponent;
  let fixture: ComponentFixture<InterventiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
