import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-draft-summary-table',
  templateUrl: './draft-summary-table.component.html',
  styleUrls: ['./draft-summary-table.component.css']
})
export class DraftSummaryTableComponent implements OnInit {

  @Input() players: any;
  @Input() columns: [];
  @Input() inPlayerInfo: boolean = false;
  @Input() showAll: boolean;

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  @ViewChild(MatSort, {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.length = this.players.length;
  }

  ngAfterViewInit() {
    this.players.sort = this.playerSort;
    this.players.paginator = this.paginator;
  }

}
