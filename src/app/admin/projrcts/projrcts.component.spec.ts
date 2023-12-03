import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjrctsComponent } from './projrcts.component';

describe('ProjrctsComponent', () => {
  let component: ProjrctsComponent;
  let fixture: ComponentFixture<ProjrctsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjrctsComponent]
    });
    fixture = TestBed.createComponent(ProjrctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
