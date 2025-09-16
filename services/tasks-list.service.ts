import { computed, Injectable, signal, WritableSignal, inject, effect, linkedSignal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Task, Priority } from '../models/task.model';
import { FilterType } from '../models/filter-type';
import { TaskManagerFacade } from '../facades/task-manager.facade';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  private localStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'todo_tasks';

  todosList: WritableSignal<Task[]> = signal(
    this.localStorageService.loadData<Task[]>(this.STORAGE_KEY, [{
      id: 1,
      text: 'Example task',
      isCompleted: false,
      priority: Priority.NONE,
      tags: []
    }])
  );

  tasksStats = linkedSignal(() => {
    const tasks = this.todosList();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted);
    const pendingTasks = tasks.filter(task => !task.isCompleted);
    const completionRate = totalTasks > 0 ? completedTasks.length / totalTasks : 0;
    const filteredCount = this.filteredTodos().length;

    return {
      total: totalTasks,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      completionRate: completionRate,
      filteredCount: filteredCount
    }

  })

  newTaskText = signal('');
  filter = signal<FilterType>('all');



  filteredTodos = computed(() => {
    const currentFilter = this.filter();
    const currentTasksList = this.todosList();

    if (currentFilter === 'all') {
      return currentTasksList;
    } else if (currentFilter === 'active') {
      return currentTasksList.filter(task => !task.isCompleted)
    } else if (currentFilter === 'completed') {
      return currentTasksList.filter(task => task.isCompleted)
    }

    return currentTasksList
  })

  changeFilter(newFilter: FilterType) {
    this.filter.set(newFilter);
  }

  addTask(newTaskText: string) {
    this.todosList.update(tasks => [...tasks, {
      id: Math.max(1, ...tasks.map(task => task.id)) + 1,
      text: newTaskText,
      isCompleted: false,
      priority: Priority.NONE,
      tags: []
    }])
  }

  toggleTask(id: number) {
    this.todosList.update(tasks => {
      return tasks.map(task => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted }
        }

        return task;
      });
    });
  }

  deleteTask(id: number) {
    this.todosList.update(tasks => {
      return tasks.filter(task => task.id !== id);
    });
  }

  saveTask(id: number, newText: string) {
    this.updateTaskText(id, newText);
    this.setEditingId(null);
  }

  cancelEdit() {
    this.setEditingId(null);
  }

  editingId = signal<number | null>(null)

  setEditingId(id: number | null) {
    this.editingId.set(id);
  }

  updateTaskText(id: number, newText: string) {
    this.todosList.update(tasks => {
      return tasks.map(task => {
        if (task.id === id) {
          return { ...task, text: newText }
        }

        return task;
      })
    })
  }

  constructor() {
    effect(() => {
      const tasks = this.todosList();
      this.localStorageService.saveData(this.STORAGE_KEY, tasks);
    });
  }
}
