import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, retry, timer, tap, Observable, filter } from 'rxjs';
import { ConnectionState, TaskSyncMessage } from '../models/websocket.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly RETRY_ATTEMPTS = 5;
  private readonly RETRY_DELAY = 1000;
  private readonly DEFAULT_WS_URL = 'ws://localhost:7779';

  private destroyRef = inject(DestroyRef);
  private websocket$?: WebSocketSubject<TaskSyncMessage>;

  connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.disconnected);

  constructor() {
    this.startConnection();
  }

  private getRetryConfig() {
    return retry({
      count: this.RETRY_ATTEMPTS,
      delay: (error, retryCount) => {
        console.log(`🔄 Retry attempt ${retryCount} after error:`, error);
        return timer(this.RETRY_DELAY * retryCount);
      }
    });
  }

  // 🔌 Start WebSocket Connection
  startConnection(url: string = this.DEFAULT_WS_URL): void {
    if (this.connectionState$.value === ConnectionState.connected) {
      console.log('⚠️ Already connected to WebSocket');
      return;
    }

    console.log('🔌 Starting WebSocket connection to:', url);
    // Keep as disconnected until actually connected

    this.websocket$ = webSocket({
      url,
      openObserver: {
        next: () => {
          console.log('✅ WebSocket connected!');
          this.connectionState$.next(ConnectionState.connected);
        }
      },
      closeObserver: {
        next: () => {
          console.log('🔴 WebSocket disconnected');
          this.connectionState$.next(ConnectionState.disconnected);
        }
      }
    });

    // 📡 Subscribe to messages and handle connection
    this.websocket$.pipe(
      this.getRetryConfig(),
      tap((message) => {
        console.log('📨 Received message:', message);
      }),
      catchError((error) => {
        console.error('❌ WebSocket error:', error);
        this.connectionState$.next(ConnectionState.disconnected);
        return EMPTY;
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  // 📤 Send task sync message to server
  sendTaskMessage(message: TaskSyncMessage): void {
    if (this.connectionState$.value === ConnectionState.connected && this.websocket$) {
      this.websocket$.next(message);
      console.log('📤 Sent task message:', message);
    } else {
      console.warn('⚠️ Cannot send message - WebSocket not connected');
    }
  }

  // 📨 Get task messages observable (filtered for task sync only)
  getTaskMessages(): Observable<TaskSyncMessage> {
    return this.websocket$ || EMPTY;
  }

  // 🔌 Disconnect from server
  disconnect(): void {
    if (this.connectionState$.value !== ConnectionState.disconnected && this.websocket$) {
      console.log('🔌 Disconnecting WebSocket...');
      this.websocket$.complete();
      this.websocket$ = undefined;
      this.connectionState$.next(ConnectionState.disconnected);
    }
  }

  // 🔄 Reconnect to server
  reconnect(url?: string): void {
    this.disconnect();
    setTimeout(() => {
      this.startConnection(url);
    }, 1000);
  }

  // 🛠️ Helper method to create task messages
  createTaskMessage(type: TaskSyncMessage['type'], taskId: number, taskData?: TaskSyncMessage['taskData']): TaskSyncMessage {
    return {
      type,
      taskId,
      taskData,
      timestamp: Date.now()
    };
  }
}
