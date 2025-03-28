import { Component } from '@angular/core';
import { MainComponent } from '../components/main/main.component';
import { RowComponent } from '../components/row/row.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Requests } from '../../requests';

@Component({
  selector: 'app-home',
  imports: [MainComponent, RowComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  requests = Requests;
}
