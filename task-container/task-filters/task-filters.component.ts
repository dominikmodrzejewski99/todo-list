import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FilterType } from '../../models/filter-type';

@Component({
  selector: 'app-task-filters',
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.scss'
})
export class TaskFiltersComponent {

  currentFilter = input.required<string>();
  onFilterChange = output<string>();

  changeFilter(filter: FilterType) {
    this.onFilterChange.emit(filter);
  }

}
