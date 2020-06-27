import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhlService } from 'src/app/_services/nhl.service';
import { takeWhile, take } from 'rxjs/operators';
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
        // this.getRealNHLStats(player.nhl_id);
        this.getOnPaceNHLStats(player.nhl_id, '');
        this.getNHLInfo(player.nhl_id);
      } else {
        this.statsError = true;
        this.isStatsLoading = false;
        this.isOnPaceStatsLoading = false;
      }
      
    })
  }

  getNHLInfo(id) {
    this._nhlService.getPlayerInfo(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((player) => {

      const s = player['people'][0]['stats'][0]['splits'];

      const playerStats = s as [];

      const p = playerStats.filter((stat) => stat['league']['name'] === "National Hockey League");

      console.log(p);

      if (this.playerType === 'player') {
        this.extractPlayerStats(p);
      } else {
        this.extractGoalieStats(p)
      }

    })
  }

  // getRealNHLStats(id) {
  //   this._nhlService.getIndividualNHLRealStats(id).pipe(
  //     takeWhile(() => this._alive)
  //   ).subscribe(resp => {
  //     this.stats = [resp['stats'][0]['splits'][0]['stat']];
  //     this.isStatsLoading = false;
  //   });
  // }

  getOnPaceNHLStats(id, pace) {
    this._nhlService.getIndividualOnPaceNHLRealStats(id, pace).pipe(
      takeWhile(() => this._alive)
      ).subscribe(resp => {
      this.onPaceStats = [resp['stats'][0]['splits'][0]['stat']];
      this.isOnPaceStatsLoading = false;
    });
  }

  extractPlayerStats(p) {
    this.nhlStats = p.map(stat => ({
      season: stat['season'],
      assists: stat['stat']['assists'],
      blocked: stat['stat']['blocked'],
      evenTimeOnIce: stat['stat']['evenTimeOnIce'],
      faceOffPct: stat['stat']['faceOffPct'],
      gameWinningGoals: stat['stat']['gameWinningGoals'],
      games: stat['stat']['games'],
      goals: stat['stat']['goals'],
      hits: stat['stat']['hits'],
      overTimeGoals: stat['stat']['overTimeGoals'],
      penaltyMinutes: stat['stat']['penaltyMinutes'],
      pim: stat['stat']['pim'],
      plusMinus: stat['stat']['plusMinus'],
      points: stat['stat']['points'],
      powerPlayGoals: stat['stat']['powerPlayGoals'],
      powerPlayPoints: stat['stat']['powerPlayPoints'],
      powerPlayTimeOnIce: stat['stat']['powerPlayTimeOnIce'],
      shifts: stat['stat']['shifts'],
      shortHandedGoals: stat['stat']['shortHandedGoals'],
      shortHandedPoints: stat['stat']['shortHandedPoints'],
      shortHandedTimeOnIce: stat['stat']['shortHandedTimeOnIce'],
      shotPct: stat['stat']['shotPct'],
      shots: stat['stat']['shots'],
      timeOnIce: stat['stat']['timeOnIce']
    }));

    this.isStatsLoading = false;
  }

  extractGoalieStats(p) {
    this.nhlStats = p.map(stat => ({
      season: stat['season'],
      evenSaves: stat['stat']['evenSaves'],
      evenShots: stat['stat']['evenShots'],
      evenStrengthSavePercentage: stat['stat']['evenStrengthSavePercentage'],
      games: stat['stat']['games'],
      gamesStarted: stat['stat']['gamesStarted'],
      goalAgainstAverage: stat['stat']['goalAgainstAverage'],
      goalsAgainst: stat['stat']['goalsAgainst'],
      losses: stat['stat']['losses'],
      powerPlaySavePercentage: stat['stat']['powerPlaySavePercentage'],
      powerPlaySaves: stat['stat']['powerPlaySaves'],
      powerPlayShots: stat['stat']['powerPlayShots'],
      savePercentage: stat['stat']['savePercentage'],
      saves: stat['stat']['saves'],
      shortHandedSavePercentage: stat['stat']['shortHandedSavePercentage'],
      shortHandedSaves: stat['stat']['shortHandedSaves'],
      shortHandedShots: stat['stat']['shortHandedShots'],
      shotsAgainst: stat['stat']['shotsAgainst'],
      shutouts: stat['stat']['shutouts'],
      ties: stat['stat']['ties'],
      timeOnIce: stat['stat']['timeOnIce'],
      wins: stat['stat']['wins'],
    }));

    this.isStatsLoading = false;
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
