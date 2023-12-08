import { TestBed } from '@angular/core/testing';

import { SprintTaskService } from './sprint-task.service';

describe('TaskService', () => {
  let service: SprintTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
