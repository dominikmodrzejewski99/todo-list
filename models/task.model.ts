export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  NONE = 'none',
}

export interface Task {
  id: number,
  text: string,
  isCompleted: boolean,
  priority: Priority,
  tags?: string[]
}
