import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-goalies-detail-archives',
  templateUrl: './goalies-detail-archives.component.html',
  styleUrls: ['./goalies-detail-archives.component.css']
})
export class GoaliesDetailArchivesComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean;
  disablePlayoffButton: boolean;

  seasonType: string;
  showType: string = 'Season';

  goalies: MatTableDataSource<any[]>;

  columns = [ 'playing_year',
    'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  allTimeColumns = [
    'player_name', 'games_played','minutes_played', 'calc_goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'calc_save_pct', 'goals', 'assists', 'points', 'penalty_minutes'
  ];

  constructor(
    private _goalieStatsService: GoalieStatsService,
    private _displayService: DisplayService,
    private _currentSeasonService: CurrentSeasonService
  ) { 
    this.seasonType = this._currentSeasonService.currentSeasonType;
    this.disablePlayoffButton = this._currentSeasonService.seasonHasPlayoffs;
  }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
    this.isLoading = true;
    this.getStats(this.seasonType);
  }

  showColumns() {
    return this.showType === 'Alltime' ? this.allTimeColumns : this.columns;
  }

  getStats(seasonType: string) {
    this._goalieStatsService.getGoaliesStatsByType(seasonType).pipe(
        takeWhile(() => this._alive)
      ).subscribe((playerStats: PlayerStat[]) => {
        this.goalies = new MatTableDataSource<any[]>(playerStats as []);
        this.isLoading = false;
      });
  }

  getAllTimeStats(seasonType: string) {
    this._goalieStatsService.getGoaliesStatsByTypeSummed(seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.goalies = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    });
  }

  changeSeason(value) {
    if (value === 'Playoffs' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getAllTimeStats(value);
    } else if (value === 'Playoffs' && this.showType === 'Season') {
      this.isLoading = true;
      this.seasonType = value;
      this.getStats(value);
    } else if (value === 'Regular' && this.showType === 'Alltime') {
      this.isLoading = true;
      this.seasonType = value;
      this.getAllTimeStats(value);
    } else {
      this.isLoading = true;
      this.seasonType = value;
      this.getStats(value);
    }
  }

  changeShow(value) {
    if (value === 'Alltime' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getAllTimeStats(this.seasonType);
    } else if (value === 'Alltime' && this.seasonType === 'Playoffs') {
      this.isLoading = true;
      this.showType = value;
      this.getAllTimeStats(this.seasonType);
    } else if (value === 'Season' && this.seasonType === 'Regular') {
      this.isLoading = true;
      this.showType = value;
      this.getStats(this.seasonType);
    } else {
      this.isLoading = true;
      this.showType = value;
      this.getStats(this.seasonType);
    }
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
