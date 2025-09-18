import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';

import { TaskTagsComponent } from './task-tags.component';
import { DebugElement } from '@angular/core';
import { L } from '@angular/cdk/keycodes';

describe('TaskTagsComponent (minimal)', () => {
  let component: TaskTagsComponent;
  let fixture: ComponentFixture<TaskTagsComponent>;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskTagsComponent],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
    });

    fixture = TestBed.createComponent(TaskTagsComponent); 
    component = fixture.componentInstance; // TaskTagsComponent test instance
    button = fixture.nativeElement.querySelector('button')
  })
  
  it('should contains text "Add"', () => {
    expect(button.textContent).toContain('Add');
  });
});
