import { M } from '@angular/cdk/keycodes';
import { inject, Injectable, signal } from '@angular/core';
import { Priority } from '../models/task.model';
import { TasksListService } from './tasks-list.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  priority = signal<Priority[]>([Priority.HIGH, Priority.MEDIUM, Priority.LOW, Priority.NONE]);

  constructor() { 
    
  }
}
