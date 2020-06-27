import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStatsService } from 'src/app/_services/player-stats.service';
import { takeWhile } from 'rxjs/operators';
import { PlayerStat } from 'src/app/_models/player';
import { GoalieStatsService } from 'src/app/_services/goalie-stats.service';

@Component({
  selector: 'app-player-information-stats',
  templateUrl: './player-information-stats.component.html',
  styleUrls: ['./player-information-stats.component.css']
})
export class PlayerInformationStatsComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = false;

  playerType: string;

  seasonStats: PlayerStat[];
  playoffStats: PlayerStat[];

  constructor(
    private _route: ActivatedRoute,
    private _playerStatsService: PlayerStatsService,
    private _goalieStatsService: GoalieStatsService
  ) {

    const playerId = this._route.snapshot.parent.params.id;
    this.playerType = this._route.snapshot.parent.params.type;

    this.playerType === 'player' ? this.getPlayerStats(playerId) : this.getGoalieStats(playerId);
    
   }

  ngOnInit() {
    this.isLoading = true;
  }

  getPlayerStats(id: number) {
    this._playerStatsService.getPlayerStatsById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.seasonStats = playerStats.filter((stat: PlayerStat) => stat.season_type === 'Regular');
      this.playoffStats = playerStats.filter((stat: PlayerStat) => stat.season_type === 'Playoffs');
      this.isLoading = false;
    })
  }

  getGoalieStats(id: number) {
    this._goalieStatsService.getGoalieStatsById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((playerStats: PlayerStat[]) => {
      this.seasonStats = playerStats.filter((stat: PlayerStat) => stat.season_type === 'Regular');
      this.playoffStats = playerStats.filter((stat: PlayerStat) => stat.season_type === 'Playoffs');
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
