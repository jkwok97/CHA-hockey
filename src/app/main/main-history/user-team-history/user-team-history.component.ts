import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamStat } from 'src/app/_models/team';
import { User } from 'src/app/_models/user';
import { MatTableDataSource } from '@angular/material';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { AuthService } from 'src/app/_services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-user-team-history',
  templateUrl: './user-team-history.component.html',
  styleUrls: ['./user-team-history.component.css']
})
export class UserTeamHistoryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  team: any;
  stats$: Observable<TeamStat[]>;

  currentUser: User;

  short_team_name: string;
  seasonType: string = 'Regular';

  teams: MatTableDataSource<any[]>;
  mobileColumns = [
    'playing_year', 'team_logo', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];
  columns = [
    'playing_year', 'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _teamStatsService: TeamStatsService,
    private _authService: AuthService,
    private _currentSeasonService: CurrentSeasonService,
    private _displayService: DisplayService
  ) {
    
    this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
    this.seasonType = this._currentSeasonService.currentSeasonType;
  
  }

  ngOnInit() {

    this.isMobile = this._displayService.isMobile;
    if (this.currentUser) {
      this.isLoading = true;
      this.getTeamStats(this.currentUser.id, this.seasonType);
    }
  }

  getTeamStats(id: number, seasonType: string) {
    this._teamStatsService.getTeamStatsByUser(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.isLoading = false;
      this.teams = new MatTableDataSource<any[]>(teamStats as []);
    })
  }

  changeSeason(value) {
    if (value === 'Playoffs') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(this.currentUser.id, value)
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(this.currentUser.id, value)
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
