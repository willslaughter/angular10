import { Injectable } from "@angular/core";
import { fromEvent, Observable, Subject, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class IdleService {

    public idle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public logoutIdle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public wake$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    isIdle = false;
    logoutIdle = false;
    private idleAfterSeconds = 3;
    private logoutIdleAfterSeconds = 6;
    private countDown!: any;
    private logout!: any;

    constructor() {
        // Setup events
        fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
        fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
        fromEvent(document, 'keydown').subscribe(() => this.onInteraction());
    }

    onInteraction() {

        // Is idle and interacting, emit Wake
        if (this.isIdle) {
            this.isIdle = false;
            this.wake$.next(true);
        }

        // User interaction, reset start-idle-timer
        clearTimeout(this.countDown);
        this.countDown = setTimeout(() => {
            // Countdown done without interaction - emit Idle
            this.isIdle = true;
            this.idle$.next(true);
        }, this.idleAfterSeconds * 1_000)
        clearTimeout(this.logout);
        this.logout = setTimeout(() => {
            // Countdown done without interaction - emit Idle
            this.logoutIdle$.next(true);
        }, this.logoutIdleAfterSeconds * 1_000)
    }

}