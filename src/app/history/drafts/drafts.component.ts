import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;

  drafts: any[];

  short_team_name: string = '';

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = [
    'draft_year', 'round_num','number_num', 'player_name', 'player_pos', 'team'
  ];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamsService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._teamsService.getDrafts().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.drafts = resp as [];
      this.players = new MatTableDataSource<any[]>(this.drafts);
      this.length = this.drafts.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();

    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

}
