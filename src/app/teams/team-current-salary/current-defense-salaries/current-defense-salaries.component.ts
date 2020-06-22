import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-current-defense-salaries',
  templateUrl: './current-defense-salaries.component.html',
  styleUrls: ['./current-defense-salaries.component.css']
})
export class CurrentDefenseSalariesComponent implements OnInit, AfterViewInit {

  @Input() salaries: any;

  salariesData: MatTableDataSource<any[]>;

  total: number;
  totalCurrentSalary: string;
  totalNextSalary: string;

  columns = [ 'player_name', 'position', 'season_2020', 'next' ];

  @ViewChild(MatSort, {static: false}) defenceSort: MatSort;

  constructor() {
    
   }

  ngOnInit() {
    this.salariesData = new MatTableDataSource(this.salaries);
    this.total = this.salaries.length;
    this.totalCurrentSalary = this.getTotalSalary(this.salaries, 'current');
    this.totalNextSalary = this.getTotalSalary(this.salaries, 'next');
  }

  ngAfterViewInit(): void {
    this.salariesData.sort = this.defenceSort;
  }

  getTotalSalary(array, string) {
    let total = 0;
    if (string === "current") {
      array.forEach(element => {
        if (+element.season_2020 > 0) {
          total += +element.season_2020;
        }
      });
      return total.toFixed(3);
    } else {
      array.forEach(element => {
        if (+element.season_2021 > 0) {
          total += +element.season_2021;
        }
      });
      return total.toFixed(3);
    } 
  }

}
