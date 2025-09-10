import { Component, input } from '@angular/core';
import { TaskStats } from '../../models/task-stats.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-task-stats',
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    DecimalPipe
  ],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss'
})
export class TaskStatsComponent {

  stats = input<TaskStats>();



}
