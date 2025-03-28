import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // Create a form with username and password controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async handleSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.errorMessage = '';
      this.isLoading = true;
      try {
        const success = await firstValueFrom(
          this.auth.login(username, password)
        );
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      } catch (err: any) {
        console.error(err);
        this.errorMessage = err.message || 'An error occurred during login';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
