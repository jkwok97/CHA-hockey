import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { Observable } from 'rxjs';
import { TeamStat } from 'src/app/_models/team';
import { MatTableDataSource } from '@angular/material';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-team-detail-archives',
  templateUrl: './team-detail-archives.component.html',
  styleUrls: ['./team-detail-archives.component.css']
})
export class TeamDetailArchivesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  team: any;
  stats$: Observable<TeamStat[]>;

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
  allTimeColumns = [
    'season_type', 'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 
    'goals_for_game', 'goals_against', 'goals_against_game', 'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 
    'sh_goals', 'penalty_minutes_game', 'shot_diff',
  ];
  mobileAllTimeColumns = [
    'season_type', 'team_logo', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 
    'goals_for_game', 'goals_against', 'goals_against_game', 'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 
    'sh_goals', 'penalty_minutes_game', 'shot_diff',
  ];

  seasonType: string;
  showType: string = 'Season';

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _teamStatsService: TeamStatsService,
    private _displayService: DisplayService
  ) {
    this.seasonType = this._currentSeasonService.currentSeasonType;
    // this.currentSeason = this._currentSeasonService.currentSeason;
   }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;

    this.isLoading = true;

    this.getTeamStats(this.seasonType);

  }

  getTeamStats(seasonType: string) {
    this._teamStatsService.getTeamStatsByType(seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.teams = new MatTableDataSource<any[]>(teamStats as []);
      this.isLoading = false;
    })
  }

  getAllTimeTeamStats(seasonType: string) {
    this._teamStatsService.getTeamStatsByTypeSummed(seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.teams = new MatTableDataSource<any[]>(teamStats as []);
      this.isLoading = false;
    })
  }


  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getAllTimeTeamStats(value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getAllTimeTeamStats(value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getTeamStats(value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getAllTimeTeamStats(this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getAllTimeTeamStats(this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getTeamStats(this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getTeamStats(this.seasonType);
    }
  }

  applyFilter(filterValue: string) {
    this.teams.filter = filterValue.trim().toLowerCase();
    if (this.teams.paginator) {
      this.teams.paginator.firstPage();
    }
  }

  showColumns() {
    return this.showType === 'Alltime' ? 
          this.isMobile ? this.mobileAllTimeColumns : this.allTimeColumns :
          this.isMobile ? this.mobileColumns : this.columns; 
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
