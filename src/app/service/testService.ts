import { Injectable } from "@angular/core";
import { fromEvent, Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class testService {




    constructor() {

    }

    testService() {
        console.log("test service works");
    }


}