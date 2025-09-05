import { Component, inject } from '@angular/core';
import { TasksListService } from '../services/tasks-list.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasksListService: TasksListService = inject(TasksListService);


  newTaskText = this.tasksListService.newTaskText;
  filteredTodos = this.tasksListService.filteredTodos;
  addTask() {
    this.tasksListService.addTask(this.newTaskText());

    this.newTaskText.set('');


  }
}
