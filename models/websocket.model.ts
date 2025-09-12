export enum ConnectionState {
    connected,
    disconnected
}

// 📨 Simple WebSocket Message Structure
export interface TaskSyncMessage {
    type: 'TASK_ADDED' | 'TASK_DELETED' | 'TASK_TOGGLED' | 'TASK_UPDATED' | 'TASK_PRIORITY_CHANGED';
    taskId: number;
    taskData?: {
        text?: string;
        isCompleted?: boolean;
        priority?: string;
    };
    timestamp: number;
}