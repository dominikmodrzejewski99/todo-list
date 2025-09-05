import { Component } from '@angular/core';
import {TaskContainerComponent} from '../task-container/task-container.component';

@Component({
  selector: 'app-root',
  imports: [TaskContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';
}
