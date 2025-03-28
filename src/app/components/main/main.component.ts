import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  movies: any[] = [];
  movie: any = null;

  // Replace with your actual API endpoint.
  private apiUrl: string =
    'https://api.themoviedb.org/3/movie/popular?api_key=6c1da559fcff94b3b34dd3e939e1db51&language=en-US&page=1';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovieData();
  }

  // Fetch the movie data from the API.
  fetchMovieData(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.movies = response.results;
        // Assuming the API returns an object with a "results" array.
        if (this.movies.length > 0) {
          this.movie =
            this.movies[Math.floor(Math.random() * this.movies.length)];
        }
      },
      error: (err) => {
        console.error('Error fetching movie data:', err);
      },
    });
  }

  // Function to truncate a string to a specified length.
  truncateString(str: string, num: number): string {
    if (!str) return '';
    return str.length > num ? str.substring(0, num) + '...' : str;
  }
}
