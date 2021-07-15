import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playoff-matchup-final-champion',
  templateUrl: './playoff-matchup-final-champion.component.html',
  styleUrls: ['./playoff-matchup-final-champion.component.css']
})
export class PlayoffMatchupFinalChampionComponent {

  @Input() champion;

}
