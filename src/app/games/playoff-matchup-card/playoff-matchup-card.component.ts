import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playoff-matchup-card',
  templateUrl: './playoff-matchup-card.component.html',
  styleUrls: ['./playoff-matchup-card.component.css']
})
export class PlayoffMatchupCardComponent implements OnInit {

  @Input() homeTeam;
  @Input() visTeam;

  constructor() { }

  ngOnInit() {
  }

}
