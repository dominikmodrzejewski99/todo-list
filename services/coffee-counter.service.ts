import { Injectable, signal, inject, effect } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCounterService {

  private localStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'coffee_counter';

  // Load coffee counter from localStorage or use default (0)
  coffeeCounter = signal<number>(
    this.localStorageService.loadData<number>(this.STORAGE_KEY, 0)
  );

  addCoffee() {
    this.coffeeCounter.update(counter => counter + 1);
  }

  removeCoffee() {
    this.coffeeCounter.update(counter => Math.max(0, counter - 1));
  }

  resetCoffee() {
    this.coffeeCounter.set(0);
  }

  constructor() {
    // Auto-save coffee counter to localStorage whenever it changes
    effect(() => {
      const counter = this.coffeeCounter();
      this.localStorageService.saveData(this.STORAGE_KEY, counter);
    });
  }
}
