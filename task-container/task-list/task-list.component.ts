import { Component, input, output, inject, signal, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Priority, Task } from '../../models/task.model';
import { TaskPriorityComponent } from '../task-priority/task-priority.component';

@Component({
  selector: 'app-task-list',
  imports: [
    MatCheckbox,
    MatIcon,
    FormsModule,
    TaskPriorityComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements AfterViewChecked {
  filteredTasks = input.required<Task[]>();
  editingTaskId = input.required<number | null>();

  taskToggled = output<number>();
  taskDeleted = output<number>();
  taskEditStarted = output<number>();
  taskEditSaved = output<{ id: number, text: string }>();
  taskEditCanceled = output<void>();
  taskPriority = output<{ taskId: number, priority: Priority }>();

  editedTaskText = signal<string>('');

  @ViewChild('editInput') editInput?: ElementRef<HTMLInputElement>;
  private shouldFocusInput = false;

  ngAfterViewChecked() {
    if (this.shouldFocusInput && this.editInput) {
      this.editInput.nativeElement.focus();
      this.editInput.nativeElement.select(); // Select all text
      this.shouldFocusInput = false;
    }
  }

  toggleTask(id: number) {
    this.taskToggled.emit(id);
  }

  onDelete(id: number) {
    this.taskDeleted.emit(id);
  }

  onChangePriority(event: { taskId: number, priority: Priority }) {
    this.taskPriority.emit(event);
  }

  onTaskEditStarted(id: number, text: string) {
    this.editedTaskText.set(text);
    this.shouldFocusInput = true;
    this.taskEditStarted.emit(id);
  }

  saveEdit(id: number) {
    const newText = this.editedTaskText().trim();
    if (newText && newText !== '') {
      this.taskEditSaved.emit({ id, text: newText });
      this.editedTaskText.set('');
    }
  }

  cancelEdit() {
    this.editedTaskText.set('');
    this.taskEditCanceled.emit();
  }
}
