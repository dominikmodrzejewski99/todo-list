import { inject, Injectable } from '@angular/core';
import { TasksListService } from '../services/tasks-list.service';
import { PriorityService } from '../services/priority.service';
import { Priority } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskManagerFacade {

  private taskListService = inject(TasksListService);
  private priorityService = inject(PriorityService);

  updateTaskPriority(taskId: number, priority: Priority) {
     this.taskListService.todosList.update(tasks => tasks.map(task => task.id === taskId ? { ...task, priority } : task));
  
  }

  
  constructor() { }
}
