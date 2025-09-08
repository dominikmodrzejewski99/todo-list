import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  imports: [
    MatButton,
    MatIconModule
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  secondsElapsed: WritableSignal<number> = signal(0);
  isRunning: WritableSignal<boolean> = signal(false);

  formattedTime = computed(() => {
    const totalSeconds = this.secondsElapsed();
    return this.formatTime(totalSeconds);
  });

  constructor() {
    effect((onCleanup) => {
      if (this.isRunning()) {
        const intervalId = setInterval(() => {
          this.secondsElapsed.update(seconds => seconds + 1);
        }, 1000);

        onCleanup(() => {
          clearInterval(intervalId);
        })
      }
    });
  }

  private formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
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
