import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.css']
})
export class PicksComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  picksPage: any;

  constructor(
    private sanitizer: DomSanitizer
  ) { 
    this.checkMobile();
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.picksPage = this.sanitizer.bypassSecurityTrustResourceUrl("https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=370157936&single=true&widget=false&headers=false&chrome=false");
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
