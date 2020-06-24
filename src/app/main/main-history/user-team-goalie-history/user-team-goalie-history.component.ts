import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { AuthService } from 'src/app/_services/auth.service';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { GoalieStat } from 'src/app/_models/player';

@Component({
  selector: 'app-user-team-goalie-history',
  templateUrl: './user-team-goalie-history.component.html',
  styleUrls: ['./user-team-goalie-history.component.css']
})
export class UserTeamGoalieHistoryComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;

  currentUser: User;

  columns = [];
  goalies: MatTableDataSource<any[]>;

  seasonType: string;
  showType: string = 'Season';
  currentSeason: string;
  
  columnsToDisplay = [ 'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 
    'wins','loss', 'ties', 'en_goals', 'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 
    'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'playing_year', 'season_type', 'player_status'
  ];
  
  columnsToDisplayForAllTime = [ 'season_type',
    'player_name', 'games_played','minutes_played', 'calc_goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'calc_save_pct', 'goals', 'assists', 'points', 'penalty_minutes'
  ];

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _authService: AuthService,
    private _goalieStatsService: GoalieStatsService
  ) { 
    this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
    this.seasonType = this._currentSeasonService.currentSeasonType;
    this.currentSeason = this._currentSeasonService.currentSeason;
  }

  ngOnInit() {
    this.isLoading = true;
    
    if (this.currentUser) {
      this.isLoading = true;
      this.getTeamGoalieStats(this.currentUser.id, this.seasonType);
    }
  }

  getTeamGoalieStats(userId: number, seasonType: string) {
    this._goalieStatsService.getGoaliesByUserByType(userId, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((goalieStats: GoalieStat[]) => {
      this.goalies = new MatTableDataSource<any[]>(goalieStats as []);
      this.isLoading = false;
    })
  }

  getTeamGoalieAllTimeStats(userId: number, seasonType: string) {
    this._goalieStatsService.getGoaliesByUserByShowByType(userId, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((goalieStats: GoalieStat[]) => {
      goalieStats.sort((a,b) => b['wins'] - a['wins']);
      this.goalies = new MatTableDataSource<any[]>(goalieStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieAllTimeStats(this.currentUser.id, value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieStats(this.currentUser.id, value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieAllTimeStats(this.currentUser.id, value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamGoalieStats(this.currentUser.id, value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieAllTimeStats(this.currentUser.id, this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieAllTimeStats(this.currentUser.id, this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieStats(this.currentUser.id, this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getTeamGoalieStats(this.currentUser.id, this.seasonType);
    }
  }

  displayColumns() {
    return this.showType === 'Alltime' ? this.columnsToDisplayForAllTime : this.columnsToDisplay;
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
