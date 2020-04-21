import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TeamsService } from './teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-teams-header',
  templateUrl: './teams-header.component.html',
  styleUrls: ['./teams-header.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy, AfterViewInit {

  private _alive:boolean = true;
  historicTeam: boolean = false;

  short_team_name: string = '';
  currentSeason: string;
  currentSeasonType: string;

  team: any;
  teamInfo: any;
  stats: any[];

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) {
    if (this._route.snapshot.url[2] && this._route.snapshot.url[3]) {
      this.currentSeason = this._route.snapshot.url[2].path;
      this.currentSeasonType = this._route.snapshot.url[3].path;
    } else {
      this.currentSeason = this._teamsService.currentSeason;
      this.currentSeasonType = this._teamsService.currentSeasonType;
    }
    this.short_team_name = this._route.snapshot.url[1].path;
    this.teamInfo = this._teamsService.getTeamInfo(this.short_team_name);
    this._teamsService.getAlltimeTeamStatsByType(this.short_team_name, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp as [];
      if (this._route.snapshot.url[2]) {
        this.historicTeam = true;
        let year = this._route.snapshot.url[2].path;
        let type = this._route.snapshot.url[3].path;
        this.team = this.stats.find(season => season.playing_year === year && season.season_type === type);
      } else {
        this.team = this.stats.find(year => year.season_type === this.currentSeasonType);
      }
    }, error => {
      console.log(error);
    });
   }

  ngOnInit() {
   
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._teamsService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this._alive = false;
  }

}
