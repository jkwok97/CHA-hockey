import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStat } from 'src/app/_models/player';

@Component({
  selector: 'app-all-defense-detail-archive',
  templateUrl: './all-defense-detail-archive.component.html',
  styleUrls: ['./all-defense-detail-archive.component.css']
})
export class AllDefenseDetailArchiveComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isMobile: boolean;
  isLoading: boolean;
  disablePlayoffButton: boolean;

  seasonType: string;
  showType: string = 'Season';

  players: MatTableDataSource<any[]>;

  columns = [ 'playing_year', 'team_logo', 'player_name', 'position', 'games_played','goals', 'assists', 
    'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals', 'gw_goals', 
    'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
  ];

  allTimeColumns = [
    'player_name', 'games_played','goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 
    'penalty_minutes', 'pp_goals', 'sh_goals', 'gw_goals', 'gt_goals', 'shots', 'hits', 'blocked_shots'
  ];

  constructor(
    private _playerStatsService: PlayerStatsService,
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
    this._playerStatsService.getDefenseStatsByType(seasonType).pipe(
        takeWhile(() => this._alive)
      ).subscribe((playerStats: PlayerStat[]) => {
        this.players = new MatTableDataSource<any[]>(playerStats as []);
        this.isLoading = false;
      });
  }

  getAllTimeStats(seasonType: string) {
    this._playerStatsService.getDefenseStatsByTypeSummed(seasonType).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.players = new MatTableDataSource<any[]>(playerStats as []);
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
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
