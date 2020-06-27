import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/_services/salary.service';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlayerService } from 'src/app/_services/player.service';
import { AwardsService } from 'src/app/_services/awards.service';

@Component({
  selector: 'app-player-information-card',
  templateUrl: './player-information-card.component.html',
  styleUrls: ['./player-information-card.component.css']
})
export class PlayerInformationCardComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  playerType: string;

  player$: Observable<any>;
  salary$: Observable<any>;
  awards$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _salaryService: SalaryService,
    private _playerService: PlayerService,
    private _awardService: AwardsService
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
  }

  getGoalieInfo(id: number) {
    this.player$ = this._playerService.getGoalieInfoById(id);
    this.salary$ = this._salaryService.getGoalieSalaryByPlayerId(id);
    this.awards$ = this._awardService.getGoalieAwardByPlayerId(id);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
