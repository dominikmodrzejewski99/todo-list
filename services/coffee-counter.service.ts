import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoffeeCounterService {

  coffeeCounter = signal<number>(0);

  addCoffee() {
    this.coffeeCounter.update(counter => counter + 1);
  }

  removeCoffee() {
    this.coffeeCounter.update(counter => Math.max(0, counter - 1));
  }

  resetCoffee() {
    this.coffeeCounter.set(0);
  }

  constructor() { }
}
