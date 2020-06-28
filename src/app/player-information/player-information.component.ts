import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../_services/player.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player-information',
  templateUrl: './player-information.component.html',
  styleUrls: ['./player-information.component.css']
})
export class PlayerInformationComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  activeLinkIndex = -1;

  routes = [
    {name: 'Statistics', url: 'stats', current: true, disabled: false},
    {name: 'NHL Stats', url: 'nhl-stats', current: false, disabled: false},
    {name: 'Ratings', url: 'ratings', current: false, disabled: false},
  ];

  constructor(
    private _route: ActivatedRoute,
    private _playerService: PlayerService
  ) { 
    const playerId = this._route.snapshot.params.id;
    this.getPlayerInfo(playerId);
  }

  ngOnInit() {
  }

  getPlayerInfo(playerId: number) {
    this._playerService.getPlayerInfoById(playerId).pipe(
      takeWhile(() => this._alive)
    ).subscribe(player => {
      if (!player.isactive) {
        // this.routes[1].disabled = true;
        this.routes[2].disabled = true;
      }
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
