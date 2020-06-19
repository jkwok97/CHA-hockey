import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { GoalieStat } from 'src/app/_models/player';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-goalies-detail',
  templateUrl: './goalies-detail.component.html',
  styleUrls: ['./goalies-detail.component.css']
})
export class GoaliesDetailComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean;
  disablePlayoffButton: boolean;

  currentSeason: string;
  currentSeasonType: string;

  goalies: MatTableDataSource<any[]>;
  columns = [
    'team_logo', 'player_name', 'games_played','minutes_played', 'goals_against_avg', 'wins','loss', 'ties', 'en_goals',
    'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
  ];

  constructor(
    private _goalieStatsService: GoalieStatsService,
    private _displayService: DisplayService,
    private _currentSeasonService: CurrentSeasonService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
    this.disablePlayoffButton = this._currentSeasonService.seasonHasPlayoffs;
  }

  ngOnInit() {
    this.isMobile = this._displayService.isMobile;
    this.isLoading = true;
    this.getStats(this.currentSeason, this.currentSeasonType);
  }

  getStats(season: string, seasonType: string) {
    this._goalieStatsService.getGoaliesBySeasonByType(season, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((goalieStats: GoalieStat[]) => {
      this.goalies = new MatTableDataSource<any[]>(goalieStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(seasonType) {
    this.isLoading = true;
    this.currentSeasonType = seasonType;
    this.getStats(this.currentSeason, seasonType);
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
