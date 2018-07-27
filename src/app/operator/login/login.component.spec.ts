import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOperatorComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginOperatorComponent;
  let fixture: ComponentFixture<LoginOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
