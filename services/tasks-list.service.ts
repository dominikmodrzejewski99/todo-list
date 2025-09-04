import {computed, Injectable, signal, WritableSignal} from '@angular/core';

interface Task {
  id: number,
  text: string,
  isCompleted: boolean,
}

type FilterType = 'all' | 'active' | 'completed';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  todosList: WritableSignal<Task[]> = signal([{
    id: 1,
    text: 'Wash dishes',
    isCompleted: false
  }])

  newTaskText = signal('');
  filter = signal('all');

  filteredTodos = computed(() => {
    const currentFilter = this.filter();
    const currentTasksList = this.todosList();

    if(currentFilter === 'all') {
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


  constructor() { }
}
