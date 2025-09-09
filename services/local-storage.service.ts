import { Injectable } from '@angular/core';
import { Task } from '../models/task.interface';
import { AppData } from '../models/app-data.interface';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    // Generic save method
    saveData<T>(key: string, data: T): void {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
        } catch (error) {
            console.error(`Error saving data to localStorage:`, error);
        }
    }

    // Generic load method
    loadData<T>(key: string, defaultValue: T): T {
        try {
            const jsonData = localStorage.getItem(key);
            if (jsonData === null) {
                return defaultValue;
            }
            return JSON.parse(jsonData) as T;
        } catch (error) {
            console.error(`Error loading data from localStorage:`, error);
            return defaultValue;
        }
    }

    // Remove specific key
    removeData(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing data from localStorage:`, error);
        }
    }

    // Clear all app data
    clearAllData(): void {
        try {
            // Remove only our app keys
            const keysToRemove = [
                'todo_tasks',
                'coffee_counter',
                'productivity_stats',
                'daily_streak'
            ];

            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error(`Error clearing localStorage:`, error);
        }
    }

    // Export all app data
    exportAppData(): string {
        try {
            const appData: AppData = {
                tasks: this.loadData<Task[]>('todo_tasks', []),
                coffeeCounter: this.loadData<number>('coffee_counter', 0),
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            return JSON.stringify(appData, null, 2);
        } catch (error) {
            console.error('Error exporting app data:', error);
            return '{}';
        }
    }

    // Import app data from JSON string
    importAppData(jsonString: string): boolean {
        try {
            const appData: AppData = JSON.parse(jsonString);

            // Validate data structure
            if (!appData.tasks || !Array.isArray(appData.tasks)) {
                throw new Error('Invalid tasks data');
            }

            // Validate task objects structure
            const isValidTask = (task: unknown): task is Task => {
                return (
                    typeof task === 'object' &&
                    task !== null &&
                    typeof (task as Task).id === 'number' &&
                    typeof (task as Task).text === 'string' &&
                    typeof (task as Task).isCompleted === 'boolean'
                );
            };

            if (!appData.tasks.every(isValidTask)) {
                throw new Error('Invalid task structure');
            }

            // Import data with proper types
            this.saveData<Task[]>('todo_tasks', appData.tasks);
            this.saveData<number>('coffee_counter', appData.coffeeCounter || 0);

            console.log('App data imported successfully');
            return true;
        } catch (error) {
            console.error('Error importing app data:', error);
            return false;
        }
    }

    // Get storage size info
    getStorageInfo(): { usedBytes: number, availableBytes: number } {
        try {
            let usedBytes = 0;
            for (const key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    usedBytes += localStorage[key].length + key.length;
                }
            }

            // Rough estimate of available space (most browsers ~5-10MB)
            const totalBytes = 5 * 1024 * 1024; // 5MB

            return {
                usedBytes,
                availableBytes: Math.max(0, totalBytes - usedBytes)
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return { usedBytes: 0, availableBytes: 0 };
        }
    }

    // Check if localStorage is available
    isStorageAvailable(): boolean {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch {
            return false;
        }
    }

    // Debug: List all app keys
    getAppKeys(): string[] {
        const appKeys: string[] = [];
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.startsWith('todo_') || key.startsWith('coffee_'))) {
                    appKeys.push(key);
                }
            }
        } catch (error) {
            console.error('Error getting app keys:', error);
        }
        return appKeys;
    }
} 