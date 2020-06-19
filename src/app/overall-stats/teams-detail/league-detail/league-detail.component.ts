import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TeamStatsService } from 'src/app/_services/team-stats.service';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { TeamStat } from 'src/app/_models/team';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean;
  disablePlayoffButton: boolean;

  currentSeason: string;
  currentSeasonType: string;

  teams: MatTableDataSource<any[]>;
  columns = [
    'team_logo','team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game', 
    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'penalty_minutes_game', 'div_record',
    'home_record', 'away_record', 'trail_record'
  ];

  constructor(
    private _teamStatsService: TeamStatsService,
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
    this._teamStatsService.getTeamStatsBySeasonByType(season, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((teamStats: TeamStat[]) => {
      this.teams = new MatTableDataSource<any[]>(teamStats as []);
      this.isLoading = false;
    })
  }

  changeSeason(seasonType) {
    this.isLoading = true;
    this.currentSeasonType = seasonType;
    this.getStats(this.currentSeason, seasonType);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
