import { TestBed } from '@angular/core/testing';

import { TaskManagerFacade } from './task-manager.facade';

describe('TaskManagerFacadeService', () => {
  let service: TaskManagerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskManagerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
