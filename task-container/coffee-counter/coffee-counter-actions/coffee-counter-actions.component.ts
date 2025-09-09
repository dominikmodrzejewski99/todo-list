import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-coffee-counter-actions',
  imports: [MatIcon],
  templateUrl: './coffee-counter-actions.component.html',
  styleUrl: './coffee-counter-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoffeeCounterActionsComponent {

  // Clean event outputs
  addCoffee = output();
  removeCoffee = output();
  resetCoffee = output();

  // Event handlers
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
