import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhlService } from 'src/app/_services/nhl.service';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/_services/player.service';
import { Player } from 'src/app/_models/player';

@Component({
  selector: 'app-player-information-nhl-stats',
  templateUrl: './player-information-nhl-stats.component.html',
  styleUrls: ['./player-information-nhl-stats.component.css']
})
export class PlayerInformationNhlStatsComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isStatsLoading: boolean;
  isOnPaceStatsLoading: boolean;
  statsError: boolean = false;

  nhlStats: any[];

  stats: any[];
  onPaceStats: any[];

  playerType: string;

  playersColumns = [ 'season',
    'games', 'goals', 'assists', 'points', 'powerPlayGoals', 'powerPlayPoints', 'shortHandedGoals', 'shortHandedPoints', 'gameWinningGoals', 
    'plusMinus', 'penaltyMinutes', 'shots', 'shotPct', 'faceOffPct', 'hits', 'blocked', 'powerPlayTimeOnIce', 'shortHandedTimeOnIce',
    'timeOnIce'
  ];

  goalieColumns = [ 'season',
    'games', 'wins', 'losses', 'ties', 'goalsAgainst', 'goalAgainstAverage', 'shutouts', 'shotsAgainst', 'saves', 'savePercentage',
    'powerPlaySavePercentage', 'evenStrengthSavePercentage'
  ];

  playersOnPaceColumns = [ 
    'games', 'goals', 'assists', 'points', 'powerPlayGoals', 'powerPlayPoints', 'shortHandedGoals', 'shortHandedPoints', 'gameWinningGoals', 
    'plusMinus', 'penaltyMinutes', 'shots', 'shotPct', 'faceOffPct', 'hits', 'blocked'
  ];

  goalieOnPaceColumns = [
    'games', 'wins', 'losses', 'ties', 'goalsAgainst', 'goalAgainstAverage', 'shutouts', 'shotsAgainst', 'saves', 'savePercentage',
    'powerPlaySavePercentage', 'evenStrengthSavePercentage'
  ];

  constructor(
    private _nhlService: NhlService,
    private _playerService: PlayerService,
    private _route: ActivatedRoute
  ) {
    const playerId = this._route.snapshot.parent.params.id;
    this.playerType = this._route.snapshot.parent.params.type;

    this.getPlayerInfo(playerId);

   }

  ngOnInit() {
    this.isStatsLoading = true;
    this.isOnPaceStatsLoading = true;
  }

  getPlayerInfo(playerId: number) {
    this._playerService.getPlayerInfoById(playerId).pipe(
      takeWhile(() => this._alive)
    ).subscribe((player: Player) => {
      if (player.nhl_id) {
        this.getOnPaceNHLStats(player.nhl_id, '');
        this.getNhlCareerStats(player.nhl_id)
      } else {
        this.statsError = true;
        this.isStatsLoading = false;
        this.isOnPaceStatsLoading = false;
      }
      
    })
  }

  getNhlCareerStats(id) {
    this._nhlService.getNhlCareerStats(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((stats) => {
      this.nhlStats = stats;
      this.isStatsLoading = false;
    })
  }

  getOnPaceNHLStats(id, pace) {
    this._nhlService.getIndividualOnPaceNHLRealStats(id, pace).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {
      this.onPaceStats = [resp['stats'][0]['splits'][0]['stat']];
      this.isOnPaceStatsLoading = false;
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
