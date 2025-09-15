import { inject, Injectable } from '@angular/core';
import { TasksListService } from '../services/tasks-list.service';
import { PriorityService } from '../services/priority.service';
import { WebsocketService } from '../services/websocket.service';
import { Priority } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskManagerFacade {

  private taskListService = inject(TasksListService);
  private websocketService = inject(WebsocketService);

  constructor() {
    // 📡 Listen for incoming task changes from other clients
    this.websocketService.getTaskMessages().subscribe(message => {
      this.handleIncomingTaskMessage(message);
    });
  }

  // 🔄 Synchronized Task Operations

  addTask(text: string): void {
    // Add task locally
    const tasks = this.taskListService.todosList();
    const newTaskId = Math.max(1, ...tasks.map(task => task.id)) + 1;

    this.taskListService.addTask(text);

    // Send to other clients
    this.websocketService.sendTaskMessage(
      this.websocketService.createTaskMessage('TASK_ADDED', newTaskId, { text })
    );
  }

  toggleTask(taskId: number): void {
    // Find current task state
    const task = this.taskListService.todosList().find(t => t.id === taskId);
    if (!task) return;

    // Toggle locally
    this.taskListService.toggleTask(taskId);

    // Send to other clients
    this.websocketService.sendTaskMessage(
      this.websocketService.createTaskMessage('TASK_TOGGLED', taskId, {
        isCompleted: !task.isCompleted
      })
    );
  }

  deleteTask(taskId: number): void {
    // Delete locally
    this.taskListService.deleteTask(taskId);

    // Send to other clients
    this.websocketService.sendTaskMessage(
      this.websocketService.createTaskMessage('TASK_DELETED', taskId)
    );
  }

  updateTaskText(taskId: number, newText: string): void {
    // Update locally
    this.taskListService.updateTaskText(taskId, newText);

    // Send to other clients
    this.websocketService.sendTaskMessage(
      this.websocketService.createTaskMessage('TASK_UPDATED', taskId, { text: newText })
    );
  }

  updateTaskPriority(taskId: number, priority: Priority): void {
    // Update locally
    this.taskListService.todosList.update(tasks =>
      tasks.map(task => task.id === taskId ? { ...task, priority } : task)
    );

    // Send to other clients
    this.websocketService.sendTaskMessage(
      this.websocketService.createTaskMessage('TASK_PRIORITY_CHANGED', taskId, {
        priority: priority
      })
    );
  }

  private handleIncomingTaskMessage(message: any): void {
    console.log('📨 Received task message:', message);

    switch (message.type) {
      case 'TASK_ADDED':
        if (message.taskData?.text) {
          this.taskListService.todosList.update(tasks => [...tasks, {
            id: message.taskId,
            text: message.taskData.text,
            isCompleted: false,
            priority: Priority.NONE
          }]);
        }
        break;

      case 'TASK_DELETED':
        this.taskListService.todosList.update(tasks =>
          tasks.filter(task => task.id !== message.taskId)
        );
        break;

      case 'TASK_TOGGLED':
        this.taskListService.todosList.update(tasks =>
          tasks.map(task => task.id === message.taskId
            ? { ...task, isCompleted: message.taskData?.isCompleted ?? !task.isCompleted }
            : task
          )
        );
        break;

      case 'TASK_UPDATED':
        if (message.taskData?.text) {
          this.taskListService.todosList.update(tasks =>
            tasks.map(task => task.id === message.taskId
              ? { ...task, text: message.taskData.text }
              : task
            )
          );
        }
        break;

      case 'TASK_PRIORITY_CHANGED':
        if (message.taskData?.priority) {
          const priority = message.taskData.priority;


          this.taskListService.todosList.update(tasks =>
            tasks.map(task => task.id === message.taskId
              ? { ...task, priority }
              : task
            )
          );
        }
        break;
    }
  }
}
