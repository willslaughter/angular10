import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AppModule } from 'src/app/app.module';
import { Movie } from '../movie.component';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { DxButtonModule } from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular';

import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { defaultRippleAnimationConfig } from '@angular/material/core';


export class Review {
  constructor(
    public ReviewId: number,
    public MovieId: number,
    public Rating: number,
    public ReviewDescription: string,
    public UserName: string
  ){

  }
}

export class AverageRating {
  constructor(
    public averageRating: number
  ) {
  }
}



@Component({
  selector: 'app-show-mov',
  templateUrl: './show-mov.component.html',
  styleUrls: ['./show-mov.component.css']
})
export class ShowMovComponent implements OnInit {


 id  = +this._route.snapshot.params['MovieId'];
 MovieName: string | undefined;
 MovieDirector: string | undefined;
 MoviePhoto: string | undefined;
 MovieReleaseDate: string | undefined;
 MovieDescription: string | undefined;
 ReviewAverage: number | undefined;

 popupVisible = false;
 reviewDescription = "";
 rating = null;
 averageRating: any;
 filterLength = 0;
 totalReviews = 0;
 showError = false;
 greenRating = false;
 yellowRating = false;
 redRating = false;
 url = 'http://localhost:49625/api/review';
 movieUrl = 'http://localhost:49625/api/movie';



  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute) {
     
     }

    reviews!: Review[];
    movies!: Movie[];
    movie!: Movie[];
    AverageRating!: AverageRating[];


  ngOnInit(): void {
    const id  = +this._route.snapshot.params['MovieId'];
    this.getReviews();
    this.getMovie();
    this.averageRatings();
    //this.sendAverage();
  }


  openReviewForm(){
    this.popupVisible = true;
  }
  closeReviewForm(){
    this.popupVisible = false;
  }

  closeError(){
    this.showError = false;
  }

  sendAverage() {
    let movie = {
      MovieId: this.id,
      MovieName: this.MovieName,
      MovieDirector: this.MovieDirector,
      MovieDescription: this.MovieDescription,
      MoviePhoto: this.MoviePhoto,
      ReviewAverage: 5.0
   }
   this.httpClient.put(this.url, movie).subscribe(data => {
     console.log(data);
   });
  }


  addReview(){
    if(this.rating){
    let review = {
       MovieId: this.id,
       Rating: this.rating,
       ReviewDescription: this.reviewDescription,
       UserName: "AnotherUser2"
    }
    this.httpClient.post(this.url, review).toPromise().then(data => {
      this.getReviews();
      this.averageRatings();
    });
    this.popupVisible = false;
    this.reviewDescription = "";
    this.rating = null;
  }
    else {
      this.showError = true;
    }
  }

  
  averageRatings(){
    this.httpClient.get<any>('http://localhost:49625/api/movie/GetRatingAverage/' + this.id).subscribe(
      Response => {
         this.averageRating = Response[0].Column1;
         this.ReviewAverage = Response[0].Column1;

        //this.sendAverage();
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
      }
    );
    console.log(this.ReviewAverage);
  }
  


  getReviews(){
    this.httpClient.get<any>('http://localhost:49625/api/review/' + this.id).subscribe(
      Response => {
        console.log(Response);
        this.reviews = Response;
        this.totalReviews = Response.length;
      }
    );
  }

  getMovie(){
    this.httpClient.get<any>('http://localhost:49625/api/movie/' + this.id).subscribe(
      Response => {
        this.movie = Response;
        this.MovieName = this.movie[0].MovieName;
        this.MovieDirector = this.movie[0].MovieDirector;
        this.MoviePhoto = this.movie[0].MoviePhoto;
        this.MovieDescription = this.movie[0].MovieDescription;
        this.ReviewAverage = this.movie[0].ReviewAverage;
      }
    );
  }

}

