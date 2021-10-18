import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-mov',
  templateUrl: './show-mov.component.html',
  styleUrls: ['./show-mov.component.css']
})
export class ShowMovComponent implements OnInit {

  constructor(private service: SharedService) { }

  MovieList:any=[];

  ngOnInit(): void {
    this.refreshMovList();
  }



  refreshMovList(){
    this.service.getMovList().subscribe(data=>{
      this.MovieList=data;
    });
  }
}
