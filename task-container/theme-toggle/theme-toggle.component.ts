import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  mode = this.themeService.currentTheme;
  label = computed(() => this.mode() === 'dark' ? 'Dark' : 'Light');
  icon = computed(() => this.mode() === 'dark' ? 'dark_mode' : 'light_mode');

  toggle(): void {
    this.themeService.toggleTheme();
  }
} 