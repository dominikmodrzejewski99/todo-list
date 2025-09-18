import { Component, inject } from '@angular/core';
import { TasksListService } from '../services/tasks-list.service';
import { FilterType } from '../models/filter-type';
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
import { TimerComponent } from './timer/timer.component';
import { CoffeeCounterComponent } from './coffee-counter/coffee-counter.component';
import { TaskStatsComponent } from './task-stats/task-stats.component';
import { TaskManagerFacade } from '../facades/task-manager.facade';
import { Priority } from '../models/task.model';
import { TaskPriorityComponent } from './task-priority/task-priority.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { TaskTagsComponent } from "./task-tags/task-tags.component";
import { WeatherService } from '../weather.service';
import { WeatherChartComponent } from "./weather-chart/weather-chart.component";

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
    TaskFiltersComponent,
    TimerComponent,
    CoffeeCounterComponent,
    TaskStatsComponent,
    ThemeToggleComponent,
    WeatherChartComponent
],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss'
})
export class TaskContainerComponent {
  private tasksListService: TasksListService = inject(TasksListService);
  private taskManagerFacade: TaskManagerFacade = inject(TaskManagerFacade);
  private weatherService: WeatherService = inject(WeatherService);

  newTaskText = this.tasksListService.newTaskText;
  filteredTodos = this.tasksListService.filteredTodos;
  currentFilter = this.tasksListService.filter;
  editingTaskId = this.tasksListService.editingId;
  tasksStats = this.tasksListService.tasksStats;
  weatherData = this.weatherService.weatherData

  addTask() {
    if (this.newTaskText().trim()) {
      this.taskManagerFacade.addTask(this.newTaskText());
      this.newTaskText.set('');
    }
  }

  deleteTask(taskId: number) {
    this.taskManagerFacade.deleteTask(taskId);
  }

  onTaskToggle(taskId: number) {
    this.taskManagerFacade.toggleTask(taskId);
  }

  onFilterChange(filter: string) {
    this.tasksListService.changeFilter(filter as FilterType);
  }

  onTaskEditStarted(taskId: number) {
    this.tasksListService.setEditingId(taskId);
  }

  onTaskEditSaved(task: { id: number, text: string }) {
    this.taskManagerFacade.updateTaskText(task.id, task.text);
    this.tasksListService.setEditingId(null);
  }

  onTaskEditCanceled() {
    this.tasksListService.cancelEdit();
  }

  onTaskPriorityChanged(event: { taskId: number, priority: Priority }) {
    this.taskManagerFacade.updateTaskPriority(event.taskId, event.priority);
  }

  onTaskTagAdd(taskId: number, tag: string) {
    this.taskManagerFacade.addTag(taskId, tag);
  }

  onTaskTagRemove(taskId: number, tag: string) {
    this.taskManagerFacade.removeTag(taskId, tag);
  }
  // onTaskTagUpdate(taskId: number, oldTag: string, newTag: string) {
  //   this.tasksListService.updateTag(taskId, oldTag, newTag);
  // }

 

}
