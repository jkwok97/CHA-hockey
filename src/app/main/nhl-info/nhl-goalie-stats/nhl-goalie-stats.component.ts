import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NhlService } from 'src/app/_services/nhl.service';
import { TeamsService } from 'src/app/teams/teams.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-nhl-goalie-stats',
  templateUrl: './nhl-goalie-stats.component.html',
  styleUrls: ['./nhl-goalie-stats.component.css']
})
export class NhlGoalieStatsComponent implements OnInit, OnDestroy {

  
  private _alive:boolean = true;
  isLoading: boolean = false;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;
  start: number = 0;

  sortType: string = "wins";
  sortOrder: string = "DESC";

  goalies: MatTableDataSource<any[]>;
  goaliesColumnsToDisplay = [
    'team_logo', 'playerName', 'gamesPlayed', 'goalsAgainstAverage', 'wins','losses',
    'shutouts', 'goalsAgainst', 'saves', 'shotsAgainst', 'savePct', 'goals', 'assists', 'points', 'penaltyMinutes'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _nhlService: NhlService,
    private _playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getSummary(this.start, this.pageSize, "start", this.sortType, this.sortOrder);
  }

  getGoalieLogo(id: number, leader: any) {
    this._playerService.getGoalieTeamLogo(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(logo => {
      leader.cha_logo = logo;
      return leader;
    });
  }

  splitName(name) {
    return name.split(" ");
  }

  getSummary(start, pageSize, type, statType, sortOrder) {
    this._nhlService.getNHLsummary('20192020', 'goalie', statType, sortOrder, start, pageSize).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      const stats = resp['data'];

      stats.forEach(stat => {
        stat = this.getGoalieLogo(stat.playerId, stat)
      });

      this.goalies = new MatTableDataSource<any[]>(stats);
      this.isLoading = false;
      if (type == "start") {
        setTimeout(() => {
          this.goalies.paginator = this.paginator;
          this.length = resp['total'];
          this.goalies.sort = this.sort;
        }, 350);
      }
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    if (pageData.previousPageIndex < pageData.pageIndex) {
      this.start += 25;
    } else {
      this.start -= 25;
    }
    this.length = pageData.length;
    this.getSummary(this.start, this.pageSize, "next", this.sortType, this.sortOrder);
  }

  onSort(event) {
    // console.log(event);
    this.isLoading = true;
    this.start = 0;
    this.sortOrder = (event.direction).toUpperCase();
    this.sortType = event.active;
    this.getSummary(this.start, this.pageSize, "next", this.sortType, this.sortOrder);
  }

  applyFilter(filterValue: string) {
    this.goalies.filter = filterValue.trim().toLowerCase();
    if (this.goalies.paginator) {
      this.goalies.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
