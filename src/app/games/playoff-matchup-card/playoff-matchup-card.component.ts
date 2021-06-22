import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playoff-matchup-card',
  templateUrl: './playoff-matchup-card.component.html',
  styleUrls: ['./playoff-matchup-card.component.css']
})
export class PlayoffMatchupCardComponent implements OnInit {

  @Input() homeTeam;
  @Input() visTeam;
  @Input() winningTeam;
  @Input() losingTeam;
  @Input() seriesDone: boolean;
  @Input() seriesScore: string;
  @Input() seriesTied: boolean;

  constructor() { }

  ngOnInit() {
  }

}
