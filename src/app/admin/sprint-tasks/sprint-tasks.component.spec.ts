import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTasksComponent } from './sprint-tasks.component';

describe('SprintTasksComponent', () => {
  let component: SprintTasksComponent;
  let fixture: ComponentFixture<SprintTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintTasksComponent]
    });
    fixture = TestBed.createComponent(SprintTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
