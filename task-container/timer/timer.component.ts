import {Component, effect, signal, WritableSignal} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-timer',
  imports: [
    MatButton
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  secondsElapsed: WritableSignal<number> = signal(0);

  isRunning: WritableSignal<boolean> = signal(false);

  constructor() {
    effect((onCleanup) => {
      if (this.isRunning()) {
        const intervalId = setInterval(() => {
          this.secondsElapsed.update(seconds => seconds + 1);
        }, 1000);

        onCleanup (() => {
          clearInterval(intervalId);
        })
      }
    });
  }

  startTimer() {
    this.isRunning.set(true);
  }

  stopTimer() {
    this.isRunning.set(false);
  }

  resetTimer() {
    this.isRunning.set(false);
    this.secondsElapsed.set(0);
  }
}
