import { Component, inject } from '@angular/core';
import { CoffeeCounterActionsComponent } from "./coffee-counter-actions/coffee-counter-actions.component";
import { CoffeeCounterService } from '../../services/coffee-counter.service';

@Component({
  selector: 'app-coffee-counter',
  imports: [CoffeeCounterActionsComponent],
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
}
