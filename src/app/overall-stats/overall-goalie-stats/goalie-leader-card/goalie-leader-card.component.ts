import { Component, OnInit, Input } from '@angular/core';
import { PlayerStat } from 'src/app/_models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goalie-leader-card',
  templateUrl: './goalie-leader-card.component.html',
  styleUrls: ['./goalie-leader-card.component.css']
})
export class GoalieLeaderCardComponent implements OnInit {

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
