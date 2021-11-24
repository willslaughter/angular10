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
    public ReviewDescription: string
  ){

  }
}

@Component({
  selector: 'app-show-mov',
  templateUrl: './show-mov.component.html',
  styleUrls: ['./show-mov.component.css']
})
export class ShowMovComponent implements OnInit {


 id  = +this._route.snapshot.params['MovieId'];
 MovieName  = this._route.snapshot.params['MovieName'];
 MovieDirector  = this._route.snapshot.params['MovieDirector'];
 popupVisible = false;
 reviewDescription = "";
 rating = null;
 averageRating = 0;
 filterLength = 0;
 totalReviews = 0;
 showError = false;
 greenRating = false;
 yellowRating = false;
 redRating = false;
 url = 'http://localhost:49625/api/review';
 moviePhoto = '';


  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute) {
     
     }

    reviews!: Review[];
    movies!: Movie[];



  ngOnInit(): void {
    const id  = +this._route.snapshot.params['MovieId'];
    this.getReviews();
    this.getMovies();
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


  addReview(){
    if(this.rating){
    let review = {
       MovieId: this.id,
       Rating: this.rating,
       ReviewDescription: this.reviewDescription
    }
    this.httpClient.post(this.url, review).toPromise().then(data => {
      console.log(data);
      this.getReviews();
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
    this.averageRating = 0;
    this.filterLength = 0;
    for(let i = 0; i < this.reviews.length; i++)
    {
      if(this.id == this.reviews[i].MovieId)
      this.filterLength = this.filterLength + 1;
    }

    for(let i = 0; i < this.reviews.length; i++)
    {
      if(this.id == this.reviews[i].MovieId)
      this.averageRating = this.averageRating + this.reviews[i].Rating;
    }

    this.averageRating = this.averageRating/this.filterLength;
    this.totalReviews = this.filterLength;

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

  storeMovie(){
    for(let i = 0; i< this.movies.length; i++)
    {
      if(this.movies[i].MovieId == this.id)
        this.moviePhoto = this.movies[i].MoviePhoto;
    }
    console.log(this.moviePhoto);
  }

  getReviews(){
    this.httpClient.get<any>('http://localhost:49625/api/review').subscribe(
      Response => {
        this.reviews = Response;
        this.averageRatings();
      }
    );
  }

  getMovies(){
    this.httpClient.get<any>('http://localhost:49625/api/movie').subscribe(
      Response => {
        this.movies = Response;
        this.storeMovie();
      }
    );
  }

}

