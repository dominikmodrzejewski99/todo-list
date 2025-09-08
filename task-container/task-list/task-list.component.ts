import { Component, input, model, output } from '@angular/core';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../services/tasks-list.service';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  imports: [
    MatCheckbox,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  filteredTasks = input.required<Task[]>();

  taskToggled = output<number>();

  taskDeleted = output<number>();

  toggleTask(id: number) {
    this.taskToggled.emit(id);
  }

  onDelete(id: number) {
    this.taskDeleted.emit(id);
  }
}
