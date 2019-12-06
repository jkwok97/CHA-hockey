import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  teamPicked: boolean = false;
  isMobile: boolean = false;

  teams = [];
  teamPage: any;
  team: any;

  @ViewChild('teamSelect', {static: false}) teamSelect
  
  constructor(
    private _teamsService: TeamsService,
    private sanitizer: DomSanitizer
  ) { 
    this.teams = this._teamsService.currentLeague.teams;
    // console.log(this.teams)
    this.teams.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }

  ngOnInit() {
    this.checkMobile();
  }

  toSalaryPage(event) {
    this.teamSelect.value = event.value;
    this.team = this.teams.find(team => team.name === this.teamSelect.value);
    if (this.isMobile) {
      window.open(this.team.mobileLink)
    } else {
      this.teamPicked = true;
      this.isLoading = true;
      this.teamPage = this.sanitizer.bypassSecurityTrustResourceUrl(this.team.link);
      this.isLoading = false;
    }
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
          this._teamsService.setMobile(true);
        } else {
          this.isMobile = false;
          this._teamsService.setMobile(false);
        }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
