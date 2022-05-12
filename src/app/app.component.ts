import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular10';
  SignInPopup = false;
  user = "";

  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute) {
     
     }

  SignIn(){
    this.SignInPopup = true;
  }
  
  getUser() {
    this.httpClient.get<any>('http://localhost:49625/api/user/GetByName/' + this.user).subscribe(
      Response => {
        console.log(Response);
        this.user = Response[0].UserName;
        console.log(this.user);
      }
    );
    this.SignInPopup = false;
  }
 
  closeSignIn(){
    this.SignInPopup = false;
  }
}
