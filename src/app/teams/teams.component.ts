import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TeamsService } from './teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy, AfterViewInit {

  private _alive:boolean = true;
  historicTeam: boolean = false;

  short_team_name: string = '';
  currentSeason: string;

  team: any;
  stats: any[];

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) {
    this.currentSeason = this._teamsService.currentSeason;
    this.short_team_name = this._route.snapshot.url[1].path;
    this._teamsService.getTeamStatsByYear(this.short_team_name, this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.stats = resp as [];
      if (this._route.snapshot.url[2]) {
        this.historicTeam = true;
        let year = this._route.snapshot.url[2].path;
        let type = this._route.snapshot.url[3].path;
        this.team = this.stats.find(season => season.playing_year === year && season.season_type === type);
      } else {
        this.team = this.stats[0];
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
