import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-current',
  templateUrl: './team-current.component.html',
  styleUrls: ['./team-current.component.css']
})
export class TeamCurrentComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  isPlayersLoading: boolean;
  isGoaliesLoading: boolean;

  currentSeason: string;
  currentSeasonType: string;

  team$: Observable<Team>;
  team: Team;

  playerStats = [];

  playersData: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  goaliesData: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _currentSeasonService: CurrentSeasonService,
    private _playerStatsService: PlayerStatsService,
    private _goalieStatsService: GoalieStatsService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
  }

  ngOnInit() {

    this.isGoaliesLoading = true;
    this.isPlayersLoading = true;

    this.getTeamPlayerStatsForSeason(this._route.snapshot['_urlSegment'].segments[2].path);
    this.getTeamGoalieStatsForSeason(this._route.snapshot['_urlSegment'].segments[2].path);

  }


  getTeamPlayerStatsForSeason(id: number) {
    this._playerStatsService.getPlayersBySeasonByTypeByTeam(id, '2020-21', this.currentSeasonType).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {

        const stats = resp;

        this.playerStats = stats.map(stat => ({
          ...stat,
          points_per_sixty: ((stat['points']/stat['minutes_played']) * 60).toFixed(2)
        }))

        this.playersData = new MatTableDataSource<any[]>(this.playerStats);
        this.isPlayersLoading = false;
      });
  }

  getTeamGoalieStatsForSeason(id: number) {
    this._goalieStatsService.getGoaliesBySeasonByTypeByTeam(id, '2020-21', this.currentSeasonType).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {
        const stats = resp;
        this.goaliesData = new MatTableDataSource<any[]>(stats as []);
        this.isGoaliesLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
