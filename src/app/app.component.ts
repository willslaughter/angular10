import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IdleService } from './service/IdleService';
import { testService } from './service/testService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular10';
  SignInPopup = false;
  user = "";
  showError = false;
  inactivityPopup = false;
  timeoutId: any;
  userInactive: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient,
    private _route: ActivatedRoute, private idleService: IdleService, private testService: testService) {

      /*
      this.checkTimeOut();
      this.userInactive.subscribe((message) => {
   
        alert(message);
      }
      );1
      */

      idleService.idle$.subscribe(s => this.inactivityPopup = true);
      idleService.wake$.subscribe(s => {this.inactivityPopup = false;
        });
     idleService.logoutIdle$.subscribe(s => testService.testService());
     }


     checkTimeOut() {
 
      this.timeoutId = setTimeout(
   
        () => this.userInactive.next("User has been inactive for 5 seconds"), 5000
      );
   
   
    }

    @HostListener('window:keydown')
    @HostListener('window:mousedown')
    checkUserActivity() {
      console.log("triggered");
   
      clearTimeout(this.timeoutId);
   
      this.checkTimeOut();
    }

  SignIn(){
    this.SignInPopup = true;
  }

  functionCall () {
    console.log("functionCalled");
  }
  
  getUser() {
    this.httpClient.get<any>('http://localhost:49625/api/user/GetByName/' + this.user).subscribe(
      (Response) => {
        console.log(Response);
          this.user = Response[0].UserName;
        },
      (ERROR) => {
        this.user = '';
        console.log(ERROR);
      }
    );
    this.SignInPopup = false;
    
  }

  
  closeError(){
    this.showError = false;
  }
 
  closeSignIn(){
    this.user = '';
    this.SignInPopup = false;

  }
}
