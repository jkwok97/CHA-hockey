import { Component, OnInit, Input } from '@angular/core';
import { PlayerStat } from 'src/app/_models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-leader-card',
  templateUrl: './player-leader-card.component.html',
  styleUrls: ['./player-leader-card.component.css']
})
export class PlayerLeaderCardComponent implements OnInit {

  @Input() player: any;
  @Input() statType: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    
  }

  getPlayerPicture() {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${this.player.nhl_id}.jpg`
  }

  openPlayer(player: PlayerStat) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

}
