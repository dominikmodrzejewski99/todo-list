import { Task } from './task.model';

export interface AppData {
    tasks: Task[];
    coffeeCounter: number;
    exportDate: string;
    version: string;
} 