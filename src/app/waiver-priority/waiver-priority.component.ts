import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

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

  teams = [];

  waiver: MatTableDataSource<any[]>;
  waiverColumnsToDisplay = ['pick', 'team_logo', 'team_name',];
  waiverMobileColumnsToDisplay = ['pick', 'team_logo'];

  constructor(
    private _teamsService: TeamsService
  ) {
    this.checkMobile();
   }

  ngOnInit() {
    this.isLoading = true;
    this._teamsService.getWaiverTeams().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.teams = resp as [];
      this.teams.sort((a,b) => a.priority_number - b.priority_number);
      this.waiver = new MatTableDataSource<any[]>(this.teams);
      this.isLoading = false;
    });
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
