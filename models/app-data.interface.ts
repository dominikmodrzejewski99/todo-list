import { Task } from './task.interface';

export interface AppData {
    tasks: Task[];
    coffeeCounter: number;
    exportDate: string;
    version: string;
} 