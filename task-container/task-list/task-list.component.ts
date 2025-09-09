import { Component, input, model, output, signal } from '@angular/core';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { Task } from '../../services/tasks-list.service';
import {MatIconButton} from '@angular/material/button';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-task-list',
  imports: [
    MatCheckbox,
    MatIcon,
    MatIconButton,
    FormsModule
],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  filteredTasks = input.required<Task[]>();

  editingTaskId = input.required<number | null>();

  taskToggled = output<number>();

  taskDeleted = output<number>();

  taskEditStarted = output<number>();

  taskEditSaved = output<{id: number, text: string}>();

  taskEditCanceled = output<void>();

  editedTaskText = signal<string>('');

  toggleTask(id: number) {
    this.taskToggled.emit(id);
  }

  onDelete(id: number) {
    this.taskDeleted.emit(id);
  }

  onTaskEditStarted(id: number, text: string) {
    this.editedTaskText.set(text);
    this.taskEditStarted.emit(id);
  }

  saveEdit(id: number) {
    const newText = this.editedTaskText().trim();
    if (newText) {
      this.editedTaskText.set('');
      this.taskEditSaved.emit({id, text: newText});
    }
  }
  
  cancelEdit() {
    this.taskEditCanceled.emit();
  }
}
