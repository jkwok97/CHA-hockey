import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  teamPicked: boolean = false;
  isMobile: boolean = false;
  isLoading: boolean = false;

  years = [{ 
      label: '20/21 Season', query: '21', 
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=1702239337&single=true&widget=false&headers=false&chrome=false'
    },
    { 
      label: '19/20 Season', query: '20', 
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=587747407&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '18/19 Season', query: '19',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=244186077&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '17/18 Season', query: '18',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=882679570&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '16/17 Season', query: '17',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=336901954&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '15/16 Season', qeury: '16',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=534138117&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '14/15 Season', query: '15',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=23&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '13/14 Season', query: '14',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=21&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '12/13 Season', query: '13',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=18&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '11/12 Season', query: '12',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=14&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '10/11 Season', query: '11',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=10&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '09/10 Season', query: '10',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=6&single=true&widget=false&headers=false&chrome=false'
    },{
      label: '08/09 Season', query: '09',
      link: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhNH4rS2kl3afY5kfy6IpXo4x3u-XJnuBh01R4bleYWovIvt-pk2JhtzxW-10kMamkd2LgpzmvuiMP/pubhtml?gid=3&single=true&widget=false&headers=false&chrome=false'
    }
  ];
  tradePage: any;
  year: any;

  @ViewChild('yearSelect', {static: false}) yearSelect

  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.checkMobile();
   }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.yearSelect.value = '21';
      this.tradePage = this.sanitizer.bypassSecurityTrustResourceUrl(this.years[0].link);
      this.isLoading = false;
    }, 250);
  }

  toTradeYear(event) {
    this.yearSelect.value = event.value;
    this.year = this.years.find(year => year.query === this.yearSelect.value);
    this.tradePage = this.sanitizer.bypassSecurityTrustResourceUrl(this.year.link);
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
