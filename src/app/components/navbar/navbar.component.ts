import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  // Getter for the current user from AuthService
  get user() {
    return this.auth.currentUser;
  }

  async handleLogout(): Promise<void> {
    try {
      await this.auth.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
