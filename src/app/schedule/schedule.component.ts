import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  schedulePage: any;
  range: string = 'a362:f821'

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.checkMobile();
    this.schedulePage = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/spreadsheets/d/e/2PACX-1vS0JKYVSkNRwOZavK_pCosNcgCFxf45mLJlRQJMmppO12SPHINN4DQpdOtu-0Wn0ZbxIQmuSpiCymcF/pubhtml?gid=0&single=true&widget=false&headers=false&chrome=false&gridlines=false&range=${this.range}`)
    this.isLoading = false;
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
