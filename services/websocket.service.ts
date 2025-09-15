import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, retry, timer, tap, Observable, Subject, filter } from 'rxjs';
import { CoffeeMessage, ConnectionState, TaskSyncMessage, WebSocketMessage } from '../models/websocket.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private readonly RETRY_ATTEMPTS = 5;
  private readonly RETRY_DELAY = 1000;
  private readonly DEFAULT_WS_URL = 'ws://localhost:2137';

  private destroyRef = inject(DestroyRef);
  public websocket$?: WebSocketSubject<WebSocketMessage>;

  // Stable stream of all incoming messages regardless of connection timing
  private incomingMessages$ = new Subject<WebSocketMessage>();

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

    // 📡 Subscribe to messages and forward to stable subject
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
    ).subscribe((message) => {
      this.incomingMessages$.next(message as WebSocketMessage);
    });
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

  // 📨 Get task messages observable (all messages)
  getTaskMessages(): Observable<WebSocketMessage> {
    return this.incomingMessages$.asObservable();
  }

  getCoffeeMessages(): Observable<CoffeeMessage> {
    return this.incomingMessages$.pipe(
      filter((msg): msg is CoffeeMessage => (msg as any)?.type === 'COFFEE_COUNTER_CHANGED')
    );
  }

  // 📤 Send coffee message to server
  sendCoffeeMessage(coffeeCount: number): void {
    if (this.connectionState$.value === ConnectionState.connected && this.websocket$) {
      const message: CoffeeMessage = this.createCoffeeMessage(coffeeCount);
      console.log('📤 Sent coffee message:', message);
      this.websocket$.next(message);
    } else {
      console.warn('⚠️ Cannot send coffee message - WebSocket not connected');
    }
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

  createCoffeeMessage(coffeeCount: number): CoffeeMessage {
    return {
      type: 'COFFEE_COUNTER_CHANGED',
      coffeeCount,
      timestamp: Date.now()
    }
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
}
