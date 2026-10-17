import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';

import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-hardware-choice',
  imports: [Footer, MatIconModule, NgClass, CommonModule],
  templateUrl: './hardware-choice.html',
  styleUrl: './hardware-choice.scss',
})
export class HardwareChoice {

  selectedOption: 'hardware' | 'discovery' = 'hardware';

  selectOption(option: 'hardware' | 'discovery'): void {
    this.selectedOption = option;
  }

}
