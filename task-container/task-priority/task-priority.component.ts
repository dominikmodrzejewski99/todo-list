import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Priority } from '../../models/task.model';

@Component({
  selector: 'app-task-priority',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-priority.component.html',
  styleUrl: './task-priority.component.scss'
})
export class TaskPriorityComponent {
  // Inputs from parent
  taskId = input.required<number>();
  currentPriority = input.required<Priority>();
  priorities = input<Priority[]>([Priority.HIGH, Priority.MEDIUM, Priority.LOW, Priority.NONE]);

  // Output to parent
  priorityChanged = output<{ taskId: number, priority: Priority }>();

  // Method to handle priority change
  changePriority(newPriority: Priority) {
    this.priorityChanged.emit({
      taskId: this.taskId(),
      priority: newPriority
    });
  }

  // BEM class generation methods
  getButtonClasses(priority: Priority): string {
    const baseClass = 'task-priority__button';
    const modifierClass = `${baseClass}--${priority}`;
    const activeClass = this.currentPriority() === priority ? `${baseClass}--active` : '';

    return [baseClass, modifierClass, activeClass].filter(Boolean).join(' ');
  }

  // Icon mapping for each priority
  getPriorityIcon(priority: Priority): string {
    const iconMap = {
      [Priority.HIGH]: 'priority_high',
      [Priority.MEDIUM]: 'remove',
      [Priority.LOW]: 'low_priority',
      [Priority.NONE]: 'radio_button_unchecked'
    };
    return iconMap[priority];
  }

  // Label mapping for each priority
  getPriorityLabel(priority: Priority): string {
    const labelMap = {
      [Priority.HIGH]: 'High',
      [Priority.MEDIUM]: 'Medium',
      [Priority.LOW]: 'Low',
      [Priority.NONE]: 'None'
    };
    return labelMap[priority];
  }
}
