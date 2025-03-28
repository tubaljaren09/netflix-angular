import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `<app-navbar></app-navbar><router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'netflix-angular';
}
