import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
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
  currentSeason: string = '2019-20';
  currentSeasonType: string = 'Regular';

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

  constructor(
    private _teamsService: TeamsService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    // this.currentSeason = this._teamsService.currentSeason;
    // this.currentSeasonType = this._teamsService.currentSeasonType;
    if (this._route.snapshot.routeConfig.path === "stats/goalies") {
      this.inAllPlayersStats = true;
      this.getOverallPlayerStats(this.currentSeasonType);
    } else if (this._route.snapshot.routeConfig.path === "teams/:params") {
        this.currentSeason = this._teamsService.currentSeason;
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamGoalieStatsByYearByType(this.short_team_name, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        this.stats = resp as [];
        this.goalies = new MatTableDataSource<any[]>(this.stats);
        this.length = this.stats.length;
        this.isLoading = false;  
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
        }, 350);
      });
    }
  }

  getOverallPlayerStats(seasonType) {
    this._teamsService.getGoalieStatsByYearByType(this.currentSeason, seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(this.stats);
      this.pageSize = 25;
      this.length = this.stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.goalies.paginator = this.paginator;
      }, 350);
    });
  }

  changeSeason(seasonType) {
    this.isLoading = true;
    this.currentSeasonType = seasonType;
    this.getOverallPlayerStats(this.currentSeasonType);
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
