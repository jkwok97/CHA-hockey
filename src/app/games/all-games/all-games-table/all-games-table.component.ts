import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-all-games-table',
  templateUrl: './all-games-table.component.html',
  styleUrls: ['./all-games-table.component.css']
})
export class AllGamesTableComponent implements OnInit, AfterViewInit {

  @Input() games;
  @Input() columns;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatSort, {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.length = this.games.length;
  }

  ngAfterViewInit() {
    this.games.sort = this.playerSort;
    this.games.paginator = this.paginator;
  }

}
