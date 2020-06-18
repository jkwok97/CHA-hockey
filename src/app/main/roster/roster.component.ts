import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { TeamInfoService } from 'src/app/_services/team-info.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  isPlayersLoading: boolean;
  isGoaliesLoading: boolean;

  currentUser: User;

  currentSeason: string;
  currentSeasonType: string;

  teams$: Observable<Team[]>;
  team: Team;
  teams: Team[];

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
    private _authService: AuthService,
    private _teamInfoService: TeamInfoService,
    private _currentSeasonService: CurrentSeasonService,
    private _playerStatsService: PlayerStatsService,
    private _goalieStatsService: GoalieStatsService
  ) { 
    this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
    this.teams$ = this._teamInfoService.getUserTeams(this.currentUser.id);
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
  }

  ngOnInit() {

    this.isGoaliesLoading = true;
    this.isPlayersLoading = true;

    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.team = teams.find((team: Team) => team.isactive);
      this.getTeamPlayerStatsForSeason(this.team);
      this.getTeamGoalieStatsForSeason(this.team);
    })

  }


  getTeamPlayerStatsForSeason(team: Team) {
    this._playerStatsService.getPlayersBySeasonByTypeByTeam(team.id, '2020-21', this.currentSeasonType).pipe(
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

  getTeamGoalieStatsForSeason(team: Team) {
    this._goalieStatsService.getGoaliesBySeasonByTypeByTeam(team.id, '2020-21', this.currentSeasonType).pipe(
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
