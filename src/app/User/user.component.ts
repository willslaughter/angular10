import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html', 
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  user = undefined;
  userName = "";
  showError = false;
  url = 'http://localhost:49625/api/user';

  ngOnInit(): void {

  }

  addUser() {
    if(this.userName != "") {
      let user = {
        UserName: this.userName
      }
      this.httpClient.post(this.url, user).toPromise().then(data => {
        console.log(data);
      });
      this._router.navigate(['/movie']);
    }
     else {
       this.showError = true;
     }
  }

  closeError(){
    this.showError = false;
  }

}
