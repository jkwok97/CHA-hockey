import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratings-rate-table',
  templateUrl: './ratings-rate-table.component.html',
  styleUrls: ['./ratings-rate-table.component.css']
})
export class RatingsRateTableComponent implements OnInit {

  @Input() stats;
  @Input() columns;

  constructor() { }

  ngOnInit() {
  }

}
