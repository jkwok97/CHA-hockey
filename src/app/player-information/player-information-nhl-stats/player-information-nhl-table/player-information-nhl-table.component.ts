import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-information-nhl-table',
  templateUrl: './player-information-nhl-table.component.html',
  styleUrls: ['./player-information-nhl-table.component.css']
})
export class PlayerInformationNhlTableComponent implements OnInit {

  @Input() stats;
  @Input() totals;
  @Input() columns;

  constructor() { }

  ngOnInit() {
    
  }

  getSeason(season: string) {
    return season.slice(season.length - 4);
  }

}
