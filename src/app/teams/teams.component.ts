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

  short_team_name: string = '';

  team: any;
  stats: any[];

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) {
    console.log(this._route.snapshot)
    this.short_team_name = this._route.snapshot.url[1].path;
    this._teamsService.getTeamStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.stats = resp as [];
      if (this._route.snapshot.url[2]) {
        console.log(this._route.snapshot.url[2].path);
        let year = this._route.snapshot.url[2].path;
        let type = this._route.snapshot.url[3].path;
        this.team = this.stats.find(season => season.playing_year === year && season.season_type === type)
      } else {
        this.team = this.stats[0];
      }
      console.log(this.team);
    }, error => {
      console.log(error);
    });
   }

  ngOnInit() {
   
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this._alive = false;
  }

}
