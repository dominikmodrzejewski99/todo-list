import { Component, inject } from '@angular/core';
import { CoffeeCounterActionsComponent } from "./coffee-counter-actions/coffee-counter-actions.component";
import { CoffeeCounterService } from '../../services/coffee-counter.service';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-coffee-counter',
  imports: [CoffeeCounterActionsComponent, MatIcon, DecimalPipe],
  templateUrl: './coffee-counter.component.html',
  styleUrl: './coffee-counter.component.scss'
})
export class CoffeeCounterComponent {

  coffeeCounterService = inject(CoffeeCounterService);
  coffeeCounter = this.coffeeCounterService.coffeeCounter;

  addCoffee() {
    this.coffeeCounterService.addCoffee();
  }

  removeCoffee() {
    this.coffeeCounterService.removeCoffee();
  }

  resetCoffee() {
    this.coffeeCounterService.resetCoffee();
  }

  // Calculate fill percentage for progress bar (max 10 cups = 100%)
  getFillPercentage(): number {
    const maxCups = 10;
    return Math.min((this.coffeeCounter() / maxCups) * 100, 100);
  }
}
