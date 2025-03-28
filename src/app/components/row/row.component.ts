import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-row',
  imports: [CommonModule, MovieComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent implements OnInit {
  @Input() title!: string;
  @Input() fetchURL!: string;
  movies: any[] = [];

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(this.fetchURL).subscribe((response) => {
      this.movies = response.results;
    });
  }

  slideLeft(): void {
    if (this.slider && this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft -= 500;
    }
  }

  slideRight(): void {
    if (this.slider && this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft += 500;
    }
  }
}
