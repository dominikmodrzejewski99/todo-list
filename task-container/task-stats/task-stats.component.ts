import { Component, input } from '@angular/core';
import { TaskStats } from '../../models/task-stats.interface';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss'
})
export class TaskStatsComponent {

  stats = input<TaskStats>();

}
