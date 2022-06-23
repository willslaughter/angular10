import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';


export class Movie {
  constructor(
    public MovieId: number,
    public MovieName: string,
    public MovieDirector: string,
    public MovieDescription: string,
    public MoviePhoto: string,
    public ReviewAverage: number
  ){

  }
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html', 
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  averageRating: any[] | undefined;
  movieListLength = 0;
  movieName = '';
  movieDescription = '';
  moviePhoto = '';
  movieDirector = '';
  greenRating = false;
  yellowRating = false;
  redRating = false;
  popupVisible = false;

  movies!: Movie[];
  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  openReviewForm(){
    this.popupVisible = true;
  }
  closeReviewForm(){
    this.popupVisible = false;
  }

  addMovie(){
 
    let movie = {
       MovieName: this.movieName,
       MovieDirector: this.movieDirector,
       MoviePhoto: this.moviePhoto,
       MovieDescription: this.movieDescription

    }
    this.httpClient.post('http://localhost:49625/api/movie', movie).toPromise().then(data => {
      this.getMovies();
    });
    this.popupVisible = false;
    this.movieDescription = "";
    this.movieDirector = "";
    this.movieName = "";
    this.moviePhoto = '';
  /*
    else {
      this.showError = true;
    }
    */
  }


  onClick(MovieId: number) {
    this._router.navigate(['/showMovie', MovieId]);

  }

  getMovies(){
    this.httpClient.get<any>('http://localhost:49625/api/movie').subscribe(
      Response => {
        this.movies = Response;
        this.movieListLength = this.movies?.length;
        for(let  i= 0; i < this.movieListLength; i++){
        this.getAverage(i);
        }
      }
    );
  }

  getAverage(id: number) {
    this.httpClient.get<any>('http://localhost:49625/api/movie/GetRatingAverage/' + id).subscribe(
      Response => {
         //this.averageRating = Response[];
         console.log(this.averageRating);
/*
        if(this.averageRating >= 8) {
          this.greenRating = true;
          this.yellowRating = false;
          this.redRating = false;
        }
    
        if(this.averageRating < 8 && this.averageRating >= 5) {
          this.yellowRating = true;
          this.greenRating = false;
          this.redRating = false;
        }
    
        if(this.averageRating < 5) {
          this.redRating = true;
          this.greenRating = false;
          this.yellowRating = false;
        }

        */
      }
    );
  }


}
