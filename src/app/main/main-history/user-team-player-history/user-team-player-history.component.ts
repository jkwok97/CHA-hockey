import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { takeWhile, map } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { Team } from 'src/app/_models/team';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-user-team-player-history',
  templateUrl: './user-team-player-history.component.html',
  styleUrls: ['./user-team-player-history.component.css']
})
export class UserTeamPlayerHistoryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  currentUser: User;
  userTeams: Team[];

  columns = [];
  players: MatTableDataSource<any[]>;

  seasonType: string;
  showType: string = 'Season';
  currentSeason: string;

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _authService: AuthService,
    private _playerStatsService: PlayerStatsService,
  ) {
    this._authService.currentUser.subscribe( x => this.currentUser = x[0] );
    this.seasonType = this._currentSeasonService.currentSeasonType;
    this.currentSeason = this._currentSeasonService.currentSeason;
   }

  ngOnInit() {
    this.isLoading = true;

    if (this.currentUser) {
      this.isLoading = true;
      this.getTeamPlayerStats(this.currentUser.id, this.seasonType);
    }

  }

  getTeamPlayerStats(id: number, seasonType: string) {
    this._playerStatsService.getPlayersByUserByType(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.columns = [ 
        'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points','plus_minus', 
        'penalty_minutes', 'sh_goals','gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 
        'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots','playing_year', 'season_type', 'player_status'
      ];
      this.players = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    })
  }

  getTeamPlayerAllTimeStats(id: number, seasonType: string) {
    this._playerStatsService.getPlayersByUserByShowByType(id, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.columns = [
        'team_logo', 'player_name', 'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 
        'pp_goals', 'sh_goals','gw_goals', 'gt_goals', 'shots', 'hits', 'blocked_shots'
      ]
      playerStats.sort((a,b) => b['points'] - a['points']);
      this.players = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerAllTimeStats(this.currentUser.id, value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerStats(this.currentUser.id, value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerAllTimeStats(this.currentUser.id, value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamPlayerStats(this.currentUser.id, value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerAllTimeStats(this.currentUser.id, this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerAllTimeStats(this.currentUser.id, this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerStats(this.currentUser.id, this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getTeamPlayerStats(this.currentUser.id, this.seasonType);
    }
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
