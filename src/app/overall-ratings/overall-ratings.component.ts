import { Component, OnInit } from '@angular/core';
import { CurrentSeasonService } from '../_services/current-season.service';
import { PlayerService } from '../_services/player.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-overall-ratings',
  templateUrl: './overall-ratings.component.html',
  styleUrls: ['./overall-ratings.component.css']
})
export class OverallRatingsComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  playerType: string = 'player';
  season: string;

  statRatings: MatTableDataSource<any[]>;
  goalieStatRatings: any[];

  playersRateColumns = [ 'player_name',
    'c_rate', 'l_rate', 'r_rate', 'ld_rate', 'rd_rate', 'skating', 'speed', 'passing',
    'shooting', 'face_off', 'forecheck', 'assist_rating', 'clear_crease', 'shot_block', 'pk', 'physical',
    'rock', 'intimidation', 'game_fatigue', 'shift_fatigue'
  ];

  goalieRateColumns = [
    'player_name', 'passing', 'skating', 'speed'
  ];

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _playerService: PlayerService
  ) { 
    // this.season = this._currentSeasonService.currentSeason;
    this.season = '2020-21';

  }

  ngOnInit() {
    this.isLoading = true;
    this.getPlayerRatings(this.season)
  }

  showRateColumns() {
    return this.playerType === 'player' ? this.playersRateColumns : this.goalieRateColumns;
  }

  changeSeason(playerType: string) {
    this.isLoading = true;
    this.playerType = playerType;
    playerType === 'player' ? this.getPlayerRatings(this.season) : this.getGoalieRatings(this.season);
  }

  getPlayerRatings(season: string) {
    this._playerService.getAllPlayerRatings(season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.statRatings = new MatTableDataSource<any[]>(ratings as []);
      this.isLoading = false;
    })
  }

  getGoalieRatings(season: string) {
    this._playerService.getAllGoalieRatings(season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.statRatings = new MatTableDataSource<any[]>(ratings as []);
      this.isLoading = false;
    })
  }

  applyFilter(filterValue: string) {
    this.statRatings.filter = filterValue.trim().toLowerCase();
    if (this.statRatings.paginator) {
      this.statRatings.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
