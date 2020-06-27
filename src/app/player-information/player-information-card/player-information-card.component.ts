import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/_services/salary.service';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerService } from 'src/app/_services/player.service';
import { AwardsService } from 'src/app/_services/awards.service';
import { NhlService } from 'src/app/_services/nhl.service';
import { Player } from 'src/app/_models/player';
import { identifierModuleUrl, isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-player-information-card',
  templateUrl: './player-information-card.component.html',
  styleUrls: ['./player-information-card.component.css']
})
export class PlayerInformationCardComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  playerType: string;

  nhlPlayerInfo$: Observable<any>;
  player$: Observable<any>;
  salary$: Observable<any>;
  awards$: Observable<any>;

  nhlPlayerInfo: any;

  constructor(
    private _route: ActivatedRoute,
    private _salaryService: SalaryService,
    private _playerService: PlayerService,
    private _awardService: AwardsService,
    private _nhlService: NhlService
  ) {

    const playerId = this._route.snapshot.params.id;
    this.playerType = this._route.snapshot.params.type;

    this.playerType === 'player' ? this.getPlayerInfo(playerId) : this.getGoalieInfo(playerId);

   }

  ngOnInit() {
    
  }

  getLogo(logo: string) {
    return logo ? `url(${logo})` : 'url(../../../assets/images/cha_logo.jpg)' 
  }

  getColor(color:string) {
    return `${color}95`
  }

  getPlayerPicture(id: number) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`
  }

  getPlayerInfo(id: number) {
    
    this.player$ = this._playerService.getPlayerInfoById(id);
    this.salary$ = this._salaryService.getPlayerSalaryByPlayerId(id);
    this.awards$ = this._awardService.getPlayerAwardByPlayerId(id);

    this._playerService.getPlayerInfoById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((player: Player) => {
      if (player.nhl_id) {
        this.getNHLInfo(player.nhl_id);
      }
    })

  }

  getGoalieInfo(id: number) {
    
    this.player$ = this._playerService.getGoalieInfoById(id);
    this.salary$ = this._salaryService.getGoalieSalaryByPlayerId(id);
    this.awards$ = this._awardService.getGoalieAwardByPlayerId(id);

    this._playerService.getPlayerInfoById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((player: Player) => {
      if (player.nhl_id) {
        this.getNHLInfo(player.nhl_id);
      }
    })
  }

  getNHLInfo(id) {
    this.nhlPlayerInfo$ = this._nhlService.getPlayerInfo(id);

    this.nhlPlayerInfo$.pipe(
      takeWhile(() => this._alive)
    ).subscribe(player => {
      const info = player['people'];

      this.nhlPlayerInfo = info.map((item => ({
        height: item.height,
        birthCountry: item.birthCountry,
        age: item.currentAge,
        position: item.primaryPosition.code,
        shoots: item.shootsCatches
      })))[0];
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
