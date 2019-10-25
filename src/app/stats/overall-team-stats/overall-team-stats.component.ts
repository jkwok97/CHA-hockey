import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-overall-team-stats',
  templateUrl: './overall-team-stats.component.html',
  styleUrls: ['./overall-team-stats.component.css']
})
export class OverallTeamStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  stats: any[];

  short_team_name: string = '';

  teams: MatTableDataSource<any[]>;
  teamsColumnsToDisplay = [
    'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;
    if (this._route.snapshot.routeConfig.path === "stats/league") {
      this._teamsService.getLeagueTeamsStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
        this.stats = resp as [];
        this.teams = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.teams.paginator = this.paginator;
          this.teams.sort = this.sort;
        }, 350);
      });
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
        this.stats = resp as [];
        this.teams = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;  
        setTimeout(() => {
          this.teams.paginator = this.paginator;
          this.teams.sort = this.sort;
        }, 350);
      });
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
