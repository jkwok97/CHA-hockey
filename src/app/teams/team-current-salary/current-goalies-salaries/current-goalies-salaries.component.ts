import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { PlayerStat } from 'src/app/_models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-goalies-salaries',
  templateUrl: './current-goalies-salaries.component.html',
  styleUrls: ['./current-goalies-salaries.component.css']
})
export class CurrentGoaliesSalariesComponent implements OnInit, AfterViewInit {

  @Input() salaries: any;

  salariesData: MatTableDataSource<any[]>;

  total: number;
  totalCurrentSalary: string;
  totalNextSalary: string;

  columns = [ 'player_name', 'season_2021', 'next' ];

  @ViewChild("goalieSort", {static: false}) goalieSort: MatSort;

  constructor(
    private _router: Router
  ) {
    
   }

  ngOnInit() {
    this.salariesData = new MatTableDataSource(this.salaries)
    this.total = this.salaries.length;
    this.totalCurrentSalary = this.getTotalSalary(this.salaries, 'current');
    this.totalNextSalary = this.getTotalSalary(this.salaries, 'next');
  }

  ngAfterViewInit(): void {
    this.salariesData.sort = this.goalieSort;
  }

  getTotalSalary(array, string) {
    let total = 0;
    if (string === "current") {
      array.forEach(element => {
        if (+element.season_2021 > 0) {
          total += +element.season_2021;
        }
      });
      return total.toFixed(3);
    } else {
      array.forEach(element => {
        if (+element.season_2022 > 0) {
          total += +element.season_2022;
        }
      });
      return total.toFixed(3);
    } 
  }

  openPlayer(player: PlayerStat) {
    const type = player['isgoalie'] ? 'goalie' : 'player';
    this._router.navigate([`player-info/${player.player_id}/${type}/stats`]);
  }

}
