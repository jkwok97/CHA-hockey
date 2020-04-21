import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-season',
  templateUrl: './team-season.component.html',
  styleUrls: ['./team-season.component.css']
})
export class TeamSeasonComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  short_team_name: string;
  currentSeason: string;
  seasonType: string;

  stats: any[];

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots', 'player_status'
  ];

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'player_status'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _teamsService: TeamsService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.short_team_name = this._route.snapshot.url[1].path;
    this.currentSeason = this._route.snapshot.url[2].path;
    this.seasonType = this._route.snapshot.url[3].path;
    this.getPlayerStats(this.short_team_name, this.currentSeason, this.seasonType);
    this.getGoalieStats(this.short_team_name, this.currentSeason, this.seasonType);
  }

  getPlayerStats(teamName: string, season: string, seasonType: string) {
    return this._teamsService.getTeamPlayerStatsByYearByType(teamName, season, seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.stats = resp as [];
      this.players = new MatTableDataSource<any[]>(this.stats);
      this.isLoading = false;
    });
  }

  getGoalieStats(teamName: string, season: string, seasonType: string) {
    return this._teamsService.getTeamGoalieStatsByYearByType(teamName, season, seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let goalieStats = resp as [];
      this.goalies = new MatTableDataSource<any[]>(goalieStats);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}