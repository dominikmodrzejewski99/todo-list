import { Component, inject } from '@angular/core';
import { TasksListService, FilterType } from '../services/tasks-list.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskFiltersComponent } from './task-filters/task-filters.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task-container',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    TaskFormComponent,
    TaskListComponent,
    TaskFiltersComponent
  ],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss'
})
export class TaskContainerComponent {
  tasksListService: TasksListService = inject(TasksListService);

  newTaskText = this.tasksListService.newTaskText;
  filteredTodos = this.tasksListService.filteredTodos;
  currentFilter = this.tasksListService.filter;

  addTask() {
    if (this.newTaskText().trim()) {
      this.tasksListService.addTask(this.newTaskText());
      this.newTaskText.set('');
    }
  }

  onTaskToggle(taskId: number) {
    this.tasksListService.toggleTask(taskId);
  }

  onFilterChange(filter: string) {
    this.tasksListService.changeFilter(filter as FilterType);
  }
}
