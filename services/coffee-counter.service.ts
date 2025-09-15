import { Injectable, signal, inject, effect } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCounterService {

  private localStorageService = inject(LocalStorageService);
  private websocketService = inject(WebsocketService);
  private readonly STORAGE_KEY = 'coffee_counter';

  // Load coffee counter from localStorage or use default (0)
  coffeeCounter = signal<number>(
    this.localStorageService.loadData<number>(this.STORAGE_KEY, 0)
  );

  addCoffee() {
    this.coffeeCounter.update(counter => counter + 1);
    const newCount = this.coffeeCounter();
    console.log('[Coffee] add -> sending', newCount);
    this.websocketService.sendCoffeeMessage(newCount);
  }

  removeCoffee() {
    this.coffeeCounter.update(counter => Math.max(0, counter - 1));
    const newCount = this.coffeeCounter();
    console.log('[Coffee] remove -> sending', newCount);
    this.websocketService.sendCoffeeMessage(newCount);
  }

  resetCoffee() {
    this.coffeeCounter.set(0);
    console.log('[Coffee] reset -> sending 0');
    this.websocketService.sendCoffeeMessage(0);
  }

  updateCoffeeCounterFromSync(newCount: number): void {
    console.log('[Coffee] incoming -> applying', newCount);
    this.coffeeCounter.set(newCount);
  }

  constructor() {
    // Auto-save coffee counter to localStorage whenever it changes
    effect(() => {
      const counter = this.coffeeCounter();
      this.localStorageService.saveData(this.STORAGE_KEY, counter);
    });

    this.websocketService.getCoffeeMessages()
      .subscribe(m => this.updateCoffeeCounterFromSync(m.coffeeCount));
  }
}
