import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings-stats-table',
  templateUrl: './ratings-stats-table.component.html',
  styleUrls: ['./ratings-stats-table.component.css']
})
export class RatingsStatsTableComponent implements OnInit {

  @Input() stats;
  @Input() columns;

  constructor() { }

  ngOnInit() {
  }

}
