import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-coffee-counter-actions',
  imports: [MatIconModule],
  templateUrl: './coffee-counter-actions.component.html',
  styleUrl: './coffee-counter-actions.component.scss'
})
export class CoffeeCounterActionsComponent {

  addCoffee = output<void>();
  removeCoffee = output<void>();
  resetCoffee = output<void>();

  onAddCoffee() {
    this.addCoffee.emit();
  }

  onRemoveCoffee() {
    this.removeCoffee.emit();
  }

  onResetCoffee() {
    this.resetCoffee.emit();
  }

}
