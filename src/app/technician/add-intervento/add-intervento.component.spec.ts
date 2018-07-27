import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventoComponent } from './add-intervento.component';

describe('AddInterventoComponent', () => {
  let component: AddInterventoComponent;
  let fixture: ComponentFixture<AddInterventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
