import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Footer } from '../../components/footer/footer';
import { HardwareInfo } from '../../models/hardware-info';

@Component({
  selector: 'app-hardware-choice',
  imports: [Footer, MatIconModule, NgClass, CommonModule, FormsModule],
  templateUrl: './hardware-choice.html',
  styleUrl: './hardware-choice.scss',
})
export class HardwareChoice implements OnInit {

  username = 'thevieirinhaa';
  selectedOption: 'hardware' | 'discovery' = 'hardware';

  hardware: HardwareInfo = {
    cpu: '',
    gpu: '',
    ramGb: 0
  };

  hardwareError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  selectOption(option: 'hardware' | 'discovery'): void {
    this.selectedOption = option;
  }

  continueToLoading(): void {
    if (this.selectedOption === 'hardware') {
      if (
        !this.hardware.cpu.trim() ||
        !this.hardware.gpu.trim() ||
        !this.hardware.ramGb ||
        this.hardware.ramGb <= 0
      ) {
        this.hardwareError =
          'Informe seu processador, sua placa de vídeo e sua memória RAM.';
        return;
      }
    }

    this.hardwareError = '';

    const normalizedHardware =
    this.selectedOption === 'hardware'
      ? {
          cpu: this.formatHardwareName(this.hardware.cpu),
          gpu: this.formatHardwareName(this.hardware.gpu),
          ramGb: this.hardware.ramGb
        }
      : null;

    this.router.navigate(['/loading', this.username], {
      state: {
        selectedOption: this.selectedOption,
        hardware: normalizedHardware
      }
    });
  }

  
  formatHardwareName(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
