import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-trade-card',
  templateUrl: './team-trade-card.component.html',
  styleUrls: ['./team-trade-card.component.css']
})
export class TeamTradeCardComponent implements OnInit {

  @Input() teamInfo;
  @Input() teamPicks;
  @Input() teamPlayers;

  constructor(
    
  ) { }

  ngOnInit() {
    
  }

  getLogo(logo: string) {
    return `url(${logo})`
  }

  getColor(color:string) {
    return `${color}95`
  }

  getPlayerPicture(id: number) {
    return `https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}@2x.jpg`
  }

}
