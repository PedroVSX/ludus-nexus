import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareChoice } from './hardware-choice';

describe('HardwareChoice', () => {
  let component: HardwareChoice;
  let fixture: ComponentFixture<HardwareChoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareChoice],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareChoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
