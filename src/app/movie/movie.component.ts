import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';


export class Movie {
  constructor(
    public MovieId: number,
    public MovieName: string,
    public MovieDirector: string,
    public MovieReleaseDate: string,
    public MovieDescription: string,
    public MoviePhoto: string
  ){

  }
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] | undefined;
  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  onClick(MovieId: number, MovieName: string,
MovieDirector: string) {
    this._router.navigate(['/showMovie', MovieId, MovieName, MovieDirector]);

  }

  getMovies(){
    this.httpClient.get<any>('http://localhost:49625/api/movie').subscribe(
      Response => {
        this.movies = Response;
      }
    );
  }
}
