import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, retry, scan, takeWhile, timer } from 'rxjs';
import { ConnectionState } from '../models/websocket.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})


export class WebsocketService {

  private readonly RETRY_ATTEMPTS = 5;
  private readonly RETRY_DELAY = 1000;

  private destroyRef = inject(DestroyRef);

  private websocket$ ?: WebSocketSubject<unknown>;

  connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.disconnected);

  private getRetryConfig() {
  return retry({
    count: this.RETRY_ATTEMPTS,
    delay: (error, retryCount) => {
      console.log(`Retry attempt ${retryCount} after error ${error}`);
      return timer(this.RETRY_DELAY * retryCount);
    }
  })
}
  
  connect(url: string) {

    this.websocket$ = webSocket({
      url,
      openObserver: {
        next: () => {
          this.connectionState$.next(ConnectionState.connected)
        }
      },
      closeObserver: {
        next: () => {
          this.connectionState$.next(ConnectionState.disconnected)
        }
      }
    });

    return this.websocket$.pipe(
      this.getRetryConfig(),
    
      catchError((error) => {
        this.connectionState$.next(ConnectionState.disconnected);
        return EMPTY;
      }),

      takeUntilDestroyed(this.destroyRef));
  }
  


sendMessage(message: unknown) {
  if (this.connectionState$.value === ConnectionState.connected && this.websocket$) {
    this.websocket$.next(message);
  }
  else {
    console.warn('⚠️ Cannot send message - WebSocket not connected');
  }
}

disconnect() {
  if (this.connectionState$.value === ConnectionState.connected && this.websocket$) {
    this.websocket$.complete();
    this.websocket$ = undefined
    this.connectionState$.next(ConnectionState.disconnected);

  }
}


}
