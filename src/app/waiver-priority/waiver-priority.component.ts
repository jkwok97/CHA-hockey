import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-waiver-priority',
  templateUrl: './waiver-priority.component.html',
  styleUrls: ['./waiver-priority.component.css']
})
export class WaiverPriorityComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  waiverPage: any;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.checkMobile();
   }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.waiverPage = this.sanitizer.bypassSecurityTrustResourceUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vT2ElnsHkbexgaMCN5AVxLhcF3_8vCi56L4QW_umZ-cuPOn3_EC3fHEuJgf7C1Hz61-uVhhSoaQqx-F/pubhtml?widget=false&headers=false&chrome=false");
      this.isLoading = false;
    }, 500);
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
