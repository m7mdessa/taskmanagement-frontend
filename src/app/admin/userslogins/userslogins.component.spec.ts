import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoginsComponent } from './userslogins.component';

describe('UsersloginsComponent', () => {
  let component: UsersLoginsComponent;
  let fixture: ComponentFixture<UsersLoginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersLoginsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
