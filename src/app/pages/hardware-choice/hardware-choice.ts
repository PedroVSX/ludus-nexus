import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-hardware-choice',
  imports: [Footer, MatIconModule],
  templateUrl: './hardware-choice.html',
  styleUrl: './hardware-choice.scss',
})
export class HardwareChoice {}
