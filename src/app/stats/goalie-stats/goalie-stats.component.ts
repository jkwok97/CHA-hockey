import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-goalie-stats',
  templateUrl: './goalie-stats.component.html',
  styleUrls: ['./goalie-stats.component.css']
})
export class GoalieStatsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  inAllPlayersStats: boolean = false;

  stats: any[];

  short_team_name: string = '';

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];
  teamGoaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
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
    if (this._route.snapshot.routeConfig.path === "stats/goalies") {
      this._teamsService.getGoalieStats().pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.inAllPlayersStats = true;
        this.stats = resp as [];
        this.goalies = new MatTableDataSource<any[]>(this.stats);
        this.pageSize = 25;
        this.length = this.stats.length;
        this.isLoading = false;
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamGoalieStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.stats = resp as [];
        this.goalies = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;  
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.goalies.sort = this.sort;
        }, 350);
      });
    }
  }

  findLogo(shortName) {
    let team = this._teamsService.getTeamInfo(shortName);
    return { image: team.image, name: team.name }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
