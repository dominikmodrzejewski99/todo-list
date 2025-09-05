import {Component, inject} from '@angular/core';
import {TasksListService} from '../services/tasks-list.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule
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
