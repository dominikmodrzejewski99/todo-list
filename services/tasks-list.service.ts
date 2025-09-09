import { computed, Injectable, signal, WritableSignal } from '@angular/core';

export interface Task {
  id: number,
  text: string,
  isCompleted: boolean,
}

export type FilterType = 'all' | 'active' | 'completed';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  todosList: WritableSignal<Task[]> = signal([{
    id: 1,
    text: 'Example task',
    isCompleted: false
  }])

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
      isCompleted: false
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
  constructor() { }
}
