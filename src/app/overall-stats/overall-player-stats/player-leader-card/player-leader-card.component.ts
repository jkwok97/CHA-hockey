import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-leader-card',
  templateUrl: './player-leader-card.component.html',
  styleUrls: ['./player-leader-card.component.css']
})
export class PlayerLeaderCardComponent implements OnInit {

  @Input() player: any;
  @Input() statType: string;

  constructor() { }

  ngOnInit() {
    
  }

  getPlayerPicture() {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${this.player.nhl_id}.jpg`
  }

}
