import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { AppModule } from 'src/app/app.module';
import { Movie } from '../movie.component';


@Component({
  selector: 'app-show-mov',
  templateUrl: './show-mov.component.html',
  styleUrls: ['./show-mov.component.css']
})
export class ShowMovComponent implements OnInit {

 id  = +this._route.snapshot.params['MovieId'];
 MovieName  = this._route.snapshot.params['MovieName'];
 MovieDirector  = this._route.snapshot.params['MovieDirector'];

  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute) { }

    movies: Movie[] | undefined;

  ngOnInit(): void {
    const id  = +this._route.snapshot.params['MovieId'];

  }



}

