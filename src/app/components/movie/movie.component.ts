import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [NgIf],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  @Input() item: any; // The movie object passed from a parent component

  like: boolean = false;
  saved: boolean = false;

  constructor(private auth: AuthService) {}

  saveMovie(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.like = !this.like;
      this.saved = true;
      // Simulate saving the movie; in a real app you might store it in local storage or call an API.
      alert(`Movie "${this.item.title}" saved for user ${user.username}.`);
    } else {
      alert('Please log in to save a movie');
    }
  }
}
