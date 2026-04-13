import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  signInForm: any;

  constructor(private fb: FormBuilder) {
      this.signInForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      // Handle sign-in logic here (e.g., call an API)
      console.log('Sign-in data:', { username, password });
    } else {
      console.log('Form is invalid');
    }
  }
}
