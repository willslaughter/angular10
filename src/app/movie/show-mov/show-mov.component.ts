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


export class Review {
  constructor(
    public ReviewId: number,
    public MovieId: number,
    public Rating: string,
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
 url = 'http://localhost:49625/api/review';


  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute) {
     
     }

    reviews: Review[] | undefined;

  ngOnInit(): void {
    const id  = +this._route.snapshot.params['MovieId'];
    this.getReviews();

  }


  openReviewForm(){
    this.popupVisible = true;
  }
  closeReviewForm(){
    this.popupVisible = false;
  }

  addReview(){
    let review = {
      ReviewId: "3",
       MovieId: this.id,
       Rating: "9",
       ReviewDescription: this.reviewDescription
    }
    this.httpClient.post(this.url, review).toPromise().then(data => {
      console.log(data);
      this.getReviews();
    });
    this.popupVisible = false;
    this.reviewDescription = "";
  }

  getReviews(){
    this.httpClient.get<any>('http://localhost:49625/api/review').subscribe(
      Response => {
        this.reviews = Response;
        console.log(Response);
      }
    );
  }

}

