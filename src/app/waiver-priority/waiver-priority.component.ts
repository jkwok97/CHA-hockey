import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-waiver-priority',
  templateUrl: './waiver-priority.component.html',
  styleUrls: ['./waiver-priority.component.css']
})
export class WaiverPriorityComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;

  constructor() {
    this.checkMobile();
   }

  ngOnInit() {
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
