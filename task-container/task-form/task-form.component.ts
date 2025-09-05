import { Component, input, model } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatInput,
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  taskText = model<string>('');
  placeholder = input<string>('Enter new task...');
  label = input<string>('What needs to be done?');

}
