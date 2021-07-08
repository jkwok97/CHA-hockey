import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playoff-matchup-final-card',
  templateUrl: './playoff-matchup-final-card.component.html',
  styleUrls: ['./playoff-matchup-final-card.component.css']
})
export class PlayoffMatchupFinalCardComponent {

  @Input() homeTeam;
  @Input() visTeam;
  @Input() winningTeam;
  @Input() losingTeam;
  @Input() seriesDone: boolean;
  @Input() seriesScore: string;
  @Input() seriesTied: boolean;

}
