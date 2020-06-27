import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { PlayerService } from 'src/app/_services/player.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player-information-ratings',
  templateUrl: './player-information-ratings.component.html',
  styleUrls: ['./player-information-ratings.component.css']
})
export class PlayerInformationRatingsComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  playerType: string;
  season: string;

  statRatings: any[];
  goalieStatRatings: any[];

  playersColumns = [
    'games_played','goals', 'assists', 'points','plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals', 'gw_goals', 'shots', 'shooting_pct'
  ];

  goalieColumns = [
    'games_played','wins', 'loss', 'ties','goals_against', 'goals_against_avg', 'shots_for', 'saves', 'save_pct',
    'shutouts', 'penalty_minutes', 'minutes_played'
  ];

  playersRateColumns = [ 
    'c_rate', 'l_rate', 'r_rate', 'ld_rate', 'rd_rate', 'skating', 'speed', 'passing',
    'shooting', 'face_off', 'forecheck', 'assist_rating', 'clear_crease', 'shot_block', 'pk', 'physical',
    'rock', 'intimidation', 'game_fatigue', 'shift_fatigue'
  ];

  goalieRateColumns = [
    'passing', 'skating', 'speed'
  ];

  constructor(
    private _route: ActivatedRoute,
    private _currentSeasonService: CurrentSeasonService,
    private _playerService: PlayerService
  ) { 
    const playerId = this._route.snapshot.parent.params.id;
    this.playerType = this._route.snapshot.parent.params.type;
    this.season = this._currentSeasonService.currentSeason;

    this.playerType === 'player' ? this.getPlayerRatings(playerId, this.season) : this.getGoalieRatings(playerId, this.season);
  }

  ngOnInit() {
  }

  showColumns() {
    return this.playerType === 'player' ? this.playersColumns : this.goalieColumns;
  }

  showRateColumns() {
    return this.playerType === 'player' ? this.playersRateColumns : this.goalieRateColumns;
  }

  getPlayerRatings(id: number, season: string) {
    this._playerService.getPlayerRatings(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.statRatings = [ratings];
    })
  }

  getGoalieRatings(id: number, season: string) {
    this._playerService.getGoalieRatings(id, season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((ratings) => {
      this.statRatings = [ratings];
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
