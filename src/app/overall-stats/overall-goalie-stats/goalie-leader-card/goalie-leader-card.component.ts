import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-goalie-leader-card',
  templateUrl: './goalie-leader-card.component.html',
  styleUrls: ['./goalie-leader-card.component.css']
})
export class GoalieLeaderCardComponent implements OnInit {

  @Input() player: any;
  @Input() statType: string;

  constructor() { }

  ngOnInit() {
  }

  getPlayerPicture() {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${this.player.nhl_id}.jpg`
  }

}
