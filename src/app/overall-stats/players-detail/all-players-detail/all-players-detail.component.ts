import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { MatTableDataSource } from '@angular/material';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-all-players-detail',
  templateUrl: './all-players-detail.component.html',
  styleUrls: ['./all-players-detail.component.css']
})
export class AllPlayersDetailComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean;
  disablePlayoffButton: boolean;

  currentSeason: string;
  currentSeasonType: string;

  players: MatTableDataSource<any[]>;
  columns = [
    'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
    'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  constructor(
    private _playerStatsService: PlayerStatsService,
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
    this._playerStatsService.getPlayersBySeasonByType(season, seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.players = new MatTableDataSource<any[]>(playerStats as []);
      this.isLoading = false;
    }, error => this.isLoading = false)
  }

  changeSeason(seasonType) {
    this.isLoading = true;
    this.currentSeasonType = seasonType;
    this.getStats(this.currentSeason, seasonType);
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
