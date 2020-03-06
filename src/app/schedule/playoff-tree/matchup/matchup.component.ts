import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrls: ['./matchup.component.css']
})
export class MatchupComponent implements OnInit {

  @Input() matchup: any;

  homeTeam: any;
  visitingTeam: any;
  series: string;

  constructor() { }

  ngOnInit() {
    this.homeTeam = this.matchup.homeTeam;
    this.visitingTeam = this.matchup.visitingTeam;
    this.series = this.matchup.series;
  }

}
