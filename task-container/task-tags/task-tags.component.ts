import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-task-tags',
  imports: [],
  templateUrl: './task-tags.component.html',
  styleUrl: './task-tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTagsComponent {
  tags = input<string[]>([]);

  tagAdded = output<string>();
  tagRemoved = output<string>();

  newTag = signal<string>('');
  liveMessage = signal<string>('');

  add(): void {
    const t = this.newTag().trim();
    if (!t) return;
    this.tagAdded.emit(t);
    this.announce(`Tag added: ${t}`);
    this.newTag.set('');
  }

  remove(tag: string): void {
    this.tagRemoved.emit(tag);
    this.announce(`Tag removed: ${tag}`);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.newTag() && (this.tags()?.length || 0) > 0) {
      const last = this.tags()![this.tags()!.length - 1];
      this.remove(last);
      event.preventDefault();
    }
    if (event.key === 'Escape') {
      if (this.newTag()) {
        this.newTag.set('');
        this.announce('Input cleared');
        event.preventDefault();
      }
    }
  }

  private announce(message: string): void {
    this.liveMessage.set(message);
    setTimeout(() => this.liveMessage.set(''), 1500);
  }
}
