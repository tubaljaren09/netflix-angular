import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading = false;
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Create a form with username and password controls.
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async handleSubmit() {
    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;
      this.isLoading = true;
      try {
        const result = await lastValueFrom(
          this.auth.signUp(username, password)
        );
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      } catch (err) {
        console.error(err);
        this.errorMessage = 'Signup failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
