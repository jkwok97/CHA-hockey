import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';

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
  teams = [];
  drafts: any;

  currentSeason: string = "2019-20";
  draftSeason: string = '2020';

  draft: MatTableDataSource<any[]>;
  draftColumnsToDisplay = ['pick', 'team_logo', 'team_name', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];
  draftMobileColumnsToDisplay = ['pick', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];

  constructor(
    private _teamsService: TeamsService
  ) { 
    this.checkMobile();
  }

  ngOnInit() {
    this.isLoading = true;
    // this.currentSeason = this._teamsService.currentSeason;
    this.getDraftTable(this.draftSeason);
  }

  showToolTip(name: string) {
    console.log(name);
  }

  changeSeason(season) {
    this.isLoading = true;
    this.draftSeason = season;
    this.getDraftTable(this.draftSeason);
  }

  getDraftTable(draftSeason) {
    this._teamsService.getDraftTable(draftSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.drafts = resp;
      this._teamsService.getLeagueTeamsStats(this.currentSeason, 'Regular').pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.getLeagueLeaders(resp, this.drafts);
      });
    });
  }

  getLeagueLeaders(resp, drafts) {
    let tempLeaders = resp;
    drafts.forEach(element => {

      // THIS IS TEMPORARY
      if (element.team_name === 'VSJ') {
       let tempTeam = tempLeaders.find(team => team.team_name === 'VIC');
       element.points = tempTeam.points;
      } else {
        let tempTeam = tempLeaders.find(team => team.team_name === element.team_name);
        element.points = tempTeam.points;
      }
    });
    drafts.sort((a,b) => a.points - b.points);
    this.draft = new MatTableDataSource<any[]>(drafts);
    this.isLoading = false;
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      if (shortName === 'VSJ') {
        return { image: team.altImage, name: team.name }
      } else {
        return { image: team.image, name: team.name }
      }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
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
