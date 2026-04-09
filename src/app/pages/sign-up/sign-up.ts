import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  signUpForm: any;

  constructor(private fb: FormBuilder) {
      this.signUpForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { username, email, password } = this.signUpForm.value;
      // Handle sign-up logic here (e.g., call an API)
      console.log('Sign-up data:', { username, email, password });
    } else {
      console.log('Form is invalid');
    }
  }
}
